import {generateButtonsArray, renderAssetIcon} from "../../../../../../front-app/src/js/helpers";
import PageButton from "./PageButton";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";
import PaginationComponent from "./PaginationComponent";

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
export default function Pagination(
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
  const {
    inner_page_count_options,
    inner_page_type,
    current_page_text,
    inner_page_count,
    next_icon, prev_icon,
    first_last_buttons_count,
    middle_buttons_count,
    posts_pagination_type ,
    is_with_ellipsis
  } = settings;
  let countOptions =
      React.useMemo(() => {
        let countOptions = null;
        if (inner_page_count_options) {
          countOptions = inner_page_count_options.split('\n');
          countOptions = countOptions.map(o => ({ value: Number(o), label: Number(o) }));
        }
        return countOptions
      }, [inner_page_count_options]);


  const pageText = React.useMemo(() => {
    let pageText = current_page_text || 'Current Page: {{page}}';
    pageText = pageText.replace('{{page}}', pageIndex + 1).replace('{{page_count}}', pageCount);
    console.log(inner_page_type);
    if (inner_page_type === 'pages' || posts_pagination_type === 'pages') {
      // let paginatePageCount = Number(inner_page_count) || pageCount;
      // if (paginatePageCount <= 0 || paginatePageCount > pageCount) {
      //   paginatePageCount = pageCount;
      // }
      // let array = [];
      // for (let i = 0; i < paginatePageCount; i++) {
      //   array.push(i);
      // }
      // let startIndex = (paginatePageCount === pageCount) ? 1 : (pageIndex + 1) - Math.floor(paginatePageCount / 2);
      // if (startIndex <= 0) {
      //   startIndex = 1;
      // }
      // if (startIndex + paginatePageCount > pageCount) {
      //   startIndex = pageCount - paginatePageCount + 1;
      // }
      // pageText = <div className="altrp-pagination-pages">{array.map((i, idx) => {
      //   idx += startIndex;
      //   return <button className={`altrp-pagination-pages__item ${(idx - 1 === pageIndex) ? 'active' : ''}`}
      //     key={idx}
      //     onClick={() => {
      //       gotoPage(idx - 1);
      //     }}>
      //     {idx}
      //   </button>

      // })}</div>
      return <div className="altrp-pagination-pages">
        {(pageCount > first_last_buttons_count * 2 + middle_buttons_count)
        && first_last_buttons_count && middle_buttons_count
            ? generateButtonsArray(pageIndex, pageCount, first_last_buttons_count, middle_buttons_count)
                .map((item, index) => item === "ellipsis"
                    ? is_with_ellipsis ? <div key={item + index} className="altrp-pagination__ellipsis">...</div> : <span>&nbsp;</span>
                    : <PageButton key={item} index={item} pageIndex={pageIndex} gotoPage={gotoPage} />)
            : [...Array(pageCount)].map((_, index) => <PageButton key={index} index={index} pageIndex={pageIndex} gotoPage={gotoPage} />)}
      </div>
    }
    return pageText;
  }, [current_page_text, pageIndex, pageCount, inner_page_type, inner_page_count, settings]);
  if(inner_page_type === 'none'){
    return null;
  }
  return <PaginationComponent className="altrp-pagination" settings={settings}>
    {!settings.hide_pre_page_button && <button className={"altrp-pagination__previous"}
                                               onClick={() => {
                                                 previousPage();
                                               }}
                                               disabled={pageIndex === 0}>
      <span dangerouslySetInnerHTML={{ __html: _.isString(settings.prev_text) ? settings.prev_text : 'Previous Page' }} />
      {renderAssetIcon(prev_icon)}
    </button>}
    {!settings.hide_pages_buttons_button && <div className="altrp-pagination__count">
      {pageText}
    </div>}
    {!settings.hide_next_page_button && <button className="altrp-pagination__next"
                                                onClick={() => {
                                                  nextPage()
                                                }}
                                                disabled={pageCount === pageIndex + 1}>
      <span dangerouslySetInnerHTML={{ __html: _.isString(settings.next_text) ? settings.next_text : 'Next Page' }} />
      {renderAssetIcon(next_icon)}
    </button>}
    {! settings.hide_page_input &&
    <input className="altrp-pagination__goto-page"
           type="number"
           defaultValue={pageIndex + 1}
           onChange={(e) => {
             const page = e.target.value ? Number(e.target.value) - 1 : 0;
             gotoPage(page)
           }} />}
    {! settings.hide_pagination_select && countOptions &&
    <AltrpSelect className="altrp-pagination__select-size"
      options={countOptions}
      classNamePrefix={widgetId + ' altrp-field-select2'}
      value={countOptions.find(o => o.value === pageSize)}
      isSearchable={false}
      onChange={value => {
        setPageSize(value.value)
      }} />}

  </PaginationComponent>
}
