import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName} from "../../js/helpers";
import store from '../../js/store/store';

class SqlEditor extends Component {
  constructor(props) {
    super(props);
    let storeState = store.getState();
    this.state = {
      modelTitle: 'Model Title',
      value: {
        paged: false,
      },
      modelsOptions: [],
      AceEditor: storeState.aceEditorReducer.AceEditor
    };
    this.sqlEditorResource = new Resource({route: `/admin/ajax/sql_editors`});
    this.modelsResource = new Resource({ route: '/admin/ajax/model_options' });

    store.subscribe(this.aceEditorObserver);
  }

  /**
   * AceEditor загрузился
   */
  aceEditorObserver = () => {
    let storeState = store.getState();
    this.setState(state=>({
        ...state,
      AceEditor: storeState.aceEditorReducer.AceEditor
    }))
  };
  /**
   * Компонент загрузился
   * @return {Promise<void>}
   */
  async componentDidMount() {
    const {id} = this.props.match.params;
    let { options } = await this.modelsResource.getAll();
    options = options.filter(option=>(option.label !== 'User'));
    this.setState({ modelsOptions: options });
    if(id){
      let value = await this.sqlEditorResource.get(id);
      this.editor = null;
      this.setState(state=>({
          ...state,
        value,
      }))
    }
  }

  /**
   * Имзенить поле
   * @param {*} value
   * @param {string} field
   */
  changeValue(value, field) {
    this.setState(state => {
      state = { ...state };
      if(field === 'name'){
        state.value[field] = titleToName(value);
      }else{
        state.value[field] = value;
      }
      if(field === 'title') {
        state.value.name = titleToName(value);
      }
      return state
    })
  }
  /**
   * отправка данных
   * @return {*}
   */
  onSubmit = async e => {
    const {id} = this.props.match.params;
    e.preventDefault();
    let res;
    if(! this.state.value.sql){
      return alert('Заполните SQL Query');
    }
    if(id){
      res = await this.sqlEditorResource.put(id, this.state.value);
    } else {
      res = await this.sqlEditorResource.post(this.state.value);
    }
    if(res.success){
      this.props.history.push('/admin/tables/sql_editors');
    } else {
      alert(res.message);
    }
  };

  render() {
    const {id} = this.props.match.params;
    console.log(this.state.value.sql);
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables/sql_editors">All  SQL Editors</Link>
          <span className="admin-breadcrumbs__separator">/</span>

          <span className="admin-breadcrumbs__current">Add SQL Query</span>
        </div>
      </div>
      <div className="admin-content">
        <form className="admin-form field-form" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="field-title">Title</label>
              <input type="text" id="field-title" required
                     value={this.state.value.title || ''}
                     onChange={e => {
                       this.changeValue(e.target.value, 'title')
                     }}
                     className="form-control"/>
            </div>
            <div className="form-group col-6">
              <label htmlFor="field-name">Name</label>
              <input type="text" id="field-name" required readOnly={id}
                     value={this.state.value.name || ''}
                     onChange={e => {
                       this.changeValue(e.target.value, 'name')
                     }}
                     className="form-control"/>
            </div>
            <div className="form-group col-12">
              <label htmlFor="field-name">Description</label>
              <input type="text" id="field-description"
                     value={this.state.value.description || ''}
                     onChange={e => {
                       this.changeValue(e.target.value, 'description')
                     }}
                     className="form-control"/>
            </div>
            {/*<div className="form-group col-12">*/}
              {/*<input type="checkbox" id="relation-paged"*/}
                     {/*checked={this.state.value.paged}*/}
                     {/*onChange={e => { this.changeValue(e.target.checked, 'paged') }}*/}
              {/*/>*/}
              {/*<label className="checkbox-label" htmlFor="relation-paged">Paged</label>*/}
            {/*</div>*/}
            <div className="form-group col-12">
              <label htmlFor="relation-model_id">Model</label>
              <select id="relation-model_id" required disabled={id}
                      value={this.state.value.model_id || ''}
                      onChange={e => { this.changeValue(e.target.value, 'model_id') }}
                      className="form-control"
              >
                <option disabled value="" />
                {this.state.modelsOptions.map(({ value, label }) =>
                    <option key={value} value={value}>
                      {label}
                    </option>)}
              </select>
            </div>
            <div className="form-group col-12">
              <label htmlFor="field-name">SQL Query</label>
              {this.state.AceEditor && (this.editor = (this.editor || <this.state.AceEditor
                  mode="sql"
                  theme="textmate"
                  onChange={value => {
                    this.changeValue(value, 'sql')
                  }}
                  className="field-ace"
                  name="aceEditor"
                  height="15em"
                  setOptions={{
                    value: this.state.value.sql || ''
                  }}
                  showPrintMargin={false}
                  style={{
                    width: '100%'
                  }}
                  enableLiveAutocompletion={true} />))}
            </div>
          </div>
          <div className="btn__wrapper btn_add">
            <button className="btn btn_success" type="submit">Add</button>
            <Link className="btn" to={`/admin/tables/sql_editors`}>Cancel</Link>
            {/* TODO: отображать кнопку если в форме редактируются данные
          повесить обработчик удаления
        <button className="btn btn_failure">Delete</button> */}
          </div>
        </form>
      </div>
    </div>;
  }
}

export default withRouter(SqlEditor);