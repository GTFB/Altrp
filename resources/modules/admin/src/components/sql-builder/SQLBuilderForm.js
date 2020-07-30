import React, { Component, Fragment } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import AggregateComponent from "./AggregateComponent";
import ConditionComponent from "./ConditionComponent";

const mockedModels = [
  { value: 1, label: "Model title 1" },
  { value: 2, label: "Model title 2" },
  { value: 3, label: "Model title 3" },
];

const mockedRelations = [
  { value: 1, label: "Relation title 1" },
  { value: 2, label: "Relation title 2" },
  { value: 3, label: "Relation title 3" },
];

const mockedColumns = [
  { value: 1, label: "Coolumn title 1" },
  { value: 2, label: "Coolumn title 2" },
  { value: 3, label: "Coolumn title 3" },
];

const permissionsOptions = [];

class SQLBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      name: '',
      modelId: '',
      relations: [],
      columns: [],
      roles: [],
      permissions: [],
      aggregates: [{ type: '', column: '', alias: '', id: 0 }], //TODO: delete id before submit
      conditions: {
        where: [],
        or_where: [],
        where_between: [],
        where_in: [],
        where_date: [],
        where_column: []
      },
      // modelsOptions: [],   TODO: заменить замоканые данные
      // relationsOptions: [],
      // columnsOptions: [],
      modelsOptions: mockedModels,
      relationsOptions: mockedRelations,
      columnsOptions: mockedColumns,
      rolesOptions: [],
      // permissionsOptions: permissionsOptions,

    };
    this.counter = 0;
    this.rolesOptions = new Resource({ route: '/admin/ajax/role_options' });
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.multipleSelectChangeHandler = this.multipleSelectChangeHandler.bind(this);
    this.aggregateChangeHandler = this.aggregateChangeHandler.bind(this);
    this.aggregatesAddHandler = this.aggregatesAddHandler.bind(this);
    this.aggregatesdeleteHandler = this.aggregatesdeleteHandler.bind(this);
    this.conditionChangeHandler = this.conditionChangeHandler.bind(this);
    this.typeChangeHandler = this.typeChangeHandler.bind(this);
    this.conditionsAddHandler = this.conditionsAddHandler.bind(this);
    this.conditionsDeleteHandler = this.conditionsDeleteHandler.bind(this);
  }

  async componentDidMount() {
    const rolesOptions = await this.rolesOptions.getAll();
    this.setState(state => ({ ...state, rolesOptions }))
  }

  changeHandler({ target: { value, name } }) {
    this.setState(_state => ({ [name]: value }));
  }

  aggregateChangeHandler({ target: { value, name } }, index) {
    this.setState(state => {
      const aggregates = [...state.aggregates];
      aggregates[index] = { ...state.aggregates[index], [name]: value };
      return { ...state, aggregates };
    });
  }

  aggregatesAddHandler() {
    this.counter++;

    this.setState(state => {
      const aggregates = [...state.aggregates];
      aggregates.push({ type: '', column: '', alias: '', id: this.counter });
      return { ...state, aggregates };
    });
  }

  aggregatesdeleteHandler(index) {
    this.setState(state => {
      const aggregates = [...state.aggregates];
      aggregates.splice(index, 1);
      return { ...state, aggregates };
    });
  }

  conditionChangeHandler({ target: { value, name } }, type, index) {
    this.setState(state => {
      const array = [...state.conditions[type]];
      const conditionItem = { ...state.conditions[type][index] };
      array[index] = { ...conditionItem, [name]: value };
      return {
        ...state, conditions: {
          ...state.conditions, [type]: [...array]
        }
      }
    });
  }

  typeChangeHandler(e, type, index) {
    e.persist();
    this.counter++;

    this.setState(state => {
      const newType = e.target.value;
      const fromArray = [...state.conditions[type]];
      const toArray = [...state.conditions[newType]];

      fromArray.splice(index, 1);
      toArray.push({ id: this.counter });

      return {
        ...state, conditions: {
          ...state.conditions,
          [type]: fromArray,
          [newType]: toArray
        }
      }
    })
  };


  conditionsAddHandler() {
    this.counter++;

    this.setState(state => {
      const conditions = { ...state.conditions };
      conditions.where.push({ column: '', operator: '', value: '', id: this.counter });
      return { ...state, conditions: { ...state.conditions, ...conditions } };
    });
  }

  conditionsDeleteHandler() {

  }

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

  }

  render() {
    const { title, name, modelId, relations, columns, roles, permissions, aggregates, conditions,
      modelsOptions, relationsOptions, columnsOptions, rolesOptions } = this.state;

    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required name="title"
          value={title}
          onChange={this.changeHandler}
          className="form-control" />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required name="name"
          value={name}
          onChange={this.changeHandler}
          className="form-control" />
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="modelId">Model</label>
          <select id="modelId" required name="modelId"
            value={modelId}
            onChange={this.changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {modelsOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="relations">With</label>
          <select id="relations" required name="relations" multiple
            value={relations}
            onChange={this.multipleSelectChangeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {relationsOptions.map(({ value, label }) =>
              <option key={value} value={label}>
                {label}
              </option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="columns">Fields</label>
        <select id="columns" required name="columns" multiple
          value={columns}
          onChange={this.multipleSelectChangeHandler}
          className="form-control"
        >
          <option disabled value="" />
          {columnsOptions.map(({ value, label }) =>
            <option key={value} value={label}>
              {label}
            </option>)}
        </select>
      </div>

      <p className="centred">Access</p>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="roles">Roles</label>
          <select id="roles" required name="roles" multiple
            value={roles}
            onChange={this.changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {rolesOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="permissions">Permissions</label>
          <select id="permissions" required name="permissions" multiple
            value={permissions}
            onChange={this.multipleSelectChangeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {permissionsOptions.map(({ value, label }) =>
              <option key={value} value={label}>
                {label}
              </option>)}
          </select>
        </div>
      </div>

      <p className="centred">Aggregates</p>
      {aggregates.map((item, index) => <Fragment key={item.id}>
        <AggregateComponent item={item}
          columnsOptions={columnsOptions}
          changeHandler={e => this.aggregateChangeHandler(e, index)}
          deleteHandler={() => this.aggregatesdeleteHandler(index)} />
        <button className="btn btn_failure" type="button"
          onClick={() => this.aggregatesdeleteHandler(index)}
        >
          Delete
        </button>
      </Fragment>)}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.aggregatesAddHandler}>
          + New
        </button>
      </div>

      <p className="centred">Conditions</p>
      {/* {JSON.stringify(Object.entries(conditions))} */}

      {Object.entries(conditions).map(item => item[1].map((condition, index) => <Fragment key={condition.id}>
        <ConditionComponent conditionType={item[0]} item={condition}
          columnsOptions={columnsOptions}
          conditionTypeOptions={Object.keys(conditions)}
          columnsOptions={columnsOptions}
          changeHandler={e => this.conditionChangeHandler(e, item[0], index)}
          deleteHandler={() => this.conditionsDeleteHandler(index)}
          typeChangeHandler={(e) => this.typeChangeHandler(e, item[0], index)}
        />
        <button className="btn btn_failure" type="button"
          onClick={() => this.conditionsDeleteHandler(index)}
        >
          Delete
        </button>
      </Fragment>))}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.conditionsAddHandler}>
          + New
        </button>
      </div>
    </form>
  }

}

export default SQLBuilderForm;

const a = {
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
}