
class TableDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: props.data
            };
      }

      sum(data) {
            return data.reduce((acc, item) => acc + item.data, 0);
      }

      render() {
            return (
                  <div className="widget-table">
                        <table>
                              <thead>
                                    <tr>
                                          {this.state.data.map((item, key) => (
                                                <th key={key}>{item.key}</th>
                                          ))}
                                          <th>ИТОГО</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                          {this.state.data.map((item, key) => (
                                                <td key={key}>{item.data}</td>
                                          ))}
                                          <td>{this.sum(this.state.data)}</td>
                                    </tr>
                              </tbody>
                        </table>
                  </div>

            );
      }
}

export default TableDataSource;