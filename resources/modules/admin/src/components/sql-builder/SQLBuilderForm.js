import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import Resource from "../../../../editor/src/js/classes/Resource";
import { titleToName } from "../../js/helpers";
import AggregateComponent from "./AggregateComponent";
import ConditionComponent from "./ConditionComponent";
import OrderByComponent from "./OrderByComponent";
import AltrpSelect from "../altrp-select/AltrpSelect";
import { getMomentFormat } from "./helpers";

class SQLBuilderForm extends Component {
  constructor(props) {
    super(props);
    const { modelId } = this.props.match.params;
    this.state = {
      value: {
        title: "",
        name: "",
        columns: [],
        aggregates: [],
        conditions: [],
        relations: [],
        order_by: [],
        access: { roles: [], permissions: [] },
        group_by: [],
        offset: 10,
        limit: 5
      },
      relationsOptions: [],
      rolesOptions: [],
      permissionsOptions: [],
      selfFields: [],
      selfFieldsOptions: []
    };
    this.counter = 0;
    this.rolesOptions = new Resource({ route: '/admin/ajax/role_options' });
    this.permissionsOptions = new Resource({ route: '/admin/ajax/permissions_options' });
    this.selfFieldsResource = new Resource({ route: `/admin/ajax/models/${modelId}/fields` });
    this.relationsResource = new Resource({ route: `/admin/ajax/models/${modelId}/relations` });
    this.submitHandler = this.submitHandler.bind(this);
    this.multipleSelectChangeHandler = this.multipleSelectChangeHandler.bind(this);
    this.aggregateChangeHandler = this.aggregateChangeHandler.bind(this);
    this.aggregateAddHandler = this.aggregateAddHandler.bind(this);
    this.aggregateDeleteHandler = this.aggregateDeleteHandler.bind(this);
    this.conditionChangeHandler = this.conditionChangeHandler.bind(this);
    this.orderByChangeHandler = this.orderByChangeHandler.bind(this);
    this.orderByAddHandler = this.orderByAddHandler.bind(this);
    this.orderByDeleteHandler = this.orderByDeleteHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
  }

  /**
   * запросы опций для селектов
   *
   */
  async componentDidMount() {
    const rolesOptions = await this.rolesOptions.getAll();
    this.setState(state => ({ ...state, rolesOptions }));
    const permissionsOptions = await this.permissionsOptions.getAll();
    this.setState(state => ({ ...state, permissionsOptions }));
    const selfFields = await this.selfFieldsResource.getAll();
    let selfFieldsOptions = selfFields.map(field => {
      return {
        label: field.title,
        value: field.name,
      };
    });
    this.setState(state => ({ ...state, selfFields, selfFieldsOptions }));
    const relations = await this.relationsResource.getAll();
    let relationsOptions = relations.map(relation => {
      return {
        label: relation.title,
        value: relation.name,
      };
    });
    this.setState(state => ({ ...state, relationsOptions }));
  }

  /**
   * Добавляет поля из добавленных связей
   * @return {Promise<void>}
   */
  async addForeignFields() {

  }

  /**
   * Смена группировки
   */
  changeGroupBy = (group_by) => {
    let _group_by = [];
    if (group_by) group_by.forEach(r => {
      _group_by.push(r.value)
    });
    this.setState(state => {
      const newState = _.cloneDeep(state);
      newState.value.group_by = _group_by;
      return newState;
    });
  };
  /**
   * Смена колонок
   */
  changeColumns = (columns) => {
    let _columns = [];
    columns.forEach(c => {
      _columns.push(c.value)
    });
    this.setState(state => ({ ...state, value: { ...state.value, columns: _columns } }));
  };
  /**
   * Смена связей
   */
  changeRelations = (relations) => {
    let _relations = [];
    relations.forEach(r => {
      _relations.push(r.value)
    });
    this.setState(state => ({ ...state, relations: _relations }))
  };
  /**
   * Смена ролей
   */
  changeRoles = (roles) => {
    let _roles = [];
    if (roles) roles.forEach(r => {
      _roles.push(r.value)
    });
    this.setState(state => {
      const newState = _.cloneDeep(state);
      newState.value.access.roles = _roles;
      return newState;
    });
  };
  /**
   * Смена разрешений
   */
  changePermission = (permissions) => {
    let _permissions = [];
    if (permissions) permissions.forEach(p => {
      _permissions.push(p.value)
    });
    this.setState(state => {
      const newState = _.cloneDeep(state);
      newState.value.access.permissions = _permissions;
      return newState;
    });
  };

  valueChangeHandler = ({ target: { value, name } }) => {
    this.setState(state => ({ ...state, value: { ...state.value, [name]: value } }));
  }

