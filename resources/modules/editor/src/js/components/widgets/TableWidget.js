import Query from "../../classes/Query";
import {Scrollbars} from "react-custom-scrollbars";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import getWidgetState from "../../../../../front-app/src/js/functions/getWidgetState";
import storeWidgetState from "../../../../../front-app/src/js/functions/storeWidgetState";
// const AltrpTableWithoutUpdate = React.lazy(() => import(/* webpackChunkName: 'altrp-table-without-update' */'../altrp-table/altrp-table-without-update'));
// const AltrpTableWithoutUpdate = React.lazy(() => import(/* webpackChunkName: 'altrp-table-without-update' */'../altrp-table/altrp-table-without-update'));
// const AltrpTable = React.lazy(() => import(/* webpackChunkName: 'altrp-table' */'../altrp-table/altrp-table'));
import AltrpTable from'../altrp-table/altrp-table';
import AltrpTableWithoutUpdate from'../altrp-table/altrp-table-without-update';
import {setGlobalElementTable} from "../../../../../front-app/src/js/store/element-table/actions";

(window.globalDefaults = window.globalDefaults || []).push(`
.altrp-table-th {
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  font-family: "Open Sans";
  line-height: 1.5;
  letter-spacing: 0;
  padding: 0 0 0 0;
  display: table-cell;
}
.altrp-table-td {
  text-align: left;
  padding: 0 0 0 0;
  font-size: 14px;
  font-weight: normal;
  font-family: "Open Sans";
  line-height: 1.5;
  letter-spacing: 0;
  display: table-cell;
}
.altrp-table-tbody--striped tr:nth-child(2n) {
  background-color: rgba(0, 0, 50, .05);
}
.altrp-table-tbody,
.altrp-table-th {
  border-collapse: separate;
  user-select: none;
}
.altrp-table-td__grouping {
  font-size: 18px;
  font-weight: bold;
}
.altrp-table-th_sort {
  padding: 0;
  margin-left: 10px;
}
.altrp-table-th .sort-icon {
  margin-left: 10px;
}
.altrp-table {
  overflow: hidden;
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-width: 1px 1px 1px 1px;
  border-color: rgb(186, 186, 186);
}
.altrp-table__filter-select {
  width: 100%;
}
.altrp-table__filter-select .altrp-field-select2__placeholder {
  white-space: nowrap;
}
.altrp-table__filter-select .altrp-field-select2__single-value {
  font-size: 14px;
}
.altrp-table__filter-select .altrp-field-select2__indicator-separator {
  display: none;
}
.altrp-table__filter-select .altrp-field-select2__indicator {
  align-items: center;
}
.altrp-table__filter-select .altrp-field-select2__control {
  width: 100%;
  min-height: 19px;
  padding: 0;
  border-radius: 0;
  outline: none;
  border-color: rgb(142, 148, 170);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
.altrp-table__filter-select .altrp-field-select2__control input {
  border: none;
}
.altrp-table__filter-select .altrp-field-select2__value-container {
  padding-top: 0;
  padding-bottom: 0;
  line-height: 13px;
}
.altrp-table-td__grouping {
  -webkit-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -ms-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  transition-duration: 0.2s;
}
.altrp-table-td_alignment .altrp-table-td_alignment-center .altrp-actions{
  justify-content: center;
}
.altrp-table-td_alignment-right .altrp-actions {
  justify-content: flex-end;
}
.altrp-table__collapse-icon {
  display: inline-block;
}
.altrp-table__collapse-icon .altrp-table__collapse-icon svg {
  position: relative;
}

.altrp-table-head {
  display: table-header-group;
}

.altrp-table-tbody {
  display: table-row-group;
}

.altrp-table-foot {
  display: table-footer-group;
}

.altrp-table-tr {
  display: table-row;
}

.altrp-table_loading {
  display: block;
}

.altrp-table-th_global-filter {
  colspan: all;
}

.altrp-table-td .altrp-inherit{
  border: none;
  width: 100%;
}
.altrp-table-td_loading {
  display: block;
  width: 100%;
}

.altrp-table__resizer {
  display: inline-block;
  background: blue;
  width: 10px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 1;
  touch-action: none;
}
.altrp-table__resizer_resizing {
    background: red;
}
.altrp-table .altrp-table-td .altrp-table-td__double-click-content {
  display: none;
}
.altrp-table .altrp-table-td .altrp-table-td_double-clicked .altrp-table-td_double-clicked .altrp-table-td__double-click-content {
  display: block;
  width: 100%;
  border-width: 2px;
}
.altrp-table .altrp-table-td .altrp-table-td_double-clicked .altrp-table-td_double-clicked .altrp-table-td__default-content {
  display: none;
}
.altrp-table-global-filter {
  font-weight: 400;
}
.altrp-table-global-filter label {
  display: inline-block;
}
.altrp_table-zIndex {
  z-index: 1;
}
.replace-text {
  line-height: 0.8;
  font-weight: 700;
  font-size: 14px;
  font-family: "Open Sans";
}
`)

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
    if(this.props.element.getLockedSettings('store_state') && getWidgetState(this.props.element.getId())){
      this.setState(state=>({...state, widgetState: getWidgetState(this.props.element.getId())}));
    } else if (this.props.element.getLockedSettings('store_state')){
      storeWidgetState(this.props.element.getId(), null);
    }
    window.appStore.dispatch(setGlobalElementTable(this.props.element))
  }

  /**
   * Показывать ли таблицу
   * @param{Query} query
   * @return {boolean}
   */
  showTable(query = {}){
    if( this.props.element.getLockedSettings('choose_datasource') === 'datasource' ){
      return true;
    }
    if(! query.modelName && ! query.dataSource){
      return false;
    }
    return true;
  }
  render(){
    const settings = {
      ...this.props.element.getSettings(),
      ...(this.props.element.settingsLock ||{})
    };
    if(! this.props.currentModel.getProperty('altrpModelUpdated')){
      return '';
    }
    let data = [];

    let hasPagination = this.props.element.getLockedSettings("table_data_settings_pagination")

    let options;


    if(this.props.element.getLockedSettings('table_datasource')
        && this.props.element.getLockedSettings('choose_datasource') === 'datasource'){
      let path = this.props.element.getLockedSettings('table_datasource').replace(/{{/g, '').replace(/}}/g, '');
      data = getDataByPath(path, [], this.props.element.getCurrentModel().getData())

      if(hasPagination || !_.isBoolean(hasPagination)) {
        const splittedPath = path.split("altrpdata.");
        if(splittedPath.length > 1) {
          options = getDataByPath(`altrpdata._options.${splittedPath[1]}`, [], this.props.element.getCurrentModel().getData())
        }
      }
    }
    if(! this.query || ! this.table_query || this.table_query !== this.props.element.getLockedSettings().table_query){
      this.table_query = this.props.element.getLockedSettings().table_query;
      this.query = new Query(this.props.element.getLockedSettings().table_query || {}, this);
    }
    const query = this.query;
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
    if(this.props.element.getLockedSettings('table_transpose', false)){
      scrollbarsProps.autoHeight = true;
      scrollbarsProps.autoHeightMax = 10000;
    }

    if (! (_.get(settings,'tables_columns.length'))) {
      return <div children="Please Add Column"/>
    }


    const TableComponent = this.props.element.getLockedSettings('table_2_0') ? AltrpTableWithoutUpdate : AltrpTable;
    return <Scrollbars
        ref={this.scrollbar}
        className="altrp_table-zIndex"
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
    >
      {/*<React.Suspense fallback={''}>*/}
      <TableComponent query={query}
                      updateToken={this.props.updateToken}
                      widgetId={this.props.element.getId()}
                      widgetState={isEditor() ? null : this.state.widgetState}
                      currentModel={this.props.currentModel}
                      currentScreen={this.props.currentScreen}
                      options={options}
                      data={isEditor() ? null : (data || query.getFromModel(this.state.modelData))}
                      settings={settings}/>
    {/*</React.Suspense>*/}
    </Scrollbars>;
  }
}

export default TableWidget

