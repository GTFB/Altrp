import React, {Component, Suspense} from "react";
import {connect} from "react-redux";
import {setAdminLogo} from "../js/store/admin-logo/actions";
import Resource from "../../../editor/src/js/classes/Resource";

const MediaInput = React.lazy(() => import('./media-input/MediaInput.js'));

class StylesSettings extends Component {
  constructor(props){
    super(props);
  }
  async changeAdminLogo(value){
    await new Resource({route:'/admin/ajax/settings'}).put('admin_logo', {value: JSON.stringify(value)});
    console.log(value);
    this.dispatch(setAdminLogo(value));
  }
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
        </tbody>
      </table>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    adminLogo: state.adminLogo,
  };
}

export default connect(mapStateToProps)(StylesSettings);