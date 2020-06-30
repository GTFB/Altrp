let gulp = require('gulp');
let zip = require('gulp-zip');

function altrpZip() {
  return gulp.src([
    './**/*',
    './.htaccess',
    './**/.htaccess',
    '!./public/storage',
    '!./app/AltrpModels/**',
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