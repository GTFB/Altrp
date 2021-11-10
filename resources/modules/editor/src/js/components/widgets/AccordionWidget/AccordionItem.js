import {useEffect, useRef, useState} from "react";


function AccordionItem({idArray, idx, open, item, title_html_tag_accordion_content, icon, activeIcon, activeMode}) {

  const [accordionHeight, setAccordionHeight] = useState("0px")
  const content = useRef(null)

  const onAccordion = (e) => {
    setAccordionHeight(accordionHeight === "0px" ? content.current.scrollHeight + "px" : "0px")
    open(e);
  }

  useEffect(() => {
    if (activeMode) {
      setAccordionHeight(accordionHeight)
    } else {
      setAccordionHeight("0px")
    }
  }, [activeMode])


  return (

    <div className={"altrp-accordion-item" + (idArray[idx] ? ' active' : '')}>
      {/*button*/}
      <div className="altrp-accordion-item-button" data-key={idx} onClick={(e) => onAccordion(e)}>
        <div className="altrp-accordion-item-label-container">
          {
            React.createElement(
              title_html_tag_accordion_content,
              {
                className: "altrp-accordion-item-label"
              },
              [item.title_repeater]
            )
          }
        </div>
        {/*icon*/}
        <div className="altrp-accordion-item-icon">
          {idArray[idx] ? activeIcon : icon}
        </div>
      </div>
      {/*content*/}
      <div ref={content} style={{maxHeight: `${accordionHeight}`}} className="altrp-accordion-item-content"
           data-item={idx}>
        <div className="altrp-accordion-item-content-text" dangerouslySetInnerHTML={{__html: item.wysiwyg_repeater}}/>
      </div>
    </div>

  );
}

export default AccordionItem;
