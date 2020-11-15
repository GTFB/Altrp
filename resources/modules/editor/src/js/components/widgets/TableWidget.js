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
    switch(this.props.element.getSettings('choose_datasource')){
      case 'datasource':{
        import('../altrp-table/altrp-table-without-update').then(res=>{
          this.setState(state=>({...state,TableComponent:res.default}))
        });
      } break;
      case 'query':{
        const query = this.props.element.getSettings('table_query');
        if((! query.pageSize) || (query.pageSize <=0 )){
          import('../altrp-table/altrp-table-without-update').then(res=>{
            this.setState(state=>({...state,TableComponent:res.default}))
          });
        } else {
          import('../altrp-table/altrp-table').then(res=>{
            this.setState(state=>({...state,TableComponent:res.default}))
          });
        }
      }
      break;
      default:{
        import('../altrp-table/altrp-table').then(res=>{
          this.setState(state=>({...state,TableComponent:res.default}))
        });
      }
    }
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
    const settings = this.props.element.getSettings();
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

    if (! (_.get(settings,'tables_columns.length'))) {
      return <div children="Please Add Column"/>
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
          style.display = 'none';
          return <div className="altrp-scroll__vertical-track" style={style} {...props} />}}
        renderTrackHorizontal={({style, ...props})=>{
          return <div className="altrp-scroll__horizontal-track" style={style} {...props} />}}
    ><this.state.TableComponent query={query}
                                widgetId={this.props.element.getId()}
                                currentModel={this.props.currentModel}
                                data={query.getFromModel(this.state.modelData)}
                                settings={this.props.element.getSettings()}/>
    </Scrollbars>;
  }
}

export default TableWidget

