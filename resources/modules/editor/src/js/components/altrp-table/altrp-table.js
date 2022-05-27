import React, { useState, } from "react";
import {useTable, } from "react-table";
import ('../../../sass/altrp-pagination.scss');
import {
  isEditor, mbParseJSON,
  parseURLTemplate, renderAsset, replaceContentWithData
} from "../../../../../front-app/src/js/helpers";
import {iconsManager} from "../../../../../admin/src/js/helpers";
import AutoUpdateInput from "../../../../../admin/src/components/AutoUpdateInput";
import AltrpQueryComponent from "../altrp-query-component/altrp-query-component";

/**
 *
 * @param settings
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
 * @param {int} page
 * @param {[]} _latestData
 * @return {*}
 * @constructor
 */
const AltrpTable = ({settings,
                      query,
                      data,
                      currentModel,
                      _status,
                      _error,
                      setSortSettings,
                      setFilterSettings,
                      filterSetting,
                      setPage,
                      _latestData,
                      page,
                      sortSetting}) => {
  if (! (settings.tables_columns && settings.tables_columns.length)) {
    return <div children="Please Add Column"/>
  }

  const defaultSortSettings =  {};
  settings.tables_columns.forEach(column => {
    if(column.column_is_default_sorted && !defaultSortSettings.order_by){
      defaultSortSettings.order_by = column.accessor;
      defaultSortSettings.order = _.get(column, 'column_is_default_sorted_direction', 'ASC')
    }
  });
  let groupBy = React.useMemo(
      ()=> {
        return _.get(settings, 'group_by_column_name') ? _.get(settings, 'group_by_column_name') : getGroupBy(settings.tables_columns)
      }, [settings]
      );
  React.useEffect(()=>{
    if(groupBy){
      setSortSettings({
        order: 'ASC',
        order_by: groupBy,
      })
    }
  }, [groupBy]);

  let counter = query.getCounterStart(page);

  const collapsing = React.useMemo(()=>settings.group_collapsing);
  const collapsedInitiate = [];
  const [collapsedGroups, setCollapsedGroups] = React.useState(collapsedInitiate);
  const [updatedData, setUpdatedData] = useState({});
  const [doubleClicked, setDoubleClicked] =  useState({});
  const groupingStore = [];


  let columns = [];
  columns = settingsToColumns(settings);

  /**
   * обновление данных при изменении ячейки
   * @type {any[]}
   * @private
   */
  data = data.map((row)=>{
    if(row.id === updatedData.rowId){
      row[updatedData.column] = updatedData.value;
      return{...row};
    }
    return row;
  });
  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: React.useMemo(
        () => (
            columns || []
        ),
        [settings.tables_columns]
    ),
    data: React.useMemo(() => (data || []), [data]),
  }, );
  /**
   * Обработка клика для сортировки
   */
  const sortingHandler = order_by => {
    setSortSettings({
    order_by,
    order: sortSetting &&
      (sortSetting.order_by === order_by) ? (sortSetting.order === "DESC" ? "ASC" :  "DESC") : "ASC"
  });
  };
  /**
   * Изменение поля для фильтрации
   */
  const filterHandler = (filteredColumn, searchString) => {
    setPage(1);
    const filterParams = {...filterSetting};
    if(searchString){
      filterParams[filteredColumn] = searchString;
    } else {
      delete filterParams[filteredColumn];
    }
    setFilterSettings(filterParams);
  };

  return <><table className={"altrp-table altrp-table_columns-" + columns.length} {...getTableProps()}>
    <thead className="altrp-table-head">
    {renderAdditionalRows(settings)}
    {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} className="altrp-table-tr">
          {headerGroup.headers.map(column => {
            return renderTh({column, sortSetting, sortingHandler, filterSetting, filterHandler});
          }
          )}
        </tr>
    ))}
    </thead>
    <tbody {...getTableBodyProps()} className={`altrp-table-tbody ${settings.table_style_table_striple_style ? ' altrp-table-tbody--striped' : ''}`}>
    {_status === "error" ? <tr>
        <td>{_error.message}</td>
      </tr> : _status === "loading" ? <tr>
        <td>Loading</td>
      </tr>
      : rows.map((row, i) => {
          prepareRow(row);
          let rowStyles = _.get(settings, 'field_name_for_row_styling');
          rowStyles = _.get(row.original, rowStyles, '');
          rowStyles = mbParseJSON(rowStyles, {});

          return (<React.Fragment key={row.id}>
                {renderGroupingTr(row, groupBy, groupingStore, settings, collapsing, setCollapsedGroups, collapsedGroups)}
            <tr {...row.getRowProps()}
                style={rowStyles}
                className={`altrp-table-tr ${settings.table_hover_row ? 'altrp-table-background' : ''} ${
                  /**
                   * Проверка нужно ли скрыть эту строку
                   */
                    (collapsing && (collapsedGroups.indexOf(_.last(groupingStore)) !== -1)) ? 'altrp-d-none' : ''
                    }`}>
              {row.cells.map((cell, _i) => {
                let cellContent = cell.render('Cell');
                let linkTag = isEditor() ? 'a': Link;
                if(columns[_i].column_external_link && ! isEditor()) {
                  linkTag = 'a';
                }

                let style = cell.column.column_body_alignment ? { textAlign: cell.column.column_body_alignment } : {};
                const cellProps = {...cell.getCellProps()};
                let _cellContent = cell.value;

                /**
                 * Если в настройках колонки установлено редактирование и есть url запроса на редактирование
                 * то добавляем особое поведение
                 */
                let doubleClickContent = '';
                if(columns[_i].column_is_editable && columns[_i].column_edit_url){
                  let columnEditUrl = parseURLTemplate(columns[_i].column_edit_url, row.original);

                  doubleClickContent =
                      <AutoUpdateInput className="altrp-inherit altrp-table-td__double-click-content"
                                       route={columnEditUrl}
                                       resourceid={''}
                                       changevalue={(value)=>{
                                         setUpdatedData({
                                           value,
                                           rowId:row.original.id,
                                           column:columns[_i]._accessor
                                         });
                                       }}
                                       value={_cellContent}/>;
                  cellProps.onDoubleClick = () => {
                    if(doubleClicked.column === columns[_i]._accessor && doubleClicked.rowId === row.original.id){
                      setDoubleClicked({});
                    } else {
                      setDoubleClicked({
                        column: columns[_i]._accessor,
                        rowId: row.original.id,
                      });
                    }
                  };
                }
                let cellClassName = `altrp-table-td ${cell.column.column_body_alignment ? `altrp-table-td_alignment-${cell.column.column_body_alignment}` : '' } `;
                if(doubleClicked.column === columns[_i]._accessor && row.original.id === doubleClicked.rowId){
                  cellClassName += ' altrp-table-td_double-clicked';
                }
              /**
               * Если в настройках table_hover_row: false, - background для отдельной ячейки
               */
                if (!settings.table_hover_row) {
                  cellClassName += ' altrp-table-background';
                }

                /**
                 * Если значение объект или массив, то отобразим пустую строку
                 */
                if(_.isObject(cell.value)){
                  cellContent = '';
                }
                /**
                 * Если в настройках колонки есть url, и в данных есть id, то делаем ссылку
                 */
                if(columns[_i].column_link){
                  cellContent = React.createElement(linkTag, {
                    to: parseURLTemplate(columns[_i].column_link, row.original),
                    href: parseURLTemplate(columns[_i].column_link, row.original),
                    target: columns[_i].column_blank_link ? '_blank' : '',
                    className: 'altrp-inherit altrp-table-td__default-content',
                    dangerouslySetInnerHTML: {
                      __html: cell.value
                    }
                  })
                } else {
                  cellContent = React.createElement('span', {
                    className: 'altrp-inherit altrp-table-td__default-content',
                    dangerouslySetInnerHTML: {
                       __html: cell.value
                    }
                  })
                }
                /**
                 * Если нужно указать номер по порядку
                 */
                if(cell.column._accessor && (cell.column._accessor.trim() === '##')){
                  cellContent = (counter++) + '';
                }
                let cellStyles = _.get(cell, 'column.column_styles_field');
                cellStyles = _.get(row.original, cellStyles, '');
                cellStyles = mbParseJSON(cellStyles, {});

                style = _.assign(style, cellStyles);
                /**
                 * Если есть actions, то надо их вывести
                 */
                if(_.get(cell,'column.actions.length')){
                  return <td {...cellProps}
                             className={cellClassName}
                             style={style}>{renderCellActions(cell, row)}</td>
                }
                if(_.isString(cellContent) && ! doubleClickContent){
                  return <td {...cellProps}
                             className={cellClassName}
                             dangerouslySetInnerHTML={
                               {__html:cellContent + ''}
                             }
                             style={style}>
                  </td>
                }
                return <td {...cellProps}
                           className={cellClassName}
                           style={style}>
                    {cellContent}{doubleClickContent}
                  </td>
              })}
            </tr></React.Fragment>
          )
      })}
    </tbody>
    {renderFooter(settings, data)}
  </table>
    {((query.paginationType === 'prev-next') && query.pageSize) ?
      <div className="altrp-pagination">
        <button className={"altrp-pagination__previous"}
                onClick={() => {
                  setPage(old => Math.max(old - 1, 0));
                  setDoubleClicked({});
                  setUpdatedData({});
                }}
                disabled={page === 1}>
          {settings.prev_text || ''}
        </button>
        <div className="altrp-pagination__count">
          {settings.current_page_text || 'Current Page:'}
           {page}
        </div>
        <button className="altrp-pagination__next"
                onClick={() => {
                  setUpdatedData({});
                  setDoubleClicked({});
                  setPage(old => (!_latestData || !_latestData.hasMore ? old : old + 1))
                }}
                disabled={!_latestData || !_latestData.hasMore}>
          {settings.next_text || ''}

        </button>
      </div> : ''
    }
  </>
};

