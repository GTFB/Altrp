import getResponsiveSetting from '../getResponsiveSetting';
//@ts-ignore
export function renderTable(settings, device, context) {
  const columns = getResponsiveSetting(settings, 'tables_columns', device);
  const additionalRows = getResponsiveSetting(settings, 'additional_rows', device);
  const tableColumns = getResponsiveSetting(settings, 'tables_columns', device);

  return `
  <div class="altrp_table-zIndex" style="position: relative; overflow: hidden; width: 100%; height: auto; min-height: 0px; max-height: 30000px;">
    <div style="position: relative; overflow: scroll; margin-right: -17px; margin-bottom: -17px; min-height: 17px; max-height: 30017px;">
      <div class="altrp-table altrp-table_columns-${columns?.length}" role="table">
        <div class="altrp-table-head">
          ${additionalRows
            .map(
              (row) => `
              <tr>
                ${row.additional_cells
                  .map(
                    (cell) => `
                    <th role="columnheader" class="altrp-table-th altrp-table-cell" colspan="${row.rowspan}" rowspan="${cell.rowspan}">${cell.title}</th>
                  `
                  )
                  .join('')}
              </tr>
            `
            )
            .join('')}
          <div role="row" class="altrp-table-tr">
            ${tableColumns
              .map(
                (el) => `
              <div colspan="1" role="columnheader" class="altrp-table-th altrp-table-cell" style="text-align: ${
                el.column_header_alignment || 'center'
              }; background-color: ${el?.header_bg?.colorPickedHex};">
                <span>${el.column_name}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
        <div role="rowgroup" class="altrp-table-tbody">
          ${new Array(10)
            .fill(1)
            .map(
              () => `
            <div role="row" class="altrp-table-tr" style="opacity: 1;">
              ${
                //@ts-ignore
                tableColumns
                  .map(
                    (col, i) => `
                <div role="cell" class="altrp-table-td altrp-table-cell" ${
                  i == 0 ? 'style="text-align: center; vertical-align: top;"' : ''
                }>
                  <span class="altrp-inherit altrp-table-td__default-content">&nbsp;</span>
                </div>
              `
                  )
                  .join('')
              }
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </div>
    <div class="altrp-scroll__horizontal-track"
      style="position: absolute; height: 6px; transition: opacity 200ms ease 0s; opacity: 0;">
      <div
        style="position: relative; display: block; height: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); width: 0px;">
      </div>
    </div>
    <div class="altrp-scroll__vertical-track"
      style="position: absolute; width: 6px; transition: opacity 200ms ease 0s; opacity: 0; display: none;">
      <div
        style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); height: 0px;">
      </div>
    </div>
  </div>
  `;
}
