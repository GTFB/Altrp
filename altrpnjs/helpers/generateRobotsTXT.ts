import { writeFileSync } from 'fs';
import public_path from './public_path';
import file_exists from "./file_exists";
import env from './env'

export default async function generateRobotsTXT () {

  if(!file_exists(public_path('robots.txt'))){
    writeFileSync(public_path('robots.txt'), '');
  }

  let robotsTXT = `User-agent: *\n\r`
  robotsTXT += `Sitemap: ${env('APP_URL')}/sitemap.xml`

  writeFileSync(public_path('robots.txt'), robotsTXT);
};

