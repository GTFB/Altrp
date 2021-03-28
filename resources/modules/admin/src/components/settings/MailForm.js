import React, { Component } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";

class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail_driver: 'smtp',
      mail_host: '',
      mail_port: '',
      mail_username: '',
      mail_password: '',
      mail_encryption: '',
      mail_from_address: '',
      mail_from_name: '',
      mail_to_new_users: 'true'
    };
    this.toggle = this.toggle.bind(this);
  }  

  /**
   * Компонент загрузился
   */
  async componentDidMount(){
    
    let settings = await (new Resource({ route: `/admin/ajax/get_mail_settings` })).getAll();
    console.log(settings.data.mail_to_new_users === '');
    if(settings.data.mail_to_new_users === '') settings.data.mail_to_new_users = 'true';
    this.setState(state=>({...state,...settings.data}));
  }

  // Изменение положения переключателя
  toggle() {
    let checked = this.state.mail_to_new_users === 'true' ? 'false' : 'true';
    this.switchHandler(checked);
  }

  // Отправка на сервер положения переключателя и запись в store
  switchHandler = async checked => {
    console.log(checked);
    const resource = new Resource({ route: `/admin/ajax/write_send_mail` });
    let res = await resource.post({ data: checked });
    if(res.success){
      this.setState(s => ({...s, mail_to_new_users: checked}));
      alert(res.message || 'success');
    }
  };
  
  
  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  submitHandler = async e => {
    e.preventDefault();
    const resource = new Resource({ route: `/admin/ajax/write_mail_settings` });
    let res = await resource.post(this.state.mail_to_new_users);
    if(res.success){
      alert(res.message || 'success');
    }
  };

  render() {
    const {
      mail_driver,
      mail_host,
      mail_port,
      mail_username,
      mail_password,
      mail_encryption,
      mail_from_address,
      mail_from_name,
      mail_to_new_users
    } = this.state;
    let switcherClasses = `control-switcher control-switcher_${mail_to_new_users === 'true' ? 'on' : 'off'}`;

    return <div>
        <div className="admin_switcher">
          <div className="admin_switcher__label">
          Send A Message To New Users
          </div>
          <div className={switcherClasses} onClick={this.toggle}>
            <div className="control-switcher__on-text">ON</div>
            <div className="control-switcher__caret" />
            <div className="control-switcher__off-text">OFF</div>
          </div>
        </div>

      <form className="admin-form" onSubmit={this.submitHandler}>
        <div className="form-group">
          <label htmlFor="mail_driver">Driver</label>
          <select id="mail_driver" required
            name="mail_driver"
            value={mail_driver}
            onChange={this.changeHandler}
            className="form-control"
          >
            <option value=""/>
            <option value="smtp">smtp</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mail_host">Host</label>
          <input type="text" id="mail_host" required
            name="mail_host"
            value={mail_host}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mail_port">Port</label>
          <input type="text" id="mail_port" required
            name="mail_port"
            value={mail_port}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mail_username">User Name</label>
          <input type="text" id="mail_username" required
            name="mail_username"
            value={mail_username}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mail_password">Password</label>
          <input type="password"
                autoComplete="mail-settings-password"
                id="mail_password" required
            name="mail_password"
            value={mail_password}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mail_from_address">Mail from Address</label>
          <input type="email" id="mail_from_address"
            name="mail_from_address"
            value={mail_from_address}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mail_from_name">Mail from Name</label>
          <input type="text" id="mail_from_name"
            name="mail_from_name"
            value={mail_from_name}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mail_encryption">Encryption</label>
          <select id="mail_encryption" required
            name="mail_encryption"
            value={mail_encryption}
            onChange={this.changeHandler}
            className="form-control"
          >
            <option value="" />
            <option value="tls">tls</option>
            <option value="ssl">ssl</option>
          </select>
        </div>



        <div className="btn__wrapper">
          <button className="btn btn_success" type="submit">Save</button>
        </div>
      </form>
    </div>;
  }
}

export default MailForm;