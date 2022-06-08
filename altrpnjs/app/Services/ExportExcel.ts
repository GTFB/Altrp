import Application from '@ioc:Adonis/Core/Application'
import ExcelJS from "exceljs";
import fs from "fs";

export default class ExportExcel {
  static serverNameDir = "/excel";
  static serverDir = Application.tmpPath(ExportExcel.serverNameDir);
  workbook;
  worksheet;


  constructor(content, columns: string[], settings) {
    this.workbook = new ExcelJS.Workbook();

    const sheetName = settings.name || "table"

    this.worksheet = this.workbook.addWorksheet(sheetName);
    this.worksheet.columns = columns.map((value) => ({
      header: value,
      key: value,
    }))

    content.forEach(item => {
      this.worksheet.addRow(item)
    })

    // { header: "sadsa", key: "asdsadsa", width: 10 },
    if(!fs.existsSync(ExportExcel.serverDir)) {
      fs.mkdirSync(ExportExcel.serverDir)
    }

  }

  public export(filename) {
    this.workbook.xlsx.writeFile(ExportExcel.serverDir + `/${filename}.xlsx`);
  }
}
