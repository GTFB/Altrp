import * as React from "react";

import Scrollbars from "react-custom-scrollbars";

import Chevron from "../../../../../editor/src/svgs/chevron.svg";

export default class SelectedPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="panel settings-panel d-flex">
        <div className="settings-controllers">
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            <div id="settingsControllers">
              <div className="settings-section open">
                <div className="settings-section__title d-flex">
                  <div className="settings-section__icon d-flex">
                    <Chevron />
                  </div>
                  <div className="settings-section__label">Настройки</div>
                </div>
                {this.props.chart.selected.id ? (
                  <div className="controllers-wrapper">
                    <div className="controller-container controller-container_textarea">
                      <div className="controller-container__label">Text</div>
                      <input
                        type="text"
                        onChange={e => {
                          this.props.callbacks.onNodeBodyChanged(
                            this.props.chart.selected.id,
                            e.target.value
                          );
                        }}
                        value={
                          this.props.chart.nodes[this.props.chart.selected.id]
                            .properties.body
                        }
                      ></input>
                    </div>
                  </div>
                ) : (
                  "Select a node to edit"
                )}
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
