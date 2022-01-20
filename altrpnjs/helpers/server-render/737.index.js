exports.id = 737;
exports.ids = [737];
exports.modules = {

/***/ "./resources/modules/front-app/src/js/classes/AltrpAction.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./resources/modules/editor/src/js/classes/AltrpModel.js");
/* harmony import */ var _store_popup_trigger_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./resources/modules/front-app/src/js/store/popup-trigger/actions.js");
/* harmony import */ var _helpers_sendEmail__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./resources/modules/front-app/src/js/helpers/sendEmail.js");
/* harmony import */ var _store_current_model_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./resources/modules/front-app/src/js/store/current-model/actions.js");









function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var _window$altrpHelpers = window.altrpHelpers,
    altrpLogin = _window$altrpHelpers.altrpLogin,
    altrpLogout = _window$altrpHelpers.altrpLogout,
    dataFromTable = _window$altrpHelpers.dataFromTable,
    dataToCSV = _window$altrpHelpers.dataToCSV,
    dataToXML = _window$altrpHelpers.dataToXML,
    elementsToPdf = _window$altrpHelpers.elementsToPdf,
    getAppContext = _window$altrpHelpers.getAppContext,
    getComponentByElementId = _window$altrpHelpers.getComponentByElementId,
    getHTMLElementById = _window$altrpHelpers.getHTMLElementById,
    parseParamsFromString = _window$altrpHelpers.parseParamsFromString,
    getDataByPath = _window$altrpHelpers.getDataByPath,
    printElements = _window$altrpHelpers.printElements,
    replaceContentWithData = _window$altrpHelpers.replaceContentWithData,
    scrollToElement = _window$altrpHelpers.scrollToElement,
    setDataByPath = _window$altrpHelpers.setDataByPath,
    dataToXLS = _window$altrpHelpers.dataToXLS,
    delay = _window$altrpHelpers.delay,
    altrpCompare = _window$altrpHelpers.altrpCompare,
    Resource = _window$altrpHelpers.Resource,
    getWrapperHTMLElementByElement = _window$altrpHelpers.getWrapperHTMLElementByElement; // let  history = require('history');
// // import {history} from 'history';
// console.log(history.history);

/**
 * Класс представляющий действия на странице
 * @link https://docs.google.com/document/d/1v8Hm1DLkqqwzBeISd8-UvgTqscVxQPtBUtKqBrH1HaU/edit#
 * @class AltrpAction
 */

