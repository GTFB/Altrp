import React, {Component} from "react";

class AreaComponent extends Component {
    render(){
      /**
       * Если шаблон привязанный к странице удалили, то ничего не отрисовываем
       */
      let classes = [`app-area`, `app-area_${this.props.id}`];
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