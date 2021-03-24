import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Chevron from "../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../store/store";

export default class RobotSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.toggleChevron = this.toggleChevron.bind(this);
  }

  toggleChevron(type) {
    console.log(type);
  }

  getRobots() {
    let elements = store.getState()?.robotSettingsData;
    elements = _.filter(elements, item => item.type === "robot");
    return elements;
  }

  render() {
    const robots = this.getRobots();

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
                      <div className="controller-container controller-container_select" >
                        <div className="controller-container__label control-select__label controller-label">Robots:</div>
                        <div className="control-container_select-wrapper controller-field">
                          {robots.map((item, index) =>
                          <div className="controller-container__label control-select__label controller-label" key={index}>
                            <a href={`robots-editor?robot_id=${item.data?.props?.nodeData?.id ?? ''}`}>{item?.data?.label ?? ''}</a>
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
