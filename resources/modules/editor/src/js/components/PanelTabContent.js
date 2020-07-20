import React, {Component} from "react";
import SettingSection from "./SettingSection";
import { Scrollbars } from "react-custom-scrollbars";
import DynamicContent from "./DynamicContent/DynamicContent";
import StateSection from "./StateSection";

class PanelTabContent extends Component {
    render(){
      let sections =  this.props.sections || [];
      return <div className="settings-controllers">
        <Scrollbars
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        >
          <div id="settingsControllers">
            {
              sections.map((section, idx) =>{
                return React.createElement(SettingSection, {
                  ...section,
                  key: section.sectionId,
                  sectionID: idx,
                  });
                }
            )
          }
          <DynamicContent/>
          </div>
        </Scrollbars>
      </div>
    }
}

export default PanelTabContent
