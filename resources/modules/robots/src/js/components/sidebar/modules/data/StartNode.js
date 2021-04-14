import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import Resource from "../../../../../../../editor/src/js/classes/Resource";
import store from "../../../../store/store";
import {setCurrentRobot} from "../../../../store/current-robot/actions";
import {setUpdatedNode} from "../../../../store/robot-settings/actions";
import {iconsManager} from "../../../../../../../editor/src/js/helpers";
import ModelField from "./start/ModelField";
import {CONDITIONS_OPTIONS} from "../../../../../../../front-app/src/js/helpers";

export default class StartNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelOptions: [],
    }
    this.toggleChevron = this.toggleChevron.bind(this);
    this.modelOptionsResource = new Resource({ route: '/admin/ajax/model_options' });
  }

  async componentDidMount() {
    const model = await this.modelOptionsResource.getAll();
    this.setState(s =>({...s, modelOptions: model.options }));
  }

  changeSelectRobot = (e, type) => {
    let robot = this.props.robot;
    robot[type] = e.target.value;
    store.dispatch(setCurrentRobot(robot));
  }

  toggleChevron(type) {
    console.log(type);
  }

  // Запись значений select в store
  changeSelect(e, id, type = false) {
    const value = e.target.value;
    const node = this.props.selectNode;
    console.log(type);
    if(type === "operator"){
      node.data.props.nodeData[type] = value;
    } else {
      node.data.props.nodeData.body.map(item => {
        if(item.id === id) item.operator = value;
        return item;
      })
    }
    store.dispatch(setUpdatedNode(node));
  }

  // Запись значений select в store
  changeInput(e, id, key) {
    const node = this.props.selectNode;

    node.data.props.nodeData.body.map(item =>{
      if(item.id === id) {
        if(key === 'name') item.name = e.target.value;
        else item.operands[key] = e.target.value;
      }
      return item;
    });
    store.dispatch(setUpdatedNode(node));
  }

  getNewCompare(count){
    const countNew = count + 1;

    return {
      id: new Date().getTime(),
      name: `Compare ${countNew}`,
      "operator": "==",
      "operands":[]
    };
  }

  onCreate(){
    const node = this.props.selectNode;
    if(_.isArray(node.data.props.nodeData.body)) {
      const count = node.data.props.nodeData.body.length;
      node.data.props.nodeData.body.push(this.getNewCompare(count));
    }
    store.dispatch(setUpdatedNode(node));
  }

  onDelete(item){
    const compares = this.getCompares();
    const newCompares = compares.filter(i => i.id !== item.id);
    const node = this.props.selectNode;
    node.data.props.nodeData.body = newCompares;
    store.dispatch(setUpdatedNode(node));
  }

  getCompares(){
    return this.props.selectNode?.data?.props?.nodeData?.body ?? [];
  }


  render() {
    const {modelOptions} = this.state;
    const model = this.props.robot?.model_id ?? '';
    const start = this.props.robot?.start_condition ?? '';
    const logicOptions = [
      {label:'ALL', value: 'AND'},
      {label:'ANY', value: 'OR'},
    ];
    const logic = this.props.selectNode?.data?.props?.nodeData?.operator ?? '';
    const compares = this.getCompares();
    const bitOptions = CONDITIONS_OPTIONS;



    const startOptions = model ? [
      {label:'created', value: 'created'},
      {label:'updated', value: 'updated'},
      {label:'deleted', value: 'deleted'},
      {label:'logged_in', value: 'logged_in'},
      {label:'action', value: 'action'}
    ] : [
      {label:'logged_in', value: 'logged_in'},
      {label:'action', value: 'action'}
    ];

    return (
              <div>

                <div className="settings-section open">
                  <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("start")}>
                    <div className="settings-section__icon d-flex">
                      <Chevron />
                    </div>
                    <div className="settings-section__label">Settings Start</div>
                  </div>

                  <div className="controllers-wrapper">
                    <div className="controller-container controller-container_select">
                      <div className="controller-container__label control-select__label controller-label">Model</div>
                      <div className="control-container_select-wrapper controller-field">
                        <select className="control-select control-field"
                            value={model || ''}
                            onChange={e => {this.changeSelectRobot(e, "model_id")}}
                        >
                            <option value="" />
                            {modelOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                        </select>
                      </div>
                    </div>

                    <div className="controller-container controller-container_select" >
                        <div className="controller-container__label control-select__label controller-label">Start</div>
                        <div className="control-container_select-wrapper controller-field">
                          <select className="control-select control-field"
                              value={start || ''}
                              onChange={e => {this.changeSelectRobot(e, "start_condition")}}
                          >
                              <option disabled value="" />
                              {startOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                          </select>
                        </div>
                      </div>

                    {model && <div>
                      <div className="controller-container controller-container_select">
                        <div className="controller-container__label control-select__label controller-label">Operator</div>
                        <div className="control-container_select-wrapper controller-field">
                          <select className="control-select control-field"
                                  value={logic || ''}
                                  onChange={e => {this.changeSelect(e, false, "operator")}}
                          >
                            <option disabled value="" />
                            {logicOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                          </select>
                        </div>
                      </div>

                      <div className="controller-container controller-container_repeater repeater">
                        <div className="control-header">
                          <div className="controller-container__label mt-10">
                            Compares
                          </div>
                        </div>
                        <div className="repeater-fields">
                          {compares.map( (item, index) =>{
                            return <div className="repeater-item repeater-item_open" key={index}>
                              <div className="repeater-item-tools">
                                <div className="repeater-item__caption">
                                  <input
                                    className="compare-control-field"
                                    type="text"
                                    id={`compare_${item.id}`}
                                    name="compare"
                                    style={{width: '100%'}}
                                    value={item?.name ?? ''}
                                    onChange={(e) => { this.changeInput(e, item.id, 'name') }}
                                  />
                                </div>
                                <button className="repeater-item__icon" onClick={() => this.onDelete(item)}>
                                  {iconsManager().renderIcon('times')}
                                </button>
                              </div>
                              <div className="repeater-item-content">

                                <ModelField item={item}
                                  robot={this.props.robot}
                                  selectNode={this.props.selectNode}
                                />

                                <div className="controller-container controller-container_select">
                                  <div className="controller-container__label control-select__label controller-label" ></div>
                                  <div className="control-container_select-wrapper controller-field">
                                    <select className="control-select control-field"
                                            value={item.operator || ''}
                                            onChange={e => {this.changeSelect(e, item.id)}}
                                    >
                                      <option disabled value="" />
                                      {bitOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                                    </select>
                                  </div>
                                </div>

                                {(
                                  item.operator != "empty" &&
                                  item.operator != "not_empty" &&
                                  item.operator != "null" &&
                                  item.operator != "not_null"
                                ) && <div className="controller-container controller-container_textarea">
                                  <div className="controller-container__label control-select__label controller-label">
                                    Value
                                  </div>
                                  <div className="control-group controller-field">
                                        <textarea
                                          className="control-field"
                                          type="text"
                                          id={`operand-2_${item.id}`}
                                          name="operand"
                                          style={{width: '100%'}}
                                          value={item.operands[1] ?? ''}
                                          onChange={(e) => { this.changeInput(e, item.id, 1) }}
                                        />
                                  </div>
                                </div>}

                              </div>{/* ./repeater-item-content */}
                            </div>}
                          )}
                        </div>
                        <div className="d-flex justify-center repeater-bottom">
                          <button
                            className="btn font_montserrat font_500 btn_grey btn_active"
                            style={{background:'#87CA00', padding:'5px', fontSize: '10px', textTransform: 'uppercase'}}
                            onClick={() => this.onCreate()}
                          >
                            Add Compare
                          </button>
                        </div>
                      </div>{/* ./controller-container controller-container_repeater repeater */}

                    </div>}

                  </div> {/* ./controllers-wrapper */}
                </div> {/* ./settings-section */}

              </div>
    );
  }
}
