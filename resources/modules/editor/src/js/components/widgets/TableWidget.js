import Query from "../../classes/Query";
import {Scrollbars} from "react-custom-scrollbars";
import {getDataByPath, getWidgetState, storeWidgetState} from "../../../../../front-app/src/js/helpers";
const AltrpTableWithoutUpdate = React.lazy(() => import(/* webpackChunkName: 'altrp-table-without-update' */'../altrp-table/altrp-table-without-update'));
const AltrpTable = React.lazy(() => import(/* webpackChunkName: 'altrp-table' */'../altrp-table/altrp-table'));

class TableWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      TableComponent: ()=><div children="Loading..."/>
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
    this.scrollbar = React.createRef();
  }

  _componentDidMount(){
    if(this.props.element.getSettings('store_state') && getWidgetState(this.props.element.getId())){
      this.setState(state=>({...state, widgetState: getWidgetState(this.props.element.getId())}));
    } else if (this.props.element.getSettings('store_state')){
      storeWidgetState(this.props.element.getId(), null);
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
    let data = [];
    if(this.props.element.getSettings('table_datasource')
        && this.props.element.getSettings('choose_datasource') === 'datasource'){
      let path = this.props.element.getSettings('table_datasource').replace(/{{/g, '').replace(/}}/g, '');
      data = getDataByPath(path, [], this.props.element.getCurrentModel().getData())
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
    const TableComponent = this.props.element.getSettings('table_2_0') ? AltrpTableWithoutUpdate : AltrpTable;
    return <Scrollbars
        ref={this.scrollbar}
        style={{zIndex: 99999}}
        autoHide
        autoHeightMax={30000}
        autoHeight={true}
        autoHideTimeout={500}
        autoHideDuration={200}
        renderTrackVertical={({style, ...props})=>{
          style.display = 'none';
          return <div className="altrp-scroll__vertical-track" style={style} {...props} />}}
        renderTrackHorizontal={({style, ...props})=>{
          return <div className="altrp-scroll__horizontal-track" style={style} {...props} />}}
    ><React.Suspense fallback={''}>
      <TableComponent query={query}
                      updateToken={this.props.updateToken}
                      widgetId={this.props.element.getId()}
                      widgetState={this.state.widgetState}
                      currentModel={this.props.currentModel}
                      currentScreen={this.props.currentScreen}
                      data={data || query.getFromModel(this.state.modelData)}
                      settings={this.props.element.getSettings()}/>
    </React.Suspense>
    </Scrollbars>;
  }
}

export default TableWidget

