import React, {Component} from "react";
import SettingSection from "./SettingSection";

class PanelTabContent extends Component {
    render(){
      let sections =  this.props.sections || [];
      return <div className="settings-controllers">
        {
          sections.map((section, idx) =>{
            return React.createElement(SettingSection, {
              ...section,
              key: section.sectionId,
              open: idx === 0,
            });
              }
          )
        }
      </div>
    }
}

export default PanelTabContent