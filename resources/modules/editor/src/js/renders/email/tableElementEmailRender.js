import {getDataByPath,} from "../../../../../front-app/src/js/helpers";
import Query from "../../classes/Query";
import EmailTableComponent from "../../components/altrp-table/components/EmailTableComponent";

/**
 * Возвращает шаблон таблицы для email-письма
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}>}
 */
export default function tableElementEmailRender(){

  const settings = this.props.element.getSettings();
  if(! this.props.currentModel.getProperty('altrpModelUpdated')){
    return '';
  }
  let data = [];
  if(this.props.element.getSettings('table_datasource')
      && this.props.element.getSettings('choose_datasource') === 'datasource'){
    let path = this.props.element.getSettings('table_datasource').replace(/{{/g, '').replace(/}}/g, '');
    data = getDataByPath(path)
  }
  let query = new Query(this.props.element.getSettings().table_query || {}, this);
  if(! this.showTable(query)){
    return <div children="Please Choose Source"/>
  }
  if (! (_.get(settings,'tables_columns.length'))) {
    return <div children="Please Add Column"/>
  }
  return <EmailTableComponent query={query}
          updateToken={this.props.updateToken}
          widgetId={this.props.element.getId()}
          currentModel={this.props.currentModel}
          data={data || query.getFromModel(this.state.modelData)}
          settings={this.props.element.getSettings()}/>;
}