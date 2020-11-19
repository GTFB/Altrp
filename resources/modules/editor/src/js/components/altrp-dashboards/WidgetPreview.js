import React, { Component, Suspense } from "react";

import { connect } from "react-redux";
import { editElement } from "../../store/altrp-dashboard/actions";
import ChooseWidget from "./ChooseWidget";

const mapStateToProps = state => {
  return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class WidgetPreview extends Component {
  constructor(props) {
    super(props);
    let element = _.cloneDeep(props.editElement, []);
    this.state = {
      editElement: element
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !_.isEqual(prevProps.editElement, this.props.editElement) ||
      JSON.stringify(prevProps.editElement.settings.params) !==
        JSON.stringify(this.props.editElement.settings.params)
    ) {
      let element = _.cloneDeep(this.props.editElement, []);
      this.setState(state => ({ ...state, editElement: element }));
    }
  }

  //Обновляем название диаграммы
  setCardName(name) {
    this.props.setCardName(name, this.props.editElement);
  }

  render() {
    if (!_.isEmpty(this.props.editElement)) {
      return (
        <div className="drawer-preview">
          <div className="drawer-preview__container">
            <div className="title">
              <input
                type="text"
                onChange={e =>
                  this.setCardName(e.target.value, this.props.editElement)
                }
                value={this.props.editElement.settings.name}
                placeholder="Введите название диаграммы"
              />
            </div>
            <div className="drawer-preview__container-content">
              <ChooseWidget
                sources={this.props.editElement.settings.sources}
                params={this.props.editElement.settings.params}
                type={this.props.editElement.settings.type}
                editElement={this.props.editElement}
              />
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetPreview);
