import {mbParseJSON, recurseCount, renderIcon} from "../../../../../../front-app/src/js/helpers";
import CellComponent from './CellComponent';
/**
 * Ячейка
 * @return {*}
 * @constructor
 */
const Cell = ({ cell, settings }) => {
  const { row, column } = cell;
  const {
    resize_columns,
    replace_rows,
    virtualized_rows,
    hide_expanded_row_icon,
    expanded_row_icon,
    hide_not_expanded_row_icon,
    not_expanded_row_icon
  } = settings;
  let cellContent = cell.render('Cell');
  if (cell.column.id === '##') {
    cellContent = cell.row.index + 1;
  }
  if (cell.isGrouped) {
    cellContent = (
        <>
          <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ?
              renderIcon(hide_expanded_row_icon, expanded_row_icon, '👇', 'expanded-row') :
              renderIcon(hide_not_expanded_row_icon, not_expanded_row_icon, '👉', 'not-expanded-row')}
        </span>{' '}
               {cell.render('Cell')} ({recurseCount(row, 'subRows')})
        </>
    );
  } else if (cell.isAggregated) {
    cellContent = cell.render('Aggregated');
  } else if (cell.isPlaceholder) {
    cellContent = cell.render('Cell');
  }
  const cellClassNames = ['altrp-table-td', 'altrp-table-cell'];
  cell.isAggregated && cellClassNames.push('altrp-table-td_aggregated');
  cell.isPlaceholder && cellClassNames.push('altrp-table-td_placeholder');
  cell.isGrouped && cellClassNames.push('altrp-table-td_grouped');

  let cellProps = React.useMemo(() => {
    let cellProps = cell.getCellProps();
    if (!resize_columns && !virtualized_rows) {
      delete cellProps.style;
    }
    if (_.get(cell, 'column.column_styles_field')) {

      let cellStyles = _.get(cell, 'column.column_styles_field');
      cellStyles = _.get(row.original, cellStyles, '');
      cellStyles = mbParseJSON(cellStyles, {});
      cellProps.style = _.assign({...cellStyles}, cellProps.style);
    }
    // if(replace_rows){
    //   cellProps.ref = dropRef;
    // }

    return cellProps;
  }, [resize_columns,
    replace_rows,
    virtualized_rows,
    cell.getCellProps().style.width,
    _.get(cell, 'column.column_styles_field')]);

  /**
   * Если в настройках table_hover_row: false, - background для отдельной ячейки
   */
  if (!settings.table_hover_row) {
    cellClassNames.join('altrp-table-background');
  }
  // if (!column.column_body_alignment) {
  //   cellClassNames.join( `altrp-table-td_alignment-${column.column_body_alignment}`);
  // }
  let style = {};

  if (cell.column.column_body_alignment) {
    style.textAlign = cell.column.column_body_alignment;
  }

  if (cell.column.body_bg) {
    style.backgroundColor = cell.column.body_bg.color;
  }
  style = _.assign(style, cellProps.style || {});
  if (cell.column.column_cell_vertical_alignment && cell.column.column_cell_vertical_alignment !== 'inherit') {
    style.verticalAlign = cell.column.column_cell_vertical_alignment;
  }

  return <CellComponent {...cellProps}
                        settings={settings}
                        column={column}
                        style={style}
                        className={cellClassNames.join(' ')}>{cellContent}</CellComponent>
};

export default Cell;