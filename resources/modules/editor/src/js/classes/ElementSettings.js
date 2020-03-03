class ElementSettings {
  constructor(name, data){
    if(! name)
      throw 'Elements Settings Must Has Name';
    this.name = name;
  }
  setValue(value){
    this.value = value;
  }
  getValue(){
    return this.value;
  }
  toString(){
    return this.value.toString();
  }
  getLabel(){

  }

}

export default ElementSettings