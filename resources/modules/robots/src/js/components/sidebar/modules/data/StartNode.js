import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import Resource from "../../../../../../../editor/src/js/classes/Resource";
import store from "../../../../store/store";
import {setCurrentRobot} from "../../../../store/current-robot/actions";
import {setUpdatedNode} from "../../../../store/robot-settings/actions";
import ModelField from "./start/ModelField";
import {CONDITIONS_OPTIONS} from "../../../../../../../front-app/src/js/helpers";

export default class StartNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelOptions: [],
    }
    this.toggleChevron = this.toggleChevron.bind(this);
    this.modelOptionsResource = new Resource({route: '/admin/ajax/model_options'});
  }

  async componentDidMount() {
    const model = await this.modelOptionsResource.getAll();
    this.setState(s => ({...s, modelOptions: model.options}));
  }

  changeSelectRobot = (e, type, key = false, item = false) => {
    let robot = this.props.robot;
    const value = e.target.value;

    if (type === "start_config") {
      if (key === 'period') {
        robot.start_config.period.name = value;
      }
      if (key === 'restrictions') {
        if (_.isArray(robot.start_config.restrictions)) {
          robot.start_config.restrictions.map(i => {
            if (i.id === item.id) i.name = value;
            return i;
          });
        }
      }

    } else {
      if (type === "start_condition") {
        switch (value){
          case "cron":
            robot.start_config = {
              period: {
                name: '',
                time: ''
              },
              restrictions: [],
            }
            break;
          case "telegram_bot":
            robot.start_config = { bot_token: '' }
            break;
          default:
            robot.start_config = '';
            break;
        }
      }
      robot[type] = value;
    }
    store.dispatch(setCurrentRobot(robot));
  }

  toggleChevron(type) {
    console.log(type);
  }

// Запись значений select в store
  changeSelect(e, id, type = false) {
    const value = e.target.value;
    const node = this.props.selectNode;
    if (type === "operator") {
      node.data.props.nodeData[type] = value;
    } else {
      node.data.props.nodeData.body.map(item => {
        if (item.id === id) item.operator = value;
        return item;
      })
    }
    store.dispatch(setUpdatedNode(node));
  }

// Запись значений select в store
  changeInput(e, id, key) {
    const node = this.props.selectNode;
    node.data.props.nodeData.body.map(item => {
      if (item.id === id) {
        if (key === 'name') item.name = e.target.value;
        else item.operands[key] = e.target.value;
      }
      return item;
    });
    store.dispatch(setUpdatedNode(node));
  }

