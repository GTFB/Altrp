import Form from 'react-bootstrap/Form';

import { connect } from "react-redux";
import { editElement } from '../../../store/altrp-dashboard/actions';

const mapStateToProps = (state) => {
      return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
      return {
            editElementDispatch: data => dispatch(editElement(data))
      };
}

class DatasourceSettings extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  editElement: props.editElement
            };
      }

      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
                  this.setState(state => ({ ...state, editElement: this.props.editElement }));
            }
      }

      render() {
            if (this.props.datasources !== null) {
                  return (
                        <div className="col-12">
                              <Form.Group className="mb-2">
                                    <Form.Label className="label">Источники данных</Form.Label>
                                    <Form.Control
                                          onChange={e => this.props.setDatasource(e.target.value)}
                                          className="select-type"
                                          value={this.state.editElement.settings.source.path}
                                          name="type"
                                          as="select">
                                          <option value="">Выберите источник данных</option>
                                          <optgroup label="Datasources">
                                                {this.props.datasources.map((source, index) => (
                                                      <option key={index} value={source.path}>{source.title || source.path}</option>
                                                ))}
                                          </optgroup>
                                    </Form.Control>
                              </Form.Group>
                        </div>
                  );
            }
            return (
                  <div className="col-12 text-center">
                        Укажите источники данных в настройке виджета
                  </div>
            );
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceSettings);