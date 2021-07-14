import React, { Component } from 'react';

class AltrpImageSelect extends Component {
  render() {
    const { options, changeHandler, isMultiple, value } = this.props;

    return <div className="altrp-image-select">
      {options?.map(option => <div key={option.id}
        className={`altrp-field altrp-field-container 
          ${(isMultiple && value.includes(option.value) || value === option.value ? "active" : "")}`}
        onClick={() => changeHandler(isMultiple ?
          value.includes(option.value) ? value.filter(item => item !== option.value) : [...value, option.value] :
          option.value)}
      >
        {option.image && <img src={option.image.url} width={"100%"} />}
        <div className="altrp-image-select__label">{option.label}</div>
      </div>)}
    </div>
  }
}
export default AltrpImageSelect;
