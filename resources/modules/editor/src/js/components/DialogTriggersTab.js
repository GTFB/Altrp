import React, { Component } from 'react';
import '../../sass/dialog-content.scss';
import { iconsManager } from '../../../../front-app/src/js/helpers';

export default class DialogTriggersTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "on_page_load": 1.0,
      "on_scroll": {
        "direction": "down",
        "size": 23,
      },
      "to_element": ".selector",
      "on_click": 1,
      "inactivity": 23.3,
      "on_exit": true,
    }
  }

  // handleChange() {
  //   this.setState({
  //     isChecked: !this.state.isChecked
  //   });
  // };

  handleChangePage(e) {
    if (e.target.name === 'direction') {
      this.setState({
        ...this.state,
        on_scroll: {
          direction: e.target.value,
          size: this.state.on_scroll.size
        }
      })
    return;
    } else if(e.target.name === 'size'){
      this.setState({
        ...this.state,
        on_scroll: {
          direction: this.state.on_scroll.direction,
          size: e.target.value,
        }
      })
      return;
    }
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }
  
  render() {
    console.log('full state', this.state);
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
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name="toggleSwitch"
                id="toggleSwitch"
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
            <div className="triggers-control-field">
              <label htmlFor="triggers-control-field-inputSelect">Direction</label>
              <div className="triggers-control-input-wrapper">
                <select value={this.state.on_scroll.direction}
                  name="direction"
                  onChange={(e) => this.handleChangePage(e)}
                  id="triggers-control-field-inputSelect">
                  <option value="down">Down</option>
                  <option value="up">Up</option>
                </select>
              </div>
            </div>
          </div>
          <div className="triggers-control-content">
            <div className="triggers-control-field">
              <label htmlFor="triggers-control-field-inputNumber2">Within(%)</label>
              <div className="triggers-control-input-wrapper">
                <input type="number"
                  min="1"
                  max="100"
                  id="triggers-control-field-inputNumber2"
                  value={this.state.on_scroll.size}
                  name="size"
                  onChange={(e) => this.handleChangePage(e)}
                />
              </div>
            </div>
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name="toggleSwitch2"
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
            <div className="triggers-control-field">
              <label htmlFor="triggers-control-field-inputText">Selector</label>
              <div className="triggers-control-input-wrapper">
                <input className="triggers-control-inputText"
                  id="triggers-control-field-Text"
                  type="text"
                  name="to_element"
                  placeholder=".my class"
                  value={this.state.to_element}
                  onChange={(e) => this.handleChangePage(e)}
                />
              </div>
            </div>
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name="toggleSwitch"
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
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name="toggleSwitch"
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
          </div>
          <div className="triggers-control-content-switch">
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name="toggleSwitch"
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
                name="on_exit"
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

      </div>
    )
  }
};
