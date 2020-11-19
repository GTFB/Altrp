import update from 'immutability-helper'
import {HTML5Backend} from 'react-dnd-html5-backend'
import '../../../sass/altrp-pagination.scss';
import {
  recurseCount,
  setDataByPath, storeWidgetState,
} from "../../../../../front-app/src/js/helpers";
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import {Link} from "react-router-dom";
import {renderAdditionalRows,} from "./altrp-table";
import {useSortBy,
  useTable,
  usePagination,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  useExpanded,
  useRowSelect,
  useResizeColumns,
  useBlockLayout,
  useAsyncDebounce,} from "react-table";
import AltrpQueryComponent from "../altrp-query-component/altrp-query-component";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import {iconsManager} from "../../../../../admin/src/js/helpers";
import {matchSorter} from 'match-sorter'
import React from "react";
import templateLoader from "../../classes/modules/TemplateLoader";
import frontElementsFabric from "../../../../../front-app/src/js/classes/FrontElementsFabric";
import AltrpModel from "../../classes/AltrpModel";
/**
 *
 * @param rows
 * @param ids
 * @param filterValue
 * @return {*}
 */
function includesSome(rows, ids, filterValue) {
  return rows.filter(function (row) {
    return ids.some(function (id) {
      let rowValue = row.values[id];
      return filterValue.some(function (val) {
        if (!(val || rowValue)) {
          return true;
        }
        if (! _.isString(rowValue)) {
          rowValue += '';
        }
        return rowValue.includes(val);
      });
    });
  });
}

includesSome.autoRemove = function (val) {
  return !val || !val.length;
};

/**
 *
 * @param rows
 * @param id
 * @param filterValue
 * @return {*}
 */