/**
 * Парсинг колонок из настроек в колонки для react-table
 * @param settings
 * @return {Array}
 */
export function settingsToColumns(settings) {
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
      columns.push(_column);
    }
  });
  return columns;
}

/**
 *
 * @param {{}}settings
 * @return {string|array}
 */
export function renderAdditionalRows(settings) {
  let { additional_rows } = settings;
  if(! _.isArray(additional_rows)){
    return '';
  }
  return additional_rows.map(row=>{
    row.additional_cells = row.additional_cells || [];
    return<tr key={`additional-row-${row.id}`}>
      {row.additional_cells.map(cell=>{
        cell.rowspan = cell.rowspan || 1;
        cell.colspan = cell.colspan || 1;
        return<th key={`additional-cell-${row.id}-${cell.id}`}
                  role="columnheader"
                  className="altrp-table-th altrp-table-cell"
                  colSpan={cell?.colspan || 1}
                  rowSpan={cell?.rowspan || 1}>{cell.title}</th>
      })}
    </tr>
  })
}

/**
 * Отрисовка главного заголовка колонки для таблицы
 * @param {{}}column
 * @param {{}}sortSetting
 * @param {{}}filterSetting
 * @param {function}sortingHandler
 * @param {function}filterHandler
 * @return {*}
 */
