import TableBodyContent from "./TableBodyContent";
import React from "react";

const TableBody =
    (props) => {
      const {
        tables_settings_for_subheading,
        table_style_table_striple_style: isStriped,
      } = props.settings;
      // console.log(props.rows);
      const contentProps = {...props};
      contentProps.rows = React.useMemo(() => {
        if (_.isEmpty(tables_settings_for_subheading)) {
          return props.rows;
        }
        const sortedColumns = [];
        const sortedDirections = [];
        tables_settings_for_subheading.forEach(item=>{
          if(item.name){
            sortedColumns.push(item.name);
            sortedDirections.push(item.order || 'asc')
          }
        });
      }, [tables_settings_for_subheading]);
      console.log(contentProps.rows);
      return <div {...props.getTableBodyProps()}
                  className={`altrp-table-tbody ${isStriped ? "altrp-table-tbody--striped" : ""}`}>
        <TableBodyContent {...contentProps}/>
      </div>
    };

export default TableBody;