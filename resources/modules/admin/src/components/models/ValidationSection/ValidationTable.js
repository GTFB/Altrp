import React, { Component } from "react";
import Resource from "../../../../../editor/src/js/classes/Resource";
import ValidationTableRow from "./ValidationTableRow";

class ValidationTable extends Component {

  render() {
    const { validations, updateValidations } = this.props;
    return <table className="admin-table">
      <thead className="admin-table-head">
        <tr className="admin-table-row">
          <th className="admin-table__td"></th>
          <th className="admin-table__td">Title</th>
          <th className="admin-table__td">Field Name</th>
        </tr>
      </thead>
      <tbody className="admin-table-body">
        {validations.map(field => <ValidationTableRow key={field.id} field={field} updateValidations={updateValidations} />)}
      </tbody>
    </table>
  }
};

export default ValidationTable;
