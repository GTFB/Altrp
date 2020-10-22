import React, { Component } from "react";
import Resource from "../../../../../editor/src/js/classes/Resource";
import RuleForm from "./RuleForm";
import AdminModal2 from "../../AdminModal2";
import ValidatedFieldForm from "./ValidatedFieldForm";
import { withRouter } from 'react-router-dom';

class ValidationTableRow extends Component {
  state = {
    isRowExpanded: false,
    isRuleModalOpened: false,
    editingRule: null,
    isFieldModalOpened: false
  }

  submitRuleHandler = () => {
    this.props.updateValidations();
    this.setState({ isRuleModalOpened: false });
  }

  deleteRuleHandler = id => {
    const resource = new Resource({ route: `/admin/ajax/models/${this.props.match.params.id}/validations/${this.props.field.id}/validation_rules` });
    resource.delete(id)
      .then(() => this.props.updateValidations());
  }

  deleteFieldHandler = e => {
    e.stopPropagation();
    const { field, validationsResource } = this.props;
    if (confirm("Are you sure?")) {
      validationsResource.delete(field.id);
      this.props.updateValidations();
    }
  }

  editFieldHandler = e => {
    e.stopPropagation();
    this.setState({ isFieldModalOpened: true });
  }

  render() {
    const { field, fieldsOptions, validationsResource, data_source_options, updateValidations } = this.props;
    const { isRowExpanded, isRuleModalOpened, isFieldModalOpened, editingRule } = this.state;

    return <>
      <tr className="admin-table-row" onClick={() => this.setState({ isRowExpanded: !isRowExpanded })}>
        <td className="admin-table__td">{isRowExpanded ? "➖" : "➕"}</td>
        <td className="admin-table__td">
          {field.name}
          <span className="quick-action-menu">
            <span className="quick-action-menu__item_wrapper">
              <button onClick={this.editFieldHandler} className="quick-action-menu__item">Edit</button>
            </span>
            <span className="quick-action-menu__item_wrapper">
              <button onClick={this.deleteFieldHandler} className="quick-action-menu__item quick-action-menu__item_danger"> Delete</button>
            </span>
          </span>
        </td>
        <td className="admin-table__td">{field.column_name || field.column.name}</td>
      </tr>
      {isRowExpanded && <tr className="admin-table-row">
        <td className="admin-table__td" colSpan={3}>
          <ol>
            {field.rules.map(rule => <li key={rule.id}>
              {rule.rule}
              <span className="quick-action-menu quick-action-menu--li">
                <span className="quick-action-menu__item_wrapper">
                  <button onClick={() => this.setState({ isRuleModalOpened: true, editingRule: rule })} className="quick-action-menu__item">
                    Edit
                  </button>
                </span>
                <span className="quick-action-menu__item_wrapper">
                  <button onClick={() => this.deleteRuleHandler(rule.id)} className="quick-action-menu__item quick-action-menu__item_danger"> Delete</button>
                </span>
              </span>
            </li>)}
          </ol>
          <button onClick={() => this.setState({ isRuleModalOpened: true, editingRule: null })} className="btn btn_add">
            Add Rule
          </button>
        </td>
      </tr>}
      {isRuleModalOpened && <AdminModal2 closeHandler={() => this.setState({ isRuleModalOpened: false })}>
        <RuleForm 
          validation_field_id={field.id} 
          submitHandler={this.submitRuleHandler} 
          editingRule={editingRule}
        />
      </AdminModal2>}
      {isFieldModalOpened && <AdminModal2 closeHandler={() => this.setState({ isFieldModalOpened: false })}>
        <ValidatedFieldForm
          fieldsOptions={fieldsOptions}
          validationsResource={validationsResource}
          data_source_options={data_source_options}
          updateValidations={() => {
            updateValidations();
            this.setState({ isFieldModalOpened: false })
          }}
          field={field}
        />
      </AdminModal2>}
    </>
  }
};

export default withRouter(ValidationTableRow);

