import React from "react";
import EmptyStarInitial from "../../../svgs/empty-star.svg";
import StarInitial from "../../../svgs/star.svg";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";

const StarsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;

`

const Star = styled.li`
  cursor: pointer;

  & svg {
    transition: none
  }
`

const EmptyStarIcon = styled(EmptyStarInitial)`

`;

const StarIcon = styled(StarInitial)`
`;



class StarsWidget extends Component {
  constructor(props) {
    super(props);

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }

    const settings = props.element.getSettings();

    let defaultValue = this.getLockedContent(
      "default_value"
    );

    if(!isNaN(defaultValue)) {
      defaultValue = _.parseInt(defaultValue) || -1;
    } else {
      defaultValue = -1
    }

    this.state = {
      settings,
      value: defaultValue,
      changed: false,
    };

    this.dispatchFieldValueToStore(defaultValue || 0);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(idx) {
    let value = idx+1;

    if(this.state.value === value) {
      value = 0
    }

    this.setState((s) => ({
      ...s,
      changed: true,
      value
    }), () => {
      this.dispatchFieldValueToStore(value, true)
    });
  }

  _componentDidUpdate(previousProps, previousState) {
    if(this.state.settings.default_value !== previousState.settings.default_value) {
      let defaultValue = this.getLockedContent(
        "default_value"
      );

      if(!isNaN(defaultValue)) {
        defaultValue = _.parseInt(defaultValue) || -1;
      } else {
        defaultValue = -1
      }

      this.setState((s) => ({
        ...s,
        value: defaultValue
      }))

      this.dispatchFieldValueToStore(defaultValue || 0);

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
    if (fieldName.indexOf("{{") !== -1) {
      fieldName = replaceContentWithData(fieldName);
    }

    if (_.isObject(this.props.appStore) && fieldName && formId) {
      this.props.appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );
      if (userInput) {
        const change_actions = this.props.element.getLockedSettings("change_actions");

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

  /**
   *
   * @returns {string}
   */
  getValue = () => {
    let value;
    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();
    if (isEditor()) {
      value = this.state.value;
    } else {
      value = _.get(appStore.getState().formsStore, `${formId}`, '')
      value = _.get(value, fieldName, '')
    }
    return value;
  }

  render() {
    const countNumber = parseInt(this.props.element.getLockedContent("count")?.size) || 1;
    const count = new Array(countNumber).fill("", 0, countNumber);
    const value = this.getValue();
    let visualValue = this.getLockedContent("second_default_value");

    if(!isNaN(visualValue)) {
      visualValue = _.parseInt(visualValue) || 0;
    } else {
      visualValue = 0
    }

    return (
      <StarsList className="altrp-stars-list">
        {
          count.map((count, idx) => {
            let active = value-1 >= idx

            if(!this.state.changed && this.state.value === -1 ) {
              active = _.parseInt(visualValue)-1 >= idx
            }

            return <Star
              onClick={() => this.handleClick(idx)}
              className={"altrp-stars-star" + (active ? " active" : "") + (!this.state.changed ? " altrp-stars-visual" : "")}
              acitve={active}
              key={idx}
            >
              {
                active ? <StarIcon/> : <EmptyStarIcon/>
              }
            </Star>
          })
        }
      </StarsList>
    );
  }
}

export default StarsWidget;
