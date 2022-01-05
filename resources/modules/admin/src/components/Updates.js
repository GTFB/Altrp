import Scrollbars from "react-custom-scrollbars";
import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import {setAdminDisable, setAdminEnable} from "../js/store/admin-state/actions";
import store from '../js/store/store';
import {connect} from "react-redux";
import {pageReload} from "../js/helpers";
import {markdown} from "markdown"

/**
 * Компонент вкладки обновления админки
 * @class
 */
class Updates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needUpdate: false,
      changelog: '',
    };
    this.updateAltrp = this.updateAltrp.bind(this);
  }

  async componentDidMount() {
    store.dispatch(setAdminDisable());
    let res = await (new Resource({route: '/admin/ajax/check_update'})).post({});
    if (res.result) {
      this.setNeedUpdate();
    }

    let changelog = await (new Resource({route: '/admin/ajax/changelog'})).getAll() || ''
    changelog = changelog?.data || '';
    changelog = markdown.toHTML(changelog)
    if (changelog) {
      this.setState(state => ({...state, changelog}))
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

  async installTestAltrp() {

    store.dispatch(setAdminDisable());
    try {
      let res = await (new Resource({route: '/admin/ajax/install_test_altrp'})).post({});
      setTimeout(() => {
          res.result ? pageReload() : this.setNeedUpdate();
        }
        , 1300);
    } catch (error) {
      store.dispatch(setAdminEnable());
    }
  }

  /**
   * Отправляет запрос на обноление приложения
   */
  async updateAltrp() {
    store.dispatch(setAdminDisable());
    try {
      let res = await (new Resource({route: '/admin/ajax/update_altrp'})).post({});
      setTimeout(() => {
          res.result ? pageReload() : this.setNeedUpdate();
        }
        , 1300);
    } catch (error) {
      store.dispatch(setAdminEnable());
    }
  }

  render() {
    let data = {
      updateMessage: 'You have the latest version of Altrp.',
    };
    if (this.state.needUpdate) {
      data.updateMessage = 'A fresh version of Altrp is available for updating.';
    }
    const {testEnable} = this.props.adminState;
    const {changelog} = this.state;
    return <div className="admin-updates p-4">

        <div className="admin-caption mt-1">
          {data.updateMessage}
        </div>
        {this.state.needUpdate ?
          <button className="btn_success btn" onClick={this.updateAltrp}>Update</button>
          : <button className="btn" onClick={this.updateAltrp}>Re-install Now</button>}

      {testEnable && <React.Fragment>
        <div className="admin-caption mt-1">
          Install Test Version of Altrp
        </div>
        <button className="btn_success btn" onClick={this.installTestAltrp}>Install Test</button>
      </React.Fragment>}
      {changelog && <React.Fragment>
        <h4 className="mt-4 mb-2">Changelog:</h4>
        <Scrollbars
          style={{ height:500}}
        >
          <div className="admin-changelog" dangerouslySetInnerHTML={{__html: changelog}}>


          </div>
        </Scrollbars>
      </React.Fragment>}
    </div>

  }
}

function mapStateToProps(state) {
  return {adminState: state.adminState}
}

export default connect(mapStateToProps)(Updates);
