import React, { Component } from 'react';
import '../../sass/dialog-content.scss';
import { iconsManager } from '../../../../front-app/src/js/helpers';
import Select from 'react-select'
import Resource from '../classes/Resource';
import { getTemplateId } from '../helpers';
import AltrpSelect from '../../../../admin/src/components/altrp-select/AltrpSelect';

export default class DialogConditionsTab extends Component {
  constructor(props) {
    super(props),
      this.state = {
        value: [],
        currentLogic: 'include',
        searchValue: ''
      }
    this.resource = new Resource({ route: `/admin/ajax/templates/${getTemplateId()}/settings` });
  }


  async componentDidMount() {
    let conditions = await this.resource.get('conditions');
    console.log(conditions);
    this.setState({
      value: conditions.data || []
    })
  };

  async updateConditions() {
    let res = await this.resource.put('conditions', { data: this.state.value });
    console.log(res);
  }

  addCondition() {
    let randomNumber = Math.floor(1 + Math.random() * (1000 - 1));
    this.setState(state => {
      this.state.value.push
        (
          {
            id: randomNumber,
            "include": [
              {
                type: 'all_site'
              }
            ],
            "exclude": []
          }
        )
    })
    this.forceUpdate();
  };


  removeCondition(id) {
    let filteredData = this.state.value.filter(data => data.id !== id);
    this.setState({
      value: filteredData,
    })
  }


  handleChange(e, test) {
    if (e.value === 'include') {
      this.setState({
        currentLogic: e.value,
      })
      return;
    } else if (e.value === 'exclude') {
      this.setState({
        currentLogic: e.value,
      })
      return;
    }
    if (this.state.currentLogic === 'include') {
      let data = [...this.state.value];
      let index = data.findIndex(obj => obj.id === test.id);
      data[index].include[0] = { ...data[index].include[0], [e.name]: e.value };
      data[index].exclude = [];
      this.setState({
        value: data,
      })
    } else if (this.state.currentLogic === 'exclude') {
      let data = [...this.state.value];
      let index = data.findIndex(obj => obj.id === test.id);
      data[index].exclude[0] = { ...data[index].exclude[0], [e.name]: e.value };
      data[index].include = [];
      this.setState({
        value: data,
      })
    }
  }

  handleSelect(e) {

  }



  render() {
    const logic_options = [
      { name: 'logic_type', value: 'include', label: 'Include' },
      { name: 'logic_type', value: 'exclude', label: 'Exclude' },
    ];
    const main_options = [
      { name: 'type', value: 'all_site', label: 'All Site' },
      { name: 'type', value: 'page', label: 'Page' },
      { name: 'type', value: 'model', label: 'Model' },
      { name: 'type', value: 'not_authorized_page', label: 'Not Authorized' },
      { name: 'type', value: 'not_found_page', label: 'Not found: 404' },
    ]
    const model_options = [
      { name: 'model_name', value: 'model1', label: 'model1' },
      { name: 'model_name', value: 'model2', label: 'model2' },
      { name: 'model_name', value: 'model3', label: 'model3' },
      { name: 'model_name', value: 'model4', label: 'model4' },
    ]
    return (
      <div className="modal-condition-tab">
        <div className="modal-condition-image">
          {
            iconsManager().renderIcon('conditions_tab')
          }
        </div>
        <div className="modal-condition-title">Where Do You Want to Display Your Template?</div>
        <div className="modal-condition-text">
          Set the conditions that determine where your Template is used throughout your site.<br />
          For example, choose 'Entire Site' to display the template across your site.
        </div>
        <div className="modal-repeater-fields-wrapper">
          <div className="modal-repeater-fields">
            {
              this.state.value.map(test => {
                return (
                  <div className="modal-repeater-field" key={test.id}>
                    <Select
                      onChange={(e) => this.handleChange(e, test)}
                      className="modal-repeater-field-c1"
                      options={logic_options}
                      defaultValue={
                        logic_options[0]
                      }
                    />
                    <Select
                      onChange={(e) => this.handleChange(e, test)}
                      className="modal-repeater-field-c2"
                      options={main_options}
                      defaultValue={main_options[0]}
                    />
                    {
                      (test.include[0]) &&
                      (test.include[0].type === 'model'
                        &&
                        <Select
                          onChange={(e) => this.handleChange(e, test)}
                          className="modal-repeater-field-c3"
                          defaultValue={model_options[0]}
                          options={model_options}
                        />)
                    }
                    {
                      (test.exclude[0]) &&
                      (test.exclude[0].type === 'model' &&
                        <Select
                          onChange={(e) => this.handleChange(e, test)}
                          className="modal-repeater-field-c3"
                          defaultValue={model_options[0]}
                          options={model_options}
                        />)
                    }
                    {
                      (test.include[0]) &&
                      (((test.include[0].type === 'model' && test.include[0].model_name) || test.include[0].type === 'page') &&
                        <AltrpSelect
                          value={this.state.searchValue}
                          onChange={(e) => this.handleSelect(e)}
                          placeholder="All"
                          className="modal-repeater-field-c3"
                          optionsRoute="/admin/ajax/pages_options"
                        />)
                    }
                    {
                      (test.exclude[0]) &&
                      (((test.exclude[0].type === 'model' && test.exclude[0].model_name) || test.exclude[0].type === 'page') &&
                        <AltrpSelect
                          placeholder="All"
                          className="modal-repeater-field-c3"
                          optionsRoute="/admin/ajax/pages_options"
                        />)
                    }
                    <button onClick={() => this.removeCondition(test.id)} className="modal-repeater-tool-remove">X</button>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="modal-condition-button-wrapper">
          <button onClick={() => this.addCondition()} className="modal-condition-button">Add condition</button>
        </div>
        <div className="modal-footer">
          <button onClick={() => this.updateConditions()} className="modal-footer__button modal-save">Save & close</button>
          <button onClick={() => this.updateConditions()} className="modal-footer__button modal-next">Next</button>
        </div>
      </div>
    )
  }
};
