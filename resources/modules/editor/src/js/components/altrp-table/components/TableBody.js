import { FixedSizeList } from "react-window";
import {scrollbarWidth} from "../../../../../../front-app/src/js/helpers";
import Row from './Row';

const TableBody =
    ({
       getTableBodyProps,
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
        return <div className="altrp-table-scroll-body" {...getTableBodyProps()}>
          <FixedSizeList
              height={Number(virtualized_height) || 0}
              itemCount={itemCount}
              itemSize={Number(item_size) || 0}
              width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      }
      return <div {...getTableBodyProps()} className={`altrp-table-tbody ${isStriped ? "altrp-table-tbody--striped" : ""}`}>
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

      </div>
    };

export default TableBody;