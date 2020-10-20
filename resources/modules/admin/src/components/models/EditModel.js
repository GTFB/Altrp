import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import EditModelForm from "./EditModelForm";
import AdminTable from "../AdminTable";
import AdminModal2 from "../AdminModal2";
import Resource from "../../../../editor/src/js/classes/Resource";
import ValidatedFieldForm from "./ValidationSection/ValidatedFieldForm";
import ValidationTable from "./ValidationSection/ValidationTable";

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
      accessors: [],
      id,
      queries: [],
      validations: [],
      data_source_options: [],
      isModalOpened: false
      // sql_editors: [],
      // fields: [],
      // relations: []
    };

    this.modelsResource = new Resource({ route: '/admin/ajax/models' });
    if (id) {
      this.fieldsResource = new Resource({ route: `/admin/ajax/models/${id}/fields` });
      this.relationsResource = new Resource({ route: `/admin/ajax/models/${id}/relations` });
      this.queriesResource = new Resource({ route: `/admin/ajax/models/${id}/queries` });
      this.accessorsResource = new Resource({ route: `/admin/ajax/models/${id}/accessors` });
      this.validationsResource = new Resource({ route: `/admin/ajax/models/${id}/validations` });
      this.data_source_optionsResource = new Resource({ route: `/admin/ajax/models/${id}/data_source_options` });
    }
  }

  updateFields = async () => {
    let fields = await this.fieldsResource.getAll();
    fields = fields.filter(({ name }) => name !== 'id');
    this.setState(state => ({ ...state, fields }));
  }

  updateRelations = async () => {
    let relations = await this.relationsResource.getAll();
    this.setState(state => ({ ...state, relations }));
  }

  updateQueries = async () => {
    let queries = await this.queriesResource.getAll();
    this.setState(state => ({ ...state, queries }));
  }

  updateAccessors = async () => {
    let accessors = await this.accessorsResource.getAll();
    this.setState(state => ({ ...state, accessors }));
  }

  updateValidations = async () => {
    let validations = await this.validationsResource.getAll();
    this.setState(state => ({ ...state, validations, isModalOpened: false }));
  }

  /**
   * Загрузим данные модели
   * @return {Promise<void>}
   */
  async componentDidMount() {
    // TODO: делать запросы асинхронно
    if (this.state.id) {
      let model = await this.modelsResource.get(this.state.id);
      let relations = await this.relationsResource.getAll();
      let fields = await this.fieldsResource.getAll();
      let queries = await this.queriesResource.getAll();
      let accessors = await this.accessorsResource.getAll();
      let validations = await this.validationsResource.getAll();
      let data_source_options = await this.data_source_optionsResource.getAll();

      fields = fields.filter(({ name }) => name !== 'id');
      this.setState(state => ({
        ...state,
        model,
        relations,
        accessors,
        fields,
        queries,
        validations,
        data_source_options
      }))
    }
  }
  /**
   * Обработка формы
   * @return {*}
   */
  onSubmit = async (model) => {
    let res;
    if (this.state.id) {
      res = await this.modelsResource.put(this.state.id, model);
    } else {
      res = await this.modelsResource.post(model);
    }
    this.props.history.push("/admin/tables/models");
  };
  render() {
    const { model, fields, relations, queries, sql_editors, accessors, isModalOpened, data_source_options, validations } = this.state;

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
        {relations ? <>
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
        {accessors ? <>
          <h2 className="sub-header">Accessors</h2>
          <AdminTable
            columns={columns}
            quickActions={[{
              tag: 'Link', props: {
                href: `/admin/tables/models/${id}/accessors/edit/:id`,
              },
              title: 'Edit'
            }, {
              tag: 'button',
              route: `/admin/ajax/models/${id}/accessors/:id`,
              method: 'delete',
              confirm: 'Are You Sure?',
              after: () => this.updateAccessors(),
              className: 'quick-action-menu__item_danger',
              title: 'Trash'
            }]}
            rows={accessors.map(accessor => ({ ...accessor, editUrl: `/admin/tables/models/${model.id}/accessors/edit/${accessor.id}` }))}
          />
          <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/accessors/add`}>Add Accessor</Link>
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
        <h2 className="sub-header">Validation</h2>
        {id && <>
          <ValidationTable validations={validations} updateValidations={this.updateValidations} />
          <button onClick={() => this.setState({ isModalOpened: true })} className="btn btn_add">
            Add Field
          </button>
        </>}
        {isModalOpened && <AdminModal2 closeHandler={() => this.setState({ isModalOpened: false })}>
          <ValidatedFieldForm
            fieldsOptions={fields}
            validationsResource={this.validationsResource}
            data_source_options={data_source_options}
            updateValidations={this.updateValidations} />
        </AdminModal2>}
      </div>
    </div>;
  }
}

export default withRouter(EditModel);