var AltrpAction = /*#__PURE__*/function (_AltrpModel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(AltrpAction, _AltrpModel);

  var _super = _createSuper(AltrpAction);

  function AltrpAction(data, widgetId, element) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, AltrpAction);

    _this = _super.call(this, data);

    _this.setProperty('_widgetId', widgetId);

    _this.setProperty('_element', element);

    _this.init();

    return _this;
  }
  /**
   * Получить id элемента
   * @return {string}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(AltrpAction, [{
    key: "getElementId",
    value: function getElementId() {
      return this.getProperty('_element').getId();
    }
    /**
     * Получить id для регистрации формы
     * @return {string}
     */

  }, {
    key: "getFormId",
    value: function getFormId() {
      var formId = this.getProperty('form_id');

      if (!formId) {
        return formId;
      }

      if (formId.indexOf('{{') !== -1) {
        formId = replaceContentWithData(formId, this.getCurrentModel().getData());
      }

      return formId;
    }
    /**
     * Получить URL формы
     * @return {string}
     */

  }, {
    key: "getFormURL",
    value: function getFormURL() {
      var formURL = this.getProperty('form_url');

      if (!formURL) {
        return formURL;
      }

      if (formURL.indexOf('{{') !== -1) {
        formURL = replaceContentWithData(formURL, this.getCurrentModel().getData());
      }

      return formURL;
    }
    /**
     * Получить компонент обертки для элемента
     * @return {{}}
     */

  }, {
    key: "getWrapperComponent",
    value: function getWrapperComponent() {
      return getComponentByElementId(this.getElementId());
    }
    /**
     * Получить экземпляр элемента
     * @return {FrontElement | null}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.getProperty('_element');
    }
    /**
     * Получить экземпляр текущей модели страницы или карточки
     * @return {AltrpModel | null}
     */

  }, {
    key: "getCurrentModel",
    value: function getCurrentModel() {
      var element = this.getElement();
      return element.getCurrentModel();
    }
    /**
     * Возврашает значение свойства name, если свойство строка, то производит подстановку значений из данных
     * @params {string} name
     * @params {*} defaultValue
     * @return {*}
     */

  }, {
    key: "getReplacedProperty",
    value: function getReplacedProperty(name) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var value = this.getProperty(name, defaultValue);

      if (_.isString(value)) {
        value = replaceContentWithData(value, this.getCurrentModel().getData());
      }

      return value;
    }
    /**
     * Инициируем действие
     */

  }, {
    key: "init",
    value: function () {
      var _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee() {
        var form;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = this.getType();
                _context.next = _context.t0 === 'form' ? 3 : _context.t0 === 'login' ? 7 : 9;
                break;

              case 3:
                if (this.getFormURL()) {
                  _context.next = 6;
                  break;
                }

                this.setProperty('_form', null);
                return _context.abrupt("return");

              case 6:
                return _context.abrupt("return");

              case 7:
                form = formsManager.registerForm(this.getFormId(), 'login', 'POST');
                this.setProperty('_form', form);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
    /**
     * Получить тип действия
     * @return {string}
     */

  }, {
    key: "getType",
    value: function getType() {
      return this.getProperty('type');
    }
    /**
     * Получить тип действия
     * @return {*}
     */

  }, {
    key: "setType",
    value: function setType(type) {
      return this.setProperty('type', type);
    }
    /**
     * Оссинхронно выполняет действие
     * @return {Promise<void>}
     */

  }, {
    key: "doAction",
    value: function () {
      var _doAction = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee2() {
        var result, confirmText, alertText;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                result = {
                  success: false
                };
                confirmText = this.getProperty('confirm');
                confirmText = replaceContentWithData(confirmText, this.getCurrentModel().getData());

                if (!(confirmText && !confirm(confirmText))) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", {
                  success: false,
                  message: 'User not Confirm'
                });

              case 5:
                _context2.t0 = this.getType();
                _context2.next = _context2.t0 === 'form' ? 8 : _context2.t0 === 'delay' ? 12 : _context2.t0 === 'email' ? 16 : _context2.t0 === 'redirect' ? 20 : _context2.t0 === 'toggle_element' ? 24 : _context2.t0 === 'toggle_popup' ? 28 : _context2.t0 === 'print_page' ? 32 : _context2.t0 === 'print_elements' ? 36 : _context2.t0 === 'scroll_to_element' ? 40 : _context2.t0 === 'scroll_to_top' ? 44 : _context2.t0 === 'scroll_to_bottom' ? 48 : _context2.t0 === 'trigger' ? 52 : _context2.t0 === 'page_to_pdf' ? 56 : _context2.t0 === 'elements_to_pdf' ? 60 : _context2.t0 === 'data_to_csv' ? 64 : _context2.t0 === 'table_to_csv' ? 68 : _context2.t0 === 'table_to_xml' ? 72 : _context2.t0 === 'table_to_xls' ? 76 : _context2.t0 === 'login' ? 80 : _context2.t0 === 'logout' ? 84 : _context2.t0 === 'set_data' ? 88 : _context2.t0 === 'update_current_datasources' ? 92 : _context2.t0 === 'update_current_model' ? 96 : _context2.t0 === 'forms_manipulate' ? 100 : _context2.t0 === 'custom_code' ? 104 : _context2.t0 === 'play_sound' ? 108 : _context2.t0 === 'condition' ? 112 : _context2.t0 === 'vi_toggle' ? 116 : _context2.t0 === 'oauth' ? 120 : 124;
                break;

              case 8:
                _context2.next = 10;
                return this.doActionForm();

              case 10:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 12:
                _context2.next = 14;
                return this.doActionDelay();

              case 14:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 16:
                _context2.next = 18;
                return this.doActionEmail();

              case 18:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 20:
                _context2.next = 22;
                return this.doActionRedirect();

              case 22:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 24:
                _context2.next = 26;
                return this.doActionToggleElements();

              case 26:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 28:
                _context2.next = 30;
                return this.doActionTogglePopup();

              case 30:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 32:
                _context2.next = 34;
                return this.doActionPrintPage();

              case 34:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 36:
                _context2.next = 38;
                return this.doActionPrintElements();

              case 38:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 40:
                _context2.next = 42;
                return this.doActionScrollToElement();

              case 42:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 44:
                _context2.next = 46;
                return this.doActionScrollToTop();

              case 46:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 48:
                _context2.next = 50;
                return this.doActionScrollToBottom();

              case 50:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 52:
                _context2.next = 54;
                return this.doActionTrigger();

              case 54:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 56:
                _context2.next = 58;
                return this.doActionPageToPDF();

              case 58:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 60:
                _context2.next = 62;
                return this.doActionElementsToPDF();

              case 62:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 64:
                _context2.next = 66;
                return this.doActionDataToCSV();

              case 66:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 68:
                _context2.next = 70;
                return this.doActionTableToCSV();

              case 70:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 72:
                _context2.next = 74;
                return this.doActionTableToXML();

              case 74:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 76:
                _context2.next = 78;
                return this.doActionTableToXLS();

              case 78:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 80:
                _context2.next = 82;
                return this.doActionLogin();

              case 82:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 84:
                _context2.next = 86;
                return this.doActionLogout();

              case 86:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 88:
                _context2.next = 90;
                return this.doActionSetData();

              case 90:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 92:
                _context2.next = 94;
                return this.doActionUpdateCurrentDatasources();

              case 94:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 96:
                _context2.next = 98;
                return this.doActionUpdateCurrentModel();

              case 98:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 100:
                _context2.next = 102;
                return this.doActionFormsManipulate();

              case 102:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 104:
                _context2.next = 106;
                return this.doActionCustomCode();

              case 106:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 108:
                _context2.next = 110;
                return this.doActionPlaySound();

              case 110:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 112:
                _context2.next = 114;
                return this.doActionCondition();

              case 114:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 116:
                _context2.next = 118;
                return this.doActionVIToggle();

              case 118:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 120:
                _context2.next = 122;
                return this.doActionOAuth();

              case 122:
                result = _context2.sent;
                return _context2.abrupt("break", 124);

              case 124:
                alertText = '';

                if (result.success) {
                  alertText = this.getProperty('alert');
                } else {
                  alertText = this.getProperty('reject');
                }

                if (alertText) {
                  alertText = replaceContentWithData(alertText, this.getCurrentModel().getData());
                  alert(alertText);
                }

                return _context2.abrupt("return", result);

              case 128:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function doAction() {
        return _doAction.apply(this, arguments);
      }

      return doAction;
    }()
    /**
     * Ассинхронно выполняет действие-формы
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionForm",
    value: function () {
      var _doActionForm = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee4() {
        var _this2 = this;

        var formsManager, data, customHeaders, bulk, _form, bulkRequests, res, _data, formOptions, form, result, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/editor/src/js/classes/modules/FormsManager.js"));

              case 2:
                formsManager = _context4.sent.default;
                data = null;
                customHeaders = null;

                if (this.getProperty('custom_headers')) {
                  customHeaders = parseParamsFromString(this.getProperty('custom_headers'), this.getCurrentModel());
                }

                if (this.getProperty('data')) {
                  data = parseParamsFromString(this.getProperty('data'), getAppContext(this.getCurrentModel()), true); // if (!_.isEmpty(data)) {
                  //   return form.submit('', '', data);
                  // }
                  // return { success: true };
                }

                if (!this.getProperty('forms_bulk')) {
                  _context4.next = 26;
                  break;
                }

                if (!(_.isArray(getDataByPath(this.getProperty('bulk_path'))) && _.get(getDataByPath(this.getProperty('bulk_path')), 'length'))) {
                  _context4.next = 25;
                  break;
                }

                bulk = getDataByPath(this.getProperty('bulk_path'));
                /**
                 * Для получение данных с полей формы, нужно создать форму и вызвать метод getData
                 * @type {AltrpForm}
                 */

                _form = formsManager.registerForm(this.getFormId(), '', this.getProperty('form_method'), {
                  customRoute: ''
                });
                data = _.assign(_form.getData(), data);
                bulkRequests = bulk.map( /*#__PURE__*/function () {
                  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee3(item, idx) {
                    var url, form;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (_this2.getProperty('data')) {
                              data = parseParamsFromString(_this2.getProperty('data'), getAppContext(item), true);
                            }

                            url = _this2.getProperty('form_url');
                            url = replaceContentWithData(url, item);
                            form = formsManager.registerForm(_this2.getFormId() + idx, '', _this2.getProperty('form_method'), {
                              customRoute: url
                            });
                            _context3.next = 6;
                            return form.submit('', '', data, customHeaders);

                          case 6:
                            return _context3.abrupt("return", _context3.sent);

                          case 7:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context4.prev = 13;
                _context4.next = 16;
                return Promise.all(bulkRequests);

              case 16:
                res = _context4.sent;
                _context4.next = 24;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](13);
                console.error(_context4.t0);
                bulk.forEach(function (item, idx) {
                  formsManager.deleteFormById(_this2.getFormId() + idx);
                });
                return _context4.abrupt("return", {
                  success: false
                });

              case 24:
                bulk.forEach(function (item, idx) {
                  formsManager.deleteFormById(_this2.getFormId() + idx);
                });

              case 25:
                return _context4.abrupt("return", {
                  success: true
                });

              case 26:
                if (this.getProperty('path')) {
                  _data = getDataByPath(this.getProperty('path'), {});

                  if (!_.isEmpty(_data)) {
                    data = _.assign(_data, data);
                  }
                }
                /**
                 *
                 * @type {AltrpForm}
                 */
                // let form = this.getProperty('_form');


                if (this.getFormURL()) {
                  _context4.next = 30;
                  break;
                }

                this.setProperty('_form', null);
                return _context4.abrupt("return", {
                  success: false
                });

              case 30:
                formOptions = {
                  dynamicURL: true,
                  customRoute: this.getFormURL()
                };
                form = formsManager.registerForm(this.getFormId(), '', this.getProperty('form_method'), formOptions);
                result = {
                  success: true
                };
                _context4.prev = 33;
                _context4.next = 36;
                return form.submit('', '', data, customHeaders);

              case 36:
                response = _context4.sent;
                result = _.assign(result, response);
                _context4.next = 45;
                break;

              case 40:
                _context4.prev = 40;
                _context4.t1 = _context4["catch"](33);
                console.error(_context4.t1);
                result.error = _context4.t1;
                result.success = false;

              case 45:
                return _context4.abrupt("return", result);

              case 46:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[13, 19], [33, 40]]);
      }));

      function doActionForm() {
        return _doActionForm.apply(this, arguments);
      }

      return doActionForm;
    }()
    /**
     * Делает редирект на страницу form_url
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionRedirect",
    value: function () {
      var _doActionRedirect = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee5() {
        var URL, innerRedirect;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                URL = this.getFormURL();

                if (URL) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", {
                  success: true
                });

              case 3:
                if (window.frontAppRouter) {
                  if (this.getProperty('back')) {
                    frontAppRouter.history.goBack();
                  } else {
                    innerRedirect = !this.getProperty('outer');

                    if (innerRedirect) {
                      frontAppRouter.history.push(URL);
                    } else {
                      window.location.assign(URL);
                    }
                  }
                } else {
                  if (this.getProperty('back')) {
                    history.back();
                  } else {
                    window.location.href = URL;
                  }
                }

                return _context5.abrupt("return", {
                  success: true
                });

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function doActionRedirect() {
        return _doActionRedirect.apply(this, arguments);
      }

      return doActionRedirect;
    }()
    /**
     * Показывает/скрывает элементы по пользовательским ИД
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionToggleElements",
    value: function () {
      var _doActionToggleElements = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee6() {
        var IDs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                IDs = this.getProperty('elements_ids');

                if (IDs) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", {
                  success: true
                });

              case 3:
                IDs = IDs.split(',');
                IDs.forEach(function (id) {
                  var component = getComponentByElementId(id);

                  if (!component && !component.toggleElementDisplay) {
                    return;
                  }

                  component.toggleElementDisplay();
                });
                return _context6.abrupt("return", {
                  success: true
                });

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function doActionToggleElements() {
        return _doActionToggleElements.apply(this, arguments);
      }

      return doActionToggleElements;
    }()
    /**
     * Показывает/скрывает попап
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionTogglePopup",
    value: function () {
      var _doActionTogglePopup = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee7() {
        var id, loadPopups;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = this.getProperty('popup_id');

                if (id) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", {
                  success: true
                });

              case 3:
                if (!window['h-altrp']) {
                  _context7.next = 9;
                  break;
                }

                _context7.next = 6;
                return __webpack_require__.e(/* import() | load-popups */ 904).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/front-app/src/js/functions/load-popups.js"));

              case 6:
                loadPopups = _context7.sent.default;
                _context7.next = 9;
                return loadPopups();

              case 9:
                appStore.dispatch((0,_store_popup_trigger_actions__WEBPACK_IMPORTED_MODULE_11__/* .togglePopup */ .z)(id));
                return _context7.abrupt("return", {
                  success: true
                });

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function doActionTogglePopup() {
        return _doActionTogglePopup.apply(this, arguments);
      }

      return doActionTogglePopup;
    }()
    /**
     * Печать страницы
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionPrintPage",
    value: function () {
      var _doActionPrintPage = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee8() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                window.print();
                return _context8.abrupt("return", {
                  success: true
                });

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function doActionPrintPage() {
        return _doActionPrintPage.apply(this, arguments);
      }

      return doActionPrintPage;
    }()
    /**
     * Печать элементов
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionPrintElements",
    value: function () {
      var _doActionPrintElements = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee9() {
        var IDs, elementsToPrint;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                IDs = this.getProperty('elements_ids');

                if (IDs) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt("return", {
                  success: true
                });

              case 3:
                IDs = IDs.split(',');
                elementsToPrint = [];
                IDs.forEach(function (elementId) {
                  var _getComponentByElemen;

                  if (!elementId || !elementId.trim()) {
                    return;
                  }

                  getHTMLElementById(elementId.trim()) && elementsToPrint.push(getHTMLElementById(elementId));

                  if ((_getComponentByElemen = getComponentByElementId(elementId.trim())) !== null && _getComponentByElemen !== void 0 && _getComponentByElemen.getStylesHTMLElement) {
                    var stylesElement = getComponentByElementId(elementId.trim()).getStylesHTMLElement();

                    if (stylesElement) {
                      elementsToPrint.push(stylesElement);
                    }
                  }
                });

                if (_.get(window, 'stylesModule.stylesContainer.current')) {
                  elementsToPrint.push(_.get(window, 'stylesModule.stylesContainer.current'));
                }

                elementsToPrint.push(document.head);
                printElements(elementsToPrint);
                return _context9.abrupt("return", {
                  success: true
                });

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function doActionPrintElements() {
        return _doActionPrintElements.apply(this, arguments);
      }

      return doActionPrintElements;
    }()
    /**
     * Скролл к элементу
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionScrollToElement",
    value: function () {
      var _doActionScrollToElement = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee10() {
        var elementId, element, scroller;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                elementId = this.getProperty('element_id');

                if (elementId) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt("return", {
                  success: true
                });

              case 3:
                elementId = elementId.trim();
                element = getHTMLElementById(elementId);
                scroller = window.mainScrollbars;

                if (!scroller) {
                  scroller = document.querySelector('.front-app-content');
                }

                if (!scroller) {
                  scroller = window;
                }

                if (element) {
                  scrollToElement(scroller, element);
                }

                return _context10.abrupt("return", {
                  success: true
                });

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function doActionScrollToElement() {
        return _doActionScrollToElement.apply(this, arguments);
      }

      return doActionScrollToElement;
    }()
    /**
     * Скролл на верх страницы
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionScrollToTop",
    value: function () {
      var _doActionScrollToTop = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee11() {
        var scroller;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!window.mainScrollbars) {
                  _context11.next = 3;
                  break;
                }

                window.mainScrollbars.scrollTop(0);
                return _context11.abrupt("return", {
                  success: true
                });

              case 3:
                scroller = document.querySelector('.front-app-content');

                if (!scroller) {
                  scroller = window;
                }

                scroller.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
                return _context11.abrupt("return", {
                  success: true
                });

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function doActionScrollToTop() {
        return _doActionScrollToTop.apply(this, arguments);
      }

      return doActionScrollToTop;
    }()
    /**
     * Скролл на верх страницы
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionScrollToBottom",
    value: function () {
      var _doActionScrollToBottom = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee12() {
        var routeContent, scroller;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                routeContent = document.getElementById('route-content');

                if (routeContent) {
                  _context12.next = 3;
                  break;
                }

                return _context12.abrupt("return", {
                  success: true
                });

              case 3:
                if (!window.mainScrollbars) {
                  _context12.next = 6;
                  break;
                }

                window.mainScrollbars.scrollTop(routeContent.offsetHeight);
                return _context12.abrupt("return", {
                  success: true
                });

              case 6:
                scroller = document.querySelector('.front-app-content');

                if (!scroller) {
                  scroller = window;
                }

                scroller.scrollTo({
                  left: 0,
                  top: document.querySelector('.route-content').offsetHeight,
                  behavior: 'smooth'
                });
                return _context12.abrupt("return", {
                  success: true
                });

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function doActionScrollToBottom() {
        return _doActionScrollToBottom.apply(this, arguments);
      }

      return doActionScrollToBottom;
    }()
    /**
     * Страницу в PDF
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionPageToPDF",
    value: function () {
      var _doActionPageToPDF = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee13() {
        var filename, elements;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                elements = [];
                elements.push(document.getElementById('route-content'));
                _context13.next = 5;
                return elementsToPdf(elements, filename);

              case 5:
                return _context13.abrupt("return", _context13.sent);

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function doActionPageToPDF() {
        return _doActionPageToPDF.apply(this, arguments);
      }

      return doActionPageToPDF;
    }()
    /**
     * Элементы в PDF
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionElementsToPDF",
    value: function () {
      var _doActionElementsToPDF = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee14() {
        var filename, elements, IDs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                elements = [];
                IDs = this.getProperty('elements_ids');

                if (IDs) {
                  _context14.next = 5;
                  break;
                }

                return _context14.abrupt("return", {
                  success: true
                });

              case 5:
                IDs = IDs.split(',');
                IDs.forEach(function (elementId) {
                  if (!elementId || !elementId.trim()) {
                    return;
                  }

                  getHTMLElementById(elementId.trim()) && elements.push(getHTMLElementById(elementId));
                });
                _context14.next = 9;
                return elementsToPdf(elements, filename);

              case 9:
                return _context14.abrupt("return", _context14.sent);

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function doActionElementsToPDF() {
        return _doActionElementsToPDF.apply(this, arguments);
      }

      return doActionElementsToPDF;
    }()
    /**
     * Данные в CSV-файл
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionDataToCSV",
    value: function () {
      var _doActionDataToCSV = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee15() {
        var data, filename;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                data = getDataByPath(this.getProperty('path'));
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                _context15.prev = 2;
                _context15.next = 5;
                return dataToCSV(data, filename);

              case 5:
                return _context15.abrupt("return", _context15.sent);

              case 8:
                _context15.prev = 8;
                _context15.t0 = _context15["catch"](2);
                console.error(_context15.t0);
                return _context15.abrupt("return", {
                  success: false
                });

              case 12:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[2, 8]]);
      }));

      function doActionDataToCSV() {
        return _doActionDataToCSV.apply(this, arguments);
      }

      return doActionDataToCSV;
    }()
    /**
     * HTML-Таблицу в CSV-файл
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionTableToCSV",
    value: function () {
      var _doActionTableToCSV = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee16() {
        var elementId, element, data, filename;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                elementId = this.getProperty('element_id');

                if (elementId) {
                  _context16.next = 3;
                  break;
                }

                return _context16.abrupt("return", {
                  success: true
                });

              case 3:
                elementId = elementId.trim();
                element = getHTMLElementById(elementId);

                if (element) {
                  _context16.next = 7;
                  break;
                }

                return _context16.abrupt("return", {
                  success: true
                });

              case 7:
                _context16.prev = 7;
                data = dataFromTable(element);
                _context16.next = 15;
                break;

              case 11:
                _context16.prev = 11;
                _context16.t0 = _context16["catch"](7);
                console.error(_context16.t0);
                return _context16.abrupt("return", {
                  success: false
                });

              case 15:
                if (!_.isEmpty(data)) {
                  _context16.next = 17;
                  break;
                }

                return _context16.abrupt("return", {
                  success: true
                });

              case 17:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                _context16.prev = 18;
                _context16.next = 21;
                return dataToCSV(data, filename);

              case 21:
                return _context16.abrupt("return", _context16.sent);

              case 24:
                _context16.prev = 24;
                _context16.t1 = _context16["catch"](18);
                console.error(_context16.t1);
                return _context16.abrupt("return", {
                  success: false
                });

              case 28:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[7, 11], [18, 24]]);
      }));

      function doActionTableToCSV() {
        return _doActionTableToCSV.apply(this, arguments);
      }

      return doActionTableToCSV;
    }()
    /**
     * HTML-Таблицу в XML-файл
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionTableToXML",
    value: function () {
      var _doActionTableToXML = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee17() {
        var elementId, element, data, filename;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                elementId = this.getProperty('element_id');

                if (elementId) {
                  _context17.next = 3;
                  break;
                }

                return _context17.abrupt("return", {
                  success: true
                });

              case 3:
                elementId = elementId.trim();
                element = getHTMLElementById(elementId);

                if (element) {
                  _context17.next = 7;
                  break;
                }

                return _context17.abrupt("return", {
                  success: true
                });

              case 7:
                _context17.prev = 7;
                data = dataFromTable(element);
                _context17.next = 15;
                break;

              case 11:
                _context17.prev = 11;
                _context17.t0 = _context17["catch"](7);
                console.error(_context17.t0);
                return _context17.abrupt("return", {
                  success: false
                });

              case 15:
                if (!_.isEmpty(data)) {
                  _context17.next = 17;
                  break;
                }

                return _context17.abrupt("return", {
                  success: true
                });

              case 17:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                _context17.prev = 18;
                _context17.next = 21;
                return dataToXML(data, filename);

              case 21:
                return _context17.abrupt("return", _context17.sent);

              case 24:
                _context17.prev = 24;
                _context17.t1 = _context17["catch"](18);
                console.error(_context17.t1);
                return _context17.abrupt("return", {
                  success: false
                });

              case 28:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[7, 11], [18, 24]]);
      }));

      function doActionTableToXML() {
        return _doActionTableToXML.apply(this, arguments);
      }

      return doActionTableToXML;
    }()
    /**
     * HTML-таблицу в XLS-файл
     * @return {Promise}
     */

  }, {
    key: "doActionTableToXLS",
    value: function () {
      var _doActionTableToXLS = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee18() {
        var data, all_sources_path, elementId, table, formattedData, rawTemplateData, parsedTemplateData, filename, templateName, blob, link;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                data = [];

                if (!this.getProperty('all_sources')) {
                  _context18.next = 7;
                  break;
                }

                all_sources_path = this.getProperty('all_sources_path');
                if (all_sources_path) data = getDataByPath(all_sources_path, {});
                data = {
                  data: data
                };
                _context18.next = 20;
                break;

              case 7:
                elementId = this.getProperty('element_id').trim();

                if (elementId) {
                  _context18.next = 11;
                  break;
                }

                console.error('Element ID is not set');
                return _context18.abrupt("return", {
                  success: true
                });

              case 11:
                table = getHTMLElementById(elementId);

                if (table) {
                  _context18.next = 15;
                  break;
                }

                console.error('Table with provided ID is not found');
                return _context18.abrupt("return", {
                  success: true
                });

              case 15:
                data = dataFromTable(table);
                formattedData = [];

                _.each(data, function (row) {
                  return formattedData.push(Object.values(row));
                });

                rawTemplateData = this.getProperty('template_data');

                if (rawTemplateData) {
                  parsedTemplateData = rawTemplateData.split('\n').reduce(function (data, row) {
                    var keyValuePair = row.split('=');
                    data[keyValuePair[0]] = keyValuePair[1];
                    return data;
                  }, {});
                  data = _objectSpread(_objectSpread({}, parsedTemplateData), {}, {
                    data: formattedData
                  });
                } else {
                  data = {
                    data: data
                  };
                }

              case 20:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                templateName = this.getProperty('template_name');
                _context18.prev = 22;
                _context18.next = 25;
                return dataToXLS(data, filename, templateName);

              case 25:
                blob = _context18.sent;
                link = document.createElement('a');
                link.setAttribute('href', window.URL.createObjectURL(blob));
                link.setAttribute('download', filename + '.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return _context18.abrupt("return", {
                  success: true
                });

              case 35:
                _context18.prev = 35;
                _context18.t0 = _context18["catch"](22);
                console.error(_context18.t0);
                return _context18.abrupt("return", {
                  success: false
                });

              case 39:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[22, 35]]);
      }));

      function doActionTableToXLS() {
        return _doActionTableToXLS.apply(this, arguments);
      }

      return doActionTableToXLS;
    }()
    /**
     * действие-логин
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionLogin",
    value: function () {
      var _doActionLogin = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee19() {
        var form, success;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                /**
                 *
                 * @member {AltrpForm} form
                 */
                form = this.getProperty('_form');
                success = true;
                form.fields.forEach(function (field) {
                  if (!field.fieldValidate()) {
                    success = false;
                  }
                });

                if (success) {
                  _context19.next = 5;
                  break;
                }

                return _context19.abrupt("return", {
                  success: false
                });

              case 5:
                _context19.next = 7;
                return altrpLogin(form.getData(), this.getFormId());

              case 7:
                return _context19.abrupt("return", _context19.sent);

              case 8:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function doActionLogin() {
        return _doActionLogin.apply(this, arguments);
      }

      return doActionLogin;
    }()
    /**
     * действие-выход из приложения
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionLogout",
    value: function () {
      var _doActionLogout = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee20() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return altrpLogout();

              case 2:
                return _context20.abrupt("return", _context20.sent);

              case 3:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      function doActionLogout() {
        return _doActionLogout.apply(this, arguments);
      }

      return doActionLogout;
    }()
    /**
     * действие-установка значения по для пути `path`
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionSetData",
    value: function () {
      var _doActionSetData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee21() {
        var _this3 = this;

        var paths, result, _iterator, _step, path, value, setType, count, currentValue, nextIndex, _currentValue, _currentValue2, _currentValue3, item, items;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                paths = this.getProperty('path');
                result = {
                  success: true
                };

                if (paths) {
                  _context21.next = 4;
                  break;
                }

                return _context21.abrupt("return", result);

              case 4:
                if (paths.indexOf(',') !== -1) {
                  paths = paths.split(',').map(function (path) {
                    return path.trim();
                  });
                } else {
                  paths = [paths];
                }

                _iterator = _createForOfIteratorHelper(paths);
                _context21.prev = 6;

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context21.next = 60;
                  break;
                }

                path = _step.value;
                path = replaceContentWithData(path, this.getCurrentModel().getData());
                value = this.getProperty('value') || '';
                value = value.trim();
                setType = this.getProperty('set_type');
                count = this.getProperty('count');
                _context21.t0 = setType;
                _context21.next = _context21.t0 === 'toggle' ? 18 : _context21.t0 === 'set' ? 21 : _context21.t0 === 'toggle_set' ? 24 : _context21.t0 === 'increment' ? 32 : _context21.t0 === 'decrement' ? 38 : _context21.t0 === 'push_items' ? 44 : _context21.t0 === 'remove_items' ? 54 : 58;
                break;

              case 18:
                value = !getDataByPath(path);
                result.success = setDataByPath(path, value);
                return _context21.abrupt("break", 58);

              case 21:
                if (value.split(/\r?\n/).length === 1 && value.indexOf('{{') === 0 && value.indexOf('}}') === value.length - 2) {
                  value = getDataByPath(value.replace('{{', '').replace('}}', ''), null, this.getCurrentModel());
                } else if (value.indexOf('|') !== -1) {
                  value = parseParamsFromString(value, this.getCurrentModel(), true);
                }

                result.success = setDataByPath(path, value);
                return _context21.abrupt("break", 58);

              case 24:
                currentValue = getDataByPath(path);
                value = value.split('\n').map(function (v) {
                  return v.trim();
                });

                if (value.length === 1) {
                  value.push('');
                }

                nextIndex = value.indexOf(currentValue) + 1;

                if (nextIndex >= value.length) {
                  nextIndex = 0;
                }

                value = value[nextIndex] || '';
                result.success = setDataByPath(path, value);
                return _context21.abrupt("break", 58);

              case 32:
                _currentValue = getDataByPath(path);
                _currentValue = _currentValue ? _.isNaN(Number(_currentValue)) ? 1 : Number(_currentValue) : Number(!!_currentValue);
                count = Number(count) || 1;
                _currentValue += count;
                result.success = setDataByPath(path, _currentValue);
                return _context21.abrupt("break", 58);

              case 38:
                _currentValue2 = getDataByPath(path);
                _currentValue2 = _currentValue2 ? _.isNaN(Number(_currentValue2)) ? 1 : Number(_currentValue2) : Number(!!_currentValue2);
                count = Number(count) || 1;
                _currentValue2 -= count;
                result.success = setDataByPath(path, _currentValue2);
                return _context21.abrupt("break", 58);

              case 44:
                _currentValue3 = getDataByPath(path);
                item = {};

                if (!_.isArray(_currentValue3)) {
                  _currentValue3 = [];
                }

                _currentValue3 = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(_currentValue3);

                if (_.isObject(getDataByPath(value))) {
                  item = getDataByPath(value);
                }

                count = Number(count) || 1;

                if (count < 0) {
                  count = 1;
                }

                while (count) {
                  _.isArray(item) ? _currentValue3.push(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(item)) : _currentValue3.push(_objectSpread({}, item));
                  --count;
                }

                result.success = setDataByPath(path, _currentValue3);
                return _context21.abrupt("break", 58);

              case 54:
                items = path.split(/\r?\n/);
                items.forEach(function (i) {
                  if (!i) {
                    return;
                  }

                  i = i.trim();

                  if (!i) {
                    return;
                  }

                  if (i.indexOf('{{') !== -1) {
                    i = replaceContentWithData(i, _this3.getCurrentModel().getData());
                  }

                  var item = getDataByPath(i);

                  if (!item) {
                    return;
                  }

                  var listPath = i.replace(/.\d+$/, '').trim();

                  if (!listPath) {
                    return;
                  }

                  var list = getDataByPath(listPath);

                  if (!_.isArray(list)) {
                    return;
                  }

                  list = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(list);
                  list = list.filter(function (_item) {
                    return _item !== item;
                  });
                  setDataByPath(listPath, list);
                });
                result.success = true;
                return _context21.abrupt("break", 58);

              case 58:
                _context21.next = 8;
                break;

              case 60:
                _context21.next = 65;
                break;

              case 62:
                _context21.prev = 62;
                _context21.t1 = _context21["catch"](6);

                _iterator.e(_context21.t1);

              case 65:
                _context21.prev = 65;

                _iterator.f();

                return _context21.finish(65);

              case 68:
                return _context21.abrupt("return", result);

              case 69:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this, [[6, 62, 65, 68]]);
      }));

      function doActionSetData() {
        return _doActionSetData.apply(this, arguments);
      }

      return doActionSetData;
    }()
    /**
     * действие - манипуляция с элементами форм
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionFormsManipulate",
    value: function doActionFormsManipulate() {
      var IDs = this.getProperty('elements_ids');

      if (!IDs) {
        return {
          success: true
        };
      }

      IDs = IDs.split(',');
      var change = this.getProperty('forms_change');
      IDs.forEach(function (id) {
        var component = getComponentByElementId(id);

        switch (change) {
          case 'select_all':
            {
              if (_.get(component, 'elementRef.current.selectAll')) {
                component.elementRef.current.selectAll();
              }
            }
            break;

          case 'clear':
            {
              if (_.get(component, 'elementRef.current.clearValue')) {
                component.elementRef.current.clearValue();
              }
            }
            break;
        }
      });
      return {
        success: true
      };
    }
    /**
     * действие - выполнение пользовательского кода
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionCustomCode",
    value: function () {
      var _doActionCustomCode = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee22() {
        var code;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                code = this.getProperty('code');
                _context22.prev = 1;
                code = replaceContentWithData(code, this.getCurrentModel().getData());
                eval(code);
                return _context22.abrupt("return", {
                  success: true
                });

              case 7:
                _context22.prev = 7;
                _context22.t0 = _context22["catch"](1);
                console.error('Evaluate error in doActionCustomCode: "' + _context22.t0.message + '"');
                return _context22.abrupt("return", {
                  success: false
                });

              case 11:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this, [[1, 7]]);
      }));

      function doActionCustomCode() {
        return _doActionCustomCode.apply(this, arguments);
      }

      return doActionCustomCode;
    }()
    /**
     * Действие - обновление текущей модели по AJAX
     * Action - updating the current model via AJAX
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionUpdateCurrentModel",
    value: function () {
      var _doActionUpdateCurrentModel = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee23() {
        var _window, _window$currentPage, _window2, _window2$model_data;

        var modelName, modelId, model, oldModel;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                modelName = (_window = window) === null || _window === void 0 ? void 0 : (_window$currentPage = _window.currentPage) === null || _window$currentPage === void 0 ? void 0 : _window$currentPage.model_name;

                if (modelName) {
                  _context23.next = 3;
                  break;
                }

                return _context23.abrupt("return", {
                  success: true
                });

              case 3:
                modelId = (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$model_data = _window2.model_data) === null || _window2$model_data === void 0 ? void 0 : _window2$model_data.id;

                if (modelId) {
                  _context23.next = 6;
                  break;
                }

                return _context23.abrupt("return", {
                  success: true
                });

              case 6:
                _context23.prev = 6;
                _context23.next = 9;
                return new Resource({
                  route: "/ajax/models/".concat(modelName)
                }).get(modelId);

              case 9:
                model = _context23.sent;

                if (_.isObject(model.data)) {
                  model = model.data;
                }

                oldModel = window.appStore.getState().currentModel.getData();
                model.altrpModelUpdated = true;

                if (!_.isEqual(model, oldModel)) {
                  appStore.dispatch((0,_store_current_model_actions__WEBPACK_IMPORTED_MODULE_12__/* .changeCurrentModel */ .D)({
                    altrpModelUpdated: false
                  }));
                  appStore.dispatch((0,_store_current_model_actions__WEBPACK_IMPORTED_MODULE_12__/* .changeCurrentModel */ .D)(model));
                }

                return _context23.abrupt("return", {
                  success: true
                });

              case 17:
                _context23.prev = 17;
                _context23.t0 = _context23["catch"](6);
                console.error(_context23.t0);

              case 20:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, null, [[6, 17]]);
      }));

      function doActionUpdateCurrentModel() {
        return _doActionUpdateCurrentModel.apply(this, arguments);
      }

      return doActionUpdateCurrentModel;
    }()
    /**
     * действие - обновление текущего хранилища
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionUpdateCurrentDatasources",
    value: function () {
      var _doActionUpdateCurrentDatasources = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee24() {
        var aliases, allDataSources, dataSourcesToUpdate;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                aliases = this.getProperty('aliases') || '';
                aliases = aliases.split(',').map(function (alias) {
                  return alias.trim();
                }).filter(function (alias) {
                  return alias;
                });
                allDataSources = window.dataStorageUpdater.getProperty('currentDataSources');
                dataSourcesToUpdate = allDataSources.filter(function (dataSource) {
                  return aliases.indexOf(dataSource.getProperty('alias')) !== -1;
                });
                /**
                 * @type {DataStorageUpdater}
                 */

                _context24.next = 6;
                return window.dataStorageUpdater.updateCurrent(dataSourcesToUpdate, false);

              case 6:
                return _context24.abrupt("return", {
                  success: true
                });

              case 7:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function doActionUpdateCurrentDatasources() {
        return _doActionUpdateCurrentDatasources.apply(this, arguments);
      }

      return doActionUpdateCurrentDatasources;
    }()
    /**
     * Триггер события на другом компоненте
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionTrigger",
    value: function () {
      var _doActionTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee25() {
        var elementId, element, action, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                elementId = this.getProperty('element_id');
                element = getComponentByElementId(elementId);
                action = this.getProperty('action');

                if (!_.isFunction(element[action])) {
                  _context25.next = 6;
                  break;
                }

                element[action]();
                return _context25.abrupt("return", {
                  success: true
                });

              case 6:
                _context25.prev = 6;

                if (!_.isFunction(element.elementRef.current[action])) {
                  _context25.next = 14;
                  break;
                }

                _context25.next = 10;
                return element.elementRef.current[action]();

              case 10:
                result = _context25.sent;

                if (!_.isObject(result)) {
                  _context25.next = 13;
                  break;
                }

                return _context25.abrupt("return", result);

              case 13:
                return _context25.abrupt("return", {
                  success: true
                });

              case 14:
                element.elementRef.current.fireAction(action);
                return _context25.abrupt("return", {
                  success: true
                });

              case 18:
                _context25.prev = 18;
                _context25.t0 = _context25["catch"](6);
                console.error(_context25.t0);
                return _context25.abrupt("return", {
                  success: false
                });

              case 22:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this, [[6, 18]]);
      }));

      function doActionTrigger() {
        return _doActionTrigger.apply(this, arguments);
      }

      return doActionTrigger;
    }()
    /**
     * Отправка почты
     */

  }, {
    key: "doActionEmail",
    value: function () {
      var _doActionEmail = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee26() {
        var templateGUID, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                templateGUID = this.getProperty('email_template');

                if (templateGUID) {
                  _context26.next = 3;
                  break;
                }

                return _context26.abrupt("return", {
                  success: true
                });

              case 3:
                res = {
                  success: false
                };
                _context26.prev = 4;
                _context26.next = 7;
                return (0,_helpers_sendEmail__WEBPACK_IMPORTED_MODULE_10__/* .sendEmail */ .C)(templateGUID, this.getReplacedProperty('subject'), this.getReplacedProperty('from'), this.getReplacedProperty('to'), this.getReplacedProperty('attachments'));

              case 7:
                res = _context26.sent;
                _context26.next = 14;
                break;

              case 10:
                _context26.prev = 10;
                _context26.t0 = _context26["catch"](4);
                console.error(_context26.t0);
                return _context26.abrupt("return", {
                  success: false
                });

              case 14:
                return _context26.abrupt("return", res);

              case 15:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this, [[4, 10]]);
      }));

      function doActionEmail() {
        return _doActionEmail.apply(this, arguments);
      }

      return doActionEmail;
    }()
    /**
     * Добавляем временную задержку в милисекундах
     */

  }, {
    key: "doActionDelay",
    value: function () {
      var _doActionDelay = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee27() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return delay(this.getProperty('milliseconds') || 0);

              case 2:
                return _context27.abrupt("return", {
                  success: true
                });

              case 3:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function doActionDelay() {
        return _doActionDelay.apply(this, arguments);
      }

      return doActionDelay;
    }()
    /**
     * Воспроизводим звук
     * @return {Promise<{success: boolean}>}
     */

  }, {
    key: "doActionPlaySound",
    value: function () {
      var _doActionPlaySound = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee28() {
        var duration, url, loop, _yield$import, playSound;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                duration = this.getProperty('milliseconds') || 0;
                url = this.getProperty('media_url');
                loop = this.getProperty('loop');

                if (!url) {
                  _context28.next = 11;
                  break;
                }

                _context28.next = 6;
                return __webpack_require__.e(/* import() | helpers-sounds */ 226).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/front-app/src/js/helpers/sounds.js"));

              case 6:
                _yield$import = _context28.sent;
                playSound = _yield$import.playSound;
                playSound(url, loop, duration);
                _context28.next = 11;
                return delay(20);

              case 11:
                return _context28.abrupt("return", {
                  success: true
                });

              case 12:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function doActionPlaySound() {
        return _doActionPlaySound.apply(this, arguments);
      }

      return doActionPlaySound;
    }()
    /**
     * Проверка условий
     * @return {Promise<{success: boolean}>}
     */

  }, {
    key: "doActionCondition",
    value: function () {
      var _doActionCondition = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee29() {
        var compare, conditionLeft, conditionRight, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                compare = this.getProperty('compare');
                conditionLeft = this.getProperty('condition_left');
                conditionRight = this.getProperty('condition_right');
                conditionLeft = getDataByPath(conditionLeft, null, this.getCurrentModel().getData());
                conditionRight = replaceContentWithData(conditionRight, this.getCurrentModel().getData());
                res = altrpCompare(conditionLeft, conditionRight, compare);
                return _context29.abrupt("return", {
                  success: res
                });

              case 7:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function doActionCondition() {
        return _doActionCondition.apply(this, arguments);
      }

      return doActionCondition;
    }()
    /**
     * Версия сайта для слабовидящих
     * @return {Promise<void>}
     */

  }, {
    key: "doActionVIToggle",
    value: function () {
      var _doActionVIToggle = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee30() {
        var _yield$import2, loadVIPlugin, HTMLWrapper;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.prev = 0;
                _context30.next = 3;
                return __webpack_require__.e(/* import() */ 670).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/front-app/src/js/helpers/plugins.js"));

              case 3:
                _yield$import2 = _context30.sent;
                loadVIPlugin = _yield$import2.loadVIPlugin;
                _context30.next = 7;
                return loadVIPlugin();

              case 7:
                _context30.next = 12;
                break;

              case 9:
                _context30.prev = 9;
                _context30.t0 = _context30["catch"](0);
                return _context30.abrupt("return", {
                  success: false
                });

              case 12:
                // console.log($);
                HTMLWrapper = getWrapperHTMLElementByElement(this.getElement()); // if(HTMLWrapper){
                //   HTMLWrapper.classList.add('bvi-hide');
                // }
                // $.bvi({
                //   bvi_target: '.altrp-btn',
                //
                // });

                return _context30.abrupt("return", {
                  success: true
                });

              case 14:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this, [[0, 9]]);
      }));

      function doActionVIToggle() {
        return _doActionVIToggle.apply(this, arguments);
      }

      return doActionVIToggle;
    }()
    /**
     *
     * @returns {Promise<void>}
     */

  }, {
    key: "doActionOAuth",
    value: function () {
      var _doActionOAuth = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee31() {
        var OIDC, WebStorageStateStore, UserManager, authority, OidcClient, method, settings, _manager, manager, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return __webpack_require__.e(/* import() | OIDC */ 29).then(__webpack_require__.t.bind(__webpack_require__, "./node_modules/oidc-client/lib/oidc-client.min.js", 23));

              case 2:
                OIDC = _context31.sent;
                WebStorageStateStore = OIDC.WebStorageStateStore, UserManager = OIDC.UserManager, authority = OIDC.authority, OidcClient = OIDC.OidcClient;
                (window.altrpLibs = window.altrpLibs || {}).OIDC = OIDC;
                method = this.getProperty('method');

                if (method) {
                  _context31.next = 8;
                  break;
                }

                return _context31.abrupt("return", {
                  success: true
                });

              case 8:
                settings = {
                  client_id: 'AisOrder',
                  redirect_uri: "http://zayavka.geobuilder.ru/login/laravelpassport/callback",
                  post_logout_redirect_uri: "http://zayavka.geobuilder.ru/login/laravelpassport/callback",
                  response_type: 'token id_token',
                  scope: 'openid profile',
                  authority: 'https://fs.geobuilder.ru/idp',
                  automaticSilentRenew: false,
                  userStore: new WebStorageStateStore({
                    store: window.localStorage
                  }),
                  filterProtocolClaims: true,
                  loadUserInfo: true,
                  monitorSession: false,
                  checkSessionInterval: 3600000
                };
                _manager = new UserManager(settings);
                console.log(_manager);
                settings = {
                  client_id: this.getProperty('client_id'),
                  redirect_uri: this.getProperty('redirect_uri'),
                  post_logout_redirect_uri: this.getProperty('post_logout_redirect_uri'),
                  response_type: this.getProperty('response_type'),
                  scope: this.getProperty('scope'),
                  authority: this.getProperty('authority'),
                  automaticSilentRenew: this.getProperty('automaticSilentRenew'),
                  userStore: new WebStorageStateStore({
                    store: window.localStorage
                  }),
                  filterProtocolClaims: this.getProperty('filterProtocolClaims'),
                  loadUserInfo: this.getProperty('loadUserInfo'),
                  monitorSession: this.getProperty('monitorSession'),
                  checkSessionInterval: this.getProperty('checkSessionInterval')
                };
                manager = new UserManager(settings); // console.log( manager);
                // console.log(await manager.getUser());

                console.log(method);

                if (!_.isFunction(manager[method])) {
                  _context31.next = 24;
                  break;
                }

                _context31.prev = 15;
                _context31.next = 18;
                return manager[method]();

              case 18:
                result = _context31.sent;
                _context31.next = 24;
                break;

              case 21:
                _context31.prev = 21;
                _context31.t0 = _context31["catch"](15);
                return _context31.abrupt("return", {
                  success: false
                });

              case 24:
                console.log(result); // await manager.signoutRedirect();

                return _context31.abrupt("return", {
                  success: true
                });

              case 26:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this, [[15, 21]]);
      }));

      function doActionOAuth() {
        return _doActionOAuth.apply(this, arguments);
      }

      return doActionOAuth;
    }()
  }]);

  return AltrpAction;
}(_editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_9__/* .default */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AltrpAction);

