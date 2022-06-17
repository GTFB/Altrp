/**
 * Генерация и загрузка XML-файла
 * @param {Object data} Объект данных
 * @param {String} filename Имя файла
 */
export default async function dataToXML(data, filename = "table") {
  const formData = new FormData();
  formData.append("filename", filename);
  formData.append("data", JSON.stringify(data));

  const response = await fetch("/api/export-xml", {
    method: "POST",
    body: formData
  });

  return await response.blob();
}