function renderTh({column, sortSetting, sortingHandler, filterSetting, filterHandler}){
  const { column_width, column_header_alignment } = column;
  let thProps = {...column.getHeaderProps()};
  const style = {};
  if (column_width) style.width = column_width;
  if (column_header_alignment) style.textAlign = column_header_alignment;
  thProps.className = 'altrp-table-th';
  if(column.column_is_sorted){
    thProps.onClick = () => sortingHandler(column._accessor);
    thProps.className += ' clickable'
  }
  if(column.column_width){
    thProps.width = column.column_width + '%';
  }
  let thText = column.render('column_name');
  return <th {...thProps} style={style}>
    {thText}
    { sortSetting && column.column_is_sorted && (sortSetting.order_by === column._accessor)
      && (sortSetting.order === "DESC" ?
        iconsManager().renderIcon('chevron', {className:'rotate-180 sort-icon '}) :
        iconsManager().renderIcon('chevron', {className: 'sort-icon'}))}
    {column.column_is_filtered &&
    <label className="altrp-label">
    <input type="text"
           onClick={e => {e.stopPropagation()}}
           onChange={e=>{
             e.stopPropagation();
             let value = e.target.value;
             filterHandler(column._accessor, value)
           }}
           value={filterSetting[column._accessor] || ''}
           className="altrp-field"/>
    </label>}

  </th>
}

