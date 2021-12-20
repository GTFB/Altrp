"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["Routes"],{

/***/ "./resources/modules/front-app/src/js/classes/Routes.js":
/*!**************************************************************!*\
  !*** ./resources/modules/front-app/src/js/classes/Routes.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./resources/modules/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./resources/modules/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _editor_src_js_classes_Resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../editor/src/js/classes/Resource */ "./resources/modules/editor/src/js/classes/Resource.js");
/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Route */ "./resources/modules/front-app/src/js/classes/Route.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/store */ "./resources/modules/front-app/src/js/store/store.js");
/* harmony import */ var _store_routes_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/routes/actions */ "./resources/modules/front-app/src/js/store/routes/actions.js");



function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var Routes = /*#__PURE__*/function () {
  function Routes() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Routes);

    this.resource = new _editor_src_js_classes_Resource__WEBPACK_IMPORTED_MODULE_2__["default"]({
      route: "/ajax/routes"
    });
    this.loadRoutes();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Routes, [{
    key: "loadRoutes",
    value: function loadRoutes() {
      if (window.altrpPages) {
        var routes = [];

        var _iterator = _createForOfIteratorHelper(window.altrpPages),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _data = _step.value;
            routes.push(_Route__WEBPACK_IMPORTED_MODULE_3__["default"].routeFabric(_data));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        _store_store__WEBPACK_IMPORTED_MODULE_4__["default"].dispatch((0,_store_routes_actions__WEBPACK_IMPORTED_MODULE_5__.changeAppRoutes)(routes));
        return;
      }

      this.resource.getAll().then(function (routesData) {
        var routes = [];

        var _iterator2 = _createForOfIteratorHelper(routesData.pages),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _data2 = _step2.value;
            routes.push(_Route__WEBPACK_IMPORTED_MODULE_3__["default"].routeFabric(_data2));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        _store_store__WEBPACK_IMPORTED_MODULE_4__["default"].dispatch((0,_store_routes_actions__WEBPACK_IMPORTED_MODULE_5__.changeAppRoutes)(routes));
      }).catch(function (err) {
        console.error(err);
      });
    }
  }]);

  return Routes;
}();

/* harmony default export */ __webpack_exports__["default"] = (new Routes());

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/areas/reducers.js":
/*!********************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/areas/reducers.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areasReducer": function() { return /* binding */ areasReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/areas/actions.js");

var defaultAreas = [];

if (window['h-altrp']) {
  defaultAreas = window.page_areas.map(function (a) {
    return new window.altrpHelpers.Area.areaFactory(a);
  });
}

