const fs = require('fs');
const path = require('path')

/**
 * @class WriteChunksToFrontBlade
 */
class WriteChunksToFrontBlade {
  constructor() {
    // console.log(this);
    this.i = 0;
    this.save('');

  }

  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    // compiler.hooks.compilation.tap(
    //     'WriteChunksToBlade',
    //     (compilation, callback) => {
    //       // console.log(compilation);
    //       // console.log(callback);
    //       compilation.hooks.recordChunks.tap('afterProcessAssets', (assets, filename) => {
    //         // console.log(this.i++);
    //         // console.log(assets[0].name);
    //         // if(assets.length > 1){
    //         //   console.log(compilation
    //         //       .getAssets());
    //         // }
    //       });
    //
    //       // Manipulate the build using the plugin API provided by webpack
    //       // compilation.addModule(/* ... */);
    //
    //     }
    // );
    compiler.hooks.done.tapAsync('WriteChunksToBlade', (stats, next) => {
      const {compilation} = stats;
      let assets = compilation
          .getAssets().map(({name, source, info}) => {
            return {
              name,
              size: source.size(),
              chunks: [],
              chunkNames: [],
              info,
              emitted: source.emitted || compilation.emittedAssets.has(name)
            };

          });
      assets = assets.filter(({info}) => info.immutable);
      // assets = assets.filter(({name}) => path.extname(name) === '.css');
      assets = assets.map(asset => {
        let _as = 'script';
        if (path.extname(asset.name) === '.css') {
          _as = 'style'
        }
        return `
  <link rel="preload" as="${_as}" href="/modules/front-app/${asset.name}">`
      });
      assets = assets.join('');
      console.log(assets);
      // console.log(next);
      this.save(assets);
      return stats;
    });
  }

  /**
   *
   * @param {string} string
   */
  save(string = '') {
    fs.open('./resources/views/front-app.blade.php', function (err, fileToRead) {
      if (!err) {
        fs.readFile(fileToRead, {encoding: 'utf-8'}, function (err, data) {
          if (!err) {
            data = data.replace(/{{--preloads--}}([\s\S]*?){{--preloads--}}/, `{{--preloads--}}${string}\n  {{--preloads--}}`);
            fs.writeFile('./resources/views/front-app.blade.php', data, function (err) {
              if (err) {
                return console.log(err);
              }
              console.log('The file was saved!');
            });
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  }
}

module.exports = WriteChunksToFrontBlade;