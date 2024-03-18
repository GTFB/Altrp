import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from 'App/Customizer/Nodes/NodeInterface'

export default class EmailTemplateNode extends BaseNode implements NodeInterface
{
  public getJSContent(): string
  {

    let JSContent = ''
    let _data = this.data.data
    let  {
      value,
      data,
      path,
    } = _data

    if(value.includes('`')){
      value = value.replaceAll('`', '\\`')
    }
    if(path){
      if(path.indexOf('context.') === 0){
        path = path.replace('context.', '')
      }
      data = data || ''
      if(data.indexOf('context.') === 0){
        data = data.replace('context.', '')

      }
      JSContent += `
  this.setCustomizerData('context.${path}', require('mustache').render(\`
  ${value}
  \`, this.getCustomizerData('context.${data}', {})));
      `
    }

    for(const child of this.children){
      JSContent += child.getJSContent()
    }
    return JSContent
  }

}
