import React, {Component} from "react";
import {Alignment, Button, Checkbox, ControlGroup, HTMLSelect, InputGroup, MenuItem, TextArea} from "@blueprintjs/core";
import PROPERTY_OPTIONS from "../../const/PROPERTY_OPTIONS";
import VALUES_OPTIONS from "../../const/VALUES_OPTIONS";
import {Select} from "@blueprintjs/select";
import METHODS_OPTIONS from "../../const/METHODS_OPTIONS";
import MethodEditComponent from "./MethodEditComponent";
import altrpRandomId from "../../../../../front-app/src/js/helpers/functions/altrp-random-id";
import SESSION_OPTIONS from "../../const/methods-options/SESSION_OPTIONS";
import USER_OPTIONS from "../../const/methods-options/USER_OPTIONS";
import mutate from "dot-prop-immutable";
import isAltrpJS from "../../helpers/isAltrpJS";
import NODE_JS_METHODS_OPTIONS from "../../const/node-js/NODE_JS_METHODS_OPTIONS";

class PropertyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.textareaRef = React.createRef();
  }

  onChange = (e) => {
    if (this.props.changeByPath && this.props.path) {
      this.props.changeByPath(e.target.value, `${this.props.path}.path`)
    } else if (this.props.onChange) {
      this.props.onChange(e)
    }
  }
  onTextareaChange = (e) => {
    if (this.props.changeByPath && this.props.path) {
      let path = isAltrpJS()?`${this.props.path}.JSExpression`:  `${this.props.path}.expression`
      this.props.changeByPath(e.target.value,path)
    } else if (this.props.onChange) {
      this.props.onChange(e)
    }
  }
  onSelect = (e) => {
    if (this.props.changeByPath && this.props.path) {

      const newParameters = [];
      let objSelect = this.props.property
      objSelect = mutate.set(objSelect, 'namespace', e.target.value )
      objSelect = mutate.set(objSelect, 'method', '' )
      objSelect = mutate.set(objSelect, 'methodSettings.parameters', newParameters )

      this.props.changeByPath(objSelect, `${this.props.path}`)


      // this.props.changeByPath(e, `${this.props.path}.namespace`)
      //
      // this.props.changeByPath('', `${this.props.path}.method`)
      // const newParameters = [];
      // this.props.changeByPath(newParameters, `${this.props.path}.methodSettings.parameters`)
    } else if (this.props.onSelect) {
      this.props.onSelect(e)
    }
  }
  /**
   * При изменении метода нужно передеать массив из пустых параметров для их настройки в MethodEditComponent
   * @param v
   */
  onItemSelect = (v) => {
    if (this.props.changeByPath && this.props.path) {
      this.props.changeByPath(v.value, `${this.props.path}.method`)
      const newParameters = [];
      v?.parameters?.forEach(() => {
        newParameters.push({
          id: altrpRandomId()
        })
      })
      this.props.changeByPath(newParameters, `${this.props.path}.methodSettings.parameters`)
    } else if (this.props.onItemSelect) {
      this.props.onItemSelect(v.value)
    }
  }

  /**
   *
   */
  awaitOnToggle = (e) =>{
    let value =  e.target.checked
    if (this.props.changeByPath && this.props.path) {
      this.props.changeByPath(value, `${this.props.path}.awaitOn`)
    } else if (this.props.onItemSelect) {
      this.props.onItemSelect(v.value)
    }
  }
  textAreaSize = () => {
    if (this.textareaRef.current) {
      let sizeHeight = String(this.textareaRef.current.offsetHeight) + 'px'
      this.props.changeByPath(sizeHeight, `${this.props.path}.size`)
    }
  }

  componentDidMount() {
    document.body.addEventListener('mouseup', this.textAreaSize)
    const { size } = this.props.property;
    if (this.textareaRef.current) {
      this.textareaRef.current.style.height = size
    }
    return () => {
      document.body.removeEventListener('mouseup', this.textAreaSize)
    }
  }

  itemRenderer = (item, {handleClick, modifiers}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const {method} = this.props.property;
    return <MenuItem
      text={item.label}
      active={item.value === method}
      onClick={handleClick}
      label={item.objectInstance || ''}
      key={item.value}/>
  }
  onQueryChange = (query, value) => {
    let querySplit = query.split(' ')
    return (
      querySplit.length === 1 ?
      value.label.toLowerCase().indexOf(query.toLowerCase()) >= 0 || String(value.objectInstance).toLowerCase().indexOf(query.toLowerCase()) >= 0
        :
        value.label.toLowerCase().indexOf(querySplit[0].toLowerCase()) >= 0 && String(value.objectInstance).toLowerCase().indexOf(querySplit[1].toLowerCase()) >= 0
    );
  }

  render() {
    let options = [];

    const {namespace, path, method, expression, awaitOn, JSExpression} = this.props.property;
    let _expression = isAltrpJS() ? (JSExpression || '') : (expression || '')
    let placeholder = isAltrpJS() ? 'Javascript expression' : 'php expression'

    const {type, withoutMethods} = this.props;
    switch (type) {
      case 'value': {
        options = VALUES_OPTIONS
      }
        break
      default: {
        options = PROPERTY_OPTIONS
      }
    }
    let showMethod = false;
    let methodOptions = isAltrpJS() ? NODE_JS_METHODS_OPTIONS : METHODS_OPTIONS
    let {showMethodEdit} = this.state;
    if (namespace === 'context'
      || namespace === 'this'
      || ! namespace
    ) {
      showMethod = true;
    }
    if(namespace === 'session' && ! path) {
      showMethod = true;
      methodOptions = [ {value: '', label: 'None'}, ...SESSION_OPTIONS ];
    }

    if(namespace === 'current_user') {
      showMethod = true;
      methodOptions = [ {value: '', label: 'None'}, ...USER_OPTIONS];
    }
    let buttonText = 'None'
    const currentMethod = (isAltrpJS() ? NODE_JS_METHODS_OPTIONS : METHODS_OPTIONS).find(o => o.value == method);
    if (currentMethod?.objectInstance) {
      buttonText = `${currentMethod?.objectInstance}::${currentMethod?.label || ''} (${namespace || ''}${path ? '.' + path : ''})${expression ? ', expression' : ''}`
    }

    return <>
      <div className="element-index element-index_top">
        <HTMLSelect options={options} onChange={this.onSelect} value={namespace || ''}/>
        {namespace !== 'expression' &&
        <InputGroup fill={true}
                    placeholder="property"
                    onChange={this.onChange}
                    value={path || ''}/>}
        {namespace === 'expression' &&
        // <TextArea fill={true}
        //           placeholder="php expression"
        //           inputRef={this.textareaRef}
        //           onChange={this.onTextareaChange}
        //           growVertically={true}
        //           value={expression || ''}/>
        <textarea value={_expression}
                  onChange={this.onTextareaChange}
                  placeholder={placeholder}
                  ref={this.textareaRef}
                  className="textarea-custom"
        />
        }
      </div>
      {!withoutMethods && showMethod &&
        <React.Fragment>
          {isAltrpJS() && method &&
          <Checkbox
            checked={!!awaitOn}
            onChange={this.awaitOnToggle}
            className="mr-2"
            label="Await"/>}
          <div className="element-index element-index_bottom">
            <Select items={methodOptions}
                    onItemSelect={this.onItemSelect}
                    noResults={<MenuItem disabled={true} text="No results."/>}
                    itemPredicate={this.onQueryChange}
                    matchTargetWidth={true}
                    fill={true}
                    popoverProps={{
                      minimal: true,
                      fill: true,
                    }}
                    itemRenderer={this.itemRenderer}
            >
              <Button
                fill={true}
                alignText={Alignment.LEFT}
                text={buttonText}
                className="button-one"
              />
            </Select>
            <Button
              disabled={!method}
              text={'Edit'}
              className="button-two"
              onClick={this.methodEditToggle}
            />
          </div>
        </React.Fragment>}
      {!withoutMethods && method && currentMethod && <MethodEditComponent
        methodSettings={this.props.property?.methodSettings || {}}
        show={showMethod && showMethodEdit}
        method={currentMethod}
        methodEditToggle={this.methodEditToggle}
        changeByPath={this.props.changeByPath}
        path={`${this.props.path}.methodSettings`}/>}
    </>;
  }

  methodEditToggle = (e) => {
    e.preventDefault();
    this.setState(state => ({...state, showMethodEdit: !this.state.showMethodEdit}));
  }
}

export default PropertyComponent
