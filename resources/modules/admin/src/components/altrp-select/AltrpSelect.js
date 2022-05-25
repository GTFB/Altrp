import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import Resource from "../../../../editor/src/js/classes/Resource";
import Select from "react-select";
import { Scrollbars } from "react-custom-scrollbars";


export const renderScrollbar = (props) => {
  return <Scrollbars autoHeight >{props.children}</Scrollbars>;
};

class AltrpSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: props.options || [],
    };
    if(props.optionsRoute){
      this.optionsResource = new Resource({route: props.optionsRoute});
    }
    this.selectRef = React.createRef();
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

  render(){
    const customWidth = {}
    if (this.props.type === "table-select" && this.props.settingsTableWidth.switcher) {
      if (this.props.settingsTableWidth.widthCustom) {
        customWidth.width = this.props.settingsTableWidth.widthCustom.size + this.props.settingsTableWidth.widthCustom.unit
      }
    }
    const customStyles = {
      control: (base, state) => ({
        ...base,
        boxShadow: "none",
        borderColor: state.isFocused ? "hsl(0,0%,80%)" : "hsl(0,0%,80%)",
        "&:hover": {
          borderColor: "hsl(0,0%,80%)"
        }
      }),
      menuPortal: base => ({ ...base, ...customWidth, zIndex: 99999 }),
      // option: (provided, state) => ({
      //   ...provided,
      //   backgroundColor: state.isSelected ?
      //     background.selected.color :
      //     state.isFocused ? background.focused.color : background.normal.color
      // })
    };

    let selectProps = {
      onChange: this.onChange,
      options: this.state.options || [],
      formatOptionLabel: ({label}) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: label }}/>
        )
      },
      placeholder: this.props.placeholder,
      loadOptions: this.loadOptions,
      noOptionsMessage: this.props.noOptionsMessage || (() => "not found"),
      styles: customStyles,
      menuPortalTarget: document.body,
      menuPlacement: 'auto',
      menuPosition: 'absolute',
      onKeyDown : this.onKeyDown,
      components: { MenusList: renderScrollbar },
      captureMenuScroll: false,
      isDisabled: this.state.isDisabled,
      ref: this.selectRef,
    };

    _.assign(selectProps, this.props);

    if(_.isArray(selectProps.value)){
      selectProps.value = selectProps.value.map(item => {
        let _i = {
          label: '',
          value: '',
        };
        if(_.isString(item) || _.isNumber(item)){
          _i.value = item;
          _i.label = item;
        } else if(_.isObject(item)) {
          return item;
        }
        if(_.isArray(selectProps.options)){
          selectProps.options.forEach(option=>{
            if(option.value === _i.value){
              _i = {...option,};
            }
          });
        }
        return _i;
      });
    }
    if(selectProps.value && ! _.isObject(selectProps.value)){
      selectProps.value = selectProps.options.find(o=>{
        return o.value == selectProps.value;
      });
    }
    if( this.optionsResource){
      return <AsyncSelect {...selectProps} />
    } else {
      return <Select {...selectProps} />
    }
  }
}

export default AltrpSelect



