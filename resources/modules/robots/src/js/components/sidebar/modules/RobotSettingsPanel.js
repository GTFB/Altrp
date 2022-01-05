import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Chevron from "../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../store/store";
import {setCurrentRobot} from "../../../store/current-robot/actions";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";
import Resource from "../../../../../../editor/src/js/classes/Resource";
import {MultiSelect} from "@blueprintjs/select";
import {MenuItem} from "@blueprintjs/core";


export default class RobotSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSources: [],
      categoryOptions: []
    };
    this.toggleChevron = this.toggleChevron.bind(this);
    this.toggle = this.toggle.bind(this);
    this.dataSources = new Resource({ route: "/admin/ajax/data_source_options" });
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"})
  }

  async componentDidMount() {
    const dataSources = await this.dataSources.getAll();
    let {data} = await this.categoryOptions.getAll();
    this.setState(s =>({...s, dataSources: dataSources?.options ?? [], categoryOptions: data }));
  }

  toggleChevron(type) {
    console.log(type);
  }

  // Изменение положения переключателя
  toggle() {
    let robot = this.props.robot;
    robot.enabled = robot.enabled ? 0 : 1 ;
    store.dispatch(setCurrentRobot(robot));
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

    let value = this.props.robot?.enabled ?? false;
    let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;

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
                    <div className="robot_switcher">
                      <div className="robot_switcher__label">
                        Robot enable
                      </div>
                      <div className={switcherClasses} onClick={this.toggle}>
                        <div className="control-switcher__on-text">ON</div>
                        <div className="control-switcher__caret" />
                        <div className="control-switcher__off-text">OFF</div>
                      </div>
                    </div>
                    <div className="controller-container controller-container_select2">
                      <button className={"btn font_montserrat font_500 btn_grey"} style={{margin: '10px'}} onClick={() => this.props.onLayout('TB')}>vertical</button>
                      <button className={"btn font_montserrat font_500 btn_grey"} style={{margin: '10px'}} onClick={() => this.props.onLayout('LR')}>horizontal</button>
                    </div>

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
                    <div className="controller-container controller-container_select form-group__multiSelectBlueprint-robot">
                      <label htmlFor="categories-robot" className="controller-container__label control-select__label controller-label">Categories</label>
                      <MultiSelect tagRenderer={this.props.tagRenderer} id="categories"
                                   items={this.state.categoryOptions}
                                   itemPredicate={this.props.onQueryChangeMulti}
                                   noResults={<MenuItem disabled={true} text="No results."/>}
                                   fill={true}
                                   placeholder="Categories..."
                                   selectedItems={this.props.selectItems}
                                   onItemSelect={this.props.handleItemSelectCategory}
                                   itemRenderer={(item, {handleClick, modifiers, query}) => {
                                     return (
                                       <MenuItem
                                         icon={this.props.isItemSelectedCategory(item) ? "tick" : "blank"}
                                         text={item.label}
                                         key={item.value}
                                         onClick={handleClick}
                                       />
                                     )
                                   }}
                                   tagInputProps={{
                                     onRemove: this.props.handleTagRemoveCategory,
                                     large: false,
                                   }}
                                   popoverProps={{
                                     usePortal: false
                                   }}
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
}
