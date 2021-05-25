import React, {Component} from "react";
import store from '../../js/store/store'
import {assetsShow} from "../../../../editor/src/js/store/assets-browser/actions";
import { iconsManager } from "../../js/helpers";
import styled from "styled-components";

const IconSelectWrapper = styled.div`
  & svg{
    max-width: 200px;
    max-height: 200px;
  }
  & .altrp-icon-select__content{
    padding: 20px;
    background-color: #F7F8F9;
    display: flex;
    justify-content: center;
  }
`;

class IconSelect extends Component {
  openAssetsBrowser = ()=>{
    const assetsSettings = {
      tabs: ['icons'],
      onChoose: async (icon)=>{
        try {
          fetch(icon.url).then(res => res.text()).then(res=>{
            this.props.onChange && this.props.onChange(res)
          });
        }catch (e) {
          console.error(e);
        }
      }
    };
    store.dispatch(assetsShow(assetsSettings))
  }
  render(){
    return <IconSelectWrapper className="altrp-icon-select" onClick={this.openAssetsBrowser}>
      {this.props.value ?
        <div className="altrp-icon-select__content " dangerouslySetInnerHTML={{__html: this.props.value}}/>
        : iconsManager().renderIcon('add')}
    </IconSelectWrapper>
  }
}

export default IconSelect
