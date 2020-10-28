import DataSourceDashboards from './DataSourceDashboards.js';
import { connect } from "react-redux";
import { editElement } from '../../store/altrp-dashboard/actions';

import ChooseWidget from './ChooseWidget';
import domtoimage from "dom-to-image";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";
import GearFill from "react-bootstrap-icons/dist/icons/sliders";
import TrashFill from "react-bootstrap-icons/dist/icons/trash";
import PrinterFill from "react-bootstrap-icons/dist/icons/printer";
import FileEarMark from "react-bootstrap-icons/dist/icons/cloud-download";

class WidgetData extends Component {

      constructor(props) {
            super(props);
            this.state = { settings: props.settings, el: props.el };
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.el !== this.props.el) {
                  this.setState(state => ({ ...state, el: this.props.el }));
            }
            if (prevProps.settings !== this.props.settings) {
                  this.setState(state => ({ ...state, settings: this.props.settings }));
            }
      }

      render() {
            return (
                  <div className="altrp-dashboard__card">
                        <div className="title">
                              <div>{this.state.settings.name}</div>
                              <div className="dropdownTogglerContainer">
                                    <Dropdown drop="left">
                                          <Dropdown.Toggle variant="light" >
                                                <ThreeDotsVertical color="#7a7a7b" />
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu className="dropdownMenuToggle" style={{
                                                zIndex: 999999,
                                                background: 'rgba(255,255,255,1)'
                                          }}>
                                                <Dropdown.Item>
                                                      { /* 
                                                            <ReactToPrint
                                                                  trigger={() => {
                                                                        return (
                                                                              <button type="button" title="Распечатать виджет">
                                                                                    <PrinterFill />
                                                                              </button>
                                                                        );
                                                                  }}
                                                                  content={() => {
                                                                        console.log(this.refData);
                                                                        // this.refData[key].current
                                                                  }}
                                                            /> */}
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                      <button type="button" title="Скачать файл" onClick={this.props.saveWidget}>
                                                            <FileEarMark />
                                                      </button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                      <button type="button" title="Настроить виджет"
                                                            onClick={() => this.props.openSettingsHandler(this.state.el)}>
                                                            <GearFill />
                                                      </button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                      <button type="button" title="Удалить виджет"
                                                            onClick={() => this.props.onRemoveItem(this.state.el.i)}>
                                                            <TrashFill />
                                                      </button>
                                                </Dropdown.Item>
                                          </Dropdown.Menu>
                                    </Dropdown>
                              </div>

                        </div>
                        <ChooseWidget element={this.state.el} type={this.state.settings.type} source={this.state.settings.source} />
                  </div>
            )
      }
}

export default WidgetData;