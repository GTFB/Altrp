import React, {Component} from "react";
import store from "../../../store/store";
import { setUpdatedNode } from "../../../store/robot-settings/actions";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";



class Crud extends Component{
    constructor(props){
        super(props);
    }

    // Запись значений inputs в store
    changeSelect = (e) => {
        let value = e.value;
        const node = this.props.selected;

        node.data.props.nodeData.map( item => {
            if(item.type === "crud") item.data.method = value;
            return item;
        });

        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений inputs в store
    getSource() {
        let source = [];
        const node = this.props.selected;

        node.data.props.nodeData.map( item => {
            if(item.type === "crud") source = item?.data?.method || [];
        });

        return source;
    }
    

    render(){
        const selectOptions = [
            {label:'create', value: 'create'},
            {label:'update', value: 'update'},
            {label:'delete', value: 'delete'}
        ];
        const source = this.getSource();

        return <div>
        <div className="controller-container__label">CRUD:</div>
        <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Method</div>
            <AltrpSelect id="crud-method"
                            value={_.filter(selectOptions, item => source === item.value)}
                            onChange={this.changeSelect}
                            options={selectOptions} />
        </div>
        <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Body</div>
            {/* <input type="email" id="notice-message" name="message" value={this.props.noticeData?.data?.message ?? ''} onChange={(e) => { this.props.onSendNotice(e, "message") }} className="form-control" /> */}
        </div>
    </div>
    }
}

export default Crud;