import React, { Component } from "react";

import { connect } from "react-redux";
import { editElement } from "../../store/altrp-dashboard/actions";
import ChooseWidget from "./ChooseWidget";

const mapStateToProps = state => {
  return { editElement: _.cloneDeep(state.editElement) };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class WidgetPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editElement: _.cloneDeep(props.editElement),
      cardName: this.props.editElement?.settings?.name
    };
    this.setCardName = this.setCardName.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
      if (this.props.addItemPreview) {
        this.setState(state => ({
          ...state,
          editElement: _.cloneDeep(this.props.editElement)
        }));
      } else {
        this.setState(state => ({
          ...state,
          editElement: _.cloneDeep(this.props.editElement)
        }));
      }
    }
    if (
      JSON.stringify(prevProps.editElement?.settings?.params) !==
      JSON.stringify(this.props.editElement?.settings?.params)
    ) {
      this.setState(state => ({
        ...state,
        editElement: _.cloneDeep(this.props.editElement),
        cardName: this.props.editElement?.settings?.name
      }));
    }

    if (
      !_.isEqual(
        prevProps.editElement?.settings?.name,
        this.props.editElement?.settings?.name
      )
    ) {
      if (this.props.addItemPreview) {
        this.setState(state => ({
          ...state,
          editElement: _.cloneDeep(this.props.editElement),
          cardName: this.props.editElement?.name
        }));
      } else {
        this.setState(state => ({
          ...state,
          editElement: _.cloneDeep(this.props.editElement),
          cardName: this.props.editElement?.settings?.name
        }));
      }
    }
  }

  //Обновляем название диаграммы
  setCardName(e) {
    const value = e.target.value;
    this.setState(s => ({ ...s, cardName: value }));
    this.props.setCardName(value, this.props.editElement);
  }

  render() {
    if (!_.isEmpty(this.state.editElement)) {
      return (
        <div className="drawer-preview">
          <div className="drawer-preview__container">
            {!this.props.addItemPreview ? (
              <div className="title">
                <input
                  type="text"
                  onChange={this.setCardName}
                  value={this.state.cardName}
                  placeholder="Введите название диаграммы"
                />
              </div>
            ) : (
              <div className="title">
                <input
                  type="text"
                  // onChange={this.setCardName}
                  value={
                    this.props.editElement?.settings?.name ||
                    this.state.cardName
                  }
                  placeholder="Введите название диаграммы"
                />
              </div>
            )}

            <div className="drawer-preview__container-content">
              <ChooseWidget
                sources={_.cloneDeep(this.props.editElement?.settings?.sources)}
                params={_.cloneDeep(this.props.editElement?.settings?.params)}
                type={_.cloneDeep(this.props.editElement?.settings?.type)}
                editElement={_.cloneDeep(this.props.editElement)}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="drawer-preview">
        <div className="drawer-preview__container">
          <div className="drawer-preview__container-content">
            <div className="chart-container">
              <div>Начните настраивать виджет</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetPreview);
