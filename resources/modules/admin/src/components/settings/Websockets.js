import Resource from "../../../../editor/src/js/classes/Resource";
import { setWebsocketsEnabled } from "../../js/store/websockets-storage/actions";
import store from "../../js/store/store";

class Websockets extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  // Изменение положения переключателя в стейте
  toggle() {
    let checked = store.getState().websocketStore?.serverEnabled ? 0 : 1 ;
    this.submitHandler(checked);
  }

  // Отправка на сервер положения переключателя
  submitHandler = async checked => {
    const resource = new Resource({ route: `/admin/ajax/websockets` });
    let res = await resource.getQueried({enabled:checked});
    if(res.success){
      alert(res.message || 'success');
    }
    store.dispatch(setWebsocketsEnabled(checked));
  };

  render() {
    let value = store.getState().websocketStore?.serverEnabled ?? false;
    console.log(store.getState().websocketStore);
    console.log(window.Echo?.connector?.pusher);
    console.log(value);
    let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;
    return <div className="admin_switcher admin_switcher">
      <div className="admin__label">
      Websocket Server
      </div>
      <div className={switcherClasses} onClick={this.toggle}>
        <div className="control-switcher__on-text">ON</div>
        <div className="control-switcher__caret" />
        <div className="control-switcher__off-text">OFF</div>
      </div>
    </div>
  }
}

export default Websockets