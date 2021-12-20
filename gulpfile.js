let gulp = require('gulp');
let zip = require('gulp-zip');
let notify = require("gulp-notify");
let path = require('path');

const excludes = [
  './**/*',
  './.htaccess',
  './**/.htaccess',
  '!./app/Http/Controllers/AltrpControllers/**',
  '!./app/Http/Requests/AltrpRequests/**',
  '!./app/Providers/AltrpProviders/AppServiceProvider.php',
  '!./app/AltrpPlugins',
  '!./app/Plugins/plugins.json',
  '!./bootstrap/cache/**',
  '!./Modules/**',
  '!./public/storage',
  '!./public/altrp-plugins',
  '!./public/favicon.ico',
  '!./out/**',
  '!./app/AltrpModels/**',
  '!./public/storage/**',
  '!./database/altrp_migrations/**',
  '!./resources/modules/**',
  '!./resources/sass/**',
  '!./resources/out/**',
  '!./.git/**',
  '!./.idea/**',
  '!./node_modules/**',
  '!./routes/AltrpRoutes.php',
  '!./routes/AltrpApiRoutes.php',
  '!./routes/AltrpCustomRoutes.php',
  '!./routes/page_routes.php',
  '!./storage/app/public/**',
  '!./storage/installed',
  '!./storage/logs/**',
  '!./storage/tmp/**',
  '!./storage/framework/cache/**',
  '!./storage/framework/sessions/**',
  '!./tests/**',
  '!./gulpfile.js',
  '!./webpack.admin.common.js',
  '!./webpack.admin.dev.js',
  '!./webpack.admin.prod.js',
  '!./webpack.editor.common.js',
  '!./webpack.editor.dev.js',
  '!./webpack.editor.prod.js',
  '!./webpack.front.common.js',
  '!./webpack.front.dev.js',
  '!./webpack.front.prod.js',
  '!./webpack.reports.common.js',
  '!./webpack.reports.dev.js',
  '!./webpack.reports.prod.js',
  '!./webpack.mix.js',
  '!./package-lock.json',
  '!./.env',
  '!./.babelrc',
  '!./.env',
  '!./.gitattributes',
  '!./.gitignore',
  '!./.editorconfig',
  '!./.styleci.yml',
  '!./.yarn.lock',
  '!./yarn.lock',
  '!./.composer.lock',
  '!./_ide_helper.php',
  '!./.phpstorm.meta.php',
  '!./s.sql',
  '!./WriteChunksToFrontBlade.js',
];

function altrpZip(filename = 'altrp.zip') {
  return gulp.src(excludes).pipe(zip(filename))
      .pipe(gulp.dest('../'))
      .pipe(notify({
        message:'Архив готов',
        sound: true,
        title: 'Altrp'
      }));
}

exports.pack = ()=>{return altrpZip()};
exports.packTest = ()=>{return altrpZip('altrp-test.zip')};

