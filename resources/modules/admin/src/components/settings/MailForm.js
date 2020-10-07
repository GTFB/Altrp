import React, { Component } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";

class MailForm extends Component {
  state = {
    driver: 'smtp',
    host: '',
    port: '',
    username: '',
    password: '',
    encryption: '',
    from_address: '',
    from_name: ''
  };

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    const resource = new Resource({ route: `http://altrp.nz/write_mail_settings` });
    resource.post(this.state);
  };

  render() {
    const { driver, host, port, username, password, encryption, from_address, from_name } = this.state;
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="driver">Driver</label>
        <select id="driver" required
          name="driver"
          value={driver}
          onChange={this.changeHandler}
          className="form-control"
        >
          <option value="smtp">smtp</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="host">Host</label>
        <input type="text" id="host" required
          name="host"
          value={host}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="port">Port</label>
        <input type="text" id="port" required
          name="port"
          value={port}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="username">User Name</label>
        <input type="text" id="username" required
          name="username"
          value={username}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required
          name="password"
          value={password}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="encryption">Encryption</label>
        <select id="encryption" required
          name="encryption"
          value={encryption}
          onChange={this.changeHandler}
          className="form-control"
        >
          <option value="" />
          <option value="tls">tls</option>
          <option value="ssl">ssl</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="from_address">From Address</label>
        <input type="text" id="from_address" required
          name="from_address"
          value={from_address}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="from_name">From Name</label>
        <input type="text" id="from_name" required
          name="from_name"
          value={from_name}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Submit</button>
      </div>
    </form>;
  }
}

export default MailForm;