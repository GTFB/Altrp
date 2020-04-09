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
  constructor(data){

    this.route = data.route;
    if(! this.route){
      throw 'Нужен URL';
    }
  }
  /**
   * @return {Promise}
   * */
  get(id){
    if(! id){
      throw 'Get only by "id"';
    }

    let options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    let url = this.route + '/' + id;
    return fetch(url, options);
  }

  /**
   * @return {Promise}
   * */
  post(data){
    data._token = _token;
    let options = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    };
    return fetch(this.route, options);
  }

  /**
   * @return {Promise}
   * */
  put(id, data){
    data._token = _token;
    let options = {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    };
    let url = this.route + '/' + id;
    return fetch(url, options);
  }
  /**
   * @return {Promise}
   * */
  delete(data){

    let options = {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },

    };
    let url = this.route + '/' + id;
    return fetch(url, options);
  }
}

export default Resource;