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
      //console.error(e);
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
        "${name}": schema.`
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
    } else {
      propertyContent += '['
    }
    rules.forEach(r=>{
      propertyContent += this.renderRule(r)
    })

    let members = this.renderMembers(settings)

    propertyContent+=`
    ])${members},`
    return propertyContent
  }

  renderMembers(settings){

    const {
      type = 'string',
      array_members = 'string',
    } = settings

    if(type !== 'array' && type !== 'object'){
      return ''
    }

    if(type === 'object'){
      return `.members({})`
    }
    if(type === 'array'){
      return `.members(schema.${array_members}())`
    }
  }
  renderRule = (rule)=>{
    let ruleContent = `
          rules.${rule.name}(`
    switch (rule.name) {
      case 'email':
      case 'mobile':
        break;
      case 'regex':{
        ruleContent += rule.regex || ''
      }
        break;
      case 'confirmed':
      case 'requiredIfNotExists':
      case 'requiredIfExists':{
        ruleContent += `'${rule.field}'` || ''
      }
        break;
      case 'maxLength':{
        ruleContent += rule.max || '1'
      }
        break;
      case 'minLength':{
        ruleContent += rule.min || '0'
      }
        break;
      case 'exists':
      case 'unique':{
        ruleContent += `{table:'${rule.table}', column:'${rule.column}'}`
      }
        break;
    }
    ruleContent+='),'

    switch (rule.name){
      case 'email': {
        ruleContent += `
          rules.normalizeEmail({
            allLowercase: true,
            gmailLowercase: true,
            yahooLowercase: true,
          }),
      `
      } break;
    }
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
      const {
        rules = [],
        mark,
        type,
        required_message = '',
        boolean_message = '',
        string_message = '',
        number_message = '',
      } = value
      if(! mark && required_message){
        messagesContent += `
          '${key}.required':
          this.replaceContentWithData(
            (await translateContent('${required_message}', {lang: httpContext.request.cookie('altrp_lang') || get_altrp_setting('site_language', 'en')})).content
          ),`

      }
      if(type === 'number'){
        messagesContent += `
          '${key}.number':
          this.replaceContentWithData(
            (await translateContent('${number_message}', {lang: httpContext.request.cookie('altrp_lang') || get_altrp_setting('site_language', 'en')})).content
          ),`
      }
      if(type === 'boolean'){
        messagesContent += `
          '${key}.boolean':
          this.replaceContentWithData(
            (await translateContent('${boolean_message}', {lang: httpContext.request.cookie('altrp_lang') || get_altrp_setting('site_language', 'en')})).content
          ),`
      }
      if(type === 'string'){
        messagesContent += `
          '${key}.string':
          this.replaceContentWithData(
            (await translateContent('${string_message}', {lang: httpContext.request.cookie('altrp_lang') || get_altrp_setting('site_language', 'en')})).content
          ),`
      }
      rules.forEach(rule => {
        messagesContent += `
          '${key}.${rule.name}': this.replaceContentWithData(
            (await translateContent('${rule.message || ''}', {lang: httpContext.request.cookie('altrp_lang') || get_altrp_setting('site_language', 'en')})).content
          ),`
      })
    })
    messagesContent+= `},`
    return messagesContent
  }
}
