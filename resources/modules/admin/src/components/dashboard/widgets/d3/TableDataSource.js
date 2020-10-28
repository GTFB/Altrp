import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

class TableDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  source: props.source,
            };
      }

      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevProps.source, this.props.source)) {
                  this.setState(state => ({ ...state, source: this.props.source }));
            }
      }

      sum(data) {
            return data.reduce((acc, item) => acc + item.data, 0);
      }

      render() {
            if (Object.keys(this.state.source).length === 0) {
                  return <div>Нет данных </div>
            }
            const data = (new DataAdapter()).adaptDataByPath(this.state.source.path, this.state.source.key, this.state.source.data);
            if (data.length === 0) {
                  return <div>Нет данных</div>
            }
            return (
                  <div className="widget-table">
                        <table className="vertical-table">
                              <tbody>
                                    {data.map((item, key) => (
                                          <tr key={key}>
                                                <td>{item.key}</td>
                                                <td>{item.data}</td>
                                          </tr>
                                    ))}
                                    <tr>
                                          <td>ИТОГО</td>
                                          <td>{this.sum(data)}</td>
                                    </tr>
                              </tbody>
                        </table>
                  </div>
                  // <div className="widget-table">
                  //       <table>
                  //             <thead>
                  //                   <tr>
                  //                         {data.map((item, key) => (
                  //                               <th key={key}>{item.key}</th>
                  //                         ))}
                  //                         <th>ИТОГО</th>
                  //                   </tr>
                  //             </thead>
                  //             <tbody>
                  //                   <tr>
                  //                         {data.map((item, key) => (
                  //                               <td key={key}>{item.data}</td>
                  //                         ))}
                  //                         <td>{this.sum(data)}</td>
                  //                   </tr>
                  //             </tbody>
                  //       </table>
                  // </div>

            );
      }
}

export default TableDataSource;