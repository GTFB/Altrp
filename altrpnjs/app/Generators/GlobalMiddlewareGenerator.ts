import app_path from "../../helpers/path/app_path"
import BaseGenerator from "./BaseGenerator"
import ModelGenerator from "App/Generators/ModelGenerator";
import Customizer from "App/Models/Customizer";
import isProd from "../../helpers/isProd";
import clearRequireCache from "../../helpers/node-js/clearRequireCache";
import fs from "fs"
import path from 'path'

export default class GlobalMiddlewareGenerator extends BaseGenerator {

  public static directory = app_path('/AltrpGlobalMiddlewares/')
  private static template = app_path(`/altrp-templates/${isProd() ? 'prod' : 'dev'}/AltrpGlobalMiddleware.stub`)
  private customizer: Customizer

  public async run(customizer: Customizer): Promise<void> {
    if (!customizer || customizer.type !== 'global_middleware') {
      return
    }
    this.customizer = customizer


    let type = 'before'

    const startNode = customizer.getStartNode()

    if (startNode?.data?.data?.middleware_type) {
      type = startNode?.data?.data?.middleware_type
    }

    let before_content = ''

    let after_content = `
    await next();
    `
    if (type !== 'before'){
      after_content = ''
      before_content = `
    await next();
    `
    }

      await this.addFile(this.getFilename())
        .destinationDir(GlobalMiddlewareGenerator.directory)
        .stub(GlobalMiddlewareGenerator.template)
        .apply({
          before_content,
          after_content,
          imports: this.getImportsContent(),
          classname: this.getClassnameContent(),
          properties: this.getPropertiesContent(),
          content: `
  await(
    async()=>{
      ${customizer.getMethodContent()}
    }
  )()
          `,
        })

    clearRequireCache()
  }

  public getFilename(): string {
    return `${this.customizer.name}Middleware${ModelGenerator.ext}`
  }

  private getImportsContent(): string {
    return isProd() ? this._getProdImportsContent() : this._getDevImportsContent()

  }


  private getClassnameContent(): string {
    return ` ${this.customizer.name}Middleware `
  }

  private getPropertiesContent(): string {
    return ''
  }


  private _getProdImportsContent() {
    return `
    `;
  }

  private _getDevImportsContent(): string {
    return `
`;
  }

  static clearFolder() {
    const directoryPath = GlobalMiddlewareGenerator.directory
    if(! fs.existsSync(directoryPath)){
      return
    }
    const files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.unlinkSync(filePath);

    });
  }
}
