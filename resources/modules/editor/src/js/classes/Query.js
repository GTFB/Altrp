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
}

export default Query