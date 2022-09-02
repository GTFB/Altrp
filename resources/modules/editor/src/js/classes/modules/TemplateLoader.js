import Resource from "../Resource";
import AltrpModel from "../AltrpModel";
import frontElementsFabric from "../../../../../front-app/src/js/classes/FrontElementsFabric";
import {isEditor} from "../../../../../front-app/src/js/helpers";
/**
 * @class TemplateLoader
 */
export class TemplateLoader {
  /**
   * Хранилище статусов получения данных, чтобы не делать много параллельных запросов
   * @type {{}}
   */
  static statuses = {};
  /**
   * Хранилище обратных вызовов, чтобы не делать много параллельных запросов
   * @type {{}}
   */
  static pendingCallbacks = {};


  constructor(){
    this.templatesCache = new AltrpModel(_.get(window.__altrp_settings__, 'templates_data',{}));
  }

  /**
   * Загрузить шаблон по ид
   * @param {integer | string} templateId
   * @param {boolean} force
   * @param {*} templateId
   * @return {[]}
   */
  async loadTemplate(templateId, force = false){
    let update = force;
    templateId = Number(templateId) ? Number(templateId) : templateId;

    if(! update){
      update = ! this.templatesCache.hasProperty(templateId);
    }

    if(_.get(TemplateLoader, `statuses.${templateId}`) === 'loading'){
      return new Promise((resolve, reject) => {
        TemplateLoader.pendingCallbacks[templateId] = TemplateLoader.pendingCallbacks[templateId] || [];
        TemplateLoader.pendingCallbacks[templateId].push(resolve);
      })
    }

    TemplateLoader.statuses[templateId] = 'loading';

    try {

      let template = null;

      if (update) {
        const resource = new Resource({route: `/ajax/templates/${templateId}`});
        template = await resource.getQueried({withStyles: true});
        if(_.isString(template.styles)){
          let _document = isEditor() ?
              document.getElementById("editorContent").contentWindow.document :
              document;

          const stylesElement = _document.createElement('style')
          stylesElement.setAttribute(`data-template-styles`, template.guid)
          stylesElement.innerHTML = template.styles

          _document.head.appendChild(stylesElement)
          delete template.styles
        }
        this.templatesCache.setProperty(templateId, template);
      } else {
        template = this.templatesCache.getProperty(templateId);
      }
      if(! isEditor() && ! document.querySelector(`[data-template-styles="${template.guid}]"`)){
        const resource = new Resource({route: `/ajax/templates/${templateId}`});
        let template = await resource.getQueried({withStyles: true});
        if(_.isString(template.styles)){
          let _document = isEditor() ?
            document.getElementById("editorContent").contentWindow.document :
            document;

          const stylesElement = _document.createElement('style')
          stylesElement.setAttribute(`data-template-styles`, template.guid)
          stylesElement.innerHTML = template.styles

          _document.head.appendChild(stylesElement)
        }
      }
      if(_.isArray(TemplateLoader.pendingCallbacks[templateId])){
        TemplateLoader.pendingCallbacks[templateId].forEach(callback=>{
          callback(template);
        });
      }

      TemplateLoader.statuses[templateId] = 'loaded';
      TemplateLoader.pendingCallbacks[templateId] = [];
      return template;

    }catch(error){
      console.error(error);
      if(_.isArray(TemplateLoader.pendingCallbacks[templateId])){
        TemplateLoader.pendingCallbacks[templateId].forEach(callback=>{
          callback(null);
        });
      }
      TemplateLoader.statuses[templateId] = 'loaded';
      TemplateLoader.pendingCallbacks[templateId] = [];
      return null;
    }

    //return Promise.resolve(this.templatesCache.getProperty(templateId));
  }

  /**
   * Загрузить шаблон по ид
   * @param {integer | string} templateId
   * @param {boolean} force
   * @param {*} templateId
   */
  async loadParsedTemplate(templateId, force = false){

    if(! templateId){
      return null;
    }
    templateId = Number(templateId) ? Number(templateId) : templateId;

    const template = await this.loadTemplate(templateId, force)
    return new Promise(resolve => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href',  `/altrp/css/DEFAULT_BREAKPOINT/${template.guid}.css`)
      if(isEditor()){
        let iframe = document.getElementById("editorContent")
        iframe.contentDocument.head.appendChild(link)
      } else {
        document.head.appendChild(link)
      }

      link.addEventListener('error',(e)=>{
        link.setAttribute('href',  `/altrp/css/${template.guid}.css`)

      })
      link.addEventListener('load',()=>{
        let templateData = _.get(template, 'data');
        templateData = JSON.parse(templateData);
        resolve(frontElementsFabric.parseData(templateData))
      })
    })
  }

  /**
   *
   * @param {string} templateId
   * @returns {null|{}}
   */
  mbGetParsedTemplate(templateId){
    if(! this.templatesCache.hasProperty(templateId)){
      return null;
    }
    let templateData = _.get(this.templatesCache.getProperty(templateId), 'data');
    templateData = JSON.parse(templateData);
    return frontElementsFabric.parseData(templateData)
  }
}

  window.templateLoader =  new TemplateLoader();

export default window.templateLoader;
