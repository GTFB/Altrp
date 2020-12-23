import React from 'react';
import { getDataByPath } from './../helpers';

class AdminBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopupTemplate: false,
      valueInput: "",
    }
    this.popupTemplateRef = React.createRef();
    this.toggleVisiblePopupTemplate = this.toggleVisiblePopupTemplate.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleOutsideClick);
  }

  toggleVisiblePopupTemplate() {
    this.setState(state => ({
      ...state,
      visiblePopupTemplate: !state.visiblePopupTemplate,
    }));
  }

  openTemplate(id) {
    return () => window.open(`admin/editor?template_id=${id}`, '_blank');
  }

  handleInput(event) {
    console.log(getDataByPath("altrpuser.name"));
    let value = event.target.value;
    this.setState(state => ({
      ...state,
      valueInput: value,
    }));
  }

  handleOutsideClick(event) {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(this.popupTemplateRef.current)) {
      this.setState(state => ({
        ...state,
        visiblePopupTemplate: false,
      }));
    }
  }

  render() {
    return (
      <div className="admin-bar">
        <div className="admin-bar__tools">
          <div className="admin-bar__tool">
            <span onClick={this.toggleVisiblePopupTemplate}>
              {iconsManager.renderIcon('admin-bar1', {className: "admin-bar__tool-svg"})} edit-template
            </span>
            
            {this.state.visiblePopupTemplate && (
              <div className="admin-bar__popup-template" ref={this.popupTemplateRef}>
                {this.props.areas.map((item, index) => {
                  if(item.id === "popups") 
                    return (
                      <div className="admin-bar__popup-template-item" key={`template-${index}`}>
                          popup: {iconsManager.renderIcon('chevron-admin-bar', {className: "admin-bar__popup-template-chevron"})}
                        <div className="admin-bar__popup-popups-items">
                          {item.templates.map((item, index) => (
                            <div className="admin-bar__popup-popups-item" onClick={this.openTemplate(item.id)} key={`popup-${index}`}>
                              {item.name}
                            </div>  
                          ))}
                        </div>
                      </div>
                    )
                  else 
                    return (
                      <div className="admin-bar__popup-template-item" key={`template-${index}`} onClick={this.openTemplate(item.template.id)}>
                        {item.template.name} 
                      </div>
                    )
                })}
              </div>
            )}
          </div>
          <div className="admin-bar__tool">
            {iconsManager.renderIcon('admin-bar2', {className: "admin-bar__tool-svg"})} page-settings
          </div>
          <div className="admin-bar__tool">
            {iconsManager.renderIcon('admin-bar3', {className: "admin-bar__tool-svg"})} clear cache
          </div>
          <div className="admin-bar__search-bar">
            <input 
              className="admin-bar__search"
              value={this.state.valueInput}
              onChange={this.handleInput}
            />
            <button className="admin-bar__button">test</button>
          </div>
        </div>
        <div className="admin-bar__profile">
          Hello, {this.props.admin.name} {iconsManager.renderIcon('admin-bar4', {className: "admin-bar__profile-svg"})}
        </div>
      </div>
    );
  }
}

export default AdminBar;