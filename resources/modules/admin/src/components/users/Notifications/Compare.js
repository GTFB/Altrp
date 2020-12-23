import React, {Component} from "react";
import {CONDITIONS_OPTIONS} from "../../../../../front-app/src/js/helpers"
import AltrpSelect from "../../altrp-select/AltrpSelect";


export default class Compare extends Component{
    constructor(props){
        super(props);        
        this.state = {
            compares: this.props.compares,
            activeCompare: {},
            isCompareOpened: false,

        };
        this.onActive = this.onActive.bind(this);
        this.onDisable = this.onDisable.bind(this);
        this.onExport = this.onExport.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.onSaveCondition = this.onSaveCondition.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.checkEdit = this.checkEdit.bind(this);
    }

    // Отправка изменений родителю
    checkEdit(){
    }

    onSaveCondition(){
    }

    // Запись значения inputs в стейт (value)
    changeInput = (e, compareType) => {
        let item = e.target.value;       

        if (compareType === 'name'){
            this.setState(s => ({ ...s, activeCompare: {...s.activeCompare, name: item} }));
        } else if(compareType === 'value'){
            this.setState(s => ({ ...s, activeCompare: {...s.activeCompare, value: item} }));
        }
        // let compareId = this.state.activeCompare?.id;
        // this.props.changeInputCompare(e, 'compare', compareId, compareType);

        // let nameNew = e.target.value;        
        // this.setState(s => ({ ...s, activeCondition: {...s.activeCondition, name: nameNew} }));
    }
    
    // Обработчик нажатия на конкретный compare
    onActive(e){
        this.setState({ activeCompare: e,  isCompareOpened: true});
    }

    // Обработчик отключения compare
    onDisable(e){
    }

    // Обработчик экспорта compare
    onExport(e){
    }

    // Обработчик удаления compare
    onDelete(e){
    }

    // Обработчик выбранных селектов
    changeSourceHandler = operator => {
        this.setState(s => ({ ...s, activeCompare: {...s.activeCompare, operator: operator?.value ?? ''}}));
    }
    
    

    render(){
        const OptionsCompare = CONDITIONS_OPTIONS;
        const data = this.props.compares ?? [];
        let { isCompareOpened } = this.state;
        let { operator, name, value, enabled } = this.state.activeCompare;



        return <div className="admin-notice-compare-box">
            <button className="btn btn_save" onClick={() => this.onSaveCompare()}>
                Save and Add New Compare
            </button>
            <ul>
                {data.map((item, index) =>
                    <li className="compare-list" key={index}>
                        <div className="compare-item" onClick={() => this.onActive(item)}>
                            <a >{item.name ?? ''}</a>
                            <a >{item.operator ?? ''}</a>
                            <a >{item.value ?? ''}</a>
                        </div> 
                        <span className="quick-action-menu">
                            <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onActive(item)}>Edit</button></span>
                            <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onDisable(item)}>Disable</button></span>
                            <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onExport(item)}>Export</button></span>
                            <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onDelete(item)}>Trash</button></span>
                        </span>
                    </li>
                )}
            </ul>
        
            {isCompareOpened && <div className="admin-notice-box-child-compare">
                <div className="form-group">
                    <input type="text" id="compare" name="name" value={name ?? ''} onChange={(e) => { this.changeInput(e, "name")}} className="form-control" />
                </div>
                <AltrpSelect 
                    onChange={this.changeSourceHandler}
                    value={_.filter(OptionsCompare, o => operator === o.value)}
                    options={OptionsCompare} />
                <div className="form-group">
                    <input type="text" id="value" name="value" value={value ?? ''} onChange={(e) => { this.changeInput(e, "value")}} className="form-control" />
                </div>
            </div>}

        </div>
    }
}