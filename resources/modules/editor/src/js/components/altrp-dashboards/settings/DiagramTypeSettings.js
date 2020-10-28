import Form from 'react-bootstrap/Form';
import { widgetTypes } from "../../../../../../admin/src/components/dashboard/widgetTypes";

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
                  types: widgetTypes,
                  editElement: props.editElement
            };
      }

      render() {
            return (
                  <div className="col-12">
                        <Form.Group>
                              <Form.Label className="label">Тип диаграммы</Form.Label>
                              <Form.Control
                                    onChange={e => this.props.setType(e.target.value)}
                                    value={this.props.editElement.settings.type}
                                    className="select-type"
                                    name="type"
                                    as="select">
                                    <option value="">Выберите тип диаграммы</option>
                                    {this.state.types && this.state.types.map((type, index) => (
                                          <option key={index} value={type.value}>{type.name}</option>
                                    ))}
                              </Form.Control>
                        </Form.Group >
                  </div>

            );
      }

}

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceSettings);