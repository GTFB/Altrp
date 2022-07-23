import React, {Component, Suspense} from "react";
import {connect} from "react-redux";
import {setAdminLogo} from "../js/store/admin-logo/actions";
import Resource from "../../../editor/src/js/classes/Resource";
import {setAdminDisable, setAdminEnable} from "../js/store/admin-state/actions";
import AltrpCodeEditor from "./altrp-editor/AltrpCodeEditor";
import store from '../js/store/store';
import {TextArea} from "@blueprintjs/core";
import {pageReload} from "../js/helpers";
import delay from '../../../front-app/src/js/functions/delay'
import upgradeBackend from "../js/functions/upgradeBackend";

const MediaInput = React.lazy(() => import('./media-input/MediaInput.js'));

class AdvancedSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSiteJavascript: '',
      headStart: '',
      headEnd: '',
      bodyEnd: '',
      bodyStart: '',
      debugOn: false,
      loadByUser: false,
    }
  }

  /**
   *
   */
  async componentDidMount() {
    const allSiteJavascript = (await new Resource({route: '/admin/ajax/settings'}).get('all_site_js?decrypt=true')).all_site_js || '';
    // let debugOn = ! ! (await new Resource({route:'/admin/ajax/settings'}).get('altrp_debug').altrp_debug);
    let debugOn = !!(await new Resource({route: '/admin/ajax/settings'}).get('altrp_debug')).altrp_debug;
    let loadByUser = !!(await new Resource({route: '/admin/ajax/settings'}).get('altrp_user_load')).altrp_user_load;
    let altrp_custom_headers = (await new Resource({route: '/admin/ajax/settings'}).get('altrp_custom_headers?decrypt=true')).altrp_custom_headers || '';
    const [
      headStart,
      headEnd,
      bodyStart,
      bodyEnd,
    ] = await Promise.all([
      (await new Resource({route: '/admin/ajax/settings'}).get('head_start?decrypt=true')).head_start || ''
  ,
    (await new Resource({route: '/admin/ajax/settings'}).get('head_end?decrypt=true')).head_end || ''
  ,
    (await new Resource({route: '/admin/ajax/settings'}).get('body_start?decrypt=true')).body_start || ''
  ,
    (await new Resource({route: '/admin/ajax/settings'}).get('body_end?decrypt=true')).body_end || ''
  ,
  ])

    this.setState(state => ({
      ...state,
      allSiteJavascript,
      debugOn,
      loadByUser,
      altrp_custom_headers,
      headStart,
      headEnd,
      bodyStart,
      bodyEnd,
    }));
  }

  /**
   * Изменить лого
   * @param value
   * @return {Promise<void>}
   */

  async changeAdminLogo(value) {
    await new Resource({route: '/admin/ajax/settings'}).put('admin_logo', {value: JSON.stringify(value)});
    this.dispatch(setAdminLogo(value));
  }

  /**
   * Включить дебаг на фронте
   * @param e
   * @return {Promise<void>}
   */

  toggleDebug = async (e) => {
    // await new Resource({route:'/admin/ajax/settings'}).put('admin_logo', {value: JSON.stringify(value)});
    // this.dispatch(setAdminLogo(value));
    let value = e.target.checked;
    await new Resource({route: '/admin/ajax/settings'}).put('altrp_debug', {value});
    this.setState(state => ({
      ...state,
      debugOn: value,
    }))
  };
  /**
   * Включить дебаг на фронте
   * @param e
   * @return {Promise<void>}
   */

  toggleLoadingOption = async (e) => {
    // await new Resource({route:'/admin/ajax/settings'}).put('admin_logo', {value: JSON.stringify(value)});
    // this.dispatch(setAdminLogo(value));
    let value = e.target.checked;
    await new Resource({route: '/admin/ajax/settings'}).put('altrp_user_load', {value});
    this.setState(state => ({
      ...state,
      loadByUser: value,
    }))
  };


  updateCustomHeaders = async (e) => {
    const value = e.target.value
    await new Resource({route: '/admin/ajax/settings'}).put('altrp_custom_headers', {value, encrypt: true});

  }
  /**
   * Удалить всю историю всех шаблонов
   * @param e
   */
  deleteAllTemplatesReviews = async (e) => {
    let result = await confirm('Are You Sure');
    if (!result) {
      return;
    }
    store.dispatch(setAdminDisable());
    let res = await new Resource({route: '/admin/ajax/reviews'}).delete();
    if (res.success) {
      await alert('success');
    }
    store.dispatch(setAdminEnable());
  };

  /**
   * Обновить всех ресурсы на бкенде (модели, шаблоны, контроллеры и т.д.)
   * @param e
   */
  updateAllBackendResources = async (e) => {
    let result = await confirm('Are You Sure');
    if (!result) {
      return;
    }
    store.dispatch(setAdminDisable());

    await upgradeBackend()
    pageReload()

  };

  render() {
    const {
      altrp_custom_headers,
      allSiteJavascript,
      headStart,
      headEnd,
      bodyStart,
      bodyEnd,
    } = this.state
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
              <div className="advanced-text-custom">Custom Headers for Pages:</div>
              <TextArea name="custom_headers"
                        className="resize-none mb-3"
                        id="custom_headers"
                        cols="30"
                        defaultValue={altrp_custom_headers}
                        onBlur={this.updateCustomHeaders}
                        rows="10" fill={true}>

              </TextArea>
              <div>
                Enter each Header for Page in a separate line.
                <br/>To differentiate between label and value, separate them with a pipe char ("|").
                <br/>For example: title | Post.<br/>
                Or title | {'{{title}}'}
                for Take Value from Page Data
              </div>
            </div>
          </div>

          <div className="admin-styles-advanced">
            {/*<div className="admin-styles-advanced-block advanced-flex">*/}
            {/*  <div className="advanced-text">Debug Altrp App</div>*/}
            {/*  <input className="admin-table__td_check"*/}
            {/*         onChange={this.toggleDebug}*/}
            {/*    // value={this.state.debugOn}*/}
            {/*         checked={this.state.debugOn}*/}
            {/*         type="checkbox"/>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className="editor-js__block">
          <div className="admin-styles-advanced-block no-margin ">
            <div className="advanced-text-custom">Add Custom Javascript on All Site Pages:</div>
            <AltrpCodeEditor value={allSiteJavascript}
                             mode="javascript"
                             onChange={value => this.setState({allSiteJavascript: value})}
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
      <div className="row align-items-start">
        <div className="col-12 mb-3">
          <h2>Additional HTML</h2>
        </div>
        <div className="col-2 mb-3">
          HEAD Start
        </div>
        <div className="col-10 mb-3">
          <AltrpCodeEditor value={headStart}
                           mode="html"
                           placeholder="HEAD Start"
                           onChange={value => this.setState({headStart: value})}
                           onBlur={e => this.updateAdditionalHtml(e, 'headStart')}
                           height="40em"
                           style={{
                             width: '100%'
                           }}
          />
        </div>
        <div className="col-2 mb-3">
          HEAD End
        </div>
        <div className="col-10 mb-3">
          <AltrpCodeEditor value={headEnd}
                           mode="html"
                           placeholder="HEAD End"
                           onBlur={e => this.updateAdditionalHtml(e, 'headEnd')}
                           onChange={value => this.setState({headEnd: value})}
                           height="40em"
                           style={{
                             width: '100%'
                           }}
          />
        </div>
        <div className="col-2 mb-3">
          BODY Start
        </div>
        <div className="col-10 mb-3">
          <AltrpCodeEditor value={bodyStart}
                           mode="html"
                           placeholder="BODY Start"
                           onBlur={e => this.updateAdditionalHtml(e, 'bodyStart')}
                           onChange={value => this.setState({bodyStart: value})}
                           height="40em"
                           style={{
                             width: '100%'
                           }}
          />
        </div>
        <div className="col-2 mb-3">
          BODY End
        </div>
        <div className="col-10 mb-3">
          <AltrpCodeEditor value={bodyEnd}
                           mode="html"
                           placeholder="BODY End"
                           onBlur={e => this.updateAdditionalHtml(e, 'bodyEnd')}
                           onChange={value => this.setState({bodyEnd: value})}
                           height="40em"
                           style={{
                             width: '100%'
                           }}
          />
        </div>
      </div>
    </div>
  }

  /**
   * Сохранить код JS для всего сайта
   */
  updateAllSiteJavascript = async () => {
    await new Resource({route: '/admin/ajax/settings'}).put('all_site_js', {
      value: this.state.allSiteJavascript,
      encrypt: true
    });
  };

  updateAdditionalHtml = (e, type = 'headStart') => {

    const value = this.state[type] || ''
    type = _.snakeCase(type)

    const resource = new Resource({route: '/admin/ajax/settings'})
    resource.put(type, {
      value: value,
      encrypt: true
    })
  }
}

function mapStateToProps(state) {
  return {
    adminLogo: state.adminLogo,
  };
}

export default connect(mapStateToProps)(AdvancedSettings);
