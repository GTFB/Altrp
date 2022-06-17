/**
 * Забирает данные из HTML таблицы
 * @param {{}}HTMLElement
 */
export default function dataFromTable(HTMLElement) {
  const data = [];
  const headers = [];
  if (!(HTMLElement && HTMLElement.querySelectorAll)) {
    return data;
  }
  let table = HTMLElement.querySelector(".altrp-table");
  if (!table && HTMLElement.querySelector(".altrp-table-tr")) {
    table = HTMLElement;
  }
  if (!table) {
    return data;
  }
  const ths = table.querySelectorAll(".altrp-table-th");
  _.each(ths, th => {
    // if (th.innerText) {
    headers.push(th.innerText || "");
    // }
  });
  const rows = table.querySelectorAll(".altrp-table-tbody .altrp-table-tr");
  _.each(rows, row => {
    const cells = row.querySelectorAll(".altrp-table-td");
    const part = {};
    headers.forEach((header, idx) => {
      if (!header) {
        return;
      }
      part[header] = cells[idx].innerText || "";
    });
    data.push(part);
  });
  return data;
}
