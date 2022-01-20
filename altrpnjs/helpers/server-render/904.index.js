exports.id = 904;
exports.ids = [904];
exports.modules = {

/***/ "./resources/modules/front-app/src/js/functions/load-popups.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadPopups)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);


function loadPopups() {
  return _loadPopups.apply(this, arguments);
}

function _loadPopups() {
  _loadPopups = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var _find;

    var templates, module, ElementWrapper, FrontPopup;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!window.popupsContainer) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            templates = ((_find = (page_areas || []).find(function (area) {
              return _.get(area, 'templates');
            })) === null || _find === void 0 ? void 0 : _find.templates) || [];

            if (templates !== null && templates !== void 0 && templates.length) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            _context.next = 7;
            return frontElementsManager.loadNotUsedComponent();

          case 7:
            _context.next = 9;
            return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/front-app/src/js/components/FrontPopup.js"));

          case 9:
            module = _context.sent;
            _context.next = 12;
            return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/front-app/src/js/components/ElementWrapper.js"));

          case 12:
            ElementWrapper = _context.sent.default;
            window.popupsContainer = document.createElement('div');
            window.popupsContainer.style.position = 'relative';
            window.popupsContainer.style.zIndex = '10000000000';
            document.body.appendChild(window.popupsContainer);
            FrontPopup = module.default;
            window.ReactDOM.render( /*#__PURE__*/React.createElement(window.Provider, {
              store: window.appStore
            }, templates.map(function (template) {
              return /*#__PURE__*/React.createElement(FrontPopup, {
                key: template.id,
                ElementWrapper: ElementWrapper,
                template: template
              });
            })), window.popupsContainer);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadPopups.apply(this, arguments);
}

/***/ })

};
;
//# sourceMappingURL=904.index.js.map