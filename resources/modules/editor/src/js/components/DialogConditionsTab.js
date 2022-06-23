import React, { Component } from "react";
import ("../../sass/dialog-content.scss");
import { iconsManager } from "../../../../front-app/src/js/helpers";
import Select from "react-select";
import Resource from "../classes/Resource";
import { getEditor, getTemplateId } from "../helpers";
import AltrpSelect from "../../../../admin/src/components/altrp-select/AltrpSelect";

export default class DialogConditionsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      currentLogic: "include",
      searchValue: "",
      pageOptions: [],
    };
    this.resource = new Resource({
      route: `/admin/ajax/templates/${getTemplateId()}/conditions`
    });
  }

  async componentDidMount() {
    let conditions = await this.resource.getAll();
    let pageOptions = await new Resource({
      route: "/admin/ajax/pages_options"
    }).getAll();
    this.setState({
      value: conditions.data || [],
      pageOptions,
    });
  }

  /**
   * запрос на обнровление условий
   * @param {boolean} close
   * @return {Promise<void>}
   */
  async updateConditions(close = false) {
    let res = await new Resource({
      route: `/admin/ajax/templates/${getTemplateId()}/conditions`
    }).put("", { data: this.state.value });
    if (close) {
      getEditor().toggleModalWindow();
    }
  }

  addCondition() {
    let randomNumber = Math.floor(1 + Math.random() * (1000 - 1));
    let value = _.cloneDeep(this.state.value);
    value.push({
      object_type: "all_site",
      object_ids: [],
      id: randomNumber,
      condition_type: "include"
    });
    this.setState(state => ({
      ...state,
      value
    }));
    this.forceUpdate();
  }

  removeCondition(id) {
    let filteredData = this.state.value.filter(data => data.id !== id);
    this.setState({
      value: filteredData
    });
  }

  handleChange(e, test) {
    if (e.value === "include") {
      this.setState({
        currentLogic: e.value
      });
      return;
    } else if (e.value === "exclude") {
      this.setState({
        currentLogic: e.value
      });
      return;
    }
    if (this.state.currentLogic === "include") {
      let data = [...this.state.value];
      let index = data.findIndex(obj => obj.id === test.id);
      data[index].include[0] = { ...data[index].include[0], [e.name]: e.value };
      data[index].exclude = [];
      this.setState({
        value: data
      });
    } else if (this.state.currentLogic === "exclude") {
      let data = [...this.state.value];
      let index = data.findIndex(obj => obj.id === test.id);
      data[index].exclude[0] = { ...data[index].exclude[0], [e.name]: e.value };
      data[index].include = [];
      this.setState({
        value: data
      });
    }
  }
  /**
   * именение object_type для условий
   * @param {object} e
   * @param {integer} conditionId
   */
  handleObjectTypeChange = (e, conditionId) => {
    let value = _.cloneDeep(this.state.value);
    value.forEach(v => {
      if (v.id === conditionId) {
        v.object_type = e.value;
        v.object_ids = [];
      }
    });
    this.setState(state => ({
      ...state,
      value
    }));
  };
  /**
   * изменение спика ид объектов
   * @param {array} ids
   * @param {integer} conditionId
   */
  handleIdsSelect = (ids, conditionId) => {
    let value = _.cloneDeep(this.state.value);
    value.forEach(v => {
      if (v.id === conditionId && ids !== null) {
        v.object_ids = ids.map(id => id.value);
      }
      if (v.id === conditionId && ids === null) {
        v.object_ids = [];
      }
    });
    this.setState(state => ({
      ...state,
      value
    }));
  };
  /**
   * изменение типа  условия
   * @param {array} e
   * @param {integer} conditionId
   */
  handleChangeConditionType = (e, conditionId) => {
    let value = _.cloneDeep(this.state.value);
    value.forEach(v => {
      if (v.id === conditionId) {
        v.condition_type = e.value;
      }
    });
    this.setState(state => ({
      ...state,
      value
    }));
  };
  handleSelect(e) { }

  render() {
    const logic_options = [
      { name: "logic_type", value: "include", label: "Include" },
      { name: "logic_type", value: "exclude", label: "Exclude" }
    ];
    const main_options = [
      { name: "type", value: "all_site", label: "All Site" },
      { name: "type", value: "page", label: "Page" },
      { name: "type", value: "404", label: "404 " },
      // { name: 'type', value: 'model', label: 'Model' },
      // { name: 'type', value: 'not_authorized_page', label: 'Not Authorized' },
      // { name: 'type', value: 'not_found_page', label: 'Not found: 404' },
    ];
    return (
      <div className="modal-condition-tab">
        <div className="modal-condition-image">
          {iconsManager().renderIcon("conditions_tab")}
        </div>
        <div className="modal-condition-title">
          Where Do You Want to Display Your Template?
        </div>
        <div className="modal-condition-text">
          Set the conditions that determine where your Template is used
          throughout your site.
          <br />
          For example, choose 'Entire Site' to display the template across your
          site.
        </div>
        <div className="modal-repeater-fields-wrapper">
          <div className="modal-repeater-fields">
            {this.state.value.map(test => {
              return (
                <div className="modal-repeater-field" key={test.id}>
                  <AltrpSelect
                    onChange={e => this.handleChangeConditionType(e, test.id)}
                    className="modal-repeater-field-c1"
                    options={logic_options}
                    value={
                      _.find(
                        logic_options,
                        o => o.value === test.condition_type
                      ) || logic_options[0]
                    }
                  />
                  <AltrpSelect
                    onChange={value =>
                      this.handleObjectTypeChange(value, test.id)
                    }
                    className="modal-repeater-field-c2"
                    options={main_options}
                    value={
                      _.find(main_options, o => o.value === test.object_type) ||
                      main_options[0]
                    }
                  // defaultValue={main_options[0]}
                  />
                  {/*{*/}
                  {/*(test.include[0]) &&*/}
                  {/*(test.include[0].type === 'model'*/}
                  {/*&&*/}
                  {/*<Select*/}
                  {/*onChange={(e) => this.handleChange(e, test)}*/}
                  {/*className="modal-repeater-field-c3"*/}
                  {/*defaultValue={model_options[0]}*/}
                  {/*options={model_options}*/}
                  {/*/>)*/}
                  {/*}*/}
                  {/*{*/}
                  {/*(test.exclude[0]) &&*/}
                  {/*(test.exclude[0].type === 'model' &&*/}
                  {/*<Select*/}
                  {/*onChange={(e) => this.handleChange(e, test)}*/}
                  {/*className="modal-repeater-field-c3"*/}
                  {/*defaultValue={model_options[0]}*/}
                  {/*options={model_options}*/}
                  {/*/>)*/}
                  {/*}*/}
                  {test.object_type === "page" && (
                    <AltrpSelect
                      // value={(test.object_ids || []).map(o=>this.state.pageOptions.find())}
                      value={_.filter(
                        this.state.pageOptions,
                        p =>
                          test.object_ids &&
                          test.object_ids.indexOf(p.value) >= 0
                      )}
                      onChange={e => this.handleIdsSelect(e, test.id)}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      placeholder="Choose Pages"
                      options={this.state.pageOptions}
                      className="modal-repeater-field-c3"
                    />
                  )}

                  <button
                    onClick={() => this.removeCondition(test.id)}
                    className="modal-repeater-tool-remove"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-condition-button-wrapper">
          <button
            onClick={() => this.addCondition()}
            className="modal-condition-button"
          >
            Add condition
          </button>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => this.updateConditions(true)}
            className="modal-footer__button modal-save"
          >
            Save & close
          </button>
          <button
            onClick={() => this.updateConditions()}
            className="modal-footer__button modal-next"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