function fuzzyTextFilterFn(rows, id, filterValue) {
  id = id ?  id[0] : undefined;
  return matchSorter(rows, filterValue, { keys: [row => {
    let rowValue = row.values[id];
    if(id === '##'){
      rowValue = row.index + 1;
    }
    return rowValue
  } ]})
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;
/**
 * Компонент, который работает только с внешними данными, которые не обновляются с сервера
 * @param {{}} settings
 * @param {string} widgetId
 * @param {Query} query
 * @param {{}} data
 * @param {AltrpModel} currentModel
 * @param {string} _status
 * @param {{}} _error
 * @param {function} setSortSettings
 * @param {function} setFilterSettings
 * @param {function} setPage
 * @param {{}} filterSetting
 * @param {{}} sortSetting
 * @param {[]} _latestData
 * @param {{}} widgetState
 * @return {*}
 * @constructor
 */
function AltrpTableWithoutUpdate(
    {
      settings,
      widgetId,
      query,
      data,
      currentModel,
      _status,
      _error,
      setSortSettings,
      setFilterSettings,
      filterSetting,
      _latestData,
      widgetState,
      sortSetting
    }) {

  const {inner_page_size,
    inner_sort,
    global_filter,
    card_template ,
    row_expand,
    selected_storage,
    row_select,
    store_state,
    loading_text,
    row_select_all,
    hide_columns,
    resize_columns,
    replace_rows,
    ids_storage} = settings;
  const [cardTemplate, setCardTemplate] = React.useState(null);
  /**
   * Для перетаскивания
   */
  const [records, setRecords] = React.useState(data);
  React.useEffect(()=>{
    if(replace_rows){
      setRecords(data);
    }
  }, [data, replace_rows]);
  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    setRecords(
        update(records, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRecord],
          ],
        })
    )
  };

  const filterTypes = React.useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          id = id ?  id[0] : undefined;
          return rows.filter(row => {
            let rowValue = row.values[id];
            if(id === '##'){
              rowValue = row.index + 1;
            }
            return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
          })
        },
        between: (rows, ids, filterValue) => {
          let _ref = filterValue || [],
              min = _ref[0],
              max = _ref[1];
          min = typeof min === 'number' ? min : -Infinity;
          max = typeof max === 'number' ? max : Infinity;

          if (min > max) {
            let temp = min;
            min = max;
            max = temp;
          }

          return rows.filter(function (row) {
            return ids.some(function (id) {
              let rowValue = row.values[id];
              if (id === '##') {
                rowValue = row.index + 1;
              }
              return rowValue >= min && rowValue <= max;
            });
          });
        },
        equals: (rows, ids, filterValue) => {
          return rows.filter(function (row) {
            return ids.some(function (id) {
              let rowValue = row.values[id];
              if (id === '##') {
                rowValue = row.index + 1;
              }
              return rowValue == filterValue;
            });
          });
        },
        includesSome: includesSome,
      }),
      []
  );
  const defaultColumn = React.useMemo(
      () => ({
        Filter: DefaultColumnFilter,
      }),
      []
  );
  React.useEffect(() => {
    if (!data) {
      data = [];
      return;
    }
    if (!_.isArray(data)) {
      data = [data];
    }
  }, [data]);
  let columns = React.useMemo(() => settingsToColumns(settings, widgetId), [settings, widgetId]);
  /**
   * Сохраним шаблон для выпадашки
   */
  React.useEffect(()=>{
    if(card_template && row_expand){
      (async ()=>{
        const template = await templateLoader.loadParsedTemplate(card_template);
        setCardTemplate(template);
      })()
    }
  }, [row_expand, card_template]);
  const plugins = [ useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    ];
  /**
   * Добавим кастомный хук для выбора строк
   */
  if(row_select){
    plugins.push(hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          column_name: ({getToggleAllRowsSelectedProps, getToggleAllPageRowsSelectedProps}) => {
            if((! settings.inner_page_size) || (settings.inner_page_size < 0) || row_select_all){
              return (
                  <div className="altrp-toggle-row">
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                  </div>
              );
            }
            return (
                <div className="altrp-toggle-row">
                  <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                </div>
            );
            },
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({row}) => (
              <div className="altrp-toggle-row">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
          ),
        },
        ...columns,
      ]);
    },)
  }

  const getRowId = React.useCallback(row => {
    return row.id
  }, []);
  /**
   * настройки таблицы, свызов хука таблицы
   * @type {*|{columns: (*|Array), data: {}, filterTypes: (*|{fuzzyText: (function(*=, *, *=): (*|Array)), text: (function(*, *, *=): *), between: (function(*, *, *=): *), equals: (function(*, *, *=): *), includesSome: (function(*, *, *=): *)}), defaultColumn: (*|{Filter: (function({column: *}, {}): *)})}}
   */
  const tableSettings = React.useMemo(() => {
    const tableSettings = {
      columns,
      data: replace_rows ? records : data,
      filterTypes,
      defaultColumn,
    };
    if(replace_rows){
      tableSettings.getRowId = getRowId;
    }
    if(_.isObject(widgetState)){
      tableSettings.initialState = widgetState;
    } else if ((inner_page_size >= 1)) {
      tableSettings.initialState = {
        pageSize: Number(inner_page_size),
      };
    } else {
      tableSettings.initialState = {
        pageSize: data.length,
      };
    }
    tableSettings.disableSortBy = ! inner_sort;
    return tableSettings;
  }, [inner_page_size, inner_sort, data, columns, widgetState, records, replace_rows]);

  const ReactTable = useTable(
      tableSettings,
      ...plugins
  );


  // console.log(ReactTable);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    getToggleHideAllColumnsProps,
    allColumns,
    // getRowId,
    rows,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    setPageSize,
    selectedFlatRows,
    state: reactTableState,
  } = ReactTable;
  const {
     pageIndex,
     globalFilter,
     groupBy,
     selectedRowIds,
     expanded,
     pageSize} = reactTableState;

  React.useEffect(()=>{
    if(store_state){
      storeWidgetState(widgetId, reactTableState);
    }
  }, );

  React.useEffect(
      () => {
        if (!setPageSize) {
          return
        }
        if ((!Number(inner_page_size) || Number(inner_page_size < 1))) {
          setPageSize(data.length || 10);
        }
        setPageSize(Number(inner_page_size) || data.length || 10);
      },
      [inner_page_size, data],
  );
  function flatRows(rows = [], field = ''){
    let _rows = [];
    if(_.isEmpty(rows)){
      return _rows;
    }
    rows.forEach(r=>{
      r.original && (field ? _rows.push(_.get(r.original, field)) : _rows.push(r.original));
      r.subRows && (_rows = _.concat(_rows, flatRows(r.subRows)));
    });
    return _rows;
  }
  const originalSelectedRows = React.useMemo(()=> flatRows(selectedFlatRows), [selectedFlatRows]);
  const selectedIds = React.useMemo(()=> flatRows(selectedFlatRows, 'id'), [selectedFlatRows]);
  React.useEffect(()=>{
    if(selected_storage){
      setDataByPath(selected_storage, originalSelectedRows);
    }
  }, [selected_storage, originalSelectedRows]);
  React.useEffect(()=>{
    if(ids_storage){
      setDataByPath(ids_storage, selectedIds);
    }
  }, [ids_storage, selectedIds]);

  /**
   * Настройки пагинации
   */
  const paginationProps =
      React.useMemo(() => {
        let paginationProps = null;
        if (inner_page_size && (inner_page_size >= 1)) {
          paginationProps = {
            settings,
            nextPage,
            previousPage,
            pageIndex,
            pageCount,
            pageSize,
            setPageSize,
            widgetId,
            gotoPage,
          };
        }
        return paginationProps;
      }, [inner_page_size, pageSize, pageCount, pageIndex, settings ]);
  const {WrapperComponent, wrapperProps} = React.useMemo(()=>{
    return {
      WrapperComponent: replace_rows ? DndProvider : React.Fragment,
      wrapperProps: replace_rows ? {backend:HTML5Backend} : {},
    };
  }, [replace_rows]);

  return <WrapperComponent {...wrapperProps}>
    {hide_columns &&<div className="altrp-table-hidden">
      <div className="altrp-table-hidden__all">
        <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
        All
      </div>
      {allColumns.map(column => {
        if(['expander', 'selection'].indexOf(column.id) >= 0){
          return null;
        }
        return(
          <div key={column.id} className="altrp-table-hidden__column">
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.column_name || column.id}
              {column.id}
            </label>
          </div>
      )})}
      <br />
    </div>}
    <table className={"altrp-table altrp-table_columns-" + columns.length} {...getTableProps()}>
      <thead className="altrp-table-head">
      {renderAdditionalRows(settings)}
      {headerGroups.map(headerGroup => {
        const headerGroupProps = headerGroup.getHeaderGroupProps();

        if(! resize_columns){
          delete headerGroupProps.style;
        }
        return (
        <tr {...headerGroupProps} className="altrp-table-tr">
          {replace_rows && <th className="altrp-table-th"/>}
          {headerGroup.headers.map((column, idx) => {
            const {column_width, column_header_alignment} = column;
            let columnProps = column.getHeaderProps();
            if (inner_sort) {
              columnProps = column.getHeaderProps(column.getSortByToggleProps());
            }
            const resizerProps = {...column.getResizerProps(), onClick: e=>{e.stopPropagation();}};
            if (Number(column_width)) {
              columnProps.width = column_width + '%';
            }
            if(! resize_columns){
              delete columnProps.style;
            }
            // columnProps.style = {};
            // if (column_width)  columnProps.style.width = column_width;
            // if (column_header_alignment)  columnProps.style.textAlign = column_header_alignment;
            return <th {...columnProps}
                       className="altrp-table-th"
                       key={idx}>{
              column.render('column_name')
            }
              {column.canGroupBy ? (
                  // If the column can be grouped, let's add a toggle
                  <span {...column.getGroupByToggleProps()} className="altrp-table-th__group-toggle">
                {column.isGrouped ? ' 🛑 ' : ' 👊 '}
              </span>
              ) : null}
              {
                (inner_sort) && (column.isSorted
                    ? column.isSortedDesc
                        ? iconsManager().renderIcon('chevron', {className: 'rotate-180 sort-icon '})
                        : iconsManager().renderIcon('chevron', {className: 'sort-icon'})
                    : '')
              }
              {
                column.column_is_filtered &&
                <label className={`altrp-label altrp-label_${column.column_filter_type}`} onClick={e => {e.stopPropagation()}}>
                  {column.render('Filter')}
                </label>
              }
              {
                resize_columns && <div
                    {...resizerProps}
                    className={`altrp-table__resizer ${
                        column.isResizing ? 'altrp-table__resizer_resizing' : ''
                        }`}
                />
              }
            </th>;
              }
          )}
        </tr>)}
      )}
      {global_filter &&  <tr className="altrp-table-tr">
        <th className="altrp-table-th"
            colSpan={visibleColumns.length + replace_rows}
            style={{
              textAlign: 'left',
            }}
        >
          <GlobalFilter
              widgetId={widgetId}
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              settings={settings}
          />
        </th>
      </tr>
      }
      </thead>
      {_status === 'success' ?
      <tbody {...getTableBodyProps()}>
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
        const fragmentProps = {...row.getRowProps()};
        delete fragmentProps.role;
        delete fragmentProps.style;
        let ExpandCard = null;
        if(cardTemplate){
          let template = frontElementsFabric.cloneElement(cardTemplate);
          template.setCardModel(new AltrpModel(row.original || {}));
          ExpandCard = React.createElement(template.componentClass,
              {
                element: template,
                children: template.children
              });
        }
        let rowProps = row.getRowProps();
        if(! resize_columns){
          delete rowProps.style;
        }
        /*return (
          <React.Fragment {...fragmentProps}>

            <tr {...rowProps} className="altrp-table-tr">

              {row.cells.map(cell => {
                let cellContent = cell.render('Cell');
                if (cell.column.id === '##') {
                  cellContent = cell.row.index + 1;
                }
                if(cell.isGrouped){
                  cellContent = (
                      <>
                        <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                                 {cell.render('Cell')} ({recurseCount(row, 'subRows')})
                      </>
                  );
                } else if (cell.isAggregated){
                  cellContent = cell.render('Aggregated');
                } else if (cell.isPlaceholder){
                  cellContent = cell.render('Cell');
                }
                const cellClassNames = ['altrp-table-td'];
                cell.isAggregated && cellClassNames.push('altrp-table-td_aggregated');
                cell.isPlaceholder && cellClassNames.push('altrp-table-td_placeholder');
                cell.isGrouped && cellClassNames.push('altrp-table-td_grouped');

                let cellProps = cell.getCellProps();
                if(! resize_columns){
                  delete cellProps.style;
                }
                return <td {...cellProps} className={cellClassNames.join(' ')}>{cellContent}</td>
              })}
            </tr>
            {row.isExpanded && row_expand && card_template && cardTemplate &&
              <tr className="altrp-table-tr altrp-posts">
                <td colSpan={visibleColumns.length} className="altrp-table-td altrp-post">{ExpandCard}</td>
              </tr>
            }
          </React.Fragment> )*/
      })}

      </tbody> :
          <tbody><tr className="altrp-table-tr"><td className="altrp-table-td" colSpan={visibleColumns.length + replace_rows}>
            {(_status === 'loading' ? (loading_text || null) : null )}
          </td></tr></tbody>}
    </table>
    {paginationProps && <Pagination {...paginationProps}/>}
  </WrapperComponent>
}

