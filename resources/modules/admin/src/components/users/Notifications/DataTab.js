import React, {Component} from "react";

export default class DataTab extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
        const data = this.props.data[0] ?? [];

        return <div>
            <div className="data-box-general">
                <div className="form-group">
                    <label htmlFor="field-input">Key</label>
                    <input type="text" id="field-input" name="field" value={data?.field ?? ''} onChange={(e) => { this.props.changeInputData(e, 'field')}} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="value-input">Value</label>
                    <input type="text" id="value-input" name="value" value={data?.value ?? ''} onChange={(e) => { this.props.changeInputData(e, 'value')}} className="form-control" />
                </div>
            </div>
            <div className="btn-box">
                <button className="btn btn_save" onClick={() => this.props.onSaveData('save')}>
                    Save
                </button>
            </div>
        </div>
    }
}