function areasReducer(areas, action) {
  areas = areas || defaultAreas;

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.SET_AREAS:
      {
        areas = action.areas;
      }
      break;
  }

  return areas;
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/current-email-template/actions.js":
/*!************************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/current-email-template/actions.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHANGE_CURRENT_EMAIL_TEMPLATE": function() { return /* binding */ CHANGE_CURRENT_EMAIL_TEMPLATE; },
/* harmony export */   "changeCurrentEmailTemplate": function() { return /* binding */ changeCurrentEmailTemplate; }
/* harmony export */ });
var CHANGE_CURRENT_EMAIL_TEMPLATE = "CHANGE_CURRENT_EMAIL_TEMPLATE";
function changeCurrentEmailTemplate(template) {
  return {
    type: CHANGE_CURRENT_EMAIL_TEMPLATE,
    template: template
  };
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/current-email-template/reducers.js":
/*!*************************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/current-email-template/reducers.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentEmailTemplateReducer": function() { return /* binding */ currentEmailTemplateReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/current-email-template/actions.js");

var defaultTemplate = null;
function currentEmailTemplateReducer(template, action) {
  template = template || defaultTemplate;

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.CHANGE_CURRENT_EMAIL_TEMPLATE:
      {
        template = action.template;
      }
      break;
  }

  return template;
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/current-title/actions.js":
/*!***************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/current-title/actions.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHANGE_CURRENT_TITLE": function() { return /* binding */ CHANGE_CURRENT_TITLE; },
/* harmony export */   "changeCurrentTitle": function() { return /* binding */ changeCurrentTitle; }
/* harmony export */ });
var CHANGE_CURRENT_TITLE = 'CHANGE_CURRENT_TITLE';
function changeCurrentTitle(title) {
  return {
    type: CHANGE_CURRENT_TITLE,
    title: title
  };
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/current-title/reducers.js":
/*!****************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/current-title/reducers.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentTitleReducer": function() { return /* binding */ currentTitleReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/current-title/actions.js");
var _document;

if (typeof document === "undefined") {
  ({}).document = {};
}


var defaultTitle = ((_document = document) === null || _document === void 0 ? void 0 : _document.title) || "";
function currentTitleReducer(title, action) {
  title = title || defaultTitle;

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.CHANGE_CURRENT_TITLE:
      {
        title = action.title;
      }
      break;
  }

  return title;
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/forms-data-storage/reducers.js":
/*!*********************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/forms-data-storage/reducers.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formsStoreReducer": function() { return /* binding */ formsStoreReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/forms-data-storage/actions.js");

var defaultState = {};
function formsStoreReducer(state, _ref) {
  var type = _ref.type,
      formId = _ref.formId,
      fieldName = _ref.fieldName,
      value = _ref.value,
      changedField = _ref.changedField;
  state = state || defaultState;

  switch (type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.CHANGE_FORM_FIELD_VALUE:
      {
        if (_.get(state, [formId, fieldName]) !== value) {
          state = _.cloneDeep(state);
          state.changedField = changedField;

          _.set(state, [formId, fieldName], value);
        }
      }
      break;

    case _actions__WEBPACK_IMPORTED_MODULE_0__.CLEAR_FORM_FIELD_VALUE:
      {
        if (formId) {
          state = _.cloneDeep(state);

          _.set(state, [formId], {});
        } else {
          state = {};
        }
      }
      break;
  }

  return state;
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/ligtbox-images-storage/actions.js":
/*!************************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/ligtbox-images-storage/actions.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ADD_IMAGE": function() { return /* binding */ ADD_IMAGE; },
/* harmony export */   "REMOVE_IMAGE": function() { return /* binding */ REMOVE_IMAGE; },
/* harmony export */   "addImageToLightboxStorage": function() { return /* binding */ addImageToLightboxStorage; },
/* harmony export */   "removeImageFromLightbox": function() { return /* binding */ removeImageFromLightbox; }
/* harmony export */ });
var ADD_IMAGE = 'ADD_IMAGE';
var REMOVE_IMAGE = 'REMOVE_IMAGE';
/**
 *
 * @param {string} image
 * @param {string} storeName
 * @return {{type: string, image: {}, storeName:string}}
 */

var addImageToLightboxStorage = function addImageToLightboxStorage(image, storeName) {
  return {
    type: ADD_IMAGE,
    image: image,
    storeName: storeName
  };
};
/**
 *
 * @param {string} image
 * @param {string} storeName
 * @return {{type: string, image: {}, storeName:string}}
 */

var removeImageFromLightbox = function removeImageFromLightbox(image, storeName) {
  return {
    type: REMOVE_IMAGE,
    image: image,
    storeName: storeName
  };
};

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/ligtbox-images-storage/reducers.js":
/*!*************************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/ligtbox-images-storage/reducers.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lightboxImagesReducer": function() { return /* binding */ lightboxImagesReducer; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./resources/modules/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/ligtbox-images-storage/actions.js");
/* harmony import */ var dot_prop_immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dot-prop-immutable */ "./resources/modules/node_modules/dot-prop-immutable/lib/index.js");
/* harmony import */ var dot_prop_immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dot_prop_immutable__WEBPACK_IMPORTED_MODULE_2__);



var initialStore = {};
/**
 *
 * @param {{}} store
 * @param {string} type
 * @param {string} image
 * @param {string} storeName
 * @returns {{}}
 */

var lightboxImagesReducer = function lightboxImagesReducer() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStore;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      image = _ref.image,
      storeName = _ref.storeName;

  if (_.isNumber(storeName)) {
    storeName = storeName + '';
  }

  switch (type) {
    case _actions__WEBPACK_IMPORTED_MODULE_1__.ADD_IMAGE:
      {
        var lightboxImages = store[storeName] || [];

        if (!lightboxImages.find(function (i) {
          return image === i;
        })) {
          lightboxImages.push(image);
          lightboxImages = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(lightboxImages);
          store = dot_prop_immutable__WEBPACK_IMPORTED_MODULE_2___default().set(store, storeName, lightboxImages);
        }
      }
      break;

    case _actions__WEBPACK_IMPORTED_MODULE_1__.REMOVE_IMAGE:
      {
        var _lightboxImages = store[storeName] || [];

        if (_lightboxImages.find(function (i) {
          return image === i;
        })) {
          _lightboxImages = _lightboxImages.filter(function (i) {
            return image !== i;
          });
          _lightboxImages = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_lightboxImages);
          store = dot_prop_immutable__WEBPACK_IMPORTED_MODULE_2___default().set(store, storeName, _lightboxImages);
        }
      }
      break;
  }

  return store;
};

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/popup-trigger/actions.js":
/*!***************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/popup-trigger/actions.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TRIGGER_POPUP": function() { return /* binding */ TRIGGER_POPUP; },
/* harmony export */   "togglePopup": function() { return /* binding */ togglePopup; }
/* harmony export */ });
var TRIGGER_POPUP = "TRIGGER_POPUP";
var togglePopup = function togglePopup(payload) {
  return {
    type: TRIGGER_POPUP,
    payload: payload
  };
};

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/popup-trigger/reducers.js":
/*!****************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/popup-trigger/reducers.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popupReducer": function() { return /* binding */ popupReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/popup-trigger/actions.js");

