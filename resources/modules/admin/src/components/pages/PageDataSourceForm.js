import React, { Component } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";

class PageDataSourceForm extends Component {
  state = this.props.dataSource || {
    data_source_id: '',
    alias: '',
    priority: 0,
    parameters: '',
    dataSourceOptions: []
  }

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  async componentDidMount() {
    const resource = new Resource({ route: 'http://altrp.nz/admin/ajax/data_sources' });
    const { data_sources } = await resource.getAll();
    this.setState({ dataSourceOptions: data_sources })
  }

  submitHandler = e => {
    e.preventDefault();
    // post: /admin/ajax/models (value)
    console.log(this.state);
  }

  render() {
    const { data_source_id, alias, priority, parameters, dataSourceOptions } = this.state;
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="data_source_id">Data Source</label>
        <select id="data_source_id"
          name="data_source_id"
          value={data_source_id}
          onChange={this.changeHandler}
          className="form-control"
        >
          <option value="" />
          {dataSourceOptions.map(({ id, name }) => <option value={id} key={id}>{name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="alias">Alias</label>
        <input type="text" id="alias" required
          name="alias"
          value={alias}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <input type="number" id="priority" required
          name="priority"
          value={priority}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Parameters
            <textarea required name="parameters"
            value={parameters}
            onChange={this.changeHandler}
            className="form-control"
          />
        </label>
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
      </div>
    </form>;
  }
}

export default PageDataSourceForm;