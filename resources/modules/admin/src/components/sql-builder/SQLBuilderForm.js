import React, {Component, Fragment} from "react";
import moment from "moment";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName} from "../../js/helpers";
import AggregateComponent from "./AggregateComponent";
import ConditionComponent from "./ConditionComponent";
import OrderByComponent from "./OrderByComponent";
import {cloneDeep} from "lodash";
import AltrpSelect from "../altrp/AltrpSelect";
import {withRouter} from "react-router-dom";

const conditionInitState = {
  conditionType: '',
  column: '',
  operator: '',
  value: '',
  or: false,
  not: false,
  value1: '',
  value2: '',
  values: '',
  type: '',
  first_column: '',
  second_column: '',
  date: new Date(),
  id: 0
};

/** @function getDateFormat
 * Функция схожа с объявленой в файле ConditionComponent.js, с тем различием
 что moment запрашивает дату в формате DD - заглавные буквы
 * @param {string} type - тип поля where_date
 * @return {string | undefined} формат строки, получаемой из объекта Date
 */
function getDateFormat(type) {
  switch (type) {
    case 'datetime':
      return "yyyy/MM/DD h:mm:ss";
    case 'date':
      return "yyyy/MM/DD";
    case 'time':
      return "h:mm:ss";
    case 'day':
      return "DD";
    case 'month':
      return "MM";
    case 'year':
      return "yyyy";

    default:
      break;
  }
}

