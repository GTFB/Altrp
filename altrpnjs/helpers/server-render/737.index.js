exports.id = 737;
exports.ids = [737];
exports.modules = {

/***/ "./node_modules/@socket.io/component-emitter/index.js":
/***/ ((__unused_webpack_module, exports) => {

/**
 * Expose `Emitter`.
 */
exports.Q = Emitter;
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }

  return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {}; // all

  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  } // specific event


  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this; // remove all handlers

  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  } // remove specific handler


  var cb;

  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];

    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  } // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.


  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */


Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1),
      callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);

    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
}; // alias used for reserved events (protected method)


Emitter.prototype.emitReserved = Emitter.prototype.emit;
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */


Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

/***/ }),

/***/ "./node_modules/axios/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__("./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/http.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

var settle = __webpack_require__("./node_modules/axios/lib/core/settle.js");

var buildFullPath = __webpack_require__("./node_modules/axios/lib/core/buildFullPath.js");

var buildURL = __webpack_require__("./node_modules/axios/lib/helpers/buildURL.js");

var http = __webpack_require__("http");

var https = __webpack_require__("https");

var httpFollow = __webpack_require__("./node_modules/follow-redirects/index.js").http;

var httpsFollow = __webpack_require__("./node_modules/follow-redirects/index.js").https;

var url = __webpack_require__("url");

var zlib = __webpack_require__("zlib");

var VERSION = __webpack_require__("./node_modules/axios/lib/env/data.js").version;

var createError = __webpack_require__("./node_modules/axios/lib/core/createError.js");

var enhanceError = __webpack_require__("./node_modules/axios/lib/core/enhanceError.js");

var defaults = __webpack_require__("./node_modules/axios/lib/defaults.js");

var Cancel = __webpack_require__("./node_modules/axios/lib/cancel/Cancel.js");

var isHttps = /https:?/;
/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */

function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location; // Basic proxy authorization

  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  } // If a proxy is used, any redirects must also pass through the proxy


  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}
/*eslint consistent-return:0*/


module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var onCanceled;

    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    var resolve = function resolve(value) {
      done();
      resolvePromise(value);
    };

    var rejected = false;

    var reject = function reject(value) {
      done();
      rejected = true;
      rejectPromise(value);
    };

    var data = config.data;
    var headers = config.headers;
    var headerNames = {};
    Object.keys(headers).forEach(function storeLowerName(name) {
      headerNames[name.toLowerCase()] = name;
    }); // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69

    if ('user-agent' in headerNames) {
      // User-Agent is specified; handle case where no UA header is desired
      if (!headers[headerNames['user-agent']]) {
        delete headers[headerNames['user-agent']];
      } // Otherwise, use specified value

    } else {
      // Only set header if it hasn't been set in config
      headers['User-Agent'] = 'axios/' + VERSION;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {// Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', config));
      }

      if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
        return reject(createError('Request body larger than maxBodyLength limit', config));
      } // Add Content-Length header if data exists


      if (!headerNames['content-length']) {
        headers['Content-Length'] = data.length;
      }
    } // HTTP basic authentication


    var auth = undefined;

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    } // Parse url


    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth && headerNames.authorization) {
      delete headers[headerNames.authorization];
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: {
        http: config.httpAgent,
        https: config.httpsAgent
      },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;

    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];

      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });
          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }

            if (proxyElement === '*') {
              return true;
            }

            if (proxyElement[0] === '.' && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);

    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }

      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    } // Create the request


    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return; // uncompress the response body transparently if required

      var stream = res; // return the last request in case of redirects

      var lastRequest = res.req || req; // if no content, is HEAD request or decompress disabled we should not decompress

      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
          /*eslint default-case:0*/
          case 'gzip':
          case 'compress':
          case 'deflate':
            // add the unzipper to the body stream processing pipeline
            stream = stream.pipe(zlib.createUnzip()); // remove the content-encoding in order to not confuse downstream operations

            delete res.headers['content-encoding'];
            break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        var totalResponseBytes = 0;
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length; // make sure the content length is not over the maxContentLength if specified

          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            // stream.destoy() emit aborted event before calling reject() on Node.js v16
            rejected = true;
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded', config, null, lastRequest));
          }
        });
        stream.on('aborted', function handlerStreamAborted() {
          if (rejected) {
            return;
          }

          stream.destroy();
          reject(createError('error request aborted', config, 'ERR_REQUEST_ABORTED', lastRequest));
        });
        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });
        stream.on('end', function handleStreamEnd() {
          try {
            var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);

            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString(config.responseEncoding);

              if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                responseData = utils.stripBOM(responseData);
              }
            }

            response.data = responseData;
          } catch (err) {
            reject(enhanceError(err, config, err.code, response.request, response));
          }

          settle(resolve, reject, response);
        });
      }
    }); // Handle errors

    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    }); // set tcp keep alive to prevent drop connection by peer

    req.on('socket', function handleRequestSocket(socket) {
      // default interval of sending ack packet is 1 minute
      socket.setKeepAlive(true, 1000 * 60);
    }); // Handle request timeout

    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      var timeout = parseInt(config.timeout, 10);

      if (isNaN(timeout)) {
        reject(createError('error trying to parse `config.timeout` to int', config, 'ERR_PARSE_TIMEOUT', req));
        return;
      } // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.


      req.setTimeout(timeout, function handleRequestTimeout() {
        req.abort();
        var transitional = config.transitional || defaults.transitional;
        reject(createError('timeout of ' + timeout + 'ms exceeded', config, transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function (cancel) {
        if (req.aborted) return;
        req.abort();
        reject(!cancel || cancel && cancel.type ? new Cancel('canceled') : cancel);
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);

      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    } // Send the request


    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

var settle = __webpack_require__("./node_modules/axios/lib/core/settle.js");

var cookies = __webpack_require__("./node_modules/axios/lib/helpers/cookies.js");

var buildURL = __webpack_require__("./node_modules/axios/lib/helpers/buildURL.js");

var buildFullPath = __webpack_require__("./node_modules/axios/lib/core/buildFullPath.js");

var parseHeaders = __webpack_require__("./node_modules/axios/lib/helpers/parseHeaders.js");

var isURLSameOrigin = __webpack_require__("./node_modules/axios/lib/helpers/isURLSameOrigin.js");

var createError = __webpack_require__("./node_modules/axios/lib/core/createError.js");

var defaults = __webpack_require__("./node_modules/axios/lib/defaults.js");

var Cancel = __webpack_require__("./node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;

    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response); // Clean up request

      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        } // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request


        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        } // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'


        setTimeout(onloadend);
      };
    } // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || defaults.transitional;

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function (cancel) {
        if (!request) {
          return;
        }

        reject(!cancel || cancel && cancel.type ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);

      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

var bind = __webpack_require__("./node_modules/axios/lib/helpers/bind.js");

var Axios = __webpack_require__("./node_modules/axios/lib/core/Axios.js");

var mergeConfig = __webpack_require__("./node_modules/axios/lib/core/mergeConfig.js");

var defaults = __webpack_require__("./node_modules/axios/lib/defaults.js");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context); // Factory for creating new instances

  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Expose Cancel & CancelToken

axios.Cancel = __webpack_require__("./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__("./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__("./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = __webpack_require__("./node_modules/axios/lib/env/data.js").version; // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__("./node_modules/axios/lib/helpers/spread.js"); // Expose isAxiosError

axios.isAxiosError = __webpack_require__("./node_modules/axios/lib/helpers/isAxiosError.js");
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/***/ ((module) => {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__("./node_modules/axios/lib/cancel/Cancel.js");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this; // eslint-disable-next-line func-names

  this.promise.then(function (cancel) {
    if (!token._listeners) return;
    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }

    token._listeners = null;
  }); // eslint-disable-next-line func-names

  this.promise.then = function (onfulfilled) {
    var _resolve; // eslint-disable-next-line func-names


    var promise = new Promise(function (resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Subscribe to the cancel signal
 */


CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
/**
 * Unsubscribe from the cancel signal
 */


CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }

  var index = this._listeners.indexOf(listener);

  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

var buildURL = __webpack_require__("./node_modules/axios/lib/helpers/buildURL.js");

var InterceptorManager = __webpack_require__("./node_modules/axios/lib/core/InterceptorManager.js");

var dispatchRequest = __webpack_require__("./node_modules/axios/lib/core/dispatchRequest.js");

var mergeConfig = __webpack_require__("./node_modules/axios/lib/core/mergeConfig.js");

var validator = __webpack_require__("./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  if (!config.url) {
    throw new Error('Provided config url is not valid');
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  } // filter out skipped interceptors


  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  var newConfig = config;

  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();

    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  if (!config.url) {
    throw new Error('Provided config url is not valid');
  }

  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__("./node_modules/axios/lib/helpers/isAbsoluteURL.js");

var combineURLs = __webpack_require__("./node_modules/axios/lib/helpers/combineURLs.js");
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__("./node_modules/axios/lib/core/enhanceError.js");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

var transformData = __webpack_require__("./node_modules/axios/lib/core/transformData.js");

var isCancel = __webpack_require__("./node_modules/axios/lib/cancel/isCancel.js");

var defaults = __webpack_require__("./node_modules/axios/lib/defaults.js");

var Cancel = __webpack_require__("./node_modules/axios/lib/cancel/Cancel.js");
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData.call(config, config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/***/ ((module) => {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };

  return error;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }

    return source;
  } // eslint-disable-next-line consistent-return


  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };
  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__("./node_modules/axios/lib/core/createError.js");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

var defaults = __webpack_require__("./node_modules/axios/lib/defaults.js");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/

  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });
  return data;
};

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

var normalizeHeaderName = __webpack_require__("./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var enhanceError = __webpack_require__("./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__("./node_modules/axios/lib/adapters/http.js");
  }

  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data) || headers && headers['Content-Type'] === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }

          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;

/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/***/ ((module) => {

module.exports = {
  "version": "0.25.0"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/***/ ((module) => {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/***/ ((module) => {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");
/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */


module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && payload.isAxiosError === true;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js"); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/***/ ((module) => {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = __webpack_require__("./node_modules/axios/lib/env/data.js").version;

var validators = {}; // eslint-disable-next-line func-names

['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});
var deprecatedWarnings = {};
/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */

validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  } // eslint-disable-next-line func-names


  return function (value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true; // eslint-disable-next-line no-console

      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
    }

    return validator ? validator(value, opt, opts) : true;
  };
};
/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */


function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }

  var keys = Object.keys(options);
  var i = keys.length;

  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];

    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);

      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }

      continue;
    }

    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__("./node_modules/axios/lib/helpers/bind.js"); // utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return Array.isArray(val);
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */


function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge() {
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */


function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

/***/ }),

/***/ "./node_modules/backo2/index.js":
/***/ ((module) => {

/**
 * Expose `Backoff`.
 */
module.exports = Backoff;
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */


Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);

  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }

  return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */


Backoff.prototype.reset = function () {
  this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */


Backoff.prototype.setMin = function (min) {
  this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */


Backoff.prototype.setMax = function (max) {
  this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */


Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

exports.destroy = (() => {
  let warned = false;
  return () => {
    if (!warned) {
      warned = true;
      console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
  };
})();
/**
 * Colors.
 */


exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */


exports.log = console.debug || console.log || (() => {});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  let r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__("./node_modules/debug/src/common.js")(exports);
const {
  formatters
} = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};

/***/ }),

/***/ "./node_modules/debug/src/common.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__("./node_modules/ms/index.js");
  createDebug.destroy = destroy;
  Object.keys(env).forEach(key => {
    createDebug[key] = env[key];
  });
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    let hash = 0;

    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;

    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      const self = debug; // Set `diff` timestamp

      const curr = Number(new Date());
      const ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return '%';
        }

        index++;
        const formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          const val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.useColors = createDebug.useColors();
    debug.color = createDebug.selectColor(namespace);
    debug.extend = extend;
    debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }

        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }

        return enabledCache;
      },
      set: v => {
        enableOverride = v;
      }
    }); // Env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    return debug;
  }

  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    const len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }
  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */


  function disable() {
    const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
    createDebug.enable('');
    return namespaces;
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    let i;
    let len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */


  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }
  /**
  * XXX DO NOT USE. This is a temporary stub function.
  * XXX It WILL be removed in the next major release.
  */


  function destroy() {
    console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;

/***/ }),

/***/ "./node_modules/debug/src/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__("./node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__("./node_modules/debug/src/node.js");
}

/***/ }),

/***/ "./node_modules/debug/src/node.js":
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */
const tty = __webpack_require__("tty");

const util = __webpack_require__("util");
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(() => {}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  const supportsColor = __webpack_require__("./node_modules/supports-color/index.js");

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(key => {
  return /^debug_/i.test(key);
}).reduce((obj, key) => {
  // Camel-case
  const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  let val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  const {
    namespace: name,
    useColors
  } = this;

  if (useColors) {
    const c = this.color;
    const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
    const prefix = `  ${colorCode};1m${name} \u001B[0m`;
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log(...args) {
  return process.stderr.write(util.format(...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  const keys = Object.keys(exports.inspectOpts);

  for (let i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__("./node_modules/debug/src/common.js")(exports);
const {
  formatters
} = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).split('\n').map(str => str.trim()).join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/buffer-util.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const {
  EMPTY_BUFFER
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/constants.js");
/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */


function concat(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER;
  if (list.length === 1) return list[0];
  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) return target.slice(0, offset);
  return target;
}
/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */


function _mask(source, mask, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}
/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */


function _unmask(buffer, mask) {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}
/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */


function toArrayBuffer(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}
/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */


function toBuffer(data) {
  toBuffer.readOnly = true;
  if (Buffer.isBuffer(data)) return data;
  let buf;

  if (data instanceof ArrayBuffer) {
    buf = Buffer.from(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer.readOnly = false;
  }

  return buf;
}

try {
  const bufferUtil = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  module.exports = {
    concat,

    mask(source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);else bufferUtil.mask(source, mask, output, offset, length);
    },

    toArrayBuffer,
    toBuffer,

    unmask(buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);else bufferUtil.unmask(buffer, mask);
    }

  };
} catch (e)
/* istanbul ignore next */
{
  module.exports = {
    concat,
    mask: _mask,
    toArrayBuffer,
    toBuffer,
    unmask: _unmask
  };
}

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/constants.js":
/***/ ((module) => {

"use strict";


module.exports = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
  kListener: Symbol('kListener'),
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  NOOP: () => {}
};

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/event-target.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const {
  kForOnEventAttribute,
  kListener
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/constants.js");

const kCode = Symbol('kCode');
const kData = Symbol('kData');
const kError = Symbol('kError');
const kMessage = Symbol('kMessage');
const kReason = Symbol('kReason');
const kTarget = Symbol('kTarget');
const kType = Symbol('kType');
const kWasClean = Symbol('kWasClean');
/**
 * Class representing an event.
 */

class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(type) {
    this[kTarget] = null;
    this[kType] = type;
  }
  /**
   * @type {*}
   */


  get target() {
    return this[kTarget];
  }
  /**
   * @type {String}
   */


  get type() {
    return this[kType];
  }

}

Object.defineProperty(Event.prototype, 'target', {
  enumerable: true
});
Object.defineProperty(Event.prototype, 'type', {
  enumerable: true
});
/**
 * Class representing a close event.
 *
 * @extends Event
 */

class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(type, options = {}) {
    super(type);
    this[kCode] = options.code === undefined ? 0 : options.code;
    this[kReason] = options.reason === undefined ? '' : options.reason;
    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
  }
  /**
   * @type {Number}
   */


  get code() {
    return this[kCode];
  }
  /**
   * @type {String}
   */


  get reason() {
    return this[kReason];
  }
  /**
   * @type {Boolean}
   */


  get wasClean() {
    return this[kWasClean];
  }

}

Object.defineProperty(CloseEvent.prototype, 'code', {
  enumerable: true
});
Object.defineProperty(CloseEvent.prototype, 'reason', {
  enumerable: true
});
Object.defineProperty(CloseEvent.prototype, 'wasClean', {
  enumerable: true
});
/**
 * Class representing an error event.
 *
 * @extends Event
 */

class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(type, options = {}) {
    super(type);
    this[kError] = options.error === undefined ? null : options.error;
    this[kMessage] = options.message === undefined ? '' : options.message;
  }
  /**
   * @type {*}
   */


  get error() {
    return this[kError];
  }
  /**
   * @type {String}
   */


  get message() {
    return this[kMessage];
  }

}

Object.defineProperty(ErrorEvent.prototype, 'error', {
  enumerable: true
});
Object.defineProperty(ErrorEvent.prototype, 'message', {
  enumerable: true
});
/**
 * Class representing a message event.
 *
 * @extends Event
 */

class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(type, options = {}) {
    super(type);
    this[kData] = options.data === undefined ? null : options.data;
  }
  /**
   * @type {*}
   */


  get data() {
    return this[kData];
  }

}

Object.defineProperty(MessageEvent.prototype, 'data', {
  enumerable: true
});
/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */

const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {Function} listener The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, listener, options = {}) {
    let wrapper;

    if (type === 'message') {
      wrapper = function onMessage(data, isBinary) {
        const event = new MessageEvent('message', {
          data: isBinary ? data : data.toString()
        });
        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'close') {
      wrapper = function onClose(code, message) {
        const event = new CloseEvent('close', {
          code,
          reason: message.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });
        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'error') {
      wrapper = function onError(error) {
        const event = new ErrorEvent('error', {
          error,
          message: error.message
        });
        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'open') {
      wrapper = function onOpen() {
        const event = new Event('open');
        event[kTarget] = this;
        listener.call(this, event);
      };
    } else {
      return;
    }

    wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
    wrapper[kListener] = listener;

    if (options.once) {
      this.once(type, wrapper);
    } else {
      this.on(type, wrapper);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {Function} handler The listener to remove
   * @public
   */
  removeEventListener(type, handler) {
    for (const listener of this.listeners(type)) {
      if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
        this.removeListener(type, listener);
        break;
      }
    }
  }

};
module.exports = {
  CloseEvent,
  ErrorEvent,
  Event,
  EventTarget,
  MessageEvent
};

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/extension.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const {
  tokenChars
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/validation.js");
/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */


function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];else dest[name].push(elem);
}
/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */


function parse(header) {
  const offers = Object.create(null);
  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let code = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (i !== 0 && (code === 0x20
      /* ' ' */
      || code === 0x09)
      /* '\t' */
      ) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b
      /* ';' */
      || code === 0x2c
      /* ',' */
      ) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);

        if (code === 0x2c) {
          push(offers, name, params);
          params = Object.create(null);
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);

        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d
      /* '=' */
      && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (start === -1) start = i;else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22
        /* '"' */
        && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c
        /* '\' */
        ) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);

        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }

        push(params, paramName, value);

        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);

  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }

    push(offers, extensionName, params);
  }

  return offers;
}
/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */


