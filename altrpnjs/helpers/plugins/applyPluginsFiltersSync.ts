import Plugin from 'App/Plugin';
import fs from 'fs';
import app_path from '../path/app_path';
import Logger from '@ioc:Adonis/Core/Logger';

export default function applyPluginsFiltersSync(type: string, content) {
  const base = `AltrpPlugins/sync`;

  const plugins = Plugin.getEnabledPlugins();

  for (const plugin of plugins) {
    const hasType = fs.existsSync(app_path(`${base}/${plugin.name}/hooks/${type}`));
    if (hasType) {
      const hooks = fs.readdirSync(app_path(`${base}/${plugin.name}/hooks/${type}`));

      for (const hookName of hooks) {
        const filePath = app_path(`${base}/${plugin.name}/hooks/${type}/${hookName}`);
        try {
          const hook = require(filePath).default;

          content = hook(content);
        } catch (e) {
          Logger.error(e);
        }
      }
    }
  }

  return content;
}
