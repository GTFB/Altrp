import React, { Component } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import {InputGroup, NumericInput, MenuItem, Button, Alignment} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";


const DriverOptions = ['', 'smtp']
const EncryptionOptions = ['', 'tls', 'ssl']


class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail_driver: '',
      mail_host: '',
      mail_port: '',
      mail_username: '',
      mail_password: '',
      mail_encryption: '',
      mail_from_address: '',
      mail_from_name: '',
    };
  }

  /**
   * Компонент загрузился
   */
  async componentDidMount(){

    let settings = await (new Resource({ route: `/admin/ajax/get_mail_settings` })).getAll();
    this.setState(state=>({...state,...settings.data}));
  }

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  changeValueSelect = (value, field) => {
    this.setState(state => {
      state = { ...state };
      state[field] = value;

      return state
    })
  }



  submitHandler = async e => {
    e.preventDefault();
    const resource = new Resource({ route: `/admin/ajax/write_mail_settings` });
    let res = await resource.post(this.state);
    if(res.success){
      alert(res.message || 'success');
    }
  };

  ItemPredicate = (query, value) => {

    if(!query) {
      return true
    }
    const index = _.findIndex(_.split(value, ""), char => {
      let similar = false;
      _.split(query, "").forEach(queryChar => {
        if(queryChar === char) {
          similar = true
        }
      });
      return similar
    });

    if(index !== -1) {
      return true
    } else {
      return false
    }
  }

  render() {
    const {
      mail_host,
      mail_port,
      mail_username,
      mail_password,
      mail_from_address,
      mail_from_name,
    } = this.state;

    return <div className="mail-container__settings">

      <form className="admin-form" onSubmit={this.submitHandler}>
        <div className="form-group__inline-wrapper">
          <div className="form-group flex-grow__selectBlueprint form-group_width47">
            <label htmlFor="mail_driver">Driver</label>
            {/*<select id="mail_driver" required*/}
            {/*        name="mail_driver"*/}
            {/*        value={mail_driver}*/}
            {/*        onChange={this.changeHandler}*/}
            {/*        className="form-control"*/}
            {/*>*/}
            {/*  <option value=""/>*/}
            {/*  <option value="smtp">smtp</option>*/}
            {/*</select>*/}

            <Select items={DriverOptions}
                    id="mail_driver"
                    required
                    matchTargetWidth
                    itemPredicate={this.ItemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    itemRenderer={(item, {handleClick, modifiers, query}) => {
                      return <MenuItem
                        text={item || 'None'}
                        key={item}
                        active={item === this.state.mail_driver }
                        onClick={handleClick}
                      />
                    }}
                    onItemSelect={current => { this.changeValueSelect(current, 'mail_driver') }}
                    fill={true}
            >
              <Button fill
                      large
                      alignText={Alignment.LEFT}
                      text={this.state.mail_driver || 'none'}
                      rightIcon="caret-down"
              />
            </Select>
          </div>

          <div className="form-group flex-grow__selectBlueprint form-group_width47">
            <label htmlFor="mail_encryption">Encryption</label>
            {/*<select id="mail_encryption" required*/}
            {/*        name="mail_encryption"*/}
            {/*        value={mail_encryption}*/}
            {/*        onChange={this.changeHandler}*/}
            {/*        className="form-control"*/}
            {/*>*/}
            {/*  <option value="" />*/}
            {/*  <option value="tls">tls</option>*/}
            {/*  <option value="ssl">ssl</option>*/}
            {/*</select>*/}


            <Select items={EncryptionOptions}
                    id="mail_encryption"
                    required
                    matchTargetWidth
                    itemPredicate={this.ItemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    itemRenderer={(item, {handleClick, modifiers, query}) => {
                      return <MenuItem
                        text={item || 'None'}
                        key={item}
                        active={item === this.state.mail_encryption }
                        onClick={handleClick}
                      />
                    }}
                    onItemSelect={current => { this.changeValueSelect(current, 'mail_encryption') }}
                    fill={true}
            >
              <Button fill
                      large
                      alignText={Alignment.LEFT}
                      text={this.state.mail_encryption || 'none'}
                      rightIcon="caret-down"
              />
            </Select>
          </div>
        </div>

        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label htmlFor="mail_host">Host</label>
            {/*<input type="text" id="mail_host" required*/}
            {/*       name="mail_host"*/}
            {/*       value={mail_host}*/}
            {/*       onChange={this.changeHandler}*/}
            {/*       className="form-control"*/}
            {/*/>*/}
            <InputGroup type="text"
                        name="mail_host"
                        id="mail_host"
                        value={mail_host}
                        onChange={this.changeHandler}
                        className="form-control-blueprint"
                        required
            />
          </div>

          <div className="form-group form-group_width47">
            <label htmlFor="mail_port">Port</label>
            {/*<input type="text" id="mail_port" required*/}
            {/*       name="mail_port"*/}
            {/*       value={mail_port}*/}
            {/*       onChange={this.changeHandler}*/}
            {/*       className="form-control"*/}
            {/*/>*/}
            <InputGroup type="text"
                        name="mail_port"
                        id="mail_port"
                        value={mail_port}
                        onChange={this.changeHandler}
                        className="form-control-blueprint"
                        required
            />
          </div>
        </div>

        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label htmlFor="mail_username">User Name</label>
            {/*<input type="email" id="mail_from_address"*/}
            {/*       name="mail_from_address"*/}
            {/*       value={mail_from_address}*/}
            {/*       onChange={this.changeHandler}*/}
            {/*       className="form-control"*/}
            {/*/>*/}
            <InputGroup type="text"
                        name="mail_username"
                        id="mail_username"
                        value={mail_username}
                        onChange={this.changeHandler}
                        className="form-control-blueprint"
                        required
            />
          </div>
          <div className="form-group form-group_width47">
            <label htmlFor="mail_password">Password</label>
            {/*<input type="password"*/}
            {/*       autoComplete="mail-settings-password"*/}
            {/*       id="mail_password" required*/}
            {/*       name="mail_password"*/}
            {/*       value={mail_password}*/}
            {/*       onChange={this.changeHandler}*/}
            {/*       className="form-control"*/}
            {/*/>*/}
            <InputGroup type="password"
                        name="mail_password"
                        id="mail_password"
                        value={mail_password}
                        onChange={this.changeHandler}
                        className="form-control-blueprint"
                        autoComplete="mail-settings-password"
                        required
            />
          </div>
        </div>

        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label htmlFor="mail_from_address">Mail from Address</label>
            {/*<input type="text" id="mail_username" required*/}
            {/*       name="mail_username"*/}
            {/*       value={mail_username}*/}
            {/*       onChange={this.changeHandler}*/}
            {/*       className="form-control"*/}
            {/*/>*/}
            <InputGroup type="email"
                        name="mail_from_address"
                        id="mail_from_address"
                        value={mail_from_address}
                        onChange={this.changeHandler}
                        className="form-control-blueprint"
                        required
            />
          </div>

        </div>


        <div className="btn__wrapper">
          <button className="btn btn_success" type="submit">Save</button>
        </div>
      </form>
    </div>;
  }
}

export default MailForm;
