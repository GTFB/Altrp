import React, { Component } from "react";
import Resource from "../../../../../editor/src/js/classes/Resource";
import RuleForm from "./RuleForm";
import AdminModal2 from "../../AdminModal2";

class ValidationTableRow extends Component {
  state = {
    isRowExpanded: false,
    isModalOpened: false
  }

  submitHandler = () => {
    this.props.updateValidations();
    this.setState({ isModalOpened: false });
  }

  render() {
    const { field } = this.props;
    const { isRowExpanded, isModalOpened } = this.state;

    return <>
      <tr className="admin-table-row" onClick={() => this.setState({ isRowExpanded: !isRowExpanded })}>
        <td className="admin-table__td">{isRowExpanded ? "➖" : "➕"}</td>
        <td className="admin-table__td">{field.name}</td>
        <td className="admin-table__td">{field.column_name || field.column.name}</td>
      </tr>
      {isRowExpanded && <tr className="admin-table-row">
        <td className="admin-table__td" colSpan={3}>
          <ul>
            {field.rules.map(rule => <li key={rule.id}>{rule.rule}</li>)}
          </ul>
          <button onClick={() => this.setState({ isModalOpened: true })} className="btn btn_add">
            Add Rule
          </button>
        </td>
      </tr>}
      {isModalOpened && <AdminModal2 closeHandler={() => this.setState({ isModalOpened: false })}>
        <RuleForm validation_field_id={field.id} submitHandler={this.submitHandler} />
      </AdminModal2>}
    </>
  }
};

export default ValidationTableRow;
