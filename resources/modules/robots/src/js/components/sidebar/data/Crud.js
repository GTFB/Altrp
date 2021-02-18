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
            models: [],
            currentModelId: '',
            fieldOptions: [],
            recordOptions: [],

        }
        this.modelsResource = new Resource({ route: '/admin/ajax/models' });
        this.modelOptionsResource = new Resource({ route: '/admin/ajax/models_without_preset' });

    }

    async componentDidMount() {
        store.subscribe(this.setStateCrud.bind(this));

        let models = await this.modelsResource.getAll();
        let modelOptions = await this.modelOptionsResource.getAll();

        this.setState(s =>({...s, modelOptions, models }));
    }

    // Запись значений select в store
    changeSelect(e, type) {
        const node = this.props.selected;
        switch(type){
            case "model_id":
                this.setStateCrud();
                node.data.props.nodeData.data.method = '';
                node.data.props.nodeData.data.record_id = '';
                node.data.props.nodeData.data.body = {};
                node.data.props.nodeData.data[type] = e.value;    
                break;
            case "method":
                node.data.props.nodeData.data.record_id = '';
                node.data.props.nodeData.data.body = {};
                node.data.props.nodeData.data[type] = e.value;    
                break;
            case "record_id":
                // node.data.props.nodeData.data.body = {};
                node.data.props.nodeData.data[type] = e.value;    
                break;
            case "body":
                if(e === null) e = [];
                let body = {};
                e.map(item => {
                    if(node.data.props.nodeData.data.body[item.label] === undefined) body[item.label] = '';
                    else body[item.label] = node.data.props.nodeData.data.body[item.label];
                });
                node.data.props.nodeData.data.body = body;    
                break;
    
        }
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений input в store
    changeInput(e, field, fieldsData) {
        const node = this.props.selected;
        if(!node.data.props.nodeData.data.body || _.isEmpty(fieldsData)) return;

        fieldsData.map(item =>{
            if(item == field) node.data.props.nodeData.data.body[field] = e.target.value;
        });

        store.dispatch(setUpdatedNode(node));
    }

    getData(type) {
        let item = this.props.selected?.data?.props?.nodeData?.data[type] ?? '';

        return item;
    }

    getFields() {
        let item = this.props.selected?.data?.props?.nodeData?.data?.body ?? [];

        if(_.isObject(item)) item = _.keys(item);

        console.log(item);

        return item;
    }

    async setStateCrud(){
        const item = this.props.selected?.data?.props?.nodeData?.data?.model_id ?? '';

        if(item){
            let fields = new Resource({ route: `/admin/ajax/models/${item}/field_options` });
            let recordOptions = new Resource({ route: `/admin/ajax/models/${item}/records_options` });
            fields = await fields.getAll();
            recordOptions = await recordOptions.getAll();

            console.log(fields);
            console.log(recordOptions);
            this.setState(s =>({...s, fieldOptions: fields.options}));
            this.setState(s =>({...s, recordOptions}));
        }
    }

    render(){
        const modelOptions = this.state.modelOptions.options;
        const methodOptions = [
            {label:'create', value: 'create'},
            {label:'update', value: 'update'},
            {label:'delete', value: 'delete'}
        ];
        const fieldOptions = this.state.fieldOptions;
        const recordOptions = this.state.recordOptions;
        const model = this.getData("model_id");
        const method = this.getData("method");
        const record = this.getData("record_id");
        const fields = this.getFields();

        console.log(fieldOptions);
        console.log(recordOptions);

        return <div>
            <div className="controller-container__label">CRUD:</div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Models</div>
                <AltrpSelect id="crud-model"
                    value={_.filter(modelOptions, item => model == item.value)}
                    onChange={e => {this.changeSelect(e, "model_id")}}
                    options={modelOptions}
                />
            </div>

            {model && <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Method</div>
                <AltrpSelect id="crud-method"
                    value={_.filter(methodOptions, item => method === item.value)}
                    onChange={e => {this.changeSelect(e, "method")}}
                    options={methodOptions}
                />
            </div>}
            {(method && method !== "create") && <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Record</div>
                <AltrpSelect id="crud-record"
                    value={_.filter(recordOptions, item => record == item.value)}
                    onChange={e => {this.changeSelect(e, "record_id")}}
                    options={recordOptions}
                />
            </div>}
            {(method && method !== "delete") && <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Fields</div>
                <AltrpSelect id="crud-fields"
                    isMulti={true}
                    value={_.filter(fieldOptions, f => fields.indexOf(f.label) >= 0)}
                    onChange={e => {this.changeSelect(e, "body")}}
                    options={fieldOptions}
                />

                {fields.map((item, index) =>
                <div key={index}>
                    <div className="controller-container__label">{item}</div>
                    <input
                        type="text"
                        id={item}
                        name={item}
                        value={this.props.selected?.data.props.nodeData.data.body[item] ?? ''}
                        onChange={(e) => { this.changeInput(e, item, fields) }}
                        className="form-control"
                    />
                </div>
                )}
            </div>}
        </div>
    }
}

export default Crud;
