import React, { Component } from 'react';
import ('../../sass/dialog-content.scss');
import { iconsManager } from '../../../../front-app/src/js/helpers';
import { getTemplateId } from '../helpers';
import Resource from '../classes/Resource';

export default class DialogTriggersTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {},
      onLoad: false,
      onScroll: false,
      scrollElement: false,
      onClick: false,
      afterInactivity: false,
      on_exit: false,
    }
    this.resource = new Resource({ route: `/admin/ajax/templates/${getTemplateId()}/settings` })
  }

  async updateTriggers() {
    const { inactivity, on_click, on_exit, on_page_load, on_scroll, to_element } = this.state.value;
    const { afterInactivity, onClick, onLoad, onScroll, scrollElement } = this.state;
    const data = {
      inactivity: afterInactivity && inactivity,
      on_click: onClick && on_click,
      on_exit,
      on_page_load: onLoad && on_page_load,
      on_scroll: onScroll && on_scroll,
      to_element: scrollElement && to_element
    }
    let res = await this.resource.put('triggers', { data });
  }



  /**  Отправляем get request, результат присваиваем  state.value */
  async componentDidMount() {
    let triggers = await this.resource.get('triggers')
    this.setState({
      value: triggers.data,
    })
  }

  handleChangePage(e) {
    if (e.target.name === 'direction') {
      this.setState({
        value: {
          ...this.state.value,
          on_scroll: {
            ...this.state.value.on_scroll,
            direction: e.target.value,
          }
        }
      })
      return;
    } else if (e.target.name === 'size') {
      this.setState({
        value: {
          ...this.state.value,
          on_scroll: {
            ...this.state.value.on_scroll,
            size: e.target.value,
          }
        }
      })
      return;
    }
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value
      }
    })
  }

  handleCheck(e) {
    if (e.target.name === 'on_exit') {
      this.setState({
        [e.target.name]: e.target.checked,
        value: {
          ...this.state.value,
          [e.target.name]: e.target.checked,
        }
      })
    }
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  render() {
    return (
      <div className="triggers-tab">
        <div className="triggers-wrapper">
          <div className="triggers-icon-wrapper">
            {
              iconsManager().renderIcon('page_load')
            }
          </div>
          <div className="triggers-title">On Page Load</div>
          <div className="triggers-control-content">
            {this.state.onLoad &&
              <div className="triggers-control-field">
                <label htmlFor="triggers-control-field-pageLoad">Within(sec)</label>
                <div className="triggers-control-input-wrapper">
                  <input className="triggers-control-input"
                    id="triggers-control-field-pageLoad"
                    onChange={(e) => this.handleChangePage(e)} type="number"
                    min="0"
                    step="0.1"
                    value={this.state.on_page_load}
                    name="on_page_load"
                  />
                </div>
              </div>
            }
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name="onLoad"
                checked={this.state[name]}
                id="toggleSwitch"
                onChange={(e) => this.handleCheck(e)}
              />
              <label className="toggle-switch-label" htmlFor="toggleSwitch">
                <span className="toggle-switch-inner" />
                <span className="toggle-switch-switch" />
              </label>
            </div>
          </div>
        </div>
        <div className="triggers-wrapper">
          <div className="triggers-icon-wrapper">
            {
              iconsManager().renderIcon('scrolling')
            }
          </div>
          <div className="triggers-title">On Scroll</div>
          <div className="triggers-control-content">
            {this.state.onScroll &&
              <div className="triggers-control-field">
                <label htmlFor="triggers-control-field-inputSelect">Direction</label>
                <div className="triggers-control-input-wrapper">
                  <select
                    name="direction"
                    onChange={(e) => this.handleChangePage(e)}
                    id="triggers-control-field-inputSelect">
                    <option value="down">Down</option>
                    <option value="up">Up</option>
                  </select>
                </div>
              </div>
            }
          </div>
          <div className="triggers-control-content">
            {
              this.state.onScroll &&
              <div className="triggers-control-field">
                <label htmlFor="triggers-control-field-inputNumber2">Within(%)</label>
                <div className="triggers-control-input-wrapper">
                  <input type="number"
                    min="1"
                    max="100"
                    id="triggers-control-field-inputNumber2"
                    name="size"
                    onChange={(e) => this.handleChangePage(e)}
                  />
                </div>
              </div>
            }
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name="onScroll"
                checked={this.state[name]}
                onClick={(e) => this.handleCheck(e)}
                id="toggleSwitch2"
              />
              <label className="toggle-switch-label" htmlFor="toggleSwitch2">
                <span className="toggle-switch-inner" />
                <span className="toggle-switch-switch" />
              </label>
            </div>
          </div>
        </div>
        <div className="triggers-wrapper">
          <div className="triggers-icon-wrapper">
            {
              iconsManager().renderIcon('scrolling_to')
            }
          </div>
          <div className="triggers-title">On Scroll To Element</div>
          <div className="triggers-control-content">
            {
              this.state.scrollElement &&
              <div className="triggers-control-field">
                <label htmlFor="triggers-control-field-inputText">Selector</label>
                <div className="triggers-control-input-wrapper">
                  <input className="triggers-control-inputText"
                    id="triggers-control-field-Text"
                    type="text"
                    name="to_element"
                    placeholder=".my class"
                    defaultValue=''
                    onChange={(e) => this.handleChangePage(e)}
                  />
                </div>
              </div>
            }
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                checked={this.state[name]}
                name="scrollElement"
                onClick={(e) => this.handleCheck(e)}
                id="toggleSwitchText"
              />
              <label className="toggle-switch-label" htmlFor="toggleSwitchText">
                <span className="toggle-switch-inner" />
                <span className="toggle-switch-switch" />
              </label>
            </div>
          </div>
        </div>
        <div className="triggers-wrapper">
          <div className="triggers-icon-wrapper">
            {
              iconsManager().renderIcon('click')
            }
          </div>
          <div className="triggers-title">On Click</div>
          <div className="triggers-control-content">
            {
              this.state.onClick &&
              <div className="triggers-control-field">
                <label htmlFor="triggers-control-field-Clicks">Clicks</label>
                <div className="triggers-control-input-wrapper">
                  <input className="triggers-control-input"
                    id="triggers-control-field-Clicks"
                    type="number"
                    min="1"
                    name="on_click"
                    value={this.state.on_click}
                    onChange={(e) => this.handleChangePage(e)}
                  />
                </div>
              </div>
            }
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                checked={this.state[name]}
                name="onClick"
                onClick={(e) => this.handleCheck(e)}
                id="toggleSwitchClicks"
              />
              <label className="toggle-switch-label" htmlFor="toggleSwitchClicks">
                <span className="toggle-switch-inner" />
                <span className="toggle-switch-switch" />
              </label>
            </div>
          </div>
        </div>
        <div className="triggers-wrapper">
          <div className="triggers-icon-wrapper">
            <div className="triggers-icon">
              {
                iconsManager().renderIcon('inactivity')
              }
            </div>
          </div>
          <div className="triggers-title">After Inactivity</div>
          <div className="triggers-control-content">
            {this.state.afterInactivity &&
              <div className="triggers-control-field">
                <label htmlFor="triggers-control-field-inactivity">Within(sec)</label>
                <div className="triggers-control-input-wrapper">
                  <input className="triggers-control-input"
                    id="triggers-control-field-inactivity"
                    type="number"
                    value={this.state.inactivity}
                    min="1"
                    step="0.1"
                    name="inactivity"
                    onChange={(e) => this.handleChangePage(e)}
                  />
                </div>
              </div>
            }
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                checked={this.state[name]}
                name="afterInactivity"
                onClick={(e) => this.handleCheck(e)}
                id="toggleSwitchInactivity"
              />
              <label className="toggle-switch-label" htmlFor="toggleSwitchInactivity">
                <span className="toggle-switch-inner" />
                <span className="toggle-switch-switch" />
              </label>
            </div>
          </div>
        </div>
        <div className="triggers-wrapper">
          <div className="triggers-icon-wrapper">
            <div className="triggers-icon">
              {
                iconsManager().renderIcon('exit_intent')
              }
            </div>
          </div>
          <div className="triggers-title">On Page Exit Intent</div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                checked={this.state[name]}
                name="on_exit"
                onClick={(e) => this.handleCheck(e)}
                id="toggleSwitchIntent"
                onChange={(e) => this.setState({ on_exit: !this.state.on_exit })}
              />
              <label className="toggle-switch-label" htmlFor="toggleSwitchIntent">
                <span className="toggle-switch-inner" />
                <span className="toggle-switch-switch" />
              </label>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => this.updateTriggers()} className="modal-footer__button modal-save">Save & close</button>
          <button onClick={() => this.updateTriggers()} className="modal-footer__button modal-next">Next</button>
        </div>
      </div>
    )
  }
};
