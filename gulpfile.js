let gulp = require('gulp');
let zip = require('gulp-zip');
let notify = require("gulp-notify");
let path = require('path');
let fs = require('fs');
let uuid = require('uuid')

const excludes = [
  './**/*',
  './.htaccess',
  './**/.htaccess',
  '!./app/Http/Controllers/AltrpControllers/**',
  '!./app/Http/Requests/AltrpRequests/**',
  '!./app/Providers/AltrpProviders/AppServiceProvider.php',
  '!./app/AltrpPlugins/**',
  '!./app/Plugins/plugins.json',
  '!./bootstrap/cache/**',
  '!./Modules/**',
  '!./server/**',
  '!./public/storage',
  '!./public/altrp-plugins',
  '!./public/favicon.ico',
  '!./out/**',
  '!./app/AltrpModels/**',
  '!./altrpnjs/**',
  '!./public/storage/**',
  '!./public/altrp-plugins/**',
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
  '!./webpack.server.js',
  '!./webpack.server-adonis.js',
  '!./webpack.customizer.common.js',
  '!./webpack.customizer.dev.js',
  '!./webpack.customizer.prod.js',
  '!./webpack.robots.common.js',
  '!./webpack.robots.dev.js',
  '!./webpack.robots.prod.js',
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

/**
 *
 * @param filename
 * @returns {*}
 */
function altrpZip(filename = 'altrp.zip') {
  return gulp.src(excludes)
    .pipe(zip(filename))
    .pipe(gulp.dest('../'))
    .pipe(notify({
      message: 'Архив готов',
      sound: true,
      title: 'Altrp'
    }));
}

function altrpJSZip() {
  let filename = 'altrp-js.zip'
  return gulp.src([
    './altrpnjs/build/**/*',
    '!./altrpnjs/build/app/AltrpModels/**/*',
    '!./altrpnjs/build/app/AltrpControllers/**/*',
    '!./altrpnjs/build/public/altrp-plugins/**/*',
    '!./altrpnjs/build/public/app/media/**/*',
    '!./altrpnjs/build/public/robots.txt',
    '!./altrpnjs/build/public/sitemap.xml',
    '!./altrpnjs/build/resources/views/altrp/**/*',
    '!./altrpnjs/build/start/routes/custom/**/*',
  ], {dot: true,}).pipe(zip(filename))
    .pipe(gulp.dest('../'))
    .pipe(notify({
      message: 'Архив готов',
      sound: true,
      title: 'Altrp JS'
    }))

}

// function copyPublicToAdonis(cb) {
//   console.log(cb);
//   gulp.src([
//       './public/**/*',
//       '!./public/storage/**',
//       '!./public/altrp-plugins/**',
//       '!./public/.htaccess',
//       '!./public/*.php',
//       '!./public/web.config',
//       '!./public/mix-manifest.json',
//     ]).pipe(gulp.dest('./altrpnjs/build/public'))
//
//     gulp.src([
//       './altrpnjs/config/file-types.json'
//     ]).pipe(gulp.dest('./altrpnjs/build/config'))
//   return gulp.src([
//     './README.md'
//   ]).pipe(gulp.dest('./altrpnjs/build/'))
// }
const copyPublicToAdonis = gulp.parallel(
  cb=>{
    return gulp.src([
      './public/**/*',
      '!./public/storage/**',
      '!./public/altrp-plugins/**',
      '!./public/.htaccess',
      '!./public/*.php',
      '!./public/web.config',
      '!./public/mix-manifest.json',
    ]).pipe(gulp.dest('./altrpnjs/build/public'))
  },
  cb=>{
    return gulp.src([
      './altrpnjs/config/file-types.json'
    ]).pipe(gulp.dest('./altrpnjs/build/config'))
  },
  cb=>{
    return gulp.src([
    './CHANGELOG.md',
    './CHANGELOG.md',
  ]).pipe(gulp.dest('./altrpnjs/build/'))
  },
  cb=>{
    return gulp.src([
    './altrpnjs/public/css/creative-link.css',
    './altrpnjs/public/css/regular.min.css',
    './altrpnjs/public/css/solid.min.css',
    './altrpnjs/public/css/fontawesome.min.css',
  ]).pipe(gulp.dest('./altrpnjs/build/public/css/'))
  },
  cb=>{
    return gulp.src([
    './altrpnjs/public/modules/editor/editor.css'
  ]).pipe(gulp.dest('./altrpnjs/build/public/modules/editor/'))
  },
  cb=>{
    return gulp.src([
    './altrpnjs/app/altrp-templates/styles/**/*'
  ]).pipe(gulp.dest('./altrpnjs/build/app/altrp-templates/styles'))
  },
  cb=>{
    fs.writeFileSync('./altrpnjs/build/.package_key', uuid())
    cb()
  },
);
async function clearJSBuild() {
  const _p = __dirname + `${path.sep}altrpnjs${path.sep}build`
  if (fs.existsSync(_p)) {
    return fs.unlinkSync(_p)
  }
  return 0
}

exports.pack = () => {
  return altrpZip()
};
exports.packTest = () => {
  return altrpZip('altrp-test.zip')
};
// exports.clearJSBuild = clearJSBuild

// exports.packJS = ()=>{return altrpJSZip()};
exports.packJS = gulp.series(copyPublicToAdonis, altrpJSZip);
  exports.altrpJSZip = () => {
  return altrpJSZip()
};
