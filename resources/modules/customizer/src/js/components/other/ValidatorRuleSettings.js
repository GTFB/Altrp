import React, {Component} from "react";

class ValidatorRuleSettings extends Component {

  changeByPath=(value, path)=>{
    this.props.changeByPath(value, path)
  }
  mbRenderFieldSettings = ()=>{
    const names = [
      'confirmed',
      'requiredIfExists',
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
                     this.changeByPath(e.target.value, 'field');
                   }}
                   className="bp3-input"
                   value={field}/>
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
                     this.changeByPath(e.target.value, 'max');
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
                     this.changeByPath(e.target.value, 'min');
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
                     this.changeByPath(e.target.value, 'table');
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
                     this.changeByPath(e.target.value, 'column');
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
      message,
    } = settings

    return(
      <div className="controllers-wrapper validator-rule-settings-wrapper">
        <div className="controller-container controller-container_select">

          <div className="controller-container__label control-select__label controller-label">
            Rule {label}
          </div>
        </div>
        <div className="controller-container controller-container_select">
          <div className="controller-container__label control-select__label controller-label">
            Error Message
          </div>
          <div className="bp3-control-group bp3-numeric-input">
            <div className="bp3-input-group">
              <input type="text"
                     id="mapper-source"
                     onChange={(e)=>{
                       this.changeByPath(e.target.value, 'message');
                     }}
                     className="bp3-input"
                     value={message}/>
            </div>

          </div>
        </div>
        {this.mbRenderFieldSettings()}
        {this.mbRenderMaxSettings()}
        {this.mbRenderMinSettings()}
        {this.mbRenderTableColumnSettings()}

      </div>
    )
  }
}

export default ValidatorRuleSettings
