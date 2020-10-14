import { widgetTypes } from "../../../../../admin/src/components/dashboard/widgetTypes";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

import ChooseWidget from './ChooseWidget';

class AddWidgetDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  settings: {
                        source: '',
                        type: '',
                        layout: props.layout,
                        data: []
                  },
                  dataSourcesList: props.dataSourceList,
                  types: widgetTypes
            };
      }

      renderChart() {
            if (this.state.settings.data.length > 0 && this.state.settings.type !== '') {
                  return <ChooseWidget type={this.state.settings.type} data={this.state.settings.data} />;
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
                  settings: {
                        ...state.settings,
                        source: path,
                        data: currentData
                  }
            }));
      }

      setDiagramType(type) {
            console.log('MY DIAGRAM IS', type);
            this.setState(state => ({
                  ...state,
                  settings: {
                        ...state.settings,
                        type: type
                  }
            }));
      }

      render() {
            return (
                  <div className="altrp-dashboard__card__add-settings">
                        <form onClick={e => e.preventDefault()}>
                              <Form.Group className="mb-2">
                                    <Form.Label className="label">Название виджета</Form.Label>
                                    <Form.Control name="title" className="title" type="text" placeholder="Новый виджет" />
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
                              <div className="chart-container">
                                    {this.renderChart()}
                              </div>
                              <Form.Group>
                                    <Button className="w-100" onClick={() => { this.props.addWidget(1, this.state.settings) }}>Сохранить</Button>
                              </Form.Group>
                        </form>
                  </div>
            )
      }

}

export default AddWidgetDataSource;