import Resource from "./Resource";

class Query {

  constructor(data){
    this.modelName = data.modelName || '';
    this.pageSize = data.pageSize || 10;
    this.paginationType = data.paginationType || 'pages';
    this.orderingField = data.orderingField || 'name';
    this.order = data.order || 'ASC';
  }
  /**
   *
   * @return {Resource}
   */
  getResource(){
    return new Resource({route: `/ajax/models/${this.modelName}`});
    // return new Resource({route: `https://jsonplaceholder.typicode.com/posts`});
  }


  /**
   * Делает запрос с параметрами
   * @param params
   * @return {Promise}
   */
  async getQueried(params){
    return await this.getResource().getQueried(this.getParams(params))
  }

  /**
   * Сливает параметры с параметрами по умолчанию
   * @param {object} params
   * @return {object}
   */
  getParams(params) {
    params = {..._.assign({...this}, params)};
    params.page = params.page || 1;
    return params;
  }
}

export default Query