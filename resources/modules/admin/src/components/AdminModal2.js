import React, { Component } from "react";
import CloseIcon from './../svgs/clear_black.svg';

class AdminModal2 extends Component {
  render() {
    const { closeHandler, children } = this.props;

    return ReactDOM.createPortal(<div className="admin-modal admin-modal_active">
      <div className="admin-modal__bg" onClick={closeHandler} />
      <div className="admin-modal-content">
        <button className="admin-modal__close" onClick={closeHandler}><CloseIcon className="icon icon-fill" /></button>
        {children}
      </div>
    </div>, document.body)
  }
}

export default AdminModal2;