  // обработчик изменения поля title, изменяющий значение поля name
  titleChangeHandler(e) {
    e.persist();
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        title: e.target.value,
        name: titleToName(e.target.value)
      }
    }))
  }

  // обработчики событий для массива aggregates
  aggregateChangeHandler({ target: { value, name } }, index) {
    this.setState(state => {
      const aggregates = [...state.value.aggregates];
      aggregates[index] = { ...state.value.aggregates[index], [name]: value };
      return {
        ...state,
        value: { ...state.value, aggregates }
      };
    });
  }

  aggregateAddHandler() {
    this.setState(state => {
      const aggregates = [...state.value.aggregates];
      aggregates.push({ type: '', column: '', alias: ''/* , id: this.counter */ });
      return {
        ...state,
        value: { ...state.value, aggregates }
      };
    });
  }

  aggregateDeleteHandler(index) {
    this.setState(state => {
      const aggregates = [...state.value.aggregates];
      aggregates.splice(index, 1);
      return {
        ...state,
        value: { ...state.value, aggregates }
      };
    });
  }

  // обработчики событий для массива conditions
  conditionAddHandler = () => {
    this.setState(state => {
      const conditions = [...state.value.conditions];
      conditions.push({ condition_type: '' });
      return {
        ...state,
        value: { ...state.value, conditions }
      };
    });
  }

  conditionChangeHandler({ target: { value, name, checked } }, index) {
    this.setState(state => {
      const conditions = [...state.value.conditions];
      let condition;
      if (name === 'condition_type') {
        switch (value) {
          case 'where':
          case 'or_where':
            condition = { condition_type: value, column: '', operator: '', value: '' };
            break;
          case 'where_between':
          case 'where_in':
            condition = index === 0 ?
              { condition_type: value, not: false, column: '', values: [] } :
              { condition_type: value, or: false, not: false, column: '', values: [] };
            break;
          case 'where_date':
            condition = { condition_type: value, type: 'year', column: '', value: '2020' };
            break;
          case 'where_column':
            condition = index === 0 ?
              { condition_type: value, first_column: '', operator: '', second_column: '' } :
              { condition_type: value, or: false, first_column: '', operator: '', second_column: '' };
            break;

          default:
            throw new Error('invalid condition type');
        }
      } else {
        switch (name) {
          case 'value1':
            condition = {
              ...state.value.conditions[index],
              values: [value, state.value.conditions[index].values[1]]
            };
            break;
          case 'value2':
            condition = {
              ...state.value.conditions[index],
              values: [state.value.conditions[index].values[0], value]
            };
            break;
          case 'values':
            condition = {
              ...state.value.conditions[index],
              [name]: value.split(',').map(item => item.trim())
            };
            break;
          case 'type':
            condition = {
              ...state.value.conditions[index],
              type: value,
              value: moment(new Date()).format(getMomentFormat(value))
            };
            break;
          case 'operator':
            condition = {
              ...state.value.conditions[index],
              [name]: value
            };
            condition.condition_type === 'where_column' ?
              condition.second_column = condition.second_column || '' :
              condition.value = condition.value || ''
            break;

          default:
            condition = {
              ...state.value.conditions[index],
              [name]: ['or', 'not'].includes(name) ? checked : value
            };
            break;
        }

      }
      conditions[index] = condition;
      return {
        ...state,
        value: { ...state.value, conditions }
      };
    });
  }

  conditionDeleteHandler(index) {
    this.setState(state => {
      const conditions = [...state.value.conditions];
      conditions.splice(index, 1);
      return {
        ...state,
        value: { ...state.value, conditions }
      };
    });
  }

  // обработчики событий для массива orderBy
  orderByChangeHandler({ target: { value, name } }, index) {
    this.setState(state => {
      const order_by = [...state.value.order_by];
      order_by[index] = { ...state.value.order_by[index], [name]: value };
      return {
        ...state,
        value: { ...state.value, order_by }
      };
    });
  }

  orderByAddHandler() {
    // this.counter++;

    this.setState(state => {
      const order_by = [...state.value.order_by];
      order_by.push({ type: '', column: ''/* , id: this.counter */ });
      return {
        ...state,
        value: { ...state.value, order_by }
      };
    });
  }

  orderByDeleteHandler(index) {
    this.setState(state => {
      const order_by = [...state.value.order_by];
      order_by.splice(index, 1);
      return {
        ...state,
        value: { ...state.value, order_by }
      };
    })
  }

  // обработчик изменения для multiple-селектов
  multipleSelectChangeHandler({ target: { value, name } }) {
    this.setState(state => {
      const array = [...state[name]];

      if (array.includes(value)) {
        const index = array.indexOf(value);
        array.splice(index, 1);
      } else {
        array.push(value);
      }

      return { ...state, [name]: array };
    })
  }

  submitHandler(e) {
    e.preventDefault();
    console.log(this.state.value);
  }

  /**
   * сохранить связи
   */
  setRelations = (relations) => {
    let _relations = [];
    relations.forEach(r => {
      _relations.push(r.value);
    });
    this.setState(state => ({ ...state, relations: _relations }))
  };
  /**
   * сохранить колонки
   */
  setColumns = (columns) => {
    let _columns = [];
    columns.forEach(c => {
      _columns.push(c.value)
    });
    this.setState(state => ({ ...state, columns: _columns }))
  };

  render() {
    const { title, name, relations, columns, aggregates, conditions, order_by, group_by, } = this.state.value;
    const { roles, permissions } = this.state.value.access;
    const { selfFieldsOptions, permissionsOptions, relationsOptions, rolesOptions } = this.state;
    const { modelId } = this.props.match.params;
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="row">
        <div className="form-group  col-6">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" required name="title"
            value={title}
            onChange={this.titleChangeHandler}
            className="form-control" />
        </div>

        <div className="form-group col-6 ">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required name="name"
            value={name}
            onChange={this.valueChangeHandler}
            className="form-control" />
        </div>

        <div className="form-group col-6">
          <label htmlFor="relations">With</label>
          <AltrpSelect
            closeMenuOnSelect={false}
            onChange={this.changeRelations}
            value={_.filter(relationsOptions, r => relations.indexOf(r.value) >= 0)}
            options={relationsOptions}
            isMulti={true} />
        </div>

        <div className="form-group col-6">
          <label htmlFor="columns">Fields</label>

          <AltrpSelect
            closeMenuOnSelect={false}
            onChange={this.changeColumns}
            value={_.filter(selfFieldsOptions, c => columns.indexOf(c.value) >= 0)}
            options={selfFieldsOptions}
            isMulti={true} />
        </div>
      </div>


      <h2 className="admin-form__subheader centred">Access</h2>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="roles">Roles</label>

          <AltrpSelect id="roles"
            closeMenuOnSelect={false}
            value={_.filter(rolesOptions, r => roles.indexOf(r.value) >= 0)}
            isMulti={true}
            onChange={this.changeRoles}
            options={rolesOptions} />
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="permissions">Permissions</label>
          <AltrpSelect id="roles"
            value={_.filter(permissionsOptions, p => permissions.indexOf(p.value) >= 0)}
            closeMenuOnSelect={false}
            isMulti={true}
            onChange={this.changePermission}
            options={permissionsOptions} />
        </div>
      </div>

      <h2 className="admin-form__subheader centred">Aggregates</h2>
      {aggregates.map((item, index) => <Fragment key={index}>
        {index !== 0 && <hr />}
        <div className="text-right">
          <button className="btn btn_failure" type="button" onClick={() => this.aggregateDeleteHandler(index)}>
            ✖
          </button>
        </div>
        <AggregateComponent item={item}
          columnsOptions={selfFieldsOptions}
          changeHandler={e => this.aggregateChangeHandler(e, index)}
          deleteHandler={() => this.aggregateDeleteHandler(index)}
        />
      </Fragment>)}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.aggregateAddHandler}>
          + New Aggregate
        </button>
      </div>

      <h2 className="admin-form__subheader centred">Conditions</h2>

      {conditions.map((condition, index) => <Fragment key={index}>
        <div className="text-right">
          <button className="btn btn_failure" type="button" onClick={() => this.conditionDeleteHandler(index)}>
            ✖
          </button>
        </div>
        {index !== 0 && <hr />}
        <ConditionComponent
          item={condition}
          isFirst={index === 0}
          columnsOptions={selfFieldsOptions}
          changeHandler={e => this.conditionChangeHandler(e, index)}
        />

      </Fragment>)}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.conditionAddHandler}>
          + New Condition
        </button>
      </div>

      <h2 className="admin-form__subheader centred">Order By</h2>

      {order_by.map((item, index) => <Fragment key={index}>
        {index !== 0 && <hr />}
        <div className="text-right">
          <button className="btn btn_failure" type="button" onClick={() => this.orderByDeleteHandler(index)}>
            ✖
          </button>
        </div>
        <OrderByComponent
          item={item}
          columnsOptions={selfFieldsOptions}
          changeHandler={e => this.orderByChangeHandler(e, index)}
        />
      </Fragment>)}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.orderByAddHandler}>
          + New Order
        </button>
      </div>

      <h2 className="admin-form__subheader centred">Group By</h2>

      <div className="form-group">
        <label htmlFor="group_by">Fields</label>

        <AltrpSelect
          id="group_by"
          closeMenuOnSelect={false}
          onChange={this.changeGroupBy}
          value={_.filter(selfFieldsOptions, f => group_by.indexOf(f.value) >= 0)}
          options={selfFieldsOptions}
          isMulti={true} />
      </div>
      <div className="btn__wrapper btn_add centred">
        <button className="btn btn_success" type="submit">Save</button>
        <Link className="btn" to="/admin/tables/models">Cancel</Link>
      </div>
    </form >
  }
}

export default withRouter(SQLBuilderForm);
