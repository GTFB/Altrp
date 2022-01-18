exports.id = 670;
exports.ids = [670];
exports.modules = {

/***/ "./resources/modules/front-app/src/js/helpers/plugins.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vIOn": () => (/* binding */ vIOn),
/* harmony export */   "loadVIPlugin": () => (/* binding */ loadVIPlugin),
/* harmony export */   "loadJQuery": () => (/* binding */ loadJQuery)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Включаем версию сайта для слабовидящих
 */
function vIOn() {
  if (document.getElementsByClassName('bvi-body').length) {
    return;
  }

  var link = document.body.appendChild(document.createElement('a'));
  link.classList.add('altrp-bvi-open');
  $.bvi({
    bvi_target: '.altrp-bvi-open'
  });
  link.click();
  link.remove();
}
/**
 * Загружаем BVI, если не заргужен
 * @param {boolean} init - нужно ли включать
 * @return {Promise<void>}
 */

function loadVIPlugin() {
  return _loadVIPlugin.apply(this, arguments);
}
/**
 * Загружаем jQuery, если не заргужен
 * @return {Promise<void>}
 */

function _loadVIPlugin() {
  _loadVIPlugin = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var init,
        bVIStyles,
        style,
        css,
        bVIScript,
        resolve,
        reject,
        promise,
        scriptsLoaded,
        loadChecker,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            init = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;
            _context.next = 3;
            return loadJQuery();

          case 3:
            if (!(document.querySelector('link[href="/plugins/button-visually-impaired-javascript/css/bvi.min.css"]') // && document.querySelector('script[src="/plugins/button-visually-impaired-javascript/js/js.cookie.min.js"]')
            // && document.querySelector('script[src="/plugins/button-visually-impaired-javascript/js/bvi-init.min.js"]')
            && document.querySelector('script[src="/plugins/button-visually-impaired-javascript/js/bvi.min.js"]'))) {
              _context.next = 6;
              break;
            }

            init && vIOn();
            return _context.abrupt("return");

          case 6:
            bVIStyles = document.head.appendChild(document.createElement('link'));
            bVIStyles.setAttribute('href', '/plugins/button-visually-impaired-javascript/css/bvi.min.css');
            bVIStyles.setAttribute('rel', 'stylesheet');
            style = document.head.appendChild(document.createElement('style'));
            style.setAttribute('type', 'text/css'); // language=CSS

            css = "\n  .bvi-body{\n    height: 100%;\n  }\n  .bvi-link-copy{\n    display: none!important;\n  }\n  .bvi-hide.admin-bar,\n  .bvi-hide.altrp-element{\n    display: flex;\n  }\n  ";

            if (style.styleSheet) {
              // This is required for IE8 and below.
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            } // const jsCookieScript = document.head.appendChild(document.createElement('script'));
            // jsCookieScript.setAttribute('src', '/plugins/button-visually-impaired-javascript/js/js.cookie.min.js');


            bVIScript = document.head.appendChild(document.createElement('script'));
            bVIScript.setAttribute('src', '/plugins/button-visually-impaired-javascript/js/bvi.min.js'); // const bVIInitScript = document.head.appendChild(document.createElement('script'));
            // bVIInitScript.setAttribute('src', '/plugins/button-visually-impaired-javascript/js/bvi-init.min.js');

            promise = new Promise(function (res, rej) {
              resolve = res;
              reject = rej;
            });
            scriptsLoaded = 0;

            loadChecker = function loadChecker() {
              if (++scriptsLoaded < 2) {
                return;
              }

              init && vIOn();
              resolve && resolve();
            };

            bVIStyles.onload = loadChecker; // jsCookieScript.onload = loadChecker;

            bVIScript.onload = loadChecker;

            bVIStyles.onerror = function () {
              reject && reject();
            }; // jsCookieScript.onerror = () => {
            //   reject && reject()
            // };
            // bVIInitScript.onerror = () => {
            //   reject && reject()
            // };


            bVIScript.onerror = function () {
              reject && reject();
            };

            return _context.abrupt("return", promise);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadVIPlugin.apply(this, arguments);
}

function loadJQuery() {
  return _loadJQuery.apply(this, arguments);
}

function _loadJQuery() {
  _loadJQuery = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {
    var jQueryScript, resolve, reject, promise;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!document.querySelector('script[src="/plugins/jquery.js"]')) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            jQueryScript = document.head.appendChild(document.createElement('script'));
            jQueryScript.setAttribute('src', '/plugins/jquery.js');
            promise = new Promise(function (res, rej) {
              resolve = res;
              reject = rej;
            });

            jQueryScript.onload = function () {
              resolve && resolve();
            };

            jQueryScript.onerror = function () {
              reject && reject();
            };

            return _context2.abrupt("return", promise);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadJQuery.apply(this, arguments);
}

/***/ })

};
;
//# sourceMappingURL=670.index.js.map