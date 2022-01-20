// import * as renderResult from

// const renderResult = require('../../server/renderResult')
// import data_set from "./data_set";

const renderPageContent = (data) => {

  // console.log(renderResult);
  // console.log(global.__webpack_modules__);
  // console.log(Object.keys(require));
  // console.log(require.cache['G:\\local\\altrp.nz\\server-dist\\helpers\\renderResult.js');
  // console.log(require.resolve.paths);
  // data_set({}, 'sdf', '')
  // console.log(global.modules['']);

  return renderResult(
    data
  )
}

export default renderPageContent
