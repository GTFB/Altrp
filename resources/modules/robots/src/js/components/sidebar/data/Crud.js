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
        this.modelOptionsResource = new Resource({ route: '/admin/ajax/model_options' });
    }

    async componentDidMount() {
        let models = await this.modelsResource.getAll();
        let modelOptions = await this.modelOptionsResource.getAll();

        this.setState(s =>({...s, modelOptions, models }));
    }
    

    // Запись значений select в store
    changeSelect(e, type) {
        let value = e.value;
        const node = this.props.selected;

        node.data.props.nodeData.map( item => {
            if(item.type === "crud"){
                if(type === "model"){
                    let model = this.state.models.models ?? [];
                    model.map(i =>{
                        if(i.id == value){
                            item.data.model_id = i.id;
                            item.data.model_class = i.namespace;
                        }
                        return i;
                    });
                    console.log(item);
                }else{
                    item.data[type]= value;
                }
            } 
            return item;
        });
        store.dispatch(setUpdatedNode(node));
    }

    getData(type) {
        let item = [];
        const node = this.props.selected;

        node.data.props.nodeData.map( i => {
            if(i.type === "crud") item = i?.data?.[type] || [];
        });

        return item;
    }

    render(){
        const methodOptions = [
            {label:'create', value: 'create'},
            {label:'update', value: 'update'},
            {label:'delete', value: 'delete'}
        ];
        const modelOptions = this.state.modelOptions.options;
        const method = this.getData("method");
        const model = this.getData("model_id");
        // console.log(model);
        // console.log(modelOptions);
        console.log(this.state.models);

        return <div>
        <div className="controller-container__label">CRUD:</div>
        <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Method</div>
            <AltrpSelect id="crud-method"
                            value={_.filter(methodOptions, item => method === item.value)}
                            onChange={e => {this.changeSelect(e, "method")}}
                            options={methodOptions} />
        </div>
        <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Models</div>
            <AltrpSelect id="crud-method"
                            value={_.filter(modelOptions, item => model == item.value)}
                            onChange={e => {this.changeSelect(e, "model")}}
                            options={modelOptions} />
        </div>
        <div className="controller-container controller-container_textarea">
            <div className="controller-container__label">Body</div>
            {/* <input type="text" id="body" name="body" value={this.props.noticeData?.data?.message ?? ''} onChange={(e) => { this.props.onSendNotice(e, "message") }} className="form-control" /> */}
        </div>
    </div>
    }
}

export default Crud;