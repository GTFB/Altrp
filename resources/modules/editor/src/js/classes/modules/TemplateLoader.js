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

      const resource = new Resource({route: `/ajax/templates/${templateId}`});
      let template = await resource.getQueried({withStyles: true});

      if (update) {
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

      // if(! isEditor() && ! document.querySelector(`[data-template-styles="${template.guid}"]`)){
      //
      //   if(_.isString(template.styles)){
      //     let _document = isEditor() ?
      //       document.getElementById("editorContent").contentWindow.document :
      //       document;
      //
      //     const stylesElement = _document.createElement('style')
      //     stylesElement.setAttribute(`data-template-styles`, template.guid)
      //     stylesElement.innerHTML = template.styles
      //
      //     _document.head.appendChild(stylesElement)
      //   }
      // }
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
    /**
     * for loading the styles before loading the html
     */
    return this.stylesResolve({
      template,

    })
  }

  /**
   *
   * @param template
   * @param templateGUID
   * @returns {Promise<{} | null>}
   */
   stylesResolve = async ({
     template = null,
     templateGUID = null
   })=>{
    return new Promise(  resolve => {
      if(template?.guid){
        templateGUID = template?.guid
      }
      const _doc = isEditor() ?
        document.getElementById("editorContent").contentDocument :
        document
      let link = _doc.createElement('link')
      link.addEventListener('load',()=>{
        if(! template){
          resolve(null)
          return
        }
        let templateData = _.get(template, 'data');
        templateData = JSON.parse(templateData);
        resolve(frontElementsFabric.parseData(templateData))
      })
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href',  `/altrp/css/DEFAULT_BREAKPOINT/${templateGUID}.css`)

      _doc.head.appendChild(link)


      link.addEventListener('error',(e)=>{
        link.remove()
        /**
         * New link element
         * @type {HTMLLinkElement}
         */
        link = _doc.createElement('link')
        link.addEventListener('load',()=>{
          if(! template){
            resolve(null)
            return
          }
          let templateData = _.get(template, 'data');
          templateData = JSON.parse(templateData);
          resolve(frontElementsFabric.parseData(templateData))
        })
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href',  `/altrp/css/${templateGUID}.css`)
        _doc.head.appendChild(link)

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
  async loadHtmlTemplate(templateGUID){
    let url = `/altrp/html/screens/${appStore.getState().currentScreen.name}/templates/card/${templateGUID}.html`
    const html = await (new Resource({route:url})).getAsText()
    await this.stylesResolve({templateGUID})
    return html
  }
}

  window.templateLoader =  new TemplateLoader();

export default window.templateLoader;
