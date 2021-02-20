import rootElementEmailRender from "../renders/email/rootElementEmailRender";
import sectionElementEmailRender from "../renders/email/sectionElementEmailRender";
import buttonElementEmailRender from "../renders/email/buttonElementEmailRender";
import columnElementEmailRender from "../renders/email/columnElementEmailRender";
import headingElementEmailRender from "../renders/email/headingElementEmailRender";
import textElementEmailRender from "../renders/email/textElementEmailRender";
import imageElementEmailRender from "../renders/email/imageElementEmailRender";
import {isEditor} from "../../../../front-app/src/js/helpers";

/**
 * Отрисовка контента элемента для писем
 * @param component
 * @return {*}
 */
export function baseEmailRender(component){
  switch(component.props.element.getName()){
    case 'root-element':{
      return rootElementEmailRender.bind(component);
    }
    case 'section':{
      return sectionElementEmailRender.bind(component);
    }
    case 'column':{
      return columnElementEmailRender.bind(component);
    }
    case 'button':{
      return buttonElementEmailRender.bind(component);
    }
    case 'heading':{
      return headingElementEmailRender.bind(component);
    }
    case 'text':{
      return textElementEmailRender.bind(component);
    }
    case 'image':{
      return imageElementEmailRender.bind(component);
    }
  }
  return ()=>{
    if(isEditor()){
      return <div className="tba-placeholder">TBA</div>
    }
    return null
  };
}