import React from "react";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";

(window.globalDefaults = window.globalDefaults || []).push(`
   .altrp-input-pagination {
    display: flex;
    flex-wrap: wrap;
   }

   .altrp-input-pagination__item {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      background: rgba(125, 188, 255, 0.6);
    }
   }
`);

export default class InputPaginationWidget extends React.Component {
  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);

      console.log(props.element.getLockedSettings("values", []))
      this.state = {
        settings: {...props.element.getSettings()},
        values: props.element.getLockedSettings("values", []),
        value: props.element.getSettings("default_value")
      }
    }
  }

  /**
   * Изменение значения в виджете
   * @param val
   */
  onChange(value) {
    if(value !== this.state.value) {
      this.setState(
        state => ({
          ...state,
          value
        }),
        () => {
          this.dispatchFieldValueToStore(value, true)
        }
      );
    }
  }

  /**
   * Передадим значение в хранилище формы
   * @param {*} value
   * @param {boolean} userInput true - имзенилось пользователем
   */
  dispatchFieldValueToStore = async (value, userInput = false) => {

    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();

    if (_.isObject(this.props.appStore) && fieldName && formId) {
      this.props.appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );

      if (userInput) {
        const change_actions = this.props.element.getSettings("change_actions");

        if (change_actions && !isEditor()) {
          const actionsManager = (
            await import(
              /* webpackChunkName: 'ActionsManager' */
              "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
              )
          ).default;
          await actionsManager.callAllWidgetActions(
            this.props.element.getIdForAction(),
            "change",
            change_actions,
            this.props.element
          );
        }
      }
    }
  };

  render() {
    return (
      <div className="altrp-input-pagination">
        {
          this.state.values.map(item => (
            <button
              key={item.value}
              onClick={() => this.onChange(item.value)}
              className={"altrp-input-pagination__item" + (this.state.value === item.value ? " active" : "")}
            >
              { item.label }
            </button>
          ))
        }
      </div>
    );
  }
}
