import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName, titleToNameTwo} from "../../js/helpers";
import {InputGroup, MenuItem, Button, Alignment} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import {connect} from "react-redux";
import getAltrpLang from "../../js/helpers/get-altrp-lang";
import {set} from "dot-prop-immutable";
import toUpperSnakeCase from "../../js/helpers/functions/toUpperSnakeCase";



class PropForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelsOptions: [],
      value: {
      },
    };
    this.modelsResource = new Resource({route: '/admin/ajax/model_options'});
    this.propResource = new Resource({route: `/admin/ajax/models/${this.props.modelId}/settings/static_props`});
  }

  async componentDidMount() {

    if (this.props.modelID && this.props.prop_name) {
      let value = await this.propResource.get(this.props.prop_name);
      value = {
        prop_name: this.props.prop_name,
        prop_value: value.data
      }
      this.setState(state => ({...state, value}));
    } else {
      this.setState(state => ({...state, value: {}}));

    }
  }

  /**
   * Change value
   * @param {*} _value
   * @param {string} field
   */
  changeValue(_value, field) {
    let {value} = this.state
    if(field === 'prop_name'){
      _value = _value.replace(/[^a-zA-Z0-9]/g, "_");
    }
    if(field === 'prop_value'){
      _value = _value.replace(/`/g, '\`')
    }
    value = set(value, field, _value)
    this.setState(state=>({...state, value}))
  }


  /**
   * Отправка данных
   */
   submitHandler =async(e) => {
    e.preventDefault();
    const data = this.state.value;

    await this.propResource.put(data.prop_name, data);

    this.props.toggleModal();
  }

  render() {
    return <form className="admin-form admin-form-relation"
                 onSubmit={this.submitHandler}>

      <div className="form-group">
        <label htmlFor="relation-description">Prop Name</label>
        {/*<input type="text" id="relation-description" readOnly={id}*/}
        {/*  value={this.state.value.description || ''}*/}
        {/*  onChange={e => { this.changeValue(e.target.value, 'description') }}*/}
        {/*  className="form-control" />*/}

        <InputGroup type="text"
                    id="prop_name"
                    value={this.state.value.prop_name || ''}
                    onChange={e => {
                      this.changeValue(e.target.value, 'prop_name')
                    }}
                    className="form-control-blueprint"
        />
        <div className="form-group">
          <label htmlFor="relation-description">Prop Value</label>
          {/*<input type="text" id="relation-description" readOnly={id}*/}
          {/*  value={this.state.value.description || ''}*/}
          {/*  onChange={e => { this.changeValue(e.target.value, 'description') }}*/}
          {/*  className="form-control" />*/}

          <InputGroup type="text"
                      id="prop_value"
                      value={this.state.value.prop_value || ''}
                      onChange={e => {
                        this.changeValue(e.target.value, 'prop_value')
                      }}
                      className="form-control-blueprint"
          />
        </div>
      </div>
      <div className="btn__wrapper btn__wrapper-relations">
        <button className="btn btn_success" type="submit">Save</button>
        {/*<Link className="btn" to="/admin/tables/models">Cancel</Link>*/}
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }

}

const mapStateToProps = (state) => {
  return {
    modelID: state.modelsState.modelID,
    prop_name: state.modelsState.prop_name,
  }
}

export default connect(mapStateToProps)(PropForm);
