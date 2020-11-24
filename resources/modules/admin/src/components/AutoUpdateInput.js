import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";

class AutoUpdateInput extends Component {
  constructor(props){
    super(props);
    this.resource = new Resource({
      route: this.props.route,
    });

    this.state = {
      value: this.props.value || '',
      disabled: ! this.props.value,
    };
    this.changeValue = this.changeValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  async componentDidMount(){
    if(this.props.value !== undefined){
      return;
    }
    let res = await this.resource.get(this.props.resourceid);
    this.setState(state=>{
      return{...state,
        value: res[this.props.resourceid] || '',
        disabled: false,
      }
    });
  }

  /**
   * При нажатии на enter тоже обновдем данные
   * @param e
   */
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
    if(_.isFunction(this.props.changevalue)){
      this.props.changevalue(newValue);
    }
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
    if(_.isFunction(this.props.onBlur)){
      this.props.onBlur(newValue);
    }
    let res = await this.resource.put(this.props.resourceid, {value: newValue, column_value: newValue});

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
    const inputProps = {...this.props};
    delete inputProps.changevalue;
    return<input{...inputProps} className={className}
                onBlur={this.changeValue}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                value={this.state.value}/>
  }
}

export default AutoUpdateInput