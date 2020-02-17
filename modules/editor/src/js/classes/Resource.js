class Resource {
  constructor(url, params, method){
    this.url = url;
    this.params = params;
    this.method = method | 'get';
  }
  get(){
    let options = {
      method: this.method,
    };

    return fetch(this.url, options);
  }
}

export default Resource;