var initialState = {
  popupID: null
};
var popupReducer = function popupReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.TRIGGER_POPUP:
      {
        return {
          popupID: state.popupID === payload ? null : payload
        };
      }

    default:
      return state;
  }
};

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/reducers.js":
/*!**************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/reducers.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! redux */ "./resources/modules/node_modules/redux/es/redux.js");
/* harmony import */ var _routes_reducers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/reducers */ "./resources/modules/front-app/src/js/store/routes/reducers.js");
/* harmony import */ var _current_model_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./current-model/reducers */ "./resources/modules/front-app/src/js/store/current-model/reducers.js");
/* harmony import */ var _forms_data_storage_reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forms-data-storage/reducers */ "./resources/modules/front-app/src/js/store/forms-data-storage/reducers.js");
/* harmony import */ var _current_user_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./current-user/reducers */ "./resources/modules/front-app/src/js/store/current-user/reducers.js");
/* harmony import */ var _current_data_storage_reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./current-data-storage/reducers */ "./resources/modules/front-app/src/js/store/current-data-storage/reducers.js");
/* harmony import */ var _scroll_position_reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scroll-position/reducers */ "./resources/modules/front-app/src/js/store/scroll-position/reducers.js");
/* harmony import */ var _popup_trigger_reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./popup-trigger/reducers */ "./resources/modules/front-app/src/js/store/popup-trigger/reducers.js");
/* harmony import */ var _elements_storage_reducers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elements-storage/reducers */ "./resources/modules/front-app/src/js/store/elements-storage/reducers.js");
/* harmony import */ var _hide_triggers_reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./hide-triggers/reducers */ "./resources/modules/front-app/src/js/store/hide-triggers/reducers.js");
/* harmony import */ var _responses_storage_reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./responses-storage/reducers */ "./resources/modules/front-app/src/js/store/responses-storage/reducers.js");
/* harmony import */ var _editor_src_js_store_altrp_dashboard_reducers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../editor/src/js/store/altrp-dashboard/reducers */ "./resources/modules/editor/src/js/store/altrp-dashboard/reducers.js");
/* harmony import */ var _altrp_meta_storage_reducers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./altrp-meta-storage/reducers */ "./resources/modules/front-app/src/js/store/altrp-meta-storage/reducers.js");
/* harmony import */ var _altrp_page_state_storage_reducers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./altrp-page-state-storage/reducers */ "./resources/modules/front-app/src/js/store/altrp-page-state-storage/reducers.js");
/* harmony import */ var _fonts_storage_reducers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fonts-storage/reducers */ "./resources/modules/front-app/src/js/store/fonts-storage/reducers.js");
/* harmony import */ var _user_local_storage_reducers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./user-local-storage/reducers */ "./resources/modules/front-app/src/js/store/user-local-storage/reducers.js");
/* harmony import */ var _altrp_dashboard_export_reducers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./altrp-dashboard-export/reducers */ "./resources/modules/front-app/src/js/store/altrp-dashboard-export/reducers.js");
/* harmony import */ var _media_screen_storage_reducers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./media-screen-storage/reducers */ "./resources/modules/front-app/src/js/store/media-screen-storage/reducers.js");
/* harmony import */ var _current_title_reducers__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./current-title/reducers */ "./resources/modules/front-app/src/js/store/current-title/reducers.js");
/* harmony import */ var _current_email_template_reducers__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./current-email-template/reducers */ "./resources/modules/front-app/src/js/store/current-email-template/reducers.js");
/* harmony import */ var _current_page_reducers__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./current-page/reducers */ "./resources/modules/front-app/src/js/store/current-page/reducers.js");
/* harmony import */ var _menus_storage_reducers__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./menus-storage/reducers */ "./resources/modules/front-app/src/js/store/menus-storage/reducers.js");
/* harmony import */ var _elements_settings_reducers__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./elements-settings/reducers */ "./resources/modules/front-app/src/js/store/elements-settings/reducers.js");
/* harmony import */ var _areas_reducers__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./areas/reducers */ "./resources/modules/front-app/src/js/store/areas/reducers.js");
/* harmony import */ var _ligtbox_images_storage_reducers__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./ligtbox-images-storage/reducers */ "./resources/modules/front-app/src/js/store/ligtbox-images-storage/reducers.js");

























