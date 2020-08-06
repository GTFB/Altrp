import React, {Component} from "react";
import AreaPopup from "./AreaPopup";

class AreaComponent extends Component {
    render(){
      
      let classes = [`app-area`, `app-area_${this.props.id}`];
      /**
       * Если это попап
       */
      if (this.props.area.getTemplates().length){
        return <div className={classes.join(' ')}>{
          this.props.area.getTemplates().map(template=><AreaPopup key={template.id} template={template}/>)
        }</div>
      }
      /**
       * Если шаблон привязанный к странице удалили, то ничего не отрисовываем
       */
      if(! this.props.template.data){
        return<div className={classes.join(' ')}/>;
      }
      let rootElement  = window.frontElementsFabric.parseData(this.props.template.data, null, this.props.page, this.props.models);
      return <div className={classes.join(' ')}>{
        React.createElement(rootElement.componentClass,
            {
              element: rootElement,
              children: rootElement.children
            })
      }</div>
    }
}

export default AreaComponent