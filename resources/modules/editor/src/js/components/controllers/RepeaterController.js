import {controllerMapStateToProps} from "../../decorators/controller";
import React, {Component,} from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";
import {getTemplateType, iconsManager} from "../../helpers";
import Controller from "../../classes/Controller";
import update from "immutability-helper";
import { useDrag, useDrop } from "react-dnd";
import PlusIcon from './../../../svgs/plus.svg';

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
    this.duplicateItem = this.duplicateItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  /**
   * Получить итем по ИД
   * @param {int} id
   */
  getItem(id) {
    return this.state.items[Number(id)] || null;
  }
  /**
   * Значение по умолчанию для @see {../../decorators/controller.js}
   * @return {array}
   */
  getDefaultValue() {
    return [];
  }
  /**
   * Изменяем значение в итеме и передаем в текущий элемент
   */
  changeValue(itemIndex, controlId, value) {
    let newValue = [...this.state.items];
    // newValue[itemIndex] = {...newValue[itemIndex]};
    newValue[itemIndex][controlId] = value;
    // console.log(controlId);
    // console.log(newValue[itemIndex][controlId]);
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
   * Копируем итем в повторителе
   */
  duplicateItem(e) {
    let index = parseInt(e.currentTarget.dataset.itemindex);
    let copyItem = this.state.items[index];

    let items = update(this.state.items, {
      $splice: [
        [index, 0, copyItem]
      ]
    });
    items = items.map((item, index) => {
      return {...item, id: index}
    });
    this.setState(state => {
      return { ...state, items }
    });
    this._changeValue(items);
  }
  /**
   * Перетаскиваем итем в повторителе
   */
  moveItem(dragIndex, hoverIndex) {
    const dragItem = this.state.items[dragIndex];
    let items = update(this.state.items, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItem],
      ],
    });
    this.setState(state => {
      return { ...state, items }
    });
    this._changeValue(items);
  }
  /**
   * Задает активный итем в повторителе
   */
  setActiveItem(e) {
    if(e) {
      let activeItem = parseInt(e.currentTarget.dataset.itemindex);
      if(this.state.activeItem === activeItem) {
        this.setState(state => {
          return {...state, activeItem: undefined }
        })
      } else {
        this.setState(state => {
          return { ...state, activeItem }
        });
      }
    } else {
      this.setState(state => {
        return { ...state, activeItem: undefined }
      });
    }
  }

  /**
   * Добавляет новый пустой итем для повторителя
   */
  addItem() {
    let items = [...this.state.items];
    let id = '_' + Math.random().toString(36).substr(2, 9);
    items.push({ id });
    items[items.length - 1].switch_slides_repeater = false;
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
              return <RepeaterItem
                itemClasses={itemClasses}
                thisController={this}
                itemController={item}
                fields={this.props.fields}
                idx={idx}
                key={item.id}
              />
            })
          }
      </div>

      <div className="d-flex justify-center repeater-bottom">
        <button className="altrp-btn_action altrp-btn_gray d-flex align-items-center" onClick={this.addItem}>
            <PlusIcon width={16} height={16} className='altrp-btn__icon'/>
            <div className="altrp-btn_action-text">Add Item</div>
          </button>
      </div>
    </div>
  }
}

const RepeaterItem = ({thisController, itemClasses, idx, itemController, fields: _fields}) => {
  const {setActiveItem, duplicateItem, deleteItem, moveItem} = thisController;
  const ref=React.useRef(null);
  const fields = React.useMemo(()=>{
    return thisController.props.fields.filter(field=>{
      return ! (getTemplateType() === 'email' && field.hideOnEmail)
    })
  }, [thisController, _fields]);
  const [collectedProps, drop] = useDrop(()=>({
    accept: "item",
    drop(item, monitor) {
      throw 'template'

    },
    hover(item, monitor) {
      console.log(monitor);
      // if (!ref.current) {
      //   return;
      // }
      const dragIndex = item.idx;
      const hoverIndex = idx;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.idx = hoverIndex;
    },
  }));
  const [collected, drag, dragPreview ] = useDrag(() =>{
    return{
      item: { idx },
      type: 'item',
      isDragging: (monitor) => {
        console.log(monitor);
      },
      collect: (monitor) => {
        return({
          isDragging: monitor.isDragging(),
        })},
    }}
  );
  const opacity = collected.isDragging ? 0 : 1;
  drop(drag(ref));
  return (
    <div className={itemClasses.join(' ')} style={{opacity}}>
      <div className="repeater-item-tools">
        <div className="repeater-item__caption"
          data-itemindex={idx}
          ref={ref}
          onDragStart={e=>{e.preventDefault();}}
          onDrag={e=>{e.preventDefault();}}
          onClick={setActiveItem}
        >Item #{idx + 1}</div>
        <button className="repeater-item__icon"
          data-itemindex={idx}
          onClick={duplicateItem}>{iconsManager().renderIcon('duplicate')}</button>
        <button className="repeater-item__icon"
          data-itemindex={idx}
          onClick={deleteItem}>{iconsManager().renderIcon('times')}</button>
      </div>
      <div className="repeater-item-content">
        {
          fields.map(field => {
            let ControllerComponent = controllersManager.getController(field.type);
            let controller = new Controller({ ...field, repeater: thisController, itemIndex: idx });
            let value = itemController[field.controlId] || '';
            let key  = `${thisController.props.controlId}_${field.controlId}`;
            return <ControllerComponent
              {...field}
              repeater={thisController}
              itemindex={idx}
              key={key}
              default={value}
              controller={controller}
            />
          })
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}

export default connect(controllerMapStateToProps)(RepeaterController);
