exports.id = 226;
exports.ids = [226];
exports.modules = {

/***/ "./resources/modules/front-app/src/js/helpers/sounds.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playSound": () => (/* binding */ playSound)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/modules/front-app/src/js/helpers.js");



/**
 * Воспроизведение звука
 * @param {string} src
 * @param {boolean} loop
 * @param {int} duration
 */

function playSound() {
  return _playSound.apply(this, arguments);
}

function _playSound() {
  _playSound = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var src,
        loop,
        duration,
        audioElement,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            src = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';
            loop = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            duration = _args.length > 2 && _args[2] !== undefined ? _args[2] : 0;

            if (!(!src || !_.isString(src))) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            audioElement = document.createElement('audio');
            audioElement.style.display = 'none';
            audioElement.setAttribute('src', src);
            audioElement.setAttribute('autoplay', true);

            if (loop) {
              audioElement.setAttribute('loop', loop);
            }

            document.body.appendChild(audioElement);

            if (duration) {
              (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.delay)(duration).then(function () {
                document.body.removeChild(audioElement);
              });
            } // if(! loop){
            //   document.body.removeChild(audioElement);
            // }


          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _playSound.apply(this, arguments);
}

/***/ })

};
;
//# sourceMappingURL=226.index.js.map