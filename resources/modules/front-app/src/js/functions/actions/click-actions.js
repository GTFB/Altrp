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

  if(e.target.classList){
    console.log(e.target.classList)
  }

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
    e.stopPropagation();
    import(/* webpackChunkName: 'ActionsManager' */'../../classes/modules/ActionsManager').then(()=>{
      const target = e.target.closest('.altrp-btn')

      const loader = document.createElement('div')

      if(target.getAttribute('data-with-loader')){
        target.appendChild(loader)

        target.classList.add('position-relative')
        target.classList.add('overflow-hidden')

        loader.classList.add('altrp-loader')
        loader.addEventListener('click', e=>{
          e.stopPropagation()
          e.preventDefault()
        })
        loader.innerHTML = `
    <div role="progressbar" class="bp3-spinner">
      <div class="bp3-spinner-animation">
        <svg width="25" height="25" stroke-width="16.00"
             viewBox="-3.00 -3.00 106.00 106.00">
          <path class="bp3-spinner-track"
                                                   d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"></path><path
          class="bp3-spinner-head" d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" pathLength="280"
          stroke-dasharray="280 280" stroke-dashoffset="210"></path></svg>
      </div>

    </div>
  `
      }
      window.actionsManager.callAllWidgetActions(
        element.getIdForAction(),
        ag.settingName,
        actions,
        element
      ).finally(()=>{
        loader.remove()
        target.classList.remove('position-relative')
        target.classList.remove('overflow-hidden')
      })
    })
  })
}
