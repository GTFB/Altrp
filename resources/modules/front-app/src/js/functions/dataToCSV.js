
/**
 * Создать csv-файл из данных и скачать
 * @param {{}} data
 * @param {string} filename
 */
export default async function dataToCSV(data = {}, filename) {
  filename = filename || "File";
  if (!data) {
    return { success: false };
  }
  if (_.isObject() && !_.isArray(data)) {
    data = [data];
  }
  if (!_.isArray(data)) {
    return { success: false };
  }

  let headers = _.toPairs(data[0]).map(([name, value]) => name);
  let csvContent =
    // 'data:text/csv;charset=utf-8,'
    "" +
    headers.join(";") +
    "\n" +
    data
      .map(item => {
        let line = "";
        headers.forEach((h, idx) => {
          let value = _.get(item, h) || "";
          if (_.isObject(value)) {
            value = JSON.stringify(value);
          }

          line +=
            (_.isString(value) ? value.replace(/\s/g, " ") : value) +
            (headers.length === idx + 1 ? "" : ";");
        });
        return line;
      })
      .join("\n");
  let blob = new Blob([csvContent], {
    type: "text/csv",
    charset: "windows-1251"
    // charset: 'utf-8',
  });
  let link = document.createElement("a");
  link.setAttribute("href", window.URL.createObjectURL(blob));
  link.setAttribute("download", filename + ".csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return { success: true };
}
