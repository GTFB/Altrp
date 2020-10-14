import { widgetTypes } from "../../../../../admin/src/components/dashboard/widgetTypes";
import Form from 'react-bootstrap/Form';
import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";
import BarChartV1 from '../../../../../admin/src/components/dashboard/widgets/d3/BarChartV1';
import BarDataSource from '../../../../../admin/src/components/dashboard/widgets/d3/BarDataSource';
class AddWidgetDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  settings: {
                        source: '',
                        type: 'CHART/TABLE',
                        layout: props.layout,
                        data: []
                  },
                  dataSourcesList: props.dataSourceList,
                  types: widgetTypes
            };
            console.log('DATASOURCESLIST=>', this.state.settings.layout);
      }

      renderChart() {
            if (this.state.settings.data.length > 0 && this.state.settings.type) {
                  console.log('-->', this.state.settings.data);
                  return <BarDataSource data={this.state.settings.data} />;
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
                        <form onClick={e => e.preventDefault()} onSubmit={e => { e.preventDefault(); this.props.addWidget(e.target) }}>
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
                                          <option value="0">Выберите тип диаграммы</option>
                                          {this.state.types && this.state.types.map((type, index) => (
                                                <option key={index} value={type.value}>{type.name}</option>
                                          ))}
                                    </Form.Control>
                              </Form.Group>

                              <div className="chart-container">
                                    {this.renderChart()}
                              </div>
                        </form>
                  </div>
            )
      }

}

export default AddWidgetDataSource;