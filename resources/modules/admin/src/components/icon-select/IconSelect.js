import React, {Component} from "react";
import store from '../../js/store/store'
import {assetsShow} from "../../../../editor/src/js/store/assets-browser/actions";
import styled from "styled-components";


const IconSelectWrapper = styled.div`
  & svg{
    width: 25px;
    height: 25px;
  }
  &{
    width: 60px;
    height: 60px;
    background-color: #F7F8F9;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
    return <><IconSelectWrapper
      className={"altrp-icon-select " + this.props.className || ''}
      id={this.props.id}
      dangerouslySetInnerHTML={{__html: this.props.value || `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="#333333"/>
</svg>
`}}
      onClick={this.openAssetsBrowser} {...this.props}>


    </IconSelectWrapper>
      {this.props.value &&
      <button onClick={()=>{
        this.props.onChange && this.props.onChange('')
      }
      } className="btn btn_link text-danger fs-2 altrp-menu-item__delete">delete Icon</button>}
    </>
  }
}

export default IconSelect
