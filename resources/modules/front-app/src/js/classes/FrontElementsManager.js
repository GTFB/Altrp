import {defaultState} from "../store/front-elements-store/defaultState";


class FrontElementsManager {
  constructor() {
    this.components = {};
    //список компонентов
    this.ELEMENTS = defaultState
    this.elementsLists = []
  }

  /**
   *
   * @return {Promise<void>}
   */
  async loadComponents(elementsLists = null) {
    let componentsToLoad = [];
    if(! elementsLists){
      elementsLists = window.altrpElementsLists
    }
    const pluginsElements = {

    }
    if (elementsLists) {
      elementsLists = elementsLists.filter(elementName =>{
        let result = this.ELEMENTS.find(element => elementName === element.name);
        if(! result){
          let pluginFilters = _.get(window, 'altrpPlugins.frontElementFilters.' + elementName, [])
          pluginFilters = _.orderBy(pluginFilters, 'priority')
          if(pluginFilters[0]){
            pluginsElements[elementName] = pluginFilters[0]
            componentsToLoad.push(pluginFilters[0])
            result = true
          }
        }
        return result
      })
      this.elementsLists = [
        ...elementsLists,
        ...this.elementsLists,
      ]
      this.elementsLists = _.uniq(this.elementsLists)

      componentsToLoad = [
        ...this.ELEMENTS.filter(el => {
        return elementsLists.indexOf(el.name) !== -1;
      }),
        ...componentsToLoad
      ];

      componentsToLoad = componentsToLoad.map(el => {

        return new Promise((resolve, reject) => {
          try {

            el.import().then(res=>{


              this.components[el.name] = res.default || res
              resolve(res);
            }).catch(e=>{
              reject(e)

            })
          }catch (e) {
            reject(e)
          }
        })
      });
    } else {
      componentsToLoad = this.ELEMENTS.map(async el => {
        return (this.components[el.name] = (
          await el.import()
        ).default);
      });
    }
    return await Promise.all(componentsToLoad);
    // return true;
  }

  /**
   * Загружаем все компоненты
   * @return {Promise<void>}
   */
  async loadAllComponents() {
    const componentsToLoad = this.ELEMENTS.map(async el => {
      this.components[el.name] = (
        await el.import(/* webpackChunkName: 'FrontElementsFabric' */)
      ).default;
    });
    await Promise.all(componentsToLoad);
  }
  /**
   * Загружаем оставшиеся компоненты
   * @return {Promise<void>}
   */
  async loadNotUsedComponent() {
    if (!window.altrpElementsLists) {
      return;
    }
    if(window.LIBS){
      await Promise.all(Object.values(window.LIBS).map(l=>l()));
    }
    let componentsToLoad = this.ELEMENTS.filter(el => {
      return window.altrpElementsLists.indexOf(el.name) === -1;
    });
    componentsToLoad = componentsToLoad.map(async el => {
      this.components[el.name] = (
        await el.import()
      ).default;
    });
    await Promise.all(componentsToLoad);
  }
  /**
   * проверяем все ли виджеты из window.altrpElementsLists загрузились
   */
  componentsIsLoaded() {
    if(this.elementsLists?.length && ! Object.keys(this.components).length ){
      return false
    }
    let result = true
    if (! this.elementsLists) {
      this.ELEMENTS.forEach(element=>{
        if(! result) {
          return
        }
        if(Object.keys(this.components).indexOf(element.name) === -1){
          result = false
        }
      })
      return result
    }
    window.altrpElementsLists.forEach(element=>{
      if(! result) {
        return
      }
      if(Object.keys(this.components).indexOf(element) === -1){
        result = false
      }
    })

    return result
  }

  /**
   *
   * @param name
   * @return {*}
   */
  getComponentClass(name) {
    if (!this.components[name]) {
      console.error("Not found component with name: " + name);
      return "div";
    }
    return this.components[name];
  }

  checkElementExists(elementName) {
    return !!this.components[elementName];
  }



  /**
   * добавляем компонент виджета
   * @param {{
   *   name: string,
   *   import: function <Promise>
   * }} element
   */
  addElement(element){
    this.ELEMENTS.push(element)
  }
}
window.frontElementsManager = new FrontElementsManager();
export default window.frontElementsManager;
