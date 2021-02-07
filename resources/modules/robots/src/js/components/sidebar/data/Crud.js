import React, {Component} from "react";
import store from "../../../store/store";
import { setUpdatedNode } from "../../../store/robot-settings/actions";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";
import Resource from "../../../../../../editor/src/js/classes/Resource";




class Crud extends Component{
    constructor(props){
        super(props);
        this.state = {
            modelOptions: [],
            models: []
        }
        this.modelsResource = new Resource({ route: '/admin/ajax/models' });
        this.modelsResource1 = new Resource({ route: '/admin/ajax/models/13/fields_only' });
        this.modelsResource2 = new Resource({ route: '/admin/ajax/models/13/records' });
        this.modelOptionsResource = new Resource({ route: '/admin/ajax/model_options' });
    }

    async componentDidMount() {
        let models = await this.modelsResource.getAll();
        let models1 = await this.modelsResource1.getAll();
        let models2 = await this.modelsResource2.getAll();
        let modelOptions = await this.modelOptionsResource.getAll();
        console.log(models);
        console.log(models1);
        console.log(models2);

        this.setState(s =>({...s, modelOptions, models }));
    }
    

    // Запись значений select в store
    changeSelect(e, type) {
        let value = e.value;
        const node = this.props.selected;

        node.data.props.nodeData.data[type] = value;

        // console.log(node);
        // node.data.props.nodeData.map( item => {
        //     if(item.type === "crud"){
        //         if(type === "model"){
        //             let model = this.state.models.models ?? [];
        //             model.map(i =>{
        //                 if(i.id == value){
        //                     item.data.model_id = i.id;
        //                     item.data.model_class = i.namespace;
        //                 }
        //                 return i;
        //             });
        //             console.log(item);
        //         }else{
        //             item.data[type]= value;
        //         }
        //     } 
        //     return item;
        // });
        store.dispatch(setUpdatedNode(node));
    }

    getData(type) {
        // console.log(this.props.selected?.data?.props?.nodeData?.data);
        let item = this.props.selected?.data?.props?.nodeData?.data[type] ?? [];

        // console.log(item);

        return item;
    }

    render(){
        const modelOptions = this.state.modelOptions.options;
        const methodOptions = [
            {label:'create', value: 'create'},
            {label:'update', value: 'update'},
            {label:'delete', value: 'delete'}
        ];
        const recordOptions = [];
        const model = this.getData("model_id");
        const method = this.getData("method");
        const record = this.getData("record_id");
        // console.log(model);
        // console.log(modelOptions);
        // console.log(this.state.models);

        return <div>
        <div className="controller-container__label">CRUD:</div>
        <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Models</div>
            <AltrpSelect id="crud-model"
                            value={_.filter(modelOptions, item => model == item.value)}
                            onChange={e => {this.changeSelect(e, "model_id")}}
                            options={modelOptions} />
        </div>

        <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Method</div>
            <AltrpSelect id="crud-method"
                            value={_.filter(methodOptions, item => method === item.value)}
                            onChange={e => {this.changeSelect(e, "method")}}
                            options={methodOptions} />
        </div>
        {(method === "delete") && <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Record</div>
            <AltrpSelect id="crud-record"
                            value={_.filter(recordOptions, item => record == item.value)}
                            onChange={e => {this.changeSelect(e, "record_id")}}
                            options={recordOptions} />
        </div>}
        <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Body</div>
            {/* <input type="text" id="body" name="body" value={this.props.noticeData?.data?.message ?? ''} onChange={(e) => { this.props.onSendNotice(e, "message") }} className="form-control" /> */}
        </div>
    </div>
    }
}

export default Crud;