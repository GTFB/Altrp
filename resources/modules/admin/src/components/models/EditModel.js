import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import EditModelForm from "./EditModelForm";
import AdminTable from "../AdminTable";
import Resource from "../../../../editor/src/js/classes/Resource";

const columns = [
  {
    name: 'title',
    title: 'Title',
    url: true,
    editUrl: true,
    tag: 'Link'
  },
  {
    name: 'name',
    title: 'Name'
  },
  {
    name: 'description',
    title: 'Description'
  }
];


class EditModel extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      model: {},
      fields: null,
      relations: null,
      id
      // model: {},   TODO: заменить замоканые данные
      // fields: [],
      // relations: []
    };
    this.modelsResource = new Resource({route: '/admin/ajax/models'});
    if(id){
      this.fieldsResource = new Resource({route: `/admin/ajax/models/${id}/fields`});
      this.relationsResource = new Resource({route: `/admin/ajax/models/${id}/relations`});

    }
  }

  async componentDidMount() {

    if(this.state.id){
      let model = await this.modelsResource.get(this.state.id);
      let relations = await this.relationsResource.getAll();
      let fields = await this.fieldsResource.getAll();
      this.setState(state=>({
          ...state,
        model,
        relations,
        fields,
      }))
    }
  }

  /**
   * Обработка формы
   * @return {*}
   */

  render() {
    const { model, fields, relations } = this.state;

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Tables / All Models</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Edit Model</span>
        </div>
      </div>
      <div className="admin-content">
        <EditModelForm model={model}
                       submitText={model.id ? 'Edit' : 'Add'}
                       edit={model.id}
                       onSubmit={this.onSubmit}/>


        {fields ?  <><h2 className="sub-header">Fields</h2>
            <AdminTable
          columns={columns}
          rows={fields.map(field => ({ ...field, editUrl: `/admin/tables/models/${model.id}/fields/edit/${field.id}` }))}
        />
        <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/fields/add`}>Add Field</Link>
        </> : ''}
        {relations ?<>
        <h2 className="sub-header">Relations</h2>
        <AdminTable
          columns={columns}
          rows={relations.map(relation => ({ ...relation, editUrl: `/admin/tables/models/${model.id}/relations/edit/${relation.id}` }))}
        />
        <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/relations/add`}>Add Relation</Link>
        </> : ''}
      </div>
    </div>;
  }
}

export default withRouter(EditModel);