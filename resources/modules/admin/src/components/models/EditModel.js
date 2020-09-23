import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
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
      model: {
        name: '',
        title: '',
        description: '',
        bounded_model: '',
        soft_deletes: false,
        time_stamps: false
      },
      fields: null,
      relations: null,
      id,
      queries: [],
      // sql_editors: [],
      // fields: [],
      // relations: []
    };

    this.modelsResource = new Resource({route: '/admin/ajax/models'});
    if(id){
      this.fieldsResource = new Resource({route: `/admin/ajax/models/${id}/fields`});
      this.relationsResource = new Resource({route: `/admin/ajax/models/${id}/relations`});
      this.queriesResource = new Resource({route: `/admin/ajax/models/${id}/queries`});
    }
  }

  updateFields = async() => {
    let fields = await this.fieldsResource.getAll();
    fields = fields.filter(({ name }) => name !== 'id');
    this.setState(state => ({ ...state, fields }));
  }

  updateRelations = async() => {
    let relations = await this.relationsResource.getAll();
    this.setState(state => ({ ...state, relations }));
  }

  updateQueries = async () => {
    let queries = await this.queriesResource.getAll();
    this.setState(state => ({ ...state, queries }));
  }

  /**
   * Загрузим данные модели
   * @return {Promise<void>}
   */
  async componentDidMount() {
    // TODO: делать запросы асинхронно
    if(this.state.id){
      let model = await this.modelsResource.get(this.state.id);
      let relations = await this.relationsResource.getAll();
      let fields = await this.fieldsResource.getAll();
      let queries = await this.queriesResource.getAll();
      fields = fields.filter(({name}) => name !== 'id');
      this.setState(state=>({
          ...state,
        model,
        relations,
        fields,
        queries
      }))
    }
  }
  /**
   * Обработка формы
   * @return {*}
   */
  onSubmit = async (model) => {
    let res;
    if(this.state.id){
      res = await this.modelsResource.put(this.state.id ,model);
    } else {
      res = await this.modelsResource.post(model);
    }
    this.props.history.push("/admin/tables/models");
  };
  render() {
    const { model, fields, relations, queries, sql_editors } = this.state;

    const { id } = this.props.match.params;
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Tables / All Models</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">{this.state.id ? 'Edit Model' : 'Add Model'}</span>
        </div>
      </div>
      <div className="admin-content">
        <EditModelForm model={model}
                       submitText={model.id ? 'Save' : 'Add'}
                       edit={model.id}
                       onSubmit={this.onSubmit}/>


        {fields ?  <><h2 className="sub-header">Fields</h2>
        <AdminTable
          columns={columns}
          quickActions={[{ tag: 'Link', props: {
              href: `/admin/tables/models/${id}/fields/edit/:id`,
            },
            title: 'Edit'
          } , {
            tag: 'button',
            route: `/admin/ajax/models/${id}/fields/:id`,
            method: 'delete',
            confirm: 'Are You Sure?',
            after: () => this.updateFields(),
            className: 'quick-action-menu__item_danger',
            title: 'Trash'
          }]}
          rows={fields.map(field => ({ ...field, editUrl: `/admin/tables/models/${model.id}/fields/edit/${field.id}` }))}
        />
        <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/fields/add`}>Add Field</Link>
        </> : ''}
        {relations ?<>
        <h2 className="sub-header">Relations</h2>
        <AdminTable
          columns={columns}
          quickActions={[{ tag: 'Link', props: {
              href: `/admin/tables/models/${id}/relations/edit/:id`,
            },
            title: 'Edit'
          } , {
            tag: 'button',
            route: `/admin/ajax/models/${id}/relations/:id`,
            method: 'delete',
            confirm: 'Are You Sure?',
            after: () => this.updateRelations(),
            className: 'quick-action-menu__item_danger',
            title: 'Trash'
          }]}
          rows={relations.map(relation => ({ ...relation, editUrl: `/admin/tables/models/${model.id}/relations/edit/${relation.id}` }))}
        />
        <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/relations/add`}>Add Relation</Link>
        </> : ''}
        {queries ? <>
        <h2 className="sub-header">Queries</h2>
        <AdminTable
          columns={columns}
          rows={queries.map(query => ({ ...query, editUrl: `/admin/tables/models/${model.id}/queries/edit/${query.id}` }))}
          quickActions={[{
            tag: 'Link', props: {
              href: `/admin/tables/models/${model.id}/queries/edit/:id`,
            },
            title: 'Edit'
          }, {
            tag: 'button',
            route: `/admin/ajax/models/${model.id}/queries/:id`,
            method: 'delete',
            confirm: 'Are You Sure?',
            after: () => this.updateQueries(),
            className: 'quick-action-menu__item_danger',
            title: 'Trash'
          }]}
        />
        <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/queries/add`}>Add Query</Link>
        </> : ''}
        {sql_editors ? <>
        <h2 className="sub-header">SQL Editors</h2>
        <AdminTable
          columns={columns}
          rows={sql_editors.map(query => ({ ...query, editUrl: `/admin/tables/models/${model.id}/sql_editors/edit/${query.id}` }))}
        />
        <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/sql_editors/add`}>Add Editor</Link>
        </> : ''}
      </div>
    </div>;
  }
}

export default withRouter(EditModel);