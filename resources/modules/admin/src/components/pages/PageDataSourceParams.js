import React, {Component} from "react";
import {altrpRandomId, mbParseJSON} from "../../../../front-app/src/js/helpers";
import ParamItem from "./ParamItem";

class PageDataSourceParams extends Component {
  /**
   * Добавляем элемент
   */
  addItem=()=>{
    let parameters = mbParseJSON(this.props.parameters, []);
    parameters.push({
      required: false,
      paramName: '',
      paramValue: '',
      key: altrpRandomId(),
    });
    this.props.onChange(parameters)
  };
  render(){
    const parameters = mbParseJSON(this.props.parameters, []) ;
    return <div className="page-data-source-params">
      {
        parameters.map((param, idx)=>{
          return <ParamItem param={param}
                            onChange={param=>{
                              let _parameters = [...parameters];
                              _parameters[idx] = param;
                              this.props.onChange(_parameters);
                            }}
                            onDelete={()=>{
                              let _parameters = [...parameters];
                              _parameters.splice(idx, 1);
                              this.props.onChange(_parameters);
                            }}
                            key={param.key}/>
        })
      }
      <div className="d-flex justify-content-end">
        <button className="btn btn_success"
                onClick={this.addItem}
                type="button">+</button>
      </div>
    </div>
  }
}

export default PageDataSourceParams