/**
 * Получить поле для группировки строк
 * @param {array} columns - array({
 *  group_by:{boolean},
 *  accessor:{string},
 * })
 *
 * @return {string|null}
 */
function getGroupBy(columns){
  let groupBy = null;
  columns.forEach(column=>{
    if(column.group_by){
      groupBy = column.accessor;
    }
  });
  return groupBy;
}

/**
 * Выводит группирующую строку в таблице
 * @params {{}} row
 * @params {null|string} row
 * @params {array} groupingStore
 * @params {{}} settings
 * @params {boolean} collapsing
 * @params {function} setCollapsedGroups
 * @params {array} collapsedGroups
 * @return {string|React.Component}
 */
function renderGroupingTr(row, groupBy, groupingStore, settings = {}, collapsing, setCollapsedGroups, collapsedGroups){
  if(! groupBy){
    return null;
  }
  let text = _.get(row, 'original.' + groupBy, '');
  if(! text){
    text = _.get(settings, 'group_default_text', '');
  }
  if(groupingStore.indexOf(text) >= 0){
    return null;
  }
  groupingStore.push(text);
  let collapsed = (collapsedGroups.indexOf(text) !== -1);
  let {collapsed_icon, expanded_icon} = settings;
  /**
   * С сервера может приходить массив если иконка удалена
   */
  if(_.isArray(collapsed_icon)){
    collapsed_icon = null;
  }
  if(_.isArray(expanded_icon)){
    expanded_icon = null;
  }
  return text ? <tr className="altrp-table-tr" >
    <td colSpan={_.get(row, 'cells.length', 1)}
        onClick={()=>{
          collapsing && toggleGroup(text, setCollapsedGroups, collapsedGroups)
        }}
        className={`altrp-table-td__grouping altrp-table-td altrp-table-background ${collapsing
            ? (collapsed ? 'altrp-pointer' : 'altrp-pointer active') : ''} `}>
      {collapsing ? (<span className={`altrp-table__collapse-icon ${collapsed ? 'altrp-table__collapse-icon_collapsed' : ''}`}>{
            collapsed ? renderAsset(collapsed_icon || {
                  assetType: "icon",
                  name: "add",
                })
                : renderAsset(expanded_icon || {
                  assetType: "icon",
                  name: "minus",
                })
        }</span>
      ) : null}
      {text}
    </td>
  </tr> : null;
}

/**
 * Сохраняет/удаляет текущаю группу по заголовку из с списка схлопнутых групп в таблице
 * @param {string} currentRowHeading
 * @param {function} setCollapsedGroups - функция задает новый список collapsedGroups
 * @param {array} collapsedGroups - список заголовков, которые схлопнуты
 */
function toggleGroup(currentRowHeading, setCollapsedGroups, collapsedGroups) {

  if(collapsedGroups.indexOf(currentRowHeading) === -1){
    collapsedGroups.push(currentRowHeading);
    setCollapsedGroups([...collapsedGroups]);
  } else {
    collapsedGroups = _.filter(collapsedGroups, g=>{
      return g !== currentRowHeading;
    });
    setCollapsedGroups(collapsedGroups);
  }
}

/**
 * Отрисовка футера таблицы
 * @param {{}}settings
 * @param {array}data
 */

