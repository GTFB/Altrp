import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import {setAdminDisable, setAdminEnable} from "../../js/store/admin-state/actions";
import store from '../../js/store/store';
import {pageReload} from "../../js/helpers";

/**
 * Компонент вкладки обновления админки
 * @class
 */
class Updates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needUpdate: false,
    };
    this.updateAltrp = this.updateAltrp.bind(this);
  }
  async componentDidMount(){
    store.dispatch(setAdminDisable());
    let res = await (new Resource({route:'/admin/ajax/check_update'})).post( {});
    if(res.result){
      this.setNeedUpdate();
    }
    store.dispatch(setAdminEnable());
  }

  /**
   * Вызывается, если нужно обновление
   */
  setNeedUpdate() {
    this.setState(state => {
      return {...state, needUpdate: true};
    })
  }

  /**
   * Вызывается, если не нужно обновление
   */
  setDontNeedUpdate() {
    this.setState(state => {
      return {...state, needUpdate: false};
    })
  }

  /**
   * Отправляет запрос на обноление приложения
   */
  async updateAltrp(){
    store.dispatch(setAdminDisable());
    let res = await (new Resource({route:'/admin/ajax/update_altrp'})).post( {});
    res.result ? pageReload() : this.setNeedUpdate();
    store.dispatch(setAdminEnable());
  }

  render() {
    let data = {
      updateMessage: 'You have the latest version of Altrp.',
    };
    if (this.state.needUpdate) {
      data.updateMessage = 'A fresh version of Altrp is available for updating.';
    }
    return <div className="admin-updates p-4">
      <div className="admin-caption mt-1">
        {data.updateMessage}
      </div>
      {
        this.state.needUpdate ?
          <button className="btn_success btn" onClick={this.updateAltrp}>Update</button>
          :  <button className="btn">Re-install Now</button>}
    </div>

  }
}

export default Updates;