// Запись значений select в store
  changeInputRobot(e, type, key = false, id = false) {
    let robot = this.props.robot;
    let value = e.target.value;

    if (type === "bot_token") robot.start_config.bot_token = value;
    if (type === "period") robot.start_config.period.time = value;
    if (type === 'restrictions') {
      if (_.isArray(robot.start_config.restrictions)) {
        robot.start_config.restrictions.map(item => {
          if (key && item.id === id) item.time[key] = value;
          return item;
        });
      }
    }
    store.dispatch(setCurrentRobot(robot));
  }

  getNewCompare(count) {
    const countNew = count + 1;

    return {
      id: new Date().getTime(),
      name: `Compare ${countNew}`,
      "operator": "==",
      "operands": []
    };
  }

  getNewRestriction() {
    return {
      id: new Date().getTime(),
      name: "",
      time: {},
    };
  }

  onCreate() {
    const node = this.props.selectNode;
    if (_.isArray(node.data.props.nodeData.body)) {
      const count = node.data.props.nodeData.body.length;
      node.data.props.nodeData.body.push(this.getNewCompare(count));
    }
    store.dispatch(setUpdatedNode(node));
  }

  onCreateRobot() {
    const robot = this.props.robot;
    if (!robot.start_config) {
      robot.start_config = {
        period: {
          name: "",
          time: ""
        },
        restrictions: [],
      }
    }
    if (_.isArray(robot.start_config.restrictions)) {
      robot.start_config.restrictions.push(this.getNewRestriction());
    }
    store.dispatch(setCurrentRobot(robot));
  }

  onDelete(item) {
    const compares = this.getCompares();
    const newCompares = compares.filter(i => i.id !== item.id);
    const node = this.props.selectNode;
    node.data.props.nodeData.body = newCompares;
    store.dispatch(setUpdatedNode(node));
  }

  onDeleteRobot(item) {
    const restrictions = this.props.robot?.start_config?.restrictions ?? [];
    const newRestrictions = restrictions.filter(i => i.id !== item.id);
    const robot = this.props.robot;
    robot.start_config.restrictions = newRestrictions;
    store.dispatch(setCurrentRobot(robot));
  }

  getCompares() {
    return this.props.selectNode?.data?.props?.nodeData?.body ?? [];
  }

  getRestrictions() {
    const restrictions = this.props.robot?.start_config?.restrictions ?? [];
    let result = [];
    if (_.isArray(restrictions)) {
      restrictions.map(item => {
        result.push(item.name);
      });
    }
    return result;
  }


  render() {
    const {modelOptions} = this.state;
    const model = this.props.robot?.model_id ?? '';
    const start = this.props.robot?.start_condition ?? '';
    const periodOptions = [
      {label: 'каждую минуту', value: 'everyMinute'},
      {label: 'каждые 5 минут', value: 'everyFiveMinutes'},
      {label: 'каждые 10 минут', value: 'everyTenMinutes'},
      {label: 'каждые 30 минут', value: 'everyThirtyMinutes'},
      {label: 'каждый час', value: 'hourly'},
      {label: 'каждый час в -- минут', value: 'hourlyAt'},
      {label: 'каждый день в полночь', value: 'daily'},
      {label: 'каждый день в', value: 'dailyAt'},
      {label: 'каждую неделю', value: 'weekly'},
      {label: 'каждый месяц', value: 'monthly'},
      {label: 'каждые 3 месяца', value: 'quarterly'},
      {label: 'каждый год', value: 'yearly'},
    ];
    const botToken = this.props.robot?.start_config?.bot_token ?? '';
    const period = this.props.robot?.start_config?.period?.name ?? '';
    const periodTime = this.props.robot?.start_config?.period?.time ?? '';
    const restrictions = this.props.robot?.start_config?.restrictions ?? [];
    const restrictionOptions = [
      {label: 'по рабочими дням', value: 'weekdays'},
      {label: 'по понедельникам', value: 'mondays'},
      {label: 'по вторникам', value: 'tuesdays'},
      {label: 'по средам', value: 'wednesdays'},
      {label: 'по четвергам', value: 'thursdays'},
      {label: 'по пятницам', value: 'fridays'},
      {label: 'по субботам', value: 'saturdays'},
      {label: 'по воскресеням', value: 'sundays'},
      {label: 'между', value: 'between'},
      {label: 'При условии', value: 'when'},
    ];

    const logicOptions = [
      {label: 'ALL', value: 'AND'},
      {label: 'ANY', value: 'OR'},
    ];
    const logic = this.props.selectNode?.data?.props?.nodeData?.operator ?? '';
    const compares = this.getCompares();
    const bitOptions = CONDITIONS_OPTIONS;

    const startOptions = model ? [
      {label: 'created', value: 'created'},
      {label: 'updated', value: 'updated'},
      {label: 'deleted', value: 'deleted'},
      {label: 'cron', value: 'cron'},
      {label: 'logged_in', value: 'logged_in'},
      {label: 'action', value: 'action'},
      {label: 'telegram_bot', value: 'telegram_bot'}
    ] : [
      {label: 'cron', value: 'cron'},
      {label: 'logged_in', value: 'logged_in'},
      {label: 'action', value: 'action'},
      {label: 'telegram_bot', value: 'telegram_bot'}
    ];

    return (
      <div>

        <div className="settings-section open">
          <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("start")}>
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Settings Start</div>
          </div>

          <div className="controllers-wrapper">
            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">Model</div>
              <div className="control-container_select-wrapper controller-field">
                <select className="control-select control-field"
                        value={model || ''}
                        onChange={e => {
                          this.changeSelectRobot(e, "model_id")
                        }}
                >
                  <option value=""/>
                  {modelOptions.map(option => {
                    return <option value={option.value} key={option.value || 'null'}>{option.label}</option>
                  })}
                </select>
              </div>
            </div>

            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">Start</div>
              <div className="control-container_select-wrapper controller-field">
                <select className="control-select control-field"
                        value={start || ''}
                        onChange={e => {
                          this.changeSelectRobot(e, "start_condition")
                        }}
                >
                  <option disabled value=""/>
                  {startOptions.map(option => {
                    return <option value={option.value} key={option.value || 'null'}>{option.label}</option>
                  })}
                </select>
              </div>
            </div>

            {model && (start === 'created' || start === 'updated' || start === 'deleted') && <div>
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Operator</div>
                <div className="control-container_select-wrapper controller-field">
                  <select className="control-select control-field"
                          value={logic || ''}
                          onChange={e => {
                            this.changeSelect(e, false, "operator")
                          }}
                  >
                    <option disabled value=""/>
                    {logicOptions.map(option => {
                      return <option value={option.value} key={option.value || 'null'}>{option.label}</option>
                    })}
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
                  {compares.map((item, index) => {
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
                              onChange={(e) => {
                                this.changeInput(e, item.id, 'name')
                              }}
                            />
                          </div>
                          <button className="repeater-item__icon" onClick={() => this.onDelete(item)}>
                            {window.iconsManager.renderIcon('times')}
                          </button>
                        </div>
                        <div className="repeater-item-content">

                          <ModelField item={item}
                                      robot={this.props.robot}
                                      selectNode={this.props.selectNode}
                          />

                          <div className="controller-container controller-container_select">
                            <div className="controller-container__label control-select__label controller-label"></div>
                            <div className="control-container_select-wrapper controller-field">
                              <select className="control-select control-field"
                                      value={item.operator || ''}
                                      onChange={e => {
                                        this.changeSelect(e, item.id)
                                      }}
                              >
                                <option disabled value=""/>
                                {bitOptions.map(option => {
                                  return <option value={option.value} key={option.value || 'null'}>{option.label}</option>
                                })}
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
                                          onChange={(e) => {
                                            this.changeInput(e, item.id, 1)
                                          }}
                                        />
                            </div>
                          </div>}

                        </div>
                        {/* ./repeater-item-content */}
                      </div>
                    }
                  )}
                </div>
                <div className="d-flex justify-center repeater-bottom">
                  <button
                    className="btn font_montserrat font_500 btn_grey btn_active"
                    style={{background: '#87CA00', padding: '5px', fontSize: '10px', textTransform: 'uppercase'}}
                    onClick={() => this.onCreate()}
                  >
                    Add Compare
                  </button>
                </div>
              </div>
              {/* ./controller-container controller-container_repeater repeater */}

            </div>}
            {(start === 'telegram_bot') && <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Bot Token</div>
                <div className="control-container_select-wrapper controller-field">
                  <input
                    className="control-field"
                    id="bot-token"
                    name="bot-token"
                    value={botToken || ''}
                    onChange={(e) => {
                      this.changeInputRobot(e, 'bot_token')
                    }}
                  />
                </div>
              </div>}
            {(start === 'cron') && <div>
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Period</div>
                <div className="control-container_select-wrapper controller-field">
                  <select className="control-select control-field"
                          value={period || ''}
                          onChange={e => {
                            this.changeSelectRobot(e, "start_config", "period")
                          }}
                  >
                    <option disabled value=""/>
                    {periodOptions.map(option => {
                      return <option value={option.value} key={option.value || 'null'}>{option.label}</option>
                    })}
                  </select>
                </div>
              </div>
              {(period === "dailyAt") && <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Time</div>
                <div className="control-container_select-wrapper controller-field">
                  <input
                    className="control-field"
                    type="time"
                    id="cron-period-time"
                    name="cron-period-time"
                    value={periodTime || ''}
                    onChange={(e) => {
                      this.changeInputRobot(e, 'period')
                    }}
                  />
                </div>
              </div>}

              {(period === "hourlyAt") && <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Minute</div>
                <div className="control-container_select-wrapper controller-field">
                  <input
                    className="control-field"
                    type="number"
                    max={60}
                    min={1}
                    id="cron-period-number"
                    name="cron-period-number"
                    value={periodTime || ''}
                    onChange={(e) => {
                      this.changeInputRobot(e, 'period')
                    }}
                  />
                </div>
              </div>}

              <div className="controller-container controller-container_repeater repeater">
                <div className="control-header">
                  <div className="controller-container__label mt-10">
                    Restrictions
                  </div>
                </div>
                <div className="repeater-fields">

                  {restrictions.map((item, index) =>
                    <div className="repeater-item repeater-item_open" key={index}>
                      <div className="repeater-item-tools">
                        <div className="repeater-item__caption"></div>
                        <button className="repeater-item__icon" onClick={() => this.onDeleteRobot(item)}>
                          {window.iconsManager.renderIcon('times')}
                        </button>
                      </div>
                      <div className="repeater-item-content">
                        <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                          <select className="control-select control-field"
                                  value={item?.name || ''}
                                  onChange={e => {
                                    this.changeSelectRobot(e, "start_config", "restrictions", item)
                                  }}
                          >
                            <option disabled value=""/>
                            {restrictionOptions.map(option => {
                              return <option value={option.value} key={option.value || 'null'}>{option.label}</option>
                            })}
                          </select>

                        </div>
                        {(item.name === 'between') && <div className="ontroller-container controller-container_select">
                          <div className="controller-container__label control-select__label controller-label">
                            Start
                          </div>
                          <div className="control-container_select-wrapper controller-field">
                            <input
                              className="control-field"
                              type="time"
                              id={`restriction_start_${item.id}`}
                              name="restriction_start"
                              style={{width: '100%'}}
                              value={item?.time?.start ?? ''}
                              onChange={(e) => {
                                this.changeInputRobot(e, 'restrictions', 'start', item.id)
                              }}
                            />
                          </div>
                          <div className="controller-container__label control-select__label controller-label">
                            End
                          </div>
                          <div className="control-container_select-wrapper controller-field">
                            <input
                              className="control-field"
                              type="time"
                              id={`restriction_end_${item.id}`}
                              name="restriction_end"
                              style={{width: '100%'}}
                              value={item?.time?.end ?? ''}
                              onChange={(e) => {
                                this.changeInputRobot(e, 'restrictions', 'end', item.id)
                              }}
                            />
                          </div>
                        </div>}
                        {(item.name === 'when') && <div className="ontroller-container controller-container_select">
                          <div className="controller-container__label control-select__label controller-label">
                            Condition
                          </div>
                          <div className="control-container_select-wrapper controller-field">
                            <textarea
                              className="control-field"
                              type="time"
                              rows="3"
                              id={`restriction_when_${item.id}`}
                              name="restriction_when"
                              style={{width: '100%'}}
                              value={item?.time?.condition ?? ''}
                              onChange={(e) => {
                                this.changeInputRobot(e, 'restrictions', 'condition', item.id)
                              }}
                            />
                          </div>
                        </div>}

                      </div>
                      {/* ./repeater-item-content */}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-center repeater-bottom">
                  <button
                    className="btn font_montserrat font_500 btn_grey btn_active"
                    style={{background: '#87CA00', padding: '5px', fontSize: '10px', textTransform: 'uppercase'}}
                    onClick={() => this.onCreateRobot()}
                  >
                    Add
                  </button>
                </div>
              </div> {/* ./controller-container controller-container_repeater repeater */}

            </div>}

          </div> {/* ./controllers-wrapper */}
        </div> {/* ./settings-section */}

      </div>
    );
  }
}
