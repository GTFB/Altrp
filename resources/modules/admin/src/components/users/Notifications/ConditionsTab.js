import React, {Component} from "react";
import Compare from "./Compare";
import AltrpSelect from "../../altrp-select/AltrpSelect";


export default class ConditionsTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            conditions: this.props.conditions,
            activeCondition: {},
            isConditionOpened: false,

        };
        this.onActive = this.onActive.bind(this);
        this.onDisable = this.onDisable.bind(this);
        this.onExport = this.onExport.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSaveCondition = this.onSaveCondition.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.checkEdit = this.checkEdit.bind(this);
    }

    componentDidMount(){
        // this.setState((state, props) => ({
        //     conditions: props.conditions
        //   }));

        // if(this.props.conditions !== undefined){
        //     const conditions = this.props.conditions;
        //     this.setState({ conditions });
        //     console.log(this.state.conditions);
        // }
        // let res = await this.resource.get(this.props.resourceid);
        // this.setState(state=>{
        //   return{...state,
        //     value: res[this.props.resourceid] || '',
        //     disabled: false,
        //   }
        // });
    }

    onSave(e){
    }      

    onSaveCondition(){

    }

    // Отправка изменений родителю
    checkEdit(){

    }


    // Запись значения inputs в стейт (value)
    changeInput = (e, type="condition", compareId=false, compareType=false) => {
        // console.log(e.target.value);
        let conditionId = this.state.activeCondition?.id ?? 0;
        if (!conditionId) return;
        if(type === "condition"){

            let name = e.target.value;        
            this.setState(s => ({ ...s, activeCondition: {...s.activeCondition, name: name} }));
            this.props.changeInputCondition(e, 'condition', conditionId);

        } else if(type === "compare"){
            if (!compareId || !compareType) return;


        }
    }
    
    // Обработчик нажатия на конкретный condition
    onActive(e){
        this.setState({ activeCondition: e,  isConditionOpened: true});
    }

    // Обработчик отключения condition
    onDisable(e){
    }

    // Обработчик экспорта condition
    onExport(e){
    }

    // Обработчик удаления condition
    onDelete(e){
    }

    // Обработчик выбранных селектов
    changeSourceHandler = type => {
        this.setState(s => ({ ...s, activeCondition: {...s.activeCondition, type: type?.label ?? ''}}));
    }
    
    

    render(){
        let { isConditionOpened } = this.state;
        let { type,  name, compares } = this.state.activeCondition;        
        const OptionsCondition = [{label:"any", value:1}, {label:"all", value:2}];
        const data = this.props.conditions ?? [];

        return <div className="admin-notice-condition-box">
            <button className="btn btn_save" onClick={() => this.onSaveCondition()}>
                Save and Add New Condition
            </button>
            <ul>
                {data.map((item, index) =>
                    <li key={index}> <a onClick={() => this.onActive(item)}>{item.name ?? ''}</a>
                        <span className="quick-action-menu">
                            <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onActive(item)}>Edit</button></span>
                            <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onDisable(item)}>Disable</button></span>
                            <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onExport(item)}>Export</button></span>
                            <span className="quick-action-menu__item_wrapper"><button className="quick-action-menu__item" onClick={() => this.onDelete(item)}>Trash</button></span>
                        </span>
                    </li>
                )}
            </ul>
            {isConditionOpened && <div className="admin-notice-box-child">
                    <div className="form-group">
                        <label htmlFor="page-name">Name</label>
                        <input type="text" id="condition" name="name" value={name ?? ''} onChange={(e) => { this.changeInput(e)}} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="condition">Type</label>
                        <AltrpSelect id="condition"
                            onChange={this.changeSourceHandler}
                            value={_.filter(OptionsCondition, t => type.indexOf(t.label) >= 0)}
                            options={OptionsCondition} />
                    </div>

                        <Compare compares={compares ?? []} onSaveCompare={this.onSave} checkEditCompare={this.checkEdit}/>
                        <button className="btn btn_cancel">
                            Save
                        </button>
                        <button className="btn btn_cancel">
                            Cancel
                        </button>                       
                </div>}
        </div>
    }
}