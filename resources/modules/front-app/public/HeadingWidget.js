(window.webpackJsonp = window.webpackJsonp || []).push([[36, 4, 20, 48, 49, 103, 110], {
  1358: function (e, t, n) {
    "use strict";
    n.r(t);
    var r = n(26), a = n.n(r), i = n(19), o = n.n(i), s = n(20), l = n.n(s), c = n(28), u = n.n(c), p = n(23),
      f = n.n(p), d = n(24), h = n.n(d), m = n(22), g = n.n(m), v = n(9), y = n.n(v), b = n(317), k = n(21);

    function S(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function w(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? S(Object(n), !0).forEach((function (t) {
          a()(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : S(Object(n)).forEach((function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
      }
      return e
    }

    function O(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = g()(e);
        if (t) {
          var a = g()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return h()(this, n)
      }
    }

    n.e(91).then(n.t.bind(null, 1393, 7));
    var E = function (e) {
      f()(n, e);
      var t = O(n);

      function n(e) {
        var r;
        o()(this, n);
        var a = {active: 0, step: 0, index: 0, width: 0, style: {}};
        return "swirl" !== (r = t.call(this, e)).props.type && "blinds" !== r.props.type && "wave" !== r.props.type || (a.index = -1), "slide" !== r.props.type && "slideDown" !== r.props.type || (a.active = -1), "flip" === r.props.type && (a.step = 1), r.state = a, r.rotating = r.rotating.bind(u()(r)), r.typing = r.typing.bind(u()(r)), r.getWidth = r.getWidth.bind(u()(r)), r.setStep = r.setStep.bind(u()(r)), r.widthRef = y.a.createRef(), r.clipRef = y.a.createRef(), r
      }

      return l()(n, [{
        key: "componentDidMount", value: function () {
          this.rotating(), (this.clipRef.current && "clip" === this.props.type || this.clipRef.current && "slide" === this.props.type) && this.setState({width: this.clipRef.current.offsetWidth})
        }
      }, {
        key: "componentDidUpdate", value: function (e) {
          var t = this, n = function () {
            var e = !1;
            "flip" === t.props.type && (e = !0), t.setState((function (t) {
              return {active: 0, index: 0, step: 0, width: e ? t.width : 0, style: {}}
            })), t.props.type, t.setState({index: -1}), t.rotating()
          };
          e.text !== this.props.text && n(), e.type !== this.props.type && n(), JSON.stringify(this.props.text.split("\n")) !== JSON.stringify(e.text.split("\n")) && this.props.type, this.getWidth()
        }
      }, {
        key: "getWidth", value: function () {
          if (this.widthRef.current) {
            var e = Array.from(this.widthRef.current.children), t = 0;
            e.forEach((function (e) {
              t < e.offsetWidth && (t = e.offsetWidth)
            })), this.state.width !== t && this.setState({width: t})
          }
        }
      }, {
        key: "rotating", value: function () {
          var e = this, t = this.props.text.split("\n");
          switch (this.props.type) {
            case"typing":
              setTimeout((function () {
                var n = t[e.state.index].split("").length;
                e.setState((function (e) {
                  return {step: 1, active: n >= e.active + 1 ? e.active : 0}
                })), setTimeout((function () {
                  var n = t.length--;
                  e.setState((function (e) {
                    return {step: 2, index: n > e.index + 1 ? e.index + 1 : 0}
                  })), setTimeout(e.typing, 500)
                }), 500)
              }), 2e3);
              break;
            case"clip":
              if (this.clipRef.current) {
                var n = t.length;
                setTimeout((function () {
                  var t = setInterval((function () {
                    e.state.width > 0 ? e.setState((function (e) {
                      return {width: e.width - 4}
                    })) : (clearInterval(t), setTimeout((function () {
                      e.setState((function (e) {
                        return {width: 0, active: n > e.active + 1 ? e.active + 1 : 0}
                      }));
                      var t = setInterval((function () {
                        "clip" === e.props.type && e.clipRef.current.offsetWidth >= e.state.width ? e.setState((function (e) {
                          return {width: e.width + 4}
                        })) : ("clip" === e.props.type && e.setState({width: e.clipRef.current.offsetWidth}), clearInterval(t), e.rotating())
                      }), 20)
                    }), 100))
                  }), 20)
                }), 4e3)
              }
              break;
            case"flip":
              setTimeout((function () {
                e.setState({step: 0}), setTimeout((function () {
                  var n = t.length;
                  e.setState((function (e) {
                    return {active: n > e.active + 1 ? e.active + 1 : 0, step: 1}
                  })), e.rotating()
                }), 1500)
              }), 3e3);
              break;
            case"swirl":
              if (_.isString(t[this.state.active + 1])) {
                var r = t[t.length >= this.state.active + 1 ? this.state.active + 1 : 0].split("").length,
                  a = t[this.state.active].split("").length;
                this.setState({step: r > a ? r : a})
              }
              setTimeout((function () {
                var n = setInterval((function () {
                  e.state.index < e.state.step ? e.setState((function (e) {
                    return {index: e.index + 1}
                  })) : (clearInterval(n), setTimeout((function () {
                    var n = t.length > e.state.active + 1;
                    e.setState((function (e) {
                      return {active: n ? e.active + 1 : 0, index: -1}
                    })), e.rotating()
                  }), 500))
                }), 100)
              }), 1e3);
              break;
            case"blinds":
              if (_.isString(t[this.state.active + 1])) {
                var i = t[t.length >= this.state.active + 1 ? this.state.active + 1 : 0].split("").length,
                  o = t[this.state.active].split("").length;
                this.setState({step: i > o ? i : o})
              }
              setTimeout((function () {
                var n = setInterval((function () {
                  e.state.index < e.state.step ? e.setState((function (e) {
                    return {index: e.index + 1}
                  })) : (clearInterval(n), setTimeout((function () {
                    var n = t.length > e.state.active + 1;
                    e.setState((function (e) {
                      return {active: n ? e.active + 1 : 0, index: -1}
                    })), e.rotating()
                  }), 500))
                }), 100)
              }), 1e3);
              break;
            case"dropIn":
              setTimeout((function () {
                var n = t.length > e.state.active + 1 ? e.state.active + 1 : 0;
                e.setState({active: n}), e.rotating()
              }), 4e3);
              break;
            case"wave":
              if (_.isString(t[this.state.active + 1])) {
                var s = "";
                t[t.length >= this.state.active + 1 ? this.state.active + 1 : 0] && (s = t[t.length >= this.state.active + 1 ? this.state.active + 1 : 0].split("").length);
                var l = t[this.state.active].split("").length;
                this.setState({step: s > l ? s : l})
              }
              setTimeout((function () {
                var n = setInterval((function () {
                  e.state.index < e.state.step ? e.setState((function (e) {
                    return {index: e.index + 1}
                  })) : (clearInterval(n), setTimeout((function () {
                    var n = t.length > e.state.active + 1;
                    e.setState((function (e) {
                      return {active: n ? e.active + 1 : 0, index: -1}
                    })), e.rotating()
                  }), 500))
                }), 100)
              }), 1e3);
              break;
            case"slide":
              if (this.widthRef.current) {
                var c = t.length - 1;
                setTimeout((function () {
                  e.setState((function (t) {
                    return {active: e.state.active + 1 < c ? t.active + 1 : -1}
                  })), e.rotating()
                }), 4e3)
              }
              break;
            case"slideDown":
              if (this.widthRef.current) {
                var u = t.length - 1;
                setTimeout((function () {
                  e.setState((function (t) {
                    return {active: e.state.active + 1 < u ? t.active + 1 : -1}
                  })), e.rotating()
                }), 5e3)
              }
          }
        }
      }, {
        key: "typing", value: function () {
          var e = this, t = 0;
          this.props.text.split("\n")[this.state.index].split("") && (t = this.props.text.split("\n")[this.state.index].split("").length), setTimeout((function () {
            t >= e.state.active + 1 ? (e.setState((function (e) {
              return {active: e.active + 1}
            })), e.typing()) : e.rotating()
          }), 150)
        }
      }, {
        key: "setStep", value: function (e) {
          console.log(e), this.setState({step: e})
        }
      }, {
        key: "render", value: function () {
          var e = this,
            t = [this.props.prefix ? "altrp-" + this.props.prefix + "-animating-rotating" : " ", "altrp-animating-rotating", "altrp-animating-text"],
            n = this.props.text.split("\n"), r = n[this.state.index], a = {};
          switch (this.props.type) {
            case"typing":
              if (t.push("altrp-animating-rotating-line"), t.push("altrp-animating-rotating-line-pulse"), 1 === this.state.step) t.push("altrp-animating-rotating-typing-delete"); else r = n[this.state.index].split("").map((function (t, n) {
                var r = ["altrp-animating-rotating-typing-letter", n >= e.state.active && e.state.step >= 2 ? "altrp-animating-rotating-typing-letter-hide" : ""];
                return y.a.createElement("span", {key: n, className: _.join(r, " ")}, t)
              }));
              break;
            case"clip":
              var i = {width: this.state.width, overflow: "hidden"};
              r = y.a.createElement(y.a.Fragment, null, y.a.createElement("div", {style: i}, n.map((function (t, n) {
                var r = "altrp-animating-rotating-clip-word" + (e.state.active !== n ? " altrp-animating-rotating-clip-hide" : "");
                return y.a.createElement("span", {
                  key: n,
                  ref: e.state.active !== n ? null : e.clipRef,
                  className: r
                }, t)
              }))), y.a.createElement("span", {className: "altrp-animating-rotating-clip-line"}));
              break;
            case"flip":
              t.push("altrp-animating-rotating-flip-container");
              var o = "altrp-animating-rotating-flip-container-showing";
              0 === this.state.step ? o = "altrp-animating-rotating-flip-container-hiding" : 1 === this.state.step && (o = "altrp-animating-rotating-flip-container-showing"), t.push(o), a = w(w({}, a), {}, {transform: "rotateX(".concat(this.state.style.transform, "deg)")}), r = y.a.createElement("div", {
                style: {width: this.state.width},
                ref: this.widthRef
              }, n.map((function (t, n) {
                var r = "altrp-animating-rotating-flip-word" + (e.state.active !== n ? " altrp-animating-rotating-flip-hide" : " altrp-animating-rotating-flip-show");
                return y.a.createElement("span", {key: n, className: r}, y.a.createElement("span", null, t))
              })));
              break;
            case"swirl":
              r = y.a.createElement("div", {
                style: {width: this.state.width},
                className: "altrp-animating-rotating-swirl",
                ref: this.widthRef
              }, n.map((function (t, r) {
                return y.a.createElement("span", {
                  key: r,
                  className: "altrp-animating-rotating-swirl-word"
                }, t.split("").map((function (t, a) {
                  var i = "altrp-animating-rotating-swirl-letter";
                  return e.state.active !== r && (i += " altrp-animating-rotating-swirl-letter-hide"), (n.length > e.state.active + 1 ? e.state.active + 1 : 0) === r && a <= e.state.index && (i += " altrp-animating-rotating-swirl-letter-showing"), e.state.active === r && a <= e.state.index && (i += " altrp-animating-rotating-swirl-letter-hiding"), y.a.createElement("div", {
                    key: a,
                    className: i
                  }, t)
                })))
              })));
              break;
            case"blinds":
              r = y.a.createElement("div", {
                style: {width: this.state.width},
                className: "altrp-animating-rotating-blinds",
                ref: this.widthRef
              }, n.map((function (t, r) {
                return y.a.createElement("span", {
                  key: r,
                  className: "altrp-animating-rotating-blinds-word"
                }, t.split("").map((function (t, a) {
                  var i = "altrp-animating-rotating-blinds-letter";
                  return e.state.active !== r && (i += " altrp-animating-rotating-blinds-letter-hide"), (n.length > e.state.active + 1 ? e.state.active + 1 : 0) === r && a <= e.state.index && (i += " altrp-animating-rotating-blinds-letter-showing"), e.state.active === r && a <= e.state.index && (i += " altrp-animating-rotating-blinds-letter-hiding"), y.a.createElement("div", {
                    key: a,
                    className: i
                  }, t)
                })))
              })));
              break;
            case"dropIn":
              var s = {width: this.state.width};
              r = y.a.createElement("div", {
                style: s,
                className: "altrp-animating-rotating-drop-in",
                ref: this.widthRef
              }, n.map((function (t, r) {
                var a = "altrp-animating-rotating-drop-in-word",
                  i = e.state.active - 1 >= 0 ? e.state.active - 1 : n.length - 1;
                return e.state.active !== r ? a += i === r ? " altrp-animating-rotating-drop-in-hiding" : " altrp-animating-rotating-drop-in-hide" : a += " altrp-animating-rotating-drop-in-show", y.a.createElement("span", {
                  key: r,
                  className: a
                }, t)
              })));
              break;
            case"wave":
              r = y.a.createElement("div", {
                style: {width: this.state.width},
                className: "altrp-animating-rotating-wave",
                ref: this.widthRef
              }, n.map((function (t, r) {
                return y.a.createElement("span", {
                  key: r,
                  className: "altrp-animating-rotating-wave-word"
                }, t.split("").map((function (t, a) {
                  var i = "altrp-animating-rotating-wave-letter";
                  return e.state.active !== r && (i += " altrp-animating-rotating-wave-letter-hide"), (n.length > e.state.active + 1 ? e.state.active + 1 : 0) === r && a <= e.state.index && (i += " altrp-animating-rotating-wave-letter-showing"), e.state.active === r && a <= e.state.index && (i += " altrp-animating-rotating-wave-letter-hiding"), y.a.createElement("div", {
                    key: a,
                    className: i
                  }, t)
                })))
              })));
              break;
            case"slide":
              var l = {width: this.state.width};
              r = y.a.createElement("div", {
                style: l,
                ref: this.widthRef,
                className: "altrp-animating-rotating-slide"
              }, n.map((function (t, r) {
                var a = " altrp-animating-rotating-slide-word";
                return e.state.active !== r && (e.state.active + 1 < n.length ? e.state.active + 1 : -1) === r ? a += " altrp-animating-rotating-slide-word-showing" : a += " altrp-animating-rotating-slide-word-hiding", y.a.createElement("span", {
                  key: r,
                  className: a
                }, t)
              })));
              break;
            case"slideDown":
              var c = {width: this.state.width};
              r = y.a.createElement("div", {
                style: c,
                ref: this.widthRef,
                className: "altrp-animating-rotating-slide-down"
              }, n.map((function (t, r) {
                var a = " altrp-animating-rotating-slide-down-word";
                return e.state.active !== r && (e.state.active + 1 < n.length ? e.state.active + 1 : 0) === r ? a += " altrp-animating-rotating-slide-down-word-showing" : a += " altrp-animating-rotating-slide-down-word-hiding", y.a.createElement("span", {
                  key: r,
                  className: a
                }, t)
              })))
          }
          return y.a.createElement("span", {className: _.join(t, " "), style: a}, r)
        }
      }]), n
    }(v.Component);

    function j(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = g()(e);
        if (t) {
          var a = g()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return h()(this, n)
      }
    }

    var R = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M325 18C228.7-8.3 118.5 8.3 78 21 22.4 38.4 4.6 54.6 5.6 77.6c1.4 32.4 52.2 54 142.6 63.7 66.2 7.1 212.2 7.5 273.5-8.3 64.4-16.6 104.3-57.6 33.8-98.2C386.7-4.9 179.4-1.4 126.3 20.7"}))
    };
    R.defaultProps = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none"};
    var P = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M3 146.1c17.1-8.8 33.5-17.8 51.4-17.8 15.6 0 17.1 18.1 30.2 18.1 22.9 0 36-18.6 53.9-18.6 17.1 0 21.3 18.5 37.5 18.5 21.3 0 31.8-18.6 49-18.6 22.1 0 18.8 18.8 36.8 18.8 18.8 0 37.5-18.6 49-18.6 20.4 0 17.1 19 36.8 19 22.9 0 36.8-20.6 54.7-18.6 17.7 1.4 7.1 19.5 33.5 18.8 17.1 0 47.2-6.5 61.1-15.6"}))
    };
    P.defaultProps = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none"};
    var x = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M7.7 145.6C109 125 299.9 116.2 401 121.3c42.1 2.2 87.6 11.8 87.3 25.7"}))
    };
    x.defaultProps = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none"};
    var C = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M8.4 143.1c14.2-8 97.6-8.8 200.6-9.2 122.3-.4 287.5 7.2 287.5 7.2M8 19.4c72.3-5.3 162-7.8 216-7.8s136.2 0 267 7.8"}))
    };
    C.defaultProps = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none"};
    var A = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M5 125.4c30.5-3.8 137.9-7.6 177.3-7.6 117.2 0 252.2 4.7 312.7 7.6M26.9 143.8c55.1-6.1 126-6.3 162.2-6.1 46.5.2 203.9 3.2 268.9 6.4"}))
    };
    A.defaultProps = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none"};
    var N = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M9.3 127.3c49.3-3 150.7-7.6 199.7-7.4 121.9.4 189.9.4 282.3 7.2-111.2 2.5-310.1 3.5-421.3 11.9 82.6-2.9 254.2-1 335.9 1.3-56 1.4-137.2-.3-197.1 9"}))
    };
    N.defaultProps = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none"};
    var T = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M13.5 15.5c131 13.7 289.3 55.5 475 125.5"}))
    };
    T.defaultProps = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none"};
    var M = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M3 75h493.5"}))
    };
    M.defaultProps = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none"};
    var D = function (e) {
      return y.a.createElement("svg", e, y.a.createElement("path", {d: "M497.4 23.9C301.6 40 155.9 80.6 4 144.4M14.1 27.6c204.5 20.3 393.8 74 467.3 111.7"}))
    };
    D.defaultProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500 150",
      preserveAspectRatio: "none"
    }, n.e(90).then(n.t.bind(null, 1394, 7));
    var L = function (e) {
      f()(n, e);
      var t = j(n);

      function n() {
        return o()(this, n), t.apply(this, arguments)
      }

      return l()(n, [{
        key: "render", value: function () {
          var e = "altrp-animating-highlighted-svg", t = "", n = this.props.bringToFront || !1;
          if ((this.props.roundedEdges || !1) && (e += " altrp-animating-highlighted-rounded-edges"), n && (e += " altrp-animating-highlighted-bring-to-front"), this.props.shape) switch (e += " altrp-animating-highlighted-".concat(this.props.shape), this.props.shape) {
            case"circle":
              t = y.a.createElement(R, null);
              break;
            case"curly":
              t = y.a.createElement(P, null);
              break;
            case"underline":
              t = y.a.createElement(x, null);
              break;
            case"double":
              t = y.a.createElement(C, null);
              break;
            case"doubleUnderline":
              t = y.a.createElement(A, null);
              break;
            case"underlineZigzag":
              t = y.a.createElement(N, null);
              break;
            case"diagonal":
              t = y.a.createElement(T, null);
              break;
            case"strikethrough":
              t = y.a.createElement(M, null);
              break;
            case"x":
              t = y.a.createElement(D, null)
          } else e += " altrp-animating-highlighted-circle";
          return y.a.createElement("span", {className: "altrp-animating-highlighted"}, y.a.createElement("span", {className: "altrp-animating-highlighted-text altrp-animating-text"}, this.props.text), y.a.createElement("span", {className: e}, t))
        }
      }]), n
    }(v.Component);

    function B(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = g()(e);
        if (t) {
          var a = g()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return h()(this, n)
      }
    }

    var F = function (e) {
      f()(n, e);
      var t = B(n);

      function n() {
        return o()(this, n), t.apply(this, arguments)
      }

      return l()(n, [{
        key: "render", value: function () {
          var e = "", t = this.props.settings, n = t.text_before_animating, r = t.text_after_animating,
            a = t.html_tag_animating || "h2";
          return "highlighted" === t.style_animating ? e = y.a.createElement(L, {
            shape: t.shape_animating,
            text: t.text_highlighted_animating,
            bringToFront: t.bring_to_front_shape_animating,
            roundedEdges: t.rounded_edges_shape_animating,
            prefix: "heading"
          }) : "rotating" === t.style_animating && (e = y.a.createElement(E, {
            type: t.animation_animating,
            prefix: "heading",
            text: t.text_rotating_animating
          })), y.a.createElement("div", {className: "altrp-heading-animating"}, y.a.createElement(a, {className: "altrp-heading-animating-tag"}, y.a.createElement(y.a.Fragment, null, n ? y.a.createElement("span", {
            className: "altrp-heading-no-animating-text",
            dangerouslySetInnerHTML: {__html: n}
          }) : null, "В ", e, "В ", r ? y.a.createElement("span", {
            className: "altrp-heading-no-animating-text",
            dangerouslySetInnerHTML: {__html: r}
          }) : null)))
        }
      }]), n
    }(v.Component);

    function I(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function G(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = g()(e);
        if (t) {
          var a = g()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return h()(this, n)
      }
    }

    n.e(93).then(n.t.bind(null, 1391, 7));
    var U = function (e) {
      f()(n, e);
      var t = G(n);

      function n(e) {
        var r;
        return o()(this, n), (r = t.call(this, e)).state = {settings: e.element.getSettings()}, e.element.component = u()(r), window.elementDecorator && window.elementDecorator(u()(r)), e.baseRender && (r.render = e.baseRender(u()(r))), r
      }

      return l()(n, [{
        key: "render", value: function () {
          var e = y.a.createElement("div", null, "Loading...");
          switch (this.props.element.getSettings("type", "heading")) {
            case"heading":
              var t, n = this.props.element.getCurrentModel().getData(),
                r = this.props.element.getSettings("background_image", {}), i = this.getContent("text"),
                o = "altrp-heading altrp-heading--link " + +this.state.settings.position_css_classes + (r.url ? " altrp-background-image" : ""),
                s = "altrp-heading-wrapper", l = this.state.settings.sub_heading_settings_html_tag || "h2", c = "";
              if (this.state.settings.text_sub_switch) {
                var u = this.getContent("text_sub");
                switch (this.getContent("sub_heading_settings_position")) {
                  case"top":
                    s += " altrp-heading-wrapper-sub-top";
                    break;
                  case"left":
                    s += " altrp-heading-wrapper-sub-left";
                    break;
                  case"right":
                    s += " altrp-heading-wrapper-sub-right";
                    break;
                  default:
                    s += " altrp-heading-wrapper-sub-bottom"
                }
                c = y.a.createElement(l, {dangerouslySetInnerHTML: {__html: u}, className: "altrp-heading-sub"})
              }
              if (this.state.settings.link_link && this.state.settings.link_link.url) {
                var p = {
                  rel: this.state.settings.link_link.noFollow ? "nofollow" : null,
                  href: "mailto:mail@gmail.com",
                  className: "altrp-inherit altrp-inherit_wo-border"
                };
                p.tag = this.state.settings.link_link.tag, p.creativelink = "p" !== this.getContent("heading_settings_html_tag") ? this.getContent("creative_link_controller") : null, this.state.settings.link_link.openInNew && (p.target = "_black"), "Link" !== this.state.settings.link_link.tag || Object(k.isEditor)() || (p.to = this.state.settings.link_link.url.replace(":id", this.getModelId() || ""), p.href = this.state.settings.link_link.url.replace(":id", this.getModelId() || "")), _.isObject(n) && (p.to = Object(k.parseURLTemplate)(this.state.settings.link_link.url, n), p.href = Object(k.parseURLTemplate)(this.state.settings.link_link.url, n)), Object(k.isEditor)() && (p.onClick = function (e) {
                  e.preventDefault()
                }), t = y.a.createElement(b.a, p, i)
              }
              var f = "";
              if (this.state.settings.switch_advanced_heading_content) {
                var d, h = this.getContent("horizontal_offset_advanced_heading_content"),
                  m = this.getContent("vertical_offset_advanced_heading_content"),
                  g = this.getContent("rotate_offset_advanced_heading_content"),
                  v = this.getContent("transform_origin_offset_advanced_heading_content");
                "" === h.size && (h.size = "0"), "" === m.size && (m.size = "0"), "" === g.size && (g.size = "0");
                var S = "0 0";
                switch (v) {
                  case"topLeft":
                    S = "0 0";
                    break;
                  case"topCenter":
                    S = "50% 0";
                    break;
                  case"topRight":
                    S = "100% 0";
                    break;
                  case"centerLeft":
                    S = "0 50%";
                    break;
                  case"center":
                    S = "50% 50%";
                    break;
                  case"centerRight":
                    S = "100% 50%";
                    break;
                  case"bottomLeft":
                    S = "0 100%";
                    break;
                  case"bottomCenter":
                    S = "50% 100%";
                    break;
                  case"bottomRight":
                    S = "100% 100%"
                }
                d = function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? I(Object(n), !0).forEach((function (t) {
                      a()(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : I(Object(n)).forEach((function (t) {
                      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                  }
                  return e
                }({}, {
                  transform: "translate(".concat(h.size + h.unit, ", ").concat(m.size + m.unit, ") rotate(").concat(g.size, "deg)"),
                  transformOrigin: S
                });
                var w = "altrp-heading-advanced";
                this.props.element.getSettings("main_fill_advanced_heading_style") && (w += " altrp-heading-advanced-main-fill"), f = y.a.createElement("div", {className: "altrp-heading-advanced-wrapper"}, y.a.createElement(this.state.settings.heading_settings_html_tag || "h2", {
                  className: w,
                  style: d,
                  dangerouslySetInnerHTML: {__html: this.getContent("text_advanced_heading_content")}
                }));
                var O = {};
                switch (this.getContent("hide_at_offset_advanced_heading_content")) {
                  case"never":
                    O = {type: "never", size: 0};
                    break;
                  case"mobile":
                    O = {type: "mobile", size: 768};
                    break;
                  case"tablet":
                    O = {type: "tablet", size: 1025}
                }
                if ("never" !== this.getContent("hide_at_offset_advanced_heading_content")) {
                  var E = document.body.offsetWidth;
                  Object(k.isEditor)() && (E = document.getElementById("editorWindow").offsetWidth), E <= O.size && (f = "")
                }
              }
              var j = t ? y.a.createElement(y.a.Fragment, null, y.a.createElement(this.state.settings.heading_settings_html_tag || "h2", {
                className: o,
                id: this.state.settings.position_css_id || ""
              }, t), this.state.settings.text_sub_switch && y.a.createElement(l, {className: "altrp-heading-sub-container-link altrp-heading-sub"}, y.a.createElement(b.a, {
                link: this.state.settings.link_link,
                dangerouslySetInnerHTML: {__html: this.state.settings.text_sub},
                className: "altrp-inherit altrp-inherit_wo-border"
              }))) : y.a.createElement(y.a.Fragment, null, y.a.createElement(this.state.settings.heading_settings_html_tag || "h2", {
                className: o,
                id: this.state.settings.position_css_id || "",
                dangerouslySetInnerHTML: {__html: i}
              }), c);
              e = y.a.createElement("div", {className: s}, f, j);
              break;
            case"animating":
              e = y.a.createElement(F, {settings: this.state.settings})
          }
          return e
        }
      }]), n
    }(v.Component);
    t.default = U
  },
  205: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "TRIGGER_POPUP", a = function (e) {
      return {type: r, payload: e}
    }
  },
  206: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "SET_SCROLL_TOP", a = function (e) {
      return e.top && window.pageUpdater && window.pageUpdater.startUpdating(), {type: r, payload: e}
    }
  },
  207: function (e, t, n) {
    "use strict";
    n.r(t), n.d(t, "SET_CURRENT_SCREEN", (function () {
      return r
    })), n.d(t, "setCurrentScreen", (function () {
      return a
    }));
    var r = "SET_CURRENT_SCREEN";

    function a(e) {
      return {type: r, screen: e}
    }
  },
  208: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "CHANGE_CURRENT_EMAIL_TEMPLATE";

    function a(e) {
      return {type: r, template: e}
    }
  },
  21: function (e, t, n) {
    "use strict";
    n.r(t), n.d(t, "getRoutes", (function () {
      return oe
    })), n.d(t, "isSSR", (function () {
      return se
    })), n.d(t, "iconsManager", (function () {
      return le
    })), n.d(t, "setTitle", (function () {
      return ce
    })), n.d(t, "isEditor", (function () {
      return ue
    })), n.d(t, "parseOptionsFromSettings", (function () {
      return pe
    })), n.d(t, "getMediaQueryByName", (function () {
      return fe
    })), n.d(t, "getMediaSettingsByName", (function () {
      return de
    })), n.d(t, "getCurrentBreakpoint", (function () {
      return he
    })), n.d(t, "parseURLTemplate", (function () {
      return me
    })), n.d(t, "getWindowWidth", (function () {
      return ge
    })), n.d(t, "renderAssetIcon", (function () {
      return ve
    })), n.d(t, "renderAsset", (function () {
      return ye
    })), n.d(t, "parseParamsFromString", (function () {
      return be
    })), n.d(t, "conditionsChecker", (function () {
      return ke
    })), n.d(t, "setDataByPath", (function () {
      return we
    })), n.d(t, "getDataByPath", (function () {
      return Oe
    })), n.d(t, "extractPathFromString", (function () {
      return _e
    })), n.d(t, "getObjectByPrefix", (function () {
      return Ee
    })), n.d(t, "mbParseJSON", (function () {
      return je
    })), n.d(t, "altrpCompare", (function () {
      return Re
    })), n.d(t, "CONDITIONS_OPTIONS", (function () {
      return Pe
    })), n.d(t, "isElementTopInViewport", (function () {
      return xe
    })), n.d(t, "getTopPosition", (function () {
      return Ce
    })), n.d(t, "getTimeValue", (function () {
      return Ae
    })), n.d(t, "startOfMonth", (function () {
      return Ne
    })), n.d(t, "startOfYear", (function () {
      return Te
    })), n.d(t, "startOfWeek", (function () {
      return Me
    })), n.d(t, "getCurrentStoreState", (function () {
      return De
    })), n.d(t, "scrollToElement", (function () {
      return Le
    })), n.d(t, "getHTMLElementById", (function () {
      return Be
    })), n.d(t, "getWrapperHTMLElementByElement", (function () {
      return Fe
    })), n.d(t, "getComponentByElementId", (function () {
      return Ie
    })), n.d(t, "clearEmptyProps", (function () {
      return ze
    })), n.d(t, "replaceContentWithData", (function () {
      return Ke
    })), n.d(t, "printElements", (function () {
      return We
    })), n.d(t, "elementsToPdf", (function () {
      return qe
    })), n.d(t, "dataFromTable", (function () {
      return Ve
    })), n.d(t, "dataToCSV", (function () {
      return $e
    })), n.d(t, "dataToXLS", (function () {
      return Ye
    })), n.d(t, "altrpLogin", (function () {
      return Xe
    })), n.d(t, "altrpLogout", (function () {
      return tt
    })), n.d(t, "cutString", (function () {
      return rt
    })), n.d(t, "sortOptions", (function () {
      return at
    })), n.d(t, "recurseCount", (function () {
      return it
    })), n.d(t, "getAppContext", (function () {
      return ot
    })), n.d(t, "storeWidgetState", (function () {
      return st
    })), n.d(t, "getWidgetState", (function () {
      return lt
    })), n.d(t, "saveDataToLocalStorage", (function () {
      return ct
    })), n.d(t, "getDataFromLocalStorage", (function () {
      return ut
    })), n.d(t, "scrollbarWidth", (function () {
      return pt
    })), n.d(t, "setAltrpIndex", (function () {
      return ft
    })), n.d(t, "renderFontLink", (function () {
      return dt
    })), n.d(t, "isAltrpTestMode", (function () {
      return ht
    })), n.d(t, "altrpRandomId", (function () {
      return mt
    })), n.d(t, "generateButtonsArray", (function () {
      return gt
    })), n.d(t, "isValueMatchMask", (function () {
      return vt
    })), n.d(t, "getConverter", (function () {
      return yt
    })), n.d(t, "convertData", (function () {
      return bt
    })), n.d(t, "renderIcon", (function () {
      return kt
    })), n.d(t, "redirect", (function () {
      return St
    })), n.d(t, "validateEmail", (function () {
      return wt
    })), n.d(t, "getResponsiveSetting", (function () {
      return Ot
    })), n.d(t, "valueReplacement", (function () {
      return _t
    })), n.d(t, "delay", (function () {
      return Et
    })), n.d(t, "prepareURLForEmail", (function () {
      return jt
    })), n.d(t, "parseIDFromYoutubeURL", (function () {
      return Rt
    })), n.d(t, "prepareContext", (function () {
      return Pt
    })), n.d(t, "isJSON", (function () {
      return xt
    })), n.d(t, "parseStringValue", (function () {
      return At
    })), n.d(t, "getBreadcrumbsItems", (function () {
      return Nt
    }));
    var r = n(0), a = n.n(r), i = n(30), o = n.n(i), s = n(1), l = n.n(s), c = n(37), u = n.n(c), p = n(26), f = n.n(p),
      d = n(39), h = n.n(d), m = n(44), g = n(25), v = n(27), y = n.n(v), b = n(35), k = n(40), S = n(49), w = n(216),
      O = n(48), E = n(54), j = n(215), R = n(209), P = n.n(R), x = n(19), C = n.n(x), A = n(20), N = n.n(A), T = n(23),
      M = n.n(T), D = n(24), L = n.n(D), B = n(22), F = n.n(B), I = n(9), G = n.n(I);

    function U(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function H(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? U(Object(n), !0).forEach((function (t) {
          f()(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : U(Object(n)).forEach((function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
      }
      return e
    }

    function z(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = F()(e);
        if (t) {
          var a = F()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return L()(this, n)
      }
    }

    var K = function (e) {
      M()(r, e);
      var t, n = z(r);

      function r(e) {
        var t;
        return C()(this, r), (t = n.call(this, e)).state = {svg: "", props: {}}, t
      }

      return N()(r, [{
        key: "componentDidMount", value: (t = l()(a.a.mark((function e() {
          var t, n, r, i, o, s;
          return a.a.wrap((function (e) {
            for (; ;) switch (e.prev = e.next) {
              case 0:
                if (window.assetsCache = window.assetsCache || {}, this.props.url) {
                  e.next = 3;
                  break
                }
                return e.abrupt("return");
              case 3:
                if (t = window.assetsCache[this.props.url]) {
                  e.next = 10;
                  break
                }
                return n = new b.a({route: this.props.url}), e.next = 8, n.getAsText();
              case 8:
                t = e.sent, window.assetsCache[this.props.url] = t;
              case 10:
                for (r = t.match(/<svg(.*?)=\"(.*?)\">/gi)[0], i = new RegExp("[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*(['\"])((?:\\\\\\2|(?!\\2).)*)\\2", "ig"), o = {}; s = i.exec(r);) o[s[1]] = s[3];
                this.setState((function (e) {
                  return H(H({}, e), {}, {props: o})
                })), t = (t = t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")).replace(/<svg(.*?)=\"(.*?)\">/gi, "").replace(/<\/svg>/gi, ""), this.setState((function (e) {
                  return H(H({}, e), {}, {svg: t})
                }));
              case 18:
              case"end":
                return e.stop()
            }
          }), e, this)
        }))), function () {
          return t.apply(this, arguments)
        })
      }, {
        key: "componentDidUpdate", value: function (e, t) {
          this.props.url !== e.url && this.componentDidMount()
        }
      }, {
        key: "render", value: function () {
          var e = _.assign(this.state.props, this.props);
          return _.unset(e, "url"), this.state.svg ? G.a.createElement("svg", h()({}, e, {dangerouslySetInnerHTML: {__html: this.state.svg}})) : ""
        }
      }]), r
    }(I.Component), W = n(241), q = n.n(W);

    function J(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = F()(e);
        if (t) {
          var a = F()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return L()(this, n)
      }
    }

    var V = function (e) {
      M()(n, e);
      var t = J(n);

      function n() {
        return C()(this, n), t.apply(this, arguments)
      }

      return N()(n, [{
        key: "convertData", value: function (e) {
          return this.checkData(e) ? this.doConvert(e) : e
        }
      }, {
        key: "doConvert", value: function (e) {
          var t = this.getConvertType();
          return _.isFunction(this[t]) ? this[t](e) : e
        }
      }, {
        key: "checkData", value: function () {
          return !1
        }
      }, {
        key: "getDataType", value: function () {
          return this.getProperty("data_type")
        }
      }, {
        key: "getConvertType", value: function () {
          return this.getProperty("convert_type")
        }
      }, {
        key: "getArgument", value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
          return this.getProperty("argument".concat(e || 1))
        }
      }]), n
    }(g.a);

    function $(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = F()(e);
        if (t) {
          var a = F()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return L()(this, n)
      }
    }

    var Q, Y = function (e) {
      M()(n, e);
      var t = $(n);

      function n() {
        return C()(this, n), t.apply(this, arguments)
      }

      return N()(n, [{
        key: "extract", value: function (e) {
          var t = this.getArgument(1);
          return t ? e.map((function (e) {
            return Oe(_e(t), "", e)
          })) : e
        }
      }, {
        key: "map", value: function (e) {
          var t = this.getArgument(1);
          return t ? e.map((function (e) {
            return be(t, e, !0)
          })) : e
        }
      }, {
        key: "checkData", value: function (e) {
          return q()(F()(n.prototype), "checkData", this).call(this, e), _.isArray(e)
        }
      }]), n
    }(V), Z = n(50), X = n(47), ee = n(70), te = n(52);

    function ne(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function re(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ne(Object(n), !0).forEach((function (t) {
          f()(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ne(Object(n)).forEach((function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
      }
      return e
    }

    function ae(e, t) {
      var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!n) {
        if (Array.isArray(e) || (n = function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return ie(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(e);
          if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ie(e, t)
        }(e)) || t && e && "number" == typeof e.length) {
          n && (e = n);
          var r = 0, a = function () {
          };
          return {
            s: a, n: function () {
              return r >= e.length ? {done: !0} : {done: !1, value: e[r++]}
            }, e: function (e) {
              throw e
            }, f: a
          }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }
      var i, o = !0, s = !1;
      return {
        s: function () {
          n = n.call(e)
        }, n: function () {
          var e = n.next();
          return o = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            o || null == n.return || n.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function ie(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    function oe() {
      return n.e(106).then(n.bind(null, 1388))
    }

    function se() {
      try {
        return window.SSR
      } catch (e) {
        return !1
      }
    }

    function le() {
      return window.iconsManager
    }

    function ce(e) {
      var t = document.title;
      Q || (Q = t.innerHTML), e || (e = Q), document.title !== e && (document.title = e)
    }

    function ue() {
      var e, t = null === (e = window.location) || void 0 === e ? void 0 : e.pathname;
      return (null == t ? void 0 : t.includes("/admin/editor")) || !1
    }

    function pe(e) {
      if (!e) return [];
      var t = e.split("\n"), n = Oe(_e(e));
      return _.isArray(n) ? n : t = t.map((function (e) {
        var t = e.split("|")[0], n = _e(t = t.trim());
        n && (t = Oe(n));
        var r = e.split("|")[1] || t || "";
        !_.isString(r) && (r = "");
        var a = _e(r = r.trim());
        return a && (r = Oe(a)), {value: t, label: r}
      }))
    }

    function fe(e) {
      var t = "";
      return m.default.SCREENS.forEach((function (n) {
        n.name === e && (t = n.mediaQuery)
      })), t
    }

    function de(e) {
      var t = m.default.SCREENS[0];
      return m.default.SCREENS.forEach((function (n) {
        n.name === e && (t = n)
      })), t
    }

    function he() {
      var e, t = ge(), n = ae(m.default.SCREENS.map((function (e) {
        return {name: e.name, size: Number(e.width.split("px")[0])}
      })));
      try {
        for (n.s(); !(e = n.n()).done;) {
          var r = e.value;
          if (r.size < t) return r.name
        }
      } catch (e) {
        n.e(e)
      } finally {
        n.f()
      }
    }

    function me() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = e, r = "";
      ue() || (t = _.assign(_.cloneDeep(currentRouterMatch.getProperty("params")), t)), -1 !== (n = n.trim()).indexOf("{{") && (n = Ke(n, t)), 0 === n.indexOf("https://") && (r = "https://", n = n.replace("https://", "")), 0 === n.indexOf("http://") && (r = "http://", n = n.replace("http://", "")), 0 === n.indexOf("mailto:") && (r = "mailto:", n = n.replace("mailto:", "")), 0 === n.indexOf("tel:") && (r = "tel:", n = n.replace("tel:", ""));
      var a = n.match(/:([\s\S]+?)(\/|$)/g);
      return a ? (a.forEach((function (e) {
        var r = t[e.replace(/:|\//g, "")] || "";
        e = e.replace("/", ""), n = n.replace(new RegExp(e, "g"), r)
      })), r + n) : r + n
    }

    function ge() {
      return ue() ? document.getElementById("editorWindow").offsetWidth : document.getElementById("front-app").offsetWidth
    }

    function ve(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      if (e) {
        if (e.url && "svg" === e.type) return React.createElement(K, h()({}, t, {url: e.url}));
        switch (e.assetType) {
          case"icon":
            return le().renderIcon(e.name);
          case"image":
          case"media":
            return React.createElement("img", re(re({}, t), {}, {src: e.url}))
        }
      }
      return ""
    }

    function ye(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      if (e.url && "svg" === e.type) return React.createElement(K, h()({}, t, {url: e.url}));
      if (!se() && e instanceof File) {
        var n = React.createRef(), r = new FileReader;
        return r.readAsDataURL(e), r.onload = function () {
          n.current && (n.current.src = r.result, n.current.alt = e.name)
        }, React.createElement("img", re(re({}, t), {}, {src: e.url, ref: n}))
      }
      switch (e.assetType) {
        case"icon":
          return le().renderIcon(e.name, t);
        case"image":
        case"media":
          return React.createElement("img", re(re({}, t), {}, {src: e.url}));
        case"mediaBackground":
          return React.createElement("div", re(re({}, t), {}, {style: {backgroundImage: "url(".concat(e.url, ")")}}));
        case void 0:
          return React.createElement("img", re(re({}, t), {}, {src: "/img/nullImage.png"}))
      }
      return ""
    }

    function be(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
      t instanceof g.a || (t = new g.a(t));
      var a = {}, i = window.currentRouterMatch instanceof g.a ? window.currentRouterMatch.getProperty("params") : {};
      if (!e) return a;
      var o = e.split("\n");
      return o.forEach((function (e) {
        var o = e.split("|"), s = u()(o, 2), l = s[0], c = s[1];
        l && c && (l = l.trim(), c = c.trim(), -1 !== l.indexOf("{{") && (l = Ke(l)), c.match(/{{([\s\S]+?)(?=}})/g) ? t.getProperty(c.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")) || Oe(c.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")) ? a[l] = t.getProperty(c.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")) || Oe(c.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")) || "" : a[l] = r ? i[c.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")] ? i[c.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")] : "" : c : a[l] = c, !n && _.isObject(a[l]) && delete a[l])
      })), a
    }

    function ke() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
        t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
        n = arguments.length > 2 ? arguments[2] : void 0,
        r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
      if (!e.length) return !0;
      var a = t;
      return _.each(e, (function (e) {
        t ? a *= Se(e, n, r) : a += Se(e, n, r)
      })), !!a
    }

    function Se(e, t) {
      var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], r = e.operator, a = e.modelField,
        i = e.value;
      return n ? (i = Oe(i, "", t, !0), Re(a = Oe(a, "", t), i, r)) : Re(t.getProperty(a), i, r)
    }

    function we() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 ? arguments[1] : void 0,
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
      if (!e) return !1;
      if (-1 !== e.indexOf(",")) {
        e.split(",").map((function (e) {
          return we(e, t, n)
        }));
        return !0
      }
      switch (e = (e = e.replace("{{", "").replace("}}", "")).trim(), t) {
        case"true":
          t = !0;
          break;
        case"false":
          t = !1;
          break;
        case"null":
          t = null;
          break;
        case"undefined":
          t = void 0
      }
      if (0 === e.indexOf("altrppagestate.")) {
        if (!(e = e.replace("altrppagestate.", ""))) return !1;
        var r = appStore.getState().altrpPageState.getProperty(e);
        return _.isEqual(r, t) || (_.isFunction(n) ? n(Object(O.c)(e, t)) : appStore.dispatch(Object(O.c)(e, t))), !0
      }
      if (0 === e.indexOf("altrpmeta.")) {
        if (!(e = e.replace("altrpmeta.", ""))) return !1;
        var a = appStore.getState().altrpMeta.getProperty(e);
        return _.isEqual(a, t) || (_.isFunction(n) ? n(Object(E.b)(e, t)) : appStore.dispatch(Object(E.b)(e, t))), !0
      }
      if (0 === e.indexOf("altrpuser.local_storage.")) {
        if (!(e = e.replace("altrpuser.", ""))) return !1;
        var i = appStore.getState().currentUser.getProperty(e);
        return _.isEqual(i, t) || (_.isFunction(n) ? n(Object(k.f)(e, t)) : appStore.dispatch(Object(k.f)(e, t))), !0
      }
      if (0 === e.indexOf("altrpforms.")) {
        if (!(e = e.replace("altrpforms.", ""))) return !1;
        var o = e.split("."), s = u()(o, 2), l = s[0], c = s[1], p = appStore.getState(), f = p.formsStore,
          d = _.get(f, e);
        if (console.log(t), _.isEqual(d, t)) return !0;
        console.log(t), _.isFunction(n) ? n(Object(Z.c)(e, t)) : appStore.dispatch(Object(Z.c)(c, t, l, !0))
      }
      if (0 === e.indexOf("altrpelements.")) {
        var h = e.split("."), m = u()(h, 4), g = (m[0], m[1]), v = m[2], y = m[3], b = Ie(g);
        if (!b) return !0;
        switch (v) {
          case"settings":
            return b.props.element.updateSetting(t, y), !0;
          default:
            return !0
        }
      }
      if (0 === e.indexOf("altrpareas.")) {
        var S = e.split("."), w = u()(S, 4), j = (w[0], w[1]), R = w[2], P = w[3],
          x = window.page_areas.find((function (e) {
            return e.id === j
          }));
        x && "settings" === R && (x instanceof te.a || (x = te.a.areaFabric(x)), x.setSetting(P, t))
      }
      if (0 === e.indexOf("altrpstorage.")) {
        e = e.replace("altrpstorage.", "");
        var C = ut("altrpstorage", {});
        return _.set(C, e, t), ct("altrpstorage", C), !0
      }
      return !1
    }

    function Oe() {
      var e, t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
        i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      if (!n) return r;
      if (-1 !== n.indexOf("{{") && (n = Ke(n, a)), i && 0 !== n.trim().indexOf("altrp")) return n;
      if (-1 !== (n = n.trim()).indexOf("?") && -1 !== n.indexOf(":")) {
        var o = n.split("?"), s = u()(o, 2), l = s[0], c = s[1], p = c.split(":"), f = u()(p, 2);
        e = f[0], t = f[1], -1 !== (e = e.trim()).indexOf(".") && (e = Oe(e, r, a)), -1 !== (t = t.trim()).indexOf(".") && (t = Oe(t, r, a)), n = l.trim()
      }
      var d = appStore.getState(), h = d.currentModel, m = d.currentDataStorage, v = d.altrpresponses, y = d.formsStore,
        b = d.altrpPageState, k = d.altrpPage, S = d.currentUser, w = d.altrpMeta;
      a && (h = a instanceof g.a ? a : new g.a(a));
      var O = window.currentRouterMatch instanceof g.a ? window.currentRouterMatch.getProperty("params") : {},
        E = P.a.parseUrl(window.location.href).query;
      O = _.assign(E, O);
      var j = r;
      if (!_.isString(n)) return j;
      if (0 === n.indexOf("altrpdata.")) n = n.replace("altrpdata.", ""), j = m ? m.getProperty(n, r) : ""; else if (0 === n.indexOf("altrpresponses.")) n = n.replace("altrpresponses.", ""), j = v ? v.getProperty(n, r) : ""; else if (0 === n.indexOf("altrpmeta.")) n = n.replace("altrpmeta.", ""), j = w ? w.getProperty(n, r) : ""; else if (0 === n.indexOf("altrppagestate.")) n = n.replace("altrppagestate.", ""), j = b ? b.getProperty(n, r) : ""; else if (0 === n.indexOf("altrpuser.")) n = n.replace("altrpuser.", ""), j = S ? S.getProperty(n, r) : ""; else if ("altrpuser" === n) j = S.getData(); else if ("altrpmodel" === n) j = h.getData(); else if (0 === n.indexOf("altrptime.")) j = Ae(n.replace("altrptime.", "")); else if (0 === n.indexOf("altrpforms.")) j = _.get(y, n.replace("altrpforms.", ""), r); else if (0 === n.indexOf("altrppage.")) j = k ? k.getProperty(n.replace("altrppage.", ""), r) : ""; else if (0 === n.indexOf("altrpelements.")) {
        var R = n.split("."), x = u()(R, 4), C = (x[0], x[1]), A = x[2], N = x[3], T = Ie(C);
        if (T) switch (A) {
          case"settings":
            j = T.props.element.getSettings(N);
            break;
          default:
            j = ""
        } else j = ""
      } else if (0 === n.indexOf("altrpstorage.")) n = n.replace("altrpstorage.", ""), j = ut("altrpstorage", {}), j = _.get(j, n, r); else if (0 === n.indexOf("altrpareas.")) {
        var M = n.split("."), D = u()(M, 4), L = (D[0], D[1]), B = D[2], F = D[3],
          I = window.page_areas.find((function (e) {
            return e.id === L
          }));
        I && "settings" === B && (I instanceof te.a || (I = te.a.areaFabric(I)), j = I.getSetting(F, r))
      } else (j = h.getProperty(n) ? h.getProperty(n) : O[n]) || (j = r);
      return (e || t) && (j = j ? e : t), j
    }

    function _e() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = "";
      return _.isString(e) && (t = _.get(e.match(/{{([\s\S]+?)(?=}})/g), "0", "").replace("{{", "")), t
    }

    function Ee() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = {};
      return e ? (_.forEach(t, (function (t, r) {
        0 === r.indexOf("".concat(e, "__"), "") && (n[r.replace("".concat(e, "__"), "")] = t)
      })), n) : n
    }

    function je(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      try {
        return JSON.parse(e)
      } catch (n) {
        return null === t ? e : t
      }
    }

    function Re() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "empty";
      switch (n) {
        case"empty":
          return _.isEmpty(e);
        case"not_empty":
          return !_.isEmpty(e);
        case"null":
          return !e;
        case"not_null":
          return !!e;
        case"==":
          return !e && !t || (_.isObject(e) || _.isObject(t) ? _.isEqual(e, t) : e == t);
        case"===":
          return _.isEqual(e, t);
        case"<>":
          return !_.isEqual(e, t);
        case">":
          return Number(e) > Number(t);
        case">=":
          return Number(e) >= Number(t);
        case"<":
          return Number(e) < Number(t);
        case"<=":
          return Number(e) <= Number(t);
        case"in":
          if (_.isString(t)) return -1 !== t.indexOf(e);
          if (!_.isArray(t)) return !1;
          var r = !1;
          return t.forEach((function (t) {
            r || (r = Re(e, t, "=="))
          })), r;
        case"not_in":
          return !Re(e, t, "in");
        case"contain":
          if (_.isString(e)) return -1 !== e.indexOf(t);
          if (!_.isArray(e)) return !1;
          var a = !1;
          return e.forEach((function (e) {
            a || (a = Re(t, e, "contain"))
          })), a;
        case"not_contain":
          return !Re(e, t, "contain")
      }
    }

    var Pe = [{value: "empty", label: "Empty"}, {value: "not_empty", label: "Not Empty"}, {
      value: "null",
      label: "Null"
    }, {value: "not_null", label: "Not Null"}, {value: "==", label: "Equals"}, {
      value: "<>",
      label: "Not Equals"
    }, {value: "between", label: "Between"}, {value: ">", label: ">"}, {value: ">=", label: ">="}, {
      value: "<",
      label: "<"
    }, {value: "<=", label: "<="}, {value: "in", label: "In"}, {value: "not_in", label: "Not In"}, {
      value: "contain",
      label: "Contain"
    }, {value: "not_contain", label: "Not Contain"}];

    function xe(e, t, n) {
      return e > t && e < t + n
    }

    function Ce(e) {
      for (var t = e.offsetTop; e.offsetParent;) t += (e = e.offsetParent).offsetTop;
      return t
    }

    function Ae(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = t;
      switch (e) {
        case"now":
          n = _.now();
          break;
        case"month_start":
          n = Ne(new Date);
          break;
        case"prev_month_start":
          n = Ne(new Date, -1);
          break;
        case"year_start":
          n = Te(new Date);
          break;
        case"prev_year_start":
          n = Te(new Date, -1);
          break;
        case"prev_week_start":
          n = He();
          break;
        case"next_week_start":
          n = Ge();
          break;
        case"week_start":
          n = Ue()
      }
      return n = y()(n).format("YYYY-MM-DD")
    }

    function Ne(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return new Date(e.getFullYear(), e.getMonth() + t, 1)
    }

    function Te(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return new Date(e.getFullYear() + t, 0, 1)
    }

    function Me(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return y()(new Date(e.getFullYear(), e.getMonth(), e.getDate() + 7 * t)).firstDayOfWeek()
    }

    function De() {
      return appStore.getState()
    }

    function Le(e, t) {
      var n = e.container;
      if (e instanceof HTMLElement) {
        n = e;
        var r = Object(ee.b)(t, e);
        r && (e.scrollTop = r)
      }
      if (n && _.isFunction(e.scrollTop)) {
        for (var a = t.offsetParent, i = t.offsetTop; a !== n;) {
          if (!a) return void console.log(i);
          i += a.offsetTop, a = a.offsetParent
        }
        console.log(i), i && e.scrollTop(i)
      }
    }

    function Be() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = null;
      return e && e.trim() ? (e = e.trim(), appStore.getState().elements.forEach((function (n) {
        n.elementWrapperRef.current && n.elementWrapperRef.current.id && -1 !== n.elementWrapperRef.current.id.toString().split(" ").indexOf(e) && (t = n.elementWrapperRef.current)
      })), t) : t
    }

    function Fe(e) {
      if (!e) return null;
      var t = null;
      return appStore.getState().elements.forEach((function (n) {
        e === n.props.element && (t = n.elementWrapperRef.current)
      })), t
    }

    function Ie() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = null;
      return e && e.trim() ? (e = e.trim(), appStore.getState().elements.forEach((function (n) {
        n.elementWrapperRef.current && n.elementWrapperRef.current.id && -1 !== n.elementWrapperRef.current.id.toString().split(" ").indexOf(e) && (t = n)
      })), t) : t
    }

    function Ge() {
      var e = y()(), t = 7 - (e.isoWeekday() - 1);
      return e.add(t, "days")
    }

    function Ue() {
      var e = y()(), t = e.isoWeekday() - 1;
      return e.subtract(t, "days")
    }

    function He() {
      var e = y()(), t = e.isoWeekday() - 1 + 7;
      return e.subtract(t, "days")
    }

    function ze() {
    }

    function Ke() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      if (window.SSR) return e;
      var n = _.isString(e) ? e.match(/{{([\s\S]+?)(?=}})/g) : null;
      return _.isArray(n) && n.forEach((function (n) {
        var r = Oe(n = n.replace("{{", ""), "", t);
        0 === r && (r = "0"), n = Ct(n), e = e.replace(new RegExp("{{".concat(n, "}}"), "g"), r || "")
      })), e
    }

    function We(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = window.open("", "my div", "height=400,width=1200");
      return n.document.write("<html><head><title>".concat(t, "</title></head>")), n.document.write("<body >"), (e = _.isArray(e) ? e : [e]).forEach((function (e) {
        n.document.write(e.outerHTML)
      })), n.document.write("</body></html>"), n.document.close(), n.focus(), n.print(), n.close(), !0
    }

    function qe(e) {
      return Je.apply(this, arguments)
    }

    function Je() {
      return (Je = l()(a.a.mark((function e(t) {
        var r, i, o, s = arguments;
        return a.a.wrap((function (e) {
          for (; ;) switch (e.prev = e.next) {
            case 0:
              return r = s.length > 1 && void 0 !== s[1] ? s[1] : "", e.next = 3, n.e(81).then(n.t.bind(null, 1389, 7));
            case 3:
              if (i = e.sent.default, t = t.body ? t.body : t) {
                e.next = 7;
                break
              }
              return e.abrupt("return", {success: !0});
            case 7:
              return (o = window.open("", "my div", "height=400,width=1440")).document.write("<html><head><title></title></head>"), o.document.write("</head><body >"), (t = _.isArray(t) ? t : [t]).forEach((function (e) {
                o.document.write(e.outerHTML)
              })), o.document.write("</body></html>"), e.abrupt("return", new Promise((function (e, t) {
                i().from(o.document.body).save(r), o.close(), e({success: !0})
              })));
            case 14:
            case"end":
              return e.stop()
          }
        }), e)
      })))).apply(this, arguments)
    }

    function Ve(e) {
      var t = [], n = [];
      if (!e || !e.querySelectorAll) return t;
      var r = e.querySelector(".altrp-table");
      if (!r && e.querySelector(".altrp-table-tr") && (r = e), !r) return t;
      var a = r.querySelectorAll(".altrp-table-th");
      _.each(a, (function (e) {
        n.push(e.innerText || "")
      }));
      var i = r.querySelectorAll(".altrp-table-tbody .altrp-table-tr");
      return _.each(i, (function (e) {
        var r = e.querySelectorAll(".altrp-table-td"), a = {};
        n.forEach((function (e, t) {
          e && (a[e] = r[t].innerText || "")
        })), t.push(a)
      })), t
    }

    function $e() {
      return Qe.apply(this, arguments)
    }

    function Qe() {
      return (Qe = l()(a.a.mark((function e() {
        var t, n, r, i, o, s, l = arguments;
        return a.a.wrap((function (e) {
          for (; ;) switch (e.prev = e.next) {
            case 0:
              if (t = l.length > 0 && void 0 !== l[0] ? l[0] : {}, n = (n = l.length > 1 ? l[1] : void 0) || "File", t) {
                e.next = 5;
                break
              }
              return e.abrupt("return", {success: !1});
            case 5:
              if (_.isObject() && !_.isArray(t) && (t = [t]), _.isArray(t)) {
                e.next = 8;
                break
              }
              return e.abrupt("return", {success: !1});
            case 8:
              return r = _.toPairs(t[0]).map((function (e) {
                var t = u()(e, 2), n = t[0];
                t[1];
                return n
              })), i = r.join(";") + "\n" + t.map((function (e) {
                var t = "";
                return r.forEach((function (n, a) {
                  var i = _.get(e, n) || "";
                  _.isObject(i) && (i = JSON.stringify(i)), t += (_.isString(i) ? i.replace(/\s/g, " ") : i) + (r.length === a + 1 ? "" : ";")
                })), t
              })).join("\n"), o = new Blob([i], {
                type: "text/csv",
                charset: "windows-1251"
              }), (s = document.createElement("a")).setAttribute("href", window.URL.createObjectURL(o)), s.setAttribute("download", n + ".csv"), document.body.appendChild(s), s.click(), document.body.removeChild(s), e.abrupt("return", {success: !0});
            case 18:
            case"end":
              return e.stop()
          }
        }), e)
      })))).apply(this, arguments)
    }

    function Ye(e) {
      return Ze.apply(this, arguments)
    }

    function Ze() {
      return (Ze = l()(a.a.mark((function e(t) {
        var n, r, i, o, s = arguments;
        return a.a.wrap((function (e) {
          for (; ;) switch (e.prev = e.next) {
            case 0:
              return n = s.length > 1 && void 0 !== s[1] ? s[1] : "table", r = s.length > 2 && void 0 !== s[2] ? s[2] : "", (i = new FormData).append("filename", n), i.append("data", JSON.stringify(t)), i.append("template", r), e.next = 8, fetch("/api/export-excel", {
                method: "POST",
                body: i
              });
            case 8:
              return o = e.sent, e.next = 11, o.blob();
            case 11:
              return e.abrupt("return", e.sent);
            case 12:
            case"end":
              return e.stop()
          }
        }), e)
      })))).apply(this, arguments)
    }

    function Xe() {
      return et.apply(this, arguments)
    }

    function et() {
      return (et = l()(a.a.mark((function e() {
        var t, n, r, i, o, s, l, c, u, p, f = arguments;
        return a.a.wrap((function (e) {
          for (; ;) switch (e.prev = e.next) {
            case 0:
              return t = f.length > 0 && void 0 !== f[0] ? f[0] : {}, n = f.length > 1 && void 0 !== f[1] ? f[1] : "login", t.altrpLogin = !0, e.prev = 3, e.next = 6, new b.a({route: "/login"}).post(t);
            case 6:
              r = e.sent, e.next = 22;
              break;
            case 9:
              if (e.prev = 9, e.t0 = e.catch(3), i = e.t0.status, !(e.t0.res instanceof Promise)) {
                e.next = 16;
                break
              }
              return e.next = 15, e.t0.res;
            case 15:
              r = e.sent;
            case 16:
              if (!(e.t0 instanceof Promise)) {
                e.next = 20;
                break
              }
              return e.next = 19, e.t0;
            case 19:
              r = e.sent;
            case 20:
              r = je(r, {}), i && (r.__status = i);
            case 22:
              if (appStore.dispatch(Object(X.c)(n, r)), r.success || r._token) {
                e.next = 25;
                break
              }
              return e.abrupt("return", {success: !1});
            case 25:
              return _token = r._token, e.next = 28, new b.a({route: "/ajax/current-user"}).getAll();
            case 28:
              return o = (o = e.sent).data, appStore.dispatch(Object(k.e)(o)), s = [], e.prev = 32, e.next = 35, new b.a({route: "/ajax/routes"}).getAll();
            case 35:
              l = e.sent, c = ae(l.pages);
              try {
                for (c.s(); !(u = c.n()).done;) p = u.value, s.push(w.a.routeFabric(p))
              } catch (e) {
                c.e(e)
              } finally {
                c.f()
              }
              appStore.dispatch(Object(S.b)(s)), e.next = 45;
              break;
            case 41:
              return e.prev = 41, e.t1 = e.catch(32), console.error(e.t1), e.abrupt("return", {success: !1});
            case 45:
              return e.abrupt("return", {success: !0});
            case 46:
            case"end":
              return e.stop()
          }
        }), e, null, [[3, 9], [32, 41]])
      })))).apply(this, arguments)
    }

    function tt() {
      return nt.apply(this, arguments)
    }

    function nt() {
      return (nt = l()(a.a.mark((function e() {
        var t, n, r, i, o, s, l;
        return a.a.wrap((function (e) {
          for (; ;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, new b.a({route: "/logout"}).post();
            case 2:
              if ((t = e.sent).success || t._token) {
                e.next = 5;
                break
              }
              return e.abrupt("return", {success: !1});
            case 5:
              return _token = t._token, e.next = 8, new b.a({route: "/ajax/current-user"}).getAll();
            case 8:
              return n = (n = e.sent).data, appStore.dispatch(Object(k.e)(n)), r = [], e.prev = 12, e.next = 15, new b.a({route: "/ajax/routes"}).getAll();
            case 15:
              i = e.sent, o = ae(i.pages);
              try {
                for (o.s(); !(s = o.n()).done;) l = s.value, r.push(w.a.routeFabric(l))
              } catch (e) {
                o.e(e)
              } finally {
                o.f()
              }
              appStore.dispatch(Object(S.b)(r)), e.next = 25;
              break;
            case 21:
              return e.prev = 21, e.t0 = e.catch(12), console.error(e.t0), e.abrupt("return", {success: !1});
            case 25:
              return e.abrupt("return", {success: !0});
            case 26:
            case"end":
              return e.stop()
          }
        }), e, null, [[12, 21]])
      })))).apply(this, arguments)
    }

    function rt(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 80;
      return e.length <= t ? e : e.slice(0, t) + "..."
    }

    function at(e, t) {
      return e.sort((function (e, t) {
        return e.label.toLowerCase() > t.label.toLowerCase() ? 1 : t.label.toLowerCase() > e.label.toLowerCase() ? -1 : 0
      })), "asc" === t ? e : e.reverse()
    }

    function it() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = 0;
      if (!t) return n;
      var r = _.get(e, t, []);
      return r.length ? (r.forEach((function (e) {
        n += it(e, t)
      })), n) : ++n
    }

    function ot() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = appStore.getState(),
        n = t.currentModel;
      e instanceof g.a && (e = e.getData());
      var r = e || n.getData(),
        a = _.cloneDeep(window.currentRouterMatch instanceof g.a ? window.currentRouterMatch.getProperty("params") : {}),
        i = new g.a(_.assign(a, r)), o = appStore.getState(), s = o.altrpPageState, l = o.altrpPage, c = o.altrpMeta,
        u = o.currentDataStorage, p = o.currentUser, f = o.altrpresponses, d = o.formsStore;
      return i.setProperty("altrpdata", u), i.setProperty("altrppagestate", s), i.setProperty("altrpmeta", c), i.setProperty("altrpuser", p), i.setProperty("altrpresponses", f), i.setProperty("altrpforms", d), i.setProperty("altrppage", l), i
    }

    function st(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      if (!e) return !1;
      var n = "widget_state".concat(e);
      return ct(n, t)
    }

    function lt(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      if (!e) return t;
      var n = "widget_state".concat(e);
      return ut(n, t)
    }

    function ct(e, t) {
      return !!e && (_.isObject(t) && (t = JSON.stringify(t)), localStorage.setItem(e, t), !0)
    }

    function ut(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      if (!e) return t;
      var n = localStorage.getItem(e);
      if (!n) return t;
      try {
        n = JSON.parse(n)
      } catch (e) {
        console.error(e)
      }
      return _.isString(n) && Number(n) && (n = Number(n)), n || t
    }

    function pt() {
      var e = document.createElement("div");
      e.setAttribute("style", "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;"), document.body.appendChild(e);
      var t = e.offsetWidth - e.clientWidth;
      return document.body.removeChild(e), t
    }

    function ft() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
      _.isArray(e) && e.forEach((function (e, t) {
        _.isObject(e) && (e instanceof g.a ? e.setProperty("altrpIndex", t) : e.altrpIndex = t)
      }))
    }

    function dt(e) {
      if (j.b[e] !== j.a) return null;
      e = e.replace(/ /g, "+");
      var t = "https://fonts.googleapis.com/css?family=" + (e += ":100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic") + "&subset=cyrillic";
      return t = encodeURI(t), React.createElement("link", {rel: "stylesheet", key: t, href: t})
    }

    function ht() {
      return window.location.href.indexOf("altrp-test=true") > 0
    }

    function mt() {
      return Math.random().toString(36).substr(2, 9)
    }

    function gt(e, t, n, r) {
      var a = n + r, i = Array.from({length: n}, (function (e, n) {
        return t - n - 1
      })).reverse(), s = Array.from({length: r}, (function (t, n) {
        return e - Math.floor(r / 2) + n
      }));
      return e + 1 < a ? [].concat(o()(Array(a).keys()), ["ellipsis"], o()(i)) : e >= t - n - 1 - Math.floor(r / 2) ? [].concat(o()(Array(n).keys()), ["ellipsis"], o()(Array.from({length: n + r}, (function (e, n) {
        return t - n - 1
      })).reverse())) : [].concat(o()(Array(n).keys()), ["ellipsis"], o()(s), ["ellipsis"], o()(i))
    }

    function vt(e, t) {
      return !(!e || e.length !== t.length) && (e.length && e.split("").every((function (e, n) {
        return e === t[n] || e.match(t[n])
      })))
    }

    function yt(e) {
      switch (e.data_type) {
        case"array":
          return new Y(e)
      }
      return new V
    }

    function bt(e, t) {
      if (_.isArray(e) && e.forEach((function (e) {
        var n = yt(e);
        console.log("===================================="), console.log(e, t), console.log("===================================="), t = n.convertData(t)
      })), e.data_type) {
        var n = yt(e);
        t = n.convertData(t)
      }
      return t
    }

    function kt(e, t, n, r) {
      return e ? null : React.createElement("span", {className: r}, t && t.assetType ? ve(t) : n)
    }

    function St(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      if (_.get(e, "toPrevPage") && frontAppRouter) frontAppRouter.history.goBack(); else if (_.get(e, "url")) {
        t.preventDefault(), t.stopPropagation();
        var r = e.url;
        r = Ke(r, n), e.openInNew ? window.open(r, "_blank") : frontAppRouter && ("a" === e.tag ? window.location.assign(r) : frontAppRouter.history.push(r))
      }
    }

    function wt(e) {
      return /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())
    }

    function Ot(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
        a = window.parent.appStore.getState(), i = a.currentScreen, s = "".concat(t, "_").concat(n, "_");
      if (i.name === m.default.DEFAULT_BREAKPOINT) {
        var l = e[s];
        return void 0 === l && (l = _.get(e, t, r)), l
      }
      var c = i.name, u = e[s = "".concat(t, "_").concat(n, "_").concat(c)];
      if (void 0 === u) {
        var p, f = ae(o()(m.default.SCREENS).reverse());
        try {
          for (f.s(); !(p = f.n()).done;) {
            var d = p.value;
            if (!(i.id < d.id || d.name === m.default.DEFAULT_BREAKPOINT) && void 0 !== e[s = "".concat(t, "_").concat(n, "_").concat(d.name)]) {
              u = e[s];
              break
            }
          }
        } catch (e) {
          f.e(e)
        } finally {
          f.f()
        }
      }
      return void 0 === u && (u = _.get(e, t, r)), u
    }

    function _t(e) {
      switch (e) {
        case"true":
          return !0;
        case"false":
          return !1;
        case"null":
          return null
      }
      return e
    }

    function Et(e) {
      return _.isString(e) && (e = Number(e)), new Promise((function (t, n) {
        setTimeout(t, e)
      }))
    }

    function jt(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      return _.isString(e) && e ? (0 !== (e = e.trim()).indexOf("http") && (e = location.origin + e), me(e, t)) : e
    }

    function Rt(e) {
      var t = e.indexOf("v=") + 2, n = e.indexOf("&", t);
      return e.substring(t, n)
    }

    function Pt(e) {
      return e.altrpdata = appStore.getState().currentDataStorage.getData(), e.altrpmodel = appStore.getState().currentModel.getData(), e.altrpuser = appStore.getState().currentUser.getData(), e.altrppagestate = appStore.getState().altrpPageState.getData(), e.altrpresponses = appStore.getState().altrpresponses.getData(), e.altrpmeta = appStore.getState().altrpMeta.getData(), e
    }

    function xt() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
      try {
        return JSON.parse(e), !0
      } catch (e) {
        return !1
      }
    }

    function Ct(e) {
      return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    }

    function At(e) {
      var t = e;
      if (Number(t)) return Number(t);
      switch (t) {
        case"true":
          return !0;
        case"false":
          return !1;
        case"null":
          return null;
        case"undefined":
          return;
        case"0":
          return 0
      }
      return t
    }

    function Nt() {
      var e = [];
      if (ue()) return e;
      var t = window.currentPageId, n = appStore.getState().appRoutes.routes, r = [], a = 0;
      return n.forEach((function (e, n) {
        t === e.id && (a = n)
      })), r.push(n[a]), n[a].parent_page_id && function e(t) {
        n.forEach((function (n) {
          n.id === t && (r.push(n), n.parent_page_id && e(n.parent_page_id))
        }))
      }(n[a].parent_page_id), e = r.reverse()
    }

    window.altrphelpers = {
      sumFields: function (e) {
        var t = 0;
        return _.isObject(this.context) ? (_.isArray(this.context) || (this.context = [this.context]), this.context.forEach((function (n) {
          t += Number(_.get(n, e)) || 0
        })), t) : t
      }
    }
  },
  210: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "CHANGE_CURRENT_MODEL";

    function a(e) {
      return {type: r, model: e}
    }
  },
  211: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    })), n.d(t, "c", (function () {
      return i
    })), n.d(t, "d", (function () {
      return o
    })), n.d(t, "e", (function () {
      return s
    })), n.d(t, "f", (function () {
      return l
    })), n.d(t, "g", (function () {
      return c
    })), n.d(t, "h", (function () {
      return u
    }));
    var r = "CHANGE_CURRENT_DATASOURCE", a = "CLEAR_CURRENT_DATASOURCE", i = "SET_CURRENT_DATASOURCE_LOADED",
      o = "SET_CURRENT_DATASOURCE_LOADING";

    function s(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return {type: r, data: t, dataStorageName: e}
    }

    function l() {
      return {type: a}
    }

    function c() {
      return {type: i}
    }

    function u() {
      return {type: o}
    }
  },
  212: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "DASHBOARD_EXPORT";

    function a(e) {
      return {type: r, payload: e}
    }
  },
  213: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "CHANGE_CURRENT_TITLE";

    function a(e) {
      return {type: r, title: e}
    }
  },
  214: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "ADD_MENU";

    function a(e) {
      return {type: r, menu: e}
    }
  },
  215: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return C
    })), n.d(t, "b", (function () {
      return N
    }));
    var r = n(37), a = n.n(r), i = n(0), o = n.n(i), s = n(26), l = n.n(s), c = n(1), u = n.n(c), p = n(19), f = n.n(p),
      d = n(20), h = n.n(d), m = n(23), g = n.n(m), v = n(24), y = n.n(v), b = n(22), k = n.n(b), S = n(9), w = n.n(S),
      O = n(240), E = n(58), j = n(21);

    function R(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function P(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? R(Object(n), !0).forEach((function (t) {
          l()(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : R(Object(n)).forEach((function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
      }
      return e
    }

    function x(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = k()(e);
        if (t) {
          var a = k()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return y()(this, n)
      }
    }

    var C = "google", A = function (e) {
      g()(r, e);
      var t, n = x(r);

      function r(e) {
        var t;
        return f()(this, r), (t = n.call(this, e)).state = {fonts: []}, t.helmetRef = w.a.createRef(), window.helmetRef = t.helmetRef, t
      }

      return h()(r, [{
        key: "componentDidMount", value: (t = u()(o.a.mark((function e() {
          return o.a.wrap((function (e) {
            for (; ;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, Object(j.delay)(1e3);
              case 2:
                this.setState((function (e) {
                  return P(P({}, e), {}, {renderFonts: !0})
                }));
              case 3:
              case"end":
                return e.stop()
            }
          }), e, this)
        }))), function () {
          return t.apply(this, arguments)
        })
      }, {
        key: "componentDidUpdate", value: function (e, t) {
          if (this.state.renderFonts) {
            var n = new Set;
            _.toPairs(this.props.altrpFonts.getData()).forEach((function (e) {
              var t = a()(e, 2), r = (t[0], t[1]);
              n.add(r)
            })), n = _.toArray(n), _.isEqual(n, this.state.fonts) || this.setState((function (e) {
              return P(P({}, e), {}, {fonts: n})
            }))
          }
        }
      }, {
        key: "render", value: function () {
          var e = this.state.fonts;
          return w.a.createElement(O.a, {ref: this.helmetRef}, e.map(j.renderFontLink))
        }
      }]), r
    }(S.Component);
    t.c = Object(E.b)((function (e) {
      return {altrpFonts: e.altrpFonts}
    }))(A);
    var N = {
      Arial: "system",
      Tahoma: "system",
      Verdana: "system",
      Helvetica: "system",
      "Times New Roman": "system",
      "Trebuchet MS": "system",
      Georgia: "system",
      ABeeZee: C,
      Abel: C,
      "Abhaya Libre": C,
      "Abril Fatface": C,
      Aclonica: C,
      Acme: C,
      Actor: C,
      Adamina: C,
      "Advent Pro": C,
      "Aguafina Script": C,
      Akronim: C,
      Aladin: C,
      Alata: C,
      Alatsi: C,
      Aldrich: C,
      Alef: C,
      Alegreya: C,
      "Alegreya SC": C,
      "Alegreya Sans": C,
      "Alegreya Sans SC": C,
      Aleo: C,
      "Alex Brush": C,
      "Alfa Slab One": C,
      Alice: C,
      Alike: C,
      "Alike Angular": C,
      Allan: C,
      Allerta: C,
      "Allerta Stencil": C,
      Allura: C,
      Almarai: C,
      Almendra: C,
      "Almendra Display": C,
      "Almendra SC": C,
      Amarante: C,
      Amaranth: C,
      "Amatic SC": C,
      Amethysta: C,
      Amiko: C,
      Amiri: C,
      Amita: C,
      Anaheim: C,
      Andada: C,
      Andika: C,
      Angkor: C,
      "Annie Use Your Telescope": C,
      "Anonymous Pro": C,
      Antic: C,
      "Antic Didone": C,
      "Antic Slab": C,
      Anton: C,
      Arapey: C,
      Arbutus: C,
      "Arbutus Slab": C,
      "Architects Daughter": C,
      Archivo: C,
      "Archivo Black": C,
      "Archivo Narrow": C,
      "Aref Ruqaa": C,
      "Arima Madurai": C,
      Arimo: C,
      Arizonia: C,
      Armata: C,
      Arsenal: C,
      Artifika: C,
      Arvo: C,
      Arya: C,
      Asap: C,
      "Asap Condensed": C,
      Asar: C,
      Asset: C,
      Assistant: C,
      Astloch: C,
      Asul: C,
      Athiti: C,
      Atma: C,
      "Atomic Age": C,
      Aubrey: C,
      Audiowide: C,
      "Autour One": C,
      Average: C,
      "Average Sans": C,
      "Averia Gruesa Libre": C,
      "Averia Libre": C,
      "Averia Sans Libre": C,
      "Averia Serif Libre": C,
      B612: C,
      "B612 Mono": C,
      "Bad Script": C,
      Bahiana: C,
      Bahianita: C,
      "Bai Jamjuree": C,
      "Baloo 2": C,
      "Baloo Bhai 2": C,
      "Baloo Bhaina 2": C,
      "Baloo Chettan 2": C,
      "Baloo Da 2": C,
      "Baloo Paaji 2": C,
      "Baloo Tamma 2": C,
      "Baloo Tammudu 2": C,
      "Baloo Thambi 2": C,
      "Balsamiq Sans": C,
      Balthazar: C,
      Bangers: C,
      Barlow: C,
      "Barlow Condensed": C,
      "Barlow Semi Condensed": C,
      Barriecito: C,
      Barrio: C,
      Basic: C,
      Baskervville: C,
      Battambang: C,
      Baumans: C,
      Bayon: C,
      "Be Vietnam": C,
      "Bebas Neue": C,
      Belgrano: C,
      Bellefair: C,
      Belleza: C,
      Bellota: C,
      "Bellota Text": C,
      BenchNine: C,
      Bentham: C,
      "Berkshire Swash": C,
      "Beth Ellen": C,
      Bevan: C,
      "Big Shoulders Display": C,
      "Big Shoulders Text": C,
      "Bigelow Rules": C,
      "Bigshot One": C,
      Bilbo: C,
      "Bilbo Swash Caps": C,
      BioRhyme: C,
      "BioRhyme Expanded": C,
      Biryani: C,
      Bitter: C,
      "Black And White Picture": C,
      "Black Han Sans": C,
      "Black Ops One": C,
      Blinker: C,
      Bokor: C,
      Bonbon: C,
      Boogaloo: C,
      "Bowlby One": C,
      "Bowlby One SC": C,
      Brawler: C,
      "Bree Serif": C,
      "Bubblegum Sans": C,
      "Bubbler One": C,
      Buda: C,
      Buenard: C,
      Bungee: C,
      "Bungee Hairline": C,
      "Bungee Inline": C,
      "Bungee Outline": C,
      "Bungee Shade": C,
      Butcherman: C,
      "Butterfly Kids": C,
      Cabin: C,
      "Cabin Condensed": C,
      "Cabin Sketch": C,
      "Caesar Dressing": C,
      Cagliostro: C,
      Cairo: C,
      Caladea: C,
      Calistoga: C,
      Calligraffitti: C,
      Cambay: C,
      Cambo: C,
      Candal: C,
      Cantarell: C,
      "Cantata One": C,
      "Cantora One": C,
      Capriola: C,
      Cardo: C,
      Carme: C,
      "Carrois Gothic": C,
      "Carrois Gothic SC": C,
      "Carter One": C,
      Catamaran: C,
      Caudex: C,
      Caveat: C,
      "Caveat Brush": C,
      "Cedarville Cursive": C,
      "Ceviche One": C,
      "Chakra Petch": C,
      Changa: C,
      "Changa One": C,
      Chango: C,
      Charm: C,
      Charmonman: C,
      Chathura: C,
      "Chau Philomene One": C,
      "Chela One": C,
      "Chelsea Market": C,
      Chenla: C,
      "Cherry Cream Soda": C,
      "Cherry Swash": C,
      Chewy: C,
      Chicle: C,
      Chilanka: C,
      Chivo: C,
      Chonburi: C,
      Cinzel: C,
      "Cinzel Decorative": C,
      "Clicker Script": C,
      Coda: C,
      "Coda Caption": C,
      Codystar: C,
      Coiny: C,
      Combo: C,
      Comfortaa: C,
      "Comic Neue": C,
      "Coming Soon": C,
      "Concert One": C,
      Condiment: C,
      Content: C,
      "Contrail One": C,
      Convergence: C,
      Cookie: C,
      Copse: C,
      Corben: C,
      Cormorant: C,
      "Cormorant Garamond": C,
      "Cormorant Infant": C,
      "Cormorant SC": C,
      "Cormorant Unicase": C,
      "Cormorant Upright": C,
      Courgette: C,
      "Courier Prime": C,
      Cousine: C,
      Coustard: C,
      "Covered By Your Grace": C,
      "Crafty Girls": C,
      Creepster: C,
      "Crete Round": C,
      "Crimson Pro": C,
      "Crimson Text": C,
      "Croissant One": C,
      Crushed: C,
      Cuprum: C,
      "Cute Font": C,
      Cutive: C,
      "Cutive Mono": C,
      "DM Mono": C,
      "DM Sans": C,
      "DM Serif Display": C,
      "DM Serif Text": C,
      Damion: C,
      "Dancing Script": C,
      Dangrek: C,
      "Darker Grotesque": C,
      "David Libre": C,
      "Dawning of a New Day": C,
      "Days One": C,
      Dekko: C,
      Delius: C,
      "Delius Swash Caps": C,
      "Delius Unicase": C,
      "Della Respira": C,
      "Denk One": C,
      Devonshire: C,
      Dhurjati: C,
      "Didact Gothic": C,
      Diplomata: C,
      "Diplomata SC": C,
      "Do Hyeon": C,
      Dokdo: C,
      Domine: C,
      "Donegal One": C,
      "Doppio One": C,
      Dorsa: C,
      Dosis: C,
      "Dr Sugiyama": C,
      "Duru Sans": C,
      Dynalight: C,
      "EB Garamond": C,
      "Eagle Lake": C,
      "East Sea Dokdo": C,
      Eater: C,
      Economica: C,
      Eczar: C,
      "El Messiri": C,
      Electrolize: C,
      Elsie: C,
      "Elsie Swash Caps": C,
      "Emblema One": C,
      "Emilys Candy": C,
      "Encode Sans": C,
      "Encode Sans Condensed": C,
      "Encode Sans Expanded": C,
      "Encode Sans Semi Condensed": C,
      "Encode Sans Semi Expanded": C,
      Engagement: C,
      Englebert: C,
      Enriqueta: C,
      "Erica One": C,
      Esteban: C,
      "Euphoria Script": C,
      Ewert: C,
      Exo: C,
      "Exo 2": C,
      "Expletus Sans": C,
      Fahkwang: C,
      "Fanwood Text": C,
      Farro: C,
      Farsan: C,
      Fascinate: C,
      "Fascinate Inline": C,
      "Faster One": C,
      Fasthand: C,
      "Fauna One": C,
      Faustina: C,
      Federant: C,
      Federo: C,
      Felipa: C,
      Fenix: C,
      "Finger Paint": C,
      "Fira Code": C,
      "Fira Mono": C,
      "Fira Sans": C,
      "Fira Sans Condensed": C,
      "Fira Sans Extra Condensed": C,
      "Fjalla One": C,
      "Fjord One": C,
      Flamenco: C,
      Flavors: C,
      Fondamento: C,
      "Fontdiner Swanky": C,
      Forum: C,
      "Francois One": C,
      "Frank Ruhl Libre": C,
      "Freckle Face": C,
      "Fredericka the Great": C,
      "Fredoka One": C,
      Freehand: C,
      Fresca: C,
      Frijole: C,
      Fruktur: C,
      "Fugaz One": C,
      "GFS Didot": C,
      "GFS Neohellenic": C,
      Gabriela: C,
      Gaegu: C,
      Gafata: C,
      Galada: C,
      Galdeano: C,
      Galindo: C,
      "Gamja Flower": C,
      Gayathri: C,
      Gelasio: C,
      "Gentium Basic": C,
      "Gentium Book Basic": C,
      Geo: C,
      Geostar: C,
      "Geostar Fill": C,
      "Germania One": C,
      Gidugu: C,
      "Gilda Display": C,
      Girassol: C,
      "Give You Glory": C,
      "Glass Antiqua": C,
      Glegoo: C,
      "Gloria Hallelujah": C,
      "Goblin One": C,
      "Gochi Hand": C,
      Gorditas: C,
      "Gothic A1": C,
      Gotu: C,
      "Goudy Bookletter 1911": C,
      Graduate: C,
      "Grand Hotel": C,
      "Gravitas One": C,
      "Great Vibes": C,
      Grenze: C,
      "Grenze Gotisch": C,
      Griffy: C,
      Gruppo: C,
      Gudea: C,
      Gugi: C,
      Gupter: C,
      Gurajada: C,
      Habibi: C,
      Halant: C,
      "Hammersmith One": C,
      Hanalei: C,
      "Hanalei Fill": C,
      Handlee: C,
      Hanuman: C,
      "Happy Monkey": C,
      Harmattan: C,
      "Headland One": C,
      Heebo: C,
      "Henny Penny": C,
      "Hepta Slab": C,
      "Herr Von Muellerhoff": C,
      "Hi Melody": C,
      Hind: C,
      "Hind Guntur": C,
      "Hind Madurai": C,
      "Hind Siliguri": C,
      "Hind Vadodara": C,
      "Holtwood One SC": C,
      "Homemade Apple": C,
      Homenaje: C,
      "IBM Plex Mono": C,
      "IBM Plex Sans": C,
      "IBM Plex Sans Condensed": C,
      "IBM Plex Serif": C,
      "IM Fell DW Pica": C,
      "IM Fell DW Pica SC": C,
      "IM Fell Double Pica": C,
      "IM Fell Double Pica SC": C,
      "IM Fell English": C,
      "IM Fell English SC": C,
      "IM Fell French Canon": C,
      "IM Fell French Canon SC": C,
      "IM Fell Great Primer": C,
      "IM Fell Great Primer SC": C,
      "Ibarra Real Nova": C,
      Iceberg: C,
      Iceland: C,
      Imprima: C,
      Inconsolata: C,
      Inder: C,
      "Indie Flower": C,
      Inika: C,
      "Inknut Antiqua": C,
      "Inria Sans": C,
      "Inria Serif": C,
      Inter: C,
      "Irish Grover": C,
      "Istok Web": C,
      Italiana: C,
      Italianno: C,
      Itim: C,
      "Jacques Francois": C,
      "Jacques Francois Shadow": C,
      Jaldi: C,
      "Jim Nightshade": C,
      "Jockey One": C,
      "Jolly Lodger": C,
      Jomhuria: C,
      Jomolhari: C,
      "Josefin Sans": C,
      "Josefin Slab": C,
      Jost: C,
      "Joti One": C,
      Jua: C,
      Judson: C,
      Julee: C,
      "Julius Sans One": C,
      Junge: C,
      Jura: C,
      "Just Another Hand": C,
      "Just Me Again Down Here": C,
      K2D: C,
      Kadwa: C,
      Kalam: C,
      Kameron: C,
      Kanit: C,
      Kantumruy: C,
      Karla: C,
      Karma: C,
      Katibeh: C,
      "Kaushan Script": C,
      Kavivanar: C,
      Kavoon: C,
      "Kdam Thmor": C,
      "Keania One": C,
      "Kelly Slab": C,
      Kenia: C,
      Khand: C,
      Khmer: C,
      Khula: C,
      "Kirang Haerang": C,
      "Kite One": C,
      Knewave: C,
      KoHo: C,
      Kodchasan: C,
      Kosugi: C,
      "Kosugi Maru": C,
      "Kotta One": C,
      Koulen: C,
      Kranky: C,
      Kreon: C,
      Kristi: C,
      "Krona One": C,
      Krub: C,
      "Kulim Park": C,
      "Kumar One": C,
      "Kumar One Outline": C,
      Kurale: C,
      "La Belle Aurore": C,
      Lacquer: C,
      Laila: C,
      "Lakki Reddy": C,
      Lalezar: C,
      Lancelot: C,
      Lateef: C,
      Lato: C,
      "League Script": C,
      "Leckerli One": C,
      Ledger: C,
      Lekton: C,
      Lemon: C,
      Lemonada: C,
      "Lexend Deca": C,
      "Lexend Exa": C,
      "Lexend Giga": C,
      "Lexend Mega": C,
      "Lexend Peta": C,
      "Lexend Tera": C,
      "Lexend Zetta": C,
      "Libre Barcode 128": C,
      "Libre Barcode 128 Text": C,
      "Libre Barcode 39": C,
      "Libre Barcode 39 Extended": C,
      "Libre Barcode 39 Extended Text": C,
      "Libre Barcode 39 Text": C,
      "Libre Baskerville": C,
      "Libre Caslon Display": C,
      "Libre Caslon Text": C,
      "Libre Franklin": C,
      "Life Savers": C,
      "Lilita One": C,
      "Lily Script One": C,
      Limelight: C,
      "Linden Hill": C,
      Literata: C,
      "Liu Jian Mao Cao": C,
      Livvic: C,
      Lobster: C,
      "Lobster Two": C,
      "Londrina Outline": C,
      "Londrina Shadow": C,
      "Londrina Sketch": C,
      "Londrina Solid": C,
      "Long Cang": C,
      Lora: C,
      "Love Ya Like A Sister": C,
      "Loved by the King": C,
      "Lovers Quarrel": C,
      "Luckiest Guy": C,
      Lusitana: C,
      Lustria: C,
      "M PLUS 1p": C,
      "M PLUS Rounded 1c": C,
      "Ma Shan Zheng": C,
      Macondo: C,
      "Macondo Swash Caps": C,
      Mada: C,
      Magra: C,
      "Maiden Orange": C,
      Maitree: C,
      "Major Mono Display": C,
      Mako: C,
      Mali: C,
      Mallanna: C,
      Mandali: C,
      Manjari: C,
      Manrope: C,
      Mansalva: C,
      Manuale: C,
      Marcellus: C,
      "Marcellus SC": C,
      "Marck Script": C,
      Margarine: C,
      "Markazi Text": C,
      "Marko One": C,
      Marmelad: C,
      Martel: C,
      "Martel Sans": C,
      Marvel: C,
      Mate: C,
      "Mate SC": C,
      "Maven Pro": C,
      McLaren: C,
      Meddon: C,
      MedievalSharp: C,
      "Medula One": C,
      "Meera Inimai": C,
      Megrim: C,
      "Meie Script": C,
      Merienda: C,
      "Merienda One": C,
      Merriweather: C,
      "Merriweather Sans": C,
      Metal: C,
      "Metal Mania": C,
      Metamorphous: C,
      Metrophobic: C,
      Michroma: C,
      Milonga: C,
      Miltonian: C,
      "Miltonian Tattoo": C,
      Mina: C,
      Miniver: C,
      "Miriam Libre": C,
      Mirza: C,
      "Miss Fajardose": C,
      Mitr: C,
      Modak: C,
      "Modern Antiqua": C,
      Mogra: C,
      Molengo: C,
      Molle: C,
      Monda: C,
      Monofett: C,
      Monoton: C,
      "Monsieur La Doulaise": C,
      Montaga: C,
      Montez: C,
      Montserrat: C,
      "Montserrat Alternates": C,
      "Montserrat Subrayada": C,
      Moul: C,
      Moulpali: C,
      "Mountains of Christmas": C,
      "Mouse Memoirs": C,
      "Mr Bedfort": C,
      "Mr Dafoe": C,
      "Mr De Haviland": C,
      "Mrs Saint Delafield": C,
      "Mrs Sheppards": C,
      Mukta: C,
      "Mukta Mahee": C,
      "Mukta Malar": C,
      "Mukta Vaani": C,
      Muli: C,
      MuseoModerno: C,
      "Mystery Quest": C,
      NTR: C,
      "Nanum Brush Script": C,
      "Nanum Gothic": C,
      "Nanum Gothic Coding": C,
      "Nanum Myeongjo": C,
      "Nanum Pen Script": C,
      Neucha: C,
      Neuton: C,
      "New Rocker": C,
      "News Cycle": C,
      Niconne: C,
      Niramit: C,
      "Nixie One": C,
      Nobile: C,
      Nokora: C,
      Norican: C,
      Nosifer: C,
      Notable: C,
      "Nothing You Could Do": C,
      "Noticia Text": C,
      "Noto Sans": C,
      "Noto Sans HK": C,
      "Noto Sans JP": C,
      "Noto Sans KR": C,
      "Noto Sans SC": C,
      "Noto Sans TC": C,
      "Noto Serif": C,
      "Noto Serif JP": C,
      "Noto Serif KR": C,
      "Noto Serif SC": C,
      "Noto Serif TC": C,
      "Nova Cut": C,
      "Nova Flat": C,
      "Nova Mono": C,
      "Nova Oval": C,
      "Nova Round": C,
      "Nova Script": C,
      "Nova Slim": C,
      "Nova Square": C,
      Numans: C,
      Nunito: C,
      "Nunito Sans": C,
      "Odibee Sans": C,
      "Odor Mean Chey": C,
      Offside: C,
      "Old Standard TT": C,
      Oldenburg: C,
      "Oleo Script": C,
      "Oleo Script Swash Caps": C,
      "Open Sans": C,
      "Open Sans Condensed": C,
      Oranienbaum: C,
      Orbitron: C,
      Oregano: C,
      Orienta: C,
      "Original Surfer": C,
      Oswald: C,
      "Over the Rainbow": C,
      Overlock: C,
      "Overlock SC": C,
      Overpass: C,
      "Overpass Mono": C,
      Ovo: C,
      Oxanium: C,
      Oxygen: C,
      "Oxygen Mono": C,
      "PT Mono": C,
      "PT Sans": C,
      "PT Sans Caption": C,
      "PT Sans Narrow": C,
      "PT Serif": C,
      "PT Serif Caption": C,
      Pacifico: C,
      Padauk: C,
      Palanquin: C,
      "Palanquin Dark": C,
      Pangolin: C,
      Paprika: C,
      Parisienne: C,
      "Passero One": C,
      "Passion One": C,
      "Pathway Gothic One": C,
      "Patrick Hand": C,
      "Patrick Hand SC": C,
      Pattaya: C,
      "Patua One": C,
      Pavanam: C,
      "Paytone One": C,
      Peddana: C,
      Peralta: C,
      "Permanent Marker": C,
      "Petit Formal Script": C,
      Petrona: C,
      Philosopher: C,
      Piedra: C,
      "Pinyon Script": C,
      "Pirata One": C,
      Plaster: C,
      Play: C,
      Playball: C,
      "Playfair Display": C,
      "Playfair Display SC": C,
      Podkova: C,
      "Poiret One": C,
      "Poller One": C,
      Poly: C,
      Pompiere: C,
      "Pontano Sans": C,
      "Poor Story": C,
      Poppins: C,
      "Port Lligat Sans": C,
      "Port Lligat Slab": C,
      "Pragati Narrow": C,
      Prata: C,
      Preahvihear: C,
      "Press Start 2P": C,
      Pridi: C,
      "Princess Sofia": C,
      Prociono: C,
      Prompt: C,
      "Prosto One": C,
      "Proza Libre": C,
      "Public Sans": C,
      Puritan: C,
      "Purple Purse": C,
      Quando: C,
      Quantico: C,
      Quattrocento: C,
      "Quattrocento Sans": C,
      Questrial: C,
      Quicksand: C,
      Quintessential: C,
      Qwigley: C,
      "Racing Sans One": C,
      Radley: C,
      Rajdhani: C,
      Rakkas: C,
      Raleway: C,
      "Raleway Dots": C,
      Ramabhadra: C,
      Ramaraja: C,
      Rambla: C,
      "Rammetto One": C,
      Ranchers: C,
      Rancho: C,
      Ranga: C,
      Rasa: C,
      Rationale: C,
      "Ravi Prakash": C,
      "Red Hat Display": C,
      "Red Hat Text": C,
      Redressed: C,
      "Reem Kufi": C,
      "Reenie Beanie": C,
      Revalia: C,
      "Rhodium Libre": C,
      Ribeye: C,
      "Ribeye Marrow": C,
      Righteous: C,
      Risque: C,
      Roboto: C,
      "Roboto Condensed": C,
      "Roboto Mono": C,
      "Roboto Slab": C,
      Rochester: C,
      "Rock Salt": C,
      Rokkitt: C,
      Romanesco: C,
      "Ropa Sans": C,
      Rosario: C,
      Rosarivo: C,
      "Rouge Script": C,
      "Rozha One": C,
      Rubik: C,
      "Rubik Mono One": C,
      Ruda: C,
      Rufina: C,
      "Ruge Boogie": C,
      Ruluko: C,
      "Rum Raisin": C,
      "Ruslan Display": C,
      "Russo One": C,
      Ruthie: C,
      Rye: C,
      Sacramento: C,
      Sahitya: C,
      Sail: C,
      Saira: C,
      "Saira Condensed": C,
      "Saira Extra Condensed": C,
      "Saira Semi Condensed": C,
      "Saira Stencil One": C,
      Salsa: C,
      Sanchez: C,
      Sancreek: C,
      Sansita: C,
      Sarabun: C,
      Sarala: C,
      Sarina: C,
      Sarpanch: C,
      Satisfy: C,
      "Sawarabi Gothic": C,
      "Sawarabi Mincho": C,
      Scada: C,
      Scheherazade: C,
      Schoolbell: C,
      "Scope One": C,
      "Seaweed Script": C,
      "Secular One": C,
      "Sedgwick Ave": C,
      "Sedgwick Ave Display": C,
      Sen: C,
      Sevillana: C,
      "Seymour One": C,
      "Shadows Into Light": C,
      "Shadows Into Light Two": C,
      Shanti: C,
      Share: C,
      "Share Tech": C,
      "Share Tech Mono": C,
      Shojumaru: C,
      "Short Stack": C,
      Shrikhand: C,
      Siemreap: C,
      "Sigmar One": C,
      Signika: C,
      "Signika Negative": C,
      Simonetta: C,
      "Single Day": C,
      Sintony: C,
      "Sirin Stencil": C,
      "Six Caps": C,
      Skranji: C,
      "Slabo 13px": C,
      "Slabo 27px": C,
      Slackey: C,
      Smokum: C,
      Smythe: C,
      Sniglet: C,
      Snippet: C,
      "Snowburst One": C,
      "Sofadi One": C,
      Sofia: C,
      Solway: C,
      "Song Myung": C,
      "Sonsie One": C,
      "Sorts Mill Goudy": C,
      "Source Code Pro": C,
      "Source Sans Pro": C,
      "Source Serif Pro": C,
      "Space Mono": C,
      Spartan: C,
      "Special Elite": C,
      Spectral: C,
      "Spectral SC": C,
      "Spicy Rice": C,
      Spinnaker: C,
      Spirax: C,
      "Squada One": C,
      "Sree Krushnadevaraya": C,
      Sriracha: C,
      Srisakdi: C,
      Staatliches: C,
      Stalemate: C,
      "Stalinist One": C,
      "Stardos Stencil": C,
      "Stint Ultra Condensed": C,
      "Stint Ultra Expanded": C,
      Stoke: C,
      Strait: C,
      Stylish: C,
      "Sue Ellen Francisco": C,
      "Suez One": C,
      "Sulphur Point": C,
      Sumana: C,
      Sunflower: C,
      Sunshiney: C,
      "Supermercado One": C,
      Sura: C,
      Suranna: C,
      Suravaram: C,
      Suwannaphum: C,
      "Swanky and Moo Moo": C,
      Syncopate: C,
      Tajawal: C,
      Tangerine: C,
      Taprom: C,
      Tauri: C,
      Taviraj: C,
      Teko: C,
      Telex: C,
      "Tenali Ramakrishna": C,
      "Tenor Sans": C,
      "Text Me One": C,
      Thasadith: C,
      "The Girl Next Door": C,
      Tienne: C,
      Tillana: C,
      Timmana: C,
      Tinos: C,
      "Titan One": C,
      "Titillium Web": C,
      Tomorrow: C,
      "Trade Winds": C,
      Trirong: C,
      Trocchi: C,
      Trochut: C,
      Trykker: C,
      "Tulpen One": C,
      "Turret Road": C,
      Ubuntu: C,
      "Ubuntu Condensed": C,
      "Ubuntu Mono": C,
      Ultra: C,
      "Uncial Antiqua": C,
      Underdog: C,
      "Unica One": C,
      UnifrakturCook: C,
      UnifrakturMaguntia: C,
      Unkempt: C,
      Unlock: C,
      Unna: C,
      VT323: C,
      "Vampiro One": C,
      Varela: C,
      "Varela Round": C,
      "Vast Shadow": C,
      "Vesper Libre": C,
      "Viaoda Libre": C,
      Vibes: C,
      Vibur: C,
      Vidaloka: C,
      Viga: C,
      Voces: C,
      Volkhov: C,
      Vollkorn: C,
      "Vollkorn SC": C,
      Voltaire: C,
      "Waiting for the Sunrise": C,
      Wallpoet: C,
      "Walter Turncoat": C,
      Warnes: C,
      Wellfleet: C,
      "Wendy One": C,
      "Wire One": C,
      "Work Sans": C,
      "Yanone Kaffeesatz": C,
      Yantramanav: C,
      "Yatra One": C,
      Yellowtail: C,
      "Yeon Sung": C,
      "Yeseva One": C,
      Yesteryear: C,
      Yrsa: C,
      "ZCOOL KuaiLe": C,
      "ZCOOL QingKe HuangYou": C,
      "ZCOOL XiaoWei": C,
      Zeyada: C,
      "Zhi Mang Xing": C,
      "Zilla Slab": C,
      "Zilla Slab Highlight": C
    }
  },
  216: function (e, t, n) {
    "use strict";
    var r = n(19), a = n.n(r), i = n(20), o = n.n(i), s = n(52), l = n(37), c = n.n(l), u = n(23), p = n.n(u),
      f = n(24), d = n.n(f), h = n(22), m = n.n(h), g = n(67), v = n(25), y = n(21);

    function b(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = m()(e);
        if (t) {
          var a = m()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return d()(this, n)
      }
    }

    var k = function (e) {
      p()(n, e);
      var t = b(n);

      function n() {
        return a()(this, n), t.apply(this, arguments)
      }

      return o()(n, [{
        key: "getWebUrl", value: function () {
          return this.getProperty("source.web_url").replace(/{([\s\S]+?)}/g, "")
        }
      }, {
        key: "getType", value: function () {
          return this.getProperty("source.type")
        }
      }, {
        key: "getAlias", value: function () {
          return this.getProperty("alias")
        }
      }, {
        key: "getParams", value: function () {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", t = g.a.getState(),
            n = (t.currentModel, t.currentDataStorage, this.getProperty("parameters")), r = {};
          return n ? ((n = Object(y.isJSON)(n) ? (n = Object(y.mbParseJSON)(n, [])).map((function (e) {
            return [e.paramName, e.paramValue]
          })) : (n = (n = n.split("\n")).filter((function (e) {
            return e
          }))).map((function (e) {
            return (e = e.split("|"))[0] = e[0].trim(), 1 === e.length ? e.push(e[0]) : e[1] = e[1].trim(), e
          }))).forEach((function (t) {
            var n = c()(t, 2), a = n[0], i = n[1];
            i.match(/{{([\s\S]+?)(?=}})/g) && (i = (i = i.trim()).match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", ""), i = e && 0 === i.indexOf(e) ? i : Object(y.getDataByPath)(i)), (i || 0 === i) && (r[a] = i)
          })), r) : null
        }
      }]), n
    }(v.a);

    function S(e, t) {
      var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!n) {
        if (Array.isArray(e) || (n = function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return w(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(e);
          if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return w(e, t)
        }(e)) || t && e && "number" == typeof e.length) {
          n && (e = n);
          var r = 0, a = function () {
          };
          return {
            s: a, n: function () {
              return r >= e.length ? {done: !0} : {done: !1, value: e[r++]}
            }, e: function (e) {
              throw e
            }, f: a
          }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }
      var i, o = !0, s = !1;
      return {
        s: function () {
          n = n.call(e)
        }, n: function () {
          var e = n.next();
          return o = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            o || null == n.return || n.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function w(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    var O = function () {
      function e(t) {
        a()(this, e), this.id = t.id, this.path = t.path, this.icon = t.icon, this.model = t.model, this.models = t.models, this.parent_page_id = t.parent_page_id, this.models || (this.models = t.model ? [t.model] : []), this.model = t.model, this.data_sources = t.data_sources || [], this.data_sources = this.data_sources.map((function (e) {
          return new k(e)
        })), this.title = t.title || "", this.allowed = t.allowed, this.redirect = t.redirect, this.lazy = t.lazy
      }

      return o()(e, null, [{
        key: "routeFabric", value: function (t) {
          var n = new e(t);
          n.areas = [], t.areas = t.areas || [];
          var r, a = S(t.areas);
          try {
            for (a.s(); !(r = a.n()).done;) {
              var i = r.value;
              n.areas.push(s.a.areaFabric(i))
            }
          } catch (e) {
            a.e(e)
          } finally {
            a.f()
          }
          return n
        }
      }]), e
    }();
    t.a = O
  },
  217: function (e, t, n) {
    "use strict";
    (function (e) {
      n.d(t, "a", (function () {
        return i
      }));
      var r = n(61);
      "undefined" == typeof _ && (e._ = n(60));
      var a = {};

      function i(e, t) {
        e = e || a;
        var n = _.cloneDeep(t.payload);
        switch (t.type) {
          case r.a:
            e = n
        }
        return e
      }
    }).call(this, n(29))
  },
  218: function (e, t, n) {
    "use strict";
    (function (e) {
      n.d(t, "a", (function () {
        return o
      }));
      var r = n(207), a = n(44);
      "undefined" == typeof window && (e.window = {});
      var i = a.default.SCREENS.find((function (e) {
        var t;
        if (!e.fullMediaQuery) return !1;
        var n = e.fullMediaQuery;
        return n = n.replace("@media", ""), void 0 !== window.matchMedia && (null === (t = window) || void 0 === t ? void 0 : t.matchMedia(n).matches)
      })) || a.default.SCREENS[0];

      function o(e, t) {
        switch (e = e || i, t.type) {
          case r.SET_CURRENT_SCREEN:
            e = t.screen
        }
        return e
      }
    }).call(this, n(29))
  },
  219: function (e, t, n) {
    "use strict";
    (function (e) {
      n.d(t, "a", (function () {
        return o
      }));
      var r, a = n(213);
      "undefined" == typeof document && (e.document = {});
      var i = (null === (r = document) || void 0 === r ? void 0 : r.title) || "";

      function o(e, t) {
        switch (e = e || i, t.type) {
          case a.a:
            e = t.title
        }
        return e
      }
    }).call(this, n(29))
  },
  22: function (e, t) {
    function n(t) {
      return e.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      }, n(t)
    }

    e.exports = n
  },
  220: function (e, t, n) {
    "use strict";
    (function (e) {
      n.d(t, "a", (function () {
        return s
      }));
      var r, a = n(65), i = n(25);
      "undefined" == typeof location && (e.location = {});
      var o = {url: (null === (r = location) || void 0 === r ? void 0 : r.href) || ""};

      function s(e, t) {
        switch (e = e || o, t.type) {
          case a.a:
            e = t.page;
            break;
          case a.b:
            (e = _.clone(e)).setProperty(t.propertyName, t.value)
        }
        return e instanceof i.a ? e : new i.a(e)
      }
    }).call(this, n(29))
  },
  23: function (e, t, n) {
    var r = n(53);
    e.exports = function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && r(e, t)
    }
  },
  238: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return p
    })), n.d(t, "b", (function () {
      return v
    }));
    var r = n(33), a = n(224), i = n(9), o = n.n(i), s = n(248), l = (n(31), n(34)), c = n(55), u = n(235),
      p = function (e) {
        function t() {
          for (var t, n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
          return (t = e.call.apply(e, [this].concat(r)) || this).history = Object(s.a)(t.props), t
        }

        return Object(a.a)(t, e), t.prototype.render = function () {
          return o.a.createElement(r.c, {history: this.history, children: this.props.children})
        }, t
      }(o.a.Component);
    o.a.Component;
    var f = function (e, t) {
      return "function" == typeof e ? e(t) : e
    }, d = function (e, t) {
      return "string" == typeof e ? Object(s.c)(e, null, null, t) : e
    }, h = function (e) {
      return e
    }, m = o.a.forwardRef;
    void 0 === m && (m = h);
    var g = m((function (e, t) {
      var n = e.innerRef, r = e.navigate, a = e.onClick, i = Object(c.a)(e, ["innerRef", "navigate", "onClick"]),
        s = i.target, u = Object(l.a)({}, i, {
          onClick: function (e) {
            try {
              a && a(e)
            } catch (t) {
              throw e.preventDefault(), t
            }
            e.defaultPrevented || 0 !== e.button || s && "_self" !== s || function (e) {
              return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
            }(e) || (e.preventDefault(), r())
          }
        });
      return u.ref = h !== m && t || n, o.a.createElement("a", u)
    }));
    var v = m((function (e, t) {
      var n = e.component, a = void 0 === n ? g : n, i = e.replace, s = e.to, p = e.innerRef,
        v = Object(c.a)(e, ["component", "replace", "to", "innerRef"]);
      return o.a.createElement(r.e.Consumer, null, (function (e) {
        e || Object(u.a)(!1);
        var n = e.history, r = d(f(s, e.location), e.location), c = r ? n.createHref(r) : "", g = Object(l.a)({}, v, {
          href: c, navigate: function () {
            var t = f(s, e.location);
            (i ? n.replace : n.push)(t)
          }
        });
        return h !== m ? g.ref = t || p : g.innerRef = p, o.a.createElement(a, g)
      }))
    })), y = function (e) {
      return e
    }, b = o.a.forwardRef;
    void 0 === b && (b = y);
    b((function (e, t) {
      var n = e["aria-current"], a = void 0 === n ? "page" : n, i = e.activeClassName, s = void 0 === i ? "active" : i,
        p = e.activeStyle, h = e.className, m = e.exact, g = e.isActive, k = e.location, S = e.sensitive, w = e.strict,
        O = e.style, _ = e.to, E = e.innerRef,
        j = Object(c.a)(e, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "sensitive", "strict", "style", "to", "innerRef"]);
      return o.a.createElement(r.e.Consumer, null, (function (e) {
        e || Object(u.a)(!1);
        var n = k || e.location, i = d(f(_, n), n), c = i.pathname,
          R = c && c.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"),
          P = R ? Object(r.f)(n.pathname, {path: R, exact: m, sensitive: S, strict: w}) : null, x = !!(g ? g(P, n) : P),
          C = x ? function () {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return t.filter((function (e) {
              return e
            })).join(" ")
          }(h, s) : h, A = x ? Object(l.a)({}, O, {}, p) : O,
          N = Object(l.a)({"aria-current": x && a || null, className: C, style: A, to: i}, j);
        return y !== b ? N.ref = t || E : N.innerRef = E, o.a.createElement(v, N)
      }))
    }))
  },
  239: function (e, t, n) {
    var r = {
      "./af": 71,
      "./af.js": 71,
      "./ar": 72,
      "./ar-dz": 73,
      "./ar-dz.js": 73,
      "./ar-kw": 74,
      "./ar-kw.js": 74,
      "./ar-ly": 75,
      "./ar-ly.js": 75,
      "./ar-ma": 76,
      "./ar-ma.js": 76,
      "./ar-sa": 77,
      "./ar-sa.js": 77,
      "./ar-tn": 78,
      "./ar-tn.js": 78,
      "./ar.js": 72,
      "./az": 79,
      "./az.js": 79,
      "./be": 80,
      "./be.js": 80,
      "./bg": 81,
      "./bg.js": 81,
      "./bm": 82,
      "./bm.js": 82,
      "./bn": 83,
      "./bn-bd": 84,
      "./bn-bd.js": 84,
      "./bn.js": 83,
      "./bo": 85,
      "./bo.js": 85,
      "./br": 86,
      "./br.js": 86,
      "./bs": 87,
      "./bs.js": 87,
      "./ca": 88,
      "./ca.js": 88,
      "./cs": 89,
      "./cs.js": 89,
      "./cv": 90,
      "./cv.js": 90,
      "./cy": 91,
      "./cy.js": 91,
      "./da": 92,
      "./da.js": 92,
      "./de": 93,
      "./de-at": 94,
      "./de-at.js": 94,
      "./de-ch": 95,
      "./de-ch.js": 95,
      "./de.js": 93,
      "./dv": 96,
      "./dv.js": 96,
      "./el": 97,
      "./el.js": 97,
      "./en-au": 98,
      "./en-au.js": 98,
      "./en-ca": 99,
      "./en-ca.js": 99,
      "./en-gb": 100,
      "./en-gb.js": 100,
      "./en-ie": 101,
      "./en-ie.js": 101,
      "./en-il": 102,
      "./en-il.js": 102,
      "./en-in": 103,
      "./en-in.js": 103,
      "./en-nz": 104,
      "./en-nz.js": 104,
      "./en-sg": 105,
      "./en-sg.js": 105,
      "./eo": 106,
      "./eo.js": 106,
      "./es": 107,
      "./es-do": 108,
      "./es-do.js": 108,
      "./es-mx": 109,
      "./es-mx.js": 109,
      "./es-us": 110,
      "./es-us.js": 110,
      "./es.js": 107,
      "./et": 111,
      "./et.js": 111,
      "./eu": 112,
      "./eu.js": 112,
      "./fa": 113,
      "./fa.js": 113,
      "./fi": 114,
      "./fi.js": 114,
      "./fil": 115,
      "./fil.js": 115,
      "./fo": 116,
      "./fo.js": 116,
      "./fr": 117,
      "./fr-ca": 118,
      "./fr-ca.js": 118,
      "./fr-ch": 119,
      "./fr-ch.js": 119,
      "./fr.js": 117,
      "./fy": 120,
      "./fy.js": 120,
      "./ga": 121,
      "./ga.js": 121,
      "./gd": 122,
      "./gd.js": 122,
      "./gl": 123,
      "./gl.js": 123,
      "./gom-deva": 124,
      "./gom-deva.js": 124,
      "./gom-latn": 125,
      "./gom-latn.js": 125,
      "./gu": 126,
      "./gu.js": 126,
      "./he": 127,
      "./he.js": 127,
      "./hi": 128,
      "./hi.js": 128,
      "./hr": 129,
      "./hr.js": 129,
      "./hu": 130,
      "./hu.js": 130,
      "./hy-am": 131,
      "./hy-am.js": 131,
      "./id": 132,
      "./id.js": 132,
      "./is": 133,
      "./is.js": 133,
      "./it": 134,
      "./it-ch": 135,
      "./it-ch.js": 135,
      "./it.js": 134,
      "./ja": 136,
      "./ja.js": 136,
      "./jv": 137,
      "./jv.js": 137,
      "./ka": 138,
      "./ka.js": 138,
      "./kk": 139,
      "./kk.js": 139,
      "./km": 140,
      "./km.js": 140,
      "./kn": 141,
      "./kn.js": 141,
      "./ko": 142,
      "./ko.js": 142,
      "./ku": 143,
      "./ku.js": 143,
      "./ky": 144,
      "./ky.js": 144,
      "./lb": 145,
      "./lb.js": 145,
      "./lo": 146,
      "./lo.js": 146,
      "./lt": 147,
      "./lt.js": 147,
      "./lv": 148,
      "./lv.js": 148,
      "./me": 149,
      "./me.js": 149,
      "./mi": 150,
      "./mi.js": 150,
      "./mk": 151,
      "./mk.js": 151,
      "./ml": 152,
      "./ml.js": 152,
      "./mn": 153,
      "./mn.js": 153,
      "./mr": 154,
      "./mr.js": 154,
      "./ms": 155,
      "./ms-my": 156,
      "./ms-my.js": 156,
      "./ms.js": 155,
      "./mt": 157,
      "./mt.js": 157,
      "./my": 158,
      "./my.js": 158,
      "./nb": 159,
      "./nb.js": 159,
      "./ne": 160,
      "./ne.js": 160,
      "./nl": 161,
      "./nl-be": 162,
      "./nl-be.js": 162,
      "./nl.js": 161,
      "./nn": 163,
      "./nn.js": 163,
      "./oc-lnc": 164,
      "./oc-lnc.js": 164,
      "./pa-in": 165,
      "./pa-in.js": 165,
      "./pl": 166,
      "./pl.js": 166,
      "./pt": 167,
      "./pt-br": 168,
      "./pt-br.js": 168,
      "./pt.js": 167,
      "./ro": 169,
      "./ro.js": 169,
      "./ru": 68,
      "./ru.js": 68,
      "./sd": 170,
      "./sd.js": 170,
      "./se": 171,
      "./se.js": 171,
      "./si": 172,
      "./si.js": 172,
      "./sk": 173,
      "./sk.js": 173,
      "./sl": 174,
      "./sl.js": 174,
      "./sq": 175,
      "./sq.js": 175,
      "./sr": 176,
      "./sr-cyrl": 177,
      "./sr-cyrl.js": 177,
      "./sr.js": 176,
      "./ss": 178,
      "./ss.js": 178,
      "./sv": 179,
      "./sv.js": 179,
      "./sw": 180,
      "./sw.js": 180,
      "./ta": 181,
      "./ta.js": 181,
      "./te": 182,
      "./te.js": 182,
      "./tet": 183,
      "./tet.js": 183,
      "./tg": 184,
      "./tg.js": 184,
      "./th": 185,
      "./th.js": 185,
      "./tk": 186,
      "./tk.js": 186,
      "./tl-ph": 187,
      "./tl-ph.js": 187,
      "./tlh": 188,
      "./tlh.js": 188,
      "./tr": 189,
      "./tr.js": 189,
      "./tzl": 190,
      "./tzl.js": 190,
      "./tzm": 191,
      "./tzm-latn": 192,
      "./tzm-latn.js": 192,
      "./tzm.js": 191,
      "./ug-cn": 193,
      "./ug-cn.js": 193,
      "./uk": 194,
      "./uk.js": 194,
      "./ur": 195,
      "./ur.js": 195,
      "./uz": 196,
      "./uz-latn": 197,
      "./uz-latn.js": 197,
      "./uz.js": 196,
      "./vi": 198,
      "./vi.js": 198,
      "./x-pseudo": 199,
      "./x-pseudo.js": 199,
      "./yo": 200,
      "./yo.js": 200,
      "./zh-cn": 201,
      "./zh-cn.js": 201,
      "./zh-hk": 202,
      "./zh-hk.js": 202,
      "./zh-mo": 203,
      "./zh-mo.js": 203,
      "./zh-tw": 204,
      "./zh-tw.js": 204
    };

    function a(e) {
      var t = i(e);
      return n(t)
    }

    function i(e) {
      if (!n.o(r, e)) {
        var t = new Error("Cannot find module '" + e + "'");
        throw t.code = "MODULE_NOT_FOUND", t
      }
      return r[e]
    }

    a.keys = function () {
      return Object.keys(r)
    }, a.resolve = i, e.exports = a, a.id = 239
  },
  24: function (e, t, n) {
    var r = n(42), a = n(28);
    e.exports = function (e, t) {
      return !t || "object" !== r(t) && "function" != typeof t ? a(e) : t
    }
  },
  25: function (e, t, n) {
    "use strict";
    var r = n(19), a = n.n(r), i = n(20), o = n.n(i), s = n(60), l = function () {
      function e() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        a()(this, e), this.data = Object(s.cloneDeep)(t)
      }

      return o()(e, [{
        key: "getData", value: function () {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
          return e ? Object(s.cloneDeep)(this.data) : this.data
        }
      }, {
        key: "isEmpty", value: function () {
          return Object(s.isEmpty)(this.data)
        }
      }, {
        key: "getProperty", value: function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          return Object(s.get)(this.data, e, t)
        }
      }, {
        key: "hasProperty", value: function (e) {
          return Object(s.has)(this.data, e)
        }
      }, {
        key: "setProperty", value: function (t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          return n instanceof e && (n = n.getData(!1)), Object(s.set)(this.data, t, n)
        }
      }, {
        key: "unsetProperty", value: function (e) {
          return Object(s.unset)(this.data, e)
        }
      }]), e
    }();
    t.a = l
  },
  26: function (e, t) {
    e.exports = function (e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e
    }
  },
  28: function (e, t) {
    e.exports = function (e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e
    }
  }, 317: function (e, t, n) {
    "use strict";
    var r = n(26), a = n.n(r), i = n(39), o = n.n(i), s = n(19), l = n.n(s), c = n(20), u = n.n(c), p = n(23),
      f = n.n(p), d = n(24), h = n.n(d), m = n(22), g = n.n(m), v = n(9), y = n.n(v), b = n(21), k = n(238);

    function S(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function w(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? S(Object(n), !0).forEach((function (t) {
          a()(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : S(Object(n)).forEach((function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
      }
      return e
    }

    function O(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = g()(e);
        if (t) {
          var a = g()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return h()(this, n)
      }
    }

    var E = function (e) {
      f()(n, e);
      var t = O(n);

      function n() {
        return l()(this, n), t.apply(this, arguments)
      }

      return u()(n, [{
        key: "render", value: function () {
          var e = this.props.className, t = {
            attributes: "",
            openInNew: !1,
            noFollow: !1,
            url: "/",
            tag: this.props.tag || "a",
            to: this.props.to || _.get(this, "props.link.url", "/"),
            href: this.props.href || _.get(this, "props.link.url", "/"),
            toPrevPage: !1
          };
          this.props.link && (t = w(w({}, t), this.props.link)), "nofollow" === this.props.rel && (t.noFollow = !0);
          var n = "";
          t.noFollow && (n = "noFollow");
          var r = null;
          "_black" === this.props.target && (r = "_black");
          var a = {};
          this.props.style && (a = this.props.style);
          var i = e;
          this.props.classlink && (i += " altrp-link " + this.props.classlink);
          var o = this.props.children;
          return (this.props.dangerouslySetInnerHTMLCondition || !1 === t.creativeLink) && (o = y.a.createElement("span", {
            className: "altrp-inherit",
            dangerouslySetInnerHTML: {__html: this.props.children}
          })), "a" === t.tag ? y.a.createElement("a", {
            href: t.href,
            rel: n,
            target: r,
            style: a,
            className: i,
            onClick: Object(b.isEditor)() ? function (e) {
              return e.preventDefault()
            } : function () {
            }
          }, o) : y.a.createElement(k.b, {
            style: a, className: i, onClick: Object(b.isEditor)() ? function (e) {
              return e.preventDefault()
            } : function () {
            }, to: t.to
          }, o)
        }
      }]), n
    }(v.Component);

    function j(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function R(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? j(Object(n), !0).forEach((function (t) {
          a()(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : j(Object(n)).forEach((function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
      }
      return e
    }

    function P(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = g()(e);
        if (t) {
          var a = g()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return h()(this, n)
      }
    }

    n.e(88).then(n.t.bind(null, 1392, 7));
    var x = function (e) {
      f()(n, e);
      var t = P(n);

      function n() {
        return l()(this, n), t.apply(this, arguments)
      }

      return u()(n, [{
        key: "render", value: function () {
          var e = y.a.createElement(E, o()({}, this.props, {
            link: this.props.link,
            className: this.props.className
          }), this.props.children), t = "";
          if (this.props.creativelink) {
            var n = this.props.creativelink, r = {label: "", size: "", style: ""};
            n && (r = R(R({}, r), n));
            var a = {};
            r.size ? a.transitionDuration = r.size + "s" : a.transitionDuration = "0.2s";
            var i = this.props.children, s = R(R({}, this.props.link), {}, {creativeLink: !0});
            switch (r.style) {
              case"none":
                t = "";
                break;
              case"cl-style-1":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-1-link"
                }), y.a.createElement("div", {className: "altrp-link-creative"}, y.a.createElement("div", {
                  className: "altrp-link-cl-style-1 altrp-link-cl-style-1-left",
                  style: a
                }, "["), i, y.a.createElement("div", {
                  className: "altrp-link-cl-style-1 altrp-link-cl-style-1-right",
                  style: a
                }, "]")));
                break;
              case"cl-style-2":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-2-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-2-container",
                  style: a
                }, i));
                break;
              case"cl-style-3":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-3-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-3", style: a}, i));
                break;
              case"cl-style-4":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-4-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-4", style: a}, i));
                break;
              case"cl-style-5":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-5-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-5",
                  style: a
                }, i, y.a.createElement("div", {className: "altrp-link-cl-style-5-clone"}, i)));
                break;
              case"cl-style-6":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-6-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-6", style: a}, i));
                break;
              case"cl-style-7":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-7-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-7", style: a}, i));
                break;
              case"cl-style-8":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-8-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-8", style: a}, i));
                break;
              case"cl-style-9":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-9-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-9",
                  style: a
                }, i, y.a.createElement("div", {className: "altrp-link-cl-style-9-description", style: a}, i)));
                break;
              case"cl-style-10":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-10-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-10",
                  "data-hover": i,
                  style: a
                }, y.a.createElement("div", {className: "altrp-link-cl-style-10-content"}, i)));
                break;
              case"cl-style-11":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-11-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-11",
                  "data-hover": i,
                  style: a
                }, i));
                break;
              case"cl-style-12":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-12-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-12", style: a}, i));
                break;
              case"cl-style-13":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-13-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-13", style: a}, i));
                break;
              case"cl-style-14":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-14-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-14", style: a}, i));
                break;
              case"cl-style-15":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-15-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-15",
                  "data-hover": i,
                  style: a
                }, i));
                break;
              case"cl-style-16":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-16-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-16",
                  "data-hover": i,
                  style: a
                }, i));
                break;
              case"cl-style-17":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-17-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-17",
                  "data-hover": i,
                  style: a
                }, i));
                break;
              case"cl-style-18":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-18-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-18", style: a}, i));
                break;
              case"cl-style-19":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-19-link"
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-19",
                  "data-hover": i,
                  style: a
                }, i));
                break;
              case"cl-style-20":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-20-link",
                  style: a
                }), y.a.createElement("div", {
                  className: "altrp-link-creative altrp-link-cl-style-20",
                  "data-hover": i,
                  style: a
                }, i));
                break;
              case"cl-style-21":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-21-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-21", style: a}, i));
                break;
              case"cl-style-22":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-22-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-22", style: a}, i));
                break;
              case"cl-style-23":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-23-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-23", style: a}, i));
                break;
              case"cl-style-24":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-24-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-24", style: a}, i));
                break;
              case"cl-style-25":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-25-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-25", style: a}, i));
                break;
              case"cl-style-26":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-26-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-26", style: a}, i));
                break;
              case"cl-style-27":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-27-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-27", style: a}, i));
                break;
              case"cl-style-28":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-28-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-28", style: a}, i));
                break;
              case"cl-style-29":
                t = y.a.createElement(E, o()({}, this.props, {
                  link: s,
                  classlink: "altrp-link-cl-style-29-link"
                }), y.a.createElement("div", {className: "altrp-link-creative altrp-link-cl-style-29", style: a}, i))
            }
          }
          return t || e
        }
      }]), n
    }(v.Component);
    t.a = x
  }, 35: function (e, t, n) {
    "use strict";
    var r = n(0), a = n.n(r), i = n(1), o = n.n(i), s = n(19), l = n.n(s), c = n(20), u = n.n(c), p = n(209),
      f = n.n(p), d = n(21);
    window.queryString = f.a;
    var h = function () {
      function e(t) {
        if (l()(this, e), this.route = t.route, this.dynamicURL = t.dynamicURL || !1, !this.route) throw"РќСѓР¶РµРЅ route"
      }

      var t;
      return u()(e, [{
        key: "getRoute", value: function () {
          return this.dynamicURL ? Object(d.replaceContentWithData)(this.route) : this.route
        }
      }, {
        key: "getAuthorList", value: function () {
          return fetch("/admin/ajax/users", {
            method: "get",
            headers: {"Content-Type": "application/json"}
          }).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "get", value: function (e) {
          e || console.error('Get only by "id"');
          var t, n = this.getRoute();
          return t = "/" === n[n.length - 1] ? n + e : n + "/" + e, fetch(t, {
            method: "get",
            headers: {"Content-Type": "application/json"}
          }).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "getInContext", value: function (e) {
          e || console.error('Get only by "id"');
          var t = this.getRoute().replace("{id}", e);
          return fetch(t, {method: "get", headers: {"Content-Type": "application/json"}}).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "getAll", value: function () {
          var e = this.getRoute();
          return fetch(e, {method: "get", headers: {"Content-Type": "application/json"}}).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "getAsText", value: function () {
          var e = this.getRoute();
          return fetch(e, {method: "get", headers: {"Content-Type": "text/plain"}}).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.text()
          }))
        }
      }, {
        key: "search", value: function (e) {
          var t;
          return t = -1 === this.getRoute().indexOf("?") ? this.getRoute() + "?s=".concat(e) : this.getRoute() + "&s=".concat(e), fetch(t, {
            method: "get",
            headers: {"Content-Type": "application/json"}
          }).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "post", value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 ? arguments[1] : void 0;
          t = _.assign({"X-CSRF-TOKEN": _token}, t);
          var n = new FormData, r = !1;
          _.each(e, (function (e, t) {
            if (_.isArray(e)) for (var a = 0; a < e.length; a++) e[a] instanceof File && (r = !0), e[a].size > 83886080 || n.append("".concat(t, "[").concat(a, "]"), e[a]); else n.append(t, e)
          })), r || (t["Content-Type"] = "application/json", t.Accept = "application/json");
          var a = {method: "POST", body: r ? n : JSON.stringify(e), headers: t};
          return fetch(this.getRoute(), a).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "postFiles", value: function (e, t) {
          t = t || "image";
          var n = {"X-CSRF-TOKEN": _token}, r = new FormData;
          (t = t.split(",")).forEach((function (t) {
            if (t) {
              t = t.trim();
              for (var n = 0; n < e.length; n++) e[n].size > 83886080 || r.append("files[".concat(n, "]"), e[n])
            }
          }));
          var a = {method: "POST", body: r, headers: n};
          return fetch(this.getRoute(), a).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "postFile", value: function (e) {
          var t = {"X-CSRF-TOKEN": _token}, n = new FormData;
          n.append("favicon", e);
          var r = {method: "POST", body: n, headers: t};
          return fetch(this.getRoute(), r).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "put", value: function (e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
          n = _.assign({"X-CSRF-TOKEN": _token}, n);
          var r = new FormData, a = !1;
          _.each(t, (function (e, t) {
            if (_.isArray(e)) for (var n = 0; n < e.length; n++) e[n] instanceof File && (a = !0), e[n].size > 83886080 ? console.log(e[n]) : r.append("".concat(t, "[").concat(n, "]"), e[n]); else r.append(t, e)
          })), a || (n["Content-Type"] = "application/json", n.Accept = "application/json");
          var i = {method: "put", body: a ? r : JSON.stringify(t), headers: n},
            o = this.getRoute() + (e ? "/" + e : "");
          return fetch(o, i).then((function (e) {
            return !1 === e.ok ? Promise.reject(e.text(), e.status) : e.json()
          }))
        }
      }, {
        key: "delete", value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = arguments.length > 2 ? arguments[2] : void 0, r = {
              method: "delete",
              headers: _.assign({
                "X-CSRF-TOKEN": _token,
                "Content-Type": "application/json",
                Accept: "application/json"
              }, n)
            };
          _.isEmpty(t) || (r.body = JSON.stringify(t));
          var a = this.getRoute() + (e ? "/" + e : "");
          return fetch(a, r).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "getOptions", value: function () {
          var e = this.getRoute() + "/options";
          return fetch(e, {method: "get", headers: {"Content-Type": "application/json"}}).then((function (e) {
            return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
          }))
        }
      }, {
        key: "getQueried", value: (t = o()(a.a.mark((function e(t) {
          var n, r, i, o, s, l = arguments;
          return a.a.wrap((function (e) {
            for (; ;) switch (e.prev = e.next) {
              case 0:
                return n = l.length > 1 && void 0 !== l[1] ? l[1] : null, r = {
                  method: "get",
                  headers: _.assign({"Content-Type": "application/json"}, n)
                }, i = {}, _.forEach(t, (function (e, t) {
                  _.isArray(e) && (e = e.join(",")), i[t] = e
                })), o = f.a.parseUrl(this.getRoute()).url, i = _.assign(f.a.parseUrl(this.route).query, i), o = "".concat(o, "?").concat(f.a.stringify(i)), e.next = 9, fetch(o, r).then((function (e) {
                  return !1 === e.ok ? Promise.reject({res: e.text(), status: e.status}) : e.json()
                }));
              case 9:
                return s = e.sent, e.abrupt("return", s);
              case 11:
              case"end":
                return e.stop()
            }
          }), e, this)
        }))), function (e) {
          return t.apply(this, arguments)
        })
      }]), e
    }();
    t.a = h
  }, 40: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "c", (function () {
      return a
    })), n.d(t, "d", (function () {
      return i
    })), n.d(t, "b", (function () {
      return o
    })), n.d(t, "e", (function () {
      return s
    })), n.d(t, "g", (function () {
      return l
    })), n.d(t, "h", (function () {
      return c
    })), n.d(t, "f", (function () {
      return u
    }));
    var r = "CHANGE_CURRENT_USER", a = "SET_NOTICE_FOR_USER", i = "SET_USERS_ONLINE",
      o = "CHANGE_CURRENT_USER_PROPERTY";

    function s(e) {
      return {type: r, user: e || {}}
    }

    function l(e) {
      return {type: a, notice: e}
    }

    function c(e) {
      return {type: i, members: e}
    }

    function u(e, t) {
      return {type: o, path: e || "", value: t || ""}
    }
  }, 42: function (e, t) {
    function n(t) {
      return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e.exports = n = function (e) {
        return typeof e
      } : e.exports = n = function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      }, n(t)
    }

    e.exports = n
  }, 43: function (e, t, n) {
    "use strict";
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    var r = Object.getOwnPropertySymbols, a = Object.prototype.hasOwnProperty,
      i = Object.prototype.propertyIsEnumerable;

    function o(e) {
      if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
      return Object(e)
    }

    e.exports = function () {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
        for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
        if ("0123456789" !== Object.getOwnPropertyNames(t).map((function (e) {
          return t[e]
        })).join("")) return !1;
        var r = {};
        return "abcdefghijklmnopqrst".split("").forEach((function (e) {
          r[e] = e
        })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
      } catch (e) {
        return !1
      }
    }() ? Object.assign : function (e, t) {
      for (var n, s, l = o(e), c = 1; c < arguments.length; c++) {
        for (var u in n = Object(arguments[c])) a.call(n, u) && (l[u] = n[u]);
        if (r) {
          s = r(n);
          for (var p = 0; p < s.length; p++) i.call(n, s[p]) && (l[s[p]] = n[s[p]])
        }
      }
      return l
    }
  }, 44: function (e, t, n) {
    "use strict";
    n.r(t);
    t.default = {
      TEMPLATE_UPDATED: "TEMPLATE_UPDATED",
      TEMPLATE_NEED_UPDATE: "TEMPLATE_NEED_UPDATE",
      TEMPLATE_SAVING: "TEMPLATE_SAVING",
      DEFAULT_BREAKPOINT: "DEFAULT_BREAKPOINT",
      DEFAULT_AREAS: ["content", "footer", "header", "popup", "email", "card", "reports"],
      SCREENS: [{
        icon: "wide_screen",
        name: "DEFAULT_BREAKPOINT",
        id: 1,
        width: "100%",
        fullMediaQuery: "",
        mediaQuery: ""
      }, {
        icon: "desktop",
        name: "Desktop",
        id: 2,
        width: "1440px",
        fullMediaQuery: "@media screen and (max-width: 1440px) and (min-width: 1025px)",
        mediaQuery: "@media screen and (max-width: 1440px)"
      }, {
        icon: "laptop",
        name: "Laptop",
        id: 3,
        fullMediaQuery: "@media screen and (max-width: 1024px) and (min-width: 769px)",
        width: "1024px",
        mediaQuery: "@media screen and (max-width: 1024px)"
      }, {
        icon: "tablet",
        name: "Tablet",
        id: 4,
        fullMediaQuery: "@media screen and (max-width: 768px) and (min-width: 451px)",
        width: "768px",
        mediaQuery: "@media screen and (max-width: 768px)"
      }, {
        icon: "big_phone",
        name: "Big-Phone",
        id: 5,
        width: "450px",
        fullMediaQuery: "@media screen and (max-width: 450px) and (min-width: 321px)",
        mediaQuery: "@media screen and (max-width: 450px)"
      }, {
        icon: "small_phone",
        name: "Small-Phone",
        id: 6,
        fullMediaQuery: "@media screen and (max-width: 320px)",
        width: "320px",
        mediaQuery: "@media screen and (max-width: 320px)"
      }]
    }
  }, 45: function (e, t, n) {
    "use strict";
    /** @license React v16.13.1
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */var r = n(43), a = "function" == typeof Symbol && Symbol.for, i = a ? Symbol.for("react.element") : 60103,
      o = a ? Symbol.for("react.portal") : 60106, s = a ? Symbol.for("react.fragment") : 60107,
      l = a ? Symbol.for("react.strict_mode") : 60108, c = a ? Symbol.for("react.profiler") : 60114,
      u = a ? Symbol.for("react.provider") : 60109, p = a ? Symbol.for("react.context") : 60110,
      f = a ? Symbol.for("react.forward_ref") : 60112, d = a ? Symbol.for("react.suspense") : 60113,
      h = a ? Symbol.for("react.memo") : 60115, m = a ? Symbol.for("react.lazy") : 60116,
      g = "function" == typeof Symbol && Symbol.iterator;

    function v(e) {
      for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    var y = {
      isMounted: function () {
        return !1
      }, enqueueForceUpdate: function () {
      }, enqueueReplaceState: function () {
      }, enqueueSetState: function () {
      }
    }, b = {};

    function k(e, t, n) {
      this.props = e, this.context = t, this.refs = b, this.updater = n || y
    }

    function S() {
    }

    function w(e, t, n) {
      this.props = e, this.context = t, this.refs = b, this.updater = n || y
    }

    k.prototype.isReactComponent = {}, k.prototype.setState = function (e, t) {
      if ("object" != typeof e && "function" != typeof e && null != e) throw Error(v(85));
      this.updater.enqueueSetState(this, e, t, "setState")
    }, k.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate")
    }, S.prototype = k.prototype;
    var O = w.prototype = new S;
    O.constructor = w, r(O, k.prototype), O.isPureReactComponent = !0;
    var _ = {current: null}, E = Object.prototype.hasOwnProperty, j = {key: !0, ref: !0, __self: !0, __source: !0};

    function R(e, t, n) {
      var r, a = {}, o = null, s = null;
      if (null != t) for (r in void 0 !== t.ref && (s = t.ref), void 0 !== t.key && (o = "" + t.key), t) E.call(t, r) && !j.hasOwnProperty(r) && (a[r] = t[r]);
      var l = arguments.length - 2;
      if (1 === l) a.children = n; else if (1 < l) {
        for (var c = Array(l), u = 0; u < l; u++) c[u] = arguments[u + 2];
        a.children = c
      }
      if (e && e.defaultProps) for (r in l = e.defaultProps) void 0 === a[r] && (a[r] = l[r]);
      return {$$typeof: i, type: e, key: o, ref: s, props: a, _owner: _.current}
    }

    function P(e) {
      return "object" == typeof e && null !== e && e.$$typeof === i
    }

    var x = /\/+/g, C = [];

    function A(e, t, n, r) {
      if (C.length) {
        var a = C.pop();
        return a.result = e, a.keyPrefix = t, a.func = n, a.context = r, a.count = 0, a
      }
      return {result: e, keyPrefix: t, func: n, context: r, count: 0}
    }

    function N(e) {
      e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > C.length && C.push(e)
    }

    function T(e, t, n) {
      return null == e ? 0 : function e(t, n, r, a) {
        var s = typeof t;
        "undefined" !== s && "boolean" !== s || (t = null);
        var l = !1;
        if (null === t) l = !0; else switch (s) {
          case"string":
          case"number":
            l = !0;
            break;
          case"object":
            switch (t.$$typeof) {
              case i:
              case o:
                l = !0
            }
        }
        if (l) return r(a, t, "" === n ? "." + M(t, 0) : n), 1;
        if (l = 0, n = "" === n ? "." : n + ":", Array.isArray(t)) for (var c = 0; c < t.length; c++) {
          var u = n + M(s = t[c], c);
          l += e(s, u, r, a)
        } else if (null === t || "object" != typeof t ? u = null : u = "function" == typeof (u = g && t[g] || t["@@iterator"]) ? u : null, "function" == typeof u) for (t = u.call(t), c = 0; !(s = t.next()).done;) l += e(s = s.value, u = n + M(s, c++), r, a); else if ("object" === s) throw r = "" + t, Error(v(31, "[object Object]" === r ? "object with keys {" + Object.keys(t).join(", ") + "}" : r, ""));
        return l
      }(e, "", t, n)
    }

    function M(e, t) {
      return "object" == typeof e && null !== e && null != e.key ? function (e) {
        var t = {"=": "=0", ":": "=2"};
        return "$" + ("" + e).replace(/[=:]/g, (function (e) {
          return t[e]
        }))
      }(e.key) : t.toString(36)
    }

    function D(e, t) {
      e.func.call(e.context, t, e.count++)
    }

    function L(e, t, n) {
      var r = e.result, a = e.keyPrefix;
      e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? B(e, r, n, (function (e) {
        return e
      })) : null != e && (P(e) && (e = function (e, t) {
        return {$$typeof: i, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner}
      }(e, a + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(x, "$&/") + "/") + n)), r.push(e))
    }

    function B(e, t, n, r, a) {
      var i = "";
      null != n && (i = ("" + n).replace(x, "$&/") + "/"), T(e, L, t = A(t, i, r, a)), N(t)
    }

    var F = {current: null};

    function I() {
      var e = F.current;
      if (null === e) throw Error(v(321));
      return e
    }

    var G = {
      ReactCurrentDispatcher: F,
      ReactCurrentBatchConfig: {suspense: null},
      ReactCurrentOwner: _,
      IsSomeRendererActing: {current: !1},
      assign: r
    };
    t.Children = {
      map: function (e, t, n) {
        if (null == e) return e;
        var r = [];
        return B(e, r, null, t, n), r
      }, forEach: function (e, t, n) {
        if (null == e) return e;
        T(e, D, t = A(null, null, t, n)), N(t)
      }, count: function (e) {
        return T(e, (function () {
          return null
        }), null)
      }, toArray: function (e) {
        var t = [];
        return B(e, t, null, (function (e) {
          return e
        })), t
      }, only: function (e) {
        if (!P(e)) throw Error(v(143));
        return e
      }
    }, t.Component = k, t.Fragment = s, t.Profiler = c, t.PureComponent = w, t.StrictMode = l, t.Suspense = d, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = G, t.cloneElement = function (e, t, n) {
      if (null == e) throw Error(v(267, e));
      var a = r({}, e.props), o = e.key, s = e.ref, l = e._owner;
      if (null != t) {
        if (void 0 !== t.ref && (s = t.ref, l = _.current), void 0 !== t.key && (o = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
        for (u in t) E.call(t, u) && !j.hasOwnProperty(u) && (a[u] = void 0 === t[u] && void 0 !== c ? c[u] : t[u])
      }
      var u = arguments.length - 2;
      if (1 === u) a.children = n; else if (1 < u) {
        c = Array(u);
        for (var p = 0; p < u; p++) c[p] = arguments[p + 2];
        a.children = c
      }
      return {$$typeof: i, type: e.type, key: o, ref: s, props: a, _owner: l}
    }, t.createContext = function (e, t) {
      return void 0 === t && (t = null), (e = {
        $$typeof: p,
        _calculateChangedBits: t,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }).Provider = {$$typeof: u, _context: e}, e.Consumer = e
    }, t.createElement = R, t.createFactory = function (e) {
      var t = R.bind(null, e);
      return t.type = e, t
    }, t.createRef = function () {
      return {current: null}
    }, t.forwardRef = function (e) {
      return {$$typeof: f, render: e}
    }, t.isValidElement = P, t.lazy = function (e) {
      return {$$typeof: m, _ctor: e, _status: -1, _result: null}
    }, t.memo = function (e, t) {
      return {$$typeof: h, type: e, compare: void 0 === t ? null : t}
    }, t.useCallback = function (e, t) {
      return I().useCallback(e, t)
    }, t.useContext = function (e, t) {
      return I().useContext(e, t)
    }, t.useDebugValue = function () {
    }, t.useEffect = function (e, t) {
      return I().useEffect(e, t)
    }, t.useImperativeHandle = function (e, t, n) {
      return I().useImperativeHandle(e, t, n)
    }, t.useLayoutEffect = function (e, t) {
      return I().useLayoutEffect(e, t)
    }, t.useMemo = function (e, t) {
      return I().useMemo(e, t)
    }, t.useReducer = function (e, t, n) {
      return I().useReducer(e, t, n)
    }, t.useRef = function (e) {
      return I().useRef(e)
    }, t.useState = function (e) {
      return I().useState(e)
    }, t.version = "16.13.1"
  }, 47: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    })), n.d(t, "c", (function () {
      return i
    })), n.d(t, "d", (function () {
      return o
    }));
    var r = "ADD_RESPONSE_DATA", a = "CLEAR_ALL_RESPONSE_DATA";

    function i(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return t.data && (t = t.data), {type: r, data: t, formId: e}
    }

    function o() {
      return {type: a}
    }
  }, 48: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    })), n.d(t, "c", (function () {
      return i
    })), n.d(t, "d", (function () {
      return o
    }));
    var r = "CHANGE_PAGE_STATE", a = "CLEAR_PAGE_STATE";

    function i(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return {type: r, stateName: e, stateValue: t}
    }

    function o() {
      return {type: a}
    }
  }, 49: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "CHANGE_APP_ROUTES";

    function a(e) {
      return {type: r, routes: e}
    }
  }, 50: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    })), n.d(t, "c", (function () {
      return i
    }));
    var r = "CHANGE_FORM_FIELD_VALUE", a = "CHANGE_FORM_FIELD_VALUE";

    function i(e, t, n, a) {
      return {type: r, fieldName: e, value: t, formId: n, changedField: a ? "".concat(n, ".").concat(e) : null}
    }
  }, 51: function (e, t, n) {
    "use strict";
    n.d(t, "b", (function () {
      return r
    })), n.d(t, "a", (function () {
      return a
    }));
    var r = "TOGGLE_TRIGGER", a = "SET_DEFAULT_TRIGGERS"
  }, 52: function (e, t, n) {
    "use strict";
    var r = n(26), a = n.n(r), i = n(19), o = n.n(i), s = n(20), l = n.n(s), c = function e() {
      o()(this, e)
    };

    function u(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function p(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? u(Object(n), !0).forEach((function (t) {
          a()(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach((function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
      }
      return e
    }

    var f = function () {
      function e() {
        o()(this, e)
      }

      return l()(e, [{
        key: "getTemplates", value: function () {
          return this.templates = this.templates || [], this.templates
        }
      }, {
        key: "isCustomArea", value: function () {
          return !!_.get(this.settings, "area_type")
        }
      }, {
        key: "getAreaClasses", value: function () {
          return this.CSSclasses || (this.CSSclasses = [], this.CSSclasses.push("app-area_id-".concat(this.id)), this.settings.sidebar_type && this.CSSclasses.push("app-area_".concat(this.settings.sidebar_type)), this.settings.sidebar_location && this.CSSclasses.push("app-area_sidebar-location-".concat(this.settings.sidebar_location))), this.CSSclasses
        }
      }, {
        key: "getCustomCSS", value: function () {
          var e = "";
          return _.isString(this.settings.custom_css) ? e = this.settings.custom_css.replace(/__selector__/g, ".app-area_id-".concat(this.id)) : e
        }
      }, {
        key: "setSetting", value: function (e, t) {
          var n = this;
          this.getSetting(e) !== t && (_.set(this.settings, e, t), this.component && this.component.setState((function (e) {
            return p(p({}, e), {}, {settings: p({}, n.settings)})
          })), window.currentRouteComponent && window.currentRouteComponent.setState((function (e) {
            return p(p({}, e), {}, {updateToken: Math.random()})
          })))
        }
      }, {
        key: "getSetting", value: function (e, t) {
          return _.get(this.settings, e, t)
        }
      }], [{
        key: "areaFabric", value: function (t) {
          var n = new e;
          return n.settings = t.settings, n.id = t.id, n.template = new c, n.template.data = t.template ? t.template.data : null, _.isString(n.template.data) && (n.template.data = JSON.parse(n.template.data)), n.template.id = t.template ? t.template.id : null, n.template.name = t.template ? t.template.name : "", "popups" === t.area_name && (n.templates = [], t.templates = t.templates || [], t.templates.forEach((function (e) {
            var t = new c;
            t.data = e ? e.data : null, _.isString(t.data) && (t.data = JSON.parse(t.data)), t.name = e ? e.name : "", t.id = e ? JSON.parse(e.id) : null, t.guid = e ? e.guid : null, t.template_settings = e ? e.template_settings : [], t.triggers = e ? e.triggers : {}, n.templates.push(t)
          }))), n
        }
      }]), e
    }();
    t.a = f
  }, 53: function (e, t) {
    function n(t, r) {
      return e.exports = n = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e
      }, n(t, r)
    }

    e.exports = n
  }, 54: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "CHANGE_ALTRP_META";

    function a(e, t) {
      return {type: r, metaValue: t, metaName: e}
    }
  }, 61: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }));
    var r = "EDIT_ELEMENT";

    function a(e) {
      return {type: r, payload: e}
    }
  }, 63: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    })), n.d(t, "c", (function () {
      return i
    })), n.d(t, "d", (function () {
      return o
    }));
    var r = "ADD_ELEMENT", a = "CLEAR_ELEMENTS";

    function i(e) {
      return {type: r, elementComponent: e}
    }

    function o() {
      return {type: a}
    }
  }, 64: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    })), n.d(t, "c", (function () {
      return i
    }));
    var r = "ADD_FONT", a = "REMOVE_FONT";

    function i(e, t, n) {
      return {type: r, elementId: e, controllerName: t, fontName: n}
    }
  }, 65: function (e, t, n) {
    "use strict";
    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    })), n.d(t, "c", (function () {
      return i
    }));
    var r = "CHANGE_CURRENT_PAGE", a = "CHANGE_CURRENT_PAGE_PROPERTY";

    function i(e, t) {
      return {type: a, propertyName: e, value: t}
    }
  }, 67: function (e, t, n) {
    "use strict";
    var r = n(69), a = n(49), i = {routes: []};
    var o = n(210), s = n(25), l = window.model_data || {};
    window.model_data && (l.altrpModelUpdated = !0);
    var c = n(50), u = {};
    var p = n(30), f = n.n(p), d = n(26), h = n.n(d), m = n(40), g = n(19), v = n.n(g), y = n(20), b = n.n(y),
      k = n(23), S = n.n(k), w = n(24), O = n.n(w), E = n(22), j = n.n(E);

    function R(e) {
      var t = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
          }))), !0
        } catch (e) {
          return !1
        }
      }();
      return function () {
        var n, r = j()(e);
        if (t) {
          var a = j()(this).constructor;
          n = Reflect.construct(r, arguments, a)
        } else n = r.apply(this, arguments);
        return O()(this, n)
      }
    }

    var P = function (e) {
      S()(n, e);
      var t = R(n);

      function n() {
        return v()(this, n), t.apply(this, arguments)
      }

      return b()(n, [{
        key: "isGuest", value: function () {
          return this.getProperty("is_guest", !1)
        }
      }, {
        key: "isAuth", value: function () {
          return this.getProperty("created_at", !1)
        }
      }, {
        key: "hasPermissions", value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          _.isArray(e) || (e = [e]);
          var t = this.getProperty("permissions", []);
          return _.find(t, (function (t) {
            return _.find(e, (function (e) {
              return parseInt(e) ? parseInt(e) === parseInt(t.id) : _.isString(e) ? e === t.name : void 0
            }))
          }))
        }
      }, {
        key: "hasRoles", value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          _.isArray(e) || (e = [e]);
          var t = this.getProperty("roles", []);
          return _.find(t, (function (t) {
            return _.find(e, (function (e) {
              return parseInt(e) ? parseInt(e) === parseInt(t.id) : _.isString(e) ? e === t.name : void 0
            }))
          }))
        }
      }, {
        key: "checkUserAllowed", value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
          return !!this.isAuth() && (t = _.isArray(t) ? t : [], !(e = _.isArray(e) ? e : []).length && !t.length || (!!this.hasPermissions(e) || !!this.hasRoles(t)))
        }
      }]), n
    }(s.a), x = n(35);

    function C(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
      }
      return n
    }

    function A(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? C(Object(n), !0).forEach((function (t) {
          h()(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : C(Object(n)).forEach((function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
      }
      return e
    }

    var N = window.current_user || {};
    var T = n(211), M = n(21), D = {};
    var L = n(206), B = {}, F = n(205), I = {popupID: null}, G = n(63), U = [];
    var H = n(51), z = [], K = n(47), W = {};
    var q = n(217), J = n(54), V = {};
    var $ = n(48), Q = {};
    var Y = n(64), Z = new s.a({});
    var X = {element: "test"};
    var ee = n(212), te = {};
    var ne = n(218), re = n(219), ae = n(208);
    var ie = n(220);
    var oe = n(214), se = window.altrpMenus || [];
    var le = Object(r.b)({
      appRoutes: function (e, t) {
        switch (e = e || i, t.type) {
          case a.a:
            e = {routes: t.routes}
        }
        return e
      }, currentModel: function (e, t) {
        switch (e = e || l, t.type) {
          case o.a:
            e = t.model
        }
        return e instanceof s.a ? e : new s.a(e)
      }, formsStore: function (e, t) {
        var n = t.type, r = t.formId, a = t.fieldName, i = t.value, o = t.changedField;
        switch (e = e || u, n) {
          case c.a:
            _.get(e, [r, a]) !== i && ((e = _.cloneDeep(e)).changedField = o, _.set(e, [r, a], i));
            break;
          case c.b:
            r ? (e = _.cloneDeep(e), _.set(e, [r], {})) : e = {}
        }
        return e
      }, currentUser: function (e, t) {
        var n;
        switch (e = e || N, null === (n = t.user) || void 0 === n || n.local_storage, t.type) {
          case m.a:
            e = t.user, Array.isArray(e.local_storage) && (e.local_storage = {});
            break;
          case m.b:
            var r = t.path, a = t.value;
            e.setProperty(r, a);
            var i = {local_storage: _.cloneDeep(e.getProperty("local_storage"))};
            new x.a({route: "/ajax/current-user"}).put("", i).then((function (e) {
              appStore.dispatch(Object(m.e)(e.data))
            })).catch((function (e) {
              return console.log(e)
            }));
            break;
          case m.c:
            var o, s = t.notice;
            e = A(A({}, e), {}, {notice: [].concat(f()((null === (o = e.data) || void 0 === o ? void 0 : o.notice) || []), [s])});
            break;
          case m.d:
            e = A(A({}, e), {}, {members: t.members}), console.log(e)
        }
        if (e instanceof P || (e = new P(e)), !window.SSR) {
          var l = document.getElementById("front-app");
          e.hasRoles("admin") ? l && l.classList.add("front-app_admin") : l && l.classList.remove("front-app_admin")
        }
        return e
      }, currentDataStorage: function (e, t) {
        switch (e = e || new s.a(D), t.type) {
          case T.a:
            var n = t.data;
            _.isArray(n) && Object(M.setAltrpIndex)(n), (e = _.cloneDeep(e)).setProperty(t.dataStorageName, n);
            break;
          case T.b:
            (e = new s.a({})).setProperty("currentDataStorageLoaded", !1);
            break;
          case T.c:
            (e = _.cloneDeep(e)).setProperty("currentDataStorageLoaded", !0);
            break;
          case T.d:
            (e = _.cloneDeep(e)).setProperty("currentDataStorageLoaded", !1)
        }
        return e instanceof s.a ? e : new s.a(e)
      }, scrollPosition: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : B,
          t = arguments.length > 1 ? arguments[1] : void 0, n = t.type, r = t.payload;
        switch (n) {
          case L.a:
            return r;
          default:
            return e
        }
      }, popupTrigger: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : I,
          t = arguments.length > 1 ? arguments[1] : void 0, n = t.type, r = t.payload;
        switch (n) {
          case F.a:
            return {popupID: e.popupID === r ? null : r};
          default:
            return e
        }
      }, elements: function (e, t) {
        switch (e = e || U, t.type) {
          case G.b:
            e = U;
            break;
          case G.a:
            _.isArray(e) || (e = U), e.push(t.elementComponent), e = f()(e)
        }
        return e
      }, hideTriggers: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : z,
          t = arguments.length > 1 ? arguments[1] : void 0, n = t.type, r = t.payload;
        switch (n) {
          case H.b:
            return e.includes(r) ? e.filter((function (e) {
              return e !== r
            })) : [].concat(f()(e), [r]);
          case H.a:
            return e.concat(r);
          default:
            return e
        }
      }, altrpresponses: function (e, t) {
        switch (e = e || new s.a(W), t.type) {
          case K.a:
            var n = t.data;
            _.isArray(n) && Object(M.setAltrpIndex)(n), (e = _.cloneDeep(e)).setProperty(t.formId, n);
            break;
          case K.b:
            e = new s.a({})
        }
        return e instanceof s.a ? e : new s.a(e)
      }, editElement: q.a, altrpMeta: function (e, t) {
        switch (e = e || new s.a(V), t.type) {
          case J.a:
            var n = t.metaValue;
            e = _.cloneDeep(e), _.isArray(n) && Object(M.setAltrpIndex)(n), e.setProperty(t.metaName, n)
        }
        return e instanceof s.a ? e : new s.a(e)
      }, altrpPageState: function (e, t) {
        switch (e = e || new s.a(Q), t.type) {
          case $.a:
            var n = t.stateValue;
            e = _.cloneDeep(e), _.isArray(n) && Object(M.setAltrpIndex)(n), e.setProperty(t.stateName, n);
            break;
          case $.b:
            e = new s.a(Q)
        }
        return e instanceof s.a ? e : new s.a(e)
      }, altrpFonts: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Z,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case Y.a:
            var n = t.elementId, r = t.controllerName, a = t.fontName;
            e.setProperty("".concat(n, "_").concat(r), a), e = _.clone(e);
            break;
          case Y.b:
            var i = t.elementId, o = t.controllerName;
            e.unsetProperty("".concat(i, "_").concat(o)), e = _.clone(e)
        }
        return e
      }, userLocalStorage: function (e, t) {
        var n = e || X;
        switch (t.type) {
          case"CHANGE_USER_LOCAL_STORAGE":
            n = e
        }
        return n
      }, exportDashboard: function (e, t) {
        e = e || te;
        var n = _.cloneDeep(t.payload);
        switch (t.type) {
          case ee.a:
            e = n
        }
        return e
      }, currentScreen: ne.a, currentTitle: re.a, currentEmailTemplate: function (e, t) {
        switch (e = e || null, t.type) {
          case ae.a:
            e = t.template
        }
        return e
      }, altrpPage: ie.a, altrpMenus: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : se,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case oe.a:
            if (e.find((function (e) {
              return e.guid === t.menu.guid
            }))) return e;
            (e = f()(e)).push(t.menu)
        }
        return e
      }
    }), ce = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
    var ue = Object(r.c)(le, ce);
    if (window.appStore = ue, window.ALTRP_DEBUG) {
      var pe = ue.dispatch;
      ue.dispatch = function (e) {
        console.trace(e), pe.bind(ue)(e)
      }
    }
    t.a = ue
  }, 70: function (e, t, n) {
    "use strict";

    function r(e, t) {
      var n;
      if (n = t instanceof HTMLElement ? t : t.view, !e || !n) return !1;
      if (!n.contains(e)) return !1;
      var r = a(e, n);
      if (!1 === r) return !1;
      return r < (t.getScrollTop ? t.getScrollTop() : n.scrollTop) + n.offsetHeight + 50
    }

    function a(e, t) {
      if (!(e && e.offsetParent && t && t.contains(e))) return !1;
      var n = 0;
      do {
        if (!e) return n;
        n += e.offsetTop
      } while ((e = e.offsetParent) !== t);
      return n
    }

    n.d(t, "a", (function () {
      return r
    })), n.d(t, "b", (function () {
      return a
    }))
  }, 9: function (e, t, n) {
    "use strict";
    e.exports = n(45)
  }
}]);
//# sourceMappingURL=dbf93a9c8aab4126d994.HeadingWidget.bundle.js.map
