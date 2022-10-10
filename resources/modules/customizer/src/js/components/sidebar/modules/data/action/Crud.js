import React, { Component } from "react";
import store from "../../../../../store/store";
import { setUpdatedNode } from "../../../../../store/customizer-settings/actions";
import AltrpSelect from "../../../../../../../../admin/src/components/altrp-select/AltrpSelect";
import Resource from "../../../../../../../../editor/src/js/classes/Resource";
import Chevron from "../../../../../../../../editor/src/svgs/chevron.svg";


export default class Crud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelOptions: [],
            models: [],
            currentModelId: '',
            fieldOptions: [],
            recordOptions: [],

        }
        this.toggle = this.toggle.bind(this);
        this.modelsResource = new Resource({ route: '/admin/ajax/models' });
        this.modelOptionsResource = new Resource({ route: '/admin/ajax/model_options' });
    }

    async componentDidMount() {
        store.subscribe(this.setStateCrud.bind(this));

        let models = await this.modelsResource.getAll();
        let modelOptions = await this.modelOptionsResource.getAll();

        this.setState(s => ({ ...s, modelOptions, models }));
    }

    // Запись значений select в store
    changeSelect(e, type) {
        const node = this.props.selectNode;
        switch (type) {
            case "model_id":
                this.setStateCrud();
                node.data.props.nodeData.data.method = '';
                node.data.props.nodeData.data.record = '';
                node.data.props.nodeData.data.body = {};
                node.data.props.nodeData.data[type] = e.target.value;
                break;
            case "method":
                node.data.props.nodeData.data.record = '';
                node.data.props.nodeData.data.body = {};
                node.data.props.nodeData.data[type] = e.target.value;
                break;
            case "body":
                if (e === null) e = [];
                let body = {};
                e.map(item => {
                    if (node.data.props.nodeData.data.body[item.label] === undefined) body[item.label] = '';
                    else body[item.label] = node.data.props.nodeData.data.body[item.label];
                });
                node.data.props.nodeData.data.body = body;
                break;
        }
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений input в store
    changeInput(e, type = 'record', field = false, fieldsData = false) {
        const node = this.props.selectNode;
        if (field && fieldsData) {
            fieldsData.map(item => {
                if (item == field) node.data.props.nodeData.data.body[field] = e.target.value;
            });
        } else {
            node.data.props.nodeData.data[type] = e.target.value;
        }


        store.dispatch(setUpdatedNode(node));
    }

    getData(type) {
        let item = this.props.selectNode?.data?.props?.nodeData?.data[type] ?? '';

        return item;
    }

    getFields() {
        let item = this.props.selectNode?.data?.props?.nodeData?.data?.body ?? [];

        if (_.isObject(item)) item = _.keys(item);

        return item;
    }

    async setStateCrud() {
        const item = this.props.selectNode?.data?.props?.nodeData?.data?.model_id ?? '';


        if (item) {
            let fields = new Resource({ route: `/admin/ajax/models/${item}/field_options` });
            let recordOptions = new Resource({ route: `/admin/ajax/models/${item}/records_options` });
            fields = await fields.getAll();
            recordOptions = await recordOptions.getAll();

            this.setState(s => ({ ...s, fieldOptions: fields.options }));
            this.setState(s => ({ ...s, recordOptions }));
        }
    }

    // Изменение положения переключателя
    toggle() {
        const node = this.props.selectNode;
        node.data.props.nodeData.data.custom = node.data.props.nodeData.data.custom ? false : true;
        store.dispatch(setUpdatedNode(node));
    }


    render() {
        const modelOptions = this.state.modelOptions?.options ?? [];
        const methodOptions = [
            { label: 'create', value: 'create' },
            { label: 'update', value: 'update' },
            { label: 'delete', value: 'delete' }
        ];
        const fieldOptions = this.state.fieldOptions;
        const recordOptions = this.state.recordOptions;
        const model = this.getData("model_id");
        const method = this.getData("method");
        const record = this.getData("record");
        const fields = this.getFields();
        let customData = this.getData("custom_data");

        let value = this.getData("custom");
        let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;

        return <div>
            <div className={"settings-section " + (this.props.activeSection === "crud" ? '' : 'open')}>
                <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("crud")}>
                    <div className="settings-section__icon d-flex">
                        <Chevron />
                    </div>
                    <div className="settings-section__label">Settings CRUD</div>
                </div>

                <div className="controllers-wrapper" style={{ padding: '0 10px 20px 10px' }}>
                    <div className="controller-container controller-container_select">
                        <div className="controller-container__label control-select__label controller-label">Model</div>
                        <div className="control-container_select-wrapper controller-field">
                            <select className="control-select control-field"
                                value={model || ''}
                                onChange={e => { this.changeSelect(e, "model_id") }}
                            >
                                <option disabled value="" />
                                {modelOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                            </select>
                        </div>
                    </div>

                    {model && <div className="controller-container controller-container_select">
                        <div className="controller-container__label control-select__label controller-label">Method</div>
                        <div className="control-container_select-wrapper controller-field">
                            <select className="control-select control-field"
                                value={method || ''}
                                onChange={e => { this.changeSelect(e, "method") }}
                            >
                                <option disabled value="" />
                                {methodOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                            </select>
                        </div>
                    </div>}

                    {(method && method !== "create") && <div className="controller-container controller-container_select">
                        <div className="controller-container__label control-select__label controller-label">Record</div>
                        <div className="control-container_select-wrapper controller-field">
                            <textarea
                                className="control-field"
                                type="text"
                                id="flow-model-record"
                                name="flow-model-record"
                                value={record || ''}
                                onChange={(e) => { this.changeInput(e) }}
                            />
                        </div>
                    </div>}

                    {(method && method !== "delete") && <div className="crud-switcher-container">
                        <div className="customizer_switcher">
                            <div className="customizer_switcher__label">
                                Custom fields
                            </div>
                            <div className={switcherClasses} onClick={this.toggle}>
                                <div className="control-switcher__on-text">ON</div>
                                <div className="control-switcher__caret" />
                                <div className="control-switcher__off-text">OFF</div>
                            </div>
                        </div>
                        {value && <div className="controller-container controller-container_select">
                            <textarea
                                className="control-field"
                                type="text"
                                id="flow-model-record"
                                name="flow-model-record"
                                value={customData || ''}
                                onChange={(e) => { this.changeInput(e, 'custom_data') }}
                            />
                        </div>}
                    </div>}

                    {(method && method !== "delete") && <div className="controller-container controller-container_select2" style={{ fontSize: '13px' }}>

                        <div className="controller-container__label control-select__label controller-label">Fields</div>
                        <AltrpSelect id="crud-fields"
                            className="controller-field"
                            isMulti={true}
                            value={_.filter(fieldOptions, f => fields.indexOf(f.label) >= 0)}
                            onChange={e => { this.changeSelect(e, "body") }}
                            options={fieldOptions}
                        />

                        {fields.map((item, index) =>
                            <div className="controller-container-input" key={index}>
                                <div className="controller-container controller-container_textarea" >
                                    <div className="controller-container__label textcontroller-responsive">{item}</div>
                                    <input
                                        className="control-field"
                                        type="text"
                                        id={item}
                                        name={item}
                                        value={this.props.selectNode?.data.props.nodeData.data.body[item] ?? ''}
                                        onChange={(e) => { this.changeInput(e, false, item, fields) }}
                                    />
                                </div>
                            </div> /* ./controller-container-input */
                        )}
                    </div>}

                </div> {/* ./controllers-wrapper */}
            </div>  {/* ./settings-section */}
        </div>
    }
}
