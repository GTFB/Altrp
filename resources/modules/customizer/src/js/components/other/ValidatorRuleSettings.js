import React, {Component} from "react";

class ValidatorRuleSettings extends Component {

  changeByPath=(value, path)=>{
    this.props.changeByPath(value, path)
  }
  mbRenderFieldSettings = ()=>{
    const names = [
      'confirmed',
      'requiredIfExists',
      'requiredIfNotExists',
    ]
    const {
      settings = {},
    } = this.props
    const {
      name,
      field = '',
    } = settings
    if(! names.includes(name)){
      return ''
    }
    return (
      <div className="controller-container controller-container_select">
        <div className="controller-container__label control-select__label controller-label">
          Field Name
        </div>
        <div className="bp3-control-group bp3-numeric-input">
          <div className="bp3-input-group">
            <input type="text"
                   id="mapper-source"
                   onChange={(e)=>{
                     const value = e.target.value
                     this.changeByPath(value, 'field');
                   }}
                   className="bp3-input"
                   value={field}/>
          </div>

        </div>
      </div>)
  }
  mbShowMessage =()=>{
    const names = [
      'trim',
    ]
    const {
      settings = {},
    } = this.props
    const {
      message,
      name,
    } = settings
    if(names.includes(name)){
      return ''
    }
    return <div className="controller-container controller-container_select">
      <div className="controller-container__label control-select__label controller-label">
        Error Message
      </div>
      <div className="bp3-control-group bp3-numeric-input">
        <div className="bp3-input-group">
          <input type="text"
                 id="mapper-source"
                 onChange={(e)=>{
                   const value = e.target.value
                   this.changeByPath(value, 'message');
                 }}
                 className="bp3-input"
                 value={message}/>
        </div>

      </div>
    </div>
  }
  mbRenderRegexSettings = ()=>{
    const names = [
      'regex',
    ]
    const {
      settings = {},
    } = this.props
    const {
      name,
      regex = '',
    } = settings
    if(! names.includes(name)){
      return ''
    }

    return (
      <div className="controller-container controller-container_select">
        <div className="controller-container__label control-select__label controller-label">
          Regular Expression
        </div>
        <div className="bp3-control-group bp3-numeric-input">
          <div className="bp3-input-group">
            <input type="text"
                   id="regular-expression"
                   onChange={(e)=>{
                     const value = e.target.value
                     this.changeByPath(value, 'regex');
                   }}
                   className="bp3-input"
                   value={regex}/>
          </div>

        </div>
      </div>)
  }
  mbRenderMaxSettings = ()=>{
    const names = [
      'maxLength',
    ]
    const {
      settings = {},
    } = this.props
    const {
      name,
      max = '',
    } = settings
    if(! names.includes(name)){
      return ''
    }
    return (
      <div className="controller-container controller-container_select">
        <div className="controller-container__label control-select__label controller-label">
          Max Length
        </div>
        <div className="bp3-control-group bp3-numeric-input">
          <div className="bp3-input-group">
            <input type="text"
                   id="mapper-source"
                   onChange={(e)=>{
                     const value = e.target.value
                     this.changeByPath(value, 'max');
                   }}
                   className="bp3-input"
                   value={max}/>
          </div>

        </div>
      </div>)
  }
  mbRenderMinSettings = ()=>{
    const names = [
      'minLength',
    ]
    const {
      settings = {},
    } = this.props
    const {
      name,
      min = '',
    } = settings
    if(! names.includes(name)){
      return ''
    }
    return (
      <div className="controller-container controller-container_select">
        <div className="controller-container__label control-select__label controller-label">
          Min Length
        </div>
        <div className="bp3-control-group bp3-numeric-input">
          <div className="bp3-input-group">
            <input type="text"
                   id="mapper-source"
                   onChange={(e)=>{
                     const value = e.target.value
                     this.changeByPath(value, 'min');
                   }}
                   className="bp3-input"
                   value={min}/>
          </div>

        </div>
      </div>)
  }
  mbRenderTableColumnSettings = ()=>{
    const names = [
      'unique',
      'exists',
    ]
    const {
      settings = {},
    } = this.props
    const {
      name,
      table = '',
      column = '',
    } = settings
    if(! names.includes(name)){
      return ''
    }
    return (
      <>
      <div className="controller-container controller-container_select">
        <div className="controller-container__label control-select__label controller-label">
          Table
        </div>
        <div className="bp3-control-group bp3-numeric-input">
          <div className="bp3-input-group">
            <input type="text"
                   id="mapper-source"
                   onChange={(e)=>{
                     const value = e.target.value
                     this.changeByPath(value,'table');
                   }}
                   className="bp3-input"
                   value={table}/>
          </div>

        </div>
      </div>
      <div className="controller-container controller-container_select">
        <div className="controller-container__label control-select__label controller-label">
          Column
        </div>
        <div className="bp3-control-group bp3-numeric-input">
          <div className="bp3-input-group">
            <input type="text"
                   id="mapper-source"
                   onChange={(e)=>{
                     const value = e.target.value
                     this.changeByPath(value, 'column');
                   }}
                   className="bp3-input"
                   value={column}/>
          </div>

        </div>
      </div>
      </>)
  }
  render() {
    const {
      settings = {},
    } = this.props
    const {
      label,
    } = settings

    return(
      <div className="controllers-wrapper validator-rule-settings-wrapper">
        <div className="controller-container controller-container_select">

          <div className="controller-container__label control-select__label controller-label">
            Rule {label}
          </div>
        </div>
        {this.mbShowMessage()}
        {this.mbRenderFieldSettings()}
        {this.mbRenderRegexSettings()}
        {this.mbRenderMaxSettings()}
        {this.mbRenderMinSettings()}
        {this.mbRenderTableColumnSettings()}

      </div>
    )
  }
}

export default ValidatorRuleSettings