function format(extensions) {
  return Object.keys(extensions).map(extension => {
    let configurations = extensions[extension];
    if (!Array.isArray(configurations)) configurations = [configurations];
    return configurations.map(params => {
      return [extension].concat(Object.keys(params).map(k => {
        let values = params[k];
        if (!Array.isArray(values)) values = [values];
        return values.map(v => v === true ? k : `${k}=${v}`).join('; ');
      })).join('; ');
    }).join(', ');
  }).join(', ');
}

module.exports = {
  format,
  parse
};

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/limiter.js":
/***/ ((module) => {

"use strict";


const kDone = Symbol('kDone');
const kRun = Symbol('kRun');
/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */

class Limiter {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(concurrency) {
    this[kDone] = () => {
      this.pending--;
      this[kRun]();
    };

    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }
  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */


  add(job) {
    this.jobs.push(job);
    this[kRun]();
  }
  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */


  [kRun]() {
    if (this.pending === this.concurrency) return;

    if (this.jobs.length) {
      const job = this.jobs.shift();
      this.pending++;
      job(this[kDone]);
    }
  }

}

module.exports = Limiter;

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/permessage-deflate.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const zlib = __webpack_require__("zlib");

const bufferUtil = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/buffer-util.js");

const Limiter = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/limiter.js");

const {
  kStatusCode
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/constants.js");

const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError = Symbol('error'); //
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//

let zlibLimiter;
/**
 * permessage-deflate implementation.
 */

class PerMessageDeflate {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold = this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;
    this.params = null;

    if (!zlibLimiter) {
      const concurrency = this._options.concurrencyLimit !== undefined ? this._options.concurrencyLimit : 10;
      zlibLimiter = new Limiter(concurrency);
    }
  }
  /**
   * @type {String}
   */


  static get extensionName() {
    return 'permessage-deflate';
  }
  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */


  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }

    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }

    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }

    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }
  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */


  accept(configurations) {
    configurations = this.normalizeParams(configurations);
    this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
    return this.params;
  }
  /**
   * Releases all resources used by the extension.
   *
   * @public
   */


  cleanup() {
    if (this._inflate) {
      this._inflate.close();

      this._inflate = null;
    }

    if (this._deflate) {
      const callback = this._deflate[kCallback];

      this._deflate.close();

      this._deflate = null;

      if (callback) {
        callback(new Error('The deflate stream was closed while data was being processed'));
      }
    }
  }
  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */


  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find(params => {
      if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === 'number' && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === 'number' && !params.client_max_window_bits) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }

    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }

    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }

    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }
  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */


  acceptAsClient(response) {
    const params = response[0];

    if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === 'number' && params.client_max_window_bits > this._options.clientMaxWindowBits) {
      throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
    }

    return params;
  }
  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */


  normalizeParams(configurations) {
    configurations.forEach(params => {
      Object.keys(params).forEach(key => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;

            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
            }

            value = num;
          } else if (!this._isServer) {
            throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;

          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
          }

          value = num;
        } else if (key === 'client_no_context_takeover' || key === 'server_no_context_takeover') {
          if (value !== true) {
            throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });
    return configurations;
  }
  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */


  decompress(data, fin, callback) {
    zlibLimiter.add(done => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }
  /**
   * Compress data. Concurrency limited.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */


  compress(data, fin, callback) {
    zlibLimiter.add(done => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }
  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */


  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits = typeof this.params[key] !== 'number' ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
      this._inflate = zlib.createInflateRaw({ ...this._options.zlibInflateOptions,
        windowBits
      });
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];

      this._inflate.on('error', inflateOnError);

      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);

    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError];

      if (err) {
        this._inflate.close();

        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(this._inflate[kBuffers], this._inflate[kTotalLength]);

      if (this._inflate._readableState.endEmitted) {
        this._inflate.close();

        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.reset();
        }
      }

      callback(null, data);
    });
  }
  /**
   * Compress data.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */


  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits = typeof this.params[key] !== 'number' ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
      this._deflate = zlib.createDeflateRaw({ ...this._options.zlibDeflateOptions,
        windowBits
      });
      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kCallback] = callback;

    this._deflate.write(data);

    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // The deflate stream was closed while data was being processed.
        //
        return;
      }

      let data = bufferUtil.concat(this._deflate[kBuffers], this._deflate[kTotalLength]);
      if (fin) data = data.slice(0, data.length - 4); //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //

      this._deflate[kCallback] = null;
      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.reset();
      }

      callback(null, data);
    });
  }

}

module.exports = PerMessageDeflate;
/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */

function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}
/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */


function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new RangeError('Max payload size exceeded');
  this[kError].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
  this[kError][kStatusCode] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}
/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */


function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode] = 1007;
  this[kCallback](err);
}

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/receiver.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const {
  Writable
} = __webpack_require__("stream");

const PerMessageDeflate = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/permessage-deflate.js");

const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  kStatusCode,
  kWebSocket
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/constants.js");

const {
  concat,
  toArrayBuffer,
  unmask
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/buffer-util.js");

const {
  isValidStatusCode,
  isValidUTF8
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/validation.js");

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;
/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */

class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(options = {}) {
    super();
    this._binaryType = options.binaryType || BINARY_TYPES[0];
    this._extensions = options.extensions || {};
    this._isServer = !!options.isServer;
    this._maxPayload = options.maxPayload | 0;
    this._skipUTF8Validation = !!options.skipUTF8Validation;
    this[kWebSocket] = undefined;
    this._bufferedBytes = 0;
    this._buffers = [];
    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;
    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];
    this._state = GET_INFO;
    this._loop = false;
  }
  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */


  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();
    this._bufferedBytes += chunk.length;

    this._buffers.push(chunk);

    this.startLoop(cb);
  }
  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */


  consume(n) {
    this._bufferedBytes -= n;
    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }
  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */


  startLoop(cb) {
    let err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;

        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;

        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;

        case GET_MASK:
          this.getMask();
          break;

        case GET_DATA:
          err = this.getData(cb);
          break;

        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }
  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */


  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002, 'WS_ERR_UNEXPECTED_RSV_2_3');
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this._loop = false;
      return error(RangeError, 'RSV1 must be clear', true, 1002, 'WS_ERR_UNEXPECTED_RSV_1');
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002, 'WS_ERR_UNEXPECTED_RSV_1');
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(RangeError, 'invalid opcode 0', true, 1002, 'WS_ERR_INVALID_OPCODE');
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002, 'WS_ERR_INVALID_OPCODE');
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(RangeError, 'FIN must be set', true, 1002, 'WS_ERR_EXPECTED_FIN');
      }

      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002, 'WS_ERR_UNEXPECTED_RSV_1');
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(RangeError, `invalid payload length ${this._payloadLength}`, true, 1002, 'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH');
      }
    } else {
      this._loop = false;
      return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002, 'WS_ERR_INVALID_OPCODE');
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(RangeError, 'MASK must be set', true, 1002, 'WS_ERR_EXPECTED_MASK');
      }
    } else if (this._masked) {
      this._loop = false;
      return error(RangeError, 'MASK must be clear', true, 1002, 'WS_ERR_UNEXPECTED_MASK');
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;else return this.haveLength();
  }
  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */


  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }
  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */


  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0); //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //

    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(RangeError, 'Unsupported WebSocket frame: payload length > 2^53 - 1', false, 1009, 'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH');
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }
  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */


  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;

      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(RangeError, 'Max payload size exceeded', false, 1009, 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH');
      }
    }

    if (this._masked) this._state = GET_MASK;else this._state = GET_DATA;
  }
  /**
   * Reads mask bytes.
   *
   * @private
   */


  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }
  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */


  getData(cb) {
    let data = EMPTY_BUFFER;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);
      if (this._masked) unmask(data, this._mask);
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its length is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;

      this._fragments.push(data);
    }

    return this.dataMessage();
  }
  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */


  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;

        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(error(RangeError, 'Max payload size exceeded', false, 1009, 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'));
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);
      this.startLoop(cb);
    });
  }
  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */


  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;
      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        let data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data, true);
      } else {
        const buf = concat(fragments, messageLength);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          this._loop = false;
          return error(Error, 'invalid UTF-8 sequence', true, 1007, 'WS_ERR_INVALID_UTF8');
        }

        this.emit('message', buf, false);
      }
    }

    this._state = GET_INFO;
  }
  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */


  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, EMPTY_BUFFER);
        this.end();
      } else if (data.length === 1) {
        return error(RangeError, 'invalid payload length 1', true, 1002, 'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH');
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode(code)) {
          return error(RangeError, `invalid status code ${code}`, true, 1002, 'WS_ERR_INVALID_CLOSE_CODE');
        }

        const buf = data.slice(2);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          return error(Error, 'invalid UTF-8 sequence', true, 1007, 'WS_ERR_INVALID_UTF8');
        }

        this.emit('conclude', code, buf);
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }

}

module.exports = Receiver;
/**
 * Builds an error object.
 *
 * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @param {String} errorCode The exposed error code
 * @return {(Error|RangeError)} The error
 * @private
 */

function error(ErrorCtor, message, prefix, statusCode, errorCode) {
  const err = new ErrorCtor(prefix ? `Invalid WebSocket frame: ${message}` : message);
  Error.captureStackTrace(err, error);
  err.code = errorCode;
  err[kStatusCode] = statusCode;
  return err;
}

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/sender.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls$" }] */


const net = __webpack_require__("net");

const tls = __webpack_require__("tls");

const {
  randomFillSync
} = __webpack_require__("crypto");

const PerMessageDeflate = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/permessage-deflate.js");

const {
  EMPTY_BUFFER
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/constants.js");

const {
  isValidStatusCode
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/validation.js");

const {
  mask: applyMask,
  toBuffer
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/buffer-util.js");

const mask = Buffer.alloc(4);
/**
 * HyBi Sender implementation.
 */

class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {(net.Socket|tls.Socket)} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   */
  constructor(socket, extensions) {
    this._extensions = extensions || {};
    this._socket = socket;
    this._firstFragment = true;
    this._compress = false;
    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }
  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {Buffer} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {Buffer[]} The framed data as a list of `Buffer` instances
   * @public
   */


  static frame(data, options) {
    const merge = options.mask && options.readOnly;
    let offset = options.mask ? 6 : 2;
    let payloadLength = data.length;

    if (data.length >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (data.length > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);
    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;
    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(data.length, 2);
    } else if (payloadLength === 127) {
      target.writeUInt32BE(0, 2);
      target.writeUInt32BE(data.length, 6);
    }

    if (!options.mask) return [target, data];
    randomFillSync(mask, 0, 4);
    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (merge) {
      applyMask(data, mask, target, offset, data.length);
      return [target];
    }

    applyMask(data, mask, data, 0, data.length);
    return [target, data];
  }
  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */


  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || !data.length) {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);

      if (typeof data === 'string') {
        buf.write(data, 2);
      } else {
        buf.set(data, 2);
      }
    }

    if (this._deflating) {
      this.enqueue([this.doClose, buf, mask, cb]);
    } else {
      this.doClose(buf, mask, cb);
    }
  }
  /**
   * Frames and sends a close message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @private
   */


  doClose(data, mask, cb) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x08,
      mask,
      readOnly: false
    }), cb);
  }
  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */


  ping(data, mask, cb) {
    const buf = toBuffer(data);

    if (buf.length > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    if (this._deflating) {
      this.enqueue([this.doPing, buf, mask, toBuffer.readOnly, cb]);
    } else {
      this.doPing(buf, mask, toBuffer.readOnly, cb);
    }
  }
  /**
   * Frames and sends a ping message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Boolean} [readOnly=false] Specifies whether `data` can be modified
   * @param {Function} [cb] Callback
   * @private
   */


  doPing(data, mask, readOnly, cb) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x09,
      mask,
      readOnly
    }), cb);
  }
  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */


  pong(data, mask, cb) {
    const buf = toBuffer(data);

    if (buf.length > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    if (this._deflating) {
      this.enqueue([this.doPong, buf, mask, toBuffer.readOnly, cb]);
    } else {
      this.doPong(buf, mask, toBuffer.readOnly, cb);
    }
  }
  /**
   * Frames and sends a pong message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Boolean} [readOnly=false] Specifies whether `data` can be modified
   * @param {Function} [cb] Callback
   * @private
   */


  doPong(data, mask, readOnly, cb) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x0a,
      mask,
      readOnly
    }), cb);
  }
  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */


  send(data, options, cb) {
    const buf = toBuffer(data);
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    if (this._firstFragment) {
      this._firstFragment = false;

      if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? 'server_no_context_takeover' : 'client_no_context_takeover']) {
        rsv1 = buf.length >= perMessageDeflate._threshold;
      }

      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        fin: options.fin,
        rsv1,
        opcode,
        mask: options.mask,
        readOnly: toBuffer.readOnly
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
      } else {
        this.dispatch(buf, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(Sender.frame(buf, {
        fin: options.fin,
        rsv1: false,
        opcode,
        mask: options.mask,
        readOnly: toBuffer.readOnly
      }), cb);
    }
  }
  /**
   * Dispatches a data message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */


  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    this._bufferedBytes += data.length;
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error('The socket was closed while data was being compressed');
        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const callback = this._queue[i][4];
          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= data.length;
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }
  /**
   * Executes queued send operations.
   *
   * @private
   */


  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[1].length;
      Reflect.apply(params[0], this, params.slice(1));
    }
  }
  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */


  enqueue(params) {
    this._bufferedBytes += params[1].length;

    this._queue.push(params);
  }
  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */


  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();

      this._socket.write(list[0]);

      this._socket.write(list[1], cb);

      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }

}

module.exports = Sender;

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/stream.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const {
  Duplex
} = __webpack_require__("stream");
/**
 * Emits the `'close'` event on a stream.
 *
 * @param {Duplex} stream The stream.
 * @private
 */


function emitClose(stream) {
  stream.emit('close');
}
/**
 * The listener of the `'end'` event.
 *
 * @private
 */


function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}
/**
 * The listener of the `'error'` event.
 *
 * @param {Error} err The error
 * @private
 */


function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();

  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}
/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} [options] The options for the `Duplex` constructor
 * @return {Duplex} The duplex stream
 * @public
 */


function createWebSocketStream(ws, options) {
  let resumeOnReceiverDrain = true;
  let terminateOnDestroy = true;

  function receiverOnDrain() {
    if (resumeOnReceiverDrain) ws._socket.resume();
  }

  if (ws.readyState === ws.CONNECTING) {
    ws.once('open', function open() {
      ws._receiver.removeAllListeners('drain');

      ws._receiver.on('drain', receiverOnDrain);
    });
  } else {
    ws._receiver.removeAllListeners('drain');

    ws._receiver.on('drain', receiverOnDrain);
  }

  const duplex = new Duplex({ ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });
  ws.on('message', function message(msg, isBinary) {
    const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;

    if (!duplex.push(data)) {
      resumeOnReceiverDrain = false;

      ws._socket.pause();
    }
  });
  ws.once('error', function error(err) {
    if (duplex.destroyed) return; // Prevent `ws.terminate()` from being called by `duplex._destroy()`.
    //
    // - If the `'error'` event is emitted before the `'open'` event, then
    //   `ws.terminate()` is a noop as no socket is assigned.
    // - Otherwise, the error is re-emitted by the listener of the `'error'`
    //   event of the `Receiver` object. The listener already closes the
    //   connection by calling `ws.close()`. This allows a close frame to be
    //   sent to the other peer. If `ws.terminate()` is called right after this,
    //   then the close frame might not be sent.

    terminateOnDestroy = false;
    duplex.destroy(err);
  });
  ws.once('close', function close() {
    if (duplex.destroyed) return;
    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose, duplex);
      return;
    }

    let called = false;
    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });
    ws.once('close', function close() {
      if (!called) callback(err);
      process.nextTick(emitClose, duplex);
    });
    if (terminateOnDestroy) ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    } // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.


    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted) duplex.destroy();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });

      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.readyState === ws.OPEN && !resumeOnReceiverDrain) {
      resumeOnReceiverDrain = true;
      if (!ws._receiver._writableState.needDrain) ws._socket.resume();
    }
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

module.exports = createWebSocketStream;

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/subprotocol.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const {
  tokenChars
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/validation.js");
/**
 * Parses the `Sec-WebSocket-Protocol` header into a set of subprotocol names.
 *
 * @param {String} header The field value of the header
 * @return {Set} The subprotocol names
 * @public
 */


function parse(header) {
  const protocols = new Set();
  let start = -1;
  let end = -1;
  let i = 0;

  for (i; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (end === -1 && tokenChars[code] === 1) {
      if (start === -1) start = i;
    } else if (i !== 0 && (code === 0x20
    /* ' ' */
    || code === 0x09)
    /* '\t' */
    ) {
      if (end === -1 && start !== -1) end = i;
    } else if (code === 0x2c
    /* ',' */
    ) {
      if (start === -1) {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }

      if (end === -1) end = i;
      const protocol = header.slice(start, end);

      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }

      protocols.add(protocol);
      start = end = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }

  if (start === -1 || end !== -1) {
    throw new SyntaxError('Unexpected end of input');
  }

  const protocol = header.slice(start, i);

  if (protocols.has(protocol)) {
    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
  }

  protocols.add(protocol);
  return protocols;
}

module.exports = {
  parse
};

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/validation.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
 //
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore

const tokenChars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];
/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */

function isValidStatusCode(code) {
  return code >= 1000 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3000 && code <= 4999;
}
/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */


function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0) {
      // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {
      // 110xxxxx 10xxxxxx
      if (i + 1 === len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i] & 0xfe) === 0xc0 // Overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      if (i + 2 >= len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i + 2] & 0xc0) !== 0x80 || buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80 || buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0 // Surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (i + 3 >= len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i + 2] & 0xc0) !== 0x80 || (buf[i + 3] & 0xc0) !== 0x80 || buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80 || buf[i] === 0xf4 && buf[i + 1] > 0x8f || buf[i] > 0xf4 // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

try {
  const isValidUTF8 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'utf-8-validate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  module.exports = {
    isValidStatusCode,

    isValidUTF8(buf) {
      return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
    },

    tokenChars
  };
} catch (e)
/* istanbul ignore next */
{
  module.exports = {
    isValidStatusCode,
    isValidUTF8: _isValidUTF8,
    tokenChars
  };
}

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/websocket-server.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls|https$" }] */


const EventEmitter = __webpack_require__("events");

const http = __webpack_require__("http");

const https = __webpack_require__("https");

const net = __webpack_require__("net");

const tls = __webpack_require__("tls");

const {
  createHash
} = __webpack_require__("crypto");

const extension = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/extension.js");

const PerMessageDeflate = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/permessage-deflate.js");

const subprotocol = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/subprotocol.js");

const WebSocket = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/websocket.js");

