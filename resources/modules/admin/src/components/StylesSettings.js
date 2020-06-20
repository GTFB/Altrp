import React, {Component} from "react";
import AutoUpdateInput from "./AutoUpdateInput";

class StylesSettings extends Component {
  render() {
    return <div className="admin-styles-settings">
      <table>
        <tbody className="admin-settings-table-row">
        <tr className="admin-settings-table-row">
          <td className="admin-settings-table__td row-text" width="10%">
            <label htmlFor="settings-container-width">
              Container Width
            </label>
          </td>
          <td className="admin-settings-table__td">
            <AutoUpdateInput type="number"
                             route="/admin/ajax/settings"
                             resourceid="container_width"
                             id="settings-container-width"
                             className="form__input w-25"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  }
}

export default StylesSettings