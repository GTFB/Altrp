"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BaseElement2 = _interopRequireDefault(require("./BaseElement"));

var _ControllersManager = require("../modules/ControllersManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RootElement =
/*#__PURE__*/
function (_BaseElement) {
  _inherits(RootElement, _BaseElement);

  function RootElement() {
    _classCallCheck(this, RootElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(RootElement).call(this));
  }

  _createClass(RootElement, [{
    key: "_registerControls",
    value: function _registerControls() {
      if (this.controllersRegistered) {
        return;
      }

      this.startControlSection('text_section', {
        tab: _ControllersManager.TAB_CONTENT,
        label: 'Text Section'
      });
      this.addControl('text', {
        type: _ControllersManager.CONTROLLER_SWITCHER,
        label: 'Switcher Content',
        "default": 'Switcher Content'
      });
      this.addControl('font-size', {
        type: _ControllersManager.CONTROLLER_NUMBER,
        label: 'Font Size',
        "default": 16,
        rules: {
          '{{ELEMENT}}': ['font-size: {{VALUE}}px;', 'line-height: {{VALUE}}px']
        }
      });
      this.addControl('padding', {
        type: _ControllersManager.CONTROLLER_NUMBER,
        label: 'Padding All',
        "default": 17,
        rules: {
          '{{ELEMENT}}': 'padding: {{VALUE}}px;'
        }
      });
      this.addControl('dimensions', {
        type: _ControllersManager.CONTROLLER_DIMENSIONS,
        label: 'Dimensions'
      });
      this.addControl('select', {
        type: _ControllersManager.CONTROLLER_SELECT,
        label: 'Select Content',
        select: [{
          id: 1,
          value: 'select1',
          label: 'Select Content 1'
        }, {
          id: 2,
          value: 'select2',
          label: 'Select Content 2'
        }]
      });
      this.addControl('choose', {
        type: _ControllersManager.CONTROLLER_CHOOSE,
        label: 'Choose Content',
        value: 0
      });
      this.addControl('slider', {
        type: _ControllersManager.CONTROLLER_SLIDER,
        label: 'Slider Content',
        value: 0
      });
      this.addControl('select2', {
        type: _ControllersManager.CONTROLLER_SELECT2,
        label: 'Select2 Content',
        placeholder: 'placeholder',
        select: [{
          value: '1',
          label: 'Select Content 1'
        }, {
          value: '2',
          label: 'Select Content 2'
        }]
      });
      this.addControl('link', {
        type: _ControllersManager.CONTROLLER_LINK,
        label: 'link content',
        isActive: false
      });
      this.endControlSection();
      this.startControlSection('text_style', {
        tab: _ControllersManager.TAB_STYLE,
        label: 'Text Section'
      });
      this.addControl('text_', {
        type: _ControllersManager.CONTROLLER_TEXTAREA,
        label: 'Text Content',
        "default": 'Default Text!!!'
      });
      this.endControlSection();
      this.startControlSection('text_advanced', {
        tab: _ControllersManager.TAB_ADVANCED,
        label: 'Text Section'
      });
      this.addControl('text__', {
        type: _ControllersManager.CONTROLLER_TEXT,
        label: 'Text Content',
        "default": 'Default Advanced Text!!!'
      });
      this.endControlSection(); // this.startControlSection('text_section', {
      //   tab: TAB_CONTENT,
      //   label: 'Text Section',
      // });
      //
      // this.addControl('text', {
      //   type: CONTROLLER_TEXT,
      //   label: 'Text Content',
      // });
      //
      //
      // this.endControlSection();
      //
      // this.startControlSection('text_style', {
      //   tab: TAB_STYLE,
      //   label: 'Text Section',
      // });
      //
      // this.addControl('text_', {
      //   type: CONTROLLER_TEXTAREA,
      //   label: 'Text Content',
      // });
      //
      // this.endControlSection();
      //
      // this.startControlSection('text_advanced', {
      //   tab: TAB_ADVANCED,
      //   label: 'Text Section',
      // });
      //
      // this.addControl('text__', {
      //   type: CONTROLLER_TEXT,
      //   label: 'Text Content',
      // });
      //
      // this.endControlSection();
    }
  }, {
    key: "appendNewSection",
    value: function appendNewSection(newSection) {
      if (newSection.getType() !== 'section') {
        throw 'Only Section can be a Child of Template';
      }

      this.appendChild(newSection);
    }
  }, {
    key: "getSelector",
    value: function getSelector() {
      return "altrp-template-root".concat(this.getId());
    }
  }], [{
    key: "getName",
    value: function getName() {
      return 'root-element';
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return 'Page';
    }
  }, {
    key: "getType",
    value: function getType() {
      return 'root-element';
    }
  }]);

  return RootElement;
}(_BaseElement2["default"]);

var _default = RootElement;
exports["default"] = _default;