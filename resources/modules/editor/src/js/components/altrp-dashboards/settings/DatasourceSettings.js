import React, { Component, Suspense } from "react";
import Form from "react-bootstrap/Form";
import ReactSelect from "react-select";

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
    this.state = {
      editElement: props.editElement
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
      this.setState(state => ({
        ...state,
        editElement: this.props.editElement
      }));
    }
  }

  render() {
    if (this.props.datasources !== null) {
      return (
        <div className="col-12">
          <Form.Group className="mb-2">
            <Form.Label className="label">Источники данных</Form.Label>
            <ReactSelect
              isMulti
              onChange={value => this.props.setDatasource(value)}
              className="select-type"
              defaultValue={this.state.editElement.settings.sources}
              name="type"
              as="select"
              options={this.props.datasources}
              getOptionValue={option => option}
              getOptionLabel={option => option.title || option.path}
            />
          </Form.Group>
        </div>
      );
    }
    return (
      <div className="col-12 text-center">
        Укажите источники данных в настройке виджета
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceSettings);
