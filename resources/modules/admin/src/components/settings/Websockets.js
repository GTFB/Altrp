import Resource from "../../../../editor/src/js/classes/Resource";

class Websockets extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
        checked: false,
    }
  }

  toggle() {
    let checked = this.state.checked === true ? 0 : 1 ;
    this.setState({checked: !this.state.checked});  
    this.submitHandler(checked);

  }

  submitHandler = async checked => {
    const resource = new Resource({ route: `/admin/ajax/websockets` });
    let res = await resource.getQueried({enabled:checked});
    if(res.success){
      alert(res.message || 'success');
    }
  };

  componentDidMount() {
    let item = this;
      window.Echo.connector.pusher.connection.bind('connected', function() {
        item.state.checked = true;
    });
  }
  /**
   * Отрисовываем вкладку вебсокетов админки
   */
  render() {
    let value = this.state.checked;
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