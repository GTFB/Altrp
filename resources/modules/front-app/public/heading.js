(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["HeadingWidget"],{

  /***/ "./resources/modules/editor/src/js/components/altrp-heading/Animating.js":
  /*!*******************************************************************************!*\
    !*** ./resources/modules/editor/src/js/components/altrp-heading/Animating.js ***!
    \*******************************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
    /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
    /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
    /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
    /* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
    /* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */ var _animations_text_rotating_Rotating__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animations/text/rotating/Rotating */ "./resources/modules/editor/src/js/components/animations/text/rotating/Rotating.js");
    /* harmony import */ var _animations_text_highlighted_Highlighted__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../animations/text/highlighted/Highlighted */ "./resources/modules/editor/src/js/components/animations/text/highlighted/Highlighted.js");






    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





    var Animating = /*#__PURE__*/function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(Animating, _Component);

      var _super = _createSuper(Animating);

      function Animating() {
        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Animating);

        return _super.apply(this, arguments);
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Animating, [{
        key: "render",
        value: function render() {
          var animating = "";
          var settings = this.props.settings;
          var beforeText = settings.text_before_animating;
          var afterText = settings.text_after_animating;
          var htmlTag = settings.html_tag_animating || "h2";
          var prefix = "heading";

          if (settings.style_animating === "highlighted") {
            animating = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_animations_text_highlighted_Highlighted__WEBPACK_IMPORTED_MODULE_7__["default"], {
              shape: settings.shape_animating,
              text: settings.text_highlighted_animating,
              bringToFront: settings.bring_to_front_shape_animating,
              roundedEdges: settings.rounded_edges_shape_animating,
              prefix: prefix
            });
          } else if (settings.style_animating === "rotating") {
            animating = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_animations_text_rotating_Rotating__WEBPACK_IMPORTED_MODULE_6__["default"], {
              type: settings.animation_animating,
              prefix: prefix,
              text: settings.text_rotating_animating
            });
          }

          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            className: "altrp-heading-animating"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(htmlTag, {
            className: "altrp-heading-animating-tag"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, beforeText ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
            className: "altrp-heading-no-animating-text",
            dangerouslySetInnerHTML: {
              __html: beforeText
            }
          }) : null, "\xA0", animating, "\xA0", afterText ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
            className: "altrp-heading-no-animating-text",
            dangerouslySetInnerHTML: {
              __html: afterText
            }
          }) : null)));
        }
      }]);

      return Animating;
    }(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

    /* harmony default export */ __webpack_exports__["default"] = (Animating);

    /***/ }),

  /***/ "./resources/modules/editor/src/js/components/animations/text/highlighted/Highlighted.js":
  /*!***********************************************************************************************!*\
    !*** ./resources/modules/editor/src/js/components/animations/text/highlighted/Highlighted.js ***!
    \***********************************************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
    /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
    /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
    /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
    /* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
    /* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);






    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



    var CircleIcon = function CircleIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M325 18C228.7-8.3 118.5 8.3 78 21 22.4 38.4 4.6 54.6 5.6 77.6c1.4 32.4 52.2 54 142.6 63.7 66.2 7.1 212.2 7.5 273.5-8.3 64.4-16.6 104.3-57.6 33.8-98.2C386.7-4.9 179.4-1.4 126.3 20.7"
      }));
    };

    CircleIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };

    var CurlyIcon = function CurlyIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M3 146.1c17.1-8.8 33.5-17.8 51.4-17.8 15.6 0 17.1 18.1 30.2 18.1 22.9 0 36-18.6 53.9-18.6 17.1 0 21.3 18.5 37.5 18.5 21.3 0 31.8-18.6 49-18.6 22.1 0 18.8 18.8 36.8 18.8 18.8 0 37.5-18.6 49-18.6 20.4 0 17.1 19 36.8 19 22.9 0 36.8-20.6 54.7-18.6 17.7 1.4 7.1 19.5 33.5 18.8 17.1 0 47.2-6.5 61.1-15.6"
      }));
    };

    CurlyIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };

    var UnderlineIcon = function UnderlineIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M7.7 145.6C109 125 299.9 116.2 401 121.3c42.1 2.2 87.6 11.8 87.3 25.7"
      }));
    };

    UnderlineIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };

    var DoubleIcon = function DoubleIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M8.4 143.1c14.2-8 97.6-8.8 200.6-9.2 122.3-.4 287.5 7.2 287.5 7.2M8 19.4c72.3-5.3 162-7.8 216-7.8s136.2 0 267 7.8"
      }));
    };

    DoubleIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };

    var DoubleUnderlineIcon = function DoubleUnderlineIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M5 125.4c30.5-3.8 137.9-7.6 177.3-7.6 117.2 0 252.2 4.7 312.7 7.6M26.9 143.8c55.1-6.1 126-6.3 162.2-6.1 46.5.2 203.9 3.2 268.9 6.4"
      }));
    };

    DoubleUnderlineIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };

    var UnderlineZigzagIcon = function UnderlineZigzagIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M9.3 127.3c49.3-3 150.7-7.6 199.7-7.4 121.9.4 189.9.4 282.3 7.2-111.2 2.5-310.1 3.5-421.3 11.9 82.6-2.9 254.2-1 335.9 1.3-56 1.4-137.2-.3-197.1 9"
      }));
    };

    UnderlineZigzagIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };

    var DiagonalIcon = function DiagonalIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M13.5 15.5c131 13.7 289.3 55.5 475 125.5"
      }));
    };

    DiagonalIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };

    var StrikethroughIcon = function StrikethroughIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M3 75h493.5"
      }));
    };

    StrikethroughIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };

    var XIcon = function XIcon(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M497.4 23.9C301.6 40 155.9 80.6 4 144.4M14.1 27.6c204.5 20.3 393.8 74 467.3 111.7"
      }));
    };

    XIcon.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    };
    __webpack_require__.e(/*! import() */ 76).then(__webpack_require__.t.bind(null, /*! ./highlighted.scss */ "./resources/modules/editor/src/js/components/animations/text/highlighted/highlighted.scss", 7));

    var Highlighted = /*#__PURE__*/function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(Highlighted, _Component);

      var _super = _createSuper(Highlighted);

      function Highlighted() {
        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Highlighted);

        return _super.apply(this, arguments);
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Highlighted, [{
        key: "render",
        value: function render() {
          var svgClasses = "altrp-animating-highlighted-svg";
          var shape = "";
          var bringToFront = this.props.bringToFront || false;
          var roundedEdges = this.props.roundedEdges || false;

          if (roundedEdges) {
            svgClasses += " altrp-animating-highlighted-rounded-edges";
          }

          if (bringToFront) {
            svgClasses += " altrp-animating-highlighted-bring-to-front";
          }

          if (this.props.shape) {
            svgClasses += " altrp-animating-highlighted-".concat(this.props.shape);

            switch (this.props.shape) {
              case "circle":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(CircleIcon, null);
                break;

              case "curly":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(CurlyIcon, null);
                break;

              case "underline":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(UnderlineIcon, null);
                break;

              case "double":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(DoubleIcon, null);
                break;

              case "doubleUnderline":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(DoubleUnderlineIcon, null);
                break;

              case "underlineZigzag":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(UnderlineZigzagIcon, null);
                break;

              case "diagonal":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(DiagonalIcon, null);
                break;

              case "strikethrough":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(StrikethroughIcon, null);
                break;

              case "x":
                shape = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(XIcon, null);
                break;
            }
          } else {
            svgClasses += " altrp-animating-highlighted-circle";
          }

          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
            className: "altrp-animating-highlighted"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
            className: "altrp-animating-highlighted-text altrp-animating-text"
          }, this.props.text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
            className: svgClasses
          }, shape));
        }
      }]);

      return Highlighted;
    }(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

    /* harmony default export */ __webpack_exports__["default"] = (Highlighted);

    /***/ }),

  /***/ "./resources/modules/editor/src/js/components/animations/text/rotating/Rotating.js":
  /*!*****************************************************************************************!*\
    !*** ./resources/modules/editor/src/js/components/animations/text/rotating/Rotating.js ***!
    \*****************************************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
    /* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
    /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
    /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
    /* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
    /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
    /* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
    /* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
    /* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);








    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


    __webpack_require__.e(/*! import() */ 77).then(__webpack_require__.t.bind(null, /*! ./rotating.scss */ "./resources/modules/editor/src/js/components/animations/text/rotating/rotating.scss", 7));

    var Rotating = /*#__PURE__*/function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Rotating, _Component);

      var _super = _createSuper(Rotating);

      function Rotating(props) {
        var _this;

        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Rotating);

        _this = _super.call(this, props);
        var state = {
          active: 0,
          step: 0,
          index: 0,
          width: 0,
          style: {}
        };

        if (_this.props.type === "swirl" || _this.props.type === "blinds" || _this.props.type === "wave") {
          state.index = -1;
        }

        if (_this.props.type === "slide" || _this.props.type === "slideDown") {
          state.active = -1;
        }

        if (_this.props.type === "flip") {
          state.step = 1;
        }

        _this.state = state;
        _this.rotating = _this.rotating.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
        _this.typing = _this.typing.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
        _this.getWidth = _this.getWidth.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
        _this.setStep = _this.setStep.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
        _this.widthRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();
        _this.clipRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();
        return _this;
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Rotating, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.rotating();

          if (this.clipRef.current && this.props.type === "clip" || this.clipRef.current && this.props.type === "slide") {
            this.setState({
              width: this.clipRef.current.offsetWidth
            });
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var _this2 = this;

          var update = function update() {
            var saveWidth = false;

            if (_this2.props.type === "flip") {
              saveWidth = true;
            }

            _this2.setState(function (state) {
              return {
                active: 0,
                index: 0,
                step: 0,
                width: saveWidth ? state.width : 0,
                style: {}
              };
            });

            if (_this2.props.type === "swirl" || "blinds" ||  true && prevProps.type !== "swirl" || "blinds" || "wave") {
              _this2.setState({
                index: -1
              });
            }

            _this2.rotating();
          };

          if (prevProps.text !== this.props.text) {
            update();
          }

          if (prevProps.type !== this.props.type) {
            update();
          }

          if (JSON.stringify(this.props.text.split("\n")) !== JSON.stringify(prevProps.text.split("\n")) && this.props.type !== "typing" || "clip") {
            this.getWidth();
          }
        }
      }, {
        key: "getWidth",
        value: function getWidth() {
          if (this.widthRef.current) {
            var children = Array.from(this.widthRef.current.children);
            var width = 0;
            children.forEach(function (span) {
              if (width < span.offsetWidth) {
                width = span.offsetWidth;
              }
            });

            if (this.state.width !== width) {
              this.setState({
                width: width
              });
            }
          }
        }
      }, {
        key: "rotating",
        value: function rotating() {
          var _this3 = this;

          var arrayText = this.props.text.split("\n");

          switch (this.props.type) {
            case "typing":
              setTimeout(function () {
                var length = arrayText[_this3.state.index].split("").length;

                _this3.setState(function (state) {
                  return {
                    step: 1,
                    active: length >= state.active + 1 ? state.active : 0
                  };
                });

                setTimeout(function () {
                  var indexMax = arrayText.length--;

                  _this3.setState(function (state) {
                    return {
                      step: 2,
                      index: indexMax > state.index + 1 ? state.index + 1 : 0
                    };
                  });

                  setTimeout(_this3.typing, 500);
                }, 500);
              }, 2000);
              break;

            case "clip":
              if (this.clipRef.current) {
                var length = arrayText.length;
                setTimeout(function () {
                  var clipWidth = setInterval(function () {
                    if (_this3.state.width > 0) {
                      _this3.setState(function (state) {
                        return {
                          width: state.width - 4
                        };
                      });
                    } else {
                      clearInterval(clipWidth);
                      setTimeout(function () {
                        _this3.setState(function (state) {
                          return {
                            width: 0,
                            active: length > state.active + 1 ? state.active + 1 : 0
                          };
                        });

                        var clipWidthShow = setInterval(function () {
                          var maxWidth = _this3.props.type === "clip" ? _this3.clipRef.current.offsetWidth >= _this3.state.width : false;

                          if (maxWidth) {
                            _this3.setState(function (state) {
                              return {
                                width: state.width + 4
                              };
                            });
                          } else {
                            if (_this3.props.type === "clip") {
                              _this3.setState({
                                width: _this3.clipRef.current.offsetWidth
                              });
                            }

                            clearInterval(clipWidthShow);

                            _this3.rotating();
                          }
                        }, 20);
                      }, 100);
                    }
                  }, 20);
                }, 4000);
              }

              break;

            case "flip":
              setTimeout(function () {
                _this3.setState({
                  step: 0
                });

                setTimeout(function () {
                  var length = arrayText.length;

                  _this3.setState(function (state) {
                    return {
                      active: length > state.active + 1 ? state.active + 1 : 0,
                      step: 1
                    };
                  });

                  _this3.rotating();
                }, 1500);
              }, 3000);
              break;

            case "swirl":
              if (_.isString(arrayText[this.state.active + 1])) {
                var wordNext = arrayText[arrayText.length >= this.state.active + 1 ? this.state.active + 1 : 0].split("").length;
                var wordPrev = arrayText[this.state.active].split("").length;
                this.setState({
                  step: wordNext > wordPrev ? wordNext : wordPrev
                });
              }

              setTimeout(function () {
                var letterChanging = setInterval(function () {
                  if (_this3.state.index < _this3.state.step) {
                    _this3.setState(function (state) {
                      return {
                        index: state.index + 1
                      };
                    });
                  } else {
                    clearInterval(letterChanging);
                    setTimeout(function () {
                      var length = arrayText.length > _this3.state.active + 1;

                      _this3.setState(function (state) {
                        return {
                          active: length ? state.active + 1 : 0,
                          index: -1
                        };
                      });

                      _this3.rotating();
                    }, 500);
                  }
                }, 100);
              }, 1000);
              break;

            case "blinds":
              if (_.isString(arrayText[this.state.active + 1])) {
                var _wordNext = arrayText[arrayText.length >= this.state.active + 1 ? this.state.active + 1 : 0].split("").length;
                var _wordPrev = arrayText[this.state.active].split("").length;
                this.setState({
                  step: _wordNext > _wordPrev ? _wordNext : _wordPrev
                });
              }

              setTimeout(function () {
                var letterChanging = setInterval(function () {
                  if (_this3.state.index < _this3.state.step) {
                    _this3.setState(function (state) {
                      return {
                        index: state.index + 1
                      };
                    });
                  } else {
                    clearInterval(letterChanging);
                    setTimeout(function () {
                      var length = arrayText.length > _this3.state.active + 1;

                      _this3.setState(function (state) {
                        return {
                          active: length ? state.active + 1 : 0,
                          index: -1
                        };
                      });

                      _this3.rotating();
                    }, 500);
                  }
                }, 100);
              }, 1000);
              break;

            case "dropIn":
              setTimeout(function () {
                var wordNext = arrayText.length > _this3.state.active + 1 ? _this3.state.active + 1 : 0;

                _this3.setState({
                  active: wordNext
                });

                _this3.rotating();
              }, 4000);
              break;

            case "wave":
              if (_.isString(arrayText[this.state.active + 1])) {
                var _wordNext2 = "";

                if (arrayText[arrayText.length >= this.state.active + 1 ? this.state.active + 1 : 0]) {
                  _wordNext2 = arrayText[arrayText.length >= this.state.active + 1 ? this.state.active + 1 : 0].split("").length;
                }

                var _wordPrev2 = arrayText[this.state.active].split("").length;
                this.setState({
                  step: _wordNext2 > _wordPrev2 ? _wordNext2 : _wordPrev2
                });
              }

              setTimeout(function () {
                var letterChanging = setInterval(function () {
                  if (_this3.state.index < _this3.state.step) {
                    _this3.setState(function (state) {
                      return {
                        index: state.index + 1
                      };
                    });
                  } else {
                    clearInterval(letterChanging);
                    setTimeout(function () {
                      var length = arrayText.length > _this3.state.active + 1;

                      _this3.setState(function (state) {
                        return {
                          active: length ? state.active + 1 : 0,
                          index: -1
                        };
                      });

                      _this3.rotating();
                    }, 500);
                  }
                }, 100);
              }, 1000);
              break;

            case "slide":
              if (this.widthRef.current) {
                var _length = arrayText.length - 1;

                setTimeout(function () {
                  _this3.setState(function (state) {
                    return {
                      active: _this3.state.active + 1 < _length ? state.active + 1 : -1
                    };
                  });

                  _this3.rotating();
                }, 4000);
              }

              break;

            case "slideDown":
              if (this.widthRef.current) {
                var _length2 = arrayText.length - 1;

                setTimeout(function () {
                  _this3.setState(function (state) {
                    return {
                      active: _this3.state.active + 1 < _length2 ? state.active + 1 : -1
                    };
                  });

                  _this3.rotating();
                }, 5000);
              }

              break;
          }
        }
      }, {
        key: "typing",
        value: function typing() {
          var _this4 = this;

          var length = 0;

          if (this.props.text.split("\n")[this.state.index].split("")) {
            length = this.props.text.split("\n")[this.state.index].split("").length;
          }

          setTimeout(function () {
            if (length >= _this4.state.active + 1) {
              _this4.setState(function (state) {
                return {
                  active: state.active + 1
                };
              });

              _this4.typing();
            } else {
              _this4.rotating();
            }
          }, 150);
        }
      }, {
        key: "setStep",
        value: function setStep(value) {
          console.log(value);
          this.setState({
            step: value
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this5 = this;

          var classes = [this.props.prefix ? "altrp-" + this.props.prefix + "-animating-rotating" : " ", "altrp-animating-rotating", "altrp-animating-text"];
          var textArray = this.props.text.split("\n");
          var text = textArray[this.state.index];
          var styles = {};

          switch (this.props.type) {
            case "typing":
              classes.push("altrp-animating-rotating-line");
              classes.push("altrp-animating-rotating-line-pulse");

              if (this.state.step === 1) {
                classes.push("altrp-animating-rotating-typing-delete");
              } else {
                var letters = textArray[this.state.index].split("");
                text = letters.map(function (letter, idx) {
                  var hide = idx >= _this5.state.active && _this5.state.step >= 2 ? "altrp-animating-rotating-typing-letter-hide" : "";
                  var classNames = ["altrp-animating-rotating-typing-letter", hide];
                  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                    key: idx,
                    className: _.join(classNames, " ")
                  }, letter);
                });
              }

              break;

            case "clip":
              var stylesClip = {
                width: this.state.width,
                overflow: "hidden"
              };
              text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                style: stylesClip
              }, textArray.map(function (word, idx) {
                var classNames = "altrp-animating-rotating-clip-word" + (_this5.state.active !== idx ? " altrp-animating-rotating-clip-hide" : "");
                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                  key: idx,
                  ref: _this5.state.active !== idx ? null : _this5.clipRef,
                  className: classNames
                }, word);
              })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                className: "altrp-animating-rotating-clip-line"
              }));
              break;

            case "flip":
              classes.push("altrp-animating-rotating-flip-container");
              var animationTransform = "altrp-animating-rotating-flip-container-showing";

              if (this.state.step === 0) {
                animationTransform = "altrp-animating-rotating-flip-container-hiding";
              } else if (this.state.step === 1) {
                animationTransform = "altrp-animating-rotating-flip-container-showing";
              }

              classes.push(animationTransform);
              styles = _objectSpread(_objectSpread({}, styles), {}, {
                transform: "rotateX(".concat(this.state.style.transform, "deg)")
              });
              text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                style: {
                  width: this.state.width
                },
                ref: this.widthRef
              }, textArray.map(function (word, idx) {
                var classNames = "altrp-animating-rotating-flip-word" + (_this5.state.active !== idx ? " altrp-animating-rotating-flip-hide" : " altrp-animating-rotating-flip-show");
                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                  key: idx,
                  className: classNames
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", null, word));
              }));
              break;

            case "swirl":
              text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                style: {
                  width: this.state.width
                },
                className: "altrp-animating-rotating-swirl",
                ref: this.widthRef
              }, textArray.map(function (word, idx) {
                var classNames = "altrp-animating-rotating-swirl-word";
                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                  key: idx,
                  className: classNames
                }, word.split("").map(function (letter, idxL) {
                  var classNames = "altrp-animating-rotating-swirl-letter";

                  if (_this5.state.active !== idx) {
                    classNames += " altrp-animating-rotating-swirl-letter-hide";
                  }

                  if ((textArray.length > _this5.state.active + 1 ? _this5.state.active + 1 : 0) === idx) {
                    if (idxL <= _this5.state.index) {
                      classNames += " altrp-animating-rotating-swirl-letter-showing";
                    }
                  }

                  if (_this5.state.active === idx && idxL <= _this5.state.index) {
                    classNames += " altrp-animating-rotating-swirl-letter-hiding";
                  }

                  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                    key: idxL,
                    className: classNames
                  }, letter);
                }));
              }));
              break;

            case "blinds":
              text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                style: {
                  width: this.state.width
                },
                className: "altrp-animating-rotating-blinds",
                ref: this.widthRef
              }, textArray.map(function (word, idx) {
                var classNames = "altrp-animating-rotating-blinds-word";
                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                  key: idx,
                  className: classNames
                }, word.split("").map(function (letter, idxL) {
                  var classNames = "altrp-animating-rotating-blinds-letter";

                  if (_this5.state.active !== idx) {
                    classNames += " altrp-animating-rotating-blinds-letter-hide";
                  }

                  if ((textArray.length > _this5.state.active + 1 ? _this5.state.active + 1 : 0) === idx) {
                    if (idxL <= _this5.state.index) {
                      classNames += " altrp-animating-rotating-blinds-letter-showing";
                    }
                  }

                  if (_this5.state.active === idx && idxL <= _this5.state.index) {
                    classNames += " altrp-animating-rotating-blinds-letter-hiding";
                  }

                  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                    key: idxL,
                    className: classNames
                  }, letter);
                }));
              }));
              break;

            case "dropIn":
              var stylesDropIn = {
                width: this.state.width
              };
              text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                style: stylesDropIn,
                className: "altrp-animating-rotating-drop-in",
                ref: this.widthRef
              }, textArray.map(function (word, idx) {
                var classNames = "altrp-animating-rotating-drop-in-word";
                var activePrev = _this5.state.active - 1 >= 0 ? _this5.state.active - 1 : textArray.length - 1;

                if (_this5.state.active !== idx) {
                  if (activePrev === idx) {
                    classNames += " altrp-animating-rotating-drop-in-hiding";
                  } else {
                    classNames += " altrp-animating-rotating-drop-in-hide";
                  }
                } else {
                  classNames += " altrp-animating-rotating-drop-in-show";
                }

                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                  key: idx,
                  className: classNames
                }, word);
              }));
              break;

            case "wave":
              text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                style: {
                  width: this.state.width
                },
                className: "altrp-animating-rotating-wave",
                ref: this.widthRef
              }, textArray.map(function (word, idx) {
                var classNames = "altrp-animating-rotating-wave-word";
                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                  key: idx,
                  className: classNames
                }, word.split("").map(function (letter, idxL) {
                  var classNames = "altrp-animating-rotating-wave-letter";

                  if (_this5.state.active !== idx) {
                    classNames += " altrp-animating-rotating-wave-letter-hide";
                  }

                  if ((textArray.length > _this5.state.active + 1 ? _this5.state.active + 1 : 0) === idx) {
                    if (idxL <= _this5.state.index) {
                      classNames += " altrp-animating-rotating-wave-letter-showing";
                    }
                  }

                  if (_this5.state.active === idx && idxL <= _this5.state.index) {
                    classNames += " altrp-animating-rotating-wave-letter-hiding";
                  }

                  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                    key: idxL,
                    className: classNames
                  }, letter);
                }));
              }));
              break;

            case "slide":
              var stylesSlide = {
                width: this.state.width
              };
              text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                style: stylesSlide,
                ref: this.widthRef,
                className: "altrp-animating-rotating-slide"
              }, textArray.map(function (word, idx) {
                var classNames = " altrp-animating-rotating-slide-word";

                if (_this5.state.active !== idx) {
                  if ((_this5.state.active + 1 < textArray.length ? _this5.state.active + 1 : -1) === idx) {
                    classNames += " altrp-animating-rotating-slide-word-showing";
                  } else {
                    classNames += " altrp-animating-rotating-slide-word-hiding";
                  }
                } else {
                  classNames += " altrp-animating-rotating-slide-word-hiding";
                }

                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                  key: idx,
                  className: classNames
                }, word);
              }));
              break;

            case "slideDown":
              var stylesSlideDown = {
                width: this.state.width
              };
              text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                style: stylesSlideDown,
                ref: this.widthRef,
                className: "altrp-animating-rotating-slide-down"
              }, textArray.map(function (word, idx) {
                var classNames = " altrp-animating-rotating-slide-down-word";

                if (_this5.state.active !== idx) {
                  if ((_this5.state.active + 1 < textArray.length ? _this5.state.active + 1 : 0) === idx) {
                    classNames += " altrp-animating-rotating-slide-down-word-showing";
                  } else {
                    classNames += " altrp-animating-rotating-slide-down-word-hiding";
                  }
                } else {
                  classNames += " altrp-animating-rotating-slide-down-word-hiding";
                }

                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
                  key: idx,
                  className: classNames
                }, word);
              }));
              break;
          }

          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
            className: _.join(classes, " "),
            style: styles
          }, text); // return <AnimationEngine from={{
          //   width: 0
          // }}>
          //   <div>
          //     help
          //   </div>
          // </AnimationEngine>
        }
      }]);

      return Rotating;
    }(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

    /* harmony default export */ __webpack_exports__["default"] = (Rotating);

    /***/ }),

  /***/ "./resources/modules/editor/src/js/components/widgets/HeadingWidget.js":
  /*!*****************************************************************************!*\
    !*** ./resources/modules/editor/src/js/components/widgets/HeadingWidget.js ***!
    \*****************************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
    /* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
    /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
    /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
    /* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
    /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
    /* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
    /* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
    /* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
    /* harmony import */ var _altrp_link_AltrpLink__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../altrp-link/AltrpLink */ "./resources/modules/editor/src/js/components/altrp-link/AltrpLink.js");
    /* harmony import */ var _front_app_src_js_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../front-app/src/js/helpers */ "./resources/modules/front-app/src/js/helpers.js");
    /* harmony import */ var _altrp_heading_Animating__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../altrp-heading/Animating */ "./resources/modules/editor/src/js/components/altrp-heading/Animating.js");








    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




    __webpack_require__.e(/*! import() */ 79).then(__webpack_require__.t.bind(null, /*! ../../../sass/altrp-heading.scss */ "./resources/modules/editor/src/sass/altrp-heading.scss", 7));


    var HeadingWidget = /*#__PURE__*/function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HeadingWidget, _Component);

      var _super = _createSuper(HeadingWidget);

      function HeadingWidget(props) {
        var _this;

        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, HeadingWidget);

        _this = _super.call(this, props);
        _this.state = {
          settings: props.element.getSettings()
        };
        props.element.component = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);

        if (window.elementDecorator) {
          window.elementDecorator(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
        }

        if (props.baseRender) {
          _this.render = props.baseRender(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
        }

        return _this;
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(HeadingWidget, [{
        key: "render",
        value: function render() {
          var heading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", null, "Loading...");

          switch (this.props.element.getSettings("type", 'heading')) {
            case "heading":
              var modelData = this.props.element.getCurrentModel().getData();
              var background_image = this.props.element.getSettings('background_image', {});
              var text = this.getContent('text');
              var link;
              var className = "altrp-heading altrp-heading--link " + +this.state.settings.position_css_classes + (background_image.url ? ' altrp-background-image' : '');
              var wrapperClasses = "altrp-heading-wrapper"; //sub heading

              var subTag = this.state.settings.sub_heading_settings_html_tag || "h2";
              var subHeading = "";

              if (this.state.settings.text_sub_switch) {
                var subText = this.getContent('text_sub');

                switch (this.getContent("sub_heading_settings_position")) {
                  case "top":
                    wrapperClasses += " altrp-heading-wrapper-sub-top";
                    break;

                  case "left":
                    wrapperClasses += " altrp-heading-wrapper-sub-left";
                    break;

                  case "right":
                    wrapperClasses += " altrp-heading-wrapper-sub-right";
                    break;

                  default:
                    wrapperClasses += " altrp-heading-wrapper-sub-bottom";
                }

                subHeading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(subTag, {
                  dangerouslySetInnerHTML: {
                    __html: subText
                  },
                  className: "altrp-heading-sub"
                });
              }

              if (this.state.settings.link_link && this.state.settings.link_link.url) {
                var linkProps = {
                  rel: this.state.settings.link_link.noFollow ? "nofollow" : null,
                  // href: this.state.settings.link_link.url,
                  href: "mailto:mail@gmail.com",
                  className: 'altrp-inherit altrp-inherit_wo-border'
                };
                linkProps.tag = this.state.settings.link_link.tag;
                linkProps.creativelink = this.getContent("heading_settings_html_tag") !== "p" ? this.getContent("creative_link_controller") : null;

                if (this.state.settings.link_link.openInNew) {
                  linkProps.target = '_black';
                }

                if (this.state.settings.link_link.tag === 'Link' && !Object(_front_app_src_js_helpers__WEBPACK_IMPORTED_MODULE_9__["isEditor"])()) {
                  linkProps.to = this.state.settings.link_link.url.replace(':id', this.getModelId() || '');
                  linkProps.href = this.state.settings.link_link.url.replace(':id', this.getModelId() || '');
                }

                if (_.isObject(modelData)) {
                  linkProps.to = Object(_front_app_src_js_helpers__WEBPACK_IMPORTED_MODULE_9__["parseURLTemplate"])(this.state.settings.link_link.url, modelData);
                  linkProps.href = Object(_front_app_src_js_helpers__WEBPACK_IMPORTED_MODULE_9__["parseURLTemplate"])(this.state.settings.link_link.url, modelData);
                }

                if (Object(_front_app_src_js_helpers__WEBPACK_IMPORTED_MODULE_9__["isEditor"])()) {
                  linkProps.onClick = function (e) {
                    e.preventDefault();
                  };
                }

                link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_altrp_link_AltrpLink__WEBPACK_IMPORTED_MODULE_8__["default"], linkProps, text);
              }

              var advancedHeading = "";

              if (this.state.settings.switch_advanced_heading_content) {
                var styles = {};
                var xOffset = this.getContent("horizontal_offset_advanced_heading_content");
                var yOffset = this.getContent("vertical_offset_advanced_heading_content");
                var rotate = this.getContent("rotate_offset_advanced_heading_content");
                var transformOrigin = this.getContent("transform_origin_offset_advanced_heading_content");

                if (xOffset.size === "") {
                  xOffset.size = "0";
                }

                if (yOffset.size === "") {
                  yOffset.size = "0";
                }

                if (rotate.size === "") {
                  rotate.size = "0";
                }

                var origin = "0 0";

                switch (transformOrigin) {
                  case "topLeft":
                    origin = "0 0";
                    break;

                  case "topCenter":
                    origin = "50% 0";
                    break;

                  case "topRight":
                    origin = "100% 0";
                    break;

                  case "centerLeft":
                    origin = "0 50%";
                    break;

                  case "center":
                    origin = "50% 50%";
                    break;

                  case "centerRight":
                    origin = "100% 50%";
                    break;

                  case "bottomLeft":
                    origin = "0 100%";
                    break;

                  case "bottomCenter":
                    origin = "50% 100%";
                    break;

                  case "bottomRight":
                    origin = "100% 100%";
                    break;
                }

                var pos = {
                  transform: "translate(".concat(xOffset.size + xOffset.unit, ", ").concat(yOffset.size + yOffset.unit, ") rotate(").concat(rotate.size, "deg)"),
                  transformOrigin: origin
                };
                styles = _objectSpread({}, pos);
                var classes = "altrp-heading-advanced";

                if (this.props.element.getSettings("main_fill_advanced_heading_style")) {
                  classes += " altrp-heading-advanced-main-fill";
                }

                advancedHeading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                  className: "altrp-heading-advanced-wrapper"
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(this.state.settings.heading_settings_html_tag || 'h2', {
                  className: classes,
                  style: styles,
                  dangerouslySetInnerHTML: {
                    __html: this.getContent("text_advanced_heading_content")
                  }
                }));
                var currentBreakpoint = {};

                switch (this.getContent("hide_at_offset_advanced_heading_content")) {
                  case "never":
                    currentBreakpoint = {
                      type: "never",
                      size: 0
                    };
                    break;

                  case "mobile":
                    currentBreakpoint = {
                      type: "mobile",
                      size: 768
                    };
                    break;

                  case "tablet":
                    currentBreakpoint = {
                      type: "tablet",
                      size: 1025
                    };
                    break;

                  default:
                }

                if (this.getContent("hide_at_offset_advanced_heading_content") !== "never") {
                  var bodyWidth = document.body.offsetWidth;

                  if (Object(_front_app_src_js_helpers__WEBPACK_IMPORTED_MODULE_9__["isEditor"])()) {
                    bodyWidth = document.getElementById("editorWindow").offsetWidth;
                  }

                  if (bodyWidth <= currentBreakpoint.size) {
                    advancedHeading = "";
                  }
                }
              }

              var headingContainer = link ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(this.state.settings.heading_settings_html_tag || 'h2', {
                className: className,
                id: this.state.settings.position_css_id || ""
              }, link), this.state.settings.text_sub_switch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(subTag, {
                className: "altrp-heading-sub-container-link altrp-heading-sub"
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_altrp_link_AltrpLink__WEBPACK_IMPORTED_MODULE_8__["default"], {
                link: this.state.settings.link_link,
                dangerouslySetInnerHTML: {
                  __html: this.state.settings.text_sub
                },
                className: "altrp-inherit altrp-inherit_wo-border"
              }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(this.state.settings.heading_settings_html_tag || 'h2', {
                  className: className,
                  id: this.state.settings.position_css_id || "",
                  dangerouslySetInnerHTML: {
                    __html: text
                  }
                } // this.state.settings.switch_advanced_heading_content ? advancedHeading : ""
              ), subHeading);
              heading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
                className: wrapperClasses
              }, advancedHeading, headingContainer);
              break;

            case "animating":
            {
              heading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_altrp_heading_Animating__WEBPACK_IMPORTED_MODULE_10__["default"], {
                settings: this.state.settings
              });
            }
          }

          return heading;
        }
      }]);

      return HeadingWidget;
    }(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

    /* harmony default export */ __webpack_exports__["default"] = (HeadingWidget);

    /***/ })

}]);
