exports.id = 961;
exports.ids = [961];
exports.modules = {

/***/ "./resources/modules/front-app/src/js/classes/Routes.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_src_js_classes_Resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/modules/editor/src/js/classes/Resource.js");
/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/modules/front-app/src/js/classes/Route.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/modules/front-app/src/js/store/store.js");
/* harmony import */ var _store_routes_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/modules/front-app/src/js/store/routes/actions.js");



function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var Routes = /*#__PURE__*/function () {
  function Routes() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Routes);

    this.resource = new _editor_src_js_classes_Resource__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z({
      route: "/ajax/routes"
    });
    this.loadRoutes();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Routes, [{
    key: "loadRoutes",
    value: function loadRoutes() {
      if (window.altrpPages) {
        var routes = [];

        var _iterator = _createForOfIteratorHelper(window.altrpPages),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _data = _step.value;
            routes.push(_Route__WEBPACK_IMPORTED_MODULE_3__/* .default.routeFabric */ .Z.routeFabric(_data));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        _store_store__WEBPACK_IMPORTED_MODULE_4__/* .default.dispatch */ .Z.dispatch((0,_store_routes_actions__WEBPACK_IMPORTED_MODULE_5__/* .changeAppRoutes */ .S)(routes));
        return;
      }

      this.resource.getAll().then(function (routesData) {
        var routes = [];

        var _iterator2 = _createForOfIteratorHelper(routesData.pages),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _data2 = _step2.value;
            routes.push(_Route__WEBPACK_IMPORTED_MODULE_3__/* .default.routeFabric */ .Z.routeFabric(_data2));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        _store_store__WEBPACK_IMPORTED_MODULE_4__/* .default.dispatch */ .Z.dispatch((0,_store_routes_actions__WEBPACK_IMPORTED_MODULE_5__/* .changeAppRoutes */ .S)(routes));
      }).catch(function (err) {
        console.error(err);
      });
    }
  }]);

  return Routes;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Routes());

/***/ })

};
;
//# sourceMappingURL=961.index.js.map