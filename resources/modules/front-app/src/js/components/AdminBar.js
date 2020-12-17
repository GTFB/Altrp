import React from 'react';

class AdminBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopupTemplate: false
    }
    let popupTemplate = React.createRef();

    this.toggleVisiblePopupTemplate = this.toggleVisiblePopupTemplate.bind(this);
  }

  toggleVisiblePopupTemplate() {
    this.setState(state => ({
      ...state,
      visiblePopupTemplate: !state.visiblePopupTemplate,
    }));
  }

  componentDidUpdate() {
    console.log(this.props);
    console.log(this.state)
  }

  render() {
    return (
      <div className="admin-bar">
        <div className="admin-bar__tools">
          <div className="admin-bar__tool" onClick={this.toggleVisiblePopupTemplate}>
            edit-template
            {this.state.visiblePopupTemplate && (
              <div className="admin-bar__popup-template">
                {this.props.areas.map(item => {
                  return (
                    <div className="admin-bar__popup-template-item">
                      {item.template.name}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className="admin-bar__tool">
            page-settings
          </div>
          <div className="admin-bar__tool">
            clear cache
          </div>
        </div>
        <div className="admin-bar__profile">
          Hello
        </div>
      </div>
    );
  }
}

export default AdminBar;