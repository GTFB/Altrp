import React from "react";
import {FixedSizeList} from "react-window";
import scrollbarWidth from "../../../../../../front-app/src/js/functions/scrollbarWidth";
import Row from './Row';
import SubheadingRow from "./SubheadingRow";

const TableBodyContent =
    (props) => {
      const {
        prepareRow,
        rows,
        visibleColumns,
        totalColumnsWidth,
        moveRow,
        settings,
        cardTemplate,
        groupIndex,
        page,
      } = props;
      const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);
      const {
        virtualized_rows,
        virtualized_height,
        item_size,
        tables_settings_for_subheading,
        table_style_table_striple_style: isStriped
      } = settings;
      const RenderRow = React.useCallback(
          ({index, style}) => {
            const row = page ? page[index] : rows[index];
            prepareRow(row);
            return <Row
                index={index}
                row={row}
                visibleColumns={visibleColumns}
                moveRow={moveRow}
                settings={settings}
                cardTemplate={cardTemplate}
                {...row.getRowProps({style})}
            />;

          }, [page,
            rows,
            visibleColumns,
            settings,
            cardTemplate,
            moveRow,
            prepareRow,]);
      const itemCount = React.useMemo(() => page ? page.length : rows.length, [page, rows]);
      const groups = React.useMemo(() => {
        if (_.isEmpty(tables_settings_for_subheading)) {
          return null;
        }
        let columnName = tables_settings_for_subheading[groupIndex]?.name;
        if (! columnName) {
          return null;
        }

        let leftValue, rightValue;
        if(columnName.indexOf('?') !== -1 && columnName.indexOf(':') !== -1){
          [leftValue, rightValue] = columnName.split('?')[1].split(':');
          leftValue = leftValue.trim();
          rightValue = rightValue.trim();
          cell.value = cell.value ? leftValue : rightValue;
          columnName = columnName.split('?')[0].trim();
        }

        let _rows = page ? page : rows;
        const groups = [];
        _rows.forEach(row => {
          let currentGroup = groups.find(group => {
            return group.columnValue === row.original[columnName];
          });
          let columnValue;
          if(leftValue || rightValue){
            columnValue = row.original[columnName] ? leftValue : rightValue;
          } else {
            columnValue = row.original[columnName];
          }
          if (! currentGroup) {
            currentGroup = {
              columnValue,
              rows: [],
            };
            groups.push(currentGroup);
          }
          currentGroup.rows.push(row);
        });
        return groups;
      }, [tables_settings_for_subheading, page, rows]);
      if (! _.isEmpty(groups)) {
        return groups.map((group, idx) => {
          const _props = {...props};
          _props.page = group.rows;
          _props.rows = group.rows;
          _props.groupIndex = groupIndex + 1;
          _props.key = group.columnValue + idx;
          return <React.Fragment key={_props.key}>
            <SubheadingRow className="altrp-table-tr altrp-table-tr_group-subheading"
                           groupIndex={_props.groupIndex}
                           settings={settings}>
              <td colSpan={visibleColumns.length || 1}
                  className="altrp-table-td"
                  dangerouslySetInnerHTML={{__html: group.columnValue === 0 ? '0' : (group.columnValue || '&nbsp;')}}/>
            </SubheadingRow>
            <TableBodyContent {..._props}/>
          </React.Fragment>
        })

      }
      if (virtualized_rows) {
        return <React.Fragment>
          <FixedSizeList height={Number(virtualized_height) || 0}
                         itemCount={itemCount}
                         itemSize={Number(item_size) || 0}
                         width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </React.Fragment>
      }
      return <React.Fragment>
        {(page ? page : rows).map((row, i) => {
          prepareRow(row);
          return <Row
              index={i}
              row={row}
              visibleColumns={visibleColumns}
              moveRow={moveRow}
              settings={settings}
              cardTemplate={cardTemplate}
              {...row.getRowProps()}
          />;
        })}

      </React.Fragment>
    };

export default TableBodyContent;

