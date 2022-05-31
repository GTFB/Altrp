import Resource from "../../../../../editor/src/js/classes/Resource";
import store from "../../../js/store/store";
import AutoUpdateInput from "../../AutoUpdateInput";
import React from "react";

class Telegram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      botWork: false
    }

    this.toggle = this.toggle.bind(this);
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
            Telegram webhook
          </div>
          <div className="admin_input">
            <AutoUpdateInput
              className="admin_input_key form_styles_border"
              route="/admin/ajax/settings"
              type="text"
              resourceid="telegram_bot_webhook"
              id="telegram_bot_customizer"
            />
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
