"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CONTROLLER_LINK = exports.CONTROLLER_SELECT2 = exports.CONTROLLER_SLIDER = exports.CONTROLLER_CHOOSE = exports.CONTROLLER_SELECT = exports.CONTROLLER_DIMENSIONS = exports.CONTROLLER_SWITCHER = exports.CONTROLLER_NUMBER = exports.CONTROLLER_TEXT = exports.CONTROLLER_TEXTAREA = exports.TAB_ADVANCED = exports.TAB_STYLE = exports.TAB_CONTENT = void 0;

var _TextareaController = _interopRequireDefault(require("../../components/controllers/TextareaController"));

var _TextController = _interopRequireDefault(require("../../components/controllers/TextController"));

var _NumberController = _interopRequireDefault(require("../../components/controllers/NumberController"));

var _SwitcherController = _interopRequireDefault(require("../../components/controllers/SwitcherController"));

var _Controller = _interopRequireDefault(require("../Controller"));

var _DimensionsController = _interopRequireDefault(require("../../components/controllers/DimensionsController"));

var _SelectController = _interopRequireDefault(require("../../components/controllers/SelectController"));

var _ChooseController = _interopRequireDefault(require("../../components/controllers/ChooseController"));

var _SliderController = _interopRequireDefault(require("../../components/controllers/SliderController"));

var _Select2Controller = _interopRequireDefault(require("../../components/controllers/Select2Controller"));

var _LinkController = _interopRequireDefault(require("../../components/controllers/LinkController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TAB_CONTENT = 'content';
exports.TAB_CONTENT = TAB_CONTENT;
var TAB_STYLE = 'style';
exports.TAB_STYLE = TAB_STYLE;
var TAB_ADVANCED = 'advanced';
exports.TAB_ADVANCED = TAB_ADVANCED;
var CONTROLLER_TEXTAREA = 'textarea';
exports.CONTROLLER_TEXTAREA = CONTROLLER_TEXTAREA;
var CONTROLLER_TEXT = 'text';
exports.CONTROLLER_TEXT = CONTROLLER_TEXT;
var CONTROLLER_NUMBER = 'number';
exports.CONTROLLER_NUMBER = CONTROLLER_NUMBER;
var CONTROLLER_SWITCHER = 'switcher';
exports.CONTROLLER_SWITCHER = CONTROLLER_SWITCHER;
var CONTROLLER_DIMENSIONS = 'dimensions';
exports.CONTROLLER_DIMENSIONS = CONTROLLER_DIMENSIONS;
var CONTROLLER_SELECT = 'select';
exports.CONTROLLER_SELECT = CONTROLLER_SELECT;
var CONTROLLER_CHOOSE = 'choose';
exports.CONTROLLER_CHOOSE = CONTROLLER_CHOOSE;
var CONTROLLER_SLIDER = 'slider';
exports.CONTROLLER_SLIDER = CONTROLLER_SLIDER;
var CONTROLLER_SELECT2 = 'select2';
exports.CONTROLLER_SELECT2 = CONTROLLER_SELECT2;
var CONTROLLER_LINK = 'link';
exports.CONTROLLER_LINK = CONTROLLER_LINK;

var ControllersManager =
/*#__PURE__*/
function () {
  function ControllersManager() {
    _classCallCheck(this, ControllersManager);

    this.conttrollers = {};
    this.conttrollers[CONTROLLER_TEXTAREA] = _TextareaController["default"];
    this.conttrollers[CONTROLLER_TEXT] = _TextController["default"];
    this.conttrollers[CONTROLLER_NUMBER] = _NumberController["default"];
    this.conttrollers[CONTROLLER_SWITCHER] = _SwitcherController["default"];
    this.conttrollers[CONTROLLER_DIMENSIONS] = _DimensionsController["default"];
    this.conttrollers[CONTROLLER_SELECT] = _SelectController["default"];
    this.conttrollers[CONTROLLER_CHOOSE] = _ChooseController["default"];
    this.conttrollers[CONTROLLER_SLIDER] = _SliderController["default"];
    this.conttrollers[CONTROLLER_SELECT2] = _Select2Controller["default"];
    this.conttrollers[CONTROLLER_LINK] = _LinkController["default"];
    this.elementsControls = null;
    this._cache = {
      controls: {}
    };
  }

  _createClass(ControllersManager, [{
    key: "init",
    value: function init() {
      this.registerControls();
    }
  }, {
    key: "getController",
    value: function getController(controllerName) {
      if (!this.conttrollers[controllerName]) {
        throw "Controller with Name ".concat(controllerName, " not Found!");
      }

      return this.conttrollers[controllerName];
    }
  }, {
    key: "registerControls",
    value: function registerControls() {
      var elementClasses = window.elementsManager.getElements();
      this.elementsControls = {};

      for (var elementClassName in elementClasses) {
        if (elementClasses.hasOwnProperty(elementClassName)) {
          this.elementsControls[elementClassName] = new elementClasses[elementClassName]().getControls();
        }
      }
    }
  }, {
    key: "getControls",
    value: function getControls(elementName) {
      if (!this.elementsControls) {
        this.registerControls();
      }

      return this.elementsControls[elementName];
    }
  }, {
    key: "getElementControl",
    value: function getElementControl(elementName, controlId) {
      var controls = _objectSpread({}, this.getControls(elementName));

      var control;
      control = this._cache.controls[elementName + controlId];

      if (control) {
        return control;
      }

      for (var tabName in controls.data) {
        if (controls.data.hasOwnProperty(tabName)) {
          if (!controls.data[tabName].length) {
            continue;
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = controls.data[tabName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var section = _step.value;

              if (!section.controls.length) {
                continue;
              }

              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = section.controls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var _control = _step2.value;

                  if (_control.controlId === controlId) {
                    control = _control;
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }

      return control;
    }
  }, {
    key: "setControlsCache",
    value: function setControlsCache(controlsCacheName, args) {
      this._cache.controls[controlsCacheName] = args;
    }
  }]);

  return ControllersManager;
}();

var _default = ControllersManager;
exports["default"] = _default;