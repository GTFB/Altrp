import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminTable from "../AdminTable";
import Resource from "../../../../editor/src/js/classes/Resource";
import ModalWindow from "../ModalWindow";
import store from "./../../js/store/store"
import {getModelId, getModelRelationId} from "../../js/store/models-state/actions";
import ModalRelationWindow from "../ModalRelationWindow";
import {editModels} from "../../js/store/routes-state/action";
import SidebarEditModelForm from "./SidebarEditModelForm";

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

class SidebarEditModel extends Component {
  constructor(props) {
    super(props);
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
      relations: [],
      activeTable: "field",
      modalWindow: false,
      modalRelationWindow: false,
    };

    this.modelsResource = new Resource({ route: '/admin/ajax/models' });
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
  }

  updateFields = async () => {
    let fields = await new Resource({ route: `/admin/ajax/models/${this.props.id}/fields` }).getAll();
    fields = fields.filter(({ name }) => name !== 'id');
    this.setState(state => ({ ...state, fields }));
  }

  updateRelations = async () => {
    let relations = await new Resource({ route: `/admin/ajax/models/${this.props.id}/relations` }).getAll();
    this.setState(state => ({ ...state, relations }));
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


  getData = async () => {
    const { data } = await this.categoryOptions.getAll();
    this.setState(state => ({
      ...state,
      model: {
        ...state.model,
        categoryOptions: data
      }
    }))
    if (this.props.id) {
      this.modelsResource.get(this.props.id)
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
        });

      new Resource({ route: `/admin/ajax/models/${this.props.id}/fields` }).getAll()
        .then(fields => this.setState({ fields: fields.filter(({ name }) => name !== 'id') }));

      new Resource({ route: `/admin/ajax/models/${this.props.id}/relations` }).getAll()
        .then(relations => this.setState({ relations }));
    }
  }
  /**
   * Загрузим данные модели
   * @return {Promise<void>}
   */
  async componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id && this.props.id !== null) {
      this.getData()
    }
  }

  updateModels = async () => {
    let options = await new Resource({ route: "/admin/ajax/model_options" }).getAll()
    options = options.options
    store.dispatch(editModels(options))
  }

  /**
   * Обработка формы
   * @return {*}
   */
  onSubmit = async (model) => {
    const isNameTaken = !this.props.id || this.modelName !== model.name ?
      await fetch(`/admin/ajax/model_name_is_free/?name=${model.name}`)
        .then(res => res.json())
        .then(res => !res.taken) :
      null;

    if (isNameTaken) {
      return alert(`Name ${model.name} is already taken. Use another one.`)
    }

    if (this.props.id) {
      await this.modelsResource.put(this.props.id, model);
    } else {
      await this.modelsResource.post(model);
    }
    this.updateModels();
  };
  render() {
    const { model, fields,  relations, activeTable, modalWindow, modalRelationWindow } = this.state;

    return <div className="admin-settings_model-content">
      <div className="admin-settings_model-container">
        <SidebarEditModelForm
          paramsId={this.props.id}
          model={model}
          submitText="Save"
          edit={model.id}
          onSubmit={this.onSubmit} />

        <div className="form-table-wrapper">
          {activeTable === "field" && (
            <div className="form-table-field">
              <div className="form-group__inline-wrapper table__name-top">
                <h2 className="sub-header ">Fields</h2>
                <button className="btn btn_add" onClick={this.toggleWindowModal}>Add Field</button>
              </div>
              <AdminTable
                columns={columns}
                quickActions={[
                  {
                    tag: 'button',
                    route: `/admin/ajax/models/${this.props.id}/fields/:id`,
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
            </div>
          )}
          {activeTable === "relation" && (
            <div className="form-table-relation">
              <div className="form-group__inline-wrapper table__name-top">
                <h2 className="sub-header">Relations</h2>
                <button className="btn btn_add" onClick={this.toggleWindowRelationModal}>Add Relation</button>
              </div>
              <AdminTable
                columns={columns}
                quickActions={
                  [
                    {
                      tag: 'button',
                      route: `/admin/ajax/models/${this.props.id}/relations/:id`,
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
          )}
        </div>

        {modalWindow && (
          <ModalWindow modelId={this.props.id} activeMode={this.state.modalWindow} toggleModal={this.toggleWindowModal} />
        )}

        {modalRelationWindow && (
          <ModalRelationWindow modelId={this.props.id} activeMode={this.state.modalRelationWindow} toggleModal={this.toggleWindowRelationModal}/>
        )}
      </div>
    </div>;
  }
}

export default SidebarEditModel;