import SliderRangeFilter from "./components/filters/SliderRangeFilter";
import ('../altrp-posts/altrp-posts.scss');
import update from 'immutability-helper'
import ('../../../sass/altrp-pagination.scss');
import {
  setDataByPath,
  storeWidgetState,
  isEditor, parseURLTemplate,
  renderAssetIcon,
  renderIcon, setAltrpIndex, getResponsiveSetting
} from "../../../../../front-app/src/js/helpers";
import { renderAdditionalRows, renderCellActions, } from "./altrp-table";
import {
  useSortBy,
  useTable,
  usePagination,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  useExpanded,
  useRowSelect,
  useResizeColumns,
  useBlockLayout,
  useAsyncDebounce,
} from "react-table";
import AltrpQueryComponent from "../altrp-query-component/altrp-query-component";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import { iconsManager } from "../../../../../admin/src/js/helpers";
import { matchSorter } from 'match-sorter'
import React from "react";
import templateLoader from "../../classes/modules/TemplateLoader";
import frontElementsFabric from "../../../../../front-app/src/js/classes/FrontElementsFabric";
import AltrpModel from "../../classes/AltrpModel";
import ElementWrapper from "../../../../../front-app/src/js/components/ElementWrapper";
import AutoUpdateInput from "../../../../../admin/src/components/AutoUpdateInput";
import TableComponent from "./components/TableComponent";
import HeaderCellComponent from "./components/HeaderCellComponent";
import TableBody from './components/TableBody';
import Pagination from "./components/Pagination";
import {useSelector} from "react-redux";
const Link = window.Link;


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
        if (!_.isString(rowValue)) {
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
 * Фильтрация нечеткого текста
 * @param rows
 * @param id
 * @param filterValue
 * @return {*}
 */
function fuzzyTextFilterFn(rows, id, filterValue) {
  id = id ? id[0] : undefined;
  return matchSorter(rows, filterValue, {
    keys: [row => {
      let rowValue = row.values[id];
      if (id === '##') {
        rowValue = row.index + 1;
      }
      return rowValue
    }]
  })
}
fuzzyTextFilterFn.autoRemove = val => ! val;
/**
 * Фильтрация на точное соответствие
 * @param rows
 * @param id
 * @param filterValue
 * @return {*}
 */
function fullMatchTextFilterFn(rows, id, filterValue) {
  id = id ? id[0] : undefined;
  return rows.filter(row => _.get(row, `values.${id}`) === filterValue);
}
fullMatchTextFilterFn.autoRemove = val => ! val;
/**
 * Фильтрация на нахождение в тексте
 * @param rows
 * @param id
 * @param filterValue
 * @return {*}
 */
function partialMatchTextFilterFn(rows, id, filterValue) {
  id = id ? id[0] : undefined;
  return rows.filter(row => {
    filterValue = filterValue.replace(/\s/g, '');
    let value = _.get(row, `values.${id}`, '').replace(/\s/g, '');
    return value.indexOf(filterValue) !== -1
  });
}
partialMatchTextFilterFn.autoRemove = val => ! val;
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
    currentScreen,
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

  const stateRef = React.useRef(widgetState);
  const { inner_page_size,
    global_filter,
    card_template,
    row_expand,
    selected_storage,
    row_select,
    row_select_width,
    store_state,
    loading_text,
    row_select_all,
    hide_columns,
    resize_columns,
    table_transpose,
    virtualized_rows,
    replace_rows,
    tables_settings_for_subheading,
    replace_width,
    ids_storage,
    hide_grouped_column_icon,
    grouped_column_icon,
    hide_not_grouped_column_icon,
    not_grouped_column_icon,
    checkbox_checked_icon: checkedIcon = {},
    checkbox_unchecked_icon: uncheckedIcon = {},
    checkbox_indeterminate_icon: indeterminateIcon = {} } = settings;
  const [cardTemplate, setCardTemplate] = React.useState(null);
  const showPagination = React.useMemo(()=>{
    return inner_page_size < data?.length
  }, [data, inner_page_size]);
  /**
   * Для перетаскивания
   */
  const [records, setRecords] = React.useState(data);
  React.useEffect(() => {
    setRecords(data);
  }, [data]);
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
      fullMatchText: fullMatchTextFilterFn,
      partialMatchText: partialMatchTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        id = id ? id[0] : undefined;
        return rows.filter(row => {
          let rowValue = row.values[id];
          if (id === '##') {
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
      width: 150,
      Cell: DefaultCell,
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
  React.useEffect(() => {
    if (card_template && row_expand) {
      (async () => {
        const template = await templateLoader.loadParsedTemplate(card_template);
        setCardTemplate(template);
      })()
    }
  }, [row_expand, card_template]);
  const plugins = [useFilters,
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
  if (row_select) {
    plugins.push(hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          column_width: row_select_width || 0,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          column_name: ({ getToggleAllRowsSelectedProps, getToggleAllPageRowsSelectedProps }) => {
            if ((!settings.inner_page_size) || (settings.inner_page_size < 0) || row_select_all) {
              return (
                <div className="altrp-toggle-row">
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} icons={{ checkedIcon, uncheckedIcon, indeterminateIcon }} />
                </div>
              );
            }
            return (
              <div className="altrp-toggle-row">
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} icons={{ checkedIcon, uncheckedIcon, indeterminateIcon }} />
              </div>
            );
          },
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div className="altrp-toggle-row">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} icons={{ checkedIcon, uncheckedIcon, indeterminateIcon }} />
            </div>
          ),
        },
        ...columns,
      ]);
    })
  }

  /**
   * Редактирование данных
   */
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setRecords(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  };
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
      // data: replace_rows ? records : data,
      data: records,
      filterTypes,
      autoResetPage: !skipPageReset,
      defaultColumn,
      updateData,
    };
    if (replace_rows) {
      tableSettings.getRowId = getRowId;
    }
    // if(_.isObject(stateRef.current)){
    //   tableSettings.initialState = stateRef.current;
    // } else
    if (isEditor()) {

      if ((inner_page_size >= 1)) {
        tableSettings.initialState = {
          pageSize: Number(inner_page_size),
        };
      } else {
        tableSettings.initialState = {
          pageSize: data.length,
        };
      }
    }
    if(! _.isArray(tableSettings.data)){
      if(_.isObject(tableSettings.data)){
        tableSettings.data = [tableSettings.data];
      } else {
        tableSettings.data = [];
      }
    }
    if(! _.isEmpty(tables_settings_for_subheading)){
      let sortBy = tables_settings_for_subheading.map(item => {
        return{
          id: item.name,
          desc: item.order === 'DESC',
        };
      });
      _.set(tableSettings, 'initialState.sortBy', sortBy);
    }
    return tableSettings;
  }, [
    inner_page_size,
    data,
    columns,
    stateRef,
    records,
    replace_rows,
    skipPageReset,
    tables_settings_for_subheading,
  ]);
  React.useEffect(() => {

    if (_.isObject(stateRef.current)) {
      tableSettings.initialState = stateRef.current;
    }
  }, [stateRef, data]);
  const ReactTable = useTable(
    tableSettings,
    ...plugins
  );

  /**
   * END настройки таблицы, свызов хука таблицы
   */
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
    totalColumnsWidth,
    state: reactTableState,
  } = ReactTable;
  const {
    pageIndex,
    globalFilter,
    groupBy,
    selectedRowIds,
    expanded,
    pageSize } = reactTableState;

  React.useEffect(() => {
    if (store_state) {
      storeWidgetState(widgetId, reactTableState);
    }
  });

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
  function flatRows(rows = [], field = '') {
    let _rows = [];
    if (_.isEmpty(rows)) {
      return _rows;
    }
    rows.forEach(r => {
      r.original && (field ? _rows.push(_.get(r.original, field)) : _rows.push(r.original));
      r.subRows && (_rows = _.concat(_rows, flatRows(r.subRows)));
    });
    return _rows;
  }
  const originalSelectedRows = React.useMemo(() => flatRows(selectedFlatRows), [selectedFlatRows]);
  const selectedIds = React.useMemo(() => flatRows(selectedFlatRows, 'id'), [selectedFlatRows]);
  React.useEffect(() => {
    if (selected_storage &&
      ! _.isEqual(altrpHelpers.getDataByPath(selected_storage), originalSelectedRows) &&
      ! isEditor()) {
      setDataByPath(selected_storage, originalSelectedRows);
    }
  }, [selectedFlatRows]);
  React.useEffect(() => {
    if (ids_storage &&
      ! _.isEqual(altrpHelpers.getDataByPath(ids_storage), selectedIds) &&
      ! isEditor()) {
      setDataByPath(ids_storage, selectedIds);
    }
  }, [selectedFlatRows]);

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
    }, [inner_page_size, pageSize, pageCount, pageIndex, settings]);

  let tableElement = React.useRef(null);


  return  <React.Fragment>
    {hide_columns && <div className="altrp-table-hidden">
      <div className="altrp-table-hidden__all">
        <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
        All
      </div>
      {allColumns.map(column => {
        if (['expander', 'selection'].indexOf(column.id) >= 0) {
          return null;
        }
        return (
          <div key={column.id} className="altrp-table-hidden__column">
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.column_name || column.id}
              {column.id}
            </label>
          </div>
        )
      })}
      <br />
    </div>}
    <TableComponent className={"altrp-table altrp-table_columns-" + columns.length}
                    ReactTable={ReactTable}
                    currentScreen={currentScreen}
                    settings={settings}
                    table={tableElement}
                    rows={rows}
                    ref={tableElement}
                    {...getTableProps()}>
      <div className="altrp-table-head">
        {renderAdditionalRows(settings)}
        {headerGroups.map(headerGroup => {
            const headerGroupProps = headerGroup.getHeaderGroupProps();

            if (!resize_columns && !virtualized_rows) {
              delete headerGroupProps.style;
            }
            return (
              <div {...headerGroupProps} className="altrp-table-tr">
                {replace_rows && <div className="altrp-table-th altrp-table-cell" style={{ width: replace_width }} />}
                {headerGroup.headers.map((column, idx) => {
                    const { column_width, column_header_alignment, header_bg } = column;

                    let columnProps = column.getHeaderProps(column.getSortByToggleProps());
                    columnProps.settings = settings;
                    const resizerProps = {
                      ...column.getResizerProps(),
                      onClick: e => { e.stopPropagation(); }
                    };
                    if (!resize_columns && !virtualized_rows) {
                      // delete columnProps.style;
                      columnProps.style = {};
                      if (column_width) columnProps.style.width = column_width + '%';
                      if (column_header_alignment) columnProps.style.textAlign = column_header_alignment;
                      if (header_bg) columnProps.style.backgroundColor = header_bg.color;
                    }
                    let columnNameContent = column.render('column_name');
                    if (_.isString(columnNameContent)) {
                      columnNameContent = <span dangerouslySetInnerHTML={{ __html: column.render('column_name') || '&nbsp;' }} />;
                    }

                    if(table_transpose){
                      _.unset(columnProps, 'style.width')
                    }
                    return <HeaderCellComponent {...columnProps}
                                                column={column}
                                                className="altrp-table-th altrp-table-cell"
                                                key={idx}>
                      {columnNameContent}
                      {column.canGroupBy ? (
                        // If the column can be grouped, let's add a toggle
                        <span {...column.getGroupByToggleProps()} className="altrp-table-th__group-toggle">
                      {column.isGrouped ?
                        renderIcon(hide_not_grouped_column_icon, not_grouped_column_icon, ' 🛑 ', 'not-grouped-column') :
                        renderIcon(hide_grouped_column_icon, grouped_column_icon, ' 👊 ', 'grouped-column')}
                    </span>
                      ) : null}
                      {
                        (column.isSorted
                          ? column.isSortedDesc
                            ? iconsManager().renderIcon('chevron', { className: 'rotate-180 sort-icon ' })
                            : iconsManager().renderIcon('chevron', { className: 'sort-icon' })
                          : '')
                      }
                      {
                        column.column_is_filtered &&
                        <label className={`altrp-label altrp-label_${column.column_filter_type}`} onClick={e => { e.stopPropagation() }}>
                          {column.render('Filter')}
                        </label>
                      }
                      {
                        resize_columns && <div
                          {...resizerProps}
                          className={`altrp-table__resizer ${column.isResizing ? 'altrp-table__resizer_resizing' : ''
                          }`}
                        />
                      }
                    </HeaderCellComponent>;
                  }
                )}
              </div>)
          }
        )}
        {global_filter && <div className="altrp-table-tr">
          <th className="altrp-table-th altrp-table-th_global-filter altrp-table-cell"
              role="cell"
              colSpan={(visibleColumns.length + replace_rows) || 1}
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
        </div>
        }
      </div>
      {_status === 'success' ?

        <TableBody {...{
          getTableBodyProps,
          prepareRow,
          totalColumnsWidth,
          rows,
          visibleColumns,
          moveRow,
          settings,
          page,
          cardTemplate,
        }}
        /> :
        <div><div className="altrp-table-tr altrp-table-tr_loading"><div className="altrp-table-td altrp-table-td_loading" colSpan={(visibleColumns.length + replace_rows) || 1}>
          {(_status === 'loading' ? (loading_text || null) : null)}
        </div></div></div>}
    </TableComponent>
    {showPagination && paginationProps && <Pagination {...paginationProps} />}
  </React.Fragment>
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
 * @param {string} null_placeholder
 * @param {{}} settings
 * @return {*}
 * @constructor
 */
