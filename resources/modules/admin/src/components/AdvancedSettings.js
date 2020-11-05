import React, {Component, Suspense} from "react";
import {connect} from "react-redux";
import {setAdminLogo} from "../js/store/admin-logo/actions";
import Resource from "../../../editor/src/js/classes/Resource";
import {setAdminDisable, setAdminEnable} from "../js/store/admin-state/actions";
import AltrpCodeEditor from "./altrp-editor/AltrpCodeEditor";
import store from '../js/store/store';

const MediaInput = React.lazy(() => import('./media-input/MediaInput.js'));

class AdvancedSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      allSiteJavascript: ''
    }
  }

  /**
   *
   */
  async componentDidMount() {
    const allSiteJavascript = (await new Resource({route: '/admin/ajax/settings'}).get('all_site_js?decrypt=true')).all_site_js || '';
    console.log(allSiteJavascript);
    this.setState(state => ({...state,allSiteJavascript}));
  }

  /**
   * Изменить лого
   * @param value
   * @return {Promise<void>}
   */

  async changeAdminLogo(value){
    await new Resource({route:'/admin/ajax/settings'}).put('admin_logo', {value: JSON.stringify(value)});
    console.log(value);
    this.dispatch(setAdminLogo(value));
  }

  /**
   * Удалить всю историю всех шаблонов
   * @param e
   */
  deleteAllTemplatesReviews = async (e) =>{
    let result  = await confirm('Are You Sure');
    if(! result){
      return;
    }
    store.dispatch(setAdminDisable());
    let res = await new Resource({route:'/admin/ajax/reviews'}).delete();
    if(res.success){
      await alert('success');
    }
    store.dispatch(setAdminEnable());
  };

  /**
   * Обновить всех ресурсы на бкенде (модели, шаблоны, контроллеры и т.д.)
   * @param e
   */
  updateAllBackendResources = async (e) =>{
    let result  = await confirm('Are You Sure');
    if(! result){
      return;
    }
    store.dispatch(setAdminDisable());

    let res = await new Resource({route:'/admin/ajax/update-all-resources'}).post({});
    if(res.success){
      await alert('success');
    }
    store.dispatch(setAdminEnable());
  };
  render() {
    return <div className="admin-styles-settings">
      <table>
        <tbody className="admin-settings-table-row">
        <tr className="admin-settings-table-row">
          <td className="admin-settings-table__td row-text" width="10%">
            <label htmlFor="settings-container-width">
              Admin Logo:
            </label>
          </td>
          <td className="admin-settings-table__td">
            <Suspense fallback={'Loading'}>
              <MediaInput onChange={this.changeAdminLogo} value={this.props.adminLogo}/>
            </Suspense>
          </td>
        </tr>
        <tr className="admin-settings-table-row">
          <td className="admin-settings-table__td row-text" width="10%">
            Clear All Templates History
          </td>
          <td className="admin-settings-table__td">
            <button className="btn btn_success"
                    onClick={this.deleteAllTemplatesReviews}>
              Clear
            </button>
          </td>
        </tr>
        <tr className="admin-settings-table-row">
          <td className="admin-settings-table__td row-text" width="10%">
            Update All Backend Resources
          </td>
          <td className="admin-settings-table__td">
            <button className="btn btn_success"
                    onClick={this.updateAllBackendResources}>
              Update
            </button>
          </td>
        </tr>
        <tr className="admin-settings-table-row">
          <td className="admin-settings-table__td row-text" width="10%">
            Add Custom Javascript on All Site Pages
          </td>
          <td className="admin-settings-table__td">
            <AltrpCodeEditor value={this.state.allSiteJavascript}
                             mode="javascript"
                             onChange={value => this.setState({ allSiteJavascript: value})}
            />
            <button className="btn btn_success"
                    onClick={this.updateAllSiteJavascript}>
              Update
            </button>
          </td>
        </tr>
        {/*<tr className="admin-settings-table-row">*/}
          {/*<td className="admin-settings-table__td row-text" width="10%">*/}
            {/*Clear All Templates History*/}
          {/*</td>*/}
          {/*<td className="admin-settings-table__td">*/}
            {/*<button className="btn btn_success"*/}
                    {/*onClick={this.deleteAllTemplatesReviews}>*/}
              {/*Clear*/}
            {/*</button>*/}
          {/*</td>*/}
        {/*</tr>*/}
        </tbody>
      </table>
    </div>
  }

  /**
   * Сохранить код JS для всего сайта
   */
   updateAllSiteJavascript = async() => {
    await new Resource({route:'/admin/ajax/settings'}).put('all_site_js', {value: this.state.allSiteJavascript, encrypt: true});
  };
}

function mapStateToProps(state) {
  return {
    adminLogo: state.adminLogo,
  };
}

export default connect(mapStateToProps)(AdvancedSettings);
