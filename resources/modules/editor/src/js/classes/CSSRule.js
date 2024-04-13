class CSSRule {
  constructor(selector, property){
    this.selector = selector;
    if(typeof property === 'string'){
      this.defaultPoperties = [property];
    } else if((typeof property === 'object') && property.length){
      this.defaultPoperties = property;
    }
    this.defaultPoperties = this.defaultPoperties.map(property=>{
      if(property[property.length - 1] !== ';'){
        property = property.concat(';');
      }
      return property;
    });
  }
  setValue(value){
    this.value = value;
  }
  insertValue(value){
    value = value || this.value;
    switch (typeof value){
      case 'string':{
        this.insertValueString(value);
      }
      break;
      case 'number':{
        this.insertValueString(value);
      }
      break;
      case 'object':{
        this.insertValueObject(value);
      }
      break;
    }
  }
  insertValueString(value){
    this.properties = this.defaultPoperties.map(property => property.replace(/{{VALUE}}/g, value));
  }
  insertValueObject(object){
    object = {...object}
    /**
     * replace css color to css var value
     */
    if(object.color && object.guid && object.cssVar){
      object.color = object.cssVar
    }
    let pairs = _.toPairs(object);

    this.properties = this.defaultPoperties.map(property => {
      pairs.forEach(pair => {
        if(pair[1]){
          property = property.split(`{{${pair[0].toUpperCase()}}}`).join(pair[1]);
        }
      });
      property = property.replace(/{{([\s\S]+?)}}/g, '');
      return property;
    });
  }
}

export default CSSRule
