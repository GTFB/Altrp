import appStore from "./js/store/store";
import AppContent from "./js/components/AppContent";
import { Provider } from "react-redux";
import {changeCurrentUser, setUserNotice, setUsersOnline} from "./js/store/current-user/actions";
import Echo from "laravel-echo";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, } from 'react-dnd'
import Resource from "../../editor/src/js/classes/Resource";
import getRoutes from "../src/js/functions/getRoutes";
import GlobalStyles from "./js/components/GlobalStyles";

class FrontApp extends Component {
  constructor(props) {
    super(props);
    window.frontApp = this;
    this.getRoutes();
    // this.onWidgetMount();
    console.log('FRONT APP: ',performance.now());
  }
  getRoutes() {
    return getRoutes().then(res => {
      this.routes = res.default;
    });
  }

  onWidgetMount(){
    console.log(performance.now());
    // if(this.timeoutId){
    //   clearTimeout(this.timeoutId);
    // }
    // this.timeoutId = setTimeout(() =>{
    // }, 100);
  }

  /**
   * Обновляем текущего пользователя
   */
  async componentDidMount() {
    new Resource({ route: '/ajax/' }).get('current-user').then(res=>{
      if(! _.isEqual(appStore.getState().currentUser.getData(), res.data)){
        appStore.dispatch(changeCurrentUser(res.data));
      }
    })
    let pusherKey = await new Resource({ route: "/admin/ajax/settings" }).get("pusher_app_key");
    let websocketsPort = await new Resource({ route: "/admin/ajax/settings" }).get("websockets_port");
    let websocketsHost = await new Resource({ route: "/admin/ajax/settings" }).get("pusher_host");

    pusherKey = pusherKey?.pusher_app_key;
    websocketsPort = websocketsPort?.websockets_port;
    websocketsHost = websocketsHost?.pusher_host;

    // Проверка наличия ключа и порта
    if(pusherKey && websocketsPort){
      try {
        window.Pusher = require("pusher-js");
        window.Echo = new Echo({
          broadcaster: "pusher",
          key: pusherKey,
          wsHost: websocketsHost,
          wsPort: websocketsPort,
          forceTLS: false,
          disableStats: true,
        });

      } catch (error) {
        console.error(error);
      }
      const {currentUser} = appStore.getState();
      // Подключение слушателя канала
      window.Echo.private("App.User." + currentUser.id)
      .notification((notification) => {
        // Запись пришедших по каналу уведомлений в appStore
        appStore.dispatch(setUserNotice(notification));
        console.log(appStore.getState().currentUser, 'STORE NOTICE');
      });

      // Подключение слушателя для получения users online
      let presenceChannel = window.Echo.join("online");
      let activeUsers = [];
      presenceChannel.here((users) => {
        activeUsers = users;
        appStore.dispatch(setUsersOnline(activeUsers));
      })
      .joining((user) => {
        activeUsers.push(user);
        appStore.dispatch(setUsersOnline(activeUsers));
      })
      .leaving((user) => {
        activeUsers.splice(activeUsers.indexOf(user), 1);
        appStore.dispatch(setUsersOnline(activeUsers));
      });

    } else {
     console.log("Вебсокеты выключены");
    }
  }

  render() {
    return (
      <Provider store={appStore}>
        <DndProvider backend={HTML5Backend}>
          <AppContent />
        </DndProvider>
        <GlobalStyles/>
      </Provider>
    );
  }
}

export default window.__hot(module)(FrontApp);
