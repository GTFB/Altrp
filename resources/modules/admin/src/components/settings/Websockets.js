import Resource from "../../../../editor/src/js/classes/Resource";
import store from "../../js/store/store";
import AutoUpdateInput from "../AutoUpdateInput";
import {setWebsocketsEnabled} from "../../js/store/websockets-storage/actions";

class Websockets extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

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
    let value = store.getState().websocketStore?.enabled ?? false;
    console.log(store.getState().websocketStore);
    console.log(window.Echo?.connector?.pusher);
    console.log(value);
    let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;
    return <div className="admin_settings_websockets">
      <div className="admin_settings_websockets_box">
        <div className="admin_switcher">
          <div className="admin_switcher__label">
          Websocket Server
          </div>
          <div className={switcherClasses} onClick={this.toggle}>
            <div className="control-switcher__on-text">ON</div>
            <div className="control-switcher__caret" />
            <div className="control-switcher__off-text">OFF</div>
          </div>
        </div>
        <div className="admin_input__label" width="10%">
              <label htmlFor="websockets-port">
                Port:
              </label>
        </div>
        <div className="admin_input">
        <AutoUpdateInput type="number"
            route="/admin/ajax/settings"
            resourceid="websockets_port"
            id="websockets-port"
            className="admin_input_port" />
        </div>
        <div className="admin_input__label" width="10%">
              <label htmlFor="websockets-key">
                Key:
              </label>
        </div>
        <div className="admin_input">
          <AutoUpdateInput type="number"
            route="/admin/ajax/settings"
            resourceid="pusher_app_key"
            id="websockets-key"
            className="admin_input_key" />
        </div>

        <div>
          <button className="btn btn_save" onClick={() => this.onReset()}>
            Reset
          </button>          
        </div>
      </div>
    </div>
  }
}

export default Websockets