const {
  GUID,
  kWebSocket
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/constants.js");

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;
const RUNNING = 0;
const CLOSING = 1;
const CLOSED = 2;
/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */

class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();
    options = {
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null,
      // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      ...options
    };

    if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
      throw new TypeError('One and only one of the "port", "server", or "noServer" options ' + 'must be specified');
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];
        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });

      this._server.listen(options.port, options.host, options.backlog, callback);
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');
      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, emitConnection);
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};

    if (options.clientTracking) {
      this.clients = new Set();
      this._shouldEmitClose = false;
    }

    this.options = options;
    this._state = RUNNING;
  }
  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */


  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }
  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */


  close(cb) {
    if (this._state === CLOSED) {
      if (cb) {
        this.once('close', () => {
          cb(new Error('The server is not running'));
        });
      }

      process.nextTick(emitClose, this);
      return;
    }

    if (cb) this.once('close', cb);
    if (this._state === CLOSING) return;
    this._state = CLOSING;

    if (this.options.noServer || this.options.server) {
      if (this._server) {
        this._removeListeners();

        this._removeListeners = this._server = null;
      }

      if (this.clients) {
        if (!this.clients.size) {
          process.nextTick(emitClose, this);
        } else {
          this._shouldEmitClose = true;
        }
      } else {
        process.nextTick(emitClose, this);
      }
    } else {
      const server = this._server;

      this._removeListeners();

      this._removeListeners = this._server = null; //
      // The HTTP/S server was created internally. Close it, and rely on its
      // `'close'` event.
      //

      server.close(() => {
        emitClose(this);
      });
    }
  }
  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */


  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
      if (pathname !== this.options.path) return false;
    }

    return true;
  }
  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */


  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);
    const key = req.headers['sec-websocket-key'] !== undefined ? req.headers['sec-websocket-key'] : false;
    const version = +req.headers['sec-websocket-version'];

    if (req.method !== 'GET' || req.headers.upgrade.toLowerCase() !== 'websocket' || !key || !keyRegex.test(key) || version !== 8 && version !== 13 || !this.shouldHandle(req)) {
      return abortHandshake(socket, 400);
    }

    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
    let protocols = new Set();

    if (secWebSocketProtocol !== undefined) {
      try {
        protocols = subprotocol.parse(secWebSocketProtocol);
      } catch (err) {
        return abortHandshake(socket, 400);
      }
    }

    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
    const extensions = {};

    if (this.options.perMessageDeflate && secWebSocketExtensions !== undefined) {
      const perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);

      try {
        const offers = extension.parse(secWebSocketExtensions);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        return abortHandshake(socket, 400);
      }
    } //
    // Optionally call external client verification handler.
    //


    if (this.options.verifyClient) {
      const info = {
        origin: req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
  }
  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */


  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket]) {
      throw new Error('server.handleUpgrade() was called more than once with the same ' + 'socket, possibly due to a misconfiguration');
    }

    if (this._state > RUNNING) return abortHandshake(socket, 503);
    const digest = createHash('sha1').update(key + GUID).digest('base64');
    const headers = ['HTTP/1.1 101 Switching Protocols', 'Upgrade: websocket', 'Connection: Upgrade', `Sec-WebSocket-Accept: ${digest}`];
    const ws = new WebSocket(null);

    if (protocols.size) {
      //
      // Optionally call external protocol selection handler.
      //
      const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws._protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = extension.format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    } //
    // Allow external modification/inspection of handshake headers.
    //


    this.emit('headers', headers, req);
    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);
    ws.setSocket(socket, head, {
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    });

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => {
        this.clients.delete(ws);

        if (this._shouldEmitClose && !this.clients.size) {
          process.nextTick(emitClose, this);
        }
      });
    }

    cb(ws, req);
  }

}

module.exports = WebSocketServer;
/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when
 *     called
 * @private
 */

function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}
/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */


function emitClose(server) {
  server._state = CLOSED;
  server.emit('close');
}
/**
 * Handle premature socket errors.
 *
 * @private
 */


function socketOnError() {
  this.destroy();
}
/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */


function abortHandshake(socket, code, message, headers) {
  if (socket.writable) {
    message = message || http.STATUS_CODES[code];
    headers = {
      Connection: 'close',
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(message),
      ...headers
    };
    socket.write(`HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` + Object.keys(headers).map(h => `${h}: ${headers[h]}`).join('\r\n') + '\r\n\r\n' + message);
  }

  socket.removeListener('error', socketOnError);
  socket.destroy();
}

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/ws/lib/websocket.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Readable$" }] */


const EventEmitter = __webpack_require__("events");

const https = __webpack_require__("https");

const http = __webpack_require__("http");

const net = __webpack_require__("net");

const tls = __webpack_require__("tls");

const {
  randomBytes,
  createHash
} = __webpack_require__("crypto");

const {
  Readable
} = __webpack_require__("stream");

const {
  URL
} = __webpack_require__("url");

const PerMessageDeflate = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/permessage-deflate.js");

const Receiver = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/receiver.js");

const Sender = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/sender.js");

const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID,
  kForOnEventAttribute,
  kListener,
  kStatusCode,
  kWebSocket,
  NOOP
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/constants.js");

const {
  EventTarget: {
    addEventListener,
    removeEventListener
  }
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/event-target.js");

const {
  format,
  parse
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/extension.js");

const {
  toBuffer
} = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/buffer-util.js");

const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
const protocolVersions = [8, 13];
const closeTimeout = 30 * 1000;
/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */

class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();
    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER;
    this._closeTimer = null;
    this._extensions = {};
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }
  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */


  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;
    this._binaryType = type; //
    // Allow to change `binaryType` on the fly.
    //

    if (this._receiver) this._receiver._binaryType = type;
  }
  /**
   * @type {Number}
   */


  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;
    return this._socket._writableState.length + this._sender._bufferedBytes;
  }
  /**
   * @type {String}
   */


  get extensions() {
    return Object.keys(this._extensions).join();
  }
  /**
   * @type {Function}
   */

  /* istanbul ignore next */


  get onclose() {
    return null;
  }
  /**
   * @type {Function}
   */

  /* istanbul ignore next */


  get onerror() {
    return null;
  }
  /**
   * @type {Function}
   */

  /* istanbul ignore next */


  get onopen() {
    return null;
  }
  /**
   * @type {Function}
   */

  /* istanbul ignore next */


  get onmessage() {
    return null;
  }
  /**
   * @type {String}
   */


  get protocol() {
    return this._protocol;
  }
  /**
   * @type {Number}
   */


  get readyState() {
    return this._readyState;
  }
  /**
   * @type {String}
   */


  get url() {
    return this._url;
  }
  /**
   * Set up the socket and the internal resources.
   *
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */


  setSocket(socket, head, options) {
    const receiver = new Receiver({
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: options.maxPayload,
      skipUTF8Validation: options.skipUTF8Validation
    });
    this._sender = new Sender(socket, this._extensions);
    this._receiver = receiver;
    this._socket = socket;
    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;
    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);
    socket.setTimeout(0);
    socket.setNoDelay();
    if (head.length > 0) socket.unshift(head);
    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);
    this._readyState = WebSocket.OPEN;
    this.emit('open');
  }
  /**
   * Emit the `'close'` event.
   *
   * @private
   */


  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();

    this._readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }
  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */


  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;

    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
        this._socket.end();
      }

      return;
    }

    this._readyState = WebSocket.CLOSING;

    this._sender.close(code, data, !this._isServer, err => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;
      this._closeFrameSent = true;

      if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
        this._socket.end();
      }
    }); //
    // Specify a timeout for the closing handshake to complete.
    //


    this._closeTimer = setTimeout(this._socket.destroy.bind(this._socket), closeTimeout);
  }
  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */


  ping(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;

    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }
  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */


  pong(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;

    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }
  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */


  send(data, options, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }
  /**
   * Forcibly close the connection.
   *
   * @public
   */


  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;

    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this._socket) {
      this._readyState = WebSocket.CLOSING;

      this._socket.destroy();
    }
  }

}
/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket
 */


Object.defineProperty(WebSocket, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});
/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket.prototype
 */

Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});
/**
 * @constant {Number} OPEN
 * @memberof WebSocket
 */

Object.defineProperty(WebSocket, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});
/**
 * @constant {Number} OPEN
 * @memberof WebSocket.prototype
 */

Object.defineProperty(WebSocket.prototype, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});
/**
 * @constant {Number} CLOSING
 * @memberof WebSocket
 */

Object.defineProperty(WebSocket, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});
/**
 * @constant {Number} CLOSING
 * @memberof WebSocket.prototype
 */

Object.defineProperty(WebSocket.prototype, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});
/**
 * @constant {Number} CLOSED
 * @memberof WebSocket
 */

Object.defineProperty(WebSocket, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});
/**
 * @constant {Number} CLOSED
 * @memberof WebSocket.prototype
 */

Object.defineProperty(WebSocket.prototype, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});
['binaryType', 'bufferedAmount', 'extensions', 'protocol', 'readyState', 'url'].forEach(property => {
  Object.defineProperty(WebSocket.prototype, property, {
    enumerable: true
  });
}); //
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//

['open', 'error', 'close', 'message'].forEach(method => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    enumerable: true,

    get() {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) return listener[kListener];
      }

      return null;
    },

    set(handler) {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) {
          this.removeListener(method, listener);
          break;
        }
      }

      if (typeof handler !== 'function') return;
      this.addEventListener(method, handler, {
        [kForOnEventAttribute]: true
      });
    }

  });
});
WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;
module.exports = WebSocket;
/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|URL)} address The URL to which to connect
 * @param {Array} protocols The subprotocols
 * @param {Object} [options] Connection options
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
 *     not to skip UTF-8 validation for text and close messages
 * @private
 */

function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: undefined,
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(`Unsupported protocol version: ${opts.protocolVersion} ` + `(supported versions: ${protocolVersions.join(', ')})`);
  }

  let parsedUrl;

  if (address instanceof URL) {
    parsedUrl = address;
    websocket._url = address.href;
  } else {
    try {
      parsedUrl = new URL(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }

    websocket._url = address;
  }

  const isSecure = parsedUrl.protocol === 'wss:';
  const isUnixSocket = parsedUrl.protocol === 'ws+unix:';

  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isUnixSocket) {
    throw new SyntaxError('The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"');
  }

  if (isUnixSocket && !parsedUrl.pathname) {
    throw new SyntaxError("The URL's pathname is empty");
  }

  if (parsedUrl.hash) {
    throw new SyntaxError('The URL contains a fragment identifier');
  }

  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const get = isSecure ? https.get : http.get;
  const protocolSet = new Set();
  let perMessageDeflate;
  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[') ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
  opts.headers = {
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket',
    ...opts.headers
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(opts.perMessageDeflate !== true ? opts.perMessageDeflate : {}, false, opts.maxPayload);
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }

  if (protocols.length) {
    for (const protocol of protocols) {
      if (typeof protocol !== 'string' || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
        throw new SyntaxError('An invalid or duplicated subprotocol was specified');
      }

      protocolSet.add(protocol);
    }

    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
  }

  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }

  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isUnixSocket) {
    const parts = opts.path.split(':');
    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req = websocket._req = get(opts);

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', err => {
    if (req === null || req.aborted) return;
    req = websocket._req = null;
    websocket._readyState = WebSocket.CLOSING;
    websocket.emit('error', err);
    websocket.emitClose();
  });
  req.on('response', res => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();
      const addr = new URL(location, address);
      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(websocket, req, `Unexpected server response: ${res.statusCode}`);
    }
  });
  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res); //
    // The user may have closed the connection from a listener of the `upgrade`
    // event.
    //

    if (websocket.readyState !== WebSocket.CONNECTING) return;
    req = websocket._req = null;
    const digest = createHash('sha1').update(key + GUID).digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    let protError;

    if (serverProt !== undefined) {
      if (!protocolSet.size) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (!protocolSet.has(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }
    } else if (protocolSet.size) {
      protError = 'Server sent no subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;
    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

    if (secWebSocketExtensions !== undefined) {
      if (!perMessageDeflate) {
        const message = 'Server sent a Sec-WebSocket-Extensions header but no extension ' + 'was requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      let extensions;

      try {
        extensions = parse(secWebSocketExtensions);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      const extensionNames = Object.keys(extensions);

      if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
        const message = 'Server indicated an extension that was not requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      try {
        perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
    }

    websocket.setSocket(socket, head, {
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });
}
/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */


function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}
/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */


function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}
/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
 *     abort or the socket to destroy
 * @param {String} message The error message
 * @private
 */


function abortHandshake(websocket, stream, message) {
  websocket._readyState = WebSocket.CLOSING;
  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    stream.once('abort', websocket.emitClose.bind(websocket));
    websocket.emit('error', err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}
/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */


function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer(data).length; //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //

    if (websocket._socket) websocket._sender._bufferedBytes += length;else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(`WebSocket is not open: readyState ${websocket.readyState} ` + `(${readyStates[websocket.readyState]})`);
    cb(err);
  }
}
/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {Buffer} reason The reason for closing
 * @private
 */


function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];
  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;
  if (websocket._socket[kWebSocket] === undefined) return;

  websocket._socket.removeListener('data', socketOnData);

  process.nextTick(resume, websocket._socket);
  if (code === 1005) websocket.close();else websocket.close(code, reason);
}
/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */


function receiverOnDrain() {
  this[kWebSocket]._socket.resume();
}
/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */


function receiverOnError(err) {
  const websocket = this[kWebSocket];

  if (websocket._socket[kWebSocket] !== undefined) {
    websocket._socket.removeListener('data', socketOnData); //
    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
    // https://github.com/websockets/ws/issues/1940.
    //


    process.nextTick(resume, websocket._socket);
    websocket.close(err[kStatusCode]);
  }

  websocket.emit('error', err);
}
/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */


function receiverOnFinish() {
  this[kWebSocket].emitClose();
}
/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
 * @param {Boolean} isBinary Specifies whether the message is binary or not
 * @private
 */


function receiverOnMessage(data, isBinary) {
  this[kWebSocket].emit('message', data, isBinary);
}
/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */


function receiverOnPing(data) {
  const websocket = this[kWebSocket];
  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}
/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */


function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}
/**
 * Resume a readable stream
 *
 * @param {Readable} stream The readable stream
 * @private
 */


function resume(stream) {
  stream.resume();
}
/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */


function socketOnClose() {
  const websocket = this[kWebSocket];
  this.removeListener('close', socketOnClose);
  this.removeListener('data', socketOnData);
  this.removeListener('end', socketOnEnd);
  websocket._readyState = WebSocket.CLOSING;
  let chunk; //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk.
  //

  if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
    websocket._receiver.write(chunk);
  }

  websocket._receiver.end();

  this[kWebSocket] = undefined;
  clearTimeout(websocket._closeTimer);

  if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);

    websocket._receiver.on('finish', receiverOnFinish);
  }
}
/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */


function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}
/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */


function socketOnEnd() {
  const websocket = this[kWebSocket];
  websocket._readyState = WebSocket.CLOSING;

  websocket._receiver.end();

  this.end();
}
/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */


function socketOnError() {
  const websocket = this[kWebSocket];
  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket.CLOSING;
    this.destroy();
  }
}

/***/ }),

/***/ "./node_modules/follow-redirects/debug.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debug;

module.exports = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = __webpack_require__("./node_modules/debug/src/index.js")("follow-redirects");
    } catch (error) {
      /* */
    }

    if (typeof debug !== "function") {
      debug = function () {
        /* */
      };
    }
  }

  debug.apply(null, arguments);
};

/***/ }),

/***/ "./node_modules/follow-redirects/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var url = __webpack_require__("url");

var URL = url.URL;

var http = __webpack_require__("http");

var https = __webpack_require__("https");

var Writable = __webpack_require__("stream").Writable;

var assert = __webpack_require__("assert");

var debug = __webpack_require__("./node_modules/follow-redirects/debug.js"); // Create handlers that pass events from native requests


var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
}); // Error types with codes

var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end"); // An HTTP(S) request that can be redirected

function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);

  this._sanitizeOptions(options);

  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = []; // Attach a callback if passed

  if (responseCallback) {
    this.on("response", responseCallback);
  } // React to responses of native requests


  var self = this;

  this._onNativeResponse = function (response) {
    self._processResponse(response);
  }; // Perform the first request


  this._performRequest();
}

RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
}; // Writes buffered data to the current native request


RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  } // Validate input and shift parameters if necessary


  if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }

  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  } // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066


  if (data.length === 0) {
    if (callback) {
      callback();
    }

    return;
  } // Only write when we don't exceed the maximum body length


  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;

    this._requestBodyBuffers.push({
      data: data,
      encoding: encoding
    });

    this._currentRequest.write(data, encoding, callback);
  } // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
}; // Ends the current native request


RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  } else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  } // Write data if needed and end


  if (!data) {
    this._ended = this._ending = true;

    this._currentRequest.end(null, null, callback);
  } else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
}; // Sets a header value on the current native request


RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;

  this._currentRequest.setHeader(name, value);
}; // Clears a header value on the current native request


RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];

  this._currentRequest.removeHeader(name);
}; // Global timeout for all underlying requests


RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this; // Destroys the socket on timeout

  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  } // Sets up a timer to trigger a timeout event


  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }

    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  } // Stops a timeout from triggering


  function clearTimer() {
    // Clear the timeout
    if (self._timeout) {
      clearTimeout(self._timeout);
      self._timeout = null;
    } // Clean up all attached listeners


    self.removeListener("abort", clearTimer);
    self.removeListener("error", clearTimer);
    self.removeListener("response", clearTimer);

    if (callback) {
      self.removeListener("timeout", callback);
    }

    if (!self.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  } // Attach callback if passed


  if (callback) {
    this.on("timeout", callback);
  } // Start the timer if or when the socket is opened


  if (this.socket) {
    startTimer(this.socket);
  } else {
    this._currentRequest.once("socket", startTimer);
  } // Clean up on events


  this.on("socket", destroyOnTimeout);
  this.on("abort", clearTimer);
  this.on("error", clearTimer);
  this.on("response", clearTimer);
  return this;
}; // Proxy all other public ClientRequest methods


["flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive"].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
}); // Proxy all public ClientRequest properties

["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () {
      return this._currentRequest[property];
    }
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  } // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.


  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }

    delete options.host;
  } // Complete the URL object when necessary


  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");

    if (searchPos < 0) {
      options.pathname = options.path;
    } else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
}; // Executes the next native request (initial or redirect)


RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];

  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  } // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)


  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  } // Create the native request


  var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options); // Set up event handlers

  request._redirectable = this;

  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  } // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)


  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;

    (function writeNext(error) {
      // Only write if this request has not been redirected yet

      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors

        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        } // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */

          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        } // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    })();
  }
}; // Processes a response from the current native request


RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;

  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode
    });
  } // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.


  var location = response.headers.location;

  if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    abortRequest(this._currentRequest); // Discard the remainder of the response to avoid waiting for data

    response.destroy(); // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).

    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    } // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.


    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
    // the server is redirecting the user agent to a different resource […]
    // A user agent can perform a retrieval request targeting that URI
    // (a GET or HEAD request if using HTTP) […]
    statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET"; // Drop a possible entity and headers related to it

      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    } // Drop the Host header, as the redirect might lead to a different host


    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers); // If the redirect is relative, carry over the host of the last request

    var currentUrlParts = url.parse(this._currentUrl);
    var currentHost = currentHostHeader || currentUrlParts.host;
    var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, {
      host: currentHost
    })); // Determine the URL of the redirection

    var redirectUrl;

    try {
      redirectUrl = url.resolve(currentUrl, location);
    } catch (cause) {
      this.emit("error", new RedirectionError(cause));
      return;
    } // Create the redirected request


    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts); // Drop the confidential headers when redirecting to another domain

    if (!(redirectUrlParts.host === currentHost || isSubdomainOf(redirectUrlParts.host, currentHost))) {
      removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
    } // Evaluate the beforeRedirect callback


    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = {
        headers: response.headers
      };

      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      } catch (err) {
        this.emit("error", err);
        return;
      }

      this._sanitizeOptions(this._options);
    } // Perform the redirected request


    try {
      this._performRequest();
    } catch (cause) {
      this.emit("error", new RedirectionError(cause));
    }
  } else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response); // Clean up

    this._requestBodyBuffers = [];
  }
}; // Wraps the key/value object of protocols with redirect functionality


function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024
  }; // Wrap each protocol

  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol); // Executes a request, following redirects

    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;

        try {
          input = urlToOptions(new URL(urlStr));
        } catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      } else if (URL && input instanceof URL) {
        input = urlToOptions(input);
      } else {
        callback = options;
        options = input;
        input = {
          protocol: protocol
        };
      }

      if (typeof options === "function") {
        callback = options;
        options = null;
      } // Set defaults


      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength
      }, input, options);
      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    } // Executes a GET request, following redirects


    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    } // Expose the properties on the wrapped protocol


    Object.defineProperties(wrappedProtocol, {
      request: {
        value: request,
        configurable: true,
        enumerable: true,
        writable: true
      },
      get: {
        value: get,
        configurable: true,
        enumerable: true,
        writable: true
      }
    });
  });
  return exports;
}
/* istanbul ignore next */


function noop() {
  /* empty */
} // from https://github.com/nodejs/node/blob/master/lib/internal/url.js


function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
    /* istanbul ignore next */
    urlObject.hostname.slice(1, -1) : urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href
  };

  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }

  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;

  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }

  return lastValue === null || typeof lastValue === "undefined" ? undefined : String(lastValue).trim();
}

function createErrorType(code, defaultMessage) {
  function CustomError(cause) {
    Error.captureStackTrace(this, this.constructor);

    if (!cause) {
      this.message = defaultMessage;
    } else {
      this.message = defaultMessage + ": " + cause.message;
      this.cause = cause;
    }
  }

  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var e = 0; e < events.length; e++) {
    request.removeListener(events[e], eventHandlers[events[e]]);
  }

  request.on("error", noop);
  request.abort();
}

function isSubdomainOf(subdomain, domain) {
  const dot = subdomain.length - domain.length - 1;
  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
} // Exports


module.exports = wrap({
  http: http,
  https: https
});
module.exports.wrap = wrap;

/***/ }),

/***/ "./node_modules/has-flag/index.js":
/***/ ((module) => {

"use strict";


module.exports = (flag, argv) => {
  argv = argv || process.argv;
  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
  const pos = argv.indexOf(prefix + flag);
  const terminatorPos = argv.indexOf('--');
  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

/***/ }),

/***/ "./node_modules/ms/index.js":
/***/ ((module) => {

/**
 * Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;

    case 'weeks':
    case 'week':
    case 'w':
      return n * w;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }

  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }

  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }

  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }

  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }

  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }

  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }

  return ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/***/ }),

/***/ "./node_modules/parseqs/index.js":
/***/ ((__unused_webpack_module, exports) => {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */


exports.decode = function (qs) {
  var qry = {};
  var pairs = qs.split('&');

  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return qry;
};

/***/ }),

/***/ "./node_modules/parseuri/index.js":
/***/ ((module) => {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

module.exports = function parseuri(str) {
  var src = str,
      b = str.indexOf('['),
      e = str.indexOf(']');

  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
  }

  var m = re.exec(str || ''),
      uri = {},
      i = 14;

  while (i--) {
    uri[parts[i]] = m[i] || '';
  }

  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
    uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
    uri.ipv6uri = true;
  }

  uri.pathNames = pathNames(uri, uri['path']);
  uri.queryKey = queryKey(uri, uri['query']);
  return uri;
};

function pathNames(obj, path) {
  var regx = /\/{2,9}/g,
      names = path.replace(regx, "/").split("/");

  if (path.substr(0, 1) == '/' || path.length === 0) {
    names.splice(0, 1);
  }

  if (path.substr(path.length - 1, 1) == '/') {
    names.splice(names.length - 1, 1);
  }

  return names;
}

function queryKey(uri, query) {
  var data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}

/***/ }),

/***/ "./node_modules/socket.io-client/build/esm-debug/index.js":
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "io": () => (/* binding */ lookup)
});

// UNUSED EXPORTS: Manager, Socket, connect, default, protocol

// NAMESPACE OBJECT: ./node_modules/socket.io-parser/build/esm-debug/index.js
var build_esm_debug_namespaceObject = {};
__webpack_require__.r(build_esm_debug_namespaceObject);
__webpack_require__.d(build_esm_debug_namespaceObject, {
  "Decoder": () => (Decoder),
  "Encoder": () => (Encoder),
  "PacketType": () => (PacketType),
  "protocol": () => (build_esm_debug_protocol)
});

// EXTERNAL MODULE: ./node_modules/parseuri/index.js
var parseuri = __webpack_require__("./node_modules/parseuri/index.js");
// EXTERNAL MODULE: ./node_modules/debug/src/index.js
var src = __webpack_require__("./node_modules/debug/src/index.js");
;// CONCATENATED MODULE: ./node_modules/socket.io-client/build/esm-debug/url.js

 // debug()

const debug = src("socket.io-client:url"); // debug()

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */

function url(uri, path = "", loc) {
  let obj = uri; // default to window.location

  loc = loc || typeof location !== "undefined" && location;
  if (null == uri) uri = loc.protocol + "//" + loc.host; // relative path support

  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug("protocol-less url %s", uri);

      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    } // parse


    debug("parse %s", uri);
    obj = parseuri(uri);
  } // make sure we treat `localhost:80` and `localhost` equally


  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }

  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host; // define unique id

  obj.id = obj.protocol + "://" + host + ":" + obj.port + path; // define href

  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}
// EXTERNAL MODULE: ./node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js
var XMLHttpRequest = __webpack_require__("./node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js");
var XMLHttpRequest_namespaceObject = /*#__PURE__*/__webpack_require__.t(XMLHttpRequest, 2);
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/transports/xmlhttprequest.js

const xmlhttprequest_XMLHttpRequest = XMLHttpRequest || XMLHttpRequest_namespaceObject;
/* harmony default export */ const xmlhttprequest = (xmlhttprequest_XMLHttpRequest);
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/globalThis.js
/* harmony default export */ const globalThis = (global);
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/util.js

function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }

    return acc;
  }, {});
} // Keep a reference to the real timeout functions so they can be used when overridden

const NATIVE_SET_TIMEOUT = setTimeout;
const NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis);
  } else {
    obj.setTimeoutFn = setTimeout.bind(globalThis);
    obj.clearTimeoutFn = clearTimeout.bind(globalThis);
  }
}
// EXTERNAL MODULE: ./node_modules/@socket.io/component-emitter/index.js
var component_emitter = __webpack_require__("./node_modules/@socket.io/component-emitter/index.js");
;// CONCATENATED MODULE: ./node_modules/engine.io-parser/build/esm/commons.js
const PACKET_TYPES = Object.create(null); // no Map = no polyfill

PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = {
  type: "error",
  data: "parser error"
};

;// CONCATENATED MODULE: ./node_modules/engine.io-parser/build/esm/encodePacket.js


const encodePacket = ({
  type,
  data
}, supportsBinary, callback) => {
  if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    const buffer = toBuffer(data);
    return callback(encodeBuffer(buffer, supportsBinary));
  } // plain string


  return callback(PACKET_TYPES[type] + (data || ""));
};

const toBuffer = data => {
  if (Buffer.isBuffer(data)) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return Buffer.from(data);
  } else {
    return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  }
}; // only 'message' packets can contain binary, so the type prefix is not needed


const encodeBuffer = (data, supportsBinary) => {
  return supportsBinary ? data : "b" + data.toString("base64");
};

/* harmony default export */ const esm_encodePacket = (encodePacket);
;// CONCATENATED MODULE: ./node_modules/engine.io-parser/build/esm/decodePacket.js


const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }

  const type = encodedPacket.charAt(0);

  if (type === "b") {
    const buffer = Buffer.from(encodedPacket.substring(1), "base64");
    return {
      type: "message",
      data: mapBinary(buffer, binaryType)
    };
  }

  if (!PACKET_TYPES_REVERSE[type]) {
    return ERROR_PACKET;
  }

  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[type]
  };
};

const mapBinary = (data, binaryType) => {
  const isBuffer = Buffer.isBuffer(data);

  switch (binaryType) {
    case "arraybuffer":
      return isBuffer ? toArrayBuffer(data) : data;

    case "nodebuffer":
    default:
      return data;
    // assuming the data is already a Buffer
  }
};

const toArrayBuffer = buffer => {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);

  for (let i = 0; i < buffer.length; i++) {
    view[i] = buffer[i];
  }

  return arrayBuffer;
};

/* harmony default export */ const esm_decodePacket = (decodePacket);
;// CONCATENATED MODULE: ./node_modules/engine.io-parser/build/esm/index.js


const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

