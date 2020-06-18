import Resource from "./Resource";


class Query {
  constructor(data){
    this.modelName = data.modelName;
    this.pageSize = data.pageSize;
    this.paginationType = data.paginationType;
    this.orderingField = data.orderingField;
    this.order = data.order;
  }

  /**
   *
   * @return {Resource}
   */
  getResource(){
    return new Resource({route: `/models/${this.modelName}`});
  }
}

export default Query