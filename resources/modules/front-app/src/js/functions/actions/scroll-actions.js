import getActionsElement from "../../helpers/get-actions-element";
import checkAppearBottomElement from "../../helpers/elements/check-appear-bottom-element";
import debounce from 'lodash.debounce';

const bottomAppearElements = document.querySelectorAll('[data-altrp-wrapper-appear-bottom-actions]');
const topAppearElements = document.querySelectorAll('[data-altrp-wrapper-appear-bottom-actions]');
if (bottomAppearElements.length || topAppearElements.length) {
  import(/* webpackChunkName: 'ActionsManager' */'../../classes/modules/ActionsManager')
}


function scrollActions(e) {

  const bottomAppearElements = document.querySelectorAll('[data-altrp-wrapper-appear-bottom-actions]');
  _.each(bottomAppearElements,
    el => {
      if (!window.actionsManager) {
        import(/* webpackChunkName: 'ActionsManager' */'../../classes/modules/ActionsManager')
        return
      }
      if (!checkAppearBottomElement(el)) {
        return
      }
      let {actions, element} = getActionsElement(el,
        'data-altrp-wrapper-appear-bottom-actions',
        'wrapper_appearB_actions',
        'appearB_actions'
      );

      if (el.dataset.wrapper_appearB_actions === 'inAction') {
        return
      }
      el.dataset.wrapper_appearB_actions = 'inAction'
      window.actionsManager.callAllWidgetActions(
        element.getIdForAction(),
        'wrapper_appearB_actions',
        actions,
        element
      )
      el.dataset.wrapper_appearB_actions = 'noAction'

    }
  )
}

export default debounce(scrollActions, 100)
