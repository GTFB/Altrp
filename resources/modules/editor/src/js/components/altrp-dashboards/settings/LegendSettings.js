import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
      return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
      return {
            editElementDispatch: data => dispatch(editElement(data))
      };
}

class LegendSettings extends Component {
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
            return (
                  <div className="col-12">
                        <Form.Group>
                              <Form.Label>Положение легенды</Form.Label>
                              <Form.Control
                                    as="select"
                                    custom
                                    value={this.props.editElement.settings.legend.position}
                                    onChange={(e) => this.props.setLegendPosition(e.target.value)
                                    }
                                    required
                              >
                                    <option value="bottom">Внизу</option>
                                    <option value="left">Слева</option>
                                    <option value="right">Справа</option>
                                    <option value="top">Сверху</option>
                              </Form.Control>
                        </Form.Group>
                  </div>
            );
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(LegendSettings);