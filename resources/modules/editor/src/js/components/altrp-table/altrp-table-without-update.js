import '../../../sass/altrp-pagination.scss';
import {isEditor, parseURLTemplate} from "../../../../../front-app/src/js/helpers";
import {Link} from "react-router-dom";
import {renderAdditionalRows, settingsToColumns} from "./altrp-table";
import {useSortBy, useTable, usePagination} from "react-table";
import AltrpQueryComponent from "../altrp-query-component/altrp-query-component";

/**
 * Компонент, который работает только с внешними данными, которые не обновляются с сервера
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
 * @param {[]} _latestData
 * @return {*}
 * @constructor
 */
function AltrpTableWithoutUpdate(
    {settings,
      query,
      data,
      currentModel,
      _status,
      _error,
      setSortSettings,
      setFilterSettings,
      filterSetting,
      _latestData,
      sortSetting}) {

  let columns = React.useMemo(()=>settingsToColumns(settings), [settings]);
  const plugins =
  React.useMemo(()=>{
    const plugins = [];
    if(settings.inner_page_size && (settings.inner_page_size >= 1)){
      plugins.push(usePagination);
    }
    return plugins;
  }, [settings]);
  console.log(plugins);
  // console.log(settings.inner_page_size);
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
    setPageSize,
  } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: 10,
      },
      ...plugins
  );
  console.log(pageOptions);
  return <>
    <table className={"altrp-table altrp-table_columns-" + columns.length} {...getTableProps()}>
      <thead className="altrp-table-head">
      {renderAdditionalRows(settings)}
      </thead>
    </table>
  </>
}

function renderPagination(){

}

export default (props) => {
  return <AltrpQueryComponent {...props}><AltrpTableWithoutUpdate/></AltrpQueryComponent>
}