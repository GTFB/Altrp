import Resource from "../../../../../editor/src/js/classes/Resource";
import store from "../../../js/store/store";
import AutoUpdateInput from "../../AutoUpdateInput";
import React from "react";

class Telegram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      botWork: false,
      customizerOptions: []
    }

    this.toggle = this.toggle.bind(this);
    this.customizerOptionsResource = new Resource({ route: "/admin/ajax/customizers_options" });

  }

  async componentDidMount() {
    const customizerOptions = await this.customizerOptionsResource.getAll();
    this.setState(s =>({...s, customizerOptions}));
  }

  // Изменение положения переключателя
  // ComponentDidM() {
  //   let websocketsPort = await new Resource({ route: "/admin/ajax/settings" }).get("websockets_port");
  // }

  // Изменение положения переключателя
  toggle() {
    let checked = store.getState().websocketStore?.enabled ? 0 : 1 ;
    this.submitHandler(checked);
  }

  // Отправка на сервер положения переключателя и запись в store
  submitHandler = async checked => {
    const resource = new Resource({ route: `/admin/ajax/websockets` });
    let res = await resource.getQueried({enabled:checked});
    if(res.success){
      alert(res.message || 'success');
    }
    store.dispatch(setWebsocketsEnabled(checked));
  };

  async onReset() {
    const resource = new Resource({ route: `/admin/ajax/websockets` });
    let res = await resource.getQueried({reset:true});
    if(res.success){
      alert(res.message || 'success');
      store.dispatch(setWebsocketsEnabled(false));
      window.location.reload();
    }
  };

  render() {
    return <div className="admin_settings_telegram">
        <div className="admin_input__label" width="10%">
              <label htmlFor="telegram_bot_token">
                Telegram bot key:
              </label>
        </div>
        <div className="admin_input">
          <AutoUpdateInput type="text"
            route="/admin/ajax/settings"
            resourceid="telegram_bot_token"
            id="telegram_bot_token"
            className="admin_input_key form_styles_border" />
        </div>
        <div>
          <div className="admin_input__label">
            Telegram customizer
          </div>
          <div className="admin_input">
            <AutoUpdateInput
              className="admin_input_key form_styles_border"
              route="/admin/ajax/settings"
              type="select"
              resourceid="telegram_bot_webhook"
              id="telegram_bot_customizer"
            >
              {
                this.state.customizerOptions.map(elem => (
                  <option value={elem.value} key={elem.value}>{elem.label}</option>
                ))
              }
            </AutoUpdateInput>
          </div>
        </div>
        <div>
          <div className="admin_input__label">
            Telegram keyboard
          </div>
          <div className="admin_input">
            <AutoUpdateInput
              className="admin_input_key form_styles_border"
              route="/admin/ajax/settings"
              type="textarea"
              resourceid="telegram_bot_keyboard"
              id="telegram_bot_keyboard"
              encrypt
            />
          </div>
        </div>
    </div>
  }
}

export default Telegram

