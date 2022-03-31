import React, {Component} from "react";
import store from "../../../../../store/store";
import { setUpdatedNode } from "../../../../../store/customizer-settings/actions";
import Resource from "../../../../../../../../editor/src/js/classes/Resource";
import Chevron from "../../../../../../../../editor/src/svgs/chevron.svg";

export default class RobotNode extends Component{
    constructor(props){
        super(props);
        this.state={
            robotOptions: []
        }
        this.robotOptionsResource = new Resource({ route: "/admin/ajax/customizers_options" });
    }

    async componentDidMount() {
        const robotOptions = await this.robotOptionsResource.getAll();
        this.setState(s =>({...s, robotOptions}));
    }


    // Запись значений select в store
    changeSelect(e) {
        let node = this.props.selectNode;
        node.data.props.nodeData.id = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const robot = this.props.selectNode.data?.props?.nodeData?.id ?? '';
        const {robotOptions} = this.state;

        return <div>
        <div className={"settings-section "}>
            <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("robot")}>
                <div className="settings-section__icon d-flex">
                    <Chevron />
                </div>
                <div className="settings-section__label">Settings Customizer</div>
            </div>

            <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
                <div className="controller-container controller-container_select">
                    <div className="controller-container__label control-select__label controller-label">Start</div>
                    <div className="control-container_select-wrapper controller-field">
                    <select className="control-select control-field"
                        value={robot || ''}
                        onChange={e => {this.changeSelect(e)}}
                    >
                        <option disabled value="" />
                        {robotOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label} ({option.value})</option> })}
                    </select>
                    </div>
                </div>
            </div>{/* ./controllers-wrapper */}
        </div> {/* ./settings-section */}

        </div>
    }
}
