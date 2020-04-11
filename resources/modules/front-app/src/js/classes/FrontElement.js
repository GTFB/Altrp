
class FrontElement {

  constructor(data){
    this.name = data.name;
    this.settings = data.settings;
    this.children = data.children;
    this.type = data.type;
    this.id = data.id;
    this.componentClass = window.frontElementsManager.getComponentClass(this.getName());
    this.parent = null;
  }

  getChildren(){
    return this.children;
  }
  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getType(){
    return this.type;
  }
  getSettings(){
    return this.settings;
  }
}

export default FrontElement