/**
 *
 * @param {{}}settings
 * @param {function} nextPage
 * @param {function} previousPage
 * @param {function} setPageSize
 * @param {function} gotoPage
 * @param {int} pageIndex
 * @param {int} pageCount
 * @param {int} pageSize
 * @param {string} widgetId
 * @return {*}
 */
export function Pagination(
    {
      settings,
      nextPage,
      previousPage,
      setPageSize,
      pageIndex,
      pageCount,
      pageSize,
      widgetId,
      gotoPage,
    }) {
  const {inner_page_count_options} = settings;
  let countOptions =
      React.useMemo(() => {
        let countOptions = null;
        if (inner_page_count_options) {
          countOptions = inner_page_count_options.split('\n');
          countOptions = countOptions.map(o => ({value: Number(o), label: Number(o)}));
        }
        return countOptions
      }, [inner_page_count_options]);
  return <div className="altrp-pagination">
    <button className={"altrp-pagination__previous"}
            onClick={() => {
              previousPage();
            }}
            disabled={pageIndex === 0}>
      {settings.prev_text || 'Previous Page'}
    </button>
    <div className="altrp-pagination__count">
      {settings.current_page_text || 'Current Page:'}
      {pageIndex + 1}
    </div>
    <button className="altrp-pagination__next"
            onClick={() => {
              nextPage()
            }}
            disabled={pageCount === pageIndex + 1}>
      {settings.next_text || 'Next Page'}
    </button>
    {<input className="altrp-pagination__goto-page"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                              const page = e.target.value ? Number(e.target.value) - 1 : 0;
                              gotoPage(page)
                            }}/>}
    {countOptions && <AltrpSelect className="altrp-pagination__select-size"
                                  options={countOptions}
                                  classNamePrefix={widgetId + ' altrp-field-select2'}
                                  value={countOptions.find(o => o.value === pageSize)}
                                  isSearchable={false}
                                  onChange={value => {
                                    setPageSize(value.value)
                                  }}/>}

  </div>
}

