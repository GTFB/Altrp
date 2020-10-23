import queryString from 'query-string';
window.queryString = queryString;
/**
 * @class Resource
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
    let route = this.route;
    let url;
    if(route[route.length - 1] === '/'){
       url = route + id;
    } else {
       url = route + '/' + id;
    }
    return fetch(url, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
  }
  /**
   * простой запрос
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
   * Запрос со строкой для поиска вхождений
   * @param {string} searchString
   * @return {Promise}
   * */
  search(searchString){
    let options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    let url;
    if(this.route.indexOf('?') === -1){
      url = this.route + `?s=${searchString}`;
    } else {
      url = this.route + `&s=${searchString}`;
    }
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
    headers = headers || {
      'X-CSRF-TOKEN': _token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
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
    }).catch((err)=>{
      console.log(err);
      return err.then();
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
    let options = {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'X-CSRF-TOKEN': _token,
        'Content-Type': 'application/json'
      },
    };
    let url = this.route + (id ? '/' + id : '');
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
  delete(id = ''){

    let options = {
      method: 'delete',
      headers: {
        'X-CSRF-TOKEN': _token,
        'Content-Type': 'application/json'
      },
    };
    let url = this.route + (id ? '/' + id : '');
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

  /**
   * GET запрос с параметрами
   * @param {object} params
   * @return {Promise}
   * */
  async getQueried(params){
    let options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    let _params = {};
    _.forEach(params, (paramValue, paramName)=>{
      if(_.isArray(paramValue)){
        paramValue = paramValue.join(',');
      }
      _params[paramName] = paramValue;
    });
    let url = queryString.parseUrl(this.route).url;
    _params = _.assign( queryString.parseUrl(this.route).query, _params);
    url = `${url}?${queryString.stringify(_params)}`;
    let res =  await fetch(url, options).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.json()
    });
    // console.log(res);
    return res;
  }

}

export default Resource;