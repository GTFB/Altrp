import React, {Component} from "react";
import {Link} from 'react-router-dom'

class AdminTable extends Component {
  render(){
    return<div className="admin-table">
      <table>
        <thead className="admin-table-head">
        <tr className="admin-table-row">
          <td className="admin-table__td admin-table__td_check"><input type="checkbox"/></td>
        {this.props.columns.map(column=>
            <td className="admin-table__td " key={column.name}>{column.title}</td>)}
        </tr>
        </thead>
        <tbody className="admin-table-body">
        {
          this.props.rows.map((row, idx)=>
          <tr className="admin-table-row" key={row.id}>
            <td className="admin-table__td admin-table__td_check" key={'choose' + row.id}><input type="checkbox"/></td>
            {
              this.props.columns.map(column=>
              {
                let tag = 'span';
                let props = {
                  className: 'td__content',
                  children: [row[column.name]]
                };
                if(column.url && row.url){
                  tag = 'a';
                  props.href = row.url;
                  if(column.target){
                    props.target = column.target;
                  }
                }
                if(column.editUrl && row.editUrl){
                  tag = (column.tag === 'Link') ? Link : 'a';
                  props.href = row.editUrl;
                  if(column.tag === 'Link'){
                    props.to = {
                      pathname: row.editUrl,
                      data: row
                    }
                  }
                  if(column.target){
                    props.target = column.target;
                  }
                }
                return<td className="admin-table__td td"  key={column.name + row.id}>
                  {React.createElement(tag, props)}

                </td>
              }
             )
            }
          </tr>)
        }
        </tbody>
      </table>
    </div>;
  }
}

export default AdminTable