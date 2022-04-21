import { writeFileSync } from 'fs';
import public_path from './public_path';
import file_exists from "./file_exists";
import generateRobotsTXT from "./generateRobotsTXT";
import Page from "App/Models/Page";

export default async function store () {

  if(!file_exists(public_path('sitemap.xml'))){
    writeFileSync(public_path('sitemap.xml'), '');
  }

  let pages = await Page.query().select('*')

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n\r`
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\r`

  pages.map(function (page) {
    xml += `<url>\n\r`
    xml += `<loc>${page.path}</loc>\n\r`
    xml += `<lastmod>${page.updatedAt}</lastmod>\n\r`
    xml += `<priority>0.5</priority>\n\r`
    xml += `</url>\n\r`
  })
  xml += `</urlset>`
  writeFileSync(public_path('sitemap.xml'), xml);

  await generateRobotsTXT()
};

