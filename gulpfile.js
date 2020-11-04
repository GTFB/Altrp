let gulp = require('gulp');
let zip = require('gulp-zip');

function altrpZip() {
  return gulp.src([
    './**/*',
    './.htaccess',
    './**/.htaccess',
    '!./app/Http/Controllers/AltrpControllers/**',
    '!./app/Http/Requests/AltrpRequests/**',
    '!./public/storage',
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
    '!./storage/app/public/**',
    '!./storage/installed',
    '!./storage/logs/**',
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
    '!./webpack.mix.js',
    '!./package.json',
    '!./package-lock.json',
    '!./.env',
    '!./.babelrc',
    '!./.env.example',
    '!./.gitattributes',
    '!./.gitignore',
    '!./.editorconfig',
    '!./.styleci.yml',
    '!./.yarn.lock',
    '!./.composer.lock',
    '!./_ide_helper.php',
    '!./.phpstorm.meta.php',
    '!./s.sql',
  ]).pipe(zip('altrp.zip'))
      .pipe(gulp.dest('../'));
}

exports.pack = altrpZip;

function altrpFTPUpload(callback){
  let client = new FTPClient();
  // console.log(fs.readFile('../altrp.zip',(file)=>{
  //
  //   callback();
  // }));
  client.on('error', err=>{
    console.error(err);
    client.end();
  });
  client.on('end', err=>{
    console.error(err);
    callback();
  });
  client.on('end', err=>{
    console.error(err);
    callback();
  });
  client.connect({
    host: '91.240.87.181',
    user: 'up.altrp.com',
    password: 'ZaMpMnBvmZdIlet3',
    port: 21,
    secure: "control",
    secureOptions: {
      rejectUnauthorized: false
    },
    connTimeout: 20000
  });
  client.put('../altrp.zip','/storage/app/products/altrp.zip', function(err) {
    // if (err) throw err;
    console.error('put');
    console.error(err);
    client.end();
  });

}

exports.ftp = altrpFTPUpload;