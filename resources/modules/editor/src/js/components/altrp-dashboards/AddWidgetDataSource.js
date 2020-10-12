import widgetTypes from "../../../../../admin/src/components/dashboard/widgetTypes";
import Form from 'react-bootstrap/Form';

class AddWidgetDataSource extends Component {
      
      constructor(props){
            super(props);
            this.state = {
                  settings: {},
                  dataSourcesList: props.dataSourceList
            };
      }

      render() {
            return (
                  <div className="altrp-dashboard__card__add-settings">
                        <form onClick={e=>e.preventDefault()} onSubmit={e=>{e.preventDefault(); this.props.addWidget(e.target)}}>
                              <Form.Control name="title" className="title" type="text" placeholder="Новый виджет" />
                              <Form.Control className="selectType" name="type" as="select">
                                    <option>Default select</option>
                              </Form.Control>
                        </form>
                  </div>
            )
      }

}

export default AddWidgetDataSource;