class SQLBuilderForm extends Component {
  constructor(props) {
    super(props);
    const {modelId} = this.props.match.params;
    this.state = {
      "title": "test",
      "name": "test",
      "columns": ["id"],
      "aggregates": [{"type": "max", "column": "id", "alias": "test", "id": 1}],
      "conditions": [{
        "conditionType": "where",
        "column": "id",
        "operator": "=",
        "value": "1",
        "or": false,
        "not": false,
        "value1": "",
        "value2": "",
        "values": "",
        "type": "",
        "first_column": "",
        "second_column": "",
        "date": "2020-08-05T19:16:12.714Z",
        "id": 1
      }, {
        "conditionType": "or_where",
        "column": "id",
        "operator": "not-null",
        "value": "1",
        "or": false,
        "not": false,
        "value1": "",
        "value2": "",
        "values": "",
        "type": "",
        "first_column": "",
        "second_column": "",
        "date": "2020-08-05T19:16:50.513Z",
        "id": 1
      }, {
        "conditionType": "where_between",
        "column": "id",
        "operator": "",
        "value": "",
        "or": true,
        "not": false,
        "value1": "1",
        "value2": "11",
        "values": "",
        "type": "",
        "first_column": "",
        "second_column": "",
        "date": "2020-08-05T19:16:50.513Z",
        "id": 2
      }, {
        "conditionType": "where_between",
        "column": "id",
        "operator": "",
        "value": "",
        "or": false,
        "not": true,
        "value1": "1",
        "value2": "2",
        "values": "",
        "type": "",
        "first_column": "",
        "second_column": "",
        "date": "2020-08-05T19:16:50.513Z",
        "id": 3
      },
      //   {
      //   "conditionType": "where_date",
      //   "column": "id",
      //   "operator": "",
      //   "value": "",
      //   "or": false,
      //   "not": false,
      //   "value1": "",
      //   "value2": "",
      //   "values": "",
      //   "type": "datetime",
      //   "first_column": "",
      //   "second_column": "",
      //   "date": "2016-10-31T16:00:00.000Z",
      //   "id": 4
      // },
        {
        "conditionType": "where_column",
        "column": "",
        "operator": "=",
        "value": "",
        "or": true,
        "not": false,
        "value1": "",
        "value2": "",
        "values": "",
        "type": "",
        "first_column": "id",
        "second_column": "id",
        "date": "2020-08-05T19:16:50.513Z",
        "id": 5
      }],
      "relations": [],
      "orderBy": [],
      "permissions": [1, 3],
      "roles": [1, 2],
      "group_by": ["id"],
      "relationsOptions": [],
      "rolesOptions": [{"value": 1, "label": "Admin"}, {"value": 2, "label": "User"}],
      "permissionsOptions": [{"value": 1, "label": "Create Inners"}, {"value": 2, "label": "Read Inners"}, {
        "value": 3,
        "label": "Update Inners"
      }, {"value": 4, "label": "Delete Inners"}, {"value": 5, "label": "All Inners"}, {
        "value": 51,
        "label": "Create Tests"
      }, {"value": 52, "label": "Read Tests"}, {"value": 53, "label": "Update Tests"}, {
        "value": 54,
        "label": "Delete Tests"
      }, {"value": 55, "label": "All Tests"}, {"value": 62, "label": "Create news"}, {
        "value": 63,
        "label": "Read news"
      }, {"value": 64, "label": "Update news"}, {"value": 65, "label": "Delete news"}, {
        "value": 66,
        "label": "All news"
      }, {"value": 67, "label": "Create new_3s"}, {"value": 68, "label": "Read new_3s"}, {
        "value": 69,
        "label": "Update new_3s"
      }, {"value": 70, "label": "Delete new_3s"}, {"value": 71, "label": "All new_3s"}, {
        "value": 72,
        "label": "Create login123213s"
      }, {"value": 73, "label": "Read login123213s"}, {"value": 74, "label": "Update login123213s"}, {
        "value": 75,
        "label": "Delete login123213s"
      }, {"value": 76, "label": "All login123213s"}, {
        "value": 77,
        "label": "Create login123213123213213s"
      }, {"value": 78, "label": "Read login123213123213213s"}, {
        "value": 79,
        "label": "Update login123213123213213s"
      }, {"value": 80, "label": "Delete login123213123213213s"}, {"value": 81, "label": "All login123213123213213s"}],
      "selfFields": [{
        "id": 37,
        "name": "id",
        "title": "ID",
        "description": "Identifier",
        "type": "id",
        "size": null,
        "null": false,
        "default": null,
        "primary": null,
        "unique": false,
        "table_id": 63,
        "user_id": 2,
        "altrp_migration_id": 73,
        "is_label": 0,
        "is_title": 0,
        "attribute": null,
        "input_type": null,
        "options": null,
        "indexed": 0,
        "editable": 0,
        "hidden": 0,
        "model_id": null
      }],
      "selfFieldsOptions": [{"label": "ID", "value": "id"}]
    };
    this.counter = 0;
    this.rolesOptions = new Resource({route: '/admin/ajax/role_options'});
    this.permissionsOptions = new Resource({route: '/admin/ajax/permissions_options'});
    this.selfFieldsResource = new Resource({route: `/admin/ajax/models/${modelId}/fields`});
    this.relationsResource = new Resource({route: `/admin/ajax/models/${modelId}/relation_options`});
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.multipleSelectChangeHandler = this.multipleSelectChangeHandler.bind(this);
    this.aggregateChangeHandler = this.aggregateChangeHandler.bind(this);
    this.aggregateAddHandler = this.aggregateAddHandler.bind(this);
    this.aggregateDeleteHandler = this.aggregateDeleteHandler.bind(this);
    this.conditionChangeHandler = this.conditionChangeHandler.bind(this);
    this.conditionAddHandler = this.conditionAddHandler.bind(this);
    this.conditionDeleteHandler = this.conditionDeleteHandler.bind(this);
    this.conditionDeleteHandler = this.conditionDeleteHandler.bind(this);
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
    this.setState(state => ({...state, rolesOptions}));
    const permissionsOptions = await this.permissionsOptions.getAll();
    this.setState(state => ({...state, permissionsOptions}));
    const selfFields = await this.selfFieldsResource.getAll();
    let selfFieldsOptions = selfFields.map(field => {
      return {
        label: field.title,
        value: field.name,
      };
    });
    this.setState(state => ({...state, selfFields, selfFieldsOptions}));
    const relationsOptions = await this.relationsResource.getAll();
    this.setState(state => ({...state, relationsOptions}));
    // TODO: GET
    // modelsOptions
    // relationsOptions
    // permissionsOptions
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
    console.log(group_by);
    group_by.forEach(g => {
      _group_by.push(g.value)
    });
    this.setState(state => ({...state, group_by: _group_by}))
  };
  /**
   * Смена колонок
   */
  changeColumns = (columns) => {
    let _columns = [];
    columns.forEach(c => {
      _columns.push(c.value)
    });
    this.setState(state => ({...state, columns: _columns}))
  };
  /**
   * Смена связей
   */
  changeRelations = (relations) => {
    let _relations = [];
    relations.forEach(r => {
      _relations.push(r.value)
    });
    this.setState(state => ({...state, relations: _relations}))
  };
  /**
   * Смена ролей
   */
  changeRoles = (roles) => {
    let _roles = [];
    roles.forEach(r => {
      _roles.push(r.value)
    });
    this.setState(state => ({...state, roles: _roles}))
  };
  /**
   * Смена разрешений
   */
  changePermission = (permissions) => {
    let _permissions = [];
    permissions.forEach(p => {
      _permissions.push(p.value)
    });
    this.setState(state => ({...state, permissions: _permissions}))
  };

