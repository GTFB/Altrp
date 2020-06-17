import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";

class AutoUpdateInput extends Component {
  constructor(props){
    super(props);
    this.resource = new Resource({
      route: this.props.route,
    });
    this.state = {
      value: '',
      disabled: true,
    };
    this.changeValue = this.changeValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  async componentDidMount(){
    let res = await this.resource.get(this.props.resourceid);
    this.setState(state=>{
      return{...state,
        value: res[this.props.resourceid] || '',
        disabled: false,
      }
    });
  }

  onKeyDown(e){
    if(e.keyCode === 13){
      this.changeValue(e);
    }
  }

  onChange(e){
    let newValue = e.target.value;
    this.setState(state=>{
      return{...state,
        value: newValue,
      }
    });
  }

  /**
   * Запрос на именение поля
   * @param e
   * @return {Promise<void>}
   */
  async changeValue(e){
    let newValue = e.target.value;
    this.setState(state=>{
      return{...state,
        disabled: true,
      }
    });
    let res = await this.resource.put(this.props.resourceid, {value: newValue});
    this.setState(state=>{
      return{...state,
        disabled: false,
      }
    });
  }
  render(){
    let {className} = this.props;
    if(this.state.disabled){
      className += ' pointer-event-none';
    }
    return<input{...this.props} className={className}
                onBlur={this.changeValue}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                value={this.state.value}/>
  }
}

export default AutoUpdateInput