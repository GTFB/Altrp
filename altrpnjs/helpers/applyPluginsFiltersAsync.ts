import Plugin from "App/Plugin";
import fs from "fs";
import app_path from "./app_path";
import isProd from "./isProd";
import Logger from "@ioc:Adonis/Core/Logger";

export default async function applyPluginsFiltersAsync(type: string, content,) {

  const base = `AltrpPlugins`

  const plugins = Plugin.getEnabledPlugins()
  for (const plugin of plugins) {
    const hasType = fs.existsSync(app_path(`${base}/${plugin.name}/hooks/async/${type}`));
    if (hasType) {
      const hooks = fs.readdirSync(app_path(`${base}/${plugin.name}/hooks/async/${type}`))
      for (const hookName of hooks) {
        const filePath = app_path(`${base}/${plugin.name}/hooks/async/${type}/${hookName}`)
        try {
          const hook = isProd() ? (require(filePath)).default
            : (await import(filePath)).default
          content = await hook(content)
        } catch (e) {
          Logger.error(e)
        }
      }
    }

  }


  return content
}
