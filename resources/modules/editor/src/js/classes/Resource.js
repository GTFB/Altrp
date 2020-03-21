/**
 * @class
 * */
class Resource {


  /**
   * @member {Object} routes
   * @member {string} routes.get
   * @member {string} routes.post
   * @member {string} routes.create
   * @member {string} routes.getAll
   */
  constructor(routes){

    this.routes = routes;
  }
  /**
   * @return {Promise}
   * */
  get(id){
    if( this.routes.get === undefined ){
      throw '"get" url expected in ' + this.constructor.name;
    }
    if(! id ){
      throw 'Get only by "id"';
    }

    let options = {
      method: 'get',
    };

    let url = this.routes.get.replace('{id}', id);
    return fetch(url, options);
  }

  /**
   * @return {Promise}
   * */
  create(data){
    if( this.routes.create === undefined ){
      throw '"create" url expected in ' + this.constructor.name;
    }

    let options = {
      method: 'post',
      data,
    };
    return fetch(this.routes.create, options);
  }
}

export default Resource;