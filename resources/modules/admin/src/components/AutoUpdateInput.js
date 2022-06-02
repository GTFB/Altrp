import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";

class AutoUpdateInput extends Component {
  constructor(props){
    super(props);

    this.resource = new Resource({
      route: props.route,
    });

    this.state = {
      value: this.props.value || "",
      disabled: ! this.props.value,
    };
    this.changeValue = this.changeValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  /**
   * Обновление роута или значения через пропсы
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps, prevState){
    if(prevProps.route !== this.props.route){
      let route = this.props.route;

      if(this.props.encrypt) {
        route = route + "?decrypt=true"
      }

      this.resource = new Resource({
        route,
      });
      console.log(this.resource);
    }
    if(prevProps.value !== this.props.value && this.props.value !== this.state.value){
      // console.log(this.props.value);
      this.setState(state =>({...state, value: this.props.value}));
    }
  }

  async componentDidMount(){
    if(this.props.value !== undefined || ! this.props.resourceid){
      return;
    }

    let resourceid = this.props.resourceid;

    if(this.props.encrypt) {
      resourceid = resourceid + "?decrypt=true"
    }

    let res = await this.resource.get(resourceid);
    this.setState(state=>{
      return{...state,
        value: res[this.props.resourceid] || "",
        disabled: false,
      }
    });
  }

  /**
   * При нажатии на enter тоже обновим данные
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
    let res = await this.resource.put(this.props.resourceid, {value: newValue, column_value: newValue, encrypt: this.props.encrypt || false});

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

    delete inputProps.encrypt

    let input = <input
      {...inputProps}
      className={className}
      onBlur={this.changeValue}
      onKeyDown={this.onKeyDown}
      onChange={this.onChange}
      value={this.state.value}
    />

    if(inputProps.type === "select") {
      input = <select
        {...inputProps}
        className={className}
        onBlur={this.changeValue}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        value={this.state.value}
      >
        {
          inputProps.children
        }
      </select>
    } else if (inputProps.type === "textarea") {
      input = <textarea
        {...inputProps}
        className={className}
        onBlur={this.changeValue}
        style={{
          height: 200
        }}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        value={this.state.value}
      />
    }

    return input
  }
}

export default AutoUpdateInput
