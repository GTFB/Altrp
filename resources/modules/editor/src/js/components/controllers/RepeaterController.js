import React, { Component } from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";
import { iconsManager } from "../../helpers";
import Controller from "../../classes/Controller";
/**
 * @method _changeValue
 * @see {@link controller.js#_changeValue}
 * @member {object] props
 * @property {BaseElement} props.currentElement
 * @property {string} props.controlId
 */
class RepeaterController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    let items = props.default || [];
    items = this.getSettings(this.props.controlId) || items;
    items = items.map(item => {
      if (item.length === 0) {
        return {};
      }
      return item;
    });
    this.state = {
      items,
      show: true,
      activeItem: 0,
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  /**
   * Значение по умолчанию для @see {../../decorators/controller.js}
   * @return {array}
   */
  getDefaultValue() {
    return [];
  }
  /**
   * Изменяем знавение в итеме и передаем в текущий элемент
   */
  changeValue(itemIndex, controlId, value) {
    let newValue = [...this.state.items];
    newValue[itemIndex][controlId] = value;
    this._changeValue(newValue);
  }
  /**
   * Удаляет итем в повторителе
   */
  deleteItem(e) {
    let index = parseInt(e.currentTarget.dataset.itemindex);
    let items = [...this.state.items];
    items.splice(index, 1);
    this.setState(state => {
      return { ...state, items }
    }
    );
    this._changeValue(items);
  }
  /**
   * Задает активный итем в повторителе
   */
  setActiveItem(e) {
    let activeItem = parseInt(e.currentTarget.dataset.itemindex);
    this.setState(state => {
      return { ...state, activeItem }
    }
    );
  }

  /**
   * Добавляет новый пустой итем для повторителя
   */
  addItem() {
    let items = [...this.state.items];
    items.push({ id: this.state.items.length });
    this.setState(state => {
      return {
        ...state,
        activeItem: items.length - 1,
        items
      }
    });
    this._changeValue(items);
  }

  /**
   * При смене элемента, нужно заново взять значение репитера
   * @param {Object} prevProps
   */
  _componentDidUpdate(prevProps){
    /**
     *  если элемент другой обновим items
     */
    if(prevProps.currentElement.getId() !== this.props.currentElement.getId()){
      let items = prevProps.default || [];
      items = this.getSettings(this.props.controlId) || items;
      this.setState(state => ({...state, items}))
    }
  }

  render() {
    if (this.state.show === false) {
      return '';
    }
    return <div className='controller-container controller-container_repeater repeater'>
      <div className="control-header">
        <div className="controller-container__label">{this.props.label}</div>
      </div>
      <div className="repeater-fields">
        {
          this.state.items.map((item, idx) => {
            let itemClasses = ['repeater-item'];
            if (this.state.activeItem === idx) {
              itemClasses.push('repeater-item_open');
            }
            return <div className={itemClasses.join(' ')} key={idx}>
              <div className="repeater-item-tools">
                <div className="repeater-item__caption"
                  data-itemindex={idx}
                  onClick={this.setActiveItem}>Item #{idx + 1}</div>
                <button className="repeater-item__delete"
                  data-itemindex={idx}
                  onClick={this.deleteItem}>{iconsManager().renderIcon('times')}</button>
              </div>
              <div className="repeater-item-content">
                {
                  this.props.fields.map(field => {
                    let ControllerComponent = controllersManager.getController(field.type);
                    let controller = new Controller({ ...field, repeater: this, itemIndex: idx });
                    // value =
                    let value = item[field.controlId] || '';
                    return <ControllerComponent {...field}
                      repeater={this}
                      itemindex={idx}
                      key={field.controlId}
                      default={value}
                      controller={controller} />
                  })
                }
              </div>
            </div>
          })
        }
      </div>
      <div className="d-flex justify-center repeater-bottom">
        <button className="altrp-btn altrp-btn_gray d-flex align-items-center" onClick={this.addItem}>
          {iconsManager().renderIcon('plus', {
            className: 'altrp-btn__icon',
          })}
            Add Item
          </button>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}

export default connect(mapStateToProps)(RepeaterController);
