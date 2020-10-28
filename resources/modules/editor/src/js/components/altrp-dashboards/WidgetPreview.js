import { connect } from "react-redux";
import { editElement } from '../../store/altrp-dashboard/actions';
import ChooseWidget from './ChooseWidget';

const mapStateToProps = (state) => {
      return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
      return {
            editElementDispatch: data => dispatch(editElement(data))
      };
};

class WidgetPreview extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  editElement: props.editElement
            };
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
            console.log(prevProps, this.props);
            if (!_.isEqual(prevState.editElement, this.props.editElement)) {
                  this.setState(state => ({ ...state, editElement: this.props.editElement }));
            }
      }

      //Обновляем название диаграммы
      setCardName(name) {
            this.setState(state => ({
                  ...state,
                  el: {
                        ...state.currentElement,
                        settings: {
                              ...state.currentElement.settings,
                              name: name
                        }
                  }
            }));
            this.props.setCardName(name, this.state.editElement);
      }

      render() {
            if (!_.isEmpty(this.state.editElement)) {
                  return (
                        <div className="drawer-preview">
                              <div className="drawer-preview__container">
                                    <div className="title">
                                          <input type="text"
                                                onChange={e => this.setCardName(e.target.value, this.state.editElement)}
                                                value={this.state.editElement.settings.name}
                                                placeholder='Введите название диаграммы' />
                                    </div>
                                    <div className="drawer-preview__container-content">
                                          <ChooseWidget
                                                source={this.state.editElement.settings.source}
                                                type={this.state.editElement.settings.type}
                                                element={this.state.editElement} />
                                    </div>
                              </div>
                        </div>
                  );
            }
            return <div />;

      }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetPreview);