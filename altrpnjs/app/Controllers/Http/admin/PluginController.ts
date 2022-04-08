import AdmZip from "adm-zip"
import fs from 'fs-extra'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import Plugin from "App/Plugin"
import data_get from "../../../../helpers/data_get";
import version_compare from "../../../../helpers/version_compare";
import storage_path from "../../../../helpers/storage_path";
import httpsRequest from "../../../../helpers/httpsRequest";

export default class PluginController {
  /**
   * Переключатель состояния плагина (вкл./выкл.)
   */
  public async switch({request, response}: HttpContextContract) {

    let data = request.all()
    //await Plugin.switchEnable(request.qs().name, !!request.qs().value)
    await Plugin.switchEnable(data.name, data.value)

    //let plugin = new Plugin({'name': request.qs().name})
    let plugin = new Plugin({'name': data.name})

    return response.json({'success': true, 'data': plugin})
  }

  public async update_plugin_files({request, response}: HttpContextContract) {
    let res = {'success': true,}
    let status = 200

    const plugin = new Plugin({'name': request.qs().name})

    if (request.qs().version_check) {

      const params = new URLSearchParams();
      params.append('plugin_name', plugin.name);
      let apiResponse =  await httpsRequest(plugin.check_version_url, {
        body: params,
        headers:
          {
            'Authorization':
              request.cookie('altrpMarketApiToken'),
          }
      })
      let version = ''
      if (response) {
        try {
          // @ts-ignore
          for await (const chunk of apiResponse.body) {
            version += chunk
          }
        } catch (err) {
          console.error(err.stack);
        }
      }
      version = JSON.parse(version)
      version = data_get(version, 'data.version')
      if (!version) {
        status = 404
        res['success'] = false
        res['data']['message'] = 'Not Found New Version'
      } else if (version_compare(plugin.version, version)) {
        status = 404
        res['success'] = false
        res['data']['message'] = 'Not Found New Version'
      }
      if (status === 404) {
        return response.json(res)
      }
    }

    if (!plugin.update_url) {
      status = 404
      res['success'] = false
      res['data']['message'] = 'Update_url not Found in Plugin'
    } else {
      if (!await plugin.updatePluginFiles(request)) {
        status = 500
        res['success'] = false
        res['data']['message'] = 'Update Plugin Files Error'
      } else {
        plugin.clearMetadata()
        if (plugin.enabled) {
          await  plugin.updatePluginSettings()
        }
      }
    }
    await Plugin.updateAltrpPluginLists()
    return response.status(status).json(res)
  }

  public async delete_plugin({request, response}: HttpContextContract) {

    let plugin = new Plugin({'name': request.qs().name})
    await plugin.deletePlugin()
    return response.json({'success': true, 'data': plugin})
  }

  public async install({request, response}: HttpContextContract) {
    let res: any = {success: true,}
    let status = 200

    let apiResponse
    try {
      apiResponse = await httpsRequest(request.input('update_url'), {
        headers:
          {
            // @ts-ignore
            'altrp-domain-resource': request.hostname(),
            'authorization': request.cookiesList().altrpMarketApiToken || ''
          }
      })
    } catch (e) {
      res = {
        'success': false,
        'message': e.message,
        'trace': e.stack.split('\n'),
      }
      status = 500
      return response.status(status).json(res)
    }

    let temp_path = storage_path('temp')
    let plugin = new Plugin({'name': request.input('name'),})
    fs.ensureDirSync(temp_path)

    let filename = temp_path + '/' + plugin.name + '.zip'
    fs.writeFileSync(filename, apiResponse)
    let archive = new AdmZip(filename)
    archive.readAsText(apiResponse)
    archive.extractAllTo(plugin.getPath(), true)

    fs.rmdirSync(temp_path, { recursive: true, })

    await plugin.updatePluginSettings()
    return response.json(res)
  }

  /**
   * Получить список установленных плагинов
   */
  public async plugins({response}: HttpContextContract,) {
    return response.json(await Plugin.getDownloadedPluginsList());
  }
}
