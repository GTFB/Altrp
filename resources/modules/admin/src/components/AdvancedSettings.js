import React, {Component, Suspense} from "react";
import {connect} from "react-redux";
import {setAdminLogo} from "../js/store/admin-logo/actions";
import Resource from "../../../editor/src/js/classes/Resource";
import {setAdminDisable, setAdminEnable} from "../js/store/admin-state/actions";
import AltrpCodeEditor from "./altrp-editor/AltrpCodeEditor";
import store from '../js/store/store';

const MediaInput = React.lazy(() => import('./media-input/MediaInput.js'));
const updateCommandDefault = `pm2 stop all
sleep 3
pm2 start all`
class AdvancedSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      allSiteJavascript: '',
      updateCommand: updateCommandDefault,
      debugOn: false,
      loadByUser: false,
    }
  }

  /**
   *
   */
  async componentDidMount() {
    const allSiteJavascript = (await new Resource({route: '/admin/ajax/settings'}).get('all_site_js?decrypt=true')).all_site_js || '';
    const updateCommand = (await new Resource({route: '/admin/ajax/settings'}).get('update_command?decrypt=true')).update_command || '';
    // let debugOn = ! ! (await new Resource({route:'/admin/ajax/settings'}).get('altrp_debug').altrp_debug);
    let debugOn = ! ! (await new Resource({route:'/admin/ajax/settings'}).get('altrp_debug')).altrp_debug;
    let loadByUser = ! ! (await new Resource({route:'/admin/ajax/settings'}).get('altrp_user_load')).altrp_user_load;
    this.setState(state => ({...state,
      allSiteJavascript,
      updateCommand: updateCommand || updateCommandDefault,
      debugOn,
      loadByUser,
    }));
  }

  /**
   * Изменить лого
   * @param value
   * @return {Promise<void>}
   */

  async changeAdminLogo(value){
    await new Resource({route:'/admin/ajax/settings'}).put('admin_logo', {value: JSON.stringify(value)});
    this.dispatch(setAdminLogo(value));
  }
  /**
   * Включить дебаг на фронте
   * @param e
   * @return {Promise<void>}
   */

  toggleDebug = async (e)=>{
    // await new Resource({route:'/admin/ajax/settings'}).put('admin_logo', {value: JSON.stringify(value)});
    // this.dispatch(setAdminLogo(value));
    let value = e.target.checked;
    await new Resource({route:'/admin/ajax/settings'}).put('altrp_debug', {value});
    this.setState(state=>({
      ...state,
      debugOn: value,
    }))
  };
  /**
   * Включить дебаг на фронте
   * @param e
   * @return {Promise<void>}
   */

  toggleLoadingOption = async (e)=>{
    // await new Resource({route:'/admin/ajax/settings'}).put('admin_logo', {value: JSON.stringify(value)});
    // this.dispatch(setAdminLogo(value));
    let value = e.target.checked;
    await new Resource({route:'/admin/ajax/settings'}).put('altrp_user_load', {value});
    this.setState(state=>({
      ...state,
      loadByUser: value,
    }))
  };

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
   * Запрос на очистку кэша
   */
  clearAllCache = async (e) =>{
    let result  = await confirm('Are You Sure');
    if(! result){
      return;
    }
    let res = await new Resource({route:'/admin/ajax/clear_cache'}).delete();

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

      <div className="advanced__settings">
        <div className="admin-styles-advanced-blocks">
          <div className="admin-styles-advanced-block">
            <label htmlFor="settings-container-width" className="admin__logo-advanced">
              Admin Logo:
            </label>
            <Suspense fallback={'Loading'}>
              <MediaInput onChange={this.changeAdminLogo} value={this.props.adminLogo}/>
            </Suspense>
          </div>

          <div className="admin-styles-advanced">
            <div className="admin-styles-advanced-block">
              <div className="advanced-text-custom">Clear All Templates History:</div>
              <button className="btn btn_success btn_advanced"
                      onClick={this.deleteAllTemplatesReviews}>
                Clear
              </button>
            </div>

            <div className="admin-styles-advanced-block">
              <div className="advanced-text-custom">Update All Backend Resources:</div>
              <button className="btn btn_success btn_advanced"
                      onClick={this.updateAllBackendResources}>
                Update
              </button>
            </div>

            <div className="admin-styles-advanced-block">
              <div className="advanced-text-custom">Clear All Cache:</div>
              <button className="btn btn_success btn_advanced"
                      onClick={this.clearAllCache}>
                Clear
              </button>
            </div>
          </div>

          <div className="admin-styles-advanced">
            <div className="admin-styles-advanced-block advanced-flex">
              <div className="advanced-text">Debug Altrp App</div>
              <input className="admin-table__td_check"
                     onChange={this.toggleDebug}
                // value={this.state.debugOn}
                     checked={this.state.debugOn}
                     type="checkbox"/>
            </div>

            <div className="admin-styles-advanced-block advanced-flex">
              <div className="advanced-text">Load App on User Action</div>
              <input className="admin-table__td_check"
                     onChange={this.toggleLoadingOption}
                // value={this.state.debugOn}
                     checked={this.state.loadByUser}
                     type="checkbox"/>
            </div>
          </div>
      </div>

        <div className="editor-js__block">
          <div className="admin-styles-advanced-block no-margin ">
            <div className="advanced-text-custom">Add Custom Javascript on All Site Pages:</div>
            <AltrpCodeEditor value={this.state.allSiteJavascript}
                             mode="javascript"
                             onChange={value => this.setState({ allSiteJavascript: value})}
                             height="40em"
                             style={{
                               width: '100%'
                             }}
            />
            <button className="btn btn_success btn_advanced"
                    onClick={this.updateAllSiteJavascript}>
              Update
            </button>
          </div>
          <div className="admin-styles-advanced-block no-margin mt-4">
            <div className="advanced-text-custom">Enter Update Command:</div>
            <AltrpCodeEditor value={this.state.updateCommand}
                             mode="sh"
                             fontSize={14}
                             onChange={value => this.setState({ updateCommand: value})}
                             height="4em"
                             style={{
                               width: '100%'
                             }}
            />
            <button className="btn btn_success btn_advanced"
                    onClick={this.updateCommandRequest}>
              Update
            </button>
          </div>
        </div>

      </div>


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
    </div>
  }

  /**
   * Сохранить код JS для всего сайта
   */
   updateAllSiteJavascript = async() => {
    await new Resource({route:'/admin/ajax/settings'}).put('all_site_js', {value: this.state.allSiteJavascript, encrypt: true});
  };
  updateCommandRequest = async() => {
    await new Resource({route:'/admin/ajax/settings'}).put('update_command', {value: this.state.updateCommand, encrypt: true});
  };
}

function mapStateToProps(state) {
  return {
    adminLogo: state.adminLogo,
  };
}

export default connect(mapStateToProps)(AdvancedSettings);
