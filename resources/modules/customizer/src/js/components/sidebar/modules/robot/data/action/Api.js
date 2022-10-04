import React, {Component} from "react";
import store from "../../../../../../store/store";
import { setUpdatedNode } from "../../../../../../store/customizer-settings/actions";
import Resource from "../../../../../../../../../editor/src/js/classes/Resource";
import Chevron from "../../../../../../../../../editor/src/svgs/chevron.svg";


export default class Api extends Component{
    constructor(props){
        super(props);
        this.state = {
            sourceOptions: [],
        }
      this.dataSources = new Resource({ route: "/admin/ajax/data_source_options" });
    }

    async componentDidMount() {
      const dataSources = await this.dataSources.getAll();
      this.setState(s =>({...s, sourceOptions: dataSources?.options ?? []}));
    }

    // Запись значений select в store
    changeSelect(e, type) {
        const node = this.props.selectNode;
        node.data.props.nodeData.data[type] = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений input в store
    changeInput(e, type) {
        const node = this.props.selectNode;
        node.data.props.nodeData.data[type] = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const source = this.props.selectNode?.data?.props?.nodeData?.data?.source ?? '';
        const {sourceOptions} = this.state;
        const method = this.props.selectNode?.data?.props?.nodeData?.data?.method ?? '';
        const methodOptions = [
            {label:'GET', value: 'get'},
            {label:'POST', value: 'post'},
            {label:'PUT', value: 'put'},
            {label:'DELETE', value: 'delete'},
        ];
        const name = this.props.selectNode?.data?.props?.nodeData?.data?.name ?? '';
        const url = this.props.selectNode?.data?.props?.nodeData?.data?.url ?? '';
        const headers = this.props.selectNode?.data?.props?.nodeData?.data?.headers ?? '';
        const data = this.props.selectNode?.data?.props?.nodeData?.data?.data ?? '';

    return <div>
        <div className={"settings-section " + (this.props.activeSection === "api" ? '' : 'open')}>
            <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("api")}>
                <div className="settings-section__icon d-flex">
                    <Chevron />
                </div>
                <div className="settings-section__label">Settings Api</div>
            </div>

            <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
                <div className="controller-container controller-container_select">
                    <div className="controller-container__label control-select__label controller-label">Source</div>
                    <div className="control-container_select-wrapper controller-field">
                        <select className="control-select control-field"
                            value={source || ''}
                            onChange={e => {this.changeSelect(e, "source")}}
                        >
                            <option value="" />
                            {sourceOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                        </select>
                    </div>
                </div>
                <div className="controller-container controller-container_select">
                    <div className="controller-container__label control-select__label controller-label">Method</div>
                    <div className="control-container_select-wrapper controller-field">
                        <select className="control-select control-field"
                            value={method || ''}
                            onChange={e => {this.changeSelect(e, "method")}}
                        >
                            <option disabled value="" />
                            {methodOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                        </select>
                    </div>
                </div>

                {!source && <div className="controller-container controller-container_select">
                        <div className="controller-container__label control-select__label controller-label">API Response Path</div>
                        <div className="control-container_select-wrapper controller-field">
                            <textarea
                              className="control-field"
                              id="api-name"
                              name="api-name"
                              value={name || ''}
                              onChange={(e) => { this.changeInput(e, 'name') }}
                            />
                        </div>
                    <div className="controller-container__label control-select__label controller-label">Url</div>
                        <div className="control-container_select-wrapper controller-field">
                            <textarea
                              className="control-field"
                              type="text"
                              id="api-url"
                              name="api-url"
                              rows="3"
                              style={{lineHeight: '125%'}}
                              value={url || ''}
                              onChange={(e) => { this.changeInput(e, 'url') }}
                            />
                        </div>
                </div>}
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Custom Headers</div>
                <div className="control-container_select-wrapper controller-field">
                            <textarea
                              className="control-field"
                              type="text"
                              id="api-headers"
                              name="api-headers"
                              rows="3"
                              style={{lineHeight: '125%'}}
                              value={headers || ''}
                              onChange={(e) => { this.changeInput(e, 'headers') }}
                            />
                </div>
              </div>
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Data</div>
                <div className="control-container_select-wrapper controller-field">
                            <textarea
                              className="control-field"
                              type="text"
                              id="api-data"
                              name="api-data"
                              value={data || ''}
                              onChange={(e) => { this.changeInput(e, 'data') }}
                            />
                </div>
              </div>

            </div> {/* ./controllers-wrapper */}
        </div>  {/* ./settings-section */}
    </div>
    }
}
