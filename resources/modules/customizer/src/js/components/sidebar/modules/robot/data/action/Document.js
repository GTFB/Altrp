import React, {Component} from "react";
import store from "../../../../../../store/store";
import { setUpdatedNode } from "../../../../../../store/customizer-settings/actions";
import Chevron from "../../../../../../../../../editor/src/svgs/chevron.svg";


export default class Document extends Component{
    constructor(props){
        super(props);
    }

    // Запись значений select в store
    changeSelect(e) {
      const node = this.props.selectNode;
      node.data.props.nodeData.data.type = e.target.value;
      store.dispatch(setUpdatedNode(node));
    }

    // Запись значений input в store
    changeInput(e, type) {
        const node = this.props.selectNode;
        node.data.props.nodeData.data[type] = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const typeOptions = [
          {label:'excel', value: 'excel'},
          {label:'word', value: 'word'},
          {label:'presentation', value: 'presentation'},
        ];

        const type = this.props.selectNode?.data?.props?.nodeData?.data?.type ?? '';
        const fileName = this.props.selectNode?.data?.props?.nodeData?.data?.fileName ?? '';
        const template = this.props.selectNode?.data?.props?.nodeData?.data?.template ?? '';
        const docData = this.props.selectNode?.data?.props?.nodeData?.data?.docData ?? '';

    return <div>
        <div className={"settings-section " + (this.props.activeSection === "document" ? '' : 'open')}>
            <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("document")}>
                <div className="settings-section__icon d-flex">
                    <Chevron />
                </div>
                <div className="settings-section__label">Settings Document</div>
            </div>

            <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>

              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Method</div>
                <div className="control-container_select-wrapper controller-field">
                  <select className="control-select control-field"
                          value={type || ''}
                          onChange={e => {this.changeSelect(e, "type")}}
                  >
                    <option disabled value="" />
                    {typeOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                  </select>
                </div>
              </div>

                <div className="controller-container controller-container_select">
                  <div className="controller-container__label control-select__label controller-label">File Name</div>
                  <div className="control-container_select-wrapper controller-field">
                      <textarea
                        className="control-field"
                        type="text"
                        id="file-name"
                        name="file-name"
                        value={fileName || ''}
                        onChange={(e) => { this.changeInput(e, 'fileName') }}
                      />
                  </div>
                </div>
              {/*<div className="controller-container controller-container_select">*/}
              {/*  <div className="controller-container__label control-select__label controller-label">Template Name</div>*/}
              {/*  <div className="control-container_select-wrapper controller-field">*/}
              {/*      <input*/}
              {/*        className="control-field"*/}
              {/*        type="text"*/}
              {/*        id="document-template"*/}
              {/*        name="document-template"*/}
              {/*        value={template || ''}*/}
              {/*        onChange={(e) => { this.changeInput(e, 'template') }}*/}
              {/*      />*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div className="controller-container controller-container_select">*/}
              {/*    <div className="controller-container__label control-select__label controller-label">Data</div>*/}
              {/*    <div className="control-container_select-wrapper controller-field">*/}
              {/*        <textarea*/}
              {/*          className="control-field"*/}
              {/*          type="text"*/}
              {/*          id="document-data"*/}
              {/*          name="document-data"*/}
              {/*          value={docData || ''}*/}
              {/*          onChange={(e) => { this.changeInput(e, 'docData') }}*/}
              {/*        />*/}
              {/*    </div>*/}
              {/*  </div>*/}

            </div> {/* ./controllers-wrapper */}
        </div>  {/* ./settings-section */}
    </div>
    }
}
