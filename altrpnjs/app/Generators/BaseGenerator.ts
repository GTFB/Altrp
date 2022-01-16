import * as mustache from 'mustache'
import fs from 'fs'

export abstract class BaseGenerator{
  private fileName: string;
  private directory: string;
  private stubFilePath: string;

  protected addFile(fileName: string):this {
    this.fileName = fileName
    return this
  }

  protected destinationDir(directory:string):this{
    this.directory = directory
    return this
  }

  protected stub(stubFilePath:string):this{
    this.stubFilePath = stubFilePath
    return this
  }

  protected async apply(vars: object){
    let content: string = ''

    if(fs.existsSync(this.stubFilePath)){
      content = fs.readFileSync(this.stubFilePath, {encoding: 'utf8'})
    }

    content = mustache.render(content, vars)
    if(! fs.existsSync(this.directory)){
      fs.mkdirSync(this.directory)
    }
    fs.writeFileSync(this.getFullFileName(), content)
    return
  }

  private getFullFileName():string{
    return `${this.directory}/${this.fileName}`
  }
}