const encodePayload = (packets, callback) => {
  // some packets may be added to the array while encoding, so the initial length must be saved
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;
  packets.forEach((packet, i) => {
    // force base64 encoding for binary packets
    esm_encodePacket(packet, false, encodedPacket => {
      encodedPackets[i] = encodedPacket;

      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};

const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];

  for (let i = 0; i < encodedPackets.length; i++) {
    const decodedPacket = esm_decodePacket(encodedPackets[i], binaryType);
    packets.push(decodedPacket);

    if (decodedPacket.type === "error") {
      break;
    }
  }

  return packets;
};

const protocol = 4;

;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/transport.js



 // debug()

const transport_debug = src("engine.io-client:transport"); // debug()

class Transport extends component_emitter/* Emitter */.Q {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} options.
   * @api private
   */
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.readyState = "";
    this.socket = opts.socket;
  }
  /**
   * Emits an error.
   *
   * @param {String} str
   * @return {Transport} for chaining
   * @api protected
   */


  onError(msg, desc) {
    const err = new Error(msg); // @ts-ignore

    err.type = "TransportError"; // @ts-ignore

    err.description = desc;
    super.emit("error", err);
    return this;
  }
  /**
   * Opens the transport.
   *
   * @api public
   */


  open() {
    if ("closed" === this.readyState || "" === this.readyState) {
      this.readyState = "opening";
      this.doOpen();
    }

    return this;
  }
  /**
   * Closes the transport.
   *
   * @api public
   */


  close() {
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.doClose();
      this.onClose();
    }

    return this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   * @api public
   */


  send(packets) {
    if ("open" === this.readyState) {
      this.write(packets);
    } else {
      // this might happen if the transport was silently closed in the beforeunload event handler
      transport_debug("transport is not open, discarding packets");
    }
  }
  /**
   * Called upon open
   *
   * @api protected
   */


  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emit("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @api protected
   */


  onData(data) {
    const packet = esm_decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  /**
   * Called with a decoded packet.
   *
   * @api protected
   */


  onPacket(packet) {
    super.emit("packet", packet);
  }
  /**
   * Called upon close.
   *
   * @api protected
   */


  onClose() {
    this.readyState = "closed";
    super.emit("close");
  }

}
// EXTERNAL MODULE: ./node_modules/yeast/index.js
var yeast = __webpack_require__("./node_modules/yeast/index.js");
// EXTERNAL MODULE: ./node_modules/parseqs/index.js
var parseqs = __webpack_require__("./node_modules/parseqs/index.js");
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/transports/polling.js

 // debug()




const polling_debug = src("engine.io-client:polling"); // debug()

class Polling extends Transport {
  constructor() {
    super(...arguments);
    this.polling = false;
  }
  /**
   * Transport name.
   */


  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @api private
   */


  doOpen() {
    this.poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} callback upon buffers are flushed and transport is paused
   * @api private
   */


  pause(onPause) {
    this.readyState = "pausing";

    const pause = () => {
      polling_debug("paused");
      this.readyState = "paused";
      onPause();
    };

    if (this.polling || !this.writable) {
      let total = 0;

      if (this.polling) {
        polling_debug("we are currently polling - waiting to pause");
        total++;
        this.once("pollComplete", function () {
          polling_debug("pre-pause polling complete");
          --total || pause();
        });
      }

      if (!this.writable) {
        polling_debug("we are currently writing - waiting to pause");
        total++;
        this.once("drain", function () {
          polling_debug("pre-pause writing complete");
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  /**
   * Starts polling cycle.
   *
   * @api public
   */


  poll() {
    polling_debug("polling");
    this.polling = true;
    this.doPoll();
    this.emit("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @api private
   */


  onData(data) {
    polling_debug("polling got data %s", data);

    const callback = packet => {
      // if its the first message we consider the transport open
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      } // if its a close packet, we close the ongoing requests


      if ("close" === packet.type) {
        this.onClose();
        return false;
      } // otherwise bypass onData and handle the message


      this.onPacket(packet);
    }; // decode payload


    decodePayload(data, this.socket.binaryType).forEach(callback); // if an event did not trigger closing

    if ("closed" !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emit("pollComplete");

      if ("open" === this.readyState) {
        this.poll();
      } else {
        polling_debug('ignoring poll - transport state "%s"', this.readyState);
      }
    }
  }
  /**
   * For polling, send a close packet.
   *
   * @api private
   */


  doClose() {
    const close = () => {
      polling_debug("writing close packet");
      this.write([{
        type: "close"
      }]);
    };

    if ("open" === this.readyState) {
      polling_debug("transport open - closing");
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      polling_debug("transport not open - deferring close");
      this.once("open", close);
    }
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} data packets
   * @param {Function} drain callback
   * @api private
   */


  write(packets) {
    this.writable = false;
    encodePayload(packets, data => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emit("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @api private
   */


  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "https" : "http";
    let port = ""; // cache busting is forced

    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }

    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    } // avoid port if default for schema


    if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }

    const encodedQuery = parseqs.encode(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }

}
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.js
/* global attachEvent */

 // debug()





const polling_xhr_debug = src("engine.io-client:polling-xhr"); // debug()

/**
 * Empty function
 */

function empty() {}

const hasXHR2 = function () {
  const xhr = new xmlhttprequest({
    xdomain: false
  });
  return null != xhr.responseType;
}();

class XHR extends Polling {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @api public
   */
  constructor(opts) {
    super(opts);

    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port; // some user agents have empty `location.port`

      if (!port) {
        port = isSSL ? "443" : "80";
      }

      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
    /**
     * XHR supports binary
     */


    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }
  /**
   * Creates a request.
   *
   * @param {String} method
   * @api private
   */


  request(opts = {}) {
    Object.assign(opts, {
      xd: this.xd,
      xs: this.xs
    }, this.opts);
    return new Request(this.uri(), opts);
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @api private
   */


  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data: data
    });
    req.on("success", fn);
    req.on("error", err => {
      this.onError("xhr post error", err);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @api private
   */


  doPoll() {
    polling_xhr_debug("xhr poll");
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", err => {
      this.onError("xhr poll error", err);
    });
    this.pollXhr = req;
  }

}
class Request extends component_emitter/* Emitter */.Q {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @api public
   */
  constructor(uri, opts) {
    super();
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.async = false !== opts.async;
    this.data = undefined !== opts.data ? opts.data : null;
    this.create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @api private
   */


  create() {
    const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    opts.xscheme = !!this.opts.xs;
    const xhr = this.xhr = new xmlhttprequest(opts);

    try {
      polling_xhr_debug("xhr open %s: %s", this.method, this.uri);
      xhr.open(this.method, this.uri, this.async);

      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

          for (let i in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}

      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {}
      }

      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {} // ie6 check


      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }

      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }

      xhr.onreadystatechange = () => {
        if (4 !== xhr.readyState) return;

        if (200 === xhr.status || 1223 === xhr.status) {
          this.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };

      polling_xhr_debug("xhr data %s", this.data);
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly from the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      this.setTimeoutFn(() => {
        this.onError(e);
      }, 0);
      return;
    }

    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }
  /**
   * Called upon successful response.
   *
   * @api private
   */


  onSuccess() {
    this.emit("success");
    this.cleanup();
  }
  /**
   * Called if we have data.
   *
   * @api private
   */


  onData(data) {
    this.emit("data", data);
    this.onSuccess();
  }
  /**
   * Called upon error.
   *
   * @api private
   */


  onError(err) {
    this.emit("error", err);
    this.cleanup(true);
  }
  /**
   * Cleans up house.
   *
   * @api private
   */


  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }

    this.xhr.onreadystatechange = empty;

    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }

    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }

    this.xhr = null;
  }
  /**
   * Called upon load.
   *
   * @api private
   */


  onLoad() {
    const data = this.xhr.responseText;

    if (data !== null) {
      this.onData(data);
    }
  }
  /**
   * Aborts the request.
   *
   * @api public
   */


  abort() {
    this.cleanup();
  }

}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

if (typeof document !== "undefined") {
  // @ts-ignore
  if (typeof attachEvent === "function") {
    // @ts-ignore
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}

function unloadHandler() {
  for (let i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}
// EXTERNAL MODULE: ./node_modules/engine.io-client/node_modules/ws/lib/stream.js
var stream = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/stream.js");
// EXTERNAL MODULE: ./node_modules/engine.io-client/node_modules/ws/lib/receiver.js
var receiver = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/receiver.js");
// EXTERNAL MODULE: ./node_modules/engine.io-client/node_modules/ws/lib/sender.js
var sender = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/sender.js");
// EXTERNAL MODULE: ./node_modules/engine.io-client/node_modules/ws/lib/websocket.js
var websocket = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/websocket.js");
// EXTERNAL MODULE: ./node_modules/engine.io-client/node_modules/ws/lib/websocket-server.js
var websocket_server = __webpack_require__("./node_modules/engine.io-client/node_modules/ws/lib/websocket-server.js");
;// CONCATENATED MODULE: ./node_modules/engine.io-client/node_modules/ws/wrapper.mjs







/* harmony default export */ const wrapper = (websocket);

;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/transports/websocket-constructor.js

const WebSocket = wrapper;
const usingBrowserWebSocket = false;
const defaultBinaryType = "nodebuffer";
const nextTick = process.nextTick;
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/transports/websocket.js





 // debug()


const websocket_debug = src("engine.io-client:websocket"); // debug()
// detect ReactNative environment

const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class WS extends Transport {
  /**
   * WebSocket transport constructor.
   *
   * @api {Object} connection options
   * @api public
   */
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  /**
   * Transport name.
   *
   * @api public
   */


  get name() {
    return "websocket";
  }
  /**
   * Opens socket.
   *
   * @api private
   */


  doOpen() {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    const uri = this.uri();
    const protocols = this.opts.protocols; // React Native only supports the 'headers' option, and will print a warning if anything else is passed

    const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");

    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }

    try {
      this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emit("error", err);
    }

    this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
    this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @api private
   */


  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }

      this.onOpen();
    };

    this.ws.onclose = this.onClose.bind(this);

    this.ws.onmessage = ev => this.onData(ev.data);

    this.ws.onerror = e => this.onError("websocket error", e);
  }
  /**
   * Writes data to socket.
   *
   * @param {Array} array of packets.
   * @api private
   */


  write(packets) {
    this.writable = false; // encodePacket efficient as it uses WS framing
    // no need for encodePayload

    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      esm_encodePacket(packet, this.supportsBinary, data => {
        // always create a new object (GH-437)
        const opts = {};

        if (!usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (this.opts.perMessageDeflate) {
            const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;

            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        } // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error


        try {
          if (usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            this.ws.send(data);
          } else {
            this.ws.send(data, opts);
          }
        } catch (e) {
          websocket_debug("websocket closed before onclose event");
        }

        if (lastPacket) {
          // fake drain
          // defer to next tick to allow Socket to clear writeBuffer
          nextTick(() => {
            this.writable = true;
            this.emit("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  /**
   * Closes socket.
   *
   * @api private
   */


  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  /**
   * Generates uri for connection.
   *
   * @api private
   */


  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "wss" : "ws";
    let port = ""; // avoid port if default for schema

    if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    } // append timestamp to URI


    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    } // communicate binary support capabilities


    if (!this.supportsBinary) {
      query.b64 = 1;
    }

    const encodedQuery = parseqs.encode(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @api public
   */


  check() {
    return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
  }

}
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/transports/index.js


const transports = {
  websocket: WS,
  polling: XHR
};
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/socket.js




 // debug()



const socket_debug = src("engine.io-client:socket"); // debug()

class Socket extends component_emitter/* Emitter */.Q {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri or options
   * @param {Object} opts - options
   * @api public
   */
  constructor(uri, opts = {}) {
    super();

    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }

    if (uri) {
      uri = parseuri(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri(opts.host).host;
    }

    installTimerFunctions(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;

    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? "443" : "80";
    }

    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || ["polling", "websocket"];
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: true
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + "/";

    if (typeof this.opts.query === "string") {
      this.opts.query = parseqs.decode(this.opts.query);
    } // set on handshake


    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null; // set on heartbeat

    this.pingTimeoutTimer = null;

    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
        // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
        // closed/reloaded)
        addEventListener("beforeunload", () => {
          if (this.transport) {
            // silently close the transport
            this.transport.removeAllListeners();
            this.transport.close();
          }
        }, false);
      }

      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close");
        };

        addEventListener("offline", this.offlineEventListener, false);
      }
    }

    this.open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} transport name
   * @return {Transport}
   * @api private
   */


  createTransport(name) {
    socket_debug('creating transport "%s"', name);
    const query = clone(this.opts.query); // append engine.io protocol identifier

    query.EIO = protocol; // transport name

    query.transport = name; // session id if we already have one

    if (this.id) query.sid = this.id;
    const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    });
    socket_debug("options: %j", opts);
    return new transports[name](opts);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @api private
   */


  open() {
    let transport;

    if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }

    this.readyState = "opening"; // Retry with the next transport if the transport is disabled (jsonp: false)

    try {
      transport = this.createTransport(transport);
    } catch (e) {
      socket_debug("error while creating transport: %s", e);
      this.transports.shift();
      this.open();
      return;
    }

    transport.open();
    this.setTransport(transport);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @api private
   */


  setTransport(transport) {
    socket_debug("setting transport %s", transport.name);

    if (this.transport) {
      socket_debug("clearing existing transport %s", this.transport.name);
      this.transport.removeAllListeners();
    } // set up transport


    this.transport = transport; // set up transport listeners

    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", () => {
      this.onClose("transport close");
    });
  }
  /**
   * Probes a transport.
   *
   * @param {String} transport name
   * @api private
   */


  probe(name) {
    socket_debug('probing transport "%s"', name);
    let transport = this.createTransport(name);
    let failed = false;
    Socket.priorWebsocketSuccess = false;

    const onTransportOpen = () => {
      if (failed) return;
      socket_debug('probe transport "%s" opened', name);
      transport.send([{
        type: "ping",
        data: "probe"
      }]);
      transport.once("packet", msg => {
        if (failed) return;

        if ("pong" === msg.type && "probe" === msg.data) {
          socket_debug('probe transport "%s" pong', name);
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = "websocket" === transport.name;
          socket_debug('pausing current transport "%s"', this.transport.name);
          this.transport.pause(() => {
            if (failed) return;
            if ("closed" === this.readyState) return;
            socket_debug("changing transport and sending upgrade packet");
            cleanup();
            this.setTransport(transport);
            transport.send([{
              type: "upgrade"
            }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          socket_debug('probe transport "%s" failed', name);
          const err = new Error("probe error"); // @ts-ignore

          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };

    function freezeTransport() {
      if (failed) return; // Any callback called by transport should be ignored since now

      failed = true;
      cleanup();
      transport.close();
      transport = null;
    } // Handle any error that happens while probing


    const onerror = err => {
      const error = new Error("probe error: " + err); // @ts-ignore

      error.transport = transport.name;
      freezeTransport();
      socket_debug('probe transport "%s" failed because of error: %s', name, err);
      this.emitReserved("upgradeError", error);
    };

    function onTransportClose() {
      onerror("transport closed");
    } // When the socket is closed while we're probing


    function onclose() {
      onerror("socket closed");
    } // When the socket is upgraded while we're probing


    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        socket_debug('"%s" works - aborting "%s"', to.name, transport.name);
        freezeTransport();
      }
    } // Remove all listeners on the transport and on self


    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };

    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    transport.open();
  }
  /**
   * Called when connection is deemed open.
   *
   * @api private
   */


  onOpen() {
    socket_debug("socket open");
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush(); // we check for `readyState` in case an `open`
    // listener already closed the socket

    if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
      socket_debug("starting upgrade probes");
      let i = 0;
      const l = this.upgrades.length;

      for (; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  }
  /**
   * Handles a packet.
   *
   * @api private
   */


  onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      socket_debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
      this.emitReserved("packet", packet); // Socket is live - any packet counts

      this.emitReserved("heartbeat");

      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;

        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;

        case "error":
          const err = new Error("server error"); // @ts-ignore

          err.code = packet.data;
          this.onError(err);
          break;

        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {
      socket_debug('packet received with socket readyState "%s"', this.readyState);
    }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @api private
   */


  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen(); // In case open handler closes socket

    if ("closed" === this.readyState) return;
    this.resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @api private
   */


  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);

    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  /**
   * Called on `drain` event
   *
   * @api private
   */


  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`

    this.prevBufferLen = 0;

    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  /**
   * Flush write buffers.
   *
   * @api private
   */


  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      socket_debug("flushing %d packets in socket", this.writeBuffer.length);
      this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`

      this.prevBufferLen = this.writeBuffer.length;
      this.emitReserved("flush");
    }
  }
  /**
   * Sends a message.
   *
   * @param {String} message.
   * @param {Function} callback function.
   * @param {Object} options.
   * @return {Socket} for chaining.
   * @api public
   */


  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }

  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} callback function.
   * @api private
   */


  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = undefined;
    }

    if ("function" === typeof options) {
      fn = options;
      options = null;
    }

    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }

    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type: type,
      data: data,
      options: options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn) this.once("flush", fn);
    this.flush();
  }
  /**
   * Closes the connection.
   *
   * @api public
   */


  close() {
    const close = () => {
      this.onClose("forced close");
      socket_debug("socket closing - telling transport to close");
      this.transport.close();
    };

    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };

    const waitForUpgrade = () => {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };

    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";

      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }

    return this;
  }
  /**
   * Called upon transport error
   *
   * @api private
   */


  onError(err) {
    socket_debug("socket error %j", err);
    Socket.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  /**
   * Called upon transport close.
   *
   * @api private
   */


  onClose(reason, desc) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      socket_debug('socket close with reason: "%s"', reason); // clear timers

      this.clearTimeoutFn(this.pingTimeoutTimer); // stop event from firing again for transport

      this.transport.removeAllListeners("close"); // ensure transport won't stay open

      this.transport.close(); // ignore further transport communication

      this.transport.removeAllListeners();

      if (typeof removeEventListener === "function") {
        removeEventListener("offline", this.offlineEventListener, false);
      } // set ready state


      this.readyState = "closed"; // clear session id

      this.id = null; // emit close event

      this.emitReserved("close", reason, desc); // clean buffers after, so users can still
      // grab the buffers on `close` event

      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} server upgrades
   * @api private
   *
   */


  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i = 0;
    const j = upgrades.length;

    for (; i < j; i++) {
      if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
    }

    return filteredUpgrades;
  }

}
Socket.protocol = protocol;

function clone(obj) {
  const o = {};

  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }

  return o;
}
;// CONCATENATED MODULE: ./node_modules/engine.io-client/build/esm-debug/index.js


const esm_debug_protocol = Socket.protocol;



;// CONCATENATED MODULE: ./node_modules/socket.io-parser/build/esm-debug/is-binary.js
const withNativeArrayBuffer = typeof ArrayBuffer === "function";

const isView = obj => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};

const is_binary_toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && is_binary_toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && is_binary_toString.call(File) === "[object FileConstructor]";
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */

function isBinary(obj) {
  return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }

    return false;
  }

  if (isBinary(obj)) {
    return true;
  }

  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}
;// CONCATENATED MODULE: ./node_modules/socket.io-parser/build/esm-debug/binary.js

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */

function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'

  return {
    packet: pack,
    buffers: buffers
  };
}

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBinary(data)) {
    const placeholder = {
      _placeholder: true,
      num: buffers.length
    };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);

    for (let i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }

    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }

    return newData;
  }

  return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */


function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful

  return packet;
}

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }

  return data;
}
;// CONCATENATED MODULE: ./node_modules/socket.io-parser/build/esm-debug/index.js



 // debug()

const esm_debug_debug = src("socket.io-parser"); // debug()

/**
 * Protocol version.
 *
 * @public
 */

const build_esm_debug_protocol = 5;
var PacketType;

(function (PacketType) {
  PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
  PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType[PacketType["EVENT"] = 2] = "EVENT";
  PacketType[PacketType["ACK"] = 3] = "ACK";
  PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */


class Encoder {
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(obj) {
    esm_debug_debug("encoding packet %j", obj);

    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if (hasBinary(obj)) {
        obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
        return this.encodeAsBinary(obj);
      }
    }

    return [this.encodeAsString(obj)];
  }
  /**
   * Encode packet as string.
   */


  encodeAsString(obj) {
    // first is type
    let str = "" + obj.type; // attachments if we have them

    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    } // if we have a namespace other than `/`
    // we append it followed by a comma `,`


    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    } // immediately followed by the id


    if (null != obj.id) {
      str += obj.id;
    } // json data


    if (null != obj.data) {
      str += JSON.stringify(obj.data);
    }

    esm_debug_debug("encoded %j as %s", obj, str);
    return str;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */


  encodeAsBinary(obj) {
    const deconstruction = deconstructPacket(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack); // add packet info to beginning of data list

    return buffers; // write all the buffers
  }

}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */

class Decoder extends component_emitter/* Emitter */.Q {
  constructor() {
    super();
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */


  add(obj) {
    let packet;

    if (typeof obj === "string") {
      packet = this.decodeString(obj);

      if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
        // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        // non-binary full packet
        super.emitReserved("decoded", packet);
      }
    } else if (isBinary(obj) || obj.base64) {
      // raw binary data
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);

        if (packet) {
          // received final buffer
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */


  decodeString(str) {
    let i = 0; // look up type

    const p = {
      type: Number(str.charAt(0))
    };

    if (PacketType[p.type] === undefined) {
      throw new Error("unknown packet type " + p.type);
    } // look up attachments if type binary


    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start = i + 1;

      while (str.charAt(++i) !== "-" && i != str.length) {}

      const buf = str.substring(start, i);

      if (buf != Number(buf) || str.charAt(i) !== "-") {
        throw new Error("Illegal attachments");
      }

      p.attachments = Number(buf);
    } // look up namespace (if any)


    if ("/" === str.charAt(i + 1)) {
      const start = i + 1;

      while (++i) {
        const c = str.charAt(i);
        if ("," === c) break;
        if (i === str.length) break;
      }

      p.nsp = str.substring(start, i);
    } else {
      p.nsp = "/";
    } // look up id


    const next = str.charAt(i + 1);

    if ("" !== next && Number(next) == next) {
      const start = i + 1;

      while (++i) {
        const c = str.charAt(i);

        if (null == c || Number(c) != c) {
          --i;
          break;
        }

        if (i === str.length) break;
      }

      p.id = Number(str.substring(start, i + 1));
    } // look up json data


    if (str.charAt(++i)) {
      const payload = tryParse(str.substr(i));

      if (Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }

    esm_debug_debug("decoded %s as %j", str, p);
    return p;
  }

  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return typeof payload === "object";

      case PacketType.DISCONNECT:
        return payload === undefined;

      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || typeof payload === "object";

      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && payload.length > 0;

      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  /**
   * Deallocates a parser's resources
   */


  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  }

}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */


class BinaryReconstructor {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */


  takeBinaryData(binData) {
    this.buffers.push(binData);

    if (this.buffers.length === this.reconPack.attachments) {
      // done with buffer list
      const packet = reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }

    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */


  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }

}
;// CONCATENATED MODULE: ./node_modules/socket.io-client/build/esm-debug/on.js
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}
;// CONCATENATED MODULE: ./node_modules/socket.io-client/build/esm-debug/socket.js



 // debug()

const esm_debug_socket_debug = src("socket.io-client:socket"); // debug()

/**
 * Internal events.
 * These events can't be emitted by the user.
 */

const RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class socket_Socket extends component_emitter/* Emitter */.Q {
  /**
   * `Socket` constructor.
   *
   * @public
   */
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.disconnected = true;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;

    if (opts && opts.auth) {
      this.auth = opts.auth;
    }

    if (this.io._autoConnect) this.open();
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */


  subEvents() {
    if (this.subs) return;
    const io = this.io;
    this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects
   */


  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @public
   */


  connect() {
    if (this.connected) return this;
    this.subEvents();
    if (!this.io["_reconnecting"]) this.io.open(); // ensure open

    if ("open" === this.io._readyState) this.onopen();
    return this;
  }
  /**
   * Alias for connect()
   */


  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * @return self
   * @public
   */


  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @return self
   * @public
   */


  emit(ev, ...args) {
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev + '" is a reserved event name');
    }

    args.unshift(ev);
    const packet = {
      type: PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false; // event ack callback

    if ("function" === typeof args[args.length - 1]) {
      const id = this.ids++;
      esm_debug_socket_debug("emitting packet with ack id %d", id);
      const ack = args.pop();

      this._registerAckCallback(id, ack);

      packet.id = id;
    }

    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);

    if (discardPacket) {
      esm_debug_socket_debug("discard packet as the transport is not currently writable");
    } else if (this.connected) {
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }

    this.flags = {};
    return this;
  }
  /**
   * @private
   */


  _registerAckCallback(id, ack) {
    const timeout = this.flags.timeout;

    if (timeout === undefined) {
      this.acks[id] = ack;
      return;
    } // @ts-ignore


    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];

      for (let i = 0; i < this.sendBuffer.length; i++) {
        if (this.sendBuffer[i].id === id) {
          esm_debug_socket_debug("removing packet with ack id %d from the buffer", id);
          this.sendBuffer.splice(i, 1);
        }
      }

      esm_debug_socket_debug("event with ack id %d has timed out after %d ms", id, timeout);
      ack.call(this, new Error("operation has timed out"));
    }, timeout);

    this.acks[id] = (...args) => {
      // @ts-ignore
      this.io.clearTimeoutFn(timer);
      ack.apply(this, [null, ...args]);
    };
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */


  packet(packet) {
    packet.nsp = this.nsp;

    this.io._packet(packet);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */


  onopen() {
    esm_debug_socket_debug("transport is open - connecting");

    if (typeof this.auth == "function") {
      this.auth(data => {
        this.packet({
          type: PacketType.CONNECT,
          data
        });
      });
    } else {
      this.packet({
        type: PacketType.CONNECT,
        data: this.auth
      });
    }
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */


  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @private
   */


  onclose(reason) {
    esm_debug_socket_debug("close (%s)", reason);
    this.connected = false;
    this.disconnected = true;
    delete this.id;
    this.emitReserved("disconnect", reason);
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */


  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace) return;

    switch (packet.type) {
      case PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          const id = packet.data.sid;
          this.onconnect(id);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }

        break;

      case PacketType.EVENT:
        this.onevent(packet);
        break;

      case PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;

      case PacketType.ACK:
        this.onack(packet);
        break;

      case PacketType.BINARY_ACK:
        this.onack(packet);
        break;

      case PacketType.DISCONNECT:
        this.ondisconnect();
        break;

      case PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message); // @ts-ignore

        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */


  onevent(packet) {
    const args = packet.data || [];
    esm_debug_socket_debug("emitting event %j", args);

    if (null != packet.id) {
      esm_debug_socket_debug("attaching ack callback to event");
      args.push(this.ack(packet.id));
    }

    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }

  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();

      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }

    super.emit.apply(this, args);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */


  ack(id) {
    const self = this;
    let sent = false;
    return function (...args) {
      // prevent double callbacks
      if (sent) return;
      sent = true;
      esm_debug_socket_debug("sending ack %j", args);
      self.packet({
        type: PacketType.ACK,
        id: id,
        data: args
      });
    };
  }
  /**
   * Called upon a server acknowlegement.
   *
   * @param packet
   * @private
   */


  onack(packet) {
    const ack = this.acks[packet.id];

    if ("function" === typeof ack) {
      esm_debug_socket_debug("calling ack %s with %j", packet.id, packet.data);
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {
      esm_debug_socket_debug("bad ack %s", packet.id);
    }
  }
  /**
   * Called upon server connect.
   *
   * @private
   */


  onconnect(id) {
    esm_debug_socket_debug("socket connected with id %s", id);
    this.id = id;
    this.connected = true;
    this.disconnected = false;
    this.emitBuffered();
    this.emitReserved("connect");
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */


  emitBuffered() {
    this.receiveBuffer.forEach(args => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach(packet => this.packet(packet));
    this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */


  ondisconnect() {
    esm_debug_socket_debug("server disconnect (%s)", this.nsp);
    this.destroy();
    this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */


  destroy() {
    if (this.subs) {
      // clean subscriptions to avoid reconnections
      this.subs.forEach(subDestroy => subDestroy());
      this.subs = undefined;
    }

    this.io["_destroy"](this);
  }
  /**
   * Disconnects the socket manually.
   *
   * @return self
   * @public
   */


  disconnect() {
    if (this.connected) {
      esm_debug_socket_debug("performing disconnect (%s)", this.nsp);
      this.packet({
        type: PacketType.DISCONNECT
      });
    } // remove socket from pool


    this.destroy();

    if (this.connected) {
      // fire events
      this.onclose("io client disconnect");
    }

    return this;
  }
  /**
   * Alias for disconnect()
   *
   * @return self
   * @public
   */


  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   * @public
   */


  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @returns self
   * @public
   */


  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * ```
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   * ```
   *
   * @returns self
   * @public
   */


  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @param listener
   * @public
   */


  onAny(listener) {
    this._anyListeners = this._anyListeners || [];

    this._anyListeners.push(listener);

    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @param listener
   * @public
   */


  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];

    this._anyListeners.unshift(listener);

    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @param listener
   * @public
   */


  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }

    if (listener) {
      const listeners = this._anyListeners;

      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }

    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   *
   * @public
   */


  listenersAny() {
    return this._anyListeners || [];
  }

}
// EXTERNAL MODULE: ./node_modules/backo2/index.js
var backo2 = __webpack_require__("./node_modules/backo2/index.js");
;// CONCATENATED MODULE: ./node_modules/socket.io-client/build/esm-debug/manager.js






 // debug()

const manager_debug = src("socket.io-client:manager"); // debug()

class Manager extends component_emitter/* Emitter */.Q {
  constructor(uri, opts) {
    var _a;

    super();
    this.nsps = {};
    this.subs = [];

    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    installTimerFunctions(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1000);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new backo2({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 20000 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;

    const _parser = opts.parser || build_esm_debug_namespaceObject;

    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect) this.open();
  }

  reconnection(v) {
    if (!arguments.length) return this._reconnection;
    this._reconnection = !!v;
    return this;
  }

  reconnectionAttempts(v) {
    if (v === undefined) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }

  reconnectionDelay(v) {
    var _a;

    if (v === undefined) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }

  randomizationFactor(v) {
    var _a;

    if (v === undefined) return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }

  reconnectionDelayMax(v) {
    var _a;

    if (v === undefined) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }

  timeout(v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */


  maybeReconnectOnOpen() {
    // Only try to reconnect if it's the first time we're connecting
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      // keeps reconnection from firing twice for the same reconnection loop
      this.reconnect();
    }
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */


  open(fn) {
    manager_debug("readyState %s", this._readyState);
    if (~this._readyState.indexOf("open")) return this;
    manager_debug("opening %s", this.uri);
    this.engine = new Socket(this.uri, this.opts);
    const socket = this.engine;
    const self = this;
    this._readyState = "opening";
    this.skipReconnect = false; // emit `open`

    const openSubDestroy = on(socket, "open", function () {
      self.onopen();
      fn && fn();
    }); // emit `error`

    const errorSub = on(socket, "error", err => {
      manager_debug("error");
      self.cleanup();
      self._readyState = "closed";
      this.emitReserved("error", err);

      if (fn) {
        fn(err);
      } else {
        // Only do this if there is no fn to handle the error
        self.maybeReconnectOnOpen();
      }
    });

    if (false !== this._timeout) {
      const timeout = this._timeout;
      manager_debug("connect attempt will timeout after %d", timeout);

      if (timeout === 0) {
        openSubDestroy(); // prevents a race condition with the 'open' event
      } // set timer


      const timer = this.setTimeoutFn(() => {
        manager_debug("connect attempt timed out after %d", timeout);
        openSubDestroy();
        socket.close(); // @ts-ignore

        socket.emit("error", new Error("timeout"));
      }, timeout);

      if (this.opts.autoUnref) {
        timer.unref();
      }

      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }

    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */


  connect(fn) {
    return this.open(fn);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */


  onopen() {
    manager_debug("open"); // clear old subs

    this.cleanup(); // mark as open

    this._readyState = "open";
    this.emitReserved("open"); // add new subs

    const socket = this.engine;
    this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  /**
   * Called upon a ping.
   *
   * @private
   */


  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */


  ondata(data) {
    this.decoder.add(data);
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */


  ondecoded(packet) {
    this.emitReserved("packet", packet);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */


  onerror(err) {
    manager_debug("error", err);
    this.emitReserved("error", err);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */


  socket(nsp, opts) {
    let socket = this.nsps[nsp];

    if (!socket) {
      socket = new socket_Socket(this, nsp, opts);
      this.nsps[nsp] = socket;
    }

    return socket;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */


  _destroy(socket) {
    const nsps = Object.keys(this.nsps);

    for (const nsp of nsps) {
      const socket = this.nsps[nsp];

      if (socket.active) {
        manager_debug("socket %s is still active, skipping close", nsp);
        return;
      }
    }

    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */


  _packet(packet) {
    manager_debug("writing packet %j", packet);
    const encodedPackets = this.encoder.encode(packet);

    for (let i = 0; i < encodedPackets.length; i++) {
      this.engine.write(encodedPackets[i], packet.options);
    }
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */


  cleanup() {
    manager_debug("cleanup");
    this.subs.forEach(subDestroy => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */


  _close() {
    manager_debug("disconnect");
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine) this.engine.close();
  }
  /**
   * Alias for close()
   *
   * @private
   */


  disconnect() {
    return this._close();
  }
  /**
   * Called upon engine close.
   *
   * @private
   */


  onclose(reason) {
    manager_debug("closed due to %s", reason);
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason);

    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */


  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const self = this;

    if (this.backoff.attempts >= this._reconnectionAttempts) {
      manager_debug("reconnect failed");
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      manager_debug("will wait %dms before reconnect attempt", delay);
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self.skipReconnect) return;
        manager_debug("attempting reconnect");
        this.emitReserved("reconnect_attempt", self.backoff.attempts); // check again for the case socket closed in above events

        if (self.skipReconnect) return;
        self.open(err => {
          if (err) {
            manager_debug("reconnect attempt error");
            self._reconnecting = false;
            self.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            manager_debug("reconnect success");
            self.onreconnect();
          }
        });
      }, delay);

      if (this.opts.autoUnref) {
        timer.unref();
      }

      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */


  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }

}
;// CONCATENATED MODULE: ./node_modules/socket.io-client/build/esm-debug/index.js



 // debug()

const build_esm_debug_debug = src("socket.io-client"); // debug()

/**
 * Managers cache.
 */

const cache = {};

function lookup(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};
  const parsed = url(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;

  if (newConnection) {
    build_esm_debug_debug("ignoring socket cache for %s", source);
    io = new Manager(source, opts);
  } else {
    if (!cache[id]) {
      build_esm_debug_debug("new io instance for %s", source);
      cache[id] = new Manager(source, opts);
    }

    io = cache[id];
  }

  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }

  return io.socket(parsed.path, opts);
} // so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility


Object.assign(lookup, {
  Manager: Manager,
  Socket: socket_Socket,
  io: lookup,
  connect: lookup
});
/**
 * Protocol version.
 *
 * @public
 */


/**
 * Expose constructors for standalone build.
 *
 * @public
 */



/***/ }),

/***/ "./node_modules/supports-color/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const os = __webpack_require__("os");

const hasFlag = __webpack_require__("./node_modules/has-flag/index.js");

const env = process.env;
let forceColor;

if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
  forceColor = false;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
  forceColor = true;
}

if ('FORCE_COLOR' in env) {
  forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
  if (level === 0) {
    return false;
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}

function supportsColor(stream) {
  if (forceColor === false) {
    return 0;
  }

  if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
    return 3;
  }

  if (hasFlag('color=256')) {
    return 2;
  }

  if (stream && !stream.isTTY && forceColor !== true) {
    return 0;
  }

  const min = forceColor ? 1 : 0;

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
    // release that supports 256 colors. Windows 10 build 14931 is the first release
    // that supports 16m/TrueColor.
    const osRelease = os.release().split('.');

    if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }

    return 1;
  }

  if ('CI' in env) {
    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
      return 1;
    }

    return min;
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }

  if (env.COLORTERM === 'truecolor') {
    return 3;
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2;

      case 'Apple_Terminal':
        return 2;
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }

  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }

  if ('COLORTERM' in env) {
    return 1;
  }

  if (env.TERM === 'dumb') {
    return min;
  }

  return min;
}

function getSupportLevel(stream) {
  const level = supportsColor(stream);
  return translateLevel(level);
}

module.exports = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr)
};

/***/ }),

/***/ "./node_modules/uuid/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var v1 = __webpack_require__("./node_modules/uuid/v1.js");

var v4 = __webpack_require__("./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
module.exports = uuid;

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

module.exports = bytesToUuid;

/***/ }),

/***/ "./node_modules/uuid/lib/rng.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.
var crypto = __webpack_require__("crypto");

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};

/***/ }),

/***/ "./node_modules/uuid/v1.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__("./node_modules/uuid/lib/rng.js");

var bytesToUuid = __webpack_require__("./node_modules/uuid/lib/bytesToUuid.js"); // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html


var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = rng();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__("./node_modules/uuid/lib/rng.js");

var bytesToUuid = __webpack_require__("./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

/***/ }),

/***/ "./node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
 *
 * This can be used with JS designed for browsers to improve reuse of code and
 * allow the use of existing libraries.
 *
 * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
 *
 * @author Dan DeFelippi <dan@driverdan.com>
 * @contributor David Ellis <d.f.ellis@ieee.org>
 * @license MIT
 */
var fs = __webpack_require__("fs");

var Url = __webpack_require__("url");

var spawn = __webpack_require__("child_process").spawn;
/**
 * Module exports.
 */


module.exports = XMLHttpRequest; // backwards-compat

XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;
/**
 * `XMLHttpRequest` constructor.
 *
 * Supported options for the `opts` object are:
 *
 *  - `agent`: An http.Agent instance; http.globalAgent may be used; if 'undefined', agent usage is disabled
 *
 * @param {Object} opts optional "options" object
 */

function XMLHttpRequest(opts) {
  "use strict";

  opts = opts || {};
  /**
   * Private variables
   */

  var self = this;

  var http = __webpack_require__("http");

  var https = __webpack_require__("https"); // Holds http.js objects


  var request;
  var response; // Request settings

  var settings = {}; // Disable header blacklist.
  // Not part of XHR specs.

  var disableHeaderCheck = false; // Set some default headers

  var defaultHeaders = {
    "User-Agent": "node-XMLHttpRequest",
    "Accept": "*/*"
  };
  var headers = Object.assign({}, defaultHeaders); // These headers are not user setable.
  // The following are allowed but banned in the spec:
  // * user-agent

  var forbiddenRequestHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "content-transfer-encoding", "cookie", "cookie2", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"]; // These request methods are not allowed

  var forbiddenRequestMethods = ["TRACE", "TRACK", "CONNECT"]; // Send flag

  var sendFlag = false; // Error flag, used when errors occur or abort is called

  var errorFlag = false;
  var abortedFlag = false; // Event listeners

  var listeners = {};
  /**
   * Constants
   */

  this.UNSENT = 0;
  this.OPENED = 1;
  this.HEADERS_RECEIVED = 2;
  this.LOADING = 3;
  this.DONE = 4;
  /**
   * Public vars
   */
  // Current state

  this.readyState = this.UNSENT; // default ready state change handler in case one is not set or is set late

  this.onreadystatechange = null; // Result & response

  this.responseText = "";
  this.responseXML = "";
  this.status = null;
  this.statusText = null;
  /**
   * Private methods
   */

  /**
   * Check if the specified header is allowed.
   *
   * @param string header Header to validate
   * @return boolean False if not allowed, otherwise true
   */

  var isAllowedHttpHeader = function (header) {
    return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
  };
  /**
   * Check if the specified method is allowed.
   *
   * @param string method Request method to validate
   * @return boolean False if not allowed, otherwise true
   */


  var isAllowedHttpMethod = function (method) {
    return method && forbiddenRequestMethods.indexOf(method) === -1;
  };
  /**
   * Public methods
   */

  /**
   * Open the connection. Currently supports local server requests.
   *
   * @param string method Connection method (eg GET, POST)
   * @param string url URL for the connection.
   * @param boolean async Asynchronous connection. Default is true.
   * @param string user Username for basic authentication (optional)
   * @param string password Password for basic authentication (optional)
   */


  this.open = function (method, url, async, user, password) {
    this.abort();
    errorFlag = false;
    abortedFlag = false; // Check for valid request method

    if (!isAllowedHttpMethod(method)) {
      throw new Error("SecurityError: Request method not allowed");
    }

    settings = {
      "method": method,
      "url": url.toString(),
      "async": typeof async !== "boolean" ? true : async,
      "user": user || null,
      "password": password || null
    };
    setState(this.OPENED);
  };
  /**
   * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
   * This does not conform to the W3C spec.
   *
   * @param boolean state Enable or disable header checking.
   */


  this.setDisableHeaderCheck = function (state) {
    disableHeaderCheck = state;
  };
  /**
   * Sets a header for the request.
   *
   * @param string header Header name
   * @param string value Header value
   * @return boolean Header added
   */


  this.setRequestHeader = function (header, value) {
    if (this.readyState != this.OPENED) {
      throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
    }

    if (!isAllowedHttpHeader(header)) {
      console.warn('Refused to set unsafe header "' + header + '"');
      return false;
    }

    if (sendFlag) {
      throw new Error("INVALID_STATE_ERR: send flag is true");
    }

    headers[header] = value;
    return true;
  };
  /**
   * Gets a header from the server response.
   *
   * @param string header Name of header to get.
   * @return string Text of the header or null if it doesn't exist.
   */


  this.getResponseHeader = function (header) {
    if (typeof header === "string" && this.readyState > this.OPENED && response.headers[header.toLowerCase()] && !errorFlag) {
      return response.headers[header.toLowerCase()];
    }

    return null;
  };
  /**
   * Gets all the response headers.
   *
   * @return string A string with all response headers separated by CR+LF
   */


  this.getAllResponseHeaders = function () {
    if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
      return "";
    }

    var result = "";

    for (var i in response.headers) {
      // Cookie headers are excluded
      if (i !== "set-cookie" && i !== "set-cookie2") {
        result += i + ": " + response.headers[i] + "\r\n";
      }
    }

    return result.substr(0, result.length - 2);
  };
  /**
   * Gets a request header
   *
   * @param string name Name of header to get
   * @return string Returns the request header or empty string if not set
   */


  this.getRequestHeader = function (name) {
    // @TODO Make this case insensitive
    if (typeof name === "string" && headers[name]) {
      return headers[name];
    }

    return "";
  };
  /**
   * Sends the request to the server.
   *
   * @param string data Optional data to send as request body.
   */


  this.send = function (data) {
    if (this.readyState != this.OPENED) {
      throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
    }

    if (sendFlag) {
      throw new Error("INVALID_STATE_ERR: send has already been called");
    }

    var ssl = false,
        local = false;
    var url = Url.parse(settings.url);
    var host; // Determine the server

    switch (url.protocol) {
      case 'https:':
        ssl = true;
      // SSL & non-SSL both need host, no break here.

      case 'http:':
        host = url.hostname;
        break;

      case 'file:':
        local = true;
        break;

      case undefined:
      case '':
        host = "localhost";
        break;

      default:
        throw new Error("Protocol not supported.");
    } // Load files off the local filesystem (file://)


    if (local) {
      if (settings.method !== "GET") {
        throw new Error("XMLHttpRequest: Only GET method is supported");
      }

      if (settings.async) {
        fs.readFile(unescape(url.pathname), 'utf8', function (error, data) {
          if (error) {
            self.handleError(error, error.errno || -1);
          } else {
            self.status = 200;
            self.responseText = data;
            setState(self.DONE);
          }
        });
      } else {
        try {
          this.responseText = fs.readFileSync(unescape(url.pathname), 'utf8');
          this.status = 200;
          setState(self.DONE);
        } catch (e) {
          this.handleError(e, e.errno || -1);
        }
      }

      return;
    } // Default to port 80. If accessing localhost on another port be sure
    // to use http://localhost:port/path


    var port = url.port || (ssl ? 443 : 80); // Add query string if one is used

    var uri = url.pathname + (url.search ? url.search : ''); // Set the Host header or the server may reject the request

    headers["Host"] = host;

    if (!(ssl && port === 443 || port === 80)) {
      headers["Host"] += ':' + url.port;
    } // Set Basic Auth if necessary


    if (settings.user) {
      if (typeof settings.password == "undefined") {
        settings.password = "";
      }

      var authBuf = new Buffer(settings.user + ":" + settings.password);
      headers["Authorization"] = "Basic " + authBuf.toString("base64");
    } // Set content length header


    if (settings.method === "GET" || settings.method === "HEAD") {
      data = null;
    } else if (data) {
      headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);

      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "text/plain;charset=UTF-8";
      }
    } else if (settings.method === "POST") {
      // For a post with no data set Content-Length: 0.
      // This is required by buggy servers that don't meet the specs.
      headers["Content-Length"] = 0;
    }

    var agent = opts.agent || false;
    var options = {
      host: host,
      port: port,
      path: uri,
      method: settings.method,
      headers: headers,
      agent: agent
    };

    if (ssl) {
      options.pfx = opts.pfx;
      options.key = opts.key;
      options.passphrase = opts.passphrase;
      options.cert = opts.cert;
      options.ca = opts.ca;
      options.ciphers = opts.ciphers;
      options.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
    } // Reset error flag


    errorFlag = false; // Handle async requests

    if (settings.async) {
      // Use the proper protocol
      var doRequest = ssl ? https.request : http.request; // Request is being sent, set send flag

      sendFlag = true; // As per spec, this is called here for historical reasons.

      self.dispatchEvent("readystatechange"); // Handler for the response

      var responseHandler = function (resp) {
        // Set response var to the response we got back
        // This is so it remains accessable outside this scope
        response = resp; // Check for redirect
        // @TODO Prevent looped redirects

        if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
          // Change URL to the redirect location
          settings.url = response.headers.location;
          var url = Url.parse(settings.url); // Set host var in case it's used later

          host = url.hostname; // Options for the new request

          var newOptions = {
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            method: response.statusCode === 303 ? 'GET' : settings.method,
            headers: headers
          };

          if (ssl) {
            newOptions.pfx = opts.pfx;
            newOptions.key = opts.key;
            newOptions.passphrase = opts.passphrase;
            newOptions.cert = opts.cert;
            newOptions.ca = opts.ca;
            newOptions.ciphers = opts.ciphers;
            newOptions.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
          } // Issue the new request


          request = doRequest(newOptions, responseHandler).on('error', errorHandler);
          request.end(); // @TODO Check if an XHR event needs to be fired here

          return;
        }

        if (response && response.setEncoding) {
          response.setEncoding("utf8");
        }

        setState(self.HEADERS_RECEIVED);
        self.status = response.statusCode;
        response.on('data', function (chunk) {
          // Make sure there's some data
          if (chunk) {
            self.responseText += chunk;
          } // Don't emit state changes if the connection has been aborted.


          if (sendFlag) {
            setState(self.LOADING);
          }
        });
        response.on('end', function () {
          if (sendFlag) {
            // The sendFlag needs to be set before setState is called.  Otherwise if we are chaining callbacks
            // there can be a timing issue (the callback is called and a new call is made before the flag is reset).
            sendFlag = false; // Discard the 'end' event if the connection has been aborted

            setState(self.DONE);
          }
        });
        response.on('error', function (error) {
          self.handleError(error);
        });
      }; // Error handler for the request


      var errorHandler = function (error) {
        self.handleError(error);
      }; // Create the request


      request = doRequest(options, responseHandler).on('error', errorHandler);

      if (opts.autoUnref) {
        request.on('socket', socket => {
          socket.unref();
        });
      } // Node 0.4 and later won't accept empty data. Make sure it's needed.


      if (data) {
        request.write(data);
      }

      request.end();
      self.dispatchEvent("loadstart");
    } else {
      // Synchronous
      // Create a temporary file for communication with the other Node process
      var contentFile = ".node-xmlhttprequest-content-" + process.pid;
      var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
      fs.writeFileSync(syncFile, "", "utf8"); // The async request the other Node process executes

      var execString = "var http = require('http'), https = require('https'), fs = require('fs');" + "var doRequest = http" + (ssl ? "s" : "") + ".request;" + "var options = " + JSON.stringify(options) + ";" + "var responseText = '';" + "var req = doRequest(options, function(response) {" + "response.setEncoding('utf8');" + "response.on('data', function(chunk) {" + "  responseText += chunk;" + "});" + "response.on('end', function() {" + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "response.on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "}).on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();"; // Start the other Node Process, executing this string

      var syncProc = spawn(process.argv[0], ["-e", execString]);
      var statusText;

      while (fs.existsSync(syncFile)) {// Wait while the sync file is empty
      }

      self.responseText = fs.readFileSync(contentFile, 'utf8'); // Kill the child process once the file has data

      syncProc.stdin.end(); // Remove the temporary file

      fs.unlinkSync(contentFile);

      if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
        // If the file returned an error, handle it
        var errorObj = self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, "");
        self.handleError(errorObj, 503);
      } else {
        // If the file returned okay, parse its data and move to the DONE state
        self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
        self.responseText = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1");
        setState(self.DONE);
      }
    }
  };
  /**
   * Called when an error is encountered to deal with it.
   * @param  status  {number}    HTTP status code to use rather than the default (0) for XHR errors.
   */


  this.handleError = function (error, status) {
    this.status = status || 0;
    this.statusText = error;
    this.responseText = error.stack;
    errorFlag = true;
    setState(this.DONE);
  };
  /**
   * Aborts a request.
   */


  this.abort = function () {
    if (request) {
      request.abort();
      request = null;
    }

    headers = Object.assign({}, defaultHeaders);
    this.responseText = "";
    this.responseXML = "";
    errorFlag = abortedFlag = true;

    if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
      sendFlag = false;
      setState(this.DONE);
    }

    this.readyState = this.UNSENT;
  };
  /**
   * Adds an event listener. Preferred method of binding to events.
   */


  this.addEventListener = function (event, callback) {
    if (!(event in listeners)) {
      listeners[event] = [];
    } // Currently allows duplicate callbacks. Should it?


    listeners[event].push(callback);
  };
  /**
   * Remove an event callback that has already been bound.
   * Only works on the matching funciton, cannot be a copy.
   */


  this.removeEventListener = function (event, callback) {
    if (event in listeners) {
      // Filter will return a new array with the callback removed
      listeners[event] = listeners[event].filter(function (ev) {
        return ev !== callback;
      });
    }
  };
  /**
   * Dispatch any events, including both "on" methods and events attached using addEventListener.
   */


  this.dispatchEvent = function (event) {
    if (typeof self["on" + event] === "function") {
      if (this.readyState === this.DONE) setImmediate(function () {
        self["on" + event]();
      });else self["on" + event]();
    }

    if (event in listeners) {
      for (let i = 0, len = listeners[event].length; i < len; i++) {
        if (this.readyState === this.DONE) setImmediate(function () {
          listeners[event][i].call(self);
        });else listeners[event][i].call(self);
      }
    }
  };
  /**
   * Changes readyState and calls onreadystatechange.
   *
   * @param int state New state
   */


  var setState = function (state) {
    if (self.readyState === state || self.readyState === self.UNSENT && abortedFlag) return;
    self.readyState = state;

    if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
      self.dispatchEvent("readystatechange");
    }

    if (self.readyState === self.DONE) {
      let fire;
      if (abortedFlag) fire = "abort";else if (errorFlag) fire = "error";else fire = "load";
      self.dispatchEvent(fire); // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)

      self.dispatchEvent("loadend");
    }
  };
}