  changeHandler({target: {value, name}}) {
    this.setState(_state => ({[name]: value}));
  }

// обработчик изменения поля title, изменяющий значение поля name
  titleChangeHandler(e) {
    e.persist();
    this.setState(state => ({
      ...state,
      title: e.target.value,
      name: titleToName(e.target.value)
    }))
  }

// обработчики событий для массива aggregates
  aggregateChangeHandler({target: {value, name}}, index) {
    this.setState(state => {
      const aggregates = [...state.aggregates];
      aggregates[index] = {...state.aggregates[index], [name]: value};
      return {...state, aggregates};
    });
  }

  aggregateAddHandler() {
    this.counter++;

    this.setState(state => {
      const aggregates = [...state.aggregates];
      aggregates.push({type: '', column: '', alias: '', id: this.counter});
      return {...state, aggregates};
    });
  }

  aggregateDeleteHandler(index) {
    this.setState(state => {
      const aggregates = [...state.aggregates];
      aggregates.splice(index, 1);
      return {...state, aggregates};
    });
  }

// обработчики событий для массива conditions
  conditionChangeHandler({target: {value, name, checked}}, index) {
    this.setState(state => {
      const conditions = [...state.conditions];
      conditions[index] = {
        ...state.conditions[index],
        [name]: ['or', 'not'].includes(name) ? checked : value
      };
      return {...state, conditions};
    });
  }

  conditionAddHandler() {
    this.counter++;
    this.setState(state => {
      return {...state, conditions: [...state.conditions, {...conditionInitState, id: this.counter}]};
    });
  }

  conditionDeleteHandler(index) {
    this.setState(state => {
      const conditions = [...state.conditions];
      conditions.splice(index, 1);
      return {...state, conditions};
    })
  }

// обработчики событий для массива orderBy
  orderByChangeHandler({target: {value, name}}, index) {
    this.setState(state => {
      const orderBy = [...state.orderBy];
      orderBy[index] = {...state.orderBy[index], [name]: value};
      return {...state, orderBy};
    });
  }

  orderByAddHandler() {
    this.counter++;

    this.setState(state => {
      const orderBy = [...state.orderBy];
      orderBy.push({type: '', column: '', id: this.counter});
      return {...state, orderBy};
    });
  }

  orderByDeleteHandler(index) {
    this.setState(state => {
      const orderBy = [...state.orderBy];
      orderBy.splice(index, 1);
      return {...state, orderBy};
    })
  }

// обработчик изменения для multiple-селектов
  multipleSelectChangeHandler({target: {value, name}}) {
    this.setState(state => {
      const array = [...state[name]];

      if (array.includes(value)) {
        const index = array.indexOf(value);
        array.splice(index, 1);
      } else {
        array.push(value);
      }

      return {...state, [name]: array};
    })
  }

  submitHandler(e) {
    e.preventDefault();
    const {
      title, name, relations, columns, roles, permissions, aggregates,
      conditions: stateConditions, orderBy, group_by
    } = cloneDeep(this.state);
    // удаляю свойства id не нужные на сервере
    aggregates.forEach(item => delete item.id);
    stateConditions.forEach(item => delete item.id);
    orderBy.forEach(item => delete item.id);
    // формирую объект conditions на основе state  
    const where = stateConditions
        .filter(({conditionType}) => conditionType === "where")
        .map(({column, operator, value}) => ({column, operator, value}));

    const or_where = stateConditions
        .filter(({conditionType}) => conditionType === "or_where")
        .map(({column, operator, value}) => ({column, operator, value}));

    const where_between = stateConditions
        .filter(({conditionType}) => conditionType === "where_between")
        .map(({or, not, column, value1, value2}) => ({or, not, column, values: [value1, value2]}));

    const where_in = stateConditions
        .filter(({conditionType}) => conditionType === "where_in")
        .map(({or, not, column, values}) =>
            ({or, not, column, values: values.split(",").map(item => item.trim())})
        );

    const where_date = stateConditions
        .filter(({conditionType}) => conditionType === "where_date")
        .map(({type, column, operator, date}) => {
          const value = moment(date).format(getDateFormat(type));
          return {type, column, operator, value};
        });

    const where_column = stateConditions
        .filter(({conditionType, or}) => conditionType === "where_column" && !or)
        .map(({first_column, operator, second_column}) => ({first_column, operator, second_column}));

    const where_column_or = stateConditions
        .filter(({conditionType, or}) => conditionType === "where_column" && or)
        .map(({first_column, operator, second_column}) => ({first_column, operator, second_column}));

    const conditions = {
      where,
      or_where,
      where_between,
      where_in,
      where_date,
      where_column: [
        {or: false, data: where_column},
        {or: true, data: where_column_or}
      ]
    };
    const access = {roles, permissions};
    const data = {title, name, columns, aggregates, conditions, relations, orderBy, access, group_by};
    console.log(data);
    console.log(JSON.stringify(this.state));
  }

