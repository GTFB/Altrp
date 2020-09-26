import React, {Component} from "react";
import Query from "../../classes/Query";

class TableWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      TableComponent: ()=><div children="Loading..."/>
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }
  _componentDidMount(){
    import('../altrp-table/altrp-table').then(res=>{
      this.setState(state=>({...state,TableComponent:res.default}))
    })
  }

  /**
   * Показывать ли таблицу
   * @param{Query} query
   * @return {boolean}
   */
  showTable(query = {}){
    if( this.props.element.getSettings('choose_datasource') === 'datasource' ){
      return true;
    }
    if(! query.modelName && ! query.dataSource){
      return false;
    }
    return true;
  }
  render(){
    if(! this.props.currentModel.getProperty('altrpModelUpdated')){
      return '';
    }
    let query = new Query(this.props.element.getSettings().table_query || {}, this);
    if(! this.showTable(query)){
      return <div children="Please Choose Source"/>
    }

    return <this.state.TableComponent query={query}
                                      currentModel={this.props.currentModel}
                                      data={query.getFromModel(this.state.modelData)}
                                      settings={this.props.element.getSettings()}/>;
  }
}

export default TableWidget

