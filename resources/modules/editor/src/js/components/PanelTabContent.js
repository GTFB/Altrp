import React, {Component} from "react";
import SettingSection from "./SettingSection";
import { Scrollbars } from "react-custom-scrollbars";

class PanelTabContent extends Component {
    render(){
      let sections =  this.props.sections || [];
      return <div className="settings-controllers">
        <Scrollbars
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        > 
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
        </Scrollbars>
      </div>
    }
}

export default PanelTabContent