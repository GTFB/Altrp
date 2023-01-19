import Scrollbars from "react-custom-scrollbars";
import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import {setAdminDisable, setAdminEnable} from "../js/store/admin-state/actions";
import store from '../js/store/store';
import {connect} from "react-redux";
import {pageReload} from "../js/helpers";
import {markdown} from "markdown"
import getAltrpLang from "../js/helpers/get-altrp-lang";
import axios from "axios";
import delay from "../../../front-app/src/js/functions/delay";
import progressBar from "../js/functions/progressBar";

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
      return {...state, needUpdate: getAltrpLang() !== 'javascript'};
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

      try {
        await axios.post('/admin/ajax/restart-altrp',)

      } catch (e) {
        let serverRestarted = false
        let i = 0
        do {
          ++i
          try {
            await delay(100)
            await axios.get('/ajax/_token')
            serverRestarted = true
          } catch (e) {
          }
        } while (!serverRestarted && i < 100)
        await axios.get('/admin/ajax/start-socket',)
      }
      setTimeout(() => {
          res.result ? pageReload() : this.setNeedUpdate();
        }
        , 100);
    } catch (error) {
      store.dispatch(setAdminEnable());
    }
  }

  /**
   * Отправляет запрос на обноление приложения
   */
  async updateAltrp() {
    // try {
    //   progressBar(.1)todo: check how it works
    //   await axios.post('/admin/ajax/restart-altrp',)
    //
    //   progressBar(.2)
    //   await delay(300)
    //
    // } catch (e) {
    //   let serverRestarted = false
    //   let i = 0
    //   do {
    //     ++i
    //     try {
    //       await delay(100)
    //       await axios.get('/ajax/_token')
    //       serverRestarted = true
    //     } catch (e) {
    //     }
    //   } while (!serverRestarted && i < 100)
    // }
    store.dispatch(setAdminDisable());
    try {
      progressBar(.3)
      let res = await (new Resource({route: '/admin/ajax/update_altrp'})).post({});

      try {
        await axios.post('/admin/ajax/restart-altrp',)
        progressBar(.8)
        await delay(300)


      } catch (e) {
        let serverRestarted = false
        let i = 0
        do {
          ++i
          try {
            await delay(100)
            await axios.get('/ajax/_token')
            serverRestarted = true
          } catch (e) {
          }
        } while (!serverRestarted && i < 100)
        await axios.get('/admin/ajax/start-socket',)

        progressBar(.9)
      }
      setTimeout(() => {
          alert('Updates Success');
          res.result ? pageReload() : this.setNeedUpdate();
          progressBar(0)

        }
        , 1300);
      if(! res.result) {
        store.dispatch(setAdminEnable());
        progressBar(0)
      }
    } catch (error) {
      console.error(error);
      alert('Updates Error: ' + error.message);
      window.location.reload();
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
        <h4 className="mt-4 mb-2">Current Version Changelog:</h4>
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
