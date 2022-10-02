import getActionsElement from "../../helpers/get-actions-element";

const CLICK_EXCLUDE_TAG_NAMES = [
  // 'input',todo: выяснить нужно ли исключение
  // 'a',
  // 'button',
  // 'textarea',
  // 'select',
];


/**
 *
 * @param {PointerEvent} e
 */
export default function clickActions(e){
  let html_element = e.target;
  if(CLICK_EXCLUDE_TAG_NAMES.indexOf(e.target.tagName.toLowerCase()) >=0){
    return
  }

  const actionsGroups = [
    {
      attribute: 'data-altrp-button-click-actions',
      settingName: 'actions',
      actionPrefix: 'buttonClickActions',
    },
    {
      attribute: 'data-altrp-wrapper-click-actions',
      settingName: 'wrapper_click_actions',
      actionPrefix: 'clickActions',
    },
  ]
  actionsGroups.forEach(ag=>{
    let {actions, element} =
      getActionsElement(html_element,
        ag.attribute,
        ag.settingName,
        ag.actionPrefix,
      );

    if(! actions){
      return;
    }

    e.preventDefault();
    import(/* webpackChunkName: 'ActionsManager' */'../../classes/modules/ActionsManager').then(()=>{
      window.actionsManager.callAllWidgetActions(
        element.getIdForAction(),
        ag.settingName,
        actions,
        element
      )
    })
  })
}
