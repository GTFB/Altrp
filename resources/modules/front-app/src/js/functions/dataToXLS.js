/**
 * Генерация и загрузка XLS-файла
 * @param {Object data} Объект данных
 * @param {String} filename Имя файла
 */
export default async function dataToXLS(data, filename = "table", templateName = "") {
  const formData = new FormData();
  formData.append("filename", filename);
  formData.append("data", JSON.stringify(data));
  formData.append("template", templateName);

  const response = await fetch("/api/export-excel", {
    method: "POST",
    body: formData
  });

  return await response.blob();
}
