import AdmZip from 'adm-zip';
import fs from 'fs-extra';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Plugin from 'App/Plugin';
import data_get from '../../../../helpers/data_get';
import version_compare from '../../../../helpers/version_compare';
import storage_path from '../../../../helpers/storage_path';
import set_plugin_setting from '../../../../helpers/plugins/set_plugin_setting';
import axios from 'axios';
import isProd from '../../../../helpers/isProd';

export default class PluginController {
  /**
   * Переключатель состояния плагина (вкл./выкл.)
   */
  public async switch({ request, response }: HttpContextContract) {
    let data = request.all();
    await Plugin.switchEnable(data.name, data.value);
    //let plugin = new Plugin({'name': request.qs().name})
    let plugin = new Plugin({ name: data.name });

    return response.json({ success: true, data: plugin });
  }

  public async update_plugin_files({ request, response }: HttpContextContract) {
    let res = { success: true };
    let status = 200;

    const plugin = new Plugin({ name: request.qs().name });

    if (request.qs().version_check) {
      const params = new URLSearchParams();
      params.append('plugin_name', plugin.name);
      let apiResponse = await axios.post(plugin.check_version_url, {
        body: params,
        headers: {
          Authorization: request.cookie('altrpMarketApiToken'),
        },
      });
      let version = JSON.parse(apiResponse.data);

      version = data_get(version, 'data.version');
      if (!version) {
        status = 404;
        res['success'] = false;
        res['data']['message'] = 'Not Found New Version';
      } else if (version_compare(plugin.version, version)) {
        status = 404;
        res['success'] = false;
        res['data']['message'] = 'Not Found New Version';
      }
      if (status === 404) {
        return response.json(res);
      }
    }

    if (!plugin.update_url) {
      status = 404;
      res['success'] = false;
      res['data']['message'] = 'Update_url not Found in Plugin';
    } else {
      if (!(await plugin.updatePluginFiles(request))) {
        status = 500;
        res['success'] = false;
        res['data']['message'] = 'Update Plugin Files Error';
      } else {
        plugin.clearMetadata();
        if (plugin.enabled) {
          await plugin.updatePluginSettings();
        }
      }
    }
    //await Plugin.updateAltrpPluginLists()
    let new_widget_list = await Plugin.updateAltrpPluginLists();
    await set_plugin_setting([
      {
        key: Plugin.ALTRP_PLUGINS_WIDGET_LIST,
        value: new_widget_list.length === 0 ? '' : new_widget_list,
      },
    ]);
    return response.status(status).json(res);
  }

  public async delete_plugin({ request, response }: HttpContextContract) {
    if (!isProd()) {
      return response.json({ success: true });
    }
    let plugin = new Plugin({ name: request.params().name });
    await plugin.deletePlugin();
    return response.json({ success: true, data: plugin });
  }

  public async install({ request, response }: HttpContextContract) {
    if (!isProd()) {
      return response.json({ success: true });
    }
    let res: any = { success: true };
    let status = 200;
    let name = request.input('name');
    if (!name) {
      response.status(400);
      return response.json({ success: false, message: 'Name Required' });
    }
    if (request?.body()?.action === 'update') {
      let plugin = new Plugin({ name: request.input('name') });
      plugin.deletePluginFiles();
      plugin.deleteStaticFiles();
    }
    let apiResponse;
    try {
      apiResponse = await axios.get(request.input('update_url'), {
        responseType: 'arraybuffer',
        headers: {
          // @ts-ignore
          'altrp-domain-resource': request.hostname(),
          'authorization': request.cookiesList().altrpMarketApiToken || '',
        },
      });
      apiResponse = apiResponse.data;
    } catch (e) {
      res = {
        success: false,
        message: e.message,
        trace: e.stack.split('\n'),
      };
      status = 500;
      return response.status(status).json(res);
    }

    let temp_path = storage_path('temp');

    //@ts-ignore
    let filename = temp_path + '/' + name + '.zip';
    fs.ensureDirSync(temp_path);
    fs.writeFileSync(filename, apiResponse);
    let archive = new AdmZip(filename);
    archive.extractAllTo(Plugin.getPathByName(name), true);
    fs.rmSync(temp_path, { recursive: true });

    let plugin = new Plugin({ name: request.input('name') });
    await plugin.updatePluginSettings();
    plugin.copyStaticFiles();
    return response.json(res);
  }

  /**
   * Получить список установленных плагинов
   */
  public async plugins({ response }: HttpContextContract) {
    return response.json(await Plugin.getDownloadedPluginsList());
  }
}
