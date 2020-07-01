import React, { Component } from "react";
import {isEditor} from "../../helpers";
import {Redirect} from "react-router";
class ButtonWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      pending: false,
      redirect: false,
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.onClick = this.onClick.bind(this);
  }

  async onClick(e){
    if(isEditor()){
      console.log(this.state.settings);
    } else {
      this.setState(state=>({...state, pending: true}));
      this.props.element.getForms().forEach( /**
       * @param {AltrpForm} form
       */async (form)=>{
        try {
          let res = await form.submit();
          if(res.success){
            let redirect = this.state.settings.redirect_after ? this.state.settings.redirect_after : false;
            this.setState(state=>({...state, pending: false, redirect}));
          }
        } catch (e) {
          this.setState(state=>({...state, pending: false}));
        }
      })
    }
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} push={true}/>
    }
    let classes = "altrp-btn " + (this.state.settings.position_css_classes || '');
    if(this.state.pending){
      classes += ' altrp-disabled';
    }
    let button = <button onClick={this.onClick}
        className={classes}
        id={this.state.settings.position_css_id}
      >
        {this.state.settings.button_text || ""}
      </button>;
    let link = null;
    if(this.state.settings.link_link.url != null && this.state.settings.link_link.url != "") {
      link = <a onClick={this.onClick} href={this.state.settings.link_link.url} className={classes}> {this.state.settings.button_text || ""}{button}</a>
    }

    return link || button
  }
}

export default ButtonWidget;
