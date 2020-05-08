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
    return fetch(url, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
  }
  /**
   * @return {Promise}
   * */
  getAll(){

    let options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    let url = this.route;
    return fetch(url, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
  }

  /**
   * @return {Promise}
   * */
  post(data){
    data._token = _token;
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    };
    return fetch(this.route, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
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
    return fetch(url, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
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
    return fetch(url, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
  }
}

export default Resource;