;

/***/ }),

/***/ "./node_modules/yeast/index.js":
/***/ ((module) => {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
    length = 64,
    map = {},
    seed = 0,
    i = 0,
    prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */

function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */


function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */


function yeast() {
  var now = encode(+new Date());
  if (now !== prev) return seed = 0, prev = now;
  return now + '.' + encode(seed++);
} //
// Map each character to its index.
//


for (; i < length; i++) map[alphabet[i]] = i; //
// Expose the `yeast`, `encode` and `decode` functions.
//


yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

/***/ }),

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
/* harmony import */ var _store_popup_trigger_actions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./resources/modules/front-app/src/js/store/popup-trigger/actions.js");
/* harmony import */ var _helpers_sendEmail__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./resources/modules/front-app/src/js/helpers/sendEmail.js");
/* harmony import */ var _store_current_model_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./resources/modules/front-app/src/js/store/current-model/actions.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/socket.io-client/build/esm-debug/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_13__);









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
    _this.metaMaskConnect = /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee() {
      var path, currentValue, accounts, requestAccounts;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              path = _this.getProperty('path');
              currentValue = getDataByPath(path); // не получаю значение, приходит всегда null

              if (window.ethereum) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", {
                success: false
              });

            case 4:
              _context.next = 6;
              return window.ethereum.request({
                method: "eth_accounts"
              });

            case 6:
              accounts = _context.sent;

              if (!(accounts.length > 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", {
                success: false
              });

            case 11:
              _context.next = 13;
              return window.ethereum.request({
                method: "eth_requestAccounts"
              });

            case 13:
              requestAccounts = _context.sent;
              setDataByPath(path, requestAccounts[0]);
              return _context.abrupt("return", {
                success: true
              });

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

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
      var _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee2() {
        var form;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = this.getType();
                _context2.next = _context2.t0 === 'form' ? 3 : _context2.t0 === 'login' ? 7 : 9;
                break;

              case 3:
                if (this.getFormURL()) {
                  _context2.next = 6;
                  break;
                }

                this.setProperty('_form', null);
                return _context2.abrupt("return");

              case 6:
                return _context2.abrupt("return");

              case 7:
                form = formsManager.registerForm(this.getFormId(), 'login', 'POST');
                this.setProperty('_form', form);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      var _doAction = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee3() {
        var result, confirmText, alertText;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                result = {
                  success: false
                };
                confirmText = this.getProperty('confirm');
                confirmText = replaceContentWithData(confirmText, this.getCurrentModel().getData());

                if (!(confirmText && !confirm(confirmText))) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", {
                  success: false,
                  message: 'User not Confirm'
                });

              case 5:
                _context3.t0 = this.getType();
                _context3.next = _context3.t0 === 'form' ? 8 : _context3.t0 === 'delay' ? 12 : _context3.t0 === 'email' ? 16 : _context3.t0 === 'redirect' ? 20 : _context3.t0 === 'toggle_element' ? 24 : _context3.t0 === 'toggle_popup' ? 28 : _context3.t0 === 'print_page' ? 32 : _context3.t0 === 'print_elements' ? 36 : _context3.t0 === 'scroll_to_element' ? 40 : _context3.t0 === 'scroll_to_top' ? 44 : _context3.t0 === 'scroll_to_bottom' ? 48 : _context3.t0 === 'trigger' ? 52 : _context3.t0 === 'page_to_pdf' ? 56 : _context3.t0 === 'elements_to_pdf' ? 60 : _context3.t0 === 'data_to_csv' ? 64 : _context3.t0 === 'table_to_csv' ? 68 : _context3.t0 === 'table_to_xml' ? 72 : _context3.t0 === 'table_to_xls' ? 76 : _context3.t0 === 'login' ? 80 : _context3.t0 === 'logout' ? 84 : _context3.t0 === 'set_data' ? 88 : _context3.t0 === 'update_current_datasources' ? 92 : _context3.t0 === 'update_current_model' ? 96 : _context3.t0 === 'forms_manipulate' ? 100 : _context3.t0 === 'custom_code' ? 104 : _context3.t0 === 'play_sound' ? 108 : _context3.t0 === 'condition' ? 112 : _context3.t0 === 'vi_toggle' ? 116 : _context3.t0 === 'oauth' ? 120 : _context3.t0 === 'metamask_connect' ? 124 : _context3.t0 === 'socket_emit' ? 128 : _context3.t0 === 'socket_receiver' ? 132 : 134;
                break;

              case 8:
                _context3.next = 10;
                return this.doActionForm();

              case 10:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 12:
                _context3.next = 14;
                return this.doActionDelay();

              case 14:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 16:
                _context3.next = 18;
                return this.doActionEmail();

              case 18:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 20:
                _context3.next = 22;
                return this.doActionRedirect();

              case 22:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 24:
                _context3.next = 26;
                return this.doActionToggleElements();

              case 26:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 28:
                _context3.next = 30;
                return this.doActionTogglePopup();

              case 30:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 32:
                _context3.next = 34;
                return this.doActionPrintPage();

              case 34:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 36:
                _context3.next = 38;
                return this.doActionPrintElements();

              case 38:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 40:
                _context3.next = 42;
                return this.doActionScrollToElement();

              case 42:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 44:
                _context3.next = 46;
                return this.doActionScrollToTop();

              case 46:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 48:
                _context3.next = 50;
                return this.doActionScrollToBottom();

              case 50:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 52:
                _context3.next = 54;
                return this.doActionTrigger();

              case 54:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 56:
                _context3.next = 58;
                return this.doActionPageToPDF();

              case 58:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 60:
                _context3.next = 62;
                return this.doActionElementsToPDF();

              case 62:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 64:
                _context3.next = 66;
                return this.doActionDataToCSV();

              case 66:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 68:
                _context3.next = 70;
                return this.doActionTableToCSV();

              case 70:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 72:
                _context3.next = 74;
                return this.doActionTableToXML();

              case 74:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 76:
                _context3.next = 78;
                return this.doActionTableToXLS();

              case 78:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 80:
                _context3.next = 82;
                return this.doActionLogin();

              case 82:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 84:
                _context3.next = 86;
                return this.doActionLogout();

              case 86:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 88:
                _context3.next = 90;
                return this.doActionSetData();

              case 90:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 92:
                _context3.next = 94;
                return this.doActionUpdateCurrentDatasources();

              case 94:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 96:
                _context3.next = 98;
                return this.doActionUpdateCurrentModel();

              case 98:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 100:
                _context3.next = 102;
                return this.doActionFormsManipulate();

              case 102:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 104:
                _context3.next = 106;
                return this.doActionCustomCode();

              case 106:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 108:
                _context3.next = 110;
                return this.doActionPlaySound();

              case 110:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 112:
                _context3.next = 114;
                return this.doActionCondition();

              case 114:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 116:
                _context3.next = 118;
                return this.doActionVIToggle();

              case 118:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 120:
                _context3.next = 122;
                return this.doActionOAuth();

              case 122:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 124:
                _context3.next = 126;
                return this.metaMaskConnect();

              case 126:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 128:
                _context3.next = 130;
                return this.doActionSocketEmit();

              case 130:
                result = _context3.sent;
                return _context3.abrupt("break", 134);

              case 132:
                result = this.doActionSocketReceiver();
                return _context3.abrupt("break", 134);

              case 134:
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

                return _context3.abrupt("return", result);

              case 138:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function doAction() {
        return _doAction.apply(this, arguments);
      }

      return doAction;
    }()
    /**
     * заставляет сервер отправить сокет
     * @return {object}
     */

  }, {
    key: "doActionSocketEmit",
    value: function () {
      var _doActionSocketEmit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee4() {
        var name, value;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // if(!window.io) {
                //   window.io = io()
                // }
                name = replaceContentWithData(this.getProperty("socket_emit_name"), this.getCurrentModel().getData());
                value = {
                  name: name,
                  data: replaceContentWithData(this.getProperty("socket_value"), this.getCurrentModel().getData())
                };
                console.log(value);
                _context4.next = 5;
                return axios__WEBPACK_IMPORTED_MODULE_13___default().post("/sockets", value);

              case 5:
                return _context4.abrupt("return", {
                  success: true
                });

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function doActionSocketEmit() {
        return _doActionSocketEmit.apply(this, arguments);
      }

      return doActionSocketEmit;
    }()
    /**
     * слушает сокеты
     * @return {object}
     */

  }, {
    key: "doActionSocketReceiver",
    value: function doActionSocketReceiver() {
      if (!window.io) {
        window.io = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_12__.io)(":".concat(process.env.SOCKETS_KEY));
        window;
      }

      var name = "";

      if (this.getProperty("socket_type") === "custom") {
        name = replaceContentWithData(this.getProperty("socket_name"), this.getCurrentModel().getData());
      } else {
        var user = window.current_user;

        if (!user.is_guest && user.guid) {
          name = user.guid;
        } else {
          var guid = localStorage.getItem("socket_guid");

          if (!guid) {
            localStorage.setItem("socket_guid", (0,uuid__WEBPACK_IMPORTED_MODULE_11__.v4)());
            guid = localStorage.getItem("socket_guid");
          }

          name = guid;
        }
      }

      console.log(name);
      window.io.on(replaceContentWithData(name, this.getCurrentModel().getData()), function (data) {
        console.log(data);
      });
      return {
        success: true
      };
    }
    /**
     * Ассинхронно выполняет действие-формы
     * @return {Promise<{}>}
     */

  }, {
    key: "doActionForm",
    value: function () {
      var _doActionForm = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee6() {
        var _this2 = this;

        var formsManager, data, customHeaders, bulk, _form, bulkRequests, res, _data, formOptions, form, result, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/editor/src/js/classes/modules/FormsManager.js"));

              case 2:
                formsManager = _context6.sent.default;
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
                  _context6.next = 26;
                  break;
                }

                if (!(_.isArray(getDataByPath(this.getProperty('bulk_path'))) && _.get(getDataByPath(this.getProperty('bulk_path')), 'length'))) {
                  _context6.next = 25;
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
                  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee5(item, idx) {
                    var url, form;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            if (_this2.getProperty('data')) {
                              data = parseParamsFromString(_this2.getProperty('data'), getAppContext(item), true);
                            }

                            url = _this2.getProperty('form_url');
                            url = replaceContentWithData(url, item);
                            form = formsManager.registerForm(_this2.getFormId() + idx, '', _this2.getProperty('form_method'), {
                              customRoute: url
                            });
                            _context5.next = 6;
                            return form.submit('', '', data, customHeaders);

                          case 6:
                            return _context5.abrupt("return", _context5.sent);

                          case 7:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x, _x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                _context6.prev = 13;
                _context6.next = 16;
                return Promise.all(bulkRequests);

              case 16:
                res = _context6.sent;
                _context6.next = 24;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6["catch"](13);
                console.error(_context6.t0);
                bulk.forEach(function (item, idx) {
                  formsManager.deleteFormById(_this2.getFormId() + idx);
                });
                return _context6.abrupt("return", {
                  success: false
                });

              case 24:
                bulk.forEach(function (item, idx) {
                  formsManager.deleteFormById(_this2.getFormId() + idx);
                });

              case 25:
                return _context6.abrupt("return", {
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
                  _context6.next = 30;
                  break;
                }

                this.setProperty('_form', null);
                return _context6.abrupt("return", {
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
                _context6.prev = 33;
                _context6.next = 36;
                return form.submit('', '', data, customHeaders);

              case 36:
                response = _context6.sent;
                result = _.assign(result, response);
                _context6.next = 45;
                break;

              case 40:
                _context6.prev = 40;
                _context6.t1 = _context6["catch"](33);
                console.error(_context6.t1);
                result.error = _context6.t1;
                result.success = false;

              case 45:
                return _context6.abrupt("return", result);

              case 46:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[13, 19], [33, 40]]);
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
      var _doActionRedirect = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee7() {
        var URL, innerRedirect;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                URL = this.getFormURL();

                if (URL) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", {
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

                return _context7.abrupt("return", {
                  success: true
                });

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      var _doActionToggleElements = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee8() {
        var IDs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                IDs = this.getProperty('elements_ids');

                if (IDs) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", {
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
                return _context8.abrupt("return", {
                  success: true
                });

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      var _doActionTogglePopup = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee9() {
        var id, loadPopups;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                id = this.getProperty('popup_id');

                if (id) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt("return", {
                  success: true
                });

              case 3:
                if (!window['h-altrp']) {
                  _context9.next = 9;
                  break;
                }

                _context9.next = 6;
                return __webpack_require__.e(/* import() | load-popups */ 904).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/front-app/src/js/functions/load-popups.js"));

              case 6:
                loadPopups = _context9.sent.default;
                _context9.next = 9;
                return loadPopups();

              case 9:
                appStore.dispatch((0,_store_popup_trigger_actions__WEBPACK_IMPORTED_MODULE_14__/* .togglePopup */ .z)(id));
                return _context9.abrupt("return", {
                  success: true
                });

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      var _doActionPrintPage = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee10() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                window.print();
                return _context10.abrupt("return", {
                  success: true
                });

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
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
      var _doActionPrintElements = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee11() {
        var IDs, elementsToPrint;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                IDs = this.getProperty('elements_ids');

                if (IDs) {
                  _context11.next = 3;
                  break;
                }

                return _context11.abrupt("return", {
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
                return _context11.abrupt("return", {
                  success: true
                });

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
      var _doActionScrollToElement = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee12() {
        var elementId, element, scroller;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                elementId = this.getProperty('element_id');

                if (elementId) {
                  _context12.next = 3;
                  break;
                }

                return _context12.abrupt("return", {
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

                return _context12.abrupt("return", {
                  success: true
                });

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
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
      var _doActionScrollToTop = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee13() {
        var scroller;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!window.mainScrollbars) {
                  _context13.next = 3;
                  break;
                }

                window.mainScrollbars.scrollTop(0);
                return _context13.abrupt("return", {
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
                return _context13.abrupt("return", {
                  success: true
                });

              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
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
      var _doActionScrollToBottom = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee14() {
        var routeContent, scroller;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                routeContent = document.getElementById('route-content');

                if (routeContent) {
                  _context14.next = 3;
                  break;
                }

                return _context14.abrupt("return", {
                  success: true
                });

              case 3:
                if (!window.mainScrollbars) {
                  _context14.next = 6;
                  break;
                }

                window.mainScrollbars.scrollTop(routeContent.offsetHeight);
                return _context14.abrupt("return", {
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
                return _context14.abrupt("return", {
                  success: true
                });

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
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
      var _doActionPageToPDF = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee15() {
        var filename, elements;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                elements = [];
                elements.push(document.getElementById('route-content'));
                _context15.next = 5;
                return elementsToPdf(elements, filename);

              case 5:
                return _context15.abrupt("return", _context15.sent);

              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
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
      var _doActionElementsToPDF = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee16() {
        var filename, elements, IDs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                elements = [];
                IDs = this.getProperty('elements_ids');

                if (IDs) {
                  _context16.next = 5;
                  break;
                }

                return _context16.abrupt("return", {
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
                _context16.next = 9;
                return elementsToPdf(elements, filename);

              case 9:
                return _context16.abrupt("return", _context16.sent);

              case 10:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
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
      var _doActionDataToCSV = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee17() {
        var data, filename;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                data = getDataByPath(this.getProperty('path'));
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                _context17.prev = 2;
                _context17.next = 5;
                return dataToCSV(data, filename);

              case 5:
                return _context17.abrupt("return", _context17.sent);

              case 8:
                _context17.prev = 8;
                _context17.t0 = _context17["catch"](2);
                console.error(_context17.t0);
                return _context17.abrupt("return", {
                  success: false
                });

              case 12:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[2, 8]]);
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
      var _doActionTableToCSV = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee18() {
        var elementId, element, data, filename;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                elementId = this.getProperty('element_id');

                if (elementId) {
                  _context18.next = 3;
                  break;
                }

                return _context18.abrupt("return", {
                  success: true
                });

              case 3:
                elementId = elementId.trim();
                element = getHTMLElementById(elementId);

                if (element) {
                  _context18.next = 7;
                  break;
                }

                return _context18.abrupt("return", {
                  success: true
                });

              case 7:
                _context18.prev = 7;
                data = dataFromTable(element);
                _context18.next = 15;
                break;

              case 11:
                _context18.prev = 11;
                _context18.t0 = _context18["catch"](7);
                console.error(_context18.t0);
                return _context18.abrupt("return", {
                  success: false
                });

              case 15:
                if (!_.isEmpty(data)) {
                  _context18.next = 17;
                  break;
                }

                return _context18.abrupt("return", {
                  success: true
                });

              case 17:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                _context18.prev = 18;
                _context18.next = 21;
                return dataToCSV(data, filename);

              case 21:
                return _context18.abrupt("return", _context18.sent);

              case 24:
                _context18.prev = 24;
                _context18.t1 = _context18["catch"](18);
                console.error(_context18.t1);
                return _context18.abrupt("return", {
                  success: false
                });

              case 28:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[7, 11], [18, 24]]);
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
      var _doActionTableToXML = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee19() {
        var elementId, element, data, filename;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                elementId = this.getProperty('element_id');

                if (elementId) {
                  _context19.next = 3;
                  break;
                }

                return _context19.abrupt("return", {
                  success: true
                });

              case 3:
                elementId = elementId.trim();
                element = getHTMLElementById(elementId);

                if (element) {
                  _context19.next = 7;
                  break;
                }

                return _context19.abrupt("return", {
                  success: true
                });

              case 7:
                _context19.prev = 7;
                data = dataFromTable(element);
                _context19.next = 15;
                break;

              case 11:
                _context19.prev = 11;
                _context19.t0 = _context19["catch"](7);
                console.error(_context19.t0);
                return _context19.abrupt("return", {
                  success: false
                });

              case 15:
                if (!_.isEmpty(data)) {
                  _context19.next = 17;
                  break;
                }

                return _context19.abrupt("return", {
                  success: true
                });

              case 17:
                filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
                _context19.prev = 18;
                _context19.next = 21;
                return dataToXML(data, filename);

              case 21:
                return _context19.abrupt("return", _context19.sent);

              case 24:
                _context19.prev = 24;
                _context19.t1 = _context19["catch"](18);
                console.error(_context19.t1);
                return _context19.abrupt("return", {
                  success: false
                });

              case 28:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[7, 11], [18, 24]]);
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
      var _doActionTableToXLS = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee20() {
        var data, all_sources_path, elementId, table, formattedData, rawTemplateData, parsedTemplateData, filename, templateName, blob, link;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                data = [];

                if (!this.getProperty('all_sources')) {
                  _context20.next = 7;
                  break;
                }

                all_sources_path = this.getProperty('all_sources_path');
                if (all_sources_path) data = getDataByPath(all_sources_path, {});
                data = {
                  data: data
                };
                _context20.next = 20;
                break;

              case 7:
                elementId = this.getProperty('element_id').trim();

                if (elementId) {
                  _context20.next = 11;
                  break;
                }

                console.error('Element ID is not set');
                return _context20.abrupt("return", {
                  success: true
                });

              case 11:
                table = getHTMLElementById(elementId);

                if (table) {
                  _context20.next = 15;
                  break;
                }

                console.error('Table with provided ID is not found');
                return _context20.abrupt("return", {
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
                _context20.prev = 22;
                _context20.next = 25;
                return dataToXLS(data, filename, templateName);

              case 25:
                blob = _context20.sent;
                link = document.createElement('a');
                link.setAttribute('href', window.URL.createObjectURL(blob));
                link.setAttribute('download', filename + '.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return _context20.abrupt("return", {
                  success: true
                });

              case 35:
                _context20.prev = 35;
                _context20.t0 = _context20["catch"](22);
                console.error(_context20.t0);
                return _context20.abrupt("return", {
                  success: false
                });

              case 39:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[22, 35]]);
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
      var _doActionLogin = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee21() {
        var form, success;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
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
                  _context21.next = 5;
                  break;
                }

                return _context21.abrupt("return", {
                  success: false
                });

              case 5:
                _context21.next = 7;
                return altrpLogin(form.getData(), this.getFormId());

              case 7:
                return _context21.abrupt("return", _context21.sent);

              case 8:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
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
      var _doActionLogout = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee22() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return altrpLogout();

              case 2:
                return _context22.abrupt("return", _context22.sent);

              case 3:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
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
      var _doActionSetData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee23() {
        var _this3 = this;

        var paths, result, _iterator, _step, path, value, setType, count, currentValue, nextIndex, _currentValue, _currentValue2, _currentValue3, item, items;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                paths = this.getProperty('path');
                result = {
                  success: true
                };

                if (paths) {
                  _context23.next = 4;
                  break;
                }

                return _context23.abrupt("return", result);

              case 4:
                if (paths.indexOf(',') !== -1) {
                  paths = paths.split(',').map(function (path) {
                    return path.trim();
                  });
                } else {
                  paths = [paths];
                }

                _iterator = _createForOfIteratorHelper(paths);
                _context23.prev = 6;

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context23.next = 60;
                  break;
                }

                path = _step.value;
                path = replaceContentWithData(path, this.getCurrentModel().getData());
                value = this.getProperty('value') || '';
                value = value.trim();
                setType = this.getProperty('set_type');
                count = this.getProperty('count');
                _context23.t0 = setType;
                _context23.next = _context23.t0 === 'toggle' ? 18 : _context23.t0 === 'set' ? 21 : _context23.t0 === 'toggle_set' ? 24 : _context23.t0 === 'increment' ? 32 : _context23.t0 === 'decrement' ? 38 : _context23.t0 === 'push_items' ? 44 : _context23.t0 === 'remove_items' ? 54 : 58;
                break;

              case 18:
                value = !getDataByPath(path);
                result.success = setDataByPath(path, value);
                return _context23.abrupt("break", 58);

              case 21:
                if (value.split(/\r?\n/).length === 1 && value.indexOf('{{') === 0 && value.indexOf('}}') === value.length - 2) {
                  value = getDataByPath(value.replace('{{', '').replace('}}', ''), null, this.getCurrentModel());
                } else if (value.indexOf('|') !== -1) {
                  value = parseParamsFromString(value, this.getCurrentModel(), true);
                }

                result.success = setDataByPath(path, value);
                return _context23.abrupt("break", 58);

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
                return _context23.abrupt("break", 58);

              case 32:
                _currentValue = getDataByPath(path);
                _currentValue = _currentValue ? _.isNaN(Number(_currentValue)) ? 1 : Number(_currentValue) : Number(!!_currentValue);
                count = Number(count) || 1;
                _currentValue += count;
                result.success = setDataByPath(path, _currentValue);
                return _context23.abrupt("break", 58);

              case 38:
                _currentValue2 = getDataByPath(path);
                _currentValue2 = _currentValue2 ? _.isNaN(Number(_currentValue2)) ? 1 : Number(_currentValue2) : Number(!!_currentValue2);
                count = Number(count) || 1;
                _currentValue2 -= count;
                result.success = setDataByPath(path, _currentValue2);
                return _context23.abrupt("break", 58);

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
                return _context23.abrupt("break", 58);

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
                return _context23.abrupt("break", 58);

              case 58:
                _context23.next = 8;
                break;

              case 60:
                _context23.next = 65;
                break;

              case 62:
                _context23.prev = 62;
                _context23.t1 = _context23["catch"](6);

                _iterator.e(_context23.t1);

              case 65:
                _context23.prev = 65;

                _iterator.f();

                return _context23.finish(65);

              case 68:
                return _context23.abrupt("return", result);

              case 69:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this, [[6, 62, 65, 68]]);
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
      var _doActionCustomCode = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee24() {
        var code;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                code = this.getProperty('code');
                _context24.prev = 1;
                code = replaceContentWithData(code, this.getCurrentModel().getData());
                eval(code);
                return _context24.abrupt("return", {
                  success: true
                });

              case 7:
                _context24.prev = 7;
                _context24.t0 = _context24["catch"](1);
                console.error('Evaluate error in doActionCustomCode: "' + _context24.t0.message + '"');
                return _context24.abrupt("return", {
                  success: false
                });

              case 11:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this, [[1, 7]]);
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
      var _doActionUpdateCurrentModel = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee25() {
        var _window, _window$currentPage, _window2, _window2$model_data;

        var modelName, modelId, model, oldModel;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                modelName = (_window = window) === null || _window === void 0 ? void 0 : (_window$currentPage = _window.currentPage) === null || _window$currentPage === void 0 ? void 0 : _window$currentPage.model_name;

                if (modelName) {
                  _context25.next = 3;
                  break;
                }

                return _context25.abrupt("return", {
                  success: true
                });

              case 3:
                modelId = (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$model_data = _window2.model_data) === null || _window2$model_data === void 0 ? void 0 : _window2$model_data.id;

                if (modelId) {
                  _context25.next = 6;
                  break;
                }

                return _context25.abrupt("return", {
                  success: true
                });

              case 6:
                _context25.prev = 6;
                _context25.next = 9;
                return new Resource({
                  route: "/ajax/models/".concat(modelName)
                }).get(modelId);

              case 9:
                model = _context25.sent;

                if (_.isObject(model.data)) {
                  model = model.data;
                }

                oldModel = window.appStore.getState().currentModel.getData();
                model.altrpModelUpdated = true;

                if (!_.isEqual(model, oldModel)) {
                  appStore.dispatch((0,_store_current_model_actions__WEBPACK_IMPORTED_MODULE_15__/* .changeCurrentModel */ .D)({
                    altrpModelUpdated: false
                  }));
                  appStore.dispatch((0,_store_current_model_actions__WEBPACK_IMPORTED_MODULE_15__/* .changeCurrentModel */ .D)(model));
                }

                return _context25.abrupt("return", {
                  success: true
                });

              case 17:
                _context25.prev = 17;
                _context25.t0 = _context25["catch"](6);
                console.error(_context25.t0);

              case 20:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, null, [[6, 17]]);
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
      var _doActionUpdateCurrentDatasources = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee26() {
        var aliases, allDataSources, dataSourcesToUpdate;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
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

                _context26.next = 6;
                return window.dataStorageUpdater.updateCurrent(dataSourcesToUpdate, false);

              case 6:
                return _context26.abrupt("return", {
                  success: true
                });

              case 7:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
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
      var _doActionTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee27() {
        var elementId, element, action, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                elementId = this.getProperty('element_id');
                element = getComponentByElementId(elementId);
                action = this.getProperty('action');

                if (!_.isFunction(element[action])) {
                  _context27.next = 6;
                  break;
                }

                element[action]();
                return _context27.abrupt("return", {
                  success: true
                });

              case 6:
                _context27.prev = 6;

                if (!_.isFunction(element.elementRef.current[action])) {
                  _context27.next = 14;
                  break;
                }

                _context27.next = 10;
                return element.elementRef.current[action]();

              case 10:
                result = _context27.sent;

                if (!_.isObject(result)) {
                  _context27.next = 13;
                  break;
                }

                return _context27.abrupt("return", result);

              case 13:
                return _context27.abrupt("return", {
                  success: true
                });

              case 14:
                element.elementRef.current.fireAction(action);
                return _context27.abrupt("return", {
                  success: true
                });

              case 18:
                _context27.prev = 18;
                _context27.t0 = _context27["catch"](6);
                console.error(_context27.t0);
                return _context27.abrupt("return", {
                  success: false
                });

              case 22:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this, [[6, 18]]);
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
      var _doActionEmail = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee28() {
        var templateGUID, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                templateGUID = this.getProperty('email_template');

                if (templateGUID) {
                  _context28.next = 3;
                  break;
                }

                return _context28.abrupt("return", {
                  success: true
                });

              case 3:
                res = {
                  success: false
                };
                _context28.prev = 4;
                _context28.next = 7;
                return (0,_helpers_sendEmail__WEBPACK_IMPORTED_MODULE_10__/* .sendEmail */ .C)(templateGUID, this.getReplacedProperty('subject'), this.getReplacedProperty('from'), this.getReplacedProperty('to'), this.getReplacedProperty('attachments'));

              case 7:
                res = _context28.sent;
                _context28.next = 14;
                break;

              case 10:
                _context28.prev = 10;
                _context28.t0 = _context28["catch"](4);
                console.error(_context28.t0);
                return _context28.abrupt("return", {
                  success: false
                });

              case 14:
                return _context28.abrupt("return", res);

              case 15:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this, [[4, 10]]);
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
      var _doActionDelay = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee29() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return delay(this.getProperty('milliseconds') || 0);

              case 2:
                return _context29.abrupt("return", {
                  success: true
                });

              case 3:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
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
      var _doActionPlaySound = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee30() {
        var duration, url, loop, _yield$import, playSound;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                duration = this.getProperty('milliseconds') || 0;
                url = this.getProperty('media_url');
                loop = this.getProperty('loop');

                if (!url) {
                  _context30.next = 11;
                  break;
                }

                _context30.next = 6;
                return __webpack_require__.e(/* import() | helpers-sounds */ 226).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/front-app/src/js/helpers/sounds.js"));

              case 6:
                _yield$import = _context30.sent;
                playSound = _yield$import.playSound;
                playSound(url, loop, duration);
                _context30.next = 11;
                return delay(20);

              case 11:
                return _context30.abrupt("return", {
                  success: true
                });

              case 12:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
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
      var _doActionCondition = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee31() {
        var compare, conditionLeft, conditionRight, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                compare = this.getProperty('compare');
                conditionLeft = this.getProperty('condition_left');
                conditionRight = this.getProperty('condition_right');
                conditionLeft = getDataByPath(conditionLeft, null, this.getCurrentModel().getData());
                conditionRight = replaceContentWithData(conditionRight, this.getCurrentModel().getData());
                res = altrpCompare(conditionLeft, conditionRight, compare);
                return _context31.abrupt("return", {
                  success: res
                });

              case 7:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function doActionCondition() {
        return _doActionCondition.apply(this, arguments);
      }

      return doActionCondition;
    }()
  }, {
    key: "doActionVIToggle",
    value:
    /**
     * Версия сайта для слабовидящих
     * @return {Promise<void>}
     */
    function () {
      var _doActionVIToggle = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee32() {
        var _yield$import2, loadVIPlugin, HTMLWrapper;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.prev = 0;
                _context32.next = 3;
                return __webpack_require__.e(/* import() */ 670).then(__webpack_require__.bind(__webpack_require__, "./resources/modules/front-app/src/js/helpers/plugins.js"));

              case 3:
                _yield$import2 = _context32.sent;
                loadVIPlugin = _yield$import2.loadVIPlugin;
                _context32.next = 7;
                return loadVIPlugin();

              case 7:
                _context32.next = 12;
                break;

              case 9:
                _context32.prev = 9;
                _context32.t0 = _context32["catch"](0);
                return _context32.abrupt("return", {
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

                return _context32.abrupt("return", {
                  success: true
                });

              case 14:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this, [[0, 9]]);
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
      var _doActionOAuth = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee33() {
        var OIDC, WebStorageStateStore, UserManager, authority, OidcClient, method, settings, _manager, manager, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return __webpack_require__.e(/* import() | OIDC */ 29).then(__webpack_require__.t.bind(__webpack_require__, "./node_modules/oidc-client/lib/oidc-client.min.js", 23));

              case 2:
                OIDC = _context33.sent;
                WebStorageStateStore = OIDC.WebStorageStateStore, UserManager = OIDC.UserManager, authority = OIDC.authority, OidcClient = OIDC.OidcClient;
                (window.altrpLibs = window.altrpLibs || {}).OIDC = OIDC;
                method = this.getProperty('method');

                if (method) {
                  _context33.next = 8;
                  break;
                }

                return _context33.abrupt("return", {
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
                  _context33.next = 24;
                  break;
                }

                _context33.prev = 15;
                _context33.next = 18;
                return manager[method]();

              case 18:
                result = _context33.sent;
                _context33.next = 24;
                break;

              case 21:
                _context33.prev = 21;
                _context33.t0 = _context33["catch"](15);
                return _context33.abrupt("return", {
                  success: false
                });

              case 24:
                console.log(result); // await manager.signoutRedirect();

                return _context33.abrupt("return", {
                  success: true
                });

              case 26:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this, [[15, 21]]);
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