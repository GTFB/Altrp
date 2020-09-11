import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import Resource from "../../../../editor/src/js/classes/Resource";
import Select from "react-select";


class AltrpSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: props.options || [],
    };
    if(props.optionsRoute){
      this.optionsResource = new Resource({route: props.optionsRoute});
    }
  }

  /**
   *
   */
  async componentDidMount(){

  }
  /**
   * изменение значения
   */
  onChange(){

  }
  /**
   * изменение в инпуте
   */
  onInputChange(){

  }

  /**
   *
   */
  loadOptions = async (searchString, callback)=>{
    let options = [];
    if(this.optionsResource){
      options = await this.optionsResource.search(searchString);
    }
    this.setState(state=>({
      ...state,
      options
    }));
    return callback(options);
  };
  /**
   *
   */

  render(){
    // const { fontSettings, color } = this.props;
    let selectProps = {
      onChange: this.onChange,
      onInputChange: this.onInputChange,
      options: this.state.options || [],
      placeholder: this.props.placeholder,
      loadOptions: this.loadOptions,
      noOptionsMessage: this.props.noOptionsMessage || (() => "not found"),
      styles: { menuPortal: base => ({ ...base, zIndex: 99999/* , ...fontSettings, color */ }) },
      menuPortalTarget: document.body,
      menuPlacement: 'bottom'
    };
    
    _.assign(selectProps, this.props);
    if( this.optionsResource){
      return <AsyncSelect {...selectProps} />
    } else {
      return <Select {...selectProps} />
    }
  }
}

export default AltrpSelect