  /**
   * сохранить связи
   */
  setRelations = (relations) => {
    let _relations = [];
    relations.forEach(r => {
      _relations.push(r.value);
    });
    this.setState(state => ({...state, relations: _relations}))
  };
  /**
   * сохранить колонки
   */
  setColumns = (columns) => {
    let _columns = [];
    columns.forEach(c => {
      _columns.push(c.value)
    });
    this.setState(state => ({...state, columns: _columns}))
  };

  render() {
    const {
      title, name, relations, columns, roles, permissions,
      aggregates, conditions, orderBy, group_by, modelsOptions, selfFieldsOptions,
      permissionsOptions, relationsOptions, rolesOptions, selfFields
    } = this.state;

    const {modelId} = this.props.match.params;

    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="row">
        <div className="form-group  col-6">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" required name="title"
                 value={title}
                 onChange={this.titleChangeHandler}
                 className="form-control"/>
        </div>

        <div className="form-group col-6 ">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required name="name"
                 value={name}
                 onChange={this.changeHandler}
                 className="form-control"/>
        </div>

        <div className="form-group col-6">
          <label htmlFor="relations">With</label>
          <AltrpSelect
              closeMenuOnSelect={false}
              onChange={this.changeRelations}
              value={_.filter(relationsOptions, r => relations.indexOf(r.value) >= 0)}
              options={relationsOptions}
              isMulti={true}/>
        </div>

        <div className="form-group col-6">
          <label htmlFor="columns">Fields</label>

          <AltrpSelect
              closeMenuOnSelect={false}
              onChange={this.changeColumns}
              value={_.filter(selfFieldsOptions, c => columns.indexOf(c.value) >= 0)}
              options={selfFieldsOptions}
              isMulti={true}/>

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
                       options={rolesOptions}/>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="permissions">Permissions</label>
          <AltrpSelect id="roles"
                       value={_.filter(permissionsOptions, p => permissions.indexOf(p.value) >= 0)}
                       closeMenuOnSelect={false}
                       isMulti={true}
                       onChange={this.changePermission}
                       options={permissionsOptions}/>
        </div>
      </div>

      <h2 className="admin-form__subheader centred">Aggregates</h2>
      {aggregates.map((item, index) => <Fragment key={index}>
        {index !== 0 && <hr/>}
        <AggregateComponent item={item}
                            columnsOptions={selfFieldsOptions}
                            changeHandler={e => this.aggregateChangeHandler(e, index)}
                            deleteHandler={() => this.aggregateDeleteHandler(index)}/>
        <button className="btn btn_failure" type="button"
                onClick={() => this.aggregateDeleteHandler(index)}
        >
          Delete
        </button>
      </Fragment>)}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.aggregateAddHandler}>
          + New Aggregate
        </button>
      </div>

      <h2 className="admin-form__subheader centred">Conditions</h2>

      {conditions.map((condition, index) => <Fragment key={index}>
        {index !== 0 && <hr/>}
        <ConditionComponent
            item={condition}
            columnsOptions={selfFieldsOptions}
            changeHandler={e => this.conditionChangeHandler(e, index)}
        />
        <button className="btn btn_failure" type="button"
                onClick={() => this.conditionDeleteHandler(index)}
        >
          Delete
        </button>
      </Fragment>)}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.conditionAddHandler}>
          + New Condition
        </button>
      </div>

      <h2 className="admin-form__subheader centred">Order By</h2>

      {orderBy.map((item, index) => <Fragment key={index}>
        {index !== 0 && <hr/>}
        <OrderByComponent
            item={item}
            columnsOptions={selfFieldsOptions}
            changeHandler={e => this.orderByChangeHandler(e, index)}
        />
        <button className="btn btn_failure" type="button"
                onClick={() => this.orderByDeleteHandler(index)}
        >
          Delete
        </button>
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
            isMulti={true}/>
      </div>

      <div className="btn__wrapper btn_add centred">
        <button className="btn btn_success" type="submit">Save</button>
        {/* <Link className="btn" to="/admin/tables/models">Cancel</Link> */}
      </div>
    </form>
  }
}

export default withRouter(SQLBuilderForm);
