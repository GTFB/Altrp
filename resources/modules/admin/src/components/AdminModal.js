import {connect} from "react-redux";
import React, {Component} from "react";
import TimesIcon from '../svgs/times.svg';
import store from "../js/store/store";
import {toggleModal} from "../js/store/modal-settings/actions";
import CloseModal from "./../svgs/clear_black.svg"


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

  changeValue(e) {
    let target = e.target;
    this.formData[target.dataset.field] = target.value;
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
            this.props.fields.map((field, idx) => <label className="form-label"
                                                         data-field={field.name}
                                                         key={field.name}>{field.label}
              {(field.type !== 'select') ?
                  <input type={field.type || 'text'}
                         className="form__input"
                         data-field={field.name}
                         data-error={idx}
                         defaultValue={field.defaultValue || ''}
                         onChange={this.changeValue}/> :
                  <select className="form__input"
                          data-field={field.name}
                          data-error={idx}
                          defaultValue={field.defaultValue || ''}
                          onChange={this.changeValue}>
                    <option value=""/>
                    {
                      field.options.map(option =>
                          <option key={option.id}
                                  value={option.id}
                                  children={option.title || option.name}/>)
                    }
                  </select>
              }
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
