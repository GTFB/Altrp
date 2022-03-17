import React, { Component } from "react";
import Chevron from "../../../../../../../../../../editor/src/svgs/chevron.svg";
import Resource from "../../../../../../../../../../editor/src/js/classes/Resource";



class SendEmail extends Component{
    constructor(props){
        super(props);
        this.state = {
            templateOptions: [],
            rolesOptions: []
        };
        this.templateOptions = new Resource({ route: "/admin/ajax/templates/options?value=guid" });
    }

    async componentDidMount() {
        const templateOptions = await this.templateOptions.getAll();
        this.setState(s =>({...s, templateOptions}));
    }


    render(){
        const {templateOptions} = this.state;
        return <div className="settings-section-box">
            <div className={"settings-section " + (this.props.activeSection === "mail" ? '' : 'open')}>
                <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("mail")}>
                    <div className="settings-section__icon d-flex">
                        <Chevron />
                    </div>
                    <div className="settings-section__label">Settings Mail</div>
                </div>

                <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
                  <div className="controller-container controller-container_textarea">
                    <div className="controller-container__label textcontroller-responsive controller-label">From</div>
                    <div className='controller-field'>
                      <input className="control-field" type="text" id="email-from" name="from" value={this.props.content.from ?? ''} onChange={(e) => { this.props.onSend(e, "from") }}/>
                    </div>
                  </div>
                  <div className="controller-container controller-container_textarea">
                    <div className="controller-container__label textcontroller-responsive controller-label">Subject</div>
                    <div className='controller-field'>
                      <input className="control-field" type="text" id="email-subject" name="subject" value={this.props.content.subject ?? ''} onChange={(e) => { this.props.onSend(e, "subject") }}/>
                    </div>
                  </div>
                  <div className="controller-container controller-container_select">
                        <div className="controller-container__label control-select__label controller-label">Template</div>
                        <div className="control-container_select-wrapper controller-field">
                          <select className="control-select control-field"
                              value={this.props.content?.template ?? ''}
                              onChange={e => {{ this.props.onSend(e, "template") }}}
                          >
                              <option disabled value="" />
                              {templateOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                          </select>
                        </div>
                    </div>
                </div>  {/* ./controllers-wrapper */}
            </div>  {/* ./settings-section */}
        </div>
    }
}

export default SendEmail;