/***/ }),

/***/ "./resources/modules/front-app/src/js/classes/modules/ActionsManager.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _AltrpAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./resources/modules/front-app/src/js/classes/AltrpAction.js");
/* harmony import */ var _editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./resources/modules/editor/src/js/classes/AltrpModel.js");








function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @class ActionsManager
 * Класс хранит действия для виджетов и вызывает их последовательно в порядке полученного списка
 * @member {} data - где хранятся действия виджета сгруппированные по типу события {
 *  widgetId:{
 *    eventName: []
 *  }
 * }
 */


var isEditor = window.altrpHelpers.isEditor;

var ActionsManager = /*#__PURE__*/function (_AltrpModel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ActionsManager, _AltrpModel);

  var _super = _createSuper(ActionsManager);

  function ActionsManager() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ActionsManager);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ActionsManager, [{
    key: "registerWidgetActions",
    value:
    /**
     * Регистрирует действия для определенного виджета
     * @param {string} widgetId
     * @param {array} actions
     * @param {string} eventName
     * @param {FrontElement | null} element
     * @param {*} context
     */
    function registerWidgetActions(widgetId) {
      var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'click';
      var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var context = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      if (!actions || !actions.length) {
        return null;
      }

      actions = actions.filter(function (a) {
        return a.type;
      }).map(function (a) {
        return new _AltrpAction__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z(a, widgetId, element);
      });
      return this.setProperty("actions.".concat(widgetId, ".").concat(eventName), actions);
    }
    /**
     * удаляет все действия виджета
     * @param {string} widgetId
     */

  }, {
    key: "unregisterWidgetActions",
    value: function unregisterWidgetActions(widgetId) {
      return this.unsetProperty("actions.".concat(widgetId));
    }
    /**
     * Вызывает все зарегистрированные действия определенного типа для виджета
     * @param {string} widgetId
     * @param {string} eventName
     * @param {[]} preventedActions
     * @param {FrontElement} element
     * @return {Promise<void>}
     */

  }, {
    key: "callAllWidgetActions",
    value: function () {
      var _callAllWidgetActions = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default().mark(function _callee(widgetId) {
        var eventName,
            preventedActions,
            element,
            actions,
            errors,
            _iterator,
            _step,
            action,
            result,
            _args = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                eventName = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'click';
                preventedActions = _args.length > 2 ? _args[2] : undefined;
                element = _args.length > 3 ? _args[3] : undefined;

                if (!isEditor()) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                if (!(this.getProperty("widget.statuses.".concat(widgetId, ".").concat(eventName)) === 'inAction')) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return");

              case 7:
                this.setProperty("widget.statuses.".concat(widgetId, ".").concat(eventName), 'inAction');
                preventedActions = preventedActions || [];
                actions = preventedActions;
                errors = [];
                actions = actions.map(function (a) {
                  return new _AltrpAction__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z(a, widgetId, element);
                }); // if(! actions.length && preventedActions.length && element){
                //   this.registerWidgetActions(widgetId, preventedActions, eventName, element);
                //   actions = this.getProperty(`actions.${widgetId}.${eventName}`, []);
                // }

                _iterator = _createForOfIteratorHelper(actions);
                _context.prev = 13;

                _iterator.s();

              case 15:
                if ((_step = _iterator.n()).done) {
                  _context.next = 32;
                  break;
                }

                action = _step.value;
                _context.prev = 17;
                _context.next = 20;
                return action.doAction();

              case 20:
                result = _context.sent;

                if (result.success) {
                  _context.next = 24;
                  break;
                }

                if (result.error) {
                  console.error(result.error);
                  errors.push(result.error);
                }

                return _context.abrupt("break", 32);

              case 24:
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](17);
                errors.push(_context.t0);
                console.error(_context.t0);

              case 30:
                _context.next = 15;
                break;

              case 32:
                _context.next = 37;
                break;

              case 34:
                _context.prev = 34;
                _context.t1 = _context["catch"](13);

                _iterator.e(_context.t1);

              case 37:
                _context.prev = 37;

                _iterator.f();

                return _context.finish(37);

              case 40:
                this.setProperty("widget.statuses.".concat(widgetId, ".").concat(eventName), 'noAction');

                if (!errors.length) {
                  _context.next = 43;
                  break;
                }

                return _context.abrupt("return", {
                  success: false,
                  errors: errors
                });

              case 43:
                return _context.abrupt("return", {
                  success: true
                });

              case 44:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[13, 34, 37, 40], [17, 26]]);
      }));

      function callAllWidgetActions(_x) {
        return _callAllWidgetActions.apply(this, arguments);
      }

      return callAllWidgetActions;
    }()
  }]);

  return ActionsManager;
}(_editor_src_js_classes_AltrpModel__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z);
/**
 *
 * @type {ActionsManager}
 */


