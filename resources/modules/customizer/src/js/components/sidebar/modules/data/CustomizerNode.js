import React, {Component} from "react";
import store from "../../../../store/store";
import { setUpdatedNode } from "../../../../store/customizer-settings/actions";
import Resource from "../../../../../../../editor/src/js/classes/Resource";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import PropertyComponent from "../../PropertyComponent";

export default class CustomizerNode extends Component{
    constructor(props){
        super(props);
        this.state={
            customizerOptions: []
        }

        this.customizerOptionsResource = new Resource({ route: "/admin/ajax/customizers_options" });
    }

    async componentDidMount() {
        const customizerOptions = await this.customizerOptionsResource.getAll();
        this.setState(s =>({...s, customizerOptions}));
    }


    // Запись значений select в store
    changeSelect(e) {
        let node = this.props.selectNode;
        node.data.props.nodeData.id = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const customizer = this.props.selectNode.data?.props?.nodeData?.id ?? '';
        const {customizerOptions} = this.state;

        return <div>
        <div className={"settings-section "}>
            <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("customizer")}>
                <div className="settings-section__icon d-flex">
                    <Chevron />
                </div>
                <div className="settings-section__label">Settings Customizer</div>
            </div>

            <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
                <div className="controller-container controller-container_select">
                    <div className="controller-container__label control-select__label controller-label"></div>
                    <div className="control-container_select-wrapper controller-field">
                    <select className="control-select control-field"
                        value={customizer || ''}
                        onChange={e => {this.changeSelect(e)}}
                    >
                        <option disabled value="" />
                        {customizerOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                    </select>
                    </div>
                </div>
                <div>
                  customizer name
                </div>
                <div>
                  {
                    customizer
                  }
                </div>
            </div>{/* ./controllers-wrapper */}
        </div> {/* ./settings-section */}

        </div>
    }
}
