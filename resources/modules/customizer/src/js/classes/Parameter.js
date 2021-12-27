/**
 * @class Parameter
 */
class Parameter {
  constructor({name, types, required}){
    if(! name){
      throw new Error('Parameter name is required')
    }
    if(! types){
      throw new Error('Parameter types is required')
    }
    if(!_.isArray(types)){
      throw new TypeError('Parameter types must be Array')
    }
    this.name = name
    this.types = types
    this.required = required
  }
}

export default Parameter
