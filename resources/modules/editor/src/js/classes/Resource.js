import queryString from "query-string";
import { replaceContentWithData } from "../../../../front-app/src/js/helpers";
window.queryString = queryString;
/**
 * @class Resource
 * */
export const MAX_FILE_SIZE = 20971520;

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
  get(id) {
    if (!id) {
      throw 'Get only by "id"';
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
        return Promise.reject(res.text(), res.status);
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
      throw 'Get only by "id"';
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
        return Promise.reject(res.text(), res.status);
      }
      return res.json();
    });
  }
  /**
   * простой запрос
   * @return {Promise}
   * */
  getAll() {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };

    let url = this.getRoute();
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject(res.text(), res.status);
      }
      return res.json();
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
        return Promise.reject(res.text(), res.status);
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
    headers = headers || {
      "X-CSRF-TOKEN": _token
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
    };
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
    return fetch(this.getRoute(), options)
      .then(res => {
        if (res.ok === false) {
          return Promise.reject(res.text(), res.status);
        }
        return res.json();
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err.then(), err.status);
        return err.then();
      });
  }
  /**
   * @param {FileList} files
   * @param {string} fileTypes
   * @return {Promise}
   * */
  postFiles(files, fileTypes) {
    fileTypes = fileTypes || "image";
    let headers = {
      "X-CSRF-TOKEN": _token
    };
    let formData = new FormData();
    fileTypes = fileTypes.split(",");
    fileTypes.forEach(fileType => {
      if (!fileType) {
        return;
      }
      fileType = fileType.trim();
      for (let i = 0; i < files.length; i++) {
        if (
          files[i].size > MAX_FILE_SIZE
            // ||          files[i].type.indexOf(fileType) === -1
        ) {
          console.log(files[i]);
          continue;
        }
        formData.append(`files[${i}]`, files[i]);
      }
    });
    let options = {
      method: "POST",
      body: formData,
      headers
    };
    return fetch(this.getRoute(), options).then(res => {
      if (res.ok === false) {
        return Promise.reject(res.text(), res.status);
      }
      return res.json();
    });
  }

  /**
   * @param {File} file
   * @return {Promise}
   * */
  postFile(file) {
    let headers = {
      "X-CSRF-TOKEN": _token
    };
    let formData = new FormData();
    formData.append("favicon", file);
    let options = {
      method: "POST",
      body: formData,
      headers
    };
    return fetch(this.getRoute(), options).then(res => {
      if (res.ok === false) {
        return Promise.reject(res.text(), res.status);
      }
      return res.json();
    });
  }

  /**
   * @return {Promise}
   * */
  put(id, data, headers = null) {
    headers = headers || {
      "X-CSRF-TOKEN": _token
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
    };
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
      // body: JSON.stringify(data),
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
   * @return {Promise}
   * */
  delete(id = "", data = {}) {
    let options = {
      method: "delete",
      headers: {
        "X-CSRF-TOKEN": _token,
        "Content-Type": "application/json"
      }
    };
    if (!_.isEmpty(data)) {
      options.body = JSON.stringify(data);
    }
    let url = this.getRoute() + (id ? "/" + id : "");
    return fetch(url, options).then(res => {
      if (res.ok === false) {
        return Promise.reject(res.text(), res.status);
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
        return Promise.reject(res.text(), res.status);
      }
      return res.json();
    });
  }

  /**
   * GET запрос с параметрами
   * @param {object} params
   * @return {Promise}
   * */
  async getQueried(params, custom_headers = null) {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
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
        return Promise.reject(res.text(), res.status);
      }
      return res.json();
    });
    // console.log(res);
    return res;
  }
}

export default Resource;
