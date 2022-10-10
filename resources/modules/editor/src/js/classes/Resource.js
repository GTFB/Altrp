import queryString from "query-string";
import replaceContentWithData from "../../../../front-app/src/js/functions/replaceContentWithData";
import getCookie from "../helpers/getCookie";
window.queryString = queryString;
/**
 * @class Resource
 * */
export const MAX_FILE_SIZE = 256886080;

class Resource {
  /**
   * @member {Object} routes
   * @member {string} routes.get
   * @member {string} routes.post
   * @member {string} routes.create
   * @member {string} routes.getAll
   */
  constructor(data) {
    this.route = data.route;
    /**
     * Нужно ли при каждом запросе подставлять в URL данные
     * @type {*|boolean}
     */
    this.dynamicURL = data.dynamicURL || false;
    if (!this.route) {
      throw "Нужен route";
    }
  }

  /**
   * Получить роут
   * @return {string}
   */
  getRoute() {

    return this.dynamicURL ? replaceContentWithData(this.route) : this.route;
  }
  /**
   * @return {Promise}
   * */

  getAuthorList() {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    return fetch("/admin/ajax/users", options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }

  get(id) {
    if (!id) {
      console.error('Get only by "id"');
    }

    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let route = this.getRoute();
    let url;
    if (route[route.length - 1] === "/") {
      url = route + id;
    } else {
      url = route + "/" + id;
    }
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }

  /**
   * Делает GET запрос в роуты по типу /route/{id}/somedata
   * @return {Promise}
   * */
  getInContext(id) {
    if (!id) {
      console.error('Get only by "id"');
    }

    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let route = this.getRoute();

    let url = route.replace(`{id}`, id);
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }
  /**
   * простой запрос
   * @return {Promise}
   * */
  getAll(customHeaders = null) {
    let options = {
      method: "get",
      headers: _.assign(
        {
          "Content-Type": "application/json"
        },
        customHeaders
      )
    };

    let url = this.getRoute();
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }
  /**
   * простой запрос
   * @return {Promise}
   * */
  getAsText() {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "text/plain"
      }
    };

