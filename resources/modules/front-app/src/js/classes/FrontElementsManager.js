import {defaultState} from "../store/front-elements-store/defaultState";


class FrontElementsManager {
  constructor() {
    this.components = {};
    //список компонентов
    this.ELEMENTS = defaultState
  }

  /**
   *
   * @return {Promise<void>}
   */
  async loadComponents(elementsLists = null) {
    let componentsToLoad;
    if(! elementsLists){
      elementsLists = window.altrpElementsLists
    }
    if (elementsLists) {
      elementsLists = elementsLists.filter(elementName =>{
        return this.ELEMENTS.find(element => elementName === element.name);
      })
      componentsToLoad = this.ELEMENTS.filter(el => {
        return elementsLists.indexOf(el.name) !== -1;
      });
      // componentsToLoad = componentsToLoad.map(async el => {
      //   return (this.components[el.name] = (
      //     await el.import()
      //   ).default);
      // });
      componentsToLoad = componentsToLoad.map(el => {
        // console.log(`START Loading Widget Component ${el.name}`, performance.now());
        return new Promise((resolve, reject) => {
          el.import().then(res=>{
            // console.log(`LOAD Widget Component ${el.name}`, performance.now());
            this.components[el.name] = res.default
            resolve(res);
          })
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
    if(window.altrpElementsLists?.length && ! Object.keys(this.components).length ){
      return false
    }
    let result = true
    if (! window.altrpElementsLists) {
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
