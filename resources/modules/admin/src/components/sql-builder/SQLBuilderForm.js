import React, { Component, Fragment } from "react";
import moment from "moment";
import Resource from "../../../../editor/src/js/classes/Resource";
import { titleToName } from "../../js/helpers";
import AggregateComponent from "./AggregateComponent";
import ConditionComponent from "./ConditionComponent";
import OrderByComponent from "./OrderByComponent";
import AltrpSelect from "../altrp-select/AltrpSelect";
import { Link, withRouter } from "react-router-dom";

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
  // date: new Date(),
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
    const { modelId } = this.props.match.params;
    this.state = {

     /* value:
      {
        title: "",
        "name": "getAllRecords",
        "columns": [
          "id",
          "name",
          "email"
        ],
        "aggregates": [
          {
            "type": "sum",
            "column": "price",
            "alias": "sum_price"
          },
          {
            "type": "max",
            "column": "price",
            "alias": "max_price"
          }
        ],
        "conditions": {
          "where": [
            {
              "column": "user_id",
              "operator": "=",
              "value": "CURRENT_USER"
            },
            {
              "column": "name",
              "operator": "=",
              "value": "Egor"
            }
          ],
          "or_where": [
            {
              "column": "name",
              "operator": "<>",
              "value": "CURRENT_USER"
            },
            {
              "column": "name",
              "operator": "<>",
              "value": "Tgor"
            }
          ],
          "where_between": [
            {
              "or": false,
              "not": false,
              "column": "price",
              "values": [
                20,
                50
              ]
            },
            {
              "or": false,
              "not": false,
              "column": "price",
              "values": [
                20,
                50
              ]
            }
          ],
          "where_in": [
            {
              "or": true,
              "not": true,
              "column": "price",
              "values": [
                20,
                50
              ]
            }
          ],
          "where_date": [
            {
              "type": "year",
              "column": "created_at",
              "operator": "=",
              "value": "2020"
            }
          ],
          "where_column": [
            {
              "or": false,
              "data": [
                {
                  "first_column": "price",
                  "operator": "<",
                  "second_column": "old_price"
                }
              ]
            },
            {
              "or": true,
              "data": [
                {
                  "first_column": "price",
                  "operator": "<",
                  "second_column": "old_price"
                },
                {
                  "first_column": "price",
                  "operator": "<",
                  "second_column": "old_price"
                }
              ]
            }
          ]
        },
        "relations": [
          "post",
          "comments"
        ],
        "order_by": [
          {
            "column": "name",
            "type": "desc"
          }
        ],
        "access": {
          "roles": [
            1,
            2
          ],
          "permissions": [
            48,
            50
          ]
        },
        "group_by": [
          "name",
          "surname"
        ],
        "offset": 10,
        "limit": 5
      },*/
      value:{},
      initialCondition: {
        conditionType: 'where',
        column: '',
        operator: 'not-null',
      },
      "relationsOptions": [],
      "rolesOptions":
        [],
      "permissionsOptions":
        [],
      "selfFields": [],
      "selfFieldsOptions": []
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
    this.conditionAddHandler = this.conditionAddHandler.bind(this);
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
    console.log(selfFieldsOptions);
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
    console.log(group_by);
    group_by.forEach(g => {
      _group_by.push(g.value)
    });
    this.setState(state => ({ ...state, group_by: _group_by }))
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
    roles.forEach(r => {
      _roles.push(r.value)
    });
    this.setState(state => ({ ...state, roles: _roles }))
  };
  /**
   * Смена разрешений
   */
  changePermission = (permissions) => {
    let _permissions = [];
    permissions.forEach(p => {
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
    // this.counter++;

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
  conditionChangeHandler({ target: { value, name, checked } }, index) {
    this.setState(state => {
      const conditions = [...state.conditions];
      conditions[index] = {
        ...state.conditions[index],
        [name]: ['or', 'not'].includes(name) ? checked : value
      };
      return { ...state, conditions };
    });
  }
  /**
   * Добавляем новый condition
   */
  conditionAddHandler() {
    // this.counter++;

    let newCondition = { ...this.state.initialCondition };
    this.pushCondition(newCondition);
    // console.log(this.state.value.conditions);
    // this.setState(state => {
    //   return { ...state, conditions: [...state.conditions, { ...conditionInitState, id: this.counter }] };
    // });
  }

  /**
   * @param {{}} condition - объект условия из компонента
   */
  pushCondition(condition) {
    let value = _.cloneDeep(this.state.value);
    /**
     * Удаляем ненужные свояства
     */
    let _condition = { ...condition };
    delete _condition.conditionType;
    delete _condition.index;
    delete _condition.or;
    value.conditions = value.conditions || {};
    value.conditions[condition.conditionType] = value.conditions[condition.conditionType] || [];
    value.conditions[condition.conditionType].push(_condition);
    this.setState(state => ({ ...state, value }));
  }

  /**
   *
   * @param {string} conditionType - тип условия
   * @param {int} index - номер в массиве
   * @param {{}} condition - объект условия из компонента
   * @param {boolean} or - для where_column
   */
  changeCondition = (conditionType, index, condition, or) => {
    let value = _.cloneDeep(this.state.value);
    let _condition = { ...condition };
    delete _condition.conditionType;
    delete _condition.index;
    delete _condition.or;
    value.conditions = value.conditions || {};
    console.log(conditionType);
    console.log(condition);
    if (conditionType !== condition.conditionType) {
      /**
       * если тип  меняется, то удаляем из старого вставляем в новый
       */
      value.conditions = value.conditions || {};
      switch (condition.conditionType) {
        case 'where_column':
          value.conditions[condition.conditionType] = value.conditions[condition.conditionType] || [];
          or ?
            value.conditions[condition.conditionType][1].data.push(_condition) :
            value.conditions[condition.conditionType][0].data.push(_condition);

          value.conditions[conditionType].splice(index, 1)
          break;
        case "where_between":
        case "where_in":
          value.conditions[condition.conditionType] = value.conditions[condition.conditionType] || [];
          const { or, not, column, values } = _condition;
          value.conditions[condition.conditionType].push({
            or: or || false,
            not: not || false,
            column: column || '',
            values: values || []
          });
          value.conditions[conditionType].splice(index, 1);
          break;
        default:
          value.conditions[condition.conditionType] = value.conditions[condition.conditionType] || [];
          value.conditions[condition.conditionType].push(_condition);
          value.conditions[conditionType].splice(index, 1);
          break;
      }
    } else {
      /**
       * удаляем старый заменяем на новый если тип не меняется
       */
      if (conditionType !== 'where_column') {
        value.conditions[conditionType].splice(index, 1, _condition);
      } else {
        //todo: реализовать вариант для where_column
        or ?
          value.conditions[conditionType][1].data.splice(index, 1, _condition) :
          value.conditions[conditionType][0].data.splice(index, 1, _condition);
      }
    }
    this.setState(state => ({ ...state, value }));
  };

  /**
   * @param {string} conditionType - тип условия
   * @param {int} index - номер в массиве
   * @param {boolean} or - для where_column
   */
  deleteCondition = (conditionType, index, or) => {
    let value = _.cloneDeep(this.state.value);
    if (conditionType !== 'where_column') {
      value.conditions[conditionType].splice(index, 1);
    } else {
      //todo: реализовать вариант для where_column
      or ?
        value.conditions[conditionType][1].data.splice(index, 1) :
        value.conditions[conditionType][0].data.splice(index, 1);
    }
    this.setState(state => ({ ...state, value }));
  }

  // conditionDeleteHandler(index) {
  //   this.setState(state => {
  //     const conditions = [...state.conditions];
  //     conditions.splice(index, 1);
  //     return { ...state, conditions };
  //   })
  // }

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
    // const {
    //   title, name, relations, columns, roles, permissions, aggregates,
    //   conditions: stateConditions, orderBy, group_by
    // } = cloneDeep(this.state);
    // // удаляю свойства id не нужные на сервере
    // aggregates.forEach(item => delete item.id);
    // stateConditions.forEach(item => delete item.id);
    // orderBy.forEach(item => delete item.id);
    // // формирую объект conditions на основе state
    // const where = stateConditions
    //   .filter(({ conditionType }) => conditionType === "where")
    //   .map(({ column, operator, value }) => ({ column, operator, value }));
    //
    // const or_where = stateConditions
    //   .filter(({ conditionType }) => conditionType === "or_where")
    //   .map(({ column, operator, value }) => ({ column, operator, value }));
    //
    // const where_between = stateConditions
    //   .filter(({ conditionType }) => conditionType === "where_between")
    //   .map(({ or, not, column, value1, value2 }) => ({ or, not, column, values: [value1, value2] }));
    //
    // const where_in = stateConditions
    //   .filter(({ conditionType }) => conditionType === "where_in")
    //   .map(({ or, not, column, values }) =>
    //     ({ or, not, column, values: values.split(",").map(item => item.trim()) })
    //   );
    //
    // const where_date = stateConditions
    //   .filter(({ conditionType }) => conditionType === "where_date")
    //   .map(({ type, column, operator, date }) => {
    //     const value = moment(date).format(getDateFormat(type));
    //     return { type, column, operator, value };
    //   });
    //
    // const where_column = stateConditions
    //   .filter(({ conditionType, or }) => conditionType === "where_column" && !or)
    //   .map(({ first_column, operator, second_column }) => ({ first_column, operator, second_column }));
    //
    // const where_column_or = stateConditions
    //   .filter(({ conditionType, or }) => conditionType === "where_column" && or)
    //   .map(({ first_column, operator, second_column }) => ({ first_column, operator, second_column }));
    //
    // const conditions = {
    //   where,
    //   or_where,
    //   where_between,
    //   where_in,
    //   where_date,
    //   where_column: [
    //     { or: false, data: where_column },
    //     { or: true, data: where_column_or }
    //   ]
    // };
    // const access = { roles, permissions };
    // const data = { title, name, columns, aggregates, conditions, relations, orderBy, access, group_by };
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
  /**
   * сохранить колонки
   */
  getConditions() {
    let conditions = [];
    let conditionPairs = _.toPairs(this.state.value.conditions);
    conditionPairs.forEach(pair => {
      // console.log(pair[0]);
      if (pair[0] !== 'where_column') {
        pair[1].forEach((_condition, idx) => {
          let conditionForComponent = { ..._condition };
          conditionForComponent.conditionType = pair[0];
          conditionForComponent.index = idx;
          conditions.push(conditionForComponent);
        });
      } else {
        pair[1].forEach(whereColumn => {
          let or = whereColumn.or;
          whereColumn.data.forEach((whereColumnCondition, idx) => {
            let conditionForComponent = { ...whereColumnCondition };
            conditionForComponent.conditionType = pair[0];
            conditionForComponent.index = idx;
            conditionForComponent.or = or;
            conditions.push(conditionForComponent);
          })
        });
      }
    });
    return conditions;
  }
  render() {
    const { title, name, relations, columns, aggregates, order_by, group_by, } = this.state.value;
    const { roles, permissions } = this.state.value.access;
    const { modelsOptions, selfFieldsOptions,
      permissionsOptions, relationsOptions, rolesOptions, selfFields } = this.state;
    const conditions = this.getConditions();
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
        <AggregateComponent item={item}
          columnsOptions={selfFieldsOptions}
          changeHandler={e => this.aggregateChangeHandler(e, index)}
          deleteHandler={() => this.aggregateDeleteHandler(index)} />
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
        {index !== 0 && <hr />}
        <ConditionComponent
          item={condition}
          columnsOptions={selfFieldsOptions}
          changeCondition={this.changeCondition}
        />
        <button className="btn btn_failure" type="button"
          onClick={() => this.deleteCondition(condition.conditionType, condition.index, condition.or)}
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

      {order_by.map((item, index) => <Fragment key={index}>
        {index !== 0 && <hr />}
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
