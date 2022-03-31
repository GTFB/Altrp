import React, {Component} from "react";
import store from "../../../../../store/store";
import { setUpdatedNode } from "../../../../../store/robot-settings/actions";
import Resource from "../../../../../../../../editor/src/js/classes/Resource";

export default class ModelField extends Component{
    constructor(props){
        super(props);
        this.state={
            fieldOptions: []
        }
    }

    async componentDidMount() {
        const modelId = this.props.robot?.model_id ?? '';
        if(modelId){
            let fields = new Resource({ route: `/admin/ajax/models/${modelId}/field_options` });
            fields = await fields.getAll();
            this.setState(s =>({...s, fieldOptions: fields.options}));
        }
    }

    // Запись значений select в store
    changeSelect(e, id) {
        const node = this.props.selectNode;
        node.data.props.nodeData.body.map(item => {
            if(item.id === id) item.operands[0] = e.target.value;
            return item;
        })
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const item = this.props.item;
        const fieldOptions = this.state.fieldOptions ?? [];

        return <div className="controller-container controller-container_select">
            <div className="controller-container__label control-select__label controller-label">Field</div>
            <div className="control-container_select-wrapper controller-field">
                <select className="control-select control-field"
                    id={`operand-1_${item?.id}`}
                    value={item?.operands[0] ?? ''}
                    onChange={e => {this.changeSelect(e, item?.id)}}
                >
                    <option disabled value="" />
                    {fieldOptions.map(option => {
                        return  <option value={option.label} key={option.value || 'null'} >
                                    {option.label}
                                </option> })}
                </select>
            </div>
        </div>
    }
}
