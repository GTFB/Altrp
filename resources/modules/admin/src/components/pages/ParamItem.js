import React, {Component} from "react";
import TimesIcon from '../../svgs/times.svg'
class ParamItem extends Component {

  /**
   * Меняем значение параметра
   */
  changeValue=(e)=>{
    const param = {...this.props.param, paramValue: e.target.value || ''};
    this.props.onChange(param)
  };
  /**
   * Меняем имя параметра
   */
  changeName=(e)=>{
    const param = {...this.props.param, paramName: e.target.value || ''};
    this.props.onChange(param)
  };
  /**
   * Меняем обязательность параметра
   */
  changeRequired=(e)=>{
    const param = {...this.props.param, required: e.target.checked};
    this.props.onChange(param)
  };
 render(){
   return <div className="param-item pb-2">
     <button type="button"
             className="close"
             aria-label="Delete"
             onClick={this.props.onDelete}>
       <TimesIcon/>
     </button>
     <input type="text"
            className="form-control form-control-sm ml-0 mb-1"
            onChange={this.changeName}
            value={this.props.param.paramName || ''}
            placeholder="Parameter Name"/>
     <input type="text"
            className="form-control  form-control-sm ml-0"
            onChange={this.changeValue}
            value={this.props.param.paramValue || ''}
            placeholder="Parameter Value"/>
     <div className="d-flex mt-1 align-items-center">
       <input type="checkbox"
              className="form-check-input mr-1 ml-0 mt-0 position-static"
              id={this.props.param.key}
              onChange={this.changeRequired}
              checked={this.props.param.required}/>
       <label htmlFor={this.props.param.key}
              className="form-check-label">Required</label>
     </div>
   </div>
 }
}

export default ParamItem