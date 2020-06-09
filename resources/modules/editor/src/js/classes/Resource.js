/**
 * @class
 * */

export const MAX_FILE_SIZE = 10485760;
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
      throw 'Нужен route';
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
   * @param {any} data
   * @param {object | null} headers
   * @return {Promise}
   * */
  post(data = {}, headers){
    data._token = _token;
    headers = headers || {
      'Content-Type': 'application/json'
    };
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    };
    return fetch(this.route, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
  }
  /**
   * @param {FileList} files
   * @param {string} fileType
   * @return {Promise}
   * */
  postFiles(files, fileType){
    // data._token = _token;
    let boundary = String(Math.random()).slice(2);
    fileType = fileType || 'image';
    let headers = {
      'X-CSRF-TOKEN': _token,
      // 'Content-Type': 'multipart/form-data; boundary=' + boundary
    };
    let formData = new FormData();
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      if(files[i].size > MAX_FILE_SIZE || files[i].type.indexOf(fileType) !== 0){
        console.log(files[i]);
        continue;
      }
      formData.append(`files[${i}]`, files[i]);
    }
    let options = {
      method: 'POST',
      body: formData,
      headers,
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
        'X-CSRF-TOKEN': _token,
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
  delete(id){

    let options = {
      method: 'delete',
      headers: {
        'X-CSRF-TOKEN': _token,
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
  getOptions(){

    let options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    let url = this.route + '/options';
    return fetch(url, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
  }

}

export default Resource;