/**
 * Define a default UI for filtering
 * @param filterValue
 * @param preFilteredRows
 * @param setFilter
 * @param {string} filter_placeholder
 * @param {string} column_filter_type
 * @param {boolean} column_is_filtered
 * @param {{}}settings
 * @return {*}
 * @constructor
 */

function DefaultColumnFilter({
                               column: { filterValue,
                                 preFilteredRows,
                                 setFilter,
                                 filter_placeholder,
                                 column_filter_type,
                                 column_is_filtered,
                               },
                             }, settings) {
  const count = preFilteredRows.length;
  filter_placeholder = filter_placeholder ? filter_placeholder.replace('{{count}}', count) : `Search ${count} records...`;
  return (
      <input
          value={filterValue || ''}
          className="altrp-field"
          onChange={e => {
            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
          }}
          placeholder={filter_placeholder}
      />
  )
}
/**
 * Селект для фильтрации по значениям в колонке
 * @param filterValue
 * @param setFilter
 * @param preFilteredRows
 * @param id
 * @param widgetId
 * @param filter_placeholder
 * @return {*}
 * @constructor
 */
function SelectColumnFilter({
                              column: { filterValue, setFilter, preFilteredRows, id, filter_placeholder },
                              widgetId
                            }) {
  const options = React.useMemo(() => {
    let _options = new Set();
    preFilteredRows.forEach(row => {
      _options.add(row.values[id])
    });
    return [..._options.values()].map(option =>({
      value: option,
      label: option + '',
    }));
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (<AltrpSelect options={options}
                       isMulti={true}
                       placeholder={filter_placeholder || 'Select some...'}
                       className="altrp-table__filter-select"
                       classNamePrefix={widgetId + ' altrp-field-select2'}
                       onChange={v=>{
        if(! _.isArray(v)){
          v = [];
        }
        let filterValue = v.map(option=>option.value);
        setFilter(filterValue);
      }}/>
  );
}

/**
 * This is a custom filter UI that uses a
 * slider to set the filter value between a column's
 * min and max values
 * @param filterValue
 * @param setFilter
 * @param preFilteredRows
 * @param filter_button_text
 * @param id
 * @return {*}
 * @constructor
 */
function SliderColumnFilter({
                              column: { filterValue, setFilter, preFilteredRows, id, filter_button_text },
                            }) {
  const [min, max] = React.useMemo(() => {
    let value = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    if(id === '##' && preFilteredRows.length) {
      value = preFilteredRows[0].index;
    }
    let min = value;
    let max = value;
    preFilteredRows.forEach(row => {
      let value = row.values[id];
      if(id === '##'){
        value = row.index;
      }
      min = Math.min(value, min);
      max = Math.max(value, max);
    });
    return [min, max]
  }, [id, preFilteredRows]);
  const buttonText = filter_button_text || 'Off';
  return (
      <>
        <input
            type="range"
            className="altrp-field"
            min={min}
            max={max}
            value={filterValue || min}
            onChange={e => {
              setFilter(parseInt(e.target.value, 10))
            }}
        />
        <button className={`altrp-btn ${(filterValue !== undefined) ? 'active' : ''}`} onClick={() => setFilter(undefined)}>{buttonText}</button>
      </>
  )
}
/**
 * This is a custom UI for our 'between' or number range
 * filter. It uses two number boxes and filters rows to
 * ones that have values between the two
 * @param filterValue
 * @param preFilteredRows
 * @param setFilter
 * @param filter_max_placeholder
 * @param filter_min_placeholder
 * @param id
 * @return {*}
 * @constructor
 */
function NumberRangeColumnFilter({
                                   column: { filterValue = [],
                                     preFilteredRows,
                                     setFilter,
                                     filter_max_placeholder,
                                     filter_min_placeholder,
                                     id },
                                 }) {
  const [min, max] = React.useMemo(() => {
    let value = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    if(id === '##' && preFilteredRows.length) {
      value = preFilteredRows[0].index;
    }
    let min = value;
    let max = value;
    preFilteredRows.forEach(row => {
      let value = row.values[id];
      if(id === '##'){
        value = row.index;
      }
      min = Math.min(value, min);
      max = Math.max(value, max);
    });
    return [min, max]
  }, [id, preFilteredRows]);
  let minPlaceHolder = filter_min_placeholder || `Min (${min})`;
  let maxPlaceHolder = filter_max_placeholder || `Max (${max})`;
  return (
      <div className="altrp-filter-group"
          style={{
            display: 'flex',
          }}
      >
        <input
            value={filterValue[0] || ''}
            type="number"
            className="altrp-field"
            onChange={e => {
              const val = e.target.value;
              setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
            }}
            placeholder={minPlaceHolder}
            style={{
              width: '70px',
              marginRight: '0.5rem',
            }}
        />
        to
        <input
            value={filterValue[1] || ''}
            type="number"
            className="altrp-field"
            onChange={e => {
              const val = e.target.value;
              setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
            }}
            placeholder={maxPlaceHolder}
            style={{
              width: '70px',
              marginLeft: '0.5rem',
            }}
        />
      </div>
  )
}

/**
 * Парсинг колонок из настроек в колонки для react-table
 * @param settings
 * @param widgetId
 * @return {Array}
 */
export function settingsToColumns(settings, widgetId) {
  let columns = [];
  let { tables_columns, card_template, row_expand } = settings;
  tables_columns = tables_columns || [];
  /**
   * Если в колонке пустые поля, то мы их игнорируем, чтобы не было ошибки
   */
  tables_columns.forEach(_column => {
    /**
     * Колонку проказываем, если есть accessor или список actions
     */
    if (_column.column_name && ((_column.actions && _column.actions.length) || _column.accessor)) {
      _column._accessor = _column.accessor;
      if(_column.column_is_filtered){

        _column.filter = 'fuzzyText';
        switch (_column.column_filter_type){
          case 'min_max':{
            _column.filter = 'between';
            _column.Filter = NumberRangeColumnFilter;
          }
          break;
          case 'slider':{
            _column.filter = 'equals';
            _column.Filter = SliderColumnFilter;
          }
          break;
          case 'select':{
            _column.filter = 'includesSome';
            _column.Filter = ({column}) => <SelectColumnFilter column={column} widgetId={widgetId}/>;
          }
          break;
        }
        _column.canGroupBy = _column.group_by;
        console.log(_column);
        console.log(_column.group_by);
        if(_column.aggregate){
          let aggregateTemplate = _column.aggregate_template || `{{value}} Unique Names`;
          _column.Aggregated = ({value}) => {
            return aggregateTemplate.replace(/{{value}}/g, value)
          };
        }
      }
      columns.push(_column);
    }
  });
  if(settings.row_expand){
    columns.unshift({
      id: 'expander', // Make sure it has an ID
      column_name: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}  className="altrp-table__all-row-expander">
            {isAllRowsExpanded ? '👇' : '👉'}
          </span>
      ),
      Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          (card_template && row_expand || row.canExpand) ? (
              <span className="altrp-table__row-expander"
                  {...row.getToggleRowExpandedProps({
                    style: {
                      // We can even use the row.depth property
                      // and paddingLeft to indicate the depth
                      // of the row
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
              >
              {row.isExpanded ? '👇' : '👉'}
            </span>
          ) : null,
    });
  }
  return columns;
}

/**
 * Отрисовка чекбокса
 * @type {*|React.ForwardRefExoticComponent<React.PropsWithoutRef<{indeterminate: *, rest: *}> & React.RefAttributes<any>>}
 */
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate]);
      return (
          <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
          </>
      )
    }
);
/**
 * Define a default UI for filtering
 * @param {[]} preGlobalFilteredRows
 * @param {string} globalFilter
 * @param {function} setGlobalFilter
 * @param {string} widgetId
 * @param {{}} settings
 * @return {*}
 * @constructor
 */
