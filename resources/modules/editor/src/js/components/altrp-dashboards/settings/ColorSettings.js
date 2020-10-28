import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";
import { customStyle } from "../../../../../../admin/src/components/dashboard/widgetTypes";

const mapStateToProps = (state) => {
      return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
      return {
            editElementDispatch: data => dispatch(editElement(data))
      };
}

class ColorSettings extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  editElement: props.editElement
            };
      }

      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevState.editElement, this.props.editElement)) {
                  console.log('CHANGE COLOR =>', this.props.editElement);
                  this.setState(state => ({ ...state, editElement: this.props.editElement }));
            }
      }

      setColor(key, color) {
            _.debounce(this.props.setDatakeyColor(key, color), 250);
      }

      render() {
            let source = this.state.editElement.settings.source;
            if (Object.keys(source).length === 0) {
                  return <div>Нет данных </div>;
            }
            let data = (new DataAdapter()).adaptDataByPath(source.path, source.key, source.data);
            if (data.length === 0) {
                  return <div>Нет данных </div>;
            }

            return (
                  <div className="col-12">
                        <div className="mb-3">Цвет диаграммы</div>
                        {data.map((item, index) => {
                              let currentColor = customStyle[index] || "#606060";
                              if (typeof this.state.editElement.settings.color !== 'undefined') {
                                    if (Object.keys(this.state.editElement.settings.color).length > 0) {
                                          console.log('HEY COLOR NEW');
                                          let keyOfColor = _.findKey(this.state.editElement.settings.color, item.key);
                                          console.log(this.state.editElement.settings.color[keyOfColor]);
                                          currentColor = this.state.editElement.settings.color[keyOfColor];
                                    }
                              }

                              return (
                                    <Form.Group key={index} className="d-flex justify-content-between">
                                          <label htmlFor={index}>{item.key}</label>
                                          <input onChange={e => this.setColor(item.key, e.target.value)} type="color" id={index} value={currentColor} />
                                    </Form.Group>
                              )
                        })}
                  </div>
            );
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColorSettings);