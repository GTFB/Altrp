import React, { Component, Suspense } from "react";
import Form from "react-bootstrap/Form";
import { widgetTypes } from "../../../../../../admin/src/components/dashboard/widgetTypes";

import { connect } from "react-redux";
import { editElement } from "../../../store/altrp-dashboard/actions";

const mapStateToProps = state => {
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
    const element =
      props.editElement !== null ? _.cloneDeep(props.editElement) : {};
    this.state = {
      types: widgetTypes,
      editElement: element
    };
  }

  render() {
    return (
      <div className="col-12">
        <Form.Group>
          <Form.Label
            className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
          >
            Тип диаграммы
          </Form.Label>
          <Form.Control
            onChange={e => this.props.setType(e.target.value)}
            value={this.props.editElement?.settings?.type}
            className={`${this.props.widgetID} altrp-dashboard__drawer--select select-type`}
            name="type"
            as="select"
          >
            <option value="">Выберите тип диаграммы</option>
            {this.state.types &&
              this.state.types.map((type, index) => (
                <option key={index} value={type.value}>
                  {type.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceSettings);
