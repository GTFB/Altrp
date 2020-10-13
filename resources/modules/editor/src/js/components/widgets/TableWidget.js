import React, {Component} from "react";
import Query from "../../classes/Query";
import {Scrollbars} from "react-custom-scrollbars";

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
    this.scrollbar = React.createRef();
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
    const scrollbarsProps = {
      ref:this.scrollbar,
      style:{zIndex: 99999},
      autoHeight:true,
      autoHideTimeout:500,
      autoHideDuration:200,
      renderTrackVertical: ({style, ...props})=>{
        return<div className="altrp-scroll__vertical-track" style={style} {...props} />
      },
    };
    if(this.props.element.getSettings('table_transpose', false)){
      scrollbarsProps.autoHeight = true;
      scrollbarsProps.autoHeightMax = 10000;

    }
    return <Scrollbars
        ref={this.scrollbar}
        style={{zIndex: 99999}}
        autoHide
        autoHeightMax={10000}
        autoHeight={true}
        autoHideTimeout={500}
        autoHideDuration={200}
        renderTrackVertical={({style, ...props})=>{
          return<div className="altrp-scroll__vertical-track" style={style} {...props} />}}
    ><this.state.TableComponent query={query}
                                      currentModel={this.props.currentModel}
                                      data={query.getFromModel(this.state.modelData)}
                                settings={this.props.element.getSettings()}/>
    </Scrollbars>;
  }
}

export default TableWidget

