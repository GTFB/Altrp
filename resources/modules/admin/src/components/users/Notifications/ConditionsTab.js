import React, {Component} from "react";
import Compare from "./Compare";
import AltrpSelect from "../../altrp-select/AltrpSelect";


export default class ConditionsTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeCondition: {},
            isConditionOpened: false,
        };
        this.onSave = this.onSave.bind(this);
        this.onAction = this.onAction.bind(this);
        this.onActive = this.onActive.bind(this);
        this.onDisable = this.onDisable.bind(this);
        this.onExport = this.onExport.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
    }

    componentDidUpdate() {
        // Сворачивание формы, если удалён активный condition (activeCondition)
        const {activeCondition, isConditionOpened} = this.state;
        let condition = this.props.conditions ?? [];
        condition = _.filter(condition, s => s.id === activeCondition?.id);
        if(condition.length === 0 && isConditionOpened) this.setState(s => ({ ...s, isConditionOpened: false}));
    }    
       
    // Обработчик создания нового condition
    onSave(type = 'condition'){
        const conditionId = this.state.activeCondition?.id ?? 0;
        this.props.onSaveCondition(type, conditionId);
    }
    
    // Отправка данных от обработчиков родителю
    onAction(e, type, component = 'condition'){
        const conditionId = this.state.activeCondition?.id ?? 0;
        this.props.onActionCondition(e, type, component, conditionId);
    }

    // Обработчик нажатия на конкретный condition
    onActive(e){
        this.setState({ activeCondition: e,  isConditionOpened: true});
    }
    
    // Обработчик отключения condition
    onDisable(e){
        this.onAction(e, 'disable');
    }
    
    // Обработчик экспорта condition
    onExport(e){
    }
    
    // Обработчик удаления condition
    onDelete(e){
        this.onAction(e, 'delete');
    }

    // Запись значения inputs в стейт (value)
    changeInput = (e, type="condition", compareId=false, compareType=false) => {
        const conditionId = this.state.activeCondition?.id ?? 0;
        if (!conditionId) return;
        this.props.changeInputCondition(e, type, conditionId, compareId, compareType);
    }

    // Обработчик выбранных селектов
    changeSelect = (e, i, type = 'condition', compareId=false) => {
        const conditionId = this.state.activeCondition?.id ?? 0;
        if (!conditionId) return;        
        this.props.changeSelectCondition(e, i, type, conditionId, compareId);      
    }

    render(){
        let { isConditionOpened, activeCondition } = this.state;
        let { id, type, name, compares, enabled } = activeCondition;        
        const OptionsCondition = [{label:"any", value:1}, {label:"all", value:2}];        
        const data = this.props.conditions ?? [];

        data.map( item => {
            if(item?.id === id){
                type = item.type
                name = item.name
                compares = item.compares
                enabled = item.enabled
            }
        });

        return <div className="admin-notice-condition-box">
                <div className="condition-box">
                    <button className="btn btn_save" onClick={() => this.onSave()}>
                        Save and Add New Condition
                    </button>
                    <ul>
                        {data.map((item, index) =>
                            <li className="list-box" key={index}>
                                <div className="list-item">
                                    <a className={item.enabled ? "enabled" : "disabled"} onClick={() => this.onActive(item)}>{item.name ?? ''}</a>
                                </div>
                                <span className="quick-action-menu">
                                    <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onActive(item)}>Edit</button></span>
                                    <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onDisable(item)}>{item.enabled ? "Disable" : "Enable"}</button></span>
                                    <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onExport(item)}>Export</button></span>
                                    <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item quick-action-menu__item_danger" onClick={() => this.onDelete(item)}>Trash</button></span>
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
                {isConditionOpened && <div className="admin-notice-box-child">
                    <div className="condition-compare-box">
                        <div className="condition-box-general">
                            <div className="form-group">
                                <label htmlFor="condition-input">Name</label>
                                <input type="text" id="condition-input" name="name" value={name ?? ''} onChange={(e) => { this.changeInput(e)}} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="condition-select">Type</label>
                                <AltrpSelect id="condition-select"
                                    onChange={this.changeSelect}
                                    value={_.filter(OptionsCondition, t => type === t.label)}
                                    options={OptionsCondition} />
                            </div>
                        </div>
                        <Compare
                            compares={compares ?? []}
                            onSaveCompare={this.onSave}
                            onActionCompare={this.onAction}
                            changeInputCompare={this.changeInput}
                            changeSelectCompare={this.changeSelect}
                        />
                    </div>
                    <div className="btn-box">
                        <button className="btn btn_save" onClick={() => this.onSave("save")}>
                            Save
                        </button>
                        <button className="btn btn_cancel" onClick={() => this.setState({ isConditionOpened: false, activeCondition: {} })}>
                            Cancel
                        </button>                       
                    </div>
                </div>}
            </div>
    }
}