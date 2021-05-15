
export default function PageButton({ index, pageIndex, gotoPage }) {
  return <button
      className={`altrp-pagination-pages__item ${(index === pageIndex) ? 'active' : ''}`}
      onClick={() => gotoPage(index)}
  >
    {index + 1}
  </button>
}