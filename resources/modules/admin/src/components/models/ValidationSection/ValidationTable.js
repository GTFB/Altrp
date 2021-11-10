import React, { Component } from "react";
import ValidationTableRow from "./ValidationTableRow";

class ValidationTable extends Component {

  render() {
    const { validations, updateValidations, fieldsOptions, validationsResource, data_source_options } = this.props;
    return <table className="admin-table admin-table-noRadius">
      <thead className="admin-table-head">
        <tr className="admin-table-row">
          <th className="admin-table__td"></th>
          <th className="admin-table__td">Title</th>
          <th className="admin-table__td">Field Name</th>
        </tr>
      </thead>
      <tbody className="admin-table-body">
        {validations.map(field => <ValidationTableRow key={field.id}
          field={field}
          fieldsOptions={fieldsOptions}
          validationsResource={validationsResource}
          data_source_options={data_source_options}
          updateValidations={updateValidations}
        />)}
      </tbody>
    </table>
  }
};

export default ValidationTable;