    let url = this.getRoute();
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.text();
    });
  }

  /**
   * Запрос со строкой для поиска вхождений
   * @param {string} searchString
   * @return {Promise}
   * */
  search(searchString) {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let url;
    if (this.getRoute().indexOf("?") === -1) {
      url = this.getRoute() + `?s=${searchString}`;
    } else {
      url = this.getRoute() + `&s=${searchString}`;
    }
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }
  /**
   * @param {any} data
   * @param {object | null} headers
   * @return {Promise}
   * */
  post(data = {}, headers) {
    let _token = getCookie('XSRF-TOKEN')
    const defaultHeaders = {}
    if(window._token){
      defaultHeaders['X-CSRF-TOKEN'] = window._token
    } else {
      defaultHeaders['X-XSRF-TOKEN'] = _token
    }
    headers = _.assign(
      defaultHeaders,
      headers
    );
    let formData = new FormData();
    let hasFile = false;
    _.each(data, (value, key) => {
      if (_.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (value[i] instanceof File) {
            hasFile = true;
          }
          if (value[i].size > MAX_FILE_SIZE) {
            continue;
          }
          formData.append(`${key}[${i}]`, value[i]);
        }
      } else {
        formData.append(key, value);
      }
    });
    if (!hasFile) {
      headers["Content-Type"] = "application/json";
      headers["Accept"] = "application/json";
    }
    let options = {
      method: "POST",
      body: hasFile ? formData : JSON.stringify(data),
      headers
    };
    return fetch(this.getRoute(), options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
    // .catch(err => {
    //   console.error(err);
    //   return Promise.reject(err.then(), err.status);
    //   return err.then();
    // });
  }
  /**
   * @param {FileList | File[]} files
   * @return {Promise}
   * */
  postFiles(files) {
    // fileTypes = fileTypes || "image";
    let _token = getCookie('XSRF-TOKEN')

    const headers = {}
    if(window._token){
      headers['X-CSRF-TOKEN'] = window._token
    } else {
      headers['X-XSRF-TOKEN'] = _token
    }
    let formData = new FormData();
    // fileTypes = fileTypes.split(",");
    // fileTypes.forEach(fileType => {
    //   if (!fileType) {
    //     return;
    //   }
    //   fileType = fileType.trim();
    //
    // });
    for (let i = 0; i < files.length; i++) {
      if (
        files[i].size > MAX_FILE_SIZE
        // ||          files[i].type.indexOf(fileType) === -1
      ) {
        continue;
      }
      formData.append(`files[${i}]`, files[i]);
    }
    let options = {
      method: "POST",
      body: formData,
      headers
    };
    return fetch(this.getRoute(), options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }

  /**
   * @param {File} file
   * @return {Promise}
   * */
  postFile(file) {
    let _token = getCookie('XSRF-TOKEN')

    const headers = {}
    if(window._token){
      headers['X-CSRF-TOKEN'] = window._token
    } else {
      headers['X-XSRF-TOKEN'] = _token
    }
    let formData = new FormData();
    formData.append("favicon", file);
    let options = {
      method: "POST",
      body: formData,
      headers
    };
    return fetch(this.getRoute(), options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }

  /**
   * @return {Promise}
   * */
  put(id, data, headers = null) {
    let _token = getCookie('XSRF-TOKEN')

    const defaultHeaders = {}
    if(window._token){
      defaultHeaders['X-CSRF-TOKEN'] = window._token
    } else {
      defaultHeaders['X-XSRF-TOKEN'] = _token
    }
    headers = _.assign(
      defaultHeaders,
      headers
    );
    let formData = new FormData();
    let hasFile = false;

    _.each(data, (value, key) => {
      if (_.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (value[i] instanceof File) {
            hasFile = true;
          }
          if (value[i].size > MAX_FILE_SIZE) {
            console.log(value[i]);
            continue;
          }
          formData.append(`${key}[${i}]`, value[i]);
        }
      } else {
        formData.append(key, value);
      }
    });

    if (!hasFile) {
      headers["Content-Type"] = "application/json";
      headers["Accept"] = "application/json";
    }
    let options = {
      method: "put",
      body: hasFile ? formData : JSON.stringify(data),
      headers: headers
    };
    let url = this.getRoute() + (id ? "/" + id : "");
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject(res.text(), res.status);
      }
      return res.json();
    });
  }
  /**
   * @param {string} id
   * @param {{}} data
   * @param {string | {}} customHeaders
   * @return {Promise}
   * */
  delete(id = "", data = {}, customHeaders) {
    let _token = getCookie('XSRF-TOKEN')

    const defaultHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    if(window._token){
      defaultHeaders['X-CSRF-TOKEN'] = window._token
    } else {
      defaultHeaders['X-XSRF-TOKEN'] = _token
    }
    let options = {
      method: "delete",
      headers: _.assign(
        defaultHeaders,
        customHeaders
      )
    };
    if (!_.isEmpty(data)) {
      options.body = JSON.stringify(data);
    }
    let url = this.getRoute() + (id ? "/" + id : "");
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }
  /**
   * @return {Promise}
   * */
  getOptions() {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let url = this.getRoute() + "/options";
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
  }

  /**
   * GET запрос с параметрами
   * @param {object} params
   * @param {string | {}} customHeaders
   * @param cors
   * @return {Promise}
   * */
  async getQueried(params, customHeaders = null, cors = false) {
    let options = {
      method: "get",
      headers: _.assign(
        {
          "Content-Type": "application/json"
        },
        customHeaders
      )
    };
    if(cors){
      options.mode='cors'
    }
    let _params = {};
    _.forEach(params, (paramValue, paramName) => {
      if (_.isArray(paramValue)) {
        paramValue = paramValue.join(",");
      }
      _params[paramName] = paramValue;
    });
    let url = queryString.parseUrl(this.getRoute()).url;
    _params = _.assign(queryString.parseUrl(this.route).query, _params);
    url = `${url}?${queryString.stringify(_params)}`;
    let res = await fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject({ res: res.text(), status: res.status });
      }
      return res.json();
    });
    // console.log(res)
    return res;
  }

  publish(id, headers = null) {
    const defaultHeaders = {};

    if(window._token){
      defaultHeaders['X-CSRF-TOKEN'] = window._token;
    } else {
      defaultHeaders['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');
    }

    const options = {
      method: 'post',
      headers: _.assign(defaultHeaders, headers)
    };

    const url = this.getRoute() + '/' + id + '/publish';

    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject(res.text(), res.status);
      }

      return res.json();
    });
  }
}

export default Resource;


if(!window.__token_interval && ! window.SSR){
  window.__token_interval = setInterval(()=>{
    const resource = new Resource({route: '/ajax/_token'}, )
    resource.getAll()
  }, 72000000)
}
