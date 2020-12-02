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
    this.returnOptionsWithKeys = this.returnOptionsWithKeys.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
      this.setState(state => ({
        ...state,
        editElement: this.props.editElement
      }));
    }
  }

  returnOptionsWithKeys() {
    const datasources = _.cloneDeep(this.props.datasources);
    return datasources.map((source, index) => {
      source.title =
        typeof source.title !== "undefined" ? source.title : source.path;
      return source;
    });
  }

  render() {
    if (this.props.datasources !== null) {
      return (
        <div className="col-12">
          <Form.Group className="mb-2">
            <Form.Label className="label">Источники данных</Form.Label>
            <ReactSelect
              isMulti
              placeholder="Выберите источник данных"
              onChange={value => this.props.setDatasource(value)}
              className="select-type"
              defaultValue={this.state.editElement?.settings?.sources}
              name="type"
              as="select"
              styles={{
                menuList: (provided, state) => ({
                  ...provided,
                  zIndex: "999999999999999999999",
                  position: "relative"
                }),
                menu: (provided, state) => ({
                  ...provided,
                  zIndex: "999999999999999999999",
                  position: "relative"
                }),
                menuPortal: (provided, state) => ({
                  ...provided,
                  zIndex: "999999999999999999999",
                  position: "relative"
                })
              }}
              options={this.returnOptionsWithKeys()}
              getOptionValue={option => option}
              getOptionLabel={option => option.title}
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
