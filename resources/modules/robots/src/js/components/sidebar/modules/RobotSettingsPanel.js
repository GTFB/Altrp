import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Chevron from "../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../store/store";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";
import Resource from "../../../../../../editor/src/js/classes/Resource";


export default class RobotSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSources: []
    };
    this.toggleChevron = this.toggleChevron.bind(this);
    this.dataSources = new Resource({ route: "/admin/ajax/data_source_options" });
  }

  async componentDidMount() {
    const dataSources = await this.dataSources.getAll();
    this.setState(s =>({...s, dataSources: dataSources?.options ?? []}));
  }

  toggleChevron(type) {
    console.log(type);
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


  getRobots() {
    let elements = store.getState()?.robotSettingsData;
    elements = _.filter(elements, item => item.type === "robot");
    return elements;
  }

  getSources() {
    const sources = this.props.sources;
    let result = [];
    sources.map(item => {
      result.push(item.id);
    });
    return result;
  }

  render() {
    const {dataSources} = this.state;
    const robots = this.getRobots();
    const sources = this.getSources();
    const sourcesData = this.props.sources ?? [];

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
                    <div className="settings-section__label">Settings Robot</div>
                  </div>

                  <div className="controllers-wrapper">
                    <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                      <div className="controller-container__label control-select__label controller-label">Sources</div>
                      <AltrpSelect id="crud-fields"
                                   className="controller-field"
                                   isMulti={true}
                                   value={_.filter(dataSources, s => sources.indexOf(s.value) >= 0)}
                                   onChange={e => {this.changeSelect(e)}}
                                   options={dataSources}
                      />

                      {sourcesData.map((item, index) =>
                        <div className="controller-container-input" key={index}>
                          <div className="controller-container controller-container_textarea" >
                            <div className="controller-container__label textcontroller-responsive">{item?.name ? item.name + ' params' : ''}</div>
                            <textarea
                              className="control-field"
                              type="text"
                              id={item?.id}
                              name={item?.name}
                              value={item?.parameters ?? ''}
                              onChange={(e) => { this.changeInput(e, item, sourcesData) }}
                            />
                          </div>
                        </div> /* ./controller-container-input */
                      )}
                    </div>
                      <div className="controller-container controller-container_select" >
                        <div className="controller-container__label control-select__label controller-label">Robots:</div>
                        <div className="control-container_select-wrapper controller-field">
                          {robots.map((item, index) =>
                          <div className="controller-container__label control-select__label controller-label" key={index}>
                            <a href={(item.data?.props?.nodeData?.id) ? `robots-editor?robot_id=${item.data?.props?.nodeData?.id}` : ""}>{item?.data?.label ?? ''}</a>
                          </div>
                          )}
                          {(robots.length === 0) && <div className="controller-container__label control-select__label controller-label">
                            Роботы не используются
                          </div>}
                        </div>
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
}
