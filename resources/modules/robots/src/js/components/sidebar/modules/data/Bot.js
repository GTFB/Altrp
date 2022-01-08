import React, {Component} from "react";
import store from "../../../../store/store";
import { setUpdatedNode } from "../../../../store/robot-settings/actions";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import SendTelegram from "./action/send/SendTelegram";



export default class Bot extends Component{
    constructor(props){
        super(props);
    }

    changeInput(e){
      const node = this.props.selectNode;
      node.data.props.nodeData.data.shortcode = e.target.value;
      store.dispatch(setUpdatedNode(node));
    }

    render(){
        const content = this.props.selectNode?.data?.props?.nodeData?.data?.content ?? [];
        const shortcode = this.props.selectNode?.data?.props?.nodeData?.data?.shortcode ?? '';


        return <div>
          <div className={"settings-section "}>
           <div className="settings-section__title d-flex">
               <div className="settings-section__icon d-flex">
                 <Chevron />
               </div>
               <div className="settings-section__label">Settings Bot</div>
           </div>
           <div className="controllers-wrapper" >
              <div className="controller-container controller-container_textarea">
              <div className="controller-container__label control-select__label controller-label" >Shortcode</div>
              <textarea
                className="control-field controller-field"
                type="text"
                // rows="3"
                style={{lineHeight: '125%'}}
                onChange={(e) => { this.changeInput(e) }}
                value={ shortcode }
              />
              </div>
           </div>
          </div>

          <SendTelegram
              activeSection={this.props.activeSection}
              toggleChevron={this.props.toggleChevron}
              selectNode={this.props.selectNode || []}
              content={content}
            />

        </div>
    }
}
