import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName} from "../../js/helpers";

class SqlEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelTitle: 'Model Title',
      value: {},
    };
    this.modelsResource = new Resource({route: '/admin/ajax/models'});
    this.filedsResource = new Resource({route: `/admin/ajax/models/${this.props.match.params.modelId}/fields`});
  }

  async componentDidMount() {
    const {modelId} = this.props.match.params;
    let model = await this.modelsResource.get(modelId);
    this.setState({modelTitle: model.title});
  }

  /**
   * Имзенить поле
   * @param {*} value
   * @param {string} field
   */
  changeValue(value, field) {
    this.setState(state => {
      state = { ...state };
      if(field !== 'name'){
        state.value[field] = titleToName(value);
      }else{
        state.value[field] = value;
      }
      if(field !== 'title') {
        state.value.name = titleToName(value);
      }
      return state
    })
  }
  /**
   * отправка данных
   * @return {*}
   */
  onSubmit = async data => {
    const {modelId} = this.props.match.params;
    const {history} = this.props;
    if (this.props.match.params.id) {
      let res = await this.filedsResource.put(this.props.match.params.id, data);
      history.push(`/admin/tables/models/edit/${modelId}`);
    } else {
      let res = await this.filedsResource.post(data);
      history.push(`/admin/tables/models/edit/${modelId}`);
    }
  };

  render() {
    const {modelTitle} = this.state;
    const {modelId} = this.props.match.params;
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Models / All Models</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <Link className="admin-breadcrumbs__link" to={`/admin/tables/models/edit/${modelId}`}>
            {modelTitle}
          </Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Add New Field</span>
        </div>
      </div>
      <div className="admin-content">
        <form className="admin-form field-form" onSubmit={this.submitHandler}>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="field-title">Field Title</label>
              <input type="text" id="field-title" required
                     value={this.state.value.title || ''}
                     onChange={e => {
                       this.changeValue(e.target.value, 'title')
                     }}
                     className="form-control"/>
            </div>
            <div className="form-group col-6">
              <label htmlFor="field-name">Field Name</label>
              <input type="text" id="field-name" required readOnly={this.props.match.params.id}
                     value={this.state.value.name || ''}
                     onChange={e => {
                       this.changeValue(e.target.value, 'name')
                     }}
                     className="form-control"/>
            </div>
          </div>
          <div className="btn__wrapper btn_add">
            <button className="btn btn_success" type="submit">Add</button>
            <Link className="btn" to={`/admin/tables/models/edit/${modelId}`}>Cancel</Link>
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