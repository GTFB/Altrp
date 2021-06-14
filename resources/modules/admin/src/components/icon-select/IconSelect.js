import React, {Component} from "react";
import store from '../../js/store/store'
import {assetsShow} from "../../../../editor/src/js/store/assets-browser/actions";
import { iconsManager } from "../../js/helpers";
import styled from "styled-components";

const IconSelectWrapper = styled.div`
  & svg{
    max-width: ${({maxWidth}) => maxWidth || '200px'};
    max-height: ${({maxHeight}) => maxHeight || '200px'};
  }
  & .altrp-icon-select__content{
    padding: 20px;
    background-color: #F7F8F9;
    display: flex;
    justify-content: center;
  }
`;

class IconSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    }
  }
  openAssetsBrowser = ()=>{
    const assetsSettings = {
      tabs: ['icons'],
      onChoose: async (icon)=>{
        let returnType = this.props.returnType;
        if(! returnType){
          returnType = 'object';
        }
        switch (returnType){
          case 'object':{
            this.props.onChange && this.props.onChange(icon)
          }break;
          case 'text':{
            try {
              fetch(icon.url).then(res => res.text()).then(res=>{
                this.props.onChange && this.props.onChange(res)
              });
            }catch (e) {
              console.error(e);
              this.props.onChange && this.props.onChange('')
            }
          }break;
        }
      }
    };
    store.dispatch(assetsShow(assetsSettings))
  }

  updateValue(){
    if(this.state.value && ! _.isString(this.state.value)){
      fetch(icon.url).then(res => res.text()).then(res=>{
        this.setState(state =>({...state, value: res}))
      });
    }
  }

  componentDidMount() {
    this.updateValue();
  }

  /**
   *
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if(this.props.value !== prevProps.value){
      this.setState(state =>({...state, value: this.props.value}), ()=>{
        this.updateValue();
      });
    }
  }

  render(){
    return <IconSelectWrapper
      className={"altrp-icon-select " + this.props.className || ''}
      id={this.props.id}
      onClick={this.openAssetsBrowser} {...this.props}>
      {this.props.value ?
        <div className="altrp-icon-select__content " dangerouslySetInnerHTML={{__html: this.props.value}}/>
        : iconsManager().renderIcon('add')}
    </IconSelectWrapper>
  }
}

export default IconSelect
