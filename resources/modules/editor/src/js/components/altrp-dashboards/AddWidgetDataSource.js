import { widgetTypes } from "../../../../../admin/src/components/dashboard/widgetTypes";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

import ChooseWidget from './ChooseWidget';

class AddWidgetDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  widget: props.widget,
                  dataSourcesList: props.dataSourceList,
                  types: widgetTypes
            };
      }

      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevProps, this.props)) {
                  this.setState(state => (state));
            }
      }

      renderChart() {
            if (this.state.widget.settings.data.length > 0 && this.state.widget.settings.type !== '') {
                  return <ChooseWidget type={this.state.widget.settings.type} data={this.state.widget.settings.data} />;
            }
            return <div style={{
                  marginTop: '5px'
            }}> Заполните данные выше </div>;
      }

      setDatasource(path) {
            let datasources = _.cloneDeep(this.state.dataSourcesList, []);
            let currentDataSouce = datasources.find(source => {
                  return source.path === path;
            });
            let currentData = typeof currentDataSouce !== 'undefined' ? currentDataSouce.data : [];
            this.setState(state => ({
                  ...state,
                  widget: {
                        ...state.widget,
                        settings: {
                              ...state.widget.settings,
                              source: path,
                              data: currentData
                        },
                  }
            }));
      }

      setDiagramType(type) {
            console.log('MY DIAGRAM IS', type);
            this.setState(state => ({
                  ...state,
                  widget: {
                        ...state.widget,
                        settings: {
                              ...state.widget.settings,
                              type: type
                        }
                  }
            }));
      }

      setCardName(name) {
            console.log(name);
            this.setState(state => ({
                  ...state,
                  widget: {
                        ...state.widget,
                        settings: {
                              ...state.widget.settings,
                              name: name
                        }
                  }
            }));
      }

      render() {
            return (
                  <div className="altrp-dashboard__card__add-settings">
                        <form onClick={e => e.preventDefault()}>
                              <Form.Group className="mb-2">
                                    <Form.Label className="label">Название виджета</Form.Label>
                                    <Form.Control onChange={e => this.setCardName(e.target.value)} name="title" className="title" type="text" placeholder="Новый виджет" />
                              </Form.Group>
                              {this.state.dataSourcesList.length > 0 && (
                                    <Form.Group className="mb-2">
                                          <Form.Label className="label">Источники данных</Form.Label>
                                          <Form.Control onChange={e => this.setDatasource(e.target.value)} className="select-type" name="type" as="select">
                                                <option value="0">Выберите источник данных</option>
                                                {this.state.dataSourcesList.map((source, index) => (
                                                      <option key={index} value={source.path}>{source.path}</option>
                                                ))}
                                          </Form.Control>
                                    </Form.Group>
                              )}
                              <Form.Group>
                                    <Form.Label className="label">Тип диаграммы</Form.Label>
                                    <Form.Control onChange={e => this.setDiagramType(e.target.value)} className="select-type" name="type" as="select">
                                          <option value="">Выберите тип диаграммы</option>
                                          {this.state.types && this.state.types.map((type, index) => (
                                                <option key={index} value={type.value}>{type.name}</option>
                                          ))}
                                    </Form.Control>
                              </Form.Group>
                              {this.renderChart()}
                              <Form.Group>
                                    <Button className="w-100" onClick={() => { this.props.editHandler(this.state.widget.i, this.state.widget.settings) }}>Сохранить</Button>
                              </Form.Group>
                        </form>
                  </div>
            )
      }

}

export default AddWidgetDataSource;