import Resource from "../Resource";
import AltrpModel from "../AltrpModel";
import frontElementsFabric from "../../../../../front-app/src/js/classes/FrontElementsFabric";
/**
 * @class TemplateLoader
 */
class TemplateLoader {
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
    if(update){
      let template = await this.resource.get(templateId);
      this.templatesCache.setProperty(templateId, template);
      return template;
    }
    return Promise.resolve(this.templatesCache.getProperty(templateId));
  }
  /**
   * Загрузить шаблон по ид
   * @param {integer | string} templateId
   * @param {boolean} force
   * @param {*} templateId
   */
  async loadParsedTemplate(templateId, force = false){
    let update = force;
    templateId = Number(templateId) ? Number(templateId) : templateId;
    if(! update){
      update = ! this.templatesCache.hasProperty(templateId);
    }
    let template;
    if(update){
      template = await this.resource.get(templateId);
      this.templatesCache.setProperty(templateId, template);
    } else {
      template = this.templatesCache.getProperty(templateId);
    }
    let templateData = JSON.parse(template.data);
    return frontElementsFabric.parseData(templateData);
  }
}

const templateLoader =  new TemplateLoader();
window.templateLoader = templateLoader;

export default templateLoader;