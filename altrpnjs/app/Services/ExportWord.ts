import Application from '@ioc:Adonis/Core/Application';
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
} from 'docx';
import fs from 'fs';
import _ from 'lodash';

export default class ExportWord {
  static serverNameDir = '/word';
  static serverDir = Application.tmpPath(ExportWord.serverNameDir);
  doc;

  constructor(content, columns, settings) {
    const tableName = settings.name || 'table';
    // { header: "sadsa", key: "asdsadsa", width: 10 },
    if (!fs.existsSync(ExportWord.serverDir)) {
      fs.mkdirSync(ExportWord.serverDir);
    }

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            ...columns.map(
              (col) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      text: col,
                      heading: HeadingLevel.HEADING_2,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                })
            ),
          ],
        }),
        ...content.map((item) => {
          const serialized = item.serialize();
          return new TableRow({
            children: _.keys(serialized).map((key) => {
              let value = serialized[key];

              if (_.isNumber(value)) {
                value = value.toString();
              }
              return new TableCell({
                children: [
                  new Paragraph({
                    text: value,
                  }),
                ],
              });
            }),
          });
        }),
      ],
    });

    this.doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: tableName,
              heading: HeadingLevel.TITLE,
            }),
            table,
          ],
        },
      ],
    });
  }

  public export(filename) {
    Packer.toBuffer(this.doc).then((buffer) => {
      fs.writeFileSync(ExportWord.serverDir + '/' + filename + '.docx', buffer);
    });
  }
}
