import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import isSSR from "../../../../../front-app/src/js/functions/isSSR";

class ActionTriggerWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.element = props.element;
    this.elementId = props.element.getId();
    props.element.component = this;
    this.subscribeActions()
  }

  /**
   * Подписать действия
   */

  subscribeActions() {
    if(isEditor() || isSSR()){
      return
    }
    this.type = this.element.getResponsiveLockedSetting('type')
    switch (this.type) {
      case 'interval': this.subscribeIntervalTriggers()
        break;
      case 'timeout': this.subscribeTimeoutTriggers()
        break;
      case 'event': this.subscribeEventTriggers()
        break;
    }
  }
  subscribeEventTriggers=()=>{
    let event =  this.element.getResponsiveLockedSetting('event') || ''
    event = event.trim()
    if(! event){
      return
    }
    document.addEventListener(event, this.onEvent)
  }

  onEvent = (e)=>{
    let prevent =  this.element.getResponsiveLockedSetting('prevent')
    if(prevent){
      e.preventDefault()
    }
    let stop_event =  this.element.getResponsiveLockedSetting('stop_event')
    if(stop_event){
      e.stopPropagation()
    }
    this.doActions(e.detail.data)
  }


  /**
   * Подписать таймаут действия
   */
  subscribeTimeoutTriggers() {
    setTimeout(this.doActions, this.element.getResponsiveLockedSetting('timeout') || 1000)
  }
  /**
   * Подписать интервальные действия
   */
  subscribeIntervalTriggers() {
    const timeout = Number(this.element.getResponsiveLockedSetting('timeout'))
    if(timeout){
      setTimeout(()=>{
        this.doActions()
        this.intervalId = setInterval(this.doActions, this.element.getResponsiveLockedSetting('interval') || 1000)
      }, timeout)
    } else {
      this.intervalId = setInterval(this.doActions, this.element.getResponsiveLockedSetting('interval') || 1000)
    }
  }

  componentWillUnmount() {
    if(this.intervalId){
      clearInterval(this.intervalId)
      return
    }
    let event =  this.element.getResponsiveLockedSetting('event') || ''

    if(this.type === 'event'){
      console.log('removeEventListener', event);
      document.removeEventListener(event, this.onEvent)
    }
  }

  doActions = async (data)=>{
    if(! this.element.getResponsiveLockedSetting("trigger_actions", null, []).length){
      return
    }
    const actionsManager = (
      await import(/* webpackChunkName: 'ActionsManager' */
        "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
        )
    ).default;
    this.props.element.setCardModel(new AltrpModel(data || {}))

    await actionsManager.callAllWidgetActions(
      this.props.element.getIdForAction(),
      'trigger_' + this.element.getResponsiveLockedSetting('type'),
      this.props.element.getSettings("trigger_actions", []),
      this.props.element
    );
  }

  render() {
    if (isEditor()) {
      return <svg height="35" xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 32 32"><title>favorite</title>
        <path
          d="M16 32C7.168 32 0 24.832 0 16S7.168 0 16 0s16 7.168 16 16-7.168 16-16 16zm0-30.656C7.904 1.344 1.344 7.904 1.344 16S7.904 30.656 16 30.656 30.656 24.096 30.656 16 24.096 1.344 16 1.344zm6.016 24c-.128 0-.256-.064-.384-.128L16 21.472l-5.632 3.744c-.224.16-.544.16-.768 0s-.32-.448-.256-.736l1.888-6.88L5.6 13.184c-.224-.16-.32-.48-.224-.736s.352-.448.64-.448h6.88l2.496-6.24c.192-.512 1.024-.512 1.216 0L19.104 12h6.912c.256 0 .512.192.608.448s0 .576-.224.736L20.768 17.6l1.888 6.88c.064.288-.032.576-.256.736-.128.064-.256.128-.384.128zM16 20c.128 0 .256.032.384.096l4.512 3.04-1.536-5.632a.717.717 0 0 1 .224-.704l4.48-3.456h-5.408c-.256 0-.512-.192-.608-.416L16 7.808l-2.048 5.088c-.096.256-.352.448-.608.448H7.936l4.48 3.456c.192.16.288.448.224.704l-1.536 5.632 4.512-3.04A.852.852 0 0 1 16 20z"/>
      </svg>
    }
    return '';
  }
}

export default ActionTriggerWidget;
