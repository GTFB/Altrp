import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import Resource from "../../../../editor/src/js/classes/Resource";


class AltrpSelect extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.optionsResource = new Resource({route: props.optionsRoute});
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
    // console.log(searchString);
    console.log(this.optionsResource);

    let options = await this.optionsResource.search(searchString);
    console.log(options);
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

    let selectProps = {
      onChange: this.onChange,
      onInputChange: this.onInputChange,
      options: this.state.options || [],
      // styles: altrpSelectStyles,
      placeholder: this.props.placeholder,
      loadOptions: this.loadOptions,
      noOptionsMessage: () => "not found",
      // value,
      // SelectContainer: {
      //     ...this.props
      // }
    };
    _.assign(selectProps, this.props);
    console.log(selectProps);

    return <AsyncSelect
        {...selectProps}
    />
  }
}

export default AltrpSelect


export const altrpSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#FFF" : "#8E94AA",
    backgroundColor: state.isSelected ? "#5897fb" : "#FFF",
    fontSize: 13,
    padding: 5,
    height: 20
  }),

  menu: () => ({
    margin: 0,
    padding: 0,
    width: "100%",
    borderRadius: "0px 0px 3px 3px",
    borderWidth: "0px 1px 1px 1px",
    borderStyle: "solid",
    borderColor: "#E5E6EA",
    position: 'absolute'
  }),

  menuList: () => ({
    margin: 0,
    padding: 0,
  }),

  control: (state) => ({
    display: "flex",
    height: 28,
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E5E6EA",
    color: "#8E94AA",
    fontSize: 13,
  }),

  placeholder: () => ({
    color: "#8E94AA",
    fontSize: 13,
    opacity: 1
  }),

  indicatorSeparator: () => ({
    display: "none !important"
  }),

  singleValue: () => ({
    color: "#8E94AA",
  })
};

