import {connect} from "react-redux";
import React, {Component} from "react";
import TimesIcon from '../svgs/times.svg';
import store from "../js/store/store";
import {toggleModal} from "../js/store/modal-settings/actions";
import CloseModal from "./../svgs/clear_black.svg"
import {Checkbox, InputGroup} from "@blueprintjs/core";


class AdminModal extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.storeSubscribe = this.storeSubscribe.bind(this);
    this.submit = this.submit.bind(this);
    this.formData = {};
    props.fields.forEach(field=>{
      if(field.defaultValue){
        this.formData[field.name] = field.defaultValue;
      }
    });
    this.state = {
      errors: [],
    };
    store.subscribe(this.storeSubscribe);
  }
  storeSubscribe(){
    store.getState().modalSettings.fields.forEach(field=>{
      if(field.defaultValue){
        this.formData[field.name] = field.defaultValue;
      }
    });
  }
  submit() {
    let valid = true;
    let errors = this.props.fields.map(field => {
      if (field.required &&
          !this.formData[field.name]) {
        valid = false;
        return field.errorMessage || `Need complete this field`;
      }
    });
    if (! valid) {
      this.setState(state => {
        return {...state, errors}
      });
      return;
    }
    this.props.submit(this.formData).then(this.props.success)
  }

  changeValue(e, type) {
    let target = e.target;

    switch (type) {
      case "checkbox":
        this.formData[target.dataset.field] = target.checked;
        break;
      default:
        this.formData[target.dataset.field] = target.value;
    }

    let errors = [...this.state.errors];
    errors[target.dataset.error] = '';
    this.setState(state => {
      return {...state, errors}
    });
  }

  toggleModal() {
    store.dispatch(toggleModal());
  }

  render() {
    let modalClasses = 'admin-modal';
    if (this.props.active) {
      modalClasses += ' admin-modal_active';
    }
    return <div className={modalClasses}>
      <div className="admin-modal__bg" onClick={this.toggleModal}/>
      <div className="admin-modal-content">
        <button className="admin-modal__close" onClick={this.toggleModal}><CloseModal className="icon_modal"/></button>
        <div className="admin-caption">{this.props.title}</div>
        <div className="admin-modal-form form">
          {
            this.props.fields.map((field, idx) => {
              let input;

              switch (field.type) {
                case "select":
                  input = <InputGroup
                    type={field.type || 'text'}
                    className="form-control-blueprint form-control-blueprint__marginModal"
                    data-field={field.name}
                    data-error={idx}
                    defaultValue={field.defaultValue || ''}
                    onChange={this.changeValue}
                  />
                  break
                case "checkbox":
                  input = <Checkbox
                    defaultValue={field.defaultValue || false}
                    className="form-control-blueprint form-control-blueprint__marginModal"
                    data-field={field.name}
                    data-error={idx}
                    onChange={(e) => this.changeValue(e, "checkbox")}
                  />
                  break
                default:
                  input = <InputGroup
                    type={field.type || 'text'}
                    className="form-control-blueprint form-control-blueprint__marginModal"
                    data-field={field.name}
                    data-error={idx}
                    defaultValue={field.defaultValue || ''}
                    onChange={this.changeValue}
                  />
              }

              return <label className="form-label label__RobotoFont"
                            data-field={field.name}
                            key={field.name}>{field.label}
                {
                  input
                }
                {this.state.errors[idx] ? <span className="form-label__error">{this.state.errors[idx]}</span> : ''}
              </label>
            })
          }
          <div className="form-bottom">
            <button className="btn btn_success" onClick={this.submit}>{this.props.submitButton}</button>
          </div>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state.modalSettings
  };
}

export default connect(mapStateToProps)(AdminModal);
