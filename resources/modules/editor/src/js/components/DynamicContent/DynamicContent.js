import React, {Component} from "react";
import './DynamicContent.scss';
import './../../../sass/altrp-menu.scss';
import {connect} from "react-redux";
import {closeDynamicContent} from "../../store/dynamic-content/actions";
import store from "../../store/store";
import {getCurrentElement} from "../../store/store";

/**
 * Класс реализующий список динамических данных для контроллера
 */
class DynamicContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [
          {
        modelName: 'page',
        title: 'Page',
        fields: [
              {
                fieldName: 'id',
                title: 'ID',
              },
              {
                fieldName: 'title',
                title: 'Title',
              },
              {
                fieldName: 'authorName',
                title: 'Author Name',
              },
              {
                fieldName: 'authorId',
                title: 'Author ID',
              },
            ]
          },
        ],
      };
    this.select = this.select.bind(this);
  }

  /**
   * Обработка клика по элемету
   */
  select(e){
    e.stopPropagation();
    let value = {};

    value.modelName = e.target.dataset.modelname;
    value.modelTitle = e.target.dataset.modeltitle;
    value.fieldName = e.target.dataset.fieldname;
    value.fieldTitle = e.target.dataset.fieldtitle;
    value.settingName = this.props.params.settingName;
    value.dynamic = true;
    this.props.params.onSelect(value);
    store.dispatch(closeDynamicContent());
    getCurrentElement().setModelsSettings(value);
  }

  getPositionProps(){
    let element = this.props.element;
    if(! element){
      return{top:0, left:7};
    }
    return{
      top: element.offsetTop + element.offsetHeight + 2,
      left:7
    };
  }

  render() {
    let classes = ['altrp-dynamic-content'];
    if(this.props.show){
      classes.push('altrp-dynamic-content_show')
    }

    return <div className={classes.join(' ')}  style={this.getPositionProps()}>
      <div className="altrp-menu">
        {
          this.state.models.map(model=>{
            return<div className="altrp-menu-group" key={model.modelName}>
              <div className="altrp-menu__title" key={model.modelName}>{model.title}</div>
              { model.fields.map(field=>(<div className="altrp-menu__item"
                                       data-fieldname={field.fieldName}
                                       data-fieldtitle={field.title}
                                       data-modelname={model.modelName}
                                       data-modeltitle={model.title}
                                       onClick={this.select}
                                       key={field.fieldName}>{field.title}</div>))}
            </div>
          })
        }
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state.dynamicContentState,
  };
}

export default connect(mapStateToProps)(DynamicContent);
