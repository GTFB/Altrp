import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import EditModelForm from "./EditModelForm";
import AdminTable from "../AdminTable";
import Resource from "../../../../editor/src/js/classes/Resource";
import ModalWindow from "../ModalWindow";
import store from "./../../js/store/store"
import {getModelId, getModelRelationId} from "../../js/store/models-state/actions";
import ModalRelationWindow from "../ModalRelationWindow";
import UserTopPanel from "../UserTopPanel";

const columns = [
  {
    name: 'title',
    title: 'Title',
    url: true,
    editUrl: true,
    tag: 'Link',
    button__table: true
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
        categories: [],
        _categories: [],
        categoryOptions: [],
        soft_deletes: false,
        time_stamps: false
      },
      fields: [],
      relations: null,
      accessors: [],
      id,
      data_source_options: [],
      isModalOpened: false,
      modalWindow: false,
      modalRelationWindow: false,
      activeHeader: 0,
      prevTitle: null
    };

    this.modelsResource = new Resource({ route: '/admin/ajax/models' });
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
    if (id) {
      this.fieldsResource = new Resource({ route: `/admin/ajax/models/${id}/fields` });
      this.relationsResource = new Resource({ route: `/admin/ajax/models/${id}/relations` });
      this.accessorsResource = new Resource({ route: `/admin/ajax/models/${id}/accessors` });
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

  updateAccessors = async () => {
    let accessors = await this.accessorsResource.getAll();
    this.setState(state => ({ ...state, accessors }));
  }

  toggleWindowModal = () => {
    store.dispatch(getModelId(null));
    this.setState(state => ({ ...state, modalWindow: !this.state.modalWindow }))
    this.updateFields();
  }

  getModalFields = (id) => {
    store.dispatch(getModelId(id));
    this.setState(state => ({ ...state, modalWindow: true }))
  }

  toggleWindowRelationModal = () => {
    store.dispatch(getModelRelationId(null));
    this.setState(state => ({ ...state, modalRelationWindow: !this.state.modalRelationWindow }))
    this.updateRelations();
  }

  getModalRelation = (id) => {
    store.dispatch(getModelRelationId(id));
    this.setState(state => ({ ...state, modalRelationWindow: true }))
  }

  /**
   * Загрузим данные модели
   * @return {Promise<void>}
   */
  async componentDidMount() {
    const { data } = await this.categoryOptions.getAll();
    this.setState(state => ({
      ...state,
      model: {
        ...state.model,
        categoryOptions: data
      }
    }))
    if (this.state.id) {
      this.setState(state => ({
        ...state,
        prevTitle: document.title,
      }))
      this.modelsResource.get(this.state.id)
        .then(model => {
          this.setState(state => ({
            ...state,
            model: {
              ...state.model,
              _categories: model.categories,
              ...model,
            }
          }));
          this.modelName = model.name;
          document.title = `Model: ${model.title} | Edit`;
        });

      this.fieldsResource.getAll()
        .then(fields => this.setState({ fields: fields.filter(({ name }) => name !== 'id') }));

      this.relationsResource.getAll()
        .then(relations => this.setState({ relations }));

      this.accessorsResource.getAll()
        .then(accessors => this.setState({ accessors }));

      this.data_source_optionsResource.getAll()
        .then(data_source_options => this.setState({ data_source_options }));
    }

    window.addEventListener("scroll", this.listenScrollHeader)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollHeader)
    if (this.state.id) document.title = this.state.prevTitle;
  }


  listenScrollHeader = () => {
    if (window.scrollY > 4 && this.state.activeHeader !== 1) {
      this.setState({
        activeHeader: 1
      })
    } else if (window.scrollY < 4 && this.state.activeHeader !== 0) {
      this.setState({
        activeHeader: 0
      })
    }
  }
  /**
   * Обработка формы
   * @return {*}
   */
  onSubmit = async (model) => {
    let res;
    const isNameTaken = !this.state.id || this.modelName !== model.name ?
      await fetch(`/admin/ajax/model_name_is_free/?name=${model.name}`)
        .then(res => res.json())
        .then(res => !res.taken) :
      null;

    if (isNameTaken) {
      return alert(`Name ${model.name} is already taken. Use another one.`)
    }

    if (this.state.id) {
      console.log(model)
      res = await this.modelsResource.put(this.state.id, model);
    } else {

      res = await this.modelsResource.post(model);
    }
    this.props.updateModels();
    this.props.history.push("/admin/tables/models");
  };
  render() {
    const { model, fields,  relations, sql_editors, accessors, isModalOpened,
       data_source_options, modalWindow, modalRelationWindow } = this.state;

    console.log("title", this.state.prevTitle);
    const { id } = this.props.match.params;
    return <div className="admin-pages admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
       <div className="admin-heading-left">
         <div className="admin-breadcrumbs">
           <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Tables / All Models</Link>
           <span className="admin-breadcrumbs__separator">/</span>
           <span className="admin-breadcrumbs__current">Edit Model</span>
         </div>
       </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <EditModelForm
          paramsId={id}
          model={model}
          submitText="Save"
          edit={model.id}
          onSubmit={this.onSubmit} />

        <div className="form-group__inline-wrapper table_start">
          {fields ?
            <div className="form-group_width-table47">
              <div className="form-group__inline-wrapper table__name-top">
                <h2 className="sub-header ">Fields</h2>
                <button className="btn btn_add" onClick={this.toggleWindowModal}>Add Field</button>
              </div>
              <AdminTable
                columns={columns}
                quickActions={[
                  // {
                  //   tag: 'Link', props: {
                  //     href: `/admin/tables/models/${id}/fields/edit/:id`,
                  //   },
                  //   title: 'Edit'
                  // },
                  {
                    tag: 'button',
                    route: `/admin/ajax/models/${id}/fields/:id`,
                    method: 'delete',
                    confirm: 'Are You Sure?',
                    after: () => this.updateFields(),
                    className: 'quick-action-menu__item_danger',
                    title: 'Delete'
                  }
                ]}
                rows={fields.map(field => ({ ...field,  button__table: () => this.getModalFields(field.id) }))}
                radiusTable={true}
                offBorderLast={true}
              />
              {/*<Link className="btn btn_add" to={`/admin/tables/models/${model.id}/fields/add`}>Add Field</Link>*/}
            </div>
           : ''}


          {relations ?
            <div className="form-group_width-table47">
              <div className="form-group__inline-wrapper table__name-top">
                <h2 className="sub-header">Relations</h2>
                <button className="btn btn_add" onClick={this.toggleWindowRelationModal}>Add Relation</button>
              </div>
              <AdminTable
                columns={columns}
                quickActions={
                  [
                //     {
                //   tag: 'Link', props: {
                //     href: `/admin/tables/models/${id}/relations/edit/:id`,
                //   },
                //   title: 'Edit'
                // },
                    {
                  tag: 'button',
                  route: `/admin/ajax/models/${id}/relations/:id`,
                  method: 'delete',
                  confirm: 'Are You Sure?',
                  after: () => this.updateRelations(),
                  className: 'quick-action-menu__item_danger',
                  title: 'Delete'
                }]}
                rows={relations.map(relation => ({ ...relation, button__table: () => this.getModalRelation(relation.id) }))}
                radiusTable={true}
                offBorderLast={true}
              />
            </div>
           : ''}
        </div>


        <div className="form-group__inline-wrapper table_start">



          {accessors ?
            <div className="form-group_width-table47">
              <div className="form-group__inline-wrapper table__name-top">
                <h2 className="sub-header">Accessors</h2>
                <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/accessors/add`}>Add Accessor</Link>
              </div>

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
                  title: 'Delete'
                }]}
                rows={accessors.map(accessor => ({ ...accessor, editUrl: `/admin/tables/models/${model.id}/accessors/edit/${accessor.id}` }))}
                radiusTable={true}
                offBorderLast={true}
              />
            </div>
           : ''}
        </div>


        <div className="form-group__inline-wrapper table_start">


          <div className="form-group_width-table47">
            <div className="form-group__inline-wrapper table__name-top">
              <h2 className="sub-header">Validation</h2>
              <button onClick={() => this.setState({ isModalOpened: true })} className="btn btn_add">
                Add Field
              </button>
            </div>
          </div>
        </div>

        {sql_editors ? <>
          <h2 className="sub-header">SQL Editors</h2>
          <AdminTable
            columns={columns}
            rows={sql_editors.map(query => ({ ...query, editUrl: `/admin/tables/models/${model.id}/sql_editors/edit/${query.id}` }))}
            radiusTable={true}
          />
          <Link className="btn btn_add" to={`/admin/tables/models/${model.id}/sql_editors/add`}>Add Editor</Link>
        </> : ''}

        {modalWindow && (
          <ModalWindow modelId={id} activeMode={this.state.modalWindow} toggleModal={this.toggleWindowModal} />
        )}

        {modalRelationWindow && (
          <ModalRelationWindow modelId={id} activeMode={this.state.modalRelationWindow} toggleModal={this.toggleWindowRelationModal}/>
        )}
      </div>
    </div>;
  }
}

export default withRouter(EditModel);