/* harmony default export */ __webpack_exports__["default"] = ((0,redux__WEBPACK_IMPORTED_MODULE_24__.combineReducers)({
  appRoutes: _routes_reducers__WEBPACK_IMPORTED_MODULE_0__.appRoutesReducer,
  currentModel: _current_model_reducers__WEBPACK_IMPORTED_MODULE_1__.currentModelReducer,
  formsStore: _forms_data_storage_reducers__WEBPACK_IMPORTED_MODULE_2__.formsStoreReducer,
  currentUser: _current_user_reducers__WEBPACK_IMPORTED_MODULE_3__.currentUserReducer,
  currentDataStorage: _current_data_storage_reducers__WEBPACK_IMPORTED_MODULE_4__.currentDataStorageReducer,
  scrollPosition: _scroll_position_reducers__WEBPACK_IMPORTED_MODULE_5__.scrollReducer,
  popupTrigger: _popup_trigger_reducers__WEBPACK_IMPORTED_MODULE_6__.popupReducer,
  elements: _elements_storage_reducers__WEBPACK_IMPORTED_MODULE_7__.elementsStorageReducer,
  hideTriggers: _hide_triggers_reducers__WEBPACK_IMPORTED_MODULE_8__.hideTriggersReducer,
  altrpresponses: _responses_storage_reducers__WEBPACK_IMPORTED_MODULE_9__.responsesStorageReducer,
  editElement: _editor_src_js_store_altrp_dashboard_reducers__WEBPACK_IMPORTED_MODULE_10__.elementReducer,
  altrpMeta: _altrp_meta_storage_reducers__WEBPACK_IMPORTED_MODULE_11__.altrpMetaReducer,
  altrpPageState: _altrp_page_state_storage_reducers__WEBPACK_IMPORTED_MODULE_12__.altrpPageStateReducer,
  altrpFonts: _fonts_storage_reducers__WEBPACK_IMPORTED_MODULE_13__.fontsReducer,
  userLocalStorage: _user_local_storage_reducers__WEBPACK_IMPORTED_MODULE_14__.changeLocalStorageReducer,
  exportDashboard: _altrp_dashboard_export_reducers__WEBPACK_IMPORTED_MODULE_15__.exportDashboard,
  currentScreen: _media_screen_storage_reducers__WEBPACK_IMPORTED_MODULE_16__.mediaScreenReducer,
  currentTitle: _current_title_reducers__WEBPACK_IMPORTED_MODULE_17__.currentTitleReducer,
  currentEmailTemplate: _current_email_template_reducers__WEBPACK_IMPORTED_MODULE_18__.currentEmailTemplateReducer,
  altrpPage: _current_page_reducers__WEBPACK_IMPORTED_MODULE_19__.currentPageReducer,
  altrpMenus: _menus_storage_reducers__WEBPACK_IMPORTED_MODULE_20__.menusReducer,
  elementsSettings: _elements_settings_reducers__WEBPACK_IMPORTED_MODULE_21__.elementsSettingsReducer,
  areas: _areas_reducers__WEBPACK_IMPORTED_MODULE_22__.areasReducer,
  lightboxImages: _ligtbox_images_storage_reducers__WEBPACK_IMPORTED_MODULE_23__.lightboxImagesReducer
}));

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/responses-storage/reducers.js":
/*!********************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/responses-storage/reducers.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "responsesStorageReducer": function() { return /* binding */ responsesStorageReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/responses-storage/actions.js");
/* harmony import */ var _editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../editor/src/js/classes/AltrpModel */ "./resources/modules/editor/src/js/classes/AltrpModel.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers */ "./resources/modules/front-app/src/js/helpers.js");



