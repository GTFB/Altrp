import React, { Component } from "react";
import ReactDOM from "react-dom";
import AdminTable from "../AdminTable";
import Resource from "../../../../editor/src/js/classes/Resource";
import ModalWindow from "../ModalWindow";
import store from "./../../js/store/store"
import {getModelId, getModelRelationId, getModelStaticProp} from "../../js/store/models-state/actions";
import ModalRelationWindow from "../ModalRelationWindow";
import {editModels} from "../../js/store/routes-state/action";
import SidebarEditModelForm from "./SidebarEditModelForm";
import cn from "classnames";
import ModalPropWindow from "../ModalPropWindow";

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
const propsColumns = [
  {
    name: 'prop_name',
    title: 'Static Prop Name',
    url: true,
    editUrl: true,
    tag: 'Link',
    button__table: true
  },
  {
    name: 'prop_value',
    title: 'Static Prop Value'
  },
];

class SidebarEditModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      relations: [],
      activeTable: "field",
      modalWindow: false,
      modalRelationWindow: false,
      modalPropWindow: false,
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



  updateProps = async () => {
    let static_props = await new Resource({ route: `/admin/ajax/models/${this.props.id}/settings/static_props` }).getAll();
    this.setState(state => ({ ...state, static_props: static_props?.data }));
  }



  toggleWindowModal = () => {
    store.dispatch(getModelId(null));
    this.setState(state => ({ ...state, modalWindow: !this.state.modalWindow }))
    this.updateFields();
  }

  getModelStaticProp = () => {
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

  toggleWindowPropModal = ()=>{

    store.dispatch(getModelRelationId(null));
    this.setState(state => ({ ...state, modalPropWindow: !this.state.modalPropWindow }))
    this.updateProps();
  }

  getModalRelation = (id) => {
    store.dispatch(getModelRelationId(id));
    this.setState(state => ({ ...state, modalRelationWindow: true }))
  }
  getModalProps = (prop_name) => {
    store.dispatch(getModelStaticProp(this.props.id, prop_name));
    this.setState(state => ({ ...state, modalPropWindow: true }))
  }


  getData = async () => {
    if (this.props.id) {
      this.modelsResource.get(this.props.id)
        .then(model => {
          this.modelName = model.name;
        });

      new Resource({ route: `/admin/ajax/models/${this.props.id}/fields` }).getAll()
        .then(fields => this.setState({ fields: fields.filter(({ name }) => name !== 'id') }));

      new Resource({ route: `/admin/ajax/models/${this.props.id}/relations` }).getAll()
        .then(relations => this.setState({ relations }));
      new Resource({ route: `/admin/ajax/models/${this.props.id}/settings/static_props` }).getAll()
        .then(static_props => this.setState({ static_props: static_props.data }));

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
    this.props.updateModelsState()
  };

  changeTab = (e) => {
    this.setState(state => ({
      ...state,
      activeTable: e.target.dataset.key
    }))
  }

  render() {
    const { fields,
      relations,
      activeTable,
      modalWindow,
      modalPropWindow,
      modalRelationWindow,
      static_props = [] } = this.state;


    return <div className="admin-settings_model-content">
      <div className="admin-settings_model-container">
        <SidebarEditModelForm
          paramsId={this.props.id}
          submitText="Update Files"
          onSubmit={this.onSubmit}
          closeSidebar={this.props.closeSidebar}
          updateModelsState={this.props.updateModelsState}
        />
        <div className="admin-settings_model-table-tabs">
          <button
            onClick={this.changeTab}
            data-key="field"
            className={cn("admin-settings_model-table-tab", {
              active: activeTable === "field"
            })}
          >
            Fields
          </button>
          <button
            onClick={this.changeTab}
            data-key="relation"
            className={cn("admin-settings_model-table-tab", {
              active: activeTable === "relation"
            })}
          >
            Relations
          </button>
          <button
            onClick={this.changeTab}
            data-key="static-props"
            className={cn("admin-settings_model-table-tab", {
              active: activeTable === "static-props"
            })}
          >
            Static Props
          </button>
        </div>
        <div className="form-table-wrapper">
          {activeTable === "field" && (
            <div className="form-table-field">
              <div className="form-group__inline-wrapper tb">
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
          {activeTable === "static-props" && (
            <div className="form-table-field">
              <div className="form-group__inline-wrapper tb">
                <h2 className="sub-header ">Props</h2>
                <button className="btn btn_add" onClick={this.toggleWindowPropModal}>Add Static Prop</button>
              </div>
              <AdminTable
                columns={propsColumns}
                quickActions={[
                  {
                    tag: 'button',
                    route: `/admin/ajax/models/${this.props.id}/settings/static_props/:id`,
                    method: 'delete',
                    confirm: 'Are You Sure?',
                    after: () => this.updateProps(),
                    className: 'quick-action-menu__item_danger',
                    title: 'Delete'
                  }
                ]}
                rows={static_props.map(prop => ({ ...prop, id: prop.prop_name,  button__table: () => this.getModalProps(prop.prop_name) }))}
                radiusTable={true}
                offBorderLast={true}
              />
            </div>
          )}
          {activeTable === "relation" && (
            <div className="form-table-relation">
              <div className="form-group__inline-wrapper tb">
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
          ReactDOM.createPortal(
            <ModalWindow modelId={this.props.id} activeMode={this.state.modalWindow} toggleModal={this.toggleWindowModal} />,
            document.body
          )
        )}

        {modalRelationWindow && (
          ReactDOM.createPortal(
            <ModalRelationWindow modelId={this.props.id}
                                 activeMode={this.state.modalRelationWindow}
                                 toggleModal={this.toggleWindowRelationModal}/>,
            document.body
          )
        )}

        {modalPropWindow && (
          ReactDOM.createPortal(
            <ModalPropWindow modelId={this.props.id}
                                 activeMode={modalPropWindow}
                                 toggleModal={this.toggleWindowPropModal}/>,
            document.body
          )
        )}
      </div>
    </div>;
  }
}

export default SidebarEditModel;
