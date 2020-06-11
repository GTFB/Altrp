let gulp = require('gulp');
let zip = require('gulp-zip');


function altrpZip() {
  return gulp.src([
    './**/*',
    './.htaccess',
    './**/.htaccess',
    '!./public/storage',
    '!./public/storage/**',
    '!./resources/modules/**',
    '!./resources/sass/**',
    '!./resources/out/**',
    '!./.git/**',
    '!./.idea/**',
    '!./node_modules/**',
    '!./storage/app/public/**',
    '!./storage/installed',
    '!./storage/logs/**',
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
    '!./webpack.mix.js',
    '!./package.json',
    '!./package-lock.json',
    '!./.env',
    '!./.babelrc',
    '!./.env.example',
    '!./.gitattributes',
    '!./.gitignore',
    '!./.editorconfig',
  ]).pipe(zip('altrp.zip'))
      .pipe(gulp.dest('../'));
}

exports.pack = altrpZip;