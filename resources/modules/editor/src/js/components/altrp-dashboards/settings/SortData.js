import React, { Component } from "react";
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

const options = [
  {
    id: 0,
    label: "По умолчанию",
    value: ""
  },
  {
    id: 1,
    label: "По значению",
    value: "value"
  },
  {
    id: 2,
    label: "По ключу",
    value: "key"
  }
];

class SortData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editElement: props.editElement
    };
  }

  render() {
    return (
      <>
        <div className="col-12">
          <Form.Group className="mb-2">
            <Form.Label
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Фильтрация
            </Form.Label>
            <ReactSelect
              placeholder="Выберите фильтр"
              onChange={value => this.props.setProperty(value, "sort")}
              className="select-type"
              defaultValue={
                this.state.editElement?.settings?.sort || options[0].value
              }
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
              options={options}
              getOptionValue={option => option.value}
              getOptionLabel={option => option.label}
            />
          </Form.Group>
        </div>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SortData);
