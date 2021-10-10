import { useDrag, useDrop } from 'react-dnd'
import AltrpModel from "../../../classes/AltrpModel";
import ElementWrapper from "../../../../../../front-app/src/js/components/ElementWrapper";
import {mbParseJSON, recurseCount, renderIcon} from "../../../../../../front-app/src/js/helpers";
import frontElementsFabric from "../../../../../../front-app/src/js/classes/FrontElementsFabric";
import Cell from './Cell';

const DND_ITEM_TYPE = 'row';

/**
 * Компонент строки
 * @param {{}} row
 * @param {number} index
 * @param {function} moveRow
 * @param {{}} settings
 * @param {{}} style
 * @param {{}} cardTemplate
 * @param {[]} visibleColumns
 * @return {*}
 * @constructor
 */
const Row = ({ row,
               index,
               moveRow,
               style,
               visibleColumns,
               cardTemplate,
               settings }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const fragmentProps = { ...row.getRowProps() };
  delete fragmentProps.role;
  delete fragmentProps.style;
  let ExpandCard = null;
  const {
    resize_columns,
    replace_rows,
    row_expand,
    virtualized_rows,
    card_template,
    replace_text,
    replace_image,
    replace_width,
  } = settings;
  if (cardTemplate) {
    let template = frontElementsFabric.cloneElement(cardTemplate);
    template.setCardModel(new AltrpModel(row.original || {}));
    ExpandCard = React.createElement(template.componentClass,
        {
          element: template,
          ElementWrapper: ElementWrapper,
          children: template.children
        });
  }

  let rowProps = React.useMemo(() => {
    let rowProps = row.getRowProps();
    if ((!resize_columns) && !virtualized_rows) {
      delete rowProps.style;
      style = {};
    }
    if (replace_rows) {
      rowProps.ref = dropRef;
    }
    return rowProps;
  }, [resize_columns, replace_rows, virtualized_rows]);
  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: {  index },
    type: DND_ITEM_TYPE,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  // return (
  //     <tr ref={dropRef} style={{ opacity }}>
  //       <td ref={dragRef}>move</td>
  //       {row.cells.map(cell => {
  //         return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
  //       })}
  //     </tr>
  // );
  const rowStyles = React.useMemo(() => {
    if (! resize_columns && ! virtualized_rows) {
      return {};
    }
    return style;
  }, [resize_columns, virtualized_rows, row.getRowProps().style.width]);
  return (
      <React.Fragment {...fragmentProps}>

        <div {...rowProps} className={`altrp-table-tr ${isDragging ? 'altrp-table-tr__dragging' : ''}`} style={{ ...rowStyles, opacity }}>
          {replace_rows && <div className="altrp-table-td replace-text" ref={dragRef} style={{ width: replace_width }}>
            {replace_text}
            {replace_image && replace_image.url && <img src={replace_image.url} className="replace-picture" />}
          </div>}

          {row.cells.map((cell, idx) => {
            return <Cell cell={cell} key={idx} settings={settings} />;
            let cellContent = cell.render('Cell');
            if (cell.column.id === '##') {
              cellContent = cell.row.index + 1;
            }
            const { column } = cell;
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
            const cellClassNames = ['altrp-table-td'];
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
              if (replace_rows) {
                cellProps.ref = dropRef;
              }

              return cellProps;
            }, [resize_columns, replace_rows, virtualized_rows,
              cell.getCellProps().style.width,
              _.get(cell, 'column.column_styles_field')]);

            /**
             * Если в настройках table_hover_row: false, - background для отдельной ячейки
             */
            if (!settings.table_hover_row) {
              cellClassNames.join('altrp-table-background');
            }
            if (!column.column_body_alignment) {
              cellClassNames.join(`altrp-table-td_alignment-${column.column_body_alignment}`);
            }
            return <div {...cellProps} className={cellClassNames.join(' ')}>{cellContent}</div>
          })}
        </div>
        {row.isExpanded && row_expand && card_template && cardTemplate &&
        <div className="altrp-table-tr altrp-posts">
          <td colSpan={(visibleColumns.length + replace_rows) || 1} className="altrp-table-td altrp-post">{ExpandCard}</td>
        </div>
        }
      </React.Fragment>);
};

export default Row;
