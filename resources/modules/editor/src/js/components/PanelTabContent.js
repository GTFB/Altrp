import React, {Component} from "react";
import SettingSection from "./SettingSection";

class PanelTabContent extends Component {
    render(){
      let sections =  this.props.sections || [];
      console.log(this.props.sections);
      return <div className="settings-controllers">
        {
          sections.map((section) =>
            React.createElement(SettingSection, {...section, key: section.sectionName})
          )
        }
      </div>
    }
}

export default PanelTabContent