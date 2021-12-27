import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Chevron from "../../../../../../editor/src/svgs/chevron.svg";
import {setCurrentCustomizer} from "../../../store/current-customizer/actions";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";
import Resource from "../../../../../../editor/src/js/classes/Resource";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";


class CustomizerSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSources: [],
      modelsOptions: [],
    };
    this.modelsResource = new Resource({ route: "/admin/ajax/models_options?with_names=0&not_plural=1&with_sql_queries=0" });
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

  render() {
    const {modelsOptions} = this.state;
    const {customizer} = this.props;
    const {type, model_id, settings = {}} = customizer
    const {middlewares = []} = settings;

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
                                     // {
                                     //   value: 'method',
                                     //   label: 'Model Custom Method',
                                     // },
                                     // {
                                     //   value: 'before',
                                     //   label: 'Before Page Load',
                                     // },
                                   ]}
                      />
                    </div>
                    {type === 'api' && <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                      <div className="controller-container__label control-select__label controller-label">Middlewares:</div>
                      <AltrpSelect id="crud-fields"
                                   className="controller-field"
                                   isMulti={true}
                                   value={middlewares}
                                   onChange={this.changeMiddlewares}
                                   options={[
                                     {
                                       value: 'cors',
                                       label: 'CORS',
                                     },

                                   ]}
                      />
                    </div>}
                    <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                      <div className="controller-container__label control-select__label controller-label">Model:</div>
                      <AltrpSelect id="crud-fields"
                                   className="controller-field"
                                   isMulti={false}
                                   value={modelsOptions.find(o=>o.value == model_id) || {}}
                                   onChange={this.changeModel}
                                   options={modelsOptions}
                      />
                    </div>
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
  changeModel = (e)=>{
    let {customizer} = this.props;
    customizer = mutate.set(customizer, 'model_id', e.value||'')
    window.customizerEditorStore.dispatch(setCurrentCustomizer(customizer))
  };

}
function  mapStateToProps(state) {
  return {
    customizer: state.currentCustomizer
  }
}
export default connect(mapStateToProps)(CustomizerSettingsPanel)
