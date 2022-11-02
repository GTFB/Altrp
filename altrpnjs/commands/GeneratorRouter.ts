import { BaseCommand, } from '@adonisjs/core/build/standalone'
import RouterGenerator from "App/Generators/RouterGenerator";

export default class GeneratorTRouter extends BaseCommand {
  public static commandName = 'generator:router'

  public static description = 'Run a Router Generator'

  public id: string[]

  public isDelete: boolean

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    console.log('Run a Router Generator');
    const routerGenerator = new RouterGenerator()

    await routerGenerator.run()
    console.log('Stop a Router Generator');
  }
}