var defaultResponsesStorage = {};
function responsesStorageReducer(responsesStorage, action) {
  responsesStorage = responsesStorage || new _editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_1__["default"](defaultResponsesStorage);

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ADD_RESPONSE_DATA:
      {
        var data = action.data;

        if (_.isArray(data)) {
          (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.setAltrpIndex)(data);
        }

        responsesStorage = _.cloneDeep(responsesStorage);
        responsesStorage.setProperty(action.formId, data);
      }
      break;

    case _actions__WEBPACK_IMPORTED_MODULE_0__.CLEAR_ALL_RESPONSE_DATA:
      {
        responsesStorage = new _editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_1__["default"]({});
      }
      break;
  }

  if (responsesStorage instanceof _editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    return responsesStorage;
  }

  return new _editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_1__["default"](responsesStorage);
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/routes/reducers.js":
/*!*********************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/routes/reducers.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appRoutesReducer": function() { return /* binding */ appRoutesReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/routes/actions.js");
/* harmony import */ var _classes_Route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/Route */ "./resources/modules/front-app/src/js/classes/Route.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var routes = [];

if (window.altrpPages) {
  var _iterator = _createForOfIteratorHelper(window.altrpPages),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _data = _step.value;
      routes.push(_classes_Route__WEBPACK_IMPORTED_MODULE_1__["default"].routeFabric(_data));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

var defaultState = {
  routes: routes
};
function appRoutesReducer(state, action) {
  state = state || defaultState;

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.CHANGE_APP_ROUTES:
      {
        state = {
          routes: action.routes
        };
      }
      break;
  }

  return state;
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/scroll-position/actions.js":
/*!*****************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/scroll-position/actions.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SET_SCROLL_TOP": function() { return /* binding */ SET_SCROLL_TOP; },
/* harmony export */   "setScrollValue": function() { return /* binding */ setScrollValue; }
/* harmony export */ });
var SET_SCROLL_TOP = "SET_SCROLL_TOP";
/**
 *
 * @param {{
 *  top: int
 * }} payload
 * @return {{type: string, payload: {}}}
 */

var setScrollValue = function setScrollValue(payload) {
  if (payload.top) {
    if (window.pageUpdater) {
      window.pageUpdater.startUpdating();
    }
  }

  return {
    type: SET_SCROLL_TOP,
    payload: payload
  };
};

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/scroll-position/reducers.js":
/*!******************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/scroll-position/reducers.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scrollReducer": function() { return /* binding */ scrollReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/scroll-position/actions.js");

var initialState = {};
var scrollReducer = function scrollReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.SET_SCROLL_TOP:
      return payload;

    default:
      return state;
  }
};

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/store.js":
/*!***********************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/store.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./resources/modules/node_modules/redux/es/redux.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducers */ "./resources/modules/front-app/src/js/store/reducers.js");

 // Grab the state from a global variable injected into the server-generated HTML

var preloadedState = window.__PRELOADED_STATE__; // Allow the passed state to be garbage-collected

delete window.__PRELOADED_STATE__;
var appStore = (0,redux__WEBPACK_IMPORTED_MODULE_1__.createStore)(_reducers__WEBPACK_IMPORTED_MODULE_0__["default"], preloadedState);
window.appStore = appStore;

if (window.ALTRP_DEBUG) {
  var _dis = appStore.dispatch;

  appStore.dispatch = function (action) {
    _dis.bind(appStore)(action);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (appStore);

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/user-local-storage/actions.js":
/*!********************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/user-local-storage/actions.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHANGE_USER_LOCAL_STORAGE": function() { return /* binding */ CHANGE_USER_LOCAL_STORAGE; },
/* harmony export */   "changeStorageData": function() { return /* binding */ changeStorageData; }
/* harmony export */ });
var CHANGE_USER_LOCAL_STORAGE = "CHANGE_USER_LOCAL_STORAGE";
function changeStorageData(user) {
  return {
    type: CHANGE_USER_LOCAL_STORAGE,
    user: user || {}
  };
}

/***/ }),

/***/ "./resources/modules/front-app/src/js/store/user-local-storage/reducers.js":
/*!*********************************************************************************!*\
  !*** ./resources/modules/front-app/src/js/store/user-local-storage/reducers.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeLocalStorageReducer": function() { return /* binding */ changeLocalStorageReducer; }
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./resources/modules/front-app/src/js/store/user-local-storage/actions.js");

var defaultLocalStorage = {
  element: "test"
};
function changeLocalStorageReducer(data, action) {
  var result = data || defaultLocalStorage;

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.CHANGE_USER_LOCAL_STORAGE:
      {
        result = data;
      }
      break;
  }

  return result;
}

/***/ })

}]);
//# sourceMappingURL=Routes.customizer.js.map