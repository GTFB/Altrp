class ElementSettings {
  constructor(name){
    if(! name)
      throw 'Elements Settings Must Has Name';
    this.name = name;
  }
  setValue(value){
    this.value = value;
  }
  toString(){
    return this.value.toString();
  }
}

export default ElementSettings