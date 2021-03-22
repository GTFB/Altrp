import React from "react";
import { FixedSizeList } from "react-window";
import {scrollbarWidth} from "../../../../../../front-app/src/js/helpers";
import Row from './Row';

const TableBodyContent =
    ({
       getTableBodyContentProps,
       prepareRow,
       rows,
       visibleColumns,
       totalColumnsWidth,
       moveRow,
       settings,
       cardTemplate,
       page,
     }) => {
      const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);
      const {
        virtualized_rows,
        virtualized_height,
        item_size,
        table_style_table_striple_style: isStriped
      } = settings;
      const RenderRow = React.useCallback(
          ({ index, style }) => {
            const row = page ? page[index] : rows[index];
            prepareRow(row);
            return <Row
                index={index}
                row={row}
                visibleColumns={visibleColumns}
                moveRow={moveRow}
                settings={settings}
                cardTemplate={cardTemplate}
                {...row.getRowProps({ style })}
            />;

          }, [page,
            rows,
            visibleColumns,
            settings,
            cardTemplate,
            moveRow,
            prepareRow,]);
      const itemCount = React.useMemo(() => page ? page.length : rows.length, [page, rows]);
      if (virtualized_rows) {
        return <React.Fragment>
          <FixedSizeList
              height={Number(virtualized_height) || 0}
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