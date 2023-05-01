import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from 'App/Customizer/Nodes/NodeInterface'
import data_get from "../../../helpers/data_get"
import forEach from "lodash/forEach";

export default class ValidatorNode extends BaseNode implements NodeInterface
{
  public getJSContent(): string
  {

    let JSContent = ''
    let data = this.data

    const {
      selectedItems = [],
      label = '',
    } = data.data

    if(selectedItems.length > 0){
      JSContent = `
    try{
      if(this.getCustomizerData('request')){
        ${this.renderSchemaVar()}
        ${this.renderDataSave()}
      }
    } catch(e) {
      console.error('Error in Validator Node "${label}"');
      console.error(e);
      throw e;
    }
      `
    }

    for(const child of this.children){
      JSContent += child.getJSContent()
    }
    return JSContent
  }

  getSettings=()=>{
    return data_get(this.data, 'data.settings', {})
  }
  renderSchemaVar = ()=>{
    const settings = this.getSettings()
    let varContent = `const {
        schema, rules
      } = Validator
      const validatorSchema = schema.create({`
    forEach(settings, (value, key)=>{
      varContent += this.renderSchemaProperty(value,key)
    })
    varContent+=`
      });`
    return varContent
  }
  renderSchemaProperty = (settings, name)=>{
    let propertyContent = `
        ${name}: schema.`
    const {
      mark = '',
      type = 'string',
      rules = [],
    } = settings

    propertyContent += type

    if(mark){
      propertyContent += `.${mark}`
    }
    propertyContent += '('
    if(type === 'string'){
      propertyContent += '{}, ['
    }
    rules.forEach(r=>{
      propertyContent += this.renderRule(r)
    })
    propertyContent+=`]),`
    return propertyContent
  }
  renderRule = (rule)=>{
    let ruleContent = `
        rules.${rule.name}(`
    switch (rule.name) {
      case 'email': {
        break;
      }
    }
    ruleContent+='),'
    return ruleContent

  }
  renderDataSave = ()=>{
    let content = ''
    const data = this.data

    let {
      path
    } = data.data
    if(path){
      if(path.indexOf('context') === 0){
        path = path.replace('context.', '')
        path = path.replace('context', '')
      }
      content += `this.setCustomizerData('context.${path}',
          await this.getCustomizerData('request').validate(
            {
              schema: validatorSchema,
              messages: ${this.renderMessages()}
            }
          ))`
    }
    return content
  }
  renderMessages=()=>{
    let messagesContent = '{'
    const settings = this.getSettings()
    forEach(settings, (value, key)=>{
      const {rules = [], mark, required_message = ''} = value
      if(! mark && required_message){
        messagesContent += `
          '${key}.required': this.replaceContentWithData('${required_message}'),`

      }
      rules.forEach(rule => {
        messagesContent += `
          '${key}.${rule.name}': this.replaceContentWithData('${rule.message || ''}'),`
      })
    })
    messagesContent+= `},`
    return messagesContent
  }
}
