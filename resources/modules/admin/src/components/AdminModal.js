import {connect} from "react-redux";
import React, {Component} from "react";
import TimesIcon from '../svgs/times.svg';
import store from "../js/store/store";
import {toggleModal} from "../js/store/modal-settings/actions";



class AdminModal extends Component {
  constructor() {
    super();
    this.toggleModal = this.toggleModal.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.submit = this.submit.bind(this);
    this.formData = {};
    this.state= {
      errors: [],
    };
  }
  submit(){
    let valid = true;
    let errors = this.props.fields.map(field => {
      if(field.required &&
        ! this.formData[field.name]){
        valid = false;
        return field.errorMessage || `Need complete this field`;
      }
    });
    if(! valid){
      this.setState(state => {
        return{...state, errors}
      });
      return;
    }
    this.props.submit(this.formData).then(this.props.success)
  }
  changeValue(e) {
    let target =  e.target;
    this.formData[target.dataset.field] = target.value;
    let errors = [...this.state.errors];
    errors[target.dataset.error] = '';
    this.setState(state => {
      return {...state, errors}
    });
  }
  toggleModal(){
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
        <button className="admin-modal__close" onClick={this.toggleModal}><TimesIcon className="icon"/></button>
        <div className="admin-caption">{this.props.title}</div>
        <div className="admin-modal-form form">
          {
            this.props.fields.map((field, idx) => <label className="form-label"
                                                  data-field={field.name}
                                                  key={field.name}>{field.label}
                <input type={field.type || 'text'}
                       className="form__input"
                       data-field={field.name}
                       data-error={idx}
                       onChange={this.changeValue}/>
              {this.state.errors[idx] ? <span className="form-label__error">{this.state.errors[idx]}</span> : ''}
            </label>)
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
