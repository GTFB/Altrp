import React from "react";
import EmptyStarInitial from "../../../svgs/empty-star.svg";
import StarInitial from "../../../svgs/star.svg";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import {isEditor, replaceContentWithData} from "../../../../../front-app/src/js/helpers";

const StarsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;

`

const Star = styled.li`
  cursor: pointer;
`

const EmptyStarIcon = styled(EmptyStarInitial)`

`;

const StarIcon = styled(StarInitial)`

`;



class StarsWidget extends Component {
  constructor(props) {
    super(props);

    const settings = props.element.getSettings();

    const defaultValue = parseInt(settings.default_value?.size || 0);

    this.state = {
      settings,
      value: defaultValue
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }


    this.dispatchFieldValueToStore(defaultValue);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(idx) {
    let value = idx+1;

    if(this.state.value === value) {
      value = 0
    }

    this.setState((s) => ({
      ...s,
      value
    }), () => {
      this.dispatchFieldValueToStore(value, true)
    });
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
    const countNumber = parseInt(this.props.element.getContent("count")?.size) || 1;
    const count = new Array(countNumber).fill("", 0, countNumber);
    const value = this.getValue();

    return (
      <StarsList className="altrp-stars-list">
        {
          count.map((count, idx) => {
            const active = value-1 >= idx
            return <Star
              onClick={() => this.handleClick(idx)}
              className={"altrp-stars-star" + (active ? " active" : "")}
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
