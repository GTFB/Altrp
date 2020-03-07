import React, {Component} from "react";
import {connect} from "react-redux";

class ElementWrapper extends Component {

  render() {
    let classes = `altrp-element altrp-element${this.props.element.getId()} altrp-element_${this.props.element.getType()}`;
    let overlayClasses = `overlay`;
    if (this.props.element.getType() === 'widget' && this.props.currentElement === this.props.element) {
      classes += ' altrp-element_current';
    }
    let editText = `Edit ${this.props.element.getTitle()}`;
    let duplicateText = `Duplicate ${this.props.element.getTitle()}`;
    return <div className={classes}>
      <div className={overlayClasses}>
        <div className="overlay-settings">
          <button className="overlay-settings__button overlay-settings__button_add " title="Add Section"/>
          <button className="overlay-settings__button overlay-settings__button_edit " title={editText}/>
          <button className="overlay-settings__button overlay-settings__button_duplicate " title={duplicateText}/>
          <button className="overlay-settings__button overlay-settings__button_delete " title="Delete Section"/>
        </div>
      </div>
      {
        React.createElement(this.props.component, {
          element: this.props.element,
          children: this.props.element.getChildren(),
        })
      }
    </div>

  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement
  };
}

export default connect(mapStateToProps)(ElementWrapper);
