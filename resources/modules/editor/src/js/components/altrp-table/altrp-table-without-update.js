import '../../../sass/altrp-pagination.scss';
import {
  isEditor,
  parseURLTemplate,
  recurseCount,
  setDataByPath,
  useSetDataByPath
} from "../../../../../front-app/src/js/helpers";
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
  useAsyncDebounce,} from "react-table";
import AltrpQueryComponent from "../altrp-query-component/altrp-query-component";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import {iconsManager} from "../../../../../admin/src/js/helpers";
import {matchSorter} from 'match-sorter'
import React from "react";
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
 * @param {function} setDataByPath
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
      setDataByPath,
      sortSetting
    }) {
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
  const {inner_page_size, inner_sort, global_filter, selected_storage, row_select, ids_storage} = settings;
  let columns = React.useMemo(() => settingsToColumns(settings, widgetId), [settings, widgetId]);

  const plugins = [ useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,

    ];
  if(row_select){
    plugins.push(hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          column_name: ({getToggleAllRowsSelectedProps, getToggleAllPageRowsSelectedProps}) => {
            if((! settings.inner_page_size) || (settings.inner_page_size < 0)){
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
  const tableSettings = React.useMemo(() => {
    const tableSettings = {
      columns,
      data,
      filterTypes,
      defaultColumn,
    };
    if ((inner_page_size >= 1)) {
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
  }, [inner_page_size, inner_sort, data, columns]);
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
    getRowId,
    rows,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    setPageSize,
    selectedFlatRows,
    state: {
      pageIndex,
      globalFilter,
      groupBy,
      selectedRowIds,
      expanded,
      pageSize},
  } = ReactTable;

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
  // console.log(selectedRowIds);
  // console.log(selectedFlatRows);
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


  return <>
    <table className={"altrp-table altrp-table_columns-" + columns.length} {...getTableProps()}>
      <thead className="altrp-table-head">
      {renderAdditionalRows(settings)}
      {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className="altrp-table-tr">
            {headerGroup.headers.map((column, idx) => {
                  const {column_width, column_header_alignment} = column;
                  let columnProps = column.getHeaderProps();
                  if (inner_sort) {
                    columnProps = column.getHeaderProps(column.getSortByToggleProps());
                  }
                  if (column_width) {
                    columnProps.width = column_width + '%';
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
                      <label className={`altrp-label altrp-label_${column.column_filter_type}`} onClick={e => { e.stopPropagation()}}>
                        {column.render('Filter')}
                      </label>
                    }

                  </th>;
                }
            )}
          </tr>
      ))}
      {global_filter &&  <tr>
        <th className="altrp-table-th"
            colSpan={visibleColumns.length}
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
      <tbody {...getTableBodyProps()}>
      {(page ? page : rows).map((row, i) => {
        prepareRow(row);
        return (
            <tr {...row.getRowProps()} className="altrp-table-tr">

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
                return <td {...cell.getCellProps()} className={cellClassNames.join(' ')}>{cellContent}</td>
              })}
            </tr>
        )
      })}

      </tbody>
    </table>
    {paginationProps && <Pagination {...paginationProps}/>}
  </>
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
        <button className="altrp-btn" onClick={() => setFilter(undefined)}>{buttonText}</button>
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
  let { tables_columns } = settings;
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
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </span>
      ),
      Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
              <span
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
export default (props) => {
  props = {...props, setDataByPath};
  return <AltrpQueryComponent {...props}><AltrpTableWithoutUpdate/></AltrpQueryComponent>
}