function SelectColumnFilter({
                              column: { filterValue, setFilter, preFilteredRows, id, filter_placeholder, null_placeholder },
                              widgetId,
                            }) {
  const options = React.useMemo(() => {
    let _options = new Set();
    preFilteredRows.forEach(row => {
      _options.add(row.values[id])
    });
    return [..._options.values()].map(option => {

      let label = option;
      if( ! label && ! _.isString(label)){
        label = null_placeholder || '' ;
      }
      return({
        value: option,
        label,
      })});
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (<AltrpSelect options={options}
                       isMulti={true}
                       placeholder={filter_placeholder || 'Select some...'}
                       className="altrp-table__filter-select"
                       classNamePrefix={widgetId + ' altrp-field-select2'}
                       onChange={v => {
                         if (!_.isArray(v)) {
                           v = [];
                         }
                         let filterValue = v.map(option => option.value);
                         setFilter(filterValue);
                       }} />
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
    if (id === '##' && preFilteredRows.length) {
      value = preFilteredRows[0].index;
    }
    let min = value;
    let max = value;
    preFilteredRows.forEach(row => {
      let value = row.values[id];
      if (id === '##') {
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
    if (id === '##' && preFilteredRows.length) {
      value = preFilteredRows[0].index;
    }
    let min = value;
    let max = value;
    preFilteredRows.forEach(row => {
      let value = row.values[id];
      if (id === '##') {
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
  let {
    tables_columns,
    card_template,
    row_expand,
    virtualized_rows,
    resize_columns,
    hide_expanded_row_icon,
    expanded_row_icon,
    hide_not_expanded_row_icon,
    edit_disabled,
    not_expanded_row_icon
  } = settings;
  tables_columns = tables_columns || [];
  let columnOrder = (getResponsiveSetting(settings, 'columns_order') || '').trim();
  columnOrder = columnOrder ? columnOrder.split(',') : [];
  /**
   * Если в колонке пустые поля, то мы их игнорируем, чтобы не было ошибки
   */
  tables_columns.forEach(_column => {
    /**
     * Колонку проказываем, если есть accessor или список actions
     */
    if (((_column.actions && _column.actions.length) || _column.accessor)) {
      _column.edit_disabled = edit_disabled;
      _column._accessor = _column.accessor;
      if(_column.accessor && _column.accessor.indexOf('?') !== -1 && _column.accessor.indexOf(':') !== -1) {
        _column.accessor = _column.accessor.split('?')[0].trim();
      }
      _column.column_name = _column.column_name || '&nbsp;';
      if (_column.column_is_filtered) {

        _column.filter = 'fuzzyText';
        switch (_column.column_filter_type) {
          case 'min_max': {
            _column.filter = 'between';
            _column.Filter = NumberRangeColumnFilter;
          }
            break;
          case 'range_slider': {
            _column.filter = 'between';
            _column.Filter = SliderRangeFilter;
          }
            break;
          case 'slider': {
            _column.filter = 'equals';
            _column.Filter = SliderColumnFilter;
          }
            break;
          case 'select': {
            _column.filter = 'includesSome';
            _column.Filter = ({ column}) =>
              <SelectColumnFilter
                column={column}
                widgetId={widgetId} />;
          }
            break;
          case 'text': {
            switch(_column.column_text_filter_type){
              case 'full_match': {
                _column.filter = 'fullMatchText';
              }
                break;
              case 'partial_match': {
                _column.filter = 'partialMatchText';
              }
                break;
            }
          }
            break;
        }
      }
      _column.canGroupBy = ! !_column.group_by;
      _column.disableSortBy = !_column.column_is_sorted;
      if (_column.aggregate) {
        let aggregateTemplate = _column.aggregate_template || `{{value}} Unique Names`;
        _column.Aggregated = ({ value }) => {
          return aggregateTemplate.replace(/{{value}}/g, value)
        };
      }
      if (virtualized_rows || resize_columns) {
        // _column.width = (Number(_column.column_width) || 150) + '%';
        _column.width = (Number(_column.column_width) || 150);
      }
      columns.push(_column);
    }
  });
  if (settings.row_expand) {
    columns.unshift({
      id: 'expander', // Make sure it has an ID
      column_name: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
        <span {...getToggleAllRowsExpandedProps()} className="altrp-table__all-row-expander">
          {isAllRowsExpanded ?
            renderIcon(hide_expanded_row_icon, expanded_row_icon, '👇', 'expanded-row') :
            renderIcon(hide_not_expanded_row_icon, not_expanded_row_icon, '👉', 'not-expanded-row')}
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
            {row.isExpanded ?
              renderIcon(hide_expanded_row_icon, expanded_row_icon, '👇', 'expanded-row') :
              renderIcon(hide_not_expanded_row_icon, not_expanded_row_icon, '👉', 'not-expanded-row')}
          </span>
        ) : null,
    });
  }
  if(columnOrder.length){
    const _column = [];
    columnOrder.forEach(columnIndex=>{
      columnIndex = parseInt(columnIndex) - 1;
      columns[columnIndex] && (_column.indexOf(columns[columnIndex]) === -1) ? _column.push(columns[columnIndex]) : null;
    });
    columns = _column;
  }
  return columns;
}

/**
 * Отрисовка чекбокса
 * @type {*|React.ForwardRefExoticComponent<React.PropsWithoutRef<{indeterminate: *, rest: *}> & React.RefAttributes<any>>}
 */
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, icons, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate]);
    const icon = icons.checkedIcon.name ?
      rest.checked ?
        icons.checkedIcon :
        indeterminate ? icons.indeterminateIcon : icons.uncheckedIcon :
      null;
    return (
      <label className={"check-icon--" + (rest.checked ? "checked" : indeterminate ? "indeterminate" : "unchecked")}>
        {icon && renderAssetIcon(icon)}
        <input type="checkbox" ref={resolvedRef} {...rest} className={icon ? "hidden" : ""} />
      </label>
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
  const { global_filter_placeholder, global_filter_label } = settings;
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);
  let labelText = global_filter_label || `Search:${' '}`;
  let placeholder = global_filter_placeholder || `${count} records...`;
  placeholder = placeholder.replace(/{{count}}/g, count);
  return (
    <div className="altrp-table-global-filter">
      <label htmlFor={`altrp-table-global-filter${widgetId}`} dangerouslySetInnerHTML={{ __html: labelText }} />
      <input
        id={`altrp-table-global-filter${widgetId}`}
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={placeholder}

      />
    </div>
  )
}


export default (props) => {
  props = { ...props };
  if(props.settings.choose_datasource === 'datasource'){
    let length = React.useMemo(()=>{

      return props.settings.inner_page_size > 0 ? 100 : 10;
    }, [props.settings.inner_page_size]);

    props._status = 'success';
    if(isEditor()){
      props = {...props};
      props.settings = {...props.settings};
      props.data = Array.from({length}, () => ({}));
      setAltrpIndex(props.data);
    }
    return <AltrpTableWithoutUpdate {...props}/>
  }
  return <AltrpQueryComponent {...props}><AltrpTableWithoutUpdate /></AltrpQueryComponent>
}

function DefaultCell(
  { row,
    data,
    cell, value: initialValue,
    updateData }) {
  const { column } = cell;
  const [value, setValue] = React.useState(initialValue);
  let elementTable = {}
  if (!isEditor()) {
    elementTable = useSelector(({elementTableState}) => elementTableState.elementTable)
  }
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue, cell]);
  const { column_template,
    column_is_editable,
    column_edit_url,
    column_external_link,
    column_blank_link,
    edit_disabled,
    column_cell_content_type } = column;
  let {
    _accessor,
  } = column;
  _accessor = _accessor || '';
  _accessor = _accessor.trim();
  let leftValue, rightValue;
  if(_accessor && _accessor.indexOf('?') !== -1 && _accessor.indexOf(':') !== -1){
    [leftValue, rightValue] = _accessor.split('?')[1].split(':');
    leftValue = leftValue.trim();
    rightValue = rightValue.trim();
    cell.value = cell.value ? leftValue : rightValue;
  }
  if(_accessor.indexOf('"') === 0 && _accessor[_accessor.length - 1] === '"'){
    cell.value = _accessor.substring(1, _accessor.length - 1);
  }
  const [columnTemplate, setColumnTemplate] = React.useState(null);
  const columnEditUrl =
    React.useMemo(() => {
      if (!column_is_editable || !column_edit_url) {
        return null;
      }
      return parseURLTemplate(column_edit_url, row.original);
    }, [column_edit_url, column_is_editable, row, ]);

  const fetchTemplate = React.useCallback(async () => {
    const columnTemplate = await templateLoader.loadParsedTemplate(column_template);
    setColumnTemplate(columnTemplate);
  }, [column_template]);
  // console.error(columnTemplate);

  React.useEffect(() => {
    if (column_template) {
      fetchTemplate();
    }
  }, [fetchTemplate]);
  // console.error(columnTemplate);
  let cellContent = cell.value;
  let linkTag = isEditor() ? 'a' : Link;
  if(column_external_link && ! isEditor()) {
    linkTag = 'a';
  }
  /**
   * Если значение объект или массив, то отобразим пустую строку
   */
  if (_.isObject(cell.value)) {
    cellContent = '';
  }
  /**
   * Если в настройках колонки есть url, и в данных есть id, то делаем ссылку
   */
  let href = null;
  switch (column_cell_content_type) {
    case 'email':
      cellContent = React.createElement('a', {
        href: `mailto:${cell.value}`,
        className: 'altrp-inherit altrp-table-td__default-content',
        dangerouslySetInnerHTML: {
          __html: cell.value === 0 ? '0' : (cell.value || '&nbsp;')
        }
      });
      break;

    case 'phone':
      cellContent = React.createElement('a', {
        href: `tel:${cell.value}`,
        className: 'altrp-inherit altrp-table-td__default-content',
        dangerouslySetInnerHTML: {
          __html: cell.value === 0 ? '0' : (cell.value || '&nbsp;')
        }
      });
      break;

    default:
      if (column.column_link) {
        cellContent = React.createElement(linkTag, {
          to: parseURLTemplate(column.column_link, row.original),
          href: parseURLTemplate(column.column_link, row.original),
          target: column_blank_link ? '_blank' : '',
          className: 'altrp-inherit altrp-table-td__default-content',
          dangerouslySetInnerHTML: {
            __html: cell.value === 0 ? '0' : (cell.value || '&nbsp;')
          }
        })
      } else {
        cellContent = React.createElement('span', {
          href,
          className: 'altrp-inherit altrp-table-td__default-content',
          dangerouslySetInnerHTML: {
            __html: cell.value === 0 ? '0' : (cell.value || '&nbsp;')
          }
        })
      }
      break;
  }

  const columnTemplateContent = React.useMemo(() => {
    if (! columnTemplate) {
      return null;
    }
    let columnTemplateContent = frontElementsFabric.cloneElement(columnTemplate);
    columnTemplateContent.setCardModel(new AltrpModel(row.original || {}),);
    return React.createElement(columnTemplateContent.componentClass,
      {
        element: columnTemplateContent,
        ElementWrapper: ElementWrapper,
        children: columnTemplateContent.children
      });
  }, [columnTemplate, row.original, data]);
  if (columnTemplateContent) {
    return <div className="altrp-posts"><div className="altrp-post overflow-visible">{columnTemplateContent}</div></div>;
  }

  /**
   * Отоборажаем инпут для редактирования данных
   */
  if (columnEditUrl && ! edit_disabled) {
    return <AutoUpdateInput className="altrp-inherit"
                            route={columnEditUrl}
                            resourceid={''}
                            changevalue={value => {
                              setValue(value)
                            }}
                            onBlur={(value) => {
                              updateData(row.index, _accessor, value);
                            }}
                            value={value} />;
  }
  /**
   * Если есть actions, то надо их вывести
   */
  if (_.get(cell, 'column.actions.length')) {
    return renderCellActions(cell, row, elementTable);
  }
  if (_.isString(cellContent)) {
    return cellContent;
  }
  return <>{cellContent}</>;

}
