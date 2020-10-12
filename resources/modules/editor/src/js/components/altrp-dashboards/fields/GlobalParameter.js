import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

class GlobalParameter extends Component {
      constructor(props) {
            super(props);
            this.state = {
              options: [],
            };
      }

      async componentDidMount() {
            const req = await axios(`/ajax/models/queries/${this.props.parameter.model}/${this.props.parameter.value}`);
            if(req.status === 200){
                  this.setState({
                        options: req.data.data
                  });
            }
            else{
                  this.setState({
                        options: []
                  });
            }
      }

      render(){
            return(
               <Form.Control
                 as="select"
                 className="global-select"
                 onChange={e=>{
                    this.props.setGlobalOption(this.props.parameter.value,e.target.value)
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                 custom
               >
                 <option value="">{this.props.parameter.label}</option>
                 {this.state.options.map(({ id, name, value, label },index) => (
                   <option key={index} value={value || id}>
                     {label || name}
                   </option>
                 ))}
               </Form.Control>
            );
      }
}

export default GlobalParameter;