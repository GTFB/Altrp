import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";
import ModalCustomizerCode from "../../../EmailTemplateModal";
import '../../../../../sass/email-editor-styles.scss'

class EmailTemplateNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  changeByPath = (e, path) => {
    let node = this.getNode();
    node = mutate.set(node, `data.${path}`, e)
    store.dispatch(setUpdatedNode(node));
  }

  getNode() {
    let node = this.props.customizerSettingsData?.find(n => {
      return this.props.selectNode?.id == n.id
    });
    return node;
  }

  onSave=(html, design)=>{
    this.changeByPath(html, 'value')
    this.changeByPath(design, 'design')

    this.setState(state=>({...state, editorIsOpen: false}))
  }

  openEditor = ()=>{
   this.setState(state=>({...state, editorIsOpen: true}))
  }
  toggleModal = (e)=>{

    this.setState(state=>({...state, editorIsOpen: false}))
  }
  render() {
    const node = this.getNode();
    const value = node?.data?.value || '';
    const design = node?.data?.design;
    const data = node?.data?.data || '';
    const path = node?.data?.path || '';
    return (
      <div>
        <div className="settings-section open">
          <div className="settings-section__title d-flex">
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Template Settings</div>
          </div>

          <div className="controllers-wrapper">

            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">
                Path to Data
              </div>
              <div className="bp3-control-group bp3-numeric-input">
                <div className="bp3-input-group">
                  <input type="text"
                         id="mapper-source"
                         onChange={(e)=>{
                           this.changeByPath(e.target.value, 'data');
                         }}
                         className="bp3-input"
                         value={data}/>
                </div>

              </div>
            </div>
            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">
                Path to Save
              </div>
              <div className="bp3-control-group bp3-numeric-input">
                <div className="bp3-input-group">
                  <input type="text"
                         id="mapper-source"
                         onChange={(e)=>{
                           this.changeByPath(e.target.value, 'path');
                         }}
                         className="bp3-input"
                         value={path}/>
                </div>

              </div>
            </div>
            <div className="controller-container controller-container_select">


              <button className="btn-code__modal"
                      onClick={this.openEditor}
                      style={{marginTop: "10px"}}>Open Editor</button>

            </div>
          </div>
          {/* ./controllers-wrapper */}
        </div>
        {/* ./settings-section */}
        <ModalCustomizerCode
          toggleModal={this.toggleModal}
          onSave={this.onSave}
          defaultValue={value}
          defaultDesign={design}
          show={this.state.editorIsOpen}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {customizerSettingsData: state.customizerSettingsData}
}

export default connect(mapStateToProps)(EmailTemplateNode)