function renderFooter(settings, data){
  let footerColumns = settings.footer_columns || [];
  if(footerColumns.length === 0){
    return null;
  }
  return <tfoot className="altrp-table-foot">
  <tr className="altrp-table-tr">
    {footerColumns.map(footerColumn=>{
      const style = {
        textAlign: footerColumn.column_footer_alignment || 'left'
      };
      let content = footerColumn.content;
      if(content.indexOf('{{altrphelpers.') !== -1){
        window.altrphelpers.context = data;
        content = content.replace(/{{/g, '').replace(/}}/g, '');
        try{
          content = eval(content);
        } catch(e){
          console.log(content);
          console.error(e);
          content = '';
        }
      } else {
        content = replaceContentWithData(content);
      }
      return <td className="altrp-table-td"
                 key={footerColumn.id}
                 style={style}
                 colSpan={footerColumn.colspan || 1}>{content}</td>
    })}
  </tr>
  </tfoot>
}

async function ActionTableClick(e, action, elementTable) {
  e.preventDefault();
  e.stopPropagation();
  const actionsManager = (
    await import(/* webpackChunkName: 'ActionsManager' */
      "../../../../../front-app/src/js/classes/modules/ActionsManager"
      )
  ).default;
  await actionsManager.callAllWidgetActions(
    elementTable.getIdForAction(),
    'click',
    action.action__buttonactions || [],
    elementTable
  )
}
/**
 * Выводит список элементов соответствующих настройкам Actions для колнки
 * @param cell
 * @param row
 * @param elementTable
 */
export function renderCellActions(cell, row = {}, elementTable) {
  let actions = _.get(cell,'column.actions', []);
  return <div className="altrp-actions" style={{justifyContent: cell.column.column_body_alignment}}>
    {actions.map(action =>{
      let tag = action.type || "Link";
      let actionContent = replaceContentWithData(action.text || '');
      let link = parseURLTemplate(action.link, row.original);
      const actionProps = {
        className: 'altrp-actions-item altrp-link ' + (action.classes || ''),
        style: {},
        key: (action.id || '') + (row.id || ''),
        title: action.text || '',
      };
      actionProps.style.marginLeft = _.get(action, 'spacing.left')
          ? _.get(action, 'spacing.left') + _.get(action, 'spacing.unit')
          : null;
      actionProps.style.marginRight = _.get(action, 'spacing.right')
          ? _.get(action, 'spacing.right') + _.get(action, 'spacing.unit')
          : null;
      actionProps.style.marginTop = _.get(action, 'spacing.top')
          ? _.get(action, 'spacing.top') + _.get(action, 'spacing.unit')
          : null;
      actionProps.style.marginBottom = _.get(action, 'spacing.bottom')
          ? _.get(action, 'spacing.bottom') + _.get(action, 'spacing.unit')
          : null;
      if(tag === "Link"){
        tag = window.Link;
        actionProps.to = link;
      }

      if(tag === 'a' && action.target_blank){
        actionProps.target = '_blank';
      }
      if(tag === 'a') {
        actionProps.href = parseURLTemplate(action.link, row.original);
        if (action.action__buttonactions?.length && !isEditor()) {
          actionProps.onClick = (e) => ActionTableClick(e, action, elementTable)
        }
      }
      if (tag === "button") {
        if (action.action__buttonactions?.length && !isEditor()) {
          actionProps.onClick = (e) => ActionTableClick(e, action, elementTable)
        }
      }
      if(_.get(action, 'icon.assetType')){
        let iconSize = _.get(action, 'size.size') ? _.get(action, 'size.size') + _.get(action, 'size.unit', 'px') : null;
        const iconProps = {className: 'altrp-actions-item__icon',
          style:{
          }};

        if(iconSize){
          iconProps.style.width = iconSize;
          iconProps.style.height = iconSize;
        }
        actionContent = renderAsset(action.icon, iconProps)
      }
      return React.createElement(tag, actionProps, actionContent);
    })}
  </div>
}


export default (props) => {
  return <AltrpQueryComponent {...props}><AltrpTable/></AltrpQueryComponent>
}
