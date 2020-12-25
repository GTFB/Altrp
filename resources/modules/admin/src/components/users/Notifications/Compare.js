import React, {Component} from "react";
import {CONDITIONS_OPTIONS} from "../../../../../front-app/src/js/helpers"
import AltrpSelect from "../../altrp-select/AltrpSelect";


export default class Compare extends Component{
    constructor(props){
        super(props);        
        this.state = {
            activeCompare: {},
            isCompareOpened: false,

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
        // Сворачивание формы, если удалён активный compare (activeCompare)
        const {activeCompare, isCompareOpened} = this.state;
        let compares = this.props.compares ?? [];
        compares = _.filter(compares, s => s.id === activeCompare?.id);
        if(compares.length === 0 && isCompareOpened) this.setState(s => ({ ...s, isCompareOpened: false}));
    }    
    
    // Обработчик создания нового compare
    onSave(){
        this.props.onSaveCompare('compare');
    }

    // Отправка данных от обработчиков родителю
    onAction(e, type){
        this.props.onActionCompare(e, type, 'compare');
    }
    
    // Обработчик нажатия на конкретный compare
    onActive(e){
        this.setState({ activeCompare: e,  isCompareOpened: true});
    }
    
    // Обработчик отключения compare
    onDisable(e){
        this.onAction(e, 'disable');
    }
    
    // Обработчик экспорта compare
    onExport(e){
    }
    
    // Обработчик удаления compare
    onDelete(e){
        this.onAction(e, 'delete');
    }

    // Отправка значения inputs родителю
    changeInput = (e, compareType) => {        
        const compareId = this.state.activeCompare?.id ?? 0;
        this.props.changeInputCompare(e, 'compare', compareId, compareType);        
    }

    // Обработчик выбранного селекта родителю
    changeSelect = (e, i) => {
        const compareId = this.state.activeCompare?.id ?? 0;
        this.props.changeSelectCompare(e, i, 'compare', compareId);      
    }  

    render(){
        let { isCompareOpened, activeCompare } = this.state;
        let { id, name, operator, value, enabled } = activeCompare;
        const OptionsCompare = CONDITIONS_OPTIONS;
        const data = this.props.compares ?? [];

        data.map( item => {
            if(item?.id === id){
                name = item.name
                operator = item.operator
                value = item.value
                enabled = item.enabled
            }
        });

        return <div className="admin-notice-compare-box">
            <div className="compare-box">
                <button className="btn btn_save" onClick={() => this.onSave()}>
                    Save and Add New Compare
                </button>
                <ul>
                    {data.map((item, index) =>
                        <li className="list-box" key={index}>
                            <div className="list-item" onClick={() => this.onActive(item)}>
                                <a className={item.enabled ? "enabled" : "disabled"}>{item.name ?? ''}</a>
                                <a className={item.enabled ? "enabled" : "disabled"}>{item.operator ?? ''}</a>
                                <a className={item.enabled ? "enabled" : "disabled"}>{item.value ?? ''}</a>
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
        
            {isCompareOpened && <div className="admin-notice-box-child-compare">
                <div className="form-group">
                    <input type="text" id="compare" name="name" value={name ?? ''} onChange={(e) => { this.changeInput(e, "name")}} className="form-control" />
                </div>
                <AltrpSelect 
                    onChange={this.changeSelect}
                    value={_.filter(OptionsCompare, o => operator === o.value)}
                    options={OptionsCompare} />
                <div className="form-group">
                    <textarea type="text" id="value" name="value" value={value ?? ''} onChange={(e) => { this.changeInput(e, "value")}} className="form-control" ></textarea>
                </div>
            </div>}

        </div>
    }
}