window.actionsManager = new ActionsManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.actionsManager);

/***/ }),

/***/ "./resources/modules/front-app/src/js/helpers/sendEmail.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ sendEmail)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_current_email_template_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/modules/front-app/src/js/store/current-email-template/actions.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/modules/front-app/src/js/helpers.js");
/* harmony import */ var _editor_src_js_classes_Resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/modules/editor/src/js/classes/Resource.js");





/**
 * Отправляет шаблон письма на бэкенд
 * @param {string | null}emailTemplateGUID
 * @param {string} subject
 * @param {string} from
 * @param {string} to
 * @param {string} attachments
 * @return {Promise<void>}
 */

function sendEmail() {
  return _sendEmail.apply(this, arguments);
}

function _sendEmail() {
  _sendEmail = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var emailTemplateGUID,
        subject,
        from,
        to,
        attachments,
        templateLoader,
        template,
        html,
        resource,
        res,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            emailTemplateGUID = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
            subject = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'Message';
            from = _args.length > 2 && _args[2] !== undefined ? _args[2] : '';
            to = _args.length > 3 && _args[3] !== undefined ? _args[3] : '';
            attachments = _args.length > 4 && _args[4] !== undefined ? _args[4] : '';

            if (emailTemplateGUID) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", {
              success: true
            });

          case 7:
            _context.next = 9;
            return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/editor/src/js/classes/modules/TemplateLoader.js"));

          case 9:
            templateLoader = _context.sent.default;
            _context.next = 12;
            return templateLoader.loadTemplate(emailTemplateGUID);

          case 12:
            template = _context.sent;
            appStore.dispatch((0,_store_current_email_template_actions__WEBPACK_IMPORTED_MODULE_4__/* .changeCurrentEmailTemplate */ .f)(template));
            html = '';

          case 15:
            _context.next = 17;
            return (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.delay)(1500);

          case 17:
            if (_.get(window, 'emailTemplatesRenderer.emailTemplate.current')) {
              /**
               * @var  {HTMLElement} html
               */
              html = window.emailTemplatesRenderer.emailTemplate.current.cloneNode(true);
              html.style.display = 'table';
              html = html.outerHTML;
            }

          case 18:
            if (!html) {
              _context.next = 15;
              break;
            }

          case 19:
            // appStore.dispatch(changeCurrentEmailTemplate(null));
            resource = new _editor_src_js_classes_Resource__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z({
              route: '/ajax/feedback-html'
            });
            _context.next = 22;
            return resource.post({
              subject: subject,
              to: to,
              from: from,
              html: html,
              attachments: attachments
            });

          case 22:
            res = _context.sent;
            return _context.abrupt("return", {
              success: true
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendEmail.apply(this, arguments);
}

/***/ })

};
;
//# sourceMappingURL=737.index.js.map