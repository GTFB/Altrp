import Resource from "../Resource";
import AltrpModel from "../AltrpModel";
import frontElementsFabric from "../../../../../front-app/src/js/classes/FrontElementsFabric";

/**
 * @class TemplateLoader
 */
class TemplateLoader {
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
    this.resource = new Resource({route: '/ajax/templates'});
    this.templatesCache = new AltrpModel({});
  }

  /**
   * Загрузить шаблон по ид
   * @param {integer | string} templateId
   * @param {boolean} force
   * @param {*} templateId
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
        template = await this.resource.get(templateId);
        this.templatesCache.setProperty(templateId, template);
      } else {
        template = this.templatesCache.getProperty(templateId);
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

    let templateData = _.get((await this.loadTemplate(templateId, force)), 'data');
    templateData = JSON.parse(templateData);

    return frontElementsFabric.parseData(templateData);
  }

}

 window.templateLoader =  new TemplateLoader();

export default window.templateLoader;