function GlobalFilter({
                        preGlobalFilteredRows,
                        globalFilter,
                        setGlobalFilter,
                        widgetId,
                        settings,
                      }) {
  const {global_filter_placeholder, global_filter_label} = settings;
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);
  let labelText = global_filter_label || `Search:${' '}`;
  let placeholder = global_filter_placeholder || `${count} records...`;
  placeholder = placeholder.replace(/{{count}}/g, count);
  return (
      <span className="altrp-table-global-filter">
        <label htmlFor={`altrp-table-global-filter${widgetId}`}>
          {labelText}
        </label>
        <input
            id={`altrp-table-global-filter${widgetId}`}
            value={value || ""}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder={placeholder}

        />
    </span>
  )
}
const DND_ITEM_TYPE = 'row';

/**
 * Компонент строки
 * @param {{}} row
 * @param {number} index
 * @param {function} moveRow
 * @param {{}}settings
 * @param {{}}cardTemplate
 *
 * @return {*}
 * @constructor
 */
const Row = ({ row,
               index,
               moveRow,
               visibleColumns,
               cardTemplate,
               settings }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const fragmentProps = {...row.getRowProps()};
  delete fragmentProps.role;
  delete fragmentProps.style;
  let ExpandCard = null;
  const {
    resize_columns,
    replace_rows,
    row_expand,
    card_template,
  } = settings;
  if(cardTemplate){
    let template = frontElementsFabric.cloneElement(cardTemplate);
    template.setCardModel(new AltrpModel(row.original || {}));
    ExpandCard = React.createElement(template.componentClass,
        {
          element: template,
          children: template.children
        });
  }

  let rowProps = React.useMemo(()=>{
    let rowProps = row.getRowProps();
    if(! resize_columns){
      delete rowProps.style;
    }
    if(replace_rows){
      rowProps.ref = dropRef;
    }
    return rowProps;
  }, [resize_columns, replace_rows]);

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
    item: { type: DND_ITEM_TYPE, index },
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
  return (
    <React.Fragment {...fragmentProps}>

      <tr {...rowProps} className={`altrp-table-tr ${ isDragging ? 'altrp-table-tr__dragging' : ''}`} style={{ opacity }}>
        {replace_rows && <td className="altrp-table-td" ref={dragRef}>move</td>}
        {row.cells.map(cell => {
          let cellContent = cell.render('Cell');
          if (cell.column.id === '##') {
            cellContent = cell.row.index + 1;
          }
          if(cell.isGrouped){
            cellContent = (
                <>
                  <span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? '👇' : '👉'}
                        </span>{' '}
                               {cell.render('Cell')} ({recurseCount(row, 'subRows')})
                </>
            );
          } else if (cell.isAggregated){
            cellContent = cell.render('Aggregated');
          } else if (cell.isPlaceholder){
            cellContent = cell.render('Cell');
          }
          const cellClassNames = ['altrp-table-td'];
          cell.isAggregated && cellClassNames.push('altrp-table-td_aggregated');
          cell.isPlaceholder && cellClassNames.push('altrp-table-td_placeholder');
          cell.isGrouped && cellClassNames.push('altrp-table-td_grouped');

          let cellProps = React.useMemo(()=>{
            let cellProps = cell.getCellProps();
            if(! resize_columns){
              delete cellProps.style;
            }
            if(replace_rows){
              cellProps.ref = dropRef;
            }
            return cellProps;
          }, [resize_columns, replace_rows]);

          return <td {...cellProps} className={cellClassNames.join(' ')}>{cellContent}</td>
        })}
      </tr>
      {row.isExpanded && row_expand && card_template && cardTemplate &&
      <tr className="altrp-table-tr altrp-posts">
        <td colSpan={visibleColumns.length + replace_rows} className="altrp-table-td altrp-post">{ExpandCard}</td>
      </tr>
      }
    </React.Fragment> );
};


export default (props) => {
  props = {...props};
  return <AltrpQueryComponent {...props}><AltrpTableWithoutUpdate/></AltrpQueryComponent>
}