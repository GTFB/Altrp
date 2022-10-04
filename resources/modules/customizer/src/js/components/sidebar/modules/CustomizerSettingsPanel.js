import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Chevron from "../../../../../../editor/src/svgs/chevron.svg";
import {setCurrentCustomizer} from "../../../store/current-customizer/actions";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";
import Resource from "../../../../../../editor/src/js/classes/Resource";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";
import {InputGroup, Switch} from "@blueprintjs/core";
import { DateInput, TimePrecision } from '@blueprintjs/datetime';
import { format, parse } from 'date-fns';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';


class CustomizerSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSources: [],
      modelsOptions: [],
      customizer: {
        ...this.props.customizer
      },
      copy: false,
      copyText: false
    };
    this.modelsResource = new Resource({ route: "/admin/ajax/models_options?with_names=0&not_plural=1&with_sql_queries=0" });
    this.resource = new Resource({ route: "/admin/ajax/customizers" });
    this.dateFnsFormat = 'yyyy-MM-dd HH:mm:ss';
  }

  async componentDidMount() {
    const modelsOptions = await this.modelsResource.getAll();
    this.setState(s =>({...s, modelsOptions: modelsOptions ?? []}));
  }


  // Запись значений select в store
  changeSelect(e) {
    const sources = this.props.sources;
    let newSources = [];

    if(_.isArray(e)) {
      e.map(itemE => {
        let check = true;

        if (_.isArray(sources)) {
          sources.forEach(itemS => {
            if (itemE.value == itemS.id) {
              newSources.push(itemS);
              check = false;
            }
          });
        }
        if(check) {
          newSources.push({
            id: itemE.value,
            name: itemE.label,
            parameters: "",
          });
        }
      });
    }
    this.props.setSources(newSources);
  }

  // Запись значений input в store
  changeInput(e, source, sourcesData) {
    if(_.isArray(sourcesData)) {
      sourcesData.map(item =>{
        if(item.id == source.id) item.parameters = e.target.value;
        return item;
      });
    }
    this.props.setSources(sourcesData);
  }

  EditTitleForm = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure?")) {
      let {customizer} = this.props;
      customizer = mutate.set(customizer, 'title', this.state.customizer.title)
      window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))
      await this.resource.put(this.state.customizer.id, customizer)
    }
  }

  EditTitle = (e) => {
    this.setState(state => ({
      ...state,
      customizer: {
        ...state.customizer,
        title: e.target.value
      }
    }))
  }

  UrlCopy = () => {
    // let sourceUrl = ''
    // if (this.props.customizer.source !== null) {
    //   const { model, url } = this.state.customizer.source
    //   sourceUrl = `${'/ajax/models/' + (model?.name.slice(-1) === 's' ? model?.name + '/' : model?.name + 's/') + 'customizers' + url}`
    // }
    // const Copy = AutoCopyText(sourceUrl)
    this.setState(state => ({
      ...state,
      copy: true,
    }))
    setTimeout(() => {
      this.setState(state => ({
        ...state,
        copy: false
      }))
    }, 2000)
  }
  getModelOptions = ()=>{
    let {modelsOptions} = this.state;
    modelsOptions = modelsOptions.filter(o=>{
      return ['User', 'Role User', 'UserMeta', 'Media'].indexOf(o.label) === -1
    })
    return modelsOptions
  }

  formatDate = (date) => format(date, this.dateFnsFormat)

  parseDate = (str) => parse(str, this.dateFnsFormat, new Date())

  render() {
    let modelsOptions = this.getModelOptions();
    console.log(modelsOptions);
    const {customizer} = this.props;
    const { type, model_id, settings = {} } = customizer;

    const Middlewares = settings?.middlewares;
    const HookType = settings?.hook_type;
    const MethodType = settings?.hook_type;
    const eventType = settings?.event_type;
    const eventHookType = settings?.event_hook_type;
    const startAt = settings?.start_at ? new Date(settings.start_at) : new Date();
    const repeatCount = settings?.repeat_count;
    const infinity = settings?.infinity || false;
    const period = settings?.period;
    const periodUnit = settings?.period_unit || 'day';

    const time = customizer.time || "";
    const time_type = customizer.time_type || "none";

    let Url = ''
    if (this.props.customizer.source) {
      let { web_url } = this.props.customizer.source
      try{
        let strippedDownUrl = new URL(web_url)
        Url = document.location.origin
          +strippedDownUrl.pathname
      }catch (e){
        alert('Error while parsing source URL')
        console.error(e);
      }
    }

    return (
      <div className="panel settings-panel d-flex">
        <div className="settings-controllers">
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            <div id="settingsControllers">
              <div>

                <div className="settings-section open">
                  <div className="settings-section__title d-flex">
                    <div className="settings-section__icon d-flex">
                      <Chevron />
                    </div>
                    <div className="settings-section__label">Settings Customizer</div>
                  </div>

                  <div className="controllers-wrapper">
                    <div className="controller-container controller-container_select2">
                      <button className={"btn font_montserrat font_500 btn_grey"} style={{margin: '10px'}} onClick={() => this.props.onLayout('TB')}>vertical</button>
                      <button className={"btn font_montserrat font_500 btn_grey"} style={{margin: '10px'}} onClick={() => this.props.onLayout('LR')}>horizontal</button>
                    </div>

                    <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                      <div className="controller-container__label control-select__label controller-label">Type:</div>
                      <AltrpSelect id="crud-fields"
                                   className="controller-field"
                                   isMulti={false}
                                   value={type}
                                   onChange={this.changeType}
                                   options={[
                                     {
                                       value: '',
                                       label: 'None',
                                     },
                                     {
                                       value: 'api',
                                       label: 'Api',
                                     },
                                     {
                                       value: 'listener',
                                       label: 'Listener',
                                     },
                                     {
                                       label: 'Model Class Method',
                                       value: 'method'
                                     },
                                     {
                                       value: 'crud',
                                       label: 'CRUD'
                                     },
                                     {
                                       value: 'schedule',
                                       label: 'Schedule'
                                     }
                                     // {
                                     //   value: 'before',
                                     //   label: 'Before Page Load',
                                     // },
                                   ]}
                      />
                    </div>
                    {['api', 'method', 'crud'].includes(type) && <>
                    {/*  <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>*/}
                    {/*  <div className="controller-container__label control-select__label controller-label">Middlewares:</div>*/}
                    {/*  <AltrpSelect id="crud-fields"*/}
                    {/*               className="controller-field"*/}
                    {/*               isMulti={true}*/}
                    {/*               value={Middlewares || []}*/}
                    {/*               onChange={this.changeMiddlewares}*/}
                    {/*               options={[*/}
                    {/*                 {*/}
                    {/*                   value: 'cors',*/}
                    {/*                   label: 'CORS',*/}
                    {/*                 },*/}

                    {/*               ]}*/}
                    {/*  />*/}
                    {/*</div>*/}
                    <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                      <div className="controller-container__label control-select__label controller-label">Model:</div>
                      <AltrpSelect id="crud-fields"
                                   className="controller-field"
                                   isMulti={false}
                                   value={modelsOptions.find(o=>o.value === model_id) || {}}
                                   onChange={this.changeModel}
                                   options={modelsOptions}
                      />
                    </div>
                    </>
                    }
                    {
                      type === 'crud' && !!model_id && (
                        <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                          <div className="controller-container__label control-select__label controller-label">Event Type:</div>

                          <AltrpSelect
                            id="event-type"
                            className="controller-field"
                            isMulti={false}
                            value={eventType}
                            onChange={this.changeEventType}
                            options={[
                              {
                                label: 'Create',
                                value: 'create'
                              },
                              {
                                label: 'Update',
                                value: 'update'
                              },
                              {
                                label: 'Read',
                                value: 'read'
                              },
                              {
                                label: 'Delete',
                                value: 'delete'
                              }
                            ]}
                          />
                        </div>
                      )
                    }
                    {
                      type === 'crud' && !!model_id && !!eventType && (
                        <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                          <div className="controller-container__label control-select__label controller-label">Event Hook Type:</div>

                          <AltrpSelect
                            id="event-hook-type"
                            className="controller-field"
                            isMulti={false}
                            value={eventHookType}
                            onChange={this.changeEventHookType}
                            options={[
                              {
                                label: 'Before',
                                value: 'before'
                              },
                              {
                                label: 'After',
                                value: 'after'
                              }
                            ]}
                          />
                        </div>
                      )
                    }
                    {
                      type === 'schedule' && (
                        <>
                          <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                            <div className="controller-container__label control-select__label controller-label">Start At:</div>

                            <div className="form-control-blueprint date-input-wrapper">
                              <DateInput
                                placeholder={this.dateFnsFormat}
                                parseDate={this.parseDate}
                                formatDate={this.formatDate}
                                timePickerProps={{ precision: TimePrecision.SECOND }}
                                value={startAt}
                                onChange={this.changeStartAt}
                                id="start-at"
                              />
                            </div>
                          </div>

                          <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                            <div className="controller-container__label control-select__label controller-label">Repeat Count:</div>

                            <div className="w-75">
                              <input
                                id="repeat_count"
                                className="css-entfk-control d-inline-block w-25 pl-2 mr-4"
                                type="number"
                                value={repeatCount}
                                onChange={this.changeRepeatCount}
                                disabled={infinity}
                              />

                              <Switch className="d-inline" checked={infinity} label="Infinity" onChange={this.changeInfinity} />
                            </div>
                          </div>

                          <div className="controller-container">
                            <div className="controller-container__label control-select__label controller-label">Period: Every</div>

                            <input
                              id="period"
                              className="css-entfk-control w-25 pl-2"
                              type="number"
                              value={period}
                              onChange={this.changePeriod}
                            />

                            <AltrpSelect
                              id="period-unit"
                              className="w-50"
                              isMulti={false}
                              value={periodUnit}
                              onChange={this.changePeriodUnit}
                              options={[
                                {
                                  value: 'hour',
                                  label: 'Hour',
                                },
                                {
                                  value: 'day',
                                  label: 'Day',
                                },
                                {
                                  value: 'week',
                                  label: 'Week',
                                },
                                {
                                  value: 'month',
                                  label: 'Month',
                                },
                                {
                                  value: 'year',
                                  label: 'Year',
                                },
                              ]}
                            />
                          </div>
                        </>
                      )
                    }
                    {
                      type === "listener" && (
                        <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                          <div className="controller-container__label control-select__label controller-label">Hook Type:</div>
                          <InputGroup className="form-control-blueprint"
                                      type="text"
                                      id="customizer-title"
                                      value={HookType || ""}
                                      onChange={this.changeHookType}
                          />
                        </div>
                      )
                    }
                    {
                      type === "method" && (
                        <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                          <div className="controller-container__label control-select__label controller-label">Method name</div>
                          <InputGroup className="form-control-blueprint"
                                      type="text"
                                      id="customizer-title"
                                      value={MethodType || ""}
                                      onChange={this.changeMethodType}
                          />
                        </div>
                      )
                    }
                    <form className="Customizer-title" onSubmit={this.EditTitleForm}>
                      <div className="controller-container__label control-select__label controller-label">Title:</div>
                      <div className="customizer-block__title">
                        <InputGroup className="form-control-blueprint"
                                    type="text"
                                    id="customizer-title"
                                    value={this.state.customizer.title}
                                    onChange={this.EditTitle}
                        />
                        <button className="btn btn_success" type="submit">Save</button>
                      </div>
                    </form>
                    {
                      !['crud', 'schedule'].includes(type) && (
                        <>
                          <div className="Customizer-url">
                            <div className="controller-container__label control-select__label controller-label">Url:</div>
                            <div className="Customizer-url__block">
                              <CopyToClipboard onCopy={this.UrlCopy} text={Url}>
                                <button className="btn btn_success">Copy url</button>
                              </CopyToClipboard>
                              <div className={this.state.copy ? "text-copy__url on" : "text-copy__url"}>url copied successfully!</div>
                            </div>
                            <input value={Url} readOnly={true} className="url-text"/>
                          </div>
                          <div className="Customizer-time">
                            <AltrpSelect id="time-type-fields"
                                        className="controller-field"
                                        isMulti={false}
                                        value={time_type}
                                        onChange={this.changeTimeType}
                                        options={[
                                          {
                                            value: '',
                                            label: 'None',
                                          },
                                          {
                                            value: 'minute',
                                            label: 'Minute',
                                          },
                                          {
                                            value: 'hour',
                                            label: 'Hour',
                                          },
                                          {
                                            value: 'day',
                                            label: 'Day',
                                          },
                                          {
                                            value: 'week',
                                            label: 'Week',
                                          },
                                        ]}
                            />
                            {
                              time_type !== "none" ? (
                                <InputGroup className="form-control-blueprint customizer-time-input"
                                            type="number"
                                            id="customizer-time"
                                            value={time}
                                            onChange={this.changeTime}
                                />
                              ) : ""
                            }
                          </div>
                        </>
                      )
                    }
                  </div> {/* ./controllers-wrapper */}
                </div> {/* ./settings-section */}

              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
  changeMiddlewares = (middlewares)=>{
    let {customizer} = this.props;
    if(_.isArray(_.get(customizer, 'settings'))){
      customizer = mutate.set(customizer, 'settings', {})
    }
    customizer = mutate.set(customizer, 'settings.middlewares', middlewares||[])
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))

  }
  changeType = (e)=> {
    let {customizer} = this.props;
    customizer = mutate.set(customizer, 'type', e.value||'')
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))
  }
  changeTimeType = (e)=> {
    let {customizer} = this.props;

    customizer = mutate.set(customizer, 'time_type', e.value||'')
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))
  }
  changeTime = (e)=> {
    let {customizer} = this.props;

    customizer = mutate.set(customizer, 'time', e.target.value||'')
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))
  }
  changeModel = (e)=>{
    let {customizer} = this.props;
    customizer = mutate.set(customizer, 'model_id', e.value||'')
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))
  };
  changeEventType = (e) => {
    let { customizer } = this.props;

    if (_.isArray(_.get(customizer, 'settings'))) {
      customizer = mutate.set(customizer, 'settings', {});
    }

    customizer = mutate.set(customizer, 'settings.event_type', e.value || '');
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer));
  }
  changeEventHookType = (e) => {
    let { customizer } = this.props;

    if (_.isArray(_.get(customizer, 'settings'))) {
      customizer = mutate.set(customizer, 'settings', {});
    }

    customizer = mutate.set(customizer, 'settings.event_hook_type', e.value || '');
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer));
  }
  changeStartAt = (value) => {
    let { customizer } = this.props;

    if (_.isArray(_.get(customizer, 'settings'))) {
      customizer = mutate.set(customizer, 'settings', {});
    }

    customizer = mutate.set(customizer, 'settings.start_at', value || '');
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer));
  }
  changeRepeatCount = (e) => {
    let { customizer } = this.props;

    if (_.isArray(_.get(customizer, 'settings'))) {
      customizer = mutate.set(customizer, 'settings', {});
    }

    customizer = mutate.set(customizer, 'settings.repeat_count', e.target.value || '');
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer));
  }
  changeInfinity = (e) => {
    let { customizer } = this.props;

    if (_.isArray(_.get(customizer, 'settings'))) {
      customizer = mutate.set(customizer, 'settings', {});
    }

    customizer = mutate.set(customizer, 'settings.infinity', e.target.checked || false);
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer));
  }
  changePeriod = (e) => {
    let { customizer } = this.props;

    if (_.isArray(_.get(customizer, 'settings'))) {
      customizer = mutate.set(customizer, 'settings', {});
    }

    customizer = mutate.set(customizer, 'settings.period', e.target.value || '');
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer));
  }
  changePeriodUnit = (e) => {
    let { customizer } = this.props;

    if (_.isArray(_.get(customizer, 'settings'))) {
      customizer = mutate.set(customizer, 'settings', {});
    }

    customizer = mutate.set(customizer, 'settings.period_unit', e.value || '');
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer));
  }
  changeHookType = (e)=>{
    let {customizer} = this.props;
    if(_.isArray(_.get(customizer, 'settings'))){
      customizer = mutate.set(customizer, 'settings', {})
    }
    customizer = mutate.set(customizer, 'settings.hook_type', e.target.value||'')
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))
  };
  changeMethodType = (e)=>{
    let {customizer} = this.props;
    if(_.isArray(_.get(customizer, 'settings'))){
      customizer = mutate.set(customizer, 'settings', {})
    }
    customizer = mutate.set(customizer, 'settings.method_type', e.target.value||'')
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))
  };
}
function  mapStateToProps(state) {
  return {
    customizer: state.currentCustomizer
  }
}

export const CustomizerSettingsPanelCompose = compose(
  connect(mapStateToProps),
  withRouter
)(CustomizerSettingsPanel);
