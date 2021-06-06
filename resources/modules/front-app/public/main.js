/******/ (function(modules)
{ // webpackBootstrap
  /******/ 	// install a JSONP callback for chunk loading
  /******/ 	function webpackJsonpCallback(data) {
    /******/ 		var chunkIds = data[0];
    /******/ 		var moreModules = data[1];
    /******/
    /******/
    /******/ 		// add "moreModules" to the modules object,
    /******/ 		// then flag all "chunkIds" as loaded and fire callback
    /******/ 		var moduleId, chunkId, i = 0, resolves = [];
    /******/ 		for(;i < chunkIds.length; i++) {
      /******/ 			chunkId = chunkIds[i];
      /******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        /******/ 				resolves.push(installedChunks[chunkId][0]);
        /******/ 			}
      /******/ 			installedChunks[chunkId] = 0;
      /******/ 		}
    /******/ 		for(moduleId in moreModules) {
      /******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        /******/ 				modules[moduleId] = moreModules[moduleId];
        /******/ 			}
      /******/ 		}
    /******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
    /******/
    /******/ 		while(resolves.length) {
      /******/ 			resolves.shift()();
      /******/ 		}
    /******/
    /******/ 	};
  /******/
  /******/ 	function hotDisposeChunk(chunkId) {
    /******/ 		delete installedChunks[chunkId];
    /******/ 	}
  /******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
  /******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
    /******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
    /******/ 		hotAddUpdateChunk(chunkId, moreModules);
    /******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
    /******/ 	} ;
  /******/
  /******/ 	// eslint-disable-next-line no-unused-vars
  /******/ 	function hotDownloadUpdateChunk(chunkId) {
    /******/ 		var script = document.createElement("script");
    /******/ 		script.charset = "utf-8";
    /******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
    /******/ 		if (null) script.crossOrigin = null;
    /******/ 		document.head.appendChild(script);
    /******/ 	}
  /******/
  /******/ 	// eslint-disable-next-line no-unused-vars
  /******/ 	function hotDownloadManifest(requestTimeout) {
    /******/ 		requestTimeout = requestTimeout || 10000;
    /******/ 		return new Promise(function(resolve, reject) {
      /******/ 			if (typeof XMLHttpRequest === "undefined") {
        /******/ 				return reject(new Error("No browser support"));
        /******/ 			}
      /******/ 			try {
        /******/ 				var request = new XMLHttpRequest();
        /******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
        /******/ 				request.open("GET", requestPath, true);
        /******/ 				request.timeout = requestTimeout;
        /******/ 				request.send(null);
        /******/ 			} catch (err) {
        /******/ 				return reject(err);
        /******/ 			}
      /******/ 			request.onreadystatechange = function() {
        /******/ 				if (request.readyState !== 4) return;
        /******/ 				if (request.status === 0) {
          /******/ 					// timeout
          /******/ 					reject(
            /******/ 						new Error("Manifest request to " + requestPath + " timed out.")
            /******/ 					);
          /******/ 				} else if (request.status === 404) {
          /******/ 					// no update available
          /******/ 					resolve();
          /******/ 				} else if (request.status !== 200 && request.status !== 304) {
          /******/ 					// other failure
          /******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
          /******/ 				} else {
          /******/ 					// success
          /******/ 					try {
            /******/ 						var update = JSON.parse(request.responseText);
            /******/ 					} catch (e) {
            /******/ 						reject(e);
            /******/ 						return;
            /******/ 					}
          /******/ 					resolve(update);
          /******/ 				}
        /******/ 			};
      /******/ 		});
    /******/ 	}
  /******/
  /******/ 	var hotApplyOnUpdate = true;
  /******/ 	// eslint-disable-next-line no-unused-vars
  /******/ 	var hotCurrentHash = "5ded6a047592f7f3b8a2";
  /******/ 	var hotRequestTimeout = 10000;
  /******/ 	var hotCurrentModuleData = {};
  /******/ 	var hotCurrentChildModule;
  /******/ 	// eslint-disable-next-line no-unused-vars
  /******/ 	var hotCurrentParents = [];
  /******/ 	// eslint-disable-next-line no-unused-vars
  /******/ 	var hotCurrentParentsTemp = [];
  /******/
  /******/ 	// eslint-disable-next-line no-unused-vars
  /******/ 	function hotCreateRequire(moduleId) {
    /******/ 		var me = installedModules[moduleId];
    /******/ 		if (!me) return __webpack_require__;
    /******/ 		var fn = function(request) {
      /******/ 			if (me.hot.active) {
        /******/ 				if (installedModules[request]) {
          /******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
            /******/ 						installedModules[request].parents.push(moduleId);
            /******/ 					}
          /******/ 				} else {
          /******/ 					hotCurrentParents = [moduleId];
          /******/ 					hotCurrentChildModule = request;
          /******/ 				}
        /******/ 				if (me.children.indexOf(request) === -1) {
          /******/ 					me.children.push(request);
          /******/ 				}
        /******/ 			} else {
        /******/ 				console.warn(
          /******/ 					"[HMR] unexpected require(" +
          /******/ 						request +
          /******/ 						") from disposed module " +
          /******/ 						moduleId
          /******/ 				);
        /******/ 				hotCurrentParents = [];
        /******/ 			}
      /******/ 			return __webpack_require__(request);
      /******/ 		};
    /******/ 		var ObjectFactory = function ObjectFactory(name) {
      /******/ 			return {
        /******/ 				configurable: true,
        /******/ 				enumerable: true,
        /******/ 				get: function() {
          /******/ 					return __webpack_require__[name];
          /******/ 				},
        /******/ 				set: function(value) {
          /******/ 					__webpack_require__[name] = value;
          /******/ 				}
        /******/ 			};
      /******/ 		};
    /******/ 		for (var name in __webpack_require__) {
      /******/ 			if (
        /******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
        /******/ 				name !== "e" &&
        /******/ 				name !== "t"
        /******/ 			) {
        /******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
        /******/ 			}
      /******/ 		}
    /******/ 		fn.e = function(chunkId) {
      /******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
      /******/ 			hotChunksLoading++;
      /******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
        /******/ 				finishChunkLoading();
        /******/ 				throw err;
        /******/ 			});
      /******/
      /******/ 			function finishChunkLoading() {
        /******/ 				hotChunksLoading--;
        /******/ 				if (hotStatus === "prepare") {
          /******/ 					if (!hotWaitingFilesMap[chunkId]) {
            /******/ 						hotEnsureUpdateChunk(chunkId);
            /******/ 					}
          /******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
            /******/ 						hotUpdateDownloaded();
            /******/ 					}
          /******/ 				}
        /******/ 			}
      /******/ 		};
    /******/ 		fn.t = function(value, mode) {
      /******/ 			if (mode & 1) value = fn(value);
      /******/ 			return __webpack_require__.t(value, mode & ~1);
      /******/ 		};
    /******/ 		return fn;
    /******/ 	}
  /******/
  /******/ 	// eslint-disable-next-line no-unused-vars
  /******/ 	function hotCreateModule(moduleId) {
    /******/ 		var hot = {
      /******/ 			// private stuff
      /******/ 			_acceptedDependencies: {},
      /******/ 			_declinedDependencies: {},
      /******/ 			_selfAccepted: false,
      /******/ 			_selfDeclined: false,
      /******/ 			_disposeHandlers: [],
      /******/ 			_main: hotCurrentChildModule !== moduleId,
      /******/
      /******/ 			// Module API
      /******/ 			active: true,
      /******/ 			accept: function(dep, callback) {
        /******/ 				if (dep === undefined) hot._selfAccepted = true;
        /******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
        /******/ 				else if (typeof dep === "object")
          /******/ 					for (var i = 0; i < dep.length; i++)
            /******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
        /******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
        /******/ 			},
      /******/ 			decline: function(dep) {
        /******/ 				if (dep === undefined) hot._selfDeclined = true;
        /******/ 				else if (typeof dep === "object")
          /******/ 					for (var i = 0; i < dep.length; i++)
            /******/ 						hot._declinedDependencies[dep[i]] = true;
        /******/ 				else hot._declinedDependencies[dep] = true;
        /******/ 			},
      /******/ 			dispose: function(callback) {
        /******/ 				hot._disposeHandlers.push(callback);
        /******/ 			},
      /******/ 			addDisposeHandler: function(callback) {
        /******/ 				hot._disposeHandlers.push(callback);
        /******/ 			},
      /******/ 			removeDisposeHandler: function(callback) {
        /******/ 				var idx = hot._disposeHandlers.indexOf(callback);
        /******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
        /******/ 			},
      /******/
      /******/ 			// Management API
      /******/ 			check: hotCheck,
      /******/ 			apply: hotApply,
      /******/ 			status: function(l) {
        /******/ 				if (!l) return hotStatus;
        /******/ 				hotStatusHandlers.push(l);
        /******/ 			},
      /******/ 			addStatusHandler: function(l) {
        /******/ 				hotStatusHandlers.push(l);
        /******/ 			},
      /******/ 			removeStatusHandler: function(l) {
        /******/ 				var idx = hotStatusHandlers.indexOf(l);
        /******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
        /******/ 			},
      /******/
      /******/ 			//inherit from previous dispose call
      /******/ 			data: hotCurrentModuleData[moduleId]
      /******/ 		};
    /******/ 		hotCurrentChildModule = undefined;
    /******/ 		return hot;
    /******/ 	}
  /******/
  /******/ 	var hotStatusHandlers = [];
  /******/ 	var hotStatus = "idle";
  /******/
  /******/ 	function hotSetStatus(newStatus) {
    /******/ 		hotStatus = newStatus;
    /******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
      /******/ 			hotStatusHandlers[i].call(null, newStatus);
    /******/ 	}
  /******/
  /******/ 	// while downloading
  /******/ 	var hotWaitingFiles = 0;
  /******/ 	var hotChunksLoading = 0;
  /******/ 	var hotWaitingFilesMap = {};
  /******/ 	var hotRequestedFilesMap = {};
  /******/ 	var hotAvailableFilesMap = {};
  /******/ 	var hotDeferred;
  /******/
  /******/ 	// The update info
  /******/ 	var hotUpdate, hotUpdateNewHash;
  /******/
  /******/ 	function toModuleId(id) {
    /******/ 		var isNumber = +id + "" === id;
    /******/ 		return isNumber ? +id : id;
    /******/ 	}
  /******/
  /******/ 	function hotCheck(apply) {
    /******/ 		if (hotStatus !== "idle") {
      /******/ 			throw new Error("check() is only allowed in idle status");
      /******/ 		}
    /******/ 		hotApplyOnUpdate = apply;
    /******/ 		hotSetStatus("check");
    /******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
      /******/ 			if (!update) {
        /******/ 				hotSetStatus("idle");
        /******/ 				return null;
        /******/ 			}
      /******/ 			hotRequestedFilesMap = {};
      /******/ 			hotWaitingFilesMap = {};
      /******/ 			hotAvailableFilesMap = update.c;
      /******/ 			hotUpdateNewHash = update.h;
      /******/
      /******/ 			hotSetStatus("prepare");
      /******/ 			var promise = new Promise(function(resolve, reject) {
        /******/ 				hotDeferred = {
          /******/ 					resolve: resolve,
          /******/ 					reject: reject
          /******/ 				};
        /******/ 			});
      /******/ 			hotUpdate = {};
      /******/ 			for(var chunkId in installedChunks)
        /******/ 			// eslint-disable-next-line no-lone-blocks
        /******/ 			{
        /******/ 				hotEnsureUpdateChunk(chunkId);
        /******/ 			}
      /******/ 			if (
        /******/ 				hotStatus === "prepare" &&
        /******/ 				hotChunksLoading === 0 &&
        /******/ 				hotWaitingFiles === 0
        /******/ 			) {
        /******/ 				hotUpdateDownloaded();
        /******/ 			}
      /******/ 			return promise;
      /******/ 		});
    /******/ 	}
  /******/
  /******/ 	// eslint-disable-next-line no-unused-vars
  /******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
    /******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
      /******/ 			return;
    /******/ 		hotRequestedFilesMap[chunkId] = false;
    /******/ 		for (var moduleId in moreModules) {
      /******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        /******/ 				hotUpdate[moduleId] = moreModules[moduleId];
        /******/ 			}
      /******/ 		}
    /******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      /******/ 			hotUpdateDownloaded();
      /******/ 		}
    /******/ 	}
  /******/
  /******/ 	function hotEnsureUpdateChunk(chunkId) {
    /******/ 		if (!hotAvailableFilesMap[chunkId]) {
      /******/ 			hotWaitingFilesMap[chunkId] = true;
      /******/ 		} else {
      /******/ 			hotRequestedFilesMap[chunkId] = true;
      /******/ 			hotWaitingFiles++;
      /******/ 			hotDownloadUpdateChunk(chunkId);
      /******/ 		}
    /******/ 	}
  /******/
  /******/ 	function hotUpdateDownloaded() {
    /******/ 		hotSetStatus("ready");
    /******/ 		var deferred = hotDeferred;
    /******/ 		hotDeferred = null;
    /******/ 		if (!deferred) return;
    /******/ 		if (hotApplyOnUpdate) {
      /******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
      /******/ 			// avoid triggering uncaught exception warning in Chrome.
      /******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
      /******/ 			Promise.resolve()
        /******/ 				.then(function() {
          /******/ 					return hotApply(hotApplyOnUpdate);
          /******/ 				})
        /******/ 				.then(
          /******/ 					function(result) {
            /******/ 						deferred.resolve(result);
            /******/ 					},
          /******/ 					function(err) {
            /******/ 						deferred.reject(err);
            /******/ 					}
          /******/ 				);
      /******/ 		} else {
      /******/ 			var outdatedModules = [];
      /******/ 			for (var id in hotUpdate) {
        /******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /******/ 					outdatedModules.push(toModuleId(id));
          /******/ 				}
        /******/ 			}
      /******/ 			deferred.resolve(outdatedModules);
      /******/ 		}
    /******/ 	}
  /******/
  /******/ 	function hotApply(options) {
    /******/ 		if (hotStatus !== "ready")
      /******/ 			throw new Error("apply() is only allowed in ready status");
    /******/ 		options = options || {};
    /******/
    /******/ 		var cb;
    /******/ 		var i;
    /******/ 		var j;
    /******/ 		var module;
    /******/ 		var moduleId;
    /******/
    /******/ 		function getAffectedStuff(updateModuleId) {
      /******/ 			var outdatedModules = [updateModuleId];
      /******/ 			var outdatedDependencies = {};
      /******/
      /******/ 			var queue = outdatedModules.map(function(id) {
        /******/ 				return {
          /******/ 					chain: [id],
          /******/ 					id: id
          /******/ 				};
        /******/ 			});
      /******/ 			while (queue.length > 0) {
        /******/ 				var queueItem = queue.pop();
        /******/ 				var moduleId = queueItem.id;
        /******/ 				var chain = queueItem.chain;
        /******/ 				module = installedModules[moduleId];
        /******/ 				if (!module || module.hot._selfAccepted) continue;
        /******/ 				if (module.hot._selfDeclined) {
          /******/ 					return {
            /******/ 						type: "self-declined",
            /******/ 						chain: chain,
            /******/ 						moduleId: moduleId
            /******/ 					};
          /******/ 				}
        /******/ 				if (module.hot._main) {
          /******/ 					return {
            /******/ 						type: "unaccepted",
            /******/ 						chain: chain,
            /******/ 						moduleId: moduleId
            /******/ 					};
          /******/ 				}
        /******/ 				for (var i = 0; i < module.parents.length; i++) {
          /******/ 					var parentId = module.parents[i];
          /******/ 					var parent = installedModules[parentId];
          /******/ 					if (!parent) continue;
          /******/ 					if (parent.hot._declinedDependencies[moduleId]) {
            /******/ 						return {
              /******/ 							type: "declined",
              /******/ 							chain: chain.concat([parentId]),
              /******/ 							moduleId: moduleId,
              /******/ 							parentId: parentId
              /******/ 						};
            /******/ 					}
          /******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
          /******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
            /******/ 						if (!outdatedDependencies[parentId])
              /******/ 							outdatedDependencies[parentId] = [];
            /******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
            /******/ 						continue;
            /******/ 					}
          /******/ 					delete outdatedDependencies[parentId];
          /******/ 					outdatedModules.push(parentId);
          /******/ 					queue.push({
            /******/ 						chain: chain.concat([parentId]),
            /******/ 						id: parentId
            /******/ 					});
          /******/ 				}
        /******/ 			}
      /******/
      /******/ 			return {
        /******/ 				type: "accepted",
        /******/ 				moduleId: updateModuleId,
        /******/ 				outdatedModules: outdatedModules,
        /******/ 				outdatedDependencies: outdatedDependencies
        /******/ 			};
      /******/ 		}
    /******/
    /******/ 		function addAllToSet(a, b) {
      /******/ 			for (var i = 0; i < b.length; i++) {
        /******/ 				var item = b[i];
        /******/ 				if (a.indexOf(item) === -1) a.push(item);
        /******/ 			}
      /******/ 		}
    /******/
    /******/ 		// at begin all updates modules are outdated
    /******/ 		// the "outdated" status can propagate to parents if they don't accept the children
    /******/ 		var outdatedDependencies = {};
    /******/ 		var outdatedModules = [];
    /******/ 		var appliedUpdate = {};
    /******/
    /******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
      /******/ 			console.warn(
        /******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
        /******/ 			);
      /******/ 		};
    /******/
    /******/ 		for (var id in hotUpdate) {
      /******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        /******/ 				moduleId = toModuleId(id);
        /******/ 				/** @type {TODO} */
        /******/ 				var result;
        /******/ 				if (hotUpdate[id]) {
          /******/ 					result = getAffectedStuff(moduleId);
          /******/ 				} else {
          /******/ 					result = {
            /******/ 						type: "disposed",
            /******/ 						moduleId: id
            /******/ 					};
          /******/ 				}
        /******/ 				/** @type {Error|false} */
        /******/ 				var abortError = false;
        /******/ 				var doApply = false;
        /******/ 				var doDispose = false;
        /******/ 				var chainInfo = "";
        /******/ 				if (result.chain) {
          /******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
          /******/ 				}
        /******/ 				switch (result.type) {
          /******/ 					case "self-declined":
            /******/ 						if (options.onDeclined) options.onDeclined(result);
            /******/ 						if (!options.ignoreDeclined)
              /******/ 							abortError = new Error(
                /******/ 								"Aborted because of self decline: " +
                /******/ 									result.moduleId +
                /******/ 									chainInfo
                /******/ 							);
            /******/ 						break;
          /******/ 					case "declined":
            /******/ 						if (options.onDeclined) options.onDeclined(result);
            /******/ 						if (!options.ignoreDeclined)
              /******/ 							abortError = new Error(
                /******/ 								"Aborted because of declined dependency: " +
                /******/ 									result.moduleId +
                /******/ 									" in " +
                /******/ 									result.parentId +
                /******/ 									chainInfo
                /******/ 							);
            /******/ 						break;
          /******/ 					case "unaccepted":
            /******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
            /******/ 						if (!options.ignoreUnaccepted)
              /******/ 							abortError = new Error(
                /******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
                /******/ 							);
            /******/ 						break;
          /******/ 					case "accepted":
            /******/ 						if (options.onAccepted) options.onAccepted(result);
            /******/ 						doApply = true;
            /******/ 						break;
          /******/ 					case "disposed":
            /******/ 						if (options.onDisposed) options.onDisposed(result);
            /******/ 						doDispose = true;
            /******/ 						break;
          /******/ 					default:
            /******/ 						throw new Error("Unexception type " + result.type);
          /******/ 				}
        /******/ 				if (abortError) {
          /******/ 					hotSetStatus("abort");
          /******/ 					return Promise.reject(abortError);
          /******/ 				}
        /******/ 				if (doApply) {
          /******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
          /******/ 					addAllToSet(outdatedModules, result.outdatedModules);
          /******/ 					for (moduleId in result.outdatedDependencies) {
            /******/ 						if (
              /******/ 							Object.prototype.hasOwnProperty.call(
              /******/ 								result.outdatedDependencies,
              /******/ 								moduleId
              /******/ 							)
              /******/ 						) {
              /******/ 							if (!outdatedDependencies[moduleId])
                /******/ 								outdatedDependencies[moduleId] = [];
              /******/ 							addAllToSet(
                /******/ 								outdatedDependencies[moduleId],
                /******/ 								result.outdatedDependencies[moduleId]
                /******/ 							);
              /******/ 						}
            /******/ 					}
          /******/ 				}
        /******/ 				if (doDispose) {
          /******/ 					addAllToSet(outdatedModules, [result.moduleId]);
          /******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
          /******/ 				}
        /******/ 			}
      /******/ 		}
    /******/
    /******/ 		// Store self accepted outdated modules to require them later by the module system
    /******/ 		var outdatedSelfAcceptedModules = [];
    /******/ 		for (i = 0; i < outdatedModules.length; i++) {
      /******/ 			moduleId = outdatedModules[i];
      /******/ 			if (
        /******/ 				installedModules[moduleId] &&
        /******/ 				installedModules[moduleId].hot._selfAccepted &&
        /******/ 				// removed self-accepted modules should not be required
        /******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
        /******/ 			) {
        /******/ 				outdatedSelfAcceptedModules.push({
          /******/ 					module: moduleId,
          /******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
          /******/ 				});
        /******/ 			}
      /******/ 		}
    /******/
    /******/ 		// Now in "dispose" phase
    /******/ 		hotSetStatus("dispose");
    /******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
      /******/ 			if (hotAvailableFilesMap[chunkId] === false) {
        /******/ 				hotDisposeChunk(chunkId);
        /******/ 			}
      /******/ 		});
    /******/
    /******/ 		var idx;
    /******/ 		var queue = outdatedModules.slice();
    /******/ 		while (queue.length > 0) {
      /******/ 			moduleId = queue.pop();
      /******/ 			module = installedModules[moduleId];
      /******/ 			if (!module) continue;
      /******/
      /******/ 			var data = {};
      /******/
      /******/ 			// Call dispose handlers
      /******/ 			var disposeHandlers = module.hot._disposeHandlers;
      /******/ 			for (j = 0; j < disposeHandlers.length; j++) {
        /******/ 				cb = disposeHandlers[j];
        /******/ 				cb(data);
        /******/ 			}
      /******/ 			hotCurrentModuleData[moduleId] = data;
      /******/
      /******/ 			// disable module (this disables requires from this module)
      /******/ 			module.hot.active = false;
      /******/
      /******/ 			// remove module from cache
      /******/ 			delete installedModules[moduleId];
      /******/
      /******/ 			// when disposing there is no need to call dispose handler
      /******/ 			delete outdatedDependencies[moduleId];
      /******/
      /******/ 			// remove "parents" references from all children
      /******/ 			for (j = 0; j < module.children.length; j++) {
        /******/ 				var child = installedModules[module.children[j]];
        /******/ 				if (!child) continue;
        /******/ 				idx = child.parents.indexOf(moduleId);
        /******/ 				if (idx >= 0) {
          /******/ 					child.parents.splice(idx, 1);
          /******/ 				}
        /******/ 			}
      /******/ 		}
    /******/
    /******/ 		// remove outdated dependency from module children
    /******/ 		var dependency;
    /******/ 		var moduleOutdatedDependencies;
    /******/ 		for (moduleId in outdatedDependencies) {
      /******/ 			if (
        /******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
        /******/ 			) {
        /******/ 				module = installedModules[moduleId];
        /******/ 				if (module) {
          /******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
            /******/ 						dependency = moduleOutdatedDependencies[j];
            /******/ 						idx = module.children.indexOf(dependency);
            /******/ 						if (idx >= 0) module.children.splice(idx, 1);
            /******/ 					}
          /******/ 				}
        /******/ 			}
      /******/ 		}
    /******/
    /******/ 		// Now in "apply" phase
    /******/ 		hotSetStatus("apply");
    /******/
    /******/ 		hotCurrentHash = hotUpdateNewHash;
    /******/
    /******/ 		// insert new code
    /******/ 		for (moduleId in appliedUpdate) {
      /******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
        /******/ 				modules[moduleId] = appliedUpdate[moduleId];
        /******/ 			}
      /******/ 		}
    /******/
    /******/ 		// call accept handlers
    /******/ 		var error = null;
    /******/ 		for (moduleId in outdatedDependencies) {
      /******/ 			if (
        /******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
        /******/ 			) {
        /******/ 				module = installedModules[moduleId];
        /******/ 				if (module) {
          /******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ 					var callbacks = [];
          /******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
            /******/ 						dependency = moduleOutdatedDependencies[i];
            /******/ 						cb = module.hot._acceptedDependencies[dependency];
            /******/ 						if (cb) {
              /******/ 							if (callbacks.indexOf(cb) !== -1) continue;
              /******/ 							callbacks.push(cb);
              /******/ 						}
            /******/ 					}
          /******/ 					for (i = 0; i < callbacks.length; i++) {
            /******/ 						cb = callbacks[i];
            /******/ 						try {
              /******/ 							cb(moduleOutdatedDependencies);
              /******/ 						} catch (err) {
              /******/ 							if (options.onErrored) {
                /******/ 								options.onErrored({
                  /******/ 									type: "accept-errored",
                  /******/ 									moduleId: moduleId,
                  /******/ 									dependencyId: moduleOutdatedDependencies[i],
                  /******/ 									error: err
                  /******/ 								});
                /******/ 							}
              /******/ 							if (!options.ignoreErrored) {
                /******/ 								if (!error) error = err;
                /******/ 							}
              /******/ 						}
            /******/ 					}
          /******/ 				}
        /******/ 			}
      /******/ 		}
    /******/
    /******/ 		// Load self accepted modules
    /******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
      /******/ 			var item = outdatedSelfAcceptedModules[i];
      /******/ 			moduleId = item.module;
      /******/ 			hotCurrentParents = [moduleId];
      /******/ 			try {
        /******/ 				__webpack_require__(moduleId);
        /******/ 			} catch (err) {
        /******/ 				if (typeof item.errorHandler === "function") {
          /******/ 					try {
            /******/ 						item.errorHandler(err);
            /******/ 					} catch (err2) {
            /******/ 						if (options.onErrored) {
              /******/ 							options.onErrored({
                /******/ 								type: "self-accept-error-handler-errored",
                /******/ 								moduleId: moduleId,
                /******/ 								error: err2,
                /******/ 								originalError: err
                /******/ 							});
              /******/ 						}
            /******/ 						if (!options.ignoreErrored) {
              /******/ 							if (!error) error = err2;
              /******/ 						}
            /******/ 						if (!error) error = err;
            /******/ 					}
          /******/ 				} else {
          /******/ 					if (options.onErrored) {
            /******/ 						options.onErrored({
              /******/ 							type: "self-accept-errored",
              /******/ 							moduleId: moduleId,
              /******/ 							error: err
              /******/ 						});
            /******/ 					}
          /******/ 					if (!options.ignoreErrored) {
            /******/ 						if (!error) error = err;
            /******/ 					}
          /******/ 				}
        /******/ 			}
      /******/ 		}
    /******/
    /******/ 		// handle errors in accept handlers and self accepted module load
    /******/ 		if (error) {
      /******/ 			hotSetStatus("fail");
      /******/ 			return Promise.reject(error);
      /******/ 		}
    /******/
    /******/ 		hotSetStatus("idle");
    /******/ 		return new Promise(function(resolve) {
      /******/ 			resolve(outdatedModules);
      /******/ 		});
    /******/ 	}
  /******/
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// object to store loaded and loading chunks
  /******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
  /******/ 	// Promise = chunk loading, 0 = chunk loaded
  /******/ 	var installedChunks = {
    /******/ 		"front-app": 0
    /******/ 	};
  /******/
  /******/
  /******/
  /******/ 	// script path function
  /******/ 	function jsonpScriptSrc(chunkId) {
    /******/ 		return __webpack_require__.p + "" + {"0":"b67e921329f015c10785","1":"416bfd57a35b61520966","2":"62fda0ae9928ef6099d8","3":"8a4e2b9895f39a4e426c","4":"b01d5a1482d49b0b80a9","5":"d1840c9ee11622f1dedc","6":"b88697dde5578ef15569","7":"3f66c567a36942149736","8":"dd615e3fabbdc323c04f","9":"2a013f9686f82a016f09","10":"3576f4d33f7c05998ce8","11":"c9e364fa19859ed6cfc9","12":"40067c52bcb0d085572d","13":"e617eadca28da4fdb3f1","14":"6ab7633f50cacbe53a87","15":"d694ff631c590a1f15ce","16":"a6ca6323f5be59cc5cbf","17":"19ded4553d72d1f6aa80","18":"039d8ad45285f9e685be","19":"30ae6ccd605d77b0f8df","20":"cac1151c3f6680fdcec1","21":"b86f12261b0788df4f98","22":"6587d5fd1b16d897cb1c","23":"a268dc3231cb707f1284","24":"add45a8235ad901aac5b","25":"9e5614912e058ae450df","26":"4702e115a3833294d2fd","27":"d5090e77e9660dc99152","28":"0bfa9e876c2f6b255e47","29":"61699dfc5bf842800613","30":"e8f4f45df512349db0b8","31":"1bb3209bef9bd38d1f47","32":"1b732e827780673189f9","33":"cd636a2c7916aca4f5e6","34":"f70c3579fb9185c0048b","35":"45ca5499374f623d71c2","36":"4ced0c2b62cafb60fb6f","37":"4f61447d6f8bd8d43f95","38":"e17cbf85ec2929bcf857","39":"488cf114e3d2b8a17c7b","40":"3e6b9e00f54bfbc765cd","41":"61ca2a4034f54906cd14","42":"e27294e9e91753e17190","43":"b0e2887bdefe8600e472","44":"b5d24c327d05953aa793","45":"43af2ff27bdb837c3b03","46":"bfee86726943314829ea","47":"12f9b1573e4bd9961058","48":"2590e5d56bc318558dc6","49":"3ac6e489dd04c300a7d8","50":"8e43bef4643f43db7bf2","51":"e1de4663c2eb3a7635a3","52":"41935c4acf99bfd21b49","53":"0936573b5eac9cc9b7bb","54":"cdaf51dd718f5bd2ea8f","55":"d32850ca3499f3928ab9","56":"911dadf5bf2012a12fc0","57":"7e722899e1217757cc25","58":"3c84ef617dca747d265e","59":"23b51167611b834fbac7","60":"416cde4371f7a4e71afe","61":"f88572b9d4ccaf4dd5ef","62":"80118ac2715a3dd504d7","63":"4e0a569ec611af639803","64":"35bf2495d1d3cce09b64","65":"47a66ec7fb5b0fb61571","66":"ee9cc2facaca2fbcd369","67":"abe770d32799e11d99ac","68":"6d8a71eac3264866aa94","69":"617b33c43180810e43ea","70":"54582d7f37d5338ccbce","71":"94c67794e51e355ed078","72":"d8fe39da06d5bbdbf98f","73":"2d449d08f681b8fdd1d9","74":"d56e3515572893edfa59","75":"102bfdf22b1128031cef","76":"061086466d77e701264f","77":"022ac53058d5d0426c4a","78":"85d5d1784a62e9fca3a0","79":"3f67276afb809f52ce3a","80":"e7c13a94a0da148076dd","81":"dfa22457e66dce4bc4af","82":"0a27ec88d41da52df83e","83":"7324b874085869b4e204","84":"f5a04334558bffddc66d","85":"d09536985508d8dd12c7","86":"e6d6f3607c865ea9decc","87":"869c32b83fec71eac738","88":"2694ea87174a9c5574eb","89":"dd4c392bf6956e3f5c59","90":"4b0f1e021ef6e6fcc5c7","91":"f86f841128c6ef79b589","92":"8c45e44af12357aa19d6","93":"799cc6acbfc4cfb43204","FrontElementsFabric":"067c05f2be6665ee903e","FormsManager":"a0a48689dde01e920f81","elementDecorator":"ace92097cc31365768fe","vendors~FrontApp":"692876ef02f796a363ae","FrontApp~IconWidget~ImageWidget~NavWidget":"4dced7af39fe5432f50b","FrontApp":"101e8daf9d1010270fcb","ElementWrapper":"40af56b8a27c3418b477","FrontElementsManager":"b5f0702297cf685a79df","DashboardsWidget":"c0beccef5561b0e5af81","TableWidget":"fbcf59c38c9fe73076dc","PostsWidget":"1c5864b0b9c8d2aaa68e","AccordionWidget":"d243de52de8f0529f5d1","ListWidget":"2fced20fe7417eb0645b","TabsWidget":"0954e9c476123321cc1a","VideoWidget":"21434e43a19dc2fbf724","InputWidget":"cc762c5b8ba390389451","GalleryWidget":"74b1282558420284709c","vendors~MenuWidget":"35d61b544e32931685d8","MenuWidget":"19313b21ce72453b02cf","vendors~TourGuide":"c500dde2fdbfaa8c488a","TourGuide":"c223da1a6cc807c31db2","ColumnComponent":"b983ca0a314d1d6914fa","SectionComponent":"555c25e866a54000b36d","TextWidget":"a25928bdbb8aca16bc05","ImageWidget":"00c5508b3535ed4a570a","HeadingWidget~IconWidget~NavWidget":"50a83bf496ed51e128fe","IconWidget":"c6b6d99b8dab0b5e2f93","NavWidget":"061f59c86ea235ab28f2","ButtonWidget":"7e5e0db2c8bbd13a63fb","HeadingWidget":"99e63992b5da96626349","vendors~ExportPanelWidget":"8e43caf173e096fcab0a","ExportPanelWidget":"29c27e3594db3442bbc4","CarouselWidget":"f7bfee951a6f83a0ea98","DiagramWidget":"f35037b0c0ce62c8e650","DividerWidget":"4eea65d84d82645905e1","HtmlWidget":"d18e47da2204305e992a","MapConstructorWidget":"c71a97ec0d8a6a25d9fb","MapWidget":"200f63b689b4833f6718","PosterWidget":"6a1c38542ef1d3fb274e","RootComponent":"83c7a4241ea33d8a8c9a","TemplateWidget":"d8a0643f0cf5fcb19824"}[chunkId] + "." + ({"FrontElementsFabric":"FrontElementsFabric","FormsManager":"FormsManager","elementDecorator":"elementDecorator","vendors~FrontApp":"vendors~FrontApp","FrontApp~IconWidget~ImageWidget~NavWidget":"FrontApp~IconWidget~ImageWidget~NavWidget","FrontApp":"FrontApp","ElementWrapper":"ElementWrapper","FrontElementsManager":"FrontElementsManager","DashboardsWidget":"DashboardsWidget","TableWidget":"TableWidget","PostsWidget":"PostsWidget","AccordionWidget":"AccordionWidget","ListWidget":"ListWidget","TabsWidget":"TabsWidget","VideoWidget":"VideoWidget","InputWidget":"InputWidget","GalleryWidget":"GalleryWidget","vendors~MenuWidget":"vendors~MenuWidget","MenuWidget":"MenuWidget","vendors~TourGuide":"vendors~TourGuide","TourGuide":"TourGuide","ColumnComponent":"ColumnComponent","SectionComponent":"SectionComponent","TextWidget":"TextWidget","ImageWidget":"ImageWidget","HeadingWidget~IconWidget~NavWidget":"HeadingWidget~IconWidget~NavWidget","IconWidget":"IconWidget","NavWidget":"NavWidget","ButtonWidget":"ButtonWidget","HeadingWidget":"HeadingWidget","vendors~ExportPanelWidget":"vendors~ExportPanelWidget","ExportPanelWidget":"ExportPanelWidget","CarouselWidget":"CarouselWidget","DiagramWidget":"DiagramWidget","DividerWidget":"DividerWidget","HtmlWidget":"HtmlWidget","MapConstructorWidget":"MapConstructorWidget","MapWidget":"MapWidget","PosterWidget":"PosterWidget","RootComponent":"RootComponent","TemplateWidget":"TemplateWidget"}[chunkId]||chunkId) + ".bundle.js"
    /******/ 	}
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
      /******/ 			return installedModules[moduleId].exports;
      /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
      /******/ 			i: moduleId,
      /******/ 			l: false,
      /******/ 			exports: {},
      /******/ 			hot: hotCreateModule(moduleId),
      /******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
      /******/ 			children: []
      /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
  /******/
  /******/ 	// This file contains only the entry chunk.
  /******/ 	// The chunk loading function for additional chunks
  /******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
    /******/ 		var promises = [];
    /******/
    /******/
    /******/ 		// JSONP chunk loading for javascript
    /******/
    /******/ 		var installedChunkData = installedChunks[chunkId];
    /******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
      /******/
      /******/ 			// a Promise means "currently loading".
      /******/ 			if(installedChunkData) {
        /******/ 				promises.push(installedChunkData[2]);
        /******/ 			} else {
        /******/ 				// setup Promise in chunk cache
        /******/ 				var promise = new Promise(function(resolve, reject) {
          /******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
          /******/ 				});
        /******/ 				promises.push(installedChunkData[2] = promise);
        /******/
        /******/ 				// start chunk loading
        /******/ 				var script = document.createElement('script');
        /******/ 				var onScriptComplete;
        /******/
        /******/ 				script.charset = 'utf-8';
        /******/ 				script.timeout = 120;
        /******/ 				if (__webpack_require__.nc) {
          /******/ 					script.setAttribute("nonce", __webpack_require__.nc);
          /******/ 				}
        /******/ 				script.src = jsonpScriptSrc(chunkId);
        /******/
        /******/ 				// create error before stack unwound to get useful stacktrace later
        /******/ 				var error = new Error();
        /******/ 				onScriptComplete = function (event) {
          /******/ 					// avoid mem leaks in IE.
          /******/ 					script.onerror = script.onload = null;
          /******/ 					clearTimeout(timeout);
          /******/ 					var chunk = installedChunks[chunkId];
          /******/ 					if(chunk !== 0) {
            /******/ 						if(chunk) {
              /******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              /******/ 							var realSrc = event && event.target && event.target.src;
              /******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              /******/ 							error.name = 'ChunkLoadError';
              /******/ 							error.type = errorType;
              /******/ 							error.request = realSrc;
              /******/ 							chunk[1](error);
              /******/ 						}
            /******/ 						installedChunks[chunkId] = undefined;
            /******/ 					}
          /******/ 				};
        /******/ 				var timeout = setTimeout(function(){
          /******/ 					onScriptComplete({ type: 'timeout', target: script });
          /******/ 				}, 120000);
        /******/ 				script.onerror = script.onload = onScriptComplete;
        /******/ 				document.head.appendChild(script);
        /******/ 			}
      /******/ 		}
    /******/ 		return Promise.all(promises);
    /******/ 	};
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
    /******/ 		if(!__webpack_require__.o(exports, name)) {
      /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/ 		}
    /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
    /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/ 		}
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
    /******/ 		if(mode & 1) value = __webpack_require__(value);
    /******/ 		if(mode & 8) return value;
    /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /******/ 		var ns = Object.create(null);
    /******/ 		__webpack_require__.r(ns);
    /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
    /******/ 		return ns;
    /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
    /******/ 		var getter = module && module.__esModule ?
      /******/ 			function getDefault() { return module['default']; } :
      /******/ 			function getModuleExports() { return module; };
    /******/ 		__webpack_require__.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "http://localhost:3001/src/";
  /******/
  /******/ 	// on error function for async loading
  /******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
  /******/
  /******/ 	// __webpack_hash__
  /******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
  /******/
  /******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  /******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  /******/ 	jsonpArray.push = webpackJsonpCallback;
  /******/ 	jsonpArray = jsonpArray.slice();
  /******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  /******/ 	var parentJsonpFunction = oldJsonpFunction;
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
  /******/ })
  /************************************************************************/
  /******/ ({

    /***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
    /*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
            args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next(undefined);
          });
        };
      }

      module.exports = _asyncToGenerator;

      /***/ }),

    /***/ "./node_modules/@babel/runtime/regenerator/index.js":
    /*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


      /***/ }),

    /***/ "./node_modules/ansi-html/index.js":
    /*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
      var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

      var _defColors = {
        reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
        black: '000',
        red: 'ff0000',
        green: '209805',
        yellow: 'e8bf03',
        blue: '0000ff',
        magenta: 'ff00ff',
        cyan: '00ffee',
        lightgrey: 'f0f0f0',
        darkgrey: '888'
      }
      var _styles = {
        30: 'black',
        31: 'red',
        32: 'green',
        33: 'yellow',
        34: 'blue',
        35: 'magenta',
        36: 'cyan',
        37: 'lightgrey'
      }
      var _openTags = {
        '1': 'font-weight:bold', // bold
        '2': 'opacity:0.5', // dim
        '3': '<i>', // italic
        '4': '<u>', // underscore
        '8': 'display:none', // hidden
        '9': '<del>' // delete
      }
      var _closeTags = {
          '23': '</i>', // reset italic
          '24': '</u>', // reset underscore
          '29': '</del>' // reset delete
        }

      ;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
        _closeTags[n] = '</span>'
      })

      /**
       * Converts text with ANSI color codes to HTML markup.
       * @param {String} text
       * @returns {*}
       */
      function ansiHTML (text) {
        // Returns the text if the string has no ANSI escape code.
        if (!_regANSI.test(text)) {
          return text
        }

        // Cache opened sequence.
        var ansiCodes = []
        // Replace with markup.
        var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
          var ot = _openTags[seq]
          if (ot) {
            // If current sequence has been opened, close it.
            if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
              ansiCodes.pop()
              return '</span>'
            }
            // Open tag.
            ansiCodes.push(seq)
            return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
          }

          var ct = _closeTags[seq]
          if (ct) {
            // Pop sequence
            ansiCodes.pop()
            return ct
          }
          return ''
        })

        // Make sure tags are closed.
        var l = ansiCodes.length
        ;(l > 0) && (ret += Array(l + 1).join('</span>'))

        return ret
      }

      /**
       * Customize colors.
       * @param {Object} colors reference to _defColors
       */
      ansiHTML.setColors = function (colors) {
        if (typeof colors !== 'object') {
          throw new Error('`colors` parameter must be an Object.')
        }

        var _finalColors = {}
        for (var key in _defColors) {
          var hex = colors.hasOwnProperty(key) ? colors[key] : null
          if (!hex) {
            _finalColors[key] = _defColors[key]
            continue
          }
          if ('reset' === key) {
            if (typeof hex === 'string') {
              hex = [hex]
            }
            if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
              return typeof h !== 'string'
            })) {
              throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
            }
            var defHexColor = _defColors[key]
            if (!hex[0]) {
              hex[0] = defHexColor[0]
            }
            if (hex.length === 1 || !hex[1]) {
              hex = [hex[0]]
              hex.push(defHexColor[1])
            }

            hex = hex.slice(0, 2)
          } else if (typeof hex !== 'string') {
            throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
          }
          _finalColors[key] = hex
        }
        _setTags(_finalColors)
      }

      /**
       * Reset colors.
       */
      ansiHTML.reset = function () {
        _setTags(_defColors)
      }

      /**
       * Expose tags, including open and close.
       * @type {Object}
       */
      ansiHTML.tags = {}

      if (Object.defineProperty) {
        Object.defineProperty(ansiHTML.tags, 'open', {
          get: function () { return _openTags }
        })
        Object.defineProperty(ansiHTML.tags, 'close', {
          get: function () { return _closeTags }
        })
      } else {
        ansiHTML.tags.open = _openTags
        ansiHTML.tags.close = _closeTags
      }

      function _setTags (colors) {
        // reset all
        _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
        // inverse
        _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
        // dark grey
        _openTags['90'] = 'color:#' + colors.darkgrey

        for (var code in _styles) {
          var color = _styles[code]
          var oriColor = colors[color] || '000'
          _openTags[code] = 'color:#' + oriColor
          code = parseInt(code)
          _openTags[(code + 10).toString()] = 'background:#' + oriColor
        }
      }

      ansiHTML.reset()


      /***/ }),

    /***/ "./node_modules/ansi-regex/index.js":
    /*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      module.exports = function () {
        return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
      };


      /***/ }),

    /***/ "./node_modules/css-loader/index.js!./node_modules/bootstrap/dist/css/bootstrap-grid.min.css":
    /*!******************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/bootstrap/dist/css/bootstrap-grid.min.css ***!
  \******************************************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(/*! ../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
      exports.push([module.i, "/*!\n * Bootstrap Grid v4.5.2 (https://getbootstrap.com/)\n * Copyright 2011-2020 The Bootstrap Authors\n * Copyright 2011-2020 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n */html{box-sizing:border-box;-ms-overflow-style:scrollbar}*,::after,::before{box-sizing:inherit}.container,.container-fluid,.container-lg,.container-md,.container-sm,.container-xl{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width:992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width:1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}.row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.no-gutters{margin-right:0;margin-left:0}.no-gutters>.col,.no-gutters>[class*=col-]{padding-right:0;padding-left:0}.col,.col-1,.col-10,.col-11,.col-12,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-auto,.col-lg,.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-auto,.col-md,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-auto,.col-sm,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-auto,.col-xl,.col-xl-1,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-auto{position:relative;width:100%;padding-right:15px;padding-left:15px}.col{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-first{-ms-flex-order:-1;order:-1}.order-last{-ms-flex-order:13;order:13}.order-0{-ms-flex-order:0;order:0}.order-1{-ms-flex-order:1;order:1}.order-2{-ms-flex-order:2;order:2}.order-3{-ms-flex-order:3;order:3}.order-4{-ms-flex-order:4;order:4}.order-5{-ms-flex-order:5;order:5}.order-6{-ms-flex-order:6;order:6}.order-7{-ms-flex-order:7;order:7}.order-8{-ms-flex-order:8;order:8}.order-9{-ms-flex-order:9;order:9}.order-10{-ms-flex-order:10;order:10}.order-11{-ms-flex-order:11;order:11}.order-12{-ms-flex-order:12;order:12}.offset-1{margin-left:8.333333%}.offset-2{margin-left:16.666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.333333%}.offset-5{margin-left:41.666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.333333%}.offset-8{margin-left:66.666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.333333%}.offset-11{margin-left:91.666667%}@media (min-width:576px){.col-sm{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-sm-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-sm-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-sm-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-sm-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-sm-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-sm-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-sm-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-sm-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-sm-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-sm-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-sm-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-sm-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-sm-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-sm-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-sm-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-sm-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-sm-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-sm-first{-ms-flex-order:-1;order:-1}.order-sm-last{-ms-flex-order:13;order:13}.order-sm-0{-ms-flex-order:0;order:0}.order-sm-1{-ms-flex-order:1;order:1}.order-sm-2{-ms-flex-order:2;order:2}.order-sm-3{-ms-flex-order:3;order:3}.order-sm-4{-ms-flex-order:4;order:4}.order-sm-5{-ms-flex-order:5;order:5}.order-sm-6{-ms-flex-order:6;order:6}.order-sm-7{-ms-flex-order:7;order:7}.order-sm-8{-ms-flex-order:8;order:8}.order-sm-9{-ms-flex-order:9;order:9}.order-sm-10{-ms-flex-order:10;order:10}.order-sm-11{-ms-flex-order:11;order:11}.order-sm-12{-ms-flex-order:12;order:12}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.333333%}.offset-sm-2{margin-left:16.666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.333333%}.offset-sm-5{margin-left:41.666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.333333%}.offset-sm-8{margin-left:66.666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.333333%}.offset-sm-11{margin-left:91.666667%}}@media (min-width:768px){.col-md{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-md-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-md-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-md-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-md-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-md-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-md-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-md-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-md-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-md-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-md-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-md-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-md-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-md-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-md-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-md-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-md-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-md-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-md-first{-ms-flex-order:-1;order:-1}.order-md-last{-ms-flex-order:13;order:13}.order-md-0{-ms-flex-order:0;order:0}.order-md-1{-ms-flex-order:1;order:1}.order-md-2{-ms-flex-order:2;order:2}.order-md-3{-ms-flex-order:3;order:3}.order-md-4{-ms-flex-order:4;order:4}.order-md-5{-ms-flex-order:5;order:5}.order-md-6{-ms-flex-order:6;order:6}.order-md-7{-ms-flex-order:7;order:7}.order-md-8{-ms-flex-order:8;order:8}.order-md-9{-ms-flex-order:9;order:9}.order-md-10{-ms-flex-order:10;order:10}.order-md-11{-ms-flex-order:11;order:11}.order-md-12{-ms-flex-order:12;order:12}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.333333%}.offset-md-2{margin-left:16.666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.333333%}.offset-md-5{margin-left:41.666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.333333%}.offset-md-8{margin-left:66.666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.333333%}.offset-md-11{margin-left:91.666667%}}@media (min-width:992px){.col-lg{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-lg-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-lg-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-lg-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-lg-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-lg-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-lg-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-lg-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-lg-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-lg-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-lg-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-lg-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-lg-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-lg-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-lg-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-lg-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-lg-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-lg-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-lg-first{-ms-flex-order:-1;order:-1}.order-lg-last{-ms-flex-order:13;order:13}.order-lg-0{-ms-flex-order:0;order:0}.order-lg-1{-ms-flex-order:1;order:1}.order-lg-2{-ms-flex-order:2;order:2}.order-lg-3{-ms-flex-order:3;order:3}.order-lg-4{-ms-flex-order:4;order:4}.order-lg-5{-ms-flex-order:5;order:5}.order-lg-6{-ms-flex-order:6;order:6}.order-lg-7{-ms-flex-order:7;order:7}.order-lg-8{-ms-flex-order:8;order:8}.order-lg-9{-ms-flex-order:9;order:9}.order-lg-10{-ms-flex-order:10;order:10}.order-lg-11{-ms-flex-order:11;order:11}.order-lg-12{-ms-flex-order:12;order:12}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.333333%}.offset-lg-2{margin-left:16.666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.333333%}.offset-lg-5{margin-left:41.666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.333333%}.offset-lg-8{margin-left:66.666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.333333%}.offset-lg-11{margin-left:91.666667%}}@media (min-width:1200px){.col-xl{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-xl-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-xl-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-xl-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-xl-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-xl-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-xl-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-xl-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-xl-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-xl-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-xl-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-xl-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-xl-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-xl-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-xl-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-xl-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-xl-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-xl-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-xl-first{-ms-flex-order:-1;order:-1}.order-xl-last{-ms-flex-order:13;order:13}.order-xl-0{-ms-flex-order:0;order:0}.order-xl-1{-ms-flex-order:1;order:1}.order-xl-2{-ms-flex-order:2;order:2}.order-xl-3{-ms-flex-order:3;order:3}.order-xl-4{-ms-flex-order:4;order:4}.order-xl-5{-ms-flex-order:5;order:5}.order-xl-6{-ms-flex-order:6;order:6}.order-xl-7{-ms-flex-order:7;order:7}.order-xl-8{-ms-flex-order:8;order:8}.order-xl-9{-ms-flex-order:9;order:9}.order-xl-10{-ms-flex-order:10;order:10}.order-xl-11{-ms-flex-order:11;order:11}.order-xl-12{-ms-flex-order:12;order:12}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.333333%}.offset-xl-2{margin-left:16.666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.333333%}.offset-xl-5{margin-left:41.666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.333333%}.offset-xl-8{margin-left:66.666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.333333%}.offset-xl-11{margin-left:91.666667%}}.d-none{display:none!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block{display:block!important}.d-table{display:table!important}.d-table-row{display:table-row!important}.d-table-cell{display:table-cell!important}.d-flex{display:-ms-flexbox!important;display:flex!important}.d-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}@media (min-width:576px){.d-sm-none{display:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-table{display:table!important}.d-sm-table-row{display:table-row!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:-ms-flexbox!important;display:flex!important}.d-sm-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:768px){.d-md-none{display:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-table{display:table!important}.d-md-table-row{display:table-row!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:-ms-flexbox!important;display:flex!important}.d-md-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:992px){.d-lg-none{display:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-table{display:table!important}.d-lg-table-row{display:table-row!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:-ms-flexbox!important;display:flex!important}.d-lg-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:1200px){.d-xl-none{display:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-table{display:table!important}.d-xl-table-row{display:table-row!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:-ms-flexbox!important;display:flex!important}.d-xl-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media print{.d-print-none{display:none!important}.d-print-inline{display:inline!important}.d-print-inline-block{display:inline-block!important}.d-print-block{display:block!important}.d-print-table{display:table!important}.d-print-table-row{display:table-row!important}.d-print-table-cell{display:table-cell!important}.d-print-flex{display:-ms-flexbox!important;display:flex!important}.d-print-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}.flex-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-center{-ms-flex-align:center!important;align-items:center!important}.align-items-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}@media (min-width:576px){.flex-sm-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-sm-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-sm-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-sm-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-sm-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-sm-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-sm-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-sm-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-sm-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-sm-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-sm-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-sm-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-sm-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-sm-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-sm-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-sm-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-sm-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-sm-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-sm-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-sm-center{-ms-flex-align:center!important;align-items:center!important}.align-items-sm-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-sm-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-sm-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-sm-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-sm-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-sm-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-sm-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-sm-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-sm-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-sm-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-sm-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-sm-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-sm-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-sm-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:768px){.flex-md-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-md-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-md-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-md-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-md-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-md-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-md-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-md-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-md-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-md-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-md-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-md-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-md-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-md-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-md-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-md-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-md-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-md-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-md-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-md-center{-ms-flex-align:center!important;align-items:center!important}.align-items-md-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-md-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-md-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-md-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-md-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-md-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-md-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-md-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-md-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-md-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-md-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-md-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-md-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-md-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:992px){.flex-lg-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-lg-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-lg-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-lg-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-lg-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-lg-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-lg-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-lg-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-lg-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-lg-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-lg-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-lg-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-lg-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-lg-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-lg-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-lg-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-lg-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-lg-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-lg-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-lg-center{-ms-flex-align:center!important;align-items:center!important}.align-items-lg-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-lg-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-lg-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-lg-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-lg-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-lg-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-lg-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-lg-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-lg-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-lg-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-lg-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-lg-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-lg-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-lg-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:1200px){.flex-xl-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-xl-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-xl-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-xl-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-xl-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-xl-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-xl-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-xl-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-xl-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-xl-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-xl-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-xl-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-xl-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-xl-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-xl-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-xl-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-xl-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-xl-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-xl-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-xl-center{-ms-flex-align:center!important;align-items:center!important}.align-items-xl-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-xl-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-xl-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-xl-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-xl-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-xl-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-xl-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-xl-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-xl-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-xl-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-xl-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-xl-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-xl-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-xl-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}.m-0{margin:0!important}.mt-0,.my-0{margin-top:0!important}.mr-0,.mx-0{margin-right:0!important}.mb-0,.my-0{margin-bottom:0!important}.ml-0,.mx-0{margin-left:0!important}.m-1{margin:.25rem!important}.mt-1,.my-1{margin-top:.25rem!important}.mr-1,.mx-1{margin-right:.25rem!important}.mb-1,.my-1{margin-bottom:.25rem!important}.ml-1,.mx-1{margin-left:.25rem!important}.m-2{margin:.5rem!important}.mt-2,.my-2{margin-top:.5rem!important}.mr-2,.mx-2{margin-right:.5rem!important}.mb-2,.my-2{margin-bottom:.5rem!important}.ml-2,.mx-2{margin-left:.5rem!important}.m-3{margin:1rem!important}.mt-3,.my-3{margin-top:1rem!important}.mr-3,.mx-3{margin-right:1rem!important}.mb-3,.my-3{margin-bottom:1rem!important}.ml-3,.mx-3{margin-left:1rem!important}.m-4{margin:1.5rem!important}.mt-4,.my-4{margin-top:1.5rem!important}.mr-4,.mx-4{margin-right:1.5rem!important}.mb-4,.my-4{margin-bottom:1.5rem!important}.ml-4,.mx-4{margin-left:1.5rem!important}.m-5{margin:3rem!important}.mt-5,.my-5{margin-top:3rem!important}.mr-5,.mx-5{margin-right:3rem!important}.mb-5,.my-5{margin-bottom:3rem!important}.ml-5,.mx-5{margin-left:3rem!important}.p-0{padding:0!important}.pt-0,.py-0{padding-top:0!important}.pr-0,.px-0{padding-right:0!important}.pb-0,.py-0{padding-bottom:0!important}.pl-0,.px-0{padding-left:0!important}.p-1{padding:.25rem!important}.pt-1,.py-1{padding-top:.25rem!important}.pr-1,.px-1{padding-right:.25rem!important}.pb-1,.py-1{padding-bottom:.25rem!important}.pl-1,.px-1{padding-left:.25rem!important}.p-2{padding:.5rem!important}.pt-2,.py-2{padding-top:.5rem!important}.pr-2,.px-2{padding-right:.5rem!important}.pb-2,.py-2{padding-bottom:.5rem!important}.pl-2,.px-2{padding-left:.5rem!important}.p-3{padding:1rem!important}.pt-3,.py-3{padding-top:1rem!important}.pr-3,.px-3{padding-right:1rem!important}.pb-3,.py-3{padding-bottom:1rem!important}.pl-3,.px-3{padding-left:1rem!important}.p-4{padding:1.5rem!important}.pt-4,.py-4{padding-top:1.5rem!important}.pr-4,.px-4{padding-right:1.5rem!important}.pb-4,.py-4{padding-bottom:1.5rem!important}.pl-4,.px-4{padding-left:1.5rem!important}.p-5{padding:3rem!important}.pt-5,.py-5{padding-top:3rem!important}.pr-5,.px-5{padding-right:3rem!important}.pb-5,.py-5{padding-bottom:3rem!important}.pl-5,.px-5{padding-left:3rem!important}.m-n1{margin:-.25rem!important}.mt-n1,.my-n1{margin-top:-.25rem!important}.mr-n1,.mx-n1{margin-right:-.25rem!important}.mb-n1,.my-n1{margin-bottom:-.25rem!important}.ml-n1,.mx-n1{margin-left:-.25rem!important}.m-n2{margin:-.5rem!important}.mt-n2,.my-n2{margin-top:-.5rem!important}.mr-n2,.mx-n2{margin-right:-.5rem!important}.mb-n2,.my-n2{margin-bottom:-.5rem!important}.ml-n2,.mx-n2{margin-left:-.5rem!important}.m-n3{margin:-1rem!important}.mt-n3,.my-n3{margin-top:-1rem!important}.mr-n3,.mx-n3{margin-right:-1rem!important}.mb-n3,.my-n3{margin-bottom:-1rem!important}.ml-n3,.mx-n3{margin-left:-1rem!important}.m-n4{margin:-1.5rem!important}.mt-n4,.my-n4{margin-top:-1.5rem!important}.mr-n4,.mx-n4{margin-right:-1.5rem!important}.mb-n4,.my-n4{margin-bottom:-1.5rem!important}.ml-n4,.mx-n4{margin-left:-1.5rem!important}.m-n5{margin:-3rem!important}.mt-n5,.my-n5{margin-top:-3rem!important}.mr-n5,.mx-n5{margin-right:-3rem!important}.mb-n5,.my-n5{margin-bottom:-3rem!important}.ml-n5,.mx-n5{margin-left:-3rem!important}.m-auto{margin:auto!important}.mt-auto,.my-auto{margin-top:auto!important}.mr-auto,.mx-auto{margin-right:auto!important}.mb-auto,.my-auto{margin-bottom:auto!important}.ml-auto,.mx-auto{margin-left:auto!important}@media (min-width:576px){.m-sm-0{margin:0!important}.mt-sm-0,.my-sm-0{margin-top:0!important}.mr-sm-0,.mx-sm-0{margin-right:0!important}.mb-sm-0,.my-sm-0{margin-bottom:0!important}.ml-sm-0,.mx-sm-0{margin-left:0!important}.m-sm-1{margin:.25rem!important}.mt-sm-1,.my-sm-1{margin-top:.25rem!important}.mr-sm-1,.mx-sm-1{margin-right:.25rem!important}.mb-sm-1,.my-sm-1{margin-bottom:.25rem!important}.ml-sm-1,.mx-sm-1{margin-left:.25rem!important}.m-sm-2{margin:.5rem!important}.mt-sm-2,.my-sm-2{margin-top:.5rem!important}.mr-sm-2,.mx-sm-2{margin-right:.5rem!important}.mb-sm-2,.my-sm-2{margin-bottom:.5rem!important}.ml-sm-2,.mx-sm-2{margin-left:.5rem!important}.m-sm-3{margin:1rem!important}.mt-sm-3,.my-sm-3{margin-top:1rem!important}.mr-sm-3,.mx-sm-3{margin-right:1rem!important}.mb-sm-3,.my-sm-3{margin-bottom:1rem!important}.ml-sm-3,.mx-sm-3{margin-left:1rem!important}.m-sm-4{margin:1.5rem!important}.mt-sm-4,.my-sm-4{margin-top:1.5rem!important}.mr-sm-4,.mx-sm-4{margin-right:1.5rem!important}.mb-sm-4,.my-sm-4{margin-bottom:1.5rem!important}.ml-sm-4,.mx-sm-4{margin-left:1.5rem!important}.m-sm-5{margin:3rem!important}.mt-sm-5,.my-sm-5{margin-top:3rem!important}.mr-sm-5,.mx-sm-5{margin-right:3rem!important}.mb-sm-5,.my-sm-5{margin-bottom:3rem!important}.ml-sm-5,.mx-sm-5{margin-left:3rem!important}.p-sm-0{padding:0!important}.pt-sm-0,.py-sm-0{padding-top:0!important}.pr-sm-0,.px-sm-0{padding-right:0!important}.pb-sm-0,.py-sm-0{padding-bottom:0!important}.pl-sm-0,.px-sm-0{padding-left:0!important}.p-sm-1{padding:.25rem!important}.pt-sm-1,.py-sm-1{padding-top:.25rem!important}.pr-sm-1,.px-sm-1{padding-right:.25rem!important}.pb-sm-1,.py-sm-1{padding-bottom:.25rem!important}.pl-sm-1,.px-sm-1{padding-left:.25rem!important}.p-sm-2{padding:.5rem!important}.pt-sm-2,.py-sm-2{padding-top:.5rem!important}.pr-sm-2,.px-sm-2{padding-right:.5rem!important}.pb-sm-2,.py-sm-2{padding-bottom:.5rem!important}.pl-sm-2,.px-sm-2{padding-left:.5rem!important}.p-sm-3{padding:1rem!important}.pt-sm-3,.py-sm-3{padding-top:1rem!important}.pr-sm-3,.px-sm-3{padding-right:1rem!important}.pb-sm-3,.py-sm-3{padding-bottom:1rem!important}.pl-sm-3,.px-sm-3{padding-left:1rem!important}.p-sm-4{padding:1.5rem!important}.pt-sm-4,.py-sm-4{padding-top:1.5rem!important}.pr-sm-4,.px-sm-4{padding-right:1.5rem!important}.pb-sm-4,.py-sm-4{padding-bottom:1.5rem!important}.pl-sm-4,.px-sm-4{padding-left:1.5rem!important}.p-sm-5{padding:3rem!important}.pt-sm-5,.py-sm-5{padding-top:3rem!important}.pr-sm-5,.px-sm-5{padding-right:3rem!important}.pb-sm-5,.py-sm-5{padding-bottom:3rem!important}.pl-sm-5,.px-sm-5{padding-left:3rem!important}.m-sm-n1{margin:-.25rem!important}.mt-sm-n1,.my-sm-n1{margin-top:-.25rem!important}.mr-sm-n1,.mx-sm-n1{margin-right:-.25rem!important}.mb-sm-n1,.my-sm-n1{margin-bottom:-.25rem!important}.ml-sm-n1,.mx-sm-n1{margin-left:-.25rem!important}.m-sm-n2{margin:-.5rem!important}.mt-sm-n2,.my-sm-n2{margin-top:-.5rem!important}.mr-sm-n2,.mx-sm-n2{margin-right:-.5rem!important}.mb-sm-n2,.my-sm-n2{margin-bottom:-.5rem!important}.ml-sm-n2,.mx-sm-n2{margin-left:-.5rem!important}.m-sm-n3{margin:-1rem!important}.mt-sm-n3,.my-sm-n3{margin-top:-1rem!important}.mr-sm-n3,.mx-sm-n3{margin-right:-1rem!important}.mb-sm-n3,.my-sm-n3{margin-bottom:-1rem!important}.ml-sm-n3,.mx-sm-n3{margin-left:-1rem!important}.m-sm-n4{margin:-1.5rem!important}.mt-sm-n4,.my-sm-n4{margin-top:-1.5rem!important}.mr-sm-n4,.mx-sm-n4{margin-right:-1.5rem!important}.mb-sm-n4,.my-sm-n4{margin-bottom:-1.5rem!important}.ml-sm-n4,.mx-sm-n4{margin-left:-1.5rem!important}.m-sm-n5{margin:-3rem!important}.mt-sm-n5,.my-sm-n5{margin-top:-3rem!important}.mr-sm-n5,.mx-sm-n5{margin-right:-3rem!important}.mb-sm-n5,.my-sm-n5{margin-bottom:-3rem!important}.ml-sm-n5,.mx-sm-n5{margin-left:-3rem!important}.m-sm-auto{margin:auto!important}.mt-sm-auto,.my-sm-auto{margin-top:auto!important}.mr-sm-auto,.mx-sm-auto{margin-right:auto!important}.mb-sm-auto,.my-sm-auto{margin-bottom:auto!important}.ml-sm-auto,.mx-sm-auto{margin-left:auto!important}}@media (min-width:768px){.m-md-0{margin:0!important}.mt-md-0,.my-md-0{margin-top:0!important}.mr-md-0,.mx-md-0{margin-right:0!important}.mb-md-0,.my-md-0{margin-bottom:0!important}.ml-md-0,.mx-md-0{margin-left:0!important}.m-md-1{margin:.25rem!important}.mt-md-1,.my-md-1{margin-top:.25rem!important}.mr-md-1,.mx-md-1{margin-right:.25rem!important}.mb-md-1,.my-md-1{margin-bottom:.25rem!important}.ml-md-1,.mx-md-1{margin-left:.25rem!important}.m-md-2{margin:.5rem!important}.mt-md-2,.my-md-2{margin-top:.5rem!important}.mr-md-2,.mx-md-2{margin-right:.5rem!important}.mb-md-2,.my-md-2{margin-bottom:.5rem!important}.ml-md-2,.mx-md-2{margin-left:.5rem!important}.m-md-3{margin:1rem!important}.mt-md-3,.my-md-3{margin-top:1rem!important}.mr-md-3,.mx-md-3{margin-right:1rem!important}.mb-md-3,.my-md-3{margin-bottom:1rem!important}.ml-md-3,.mx-md-3{margin-left:1rem!important}.m-md-4{margin:1.5rem!important}.mt-md-4,.my-md-4{margin-top:1.5rem!important}.mr-md-4,.mx-md-4{margin-right:1.5rem!important}.mb-md-4,.my-md-4{margin-bottom:1.5rem!important}.ml-md-4,.mx-md-4{margin-left:1.5rem!important}.m-md-5{margin:3rem!important}.mt-md-5,.my-md-5{margin-top:3rem!important}.mr-md-5,.mx-md-5{margin-right:3rem!important}.mb-md-5,.my-md-5{margin-bottom:3rem!important}.ml-md-5,.mx-md-5{margin-left:3rem!important}.p-md-0{padding:0!important}.pt-md-0,.py-md-0{padding-top:0!important}.pr-md-0,.px-md-0{padding-right:0!important}.pb-md-0,.py-md-0{padding-bottom:0!important}.pl-md-0,.px-md-0{padding-left:0!important}.p-md-1{padding:.25rem!important}.pt-md-1,.py-md-1{padding-top:.25rem!important}.pr-md-1,.px-md-1{padding-right:.25rem!important}.pb-md-1,.py-md-1{padding-bottom:.25rem!important}.pl-md-1,.px-md-1{padding-left:.25rem!important}.p-md-2{padding:.5rem!important}.pt-md-2,.py-md-2{padding-top:.5rem!important}.pr-md-2,.px-md-2{padding-right:.5rem!important}.pb-md-2,.py-md-2{padding-bottom:.5rem!important}.pl-md-2,.px-md-2{padding-left:.5rem!important}.p-md-3{padding:1rem!important}.pt-md-3,.py-md-3{padding-top:1rem!important}.pr-md-3,.px-md-3{padding-right:1rem!important}.pb-md-3,.py-md-3{padding-bottom:1rem!important}.pl-md-3,.px-md-3{padding-left:1rem!important}.p-md-4{padding:1.5rem!important}.pt-md-4,.py-md-4{padding-top:1.5rem!important}.pr-md-4,.px-md-4{padding-right:1.5rem!important}.pb-md-4,.py-md-4{padding-bottom:1.5rem!important}.pl-md-4,.px-md-4{padding-left:1.5rem!important}.p-md-5{padding:3rem!important}.pt-md-5,.py-md-5{padding-top:3rem!important}.pr-md-5,.px-md-5{padding-right:3rem!important}.pb-md-5,.py-md-5{padding-bottom:3rem!important}.pl-md-5,.px-md-5{padding-left:3rem!important}.m-md-n1{margin:-.25rem!important}.mt-md-n1,.my-md-n1{margin-top:-.25rem!important}.mr-md-n1,.mx-md-n1{margin-right:-.25rem!important}.mb-md-n1,.my-md-n1{margin-bottom:-.25rem!important}.ml-md-n1,.mx-md-n1{margin-left:-.25rem!important}.m-md-n2{margin:-.5rem!important}.mt-md-n2,.my-md-n2{margin-top:-.5rem!important}.mr-md-n2,.mx-md-n2{margin-right:-.5rem!important}.mb-md-n2,.my-md-n2{margin-bottom:-.5rem!important}.ml-md-n2,.mx-md-n2{margin-left:-.5rem!important}.m-md-n3{margin:-1rem!important}.mt-md-n3,.my-md-n3{margin-top:-1rem!important}.mr-md-n3,.mx-md-n3{margin-right:-1rem!important}.mb-md-n3,.my-md-n3{margin-bottom:-1rem!important}.ml-md-n3,.mx-md-n3{margin-left:-1rem!important}.m-md-n4{margin:-1.5rem!important}.mt-md-n4,.my-md-n4{margin-top:-1.5rem!important}.mr-md-n4,.mx-md-n4{margin-right:-1.5rem!important}.mb-md-n4,.my-md-n4{margin-bottom:-1.5rem!important}.ml-md-n4,.mx-md-n4{margin-left:-1.5rem!important}.m-md-n5{margin:-3rem!important}.mt-md-n5,.my-md-n5{margin-top:-3rem!important}.mr-md-n5,.mx-md-n5{margin-right:-3rem!important}.mb-md-n5,.my-md-n5{margin-bottom:-3rem!important}.ml-md-n5,.mx-md-n5{margin-left:-3rem!important}.m-md-auto{margin:auto!important}.mt-md-auto,.my-md-auto{margin-top:auto!important}.mr-md-auto,.mx-md-auto{margin-right:auto!important}.mb-md-auto,.my-md-auto{margin-bottom:auto!important}.ml-md-auto,.mx-md-auto{margin-left:auto!important}}@media (min-width:992px){.m-lg-0{margin:0!important}.mt-lg-0,.my-lg-0{margin-top:0!important}.mr-lg-0,.mx-lg-0{margin-right:0!important}.mb-lg-0,.my-lg-0{margin-bottom:0!important}.ml-lg-0,.mx-lg-0{margin-left:0!important}.m-lg-1{margin:.25rem!important}.mt-lg-1,.my-lg-1{margin-top:.25rem!important}.mr-lg-1,.mx-lg-1{margin-right:.25rem!important}.mb-lg-1,.my-lg-1{margin-bottom:.25rem!important}.ml-lg-1,.mx-lg-1{margin-left:.25rem!important}.m-lg-2{margin:.5rem!important}.mt-lg-2,.my-lg-2{margin-top:.5rem!important}.mr-lg-2,.mx-lg-2{margin-right:.5rem!important}.mb-lg-2,.my-lg-2{margin-bottom:.5rem!important}.ml-lg-2,.mx-lg-2{margin-left:.5rem!important}.m-lg-3{margin:1rem!important}.mt-lg-3,.my-lg-3{margin-top:1rem!important}.mr-lg-3,.mx-lg-3{margin-right:1rem!important}.mb-lg-3,.my-lg-3{margin-bottom:1rem!important}.ml-lg-3,.mx-lg-3{margin-left:1rem!important}.m-lg-4{margin:1.5rem!important}.mt-lg-4,.my-lg-4{margin-top:1.5rem!important}.mr-lg-4,.mx-lg-4{margin-right:1.5rem!important}.mb-lg-4,.my-lg-4{margin-bottom:1.5rem!important}.ml-lg-4,.mx-lg-4{margin-left:1.5rem!important}.m-lg-5{margin:3rem!important}.mt-lg-5,.my-lg-5{margin-top:3rem!important}.mr-lg-5,.mx-lg-5{margin-right:3rem!important}.mb-lg-5,.my-lg-5{margin-bottom:3rem!important}.ml-lg-5,.mx-lg-5{margin-left:3rem!important}.p-lg-0{padding:0!important}.pt-lg-0,.py-lg-0{padding-top:0!important}.pr-lg-0,.px-lg-0{padding-right:0!important}.pb-lg-0,.py-lg-0{padding-bottom:0!important}.pl-lg-0,.px-lg-0{padding-left:0!important}.p-lg-1{padding:.25rem!important}.pt-lg-1,.py-lg-1{padding-top:.25rem!important}.pr-lg-1,.px-lg-1{padding-right:.25rem!important}.pb-lg-1,.py-lg-1{padding-bottom:.25rem!important}.pl-lg-1,.px-lg-1{padding-left:.25rem!important}.p-lg-2{padding:.5rem!important}.pt-lg-2,.py-lg-2{padding-top:.5rem!important}.pr-lg-2,.px-lg-2{padding-right:.5rem!important}.pb-lg-2,.py-lg-2{padding-bottom:.5rem!important}.pl-lg-2,.px-lg-2{padding-left:.5rem!important}.p-lg-3{padding:1rem!important}.pt-lg-3,.py-lg-3{padding-top:1rem!important}.pr-lg-3,.px-lg-3{padding-right:1rem!important}.pb-lg-3,.py-lg-3{padding-bottom:1rem!important}.pl-lg-3,.px-lg-3{padding-left:1rem!important}.p-lg-4{padding:1.5rem!important}.pt-lg-4,.py-lg-4{padding-top:1.5rem!important}.pr-lg-4,.px-lg-4{padding-right:1.5rem!important}.pb-lg-4,.py-lg-4{padding-bottom:1.5rem!important}.pl-lg-4,.px-lg-4{padding-left:1.5rem!important}.p-lg-5{padding:3rem!important}.pt-lg-5,.py-lg-5{padding-top:3rem!important}.pr-lg-5,.px-lg-5{padding-right:3rem!important}.pb-lg-5,.py-lg-5{padding-bottom:3rem!important}.pl-lg-5,.px-lg-5{padding-left:3rem!important}.m-lg-n1{margin:-.25rem!important}.mt-lg-n1,.my-lg-n1{margin-top:-.25rem!important}.mr-lg-n1,.mx-lg-n1{margin-right:-.25rem!important}.mb-lg-n1,.my-lg-n1{margin-bottom:-.25rem!important}.ml-lg-n1,.mx-lg-n1{margin-left:-.25rem!important}.m-lg-n2{margin:-.5rem!important}.mt-lg-n2,.my-lg-n2{margin-top:-.5rem!important}.mr-lg-n2,.mx-lg-n2{margin-right:-.5rem!important}.mb-lg-n2,.my-lg-n2{margin-bottom:-.5rem!important}.ml-lg-n2,.mx-lg-n2{margin-left:-.5rem!important}.m-lg-n3{margin:-1rem!important}.mt-lg-n3,.my-lg-n3{margin-top:-1rem!important}.mr-lg-n3,.mx-lg-n3{margin-right:-1rem!important}.mb-lg-n3,.my-lg-n3{margin-bottom:-1rem!important}.ml-lg-n3,.mx-lg-n3{margin-left:-1rem!important}.m-lg-n4{margin:-1.5rem!important}.mt-lg-n4,.my-lg-n4{margin-top:-1.5rem!important}.mr-lg-n4,.mx-lg-n4{margin-right:-1.5rem!important}.mb-lg-n4,.my-lg-n4{margin-bottom:-1.5rem!important}.ml-lg-n4,.mx-lg-n4{margin-left:-1.5rem!important}.m-lg-n5{margin:-3rem!important}.mt-lg-n5,.my-lg-n5{margin-top:-3rem!important}.mr-lg-n5,.mx-lg-n5{margin-right:-3rem!important}.mb-lg-n5,.my-lg-n5{margin-bottom:-3rem!important}.ml-lg-n5,.mx-lg-n5{margin-left:-3rem!important}.m-lg-auto{margin:auto!important}.mt-lg-auto,.my-lg-auto{margin-top:auto!important}.mr-lg-auto,.mx-lg-auto{margin-right:auto!important}.mb-lg-auto,.my-lg-auto{margin-bottom:auto!important}.ml-lg-auto,.mx-lg-auto{margin-left:auto!important}}@media (min-width:1200px){.m-xl-0{margin:0!important}.mt-xl-0,.my-xl-0{margin-top:0!important}.mr-xl-0,.mx-xl-0{margin-right:0!important}.mb-xl-0,.my-xl-0{margin-bottom:0!important}.ml-xl-0,.mx-xl-0{margin-left:0!important}.m-xl-1{margin:.25rem!important}.mt-xl-1,.my-xl-1{margin-top:.25rem!important}.mr-xl-1,.mx-xl-1{margin-right:.25rem!important}.mb-xl-1,.my-xl-1{margin-bottom:.25rem!important}.ml-xl-1,.mx-xl-1{margin-left:.25rem!important}.m-xl-2{margin:.5rem!important}.mt-xl-2,.my-xl-2{margin-top:.5rem!important}.mr-xl-2,.mx-xl-2{margin-right:.5rem!important}.mb-xl-2,.my-xl-2{margin-bottom:.5rem!important}.ml-xl-2,.mx-xl-2{margin-left:.5rem!important}.m-xl-3{margin:1rem!important}.mt-xl-3,.my-xl-3{margin-top:1rem!important}.mr-xl-3,.mx-xl-3{margin-right:1rem!important}.mb-xl-3,.my-xl-3{margin-bottom:1rem!important}.ml-xl-3,.mx-xl-3{margin-left:1rem!important}.m-xl-4{margin:1.5rem!important}.mt-xl-4,.my-xl-4{margin-top:1.5rem!important}.mr-xl-4,.mx-xl-4{margin-right:1.5rem!important}.mb-xl-4,.my-xl-4{margin-bottom:1.5rem!important}.ml-xl-4,.mx-xl-4{margin-left:1.5rem!important}.m-xl-5{margin:3rem!important}.mt-xl-5,.my-xl-5{margin-top:3rem!important}.mr-xl-5,.mx-xl-5{margin-right:3rem!important}.mb-xl-5,.my-xl-5{margin-bottom:3rem!important}.ml-xl-5,.mx-xl-5{margin-left:3rem!important}.p-xl-0{padding:0!important}.pt-xl-0,.py-xl-0{padding-top:0!important}.pr-xl-0,.px-xl-0{padding-right:0!important}.pb-xl-0,.py-xl-0{padding-bottom:0!important}.pl-xl-0,.px-xl-0{padding-left:0!important}.p-xl-1{padding:.25rem!important}.pt-xl-1,.py-xl-1{padding-top:.25rem!important}.pr-xl-1,.px-xl-1{padding-right:.25rem!important}.pb-xl-1,.py-xl-1{padding-bottom:.25rem!important}.pl-xl-1,.px-xl-1{padding-left:.25rem!important}.p-xl-2{padding:.5rem!important}.pt-xl-2,.py-xl-2{padding-top:.5rem!important}.pr-xl-2,.px-xl-2{padding-right:.5rem!important}.pb-xl-2,.py-xl-2{padding-bottom:.5rem!important}.pl-xl-2,.px-xl-2{padding-left:.5rem!important}.p-xl-3{padding:1rem!important}.pt-xl-3,.py-xl-3{padding-top:1rem!important}.pr-xl-3,.px-xl-3{padding-right:1rem!important}.pb-xl-3,.py-xl-3{padding-bottom:1rem!important}.pl-xl-3,.px-xl-3{padding-left:1rem!important}.p-xl-4{padding:1.5rem!important}.pt-xl-4,.py-xl-4{padding-top:1.5rem!important}.pr-xl-4,.px-xl-4{padding-right:1.5rem!important}.pb-xl-4,.py-xl-4{padding-bottom:1.5rem!important}.pl-xl-4,.px-xl-4{padding-left:1.5rem!important}.p-xl-5{padding:3rem!important}.pt-xl-5,.py-xl-5{padding-top:3rem!important}.pr-xl-5,.px-xl-5{padding-right:3rem!important}.pb-xl-5,.py-xl-5{padding-bottom:3rem!important}.pl-xl-5,.px-xl-5{padding-left:3rem!important}.m-xl-n1{margin:-.25rem!important}.mt-xl-n1,.my-xl-n1{margin-top:-.25rem!important}.mr-xl-n1,.mx-xl-n1{margin-right:-.25rem!important}.mb-xl-n1,.my-xl-n1{margin-bottom:-.25rem!important}.ml-xl-n1,.mx-xl-n1{margin-left:-.25rem!important}.m-xl-n2{margin:-.5rem!important}.mt-xl-n2,.my-xl-n2{margin-top:-.5rem!important}.mr-xl-n2,.mx-xl-n2{margin-right:-.5rem!important}.mb-xl-n2,.my-xl-n2{margin-bottom:-.5rem!important}.ml-xl-n2,.mx-xl-n2{margin-left:-.5rem!important}.m-xl-n3{margin:-1rem!important}.mt-xl-n3,.my-xl-n3{margin-top:-1rem!important}.mr-xl-n3,.mx-xl-n3{margin-right:-1rem!important}.mb-xl-n3,.my-xl-n3{margin-bottom:-1rem!important}.ml-xl-n3,.mx-xl-n3{margin-left:-1rem!important}.m-xl-n4{margin:-1.5rem!important}.mt-xl-n4,.my-xl-n4{margin-top:-1.5rem!important}.mr-xl-n4,.mx-xl-n4{margin-right:-1.5rem!important}.mb-xl-n4,.my-xl-n4{margin-bottom:-1.5rem!important}.ml-xl-n4,.mx-xl-n4{margin-left:-1.5rem!important}.m-xl-n5{margin:-3rem!important}.mt-xl-n5,.my-xl-n5{margin-top:-3rem!important}.mr-xl-n5,.mx-xl-n5{margin-right:-3rem!important}.mb-xl-n5,.my-xl-n5{margin-bottom:-3rem!important}.ml-xl-n5,.mx-xl-n5{margin-left:-3rem!important}.m-xl-auto{margin:auto!important}.mt-xl-auto,.my-xl-auto{margin-top:auto!important}.mr-xl-auto,.mx-xl-auto{margin-right:auto!important}.mb-xl-auto,.my-xl-auto{margin-bottom:auto!important}.ml-xl-auto,.mx-xl-auto{margin-left:auto!important}}", ""]);

// exports


      /***/ }),

    /***/ "./node_modules/css-loader/index.js!./node_modules/react-datepicker/dist/react-datepicker.css":
    /*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/react-datepicker/dist/react-datepicker.css ***!
  \*******************************************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
      exports.push([module.i, ".react-datepicker-popper[data-placement^=\"bottom\"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^=\"top\"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view--down-arrow {\n  margin-left: -8px;\n  position: absolute;\n}\n\n.react-datepicker-popper[data-placement^=\"bottom\"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^=\"top\"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view--down-arrow, .react-datepicker-popper[data-placement^=\"bottom\"] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=\"top\"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before,\n.react-datepicker__month-read-view--down-arrow::before,\n.react-datepicker__month-year-read-view--down-arrow::before {\n  box-sizing: content-box;\n  position: absolute;\n  border: 8px solid transparent;\n  height: 0;\n  width: 1px;\n}\n\n.react-datepicker-popper[data-placement^=\"bottom\"] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=\"top\"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before,\n.react-datepicker__month-read-view--down-arrow::before,\n.react-datepicker__month-year-read-view--down-arrow::before {\n  content: \"\";\n  z-index: -1;\n  border-width: 8px;\n  left: -8px;\n  border-bottom-color: #aeaeae;\n}\n\n.react-datepicker-popper[data-placement^=\"bottom\"] .react-datepicker__triangle {\n  top: 0;\n  margin-top: -8px;\n}\n\n.react-datepicker-popper[data-placement^=\"bottom\"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^=\"bottom\"] .react-datepicker__triangle::before {\n  border-top: none;\n  border-bottom-color: #f0f0f0;\n}\n\n.react-datepicker-popper[data-placement^=\"bottom\"] .react-datepicker__triangle::before {\n  top: -1px;\n  border-bottom-color: #aeaeae;\n}\n\n.react-datepicker-popper[data-placement^=\"top\"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view--down-arrow {\n  bottom: 0;\n  margin-bottom: -8px;\n}\n\n.react-datepicker-popper[data-placement^=\"top\"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view--down-arrow, .react-datepicker-popper[data-placement^=\"top\"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before,\n.react-datepicker__month-read-view--down-arrow::before,\n.react-datepicker__month-year-read-view--down-arrow::before {\n  border-bottom: none;\n  border-top-color: #fff;\n}\n\n.react-datepicker-popper[data-placement^=\"top\"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before,\n.react-datepicker__month-read-view--down-arrow::before,\n.react-datepicker__month-year-read-view--down-arrow::before {\n  bottom: -1px;\n  border-top-color: #aeaeae;\n}\n\n.react-datepicker-wrapper {\n  display: inline-block;\n  padding: 0;\n  border: 0;\n}\n\n.react-datepicker {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 0.8rem;\n  background-color: #fff;\n  color: #000;\n  border: 1px solid #aeaeae;\n  border-radius: 0.3rem;\n  display: inline-block;\n  position: relative;\n}\n\n.react-datepicker--time-only .react-datepicker__triangle {\n  left: 35px;\n}\n\n.react-datepicker--time-only .react-datepicker__time-container {\n  border-left: 0;\n}\n\n.react-datepicker--time-only .react-datepicker__time {\n  border-radius: 0.3rem;\n}\n\n.react-datepicker--time-only .react-datepicker__time-box {\n  border-radius: 0.3rem;\n}\n\n.react-datepicker__triangle {\n  position: absolute;\n  left: 50px;\n}\n\n.react-datepicker-popper {\n  z-index: 1;\n}\n\n.react-datepicker-popper[data-placement^=\"bottom\"] {\n  margin-top: 10px;\n}\n\n.react-datepicker-popper[data-placement=\"bottom-end\"] .react-datepicker__triangle, .react-datepicker-popper[data-placement=\"top-end\"] .react-datepicker__triangle {\n  left: auto;\n  right: 50px;\n}\n\n.react-datepicker-popper[data-placement^=\"top\"] {\n  margin-bottom: 10px;\n}\n\n.react-datepicker-popper[data-placement^=\"right\"] {\n  margin-left: 8px;\n}\n\n.react-datepicker-popper[data-placement^=\"right\"] .react-datepicker__triangle {\n  left: auto;\n  right: 42px;\n}\n\n.react-datepicker-popper[data-placement^=\"left\"] {\n  margin-right: 8px;\n}\n\n.react-datepicker-popper[data-placement^=\"left\"] .react-datepicker__triangle {\n  left: 42px;\n  right: auto;\n}\n\n.react-datepicker__header {\n  text-align: center;\n  background-color: #f0f0f0;\n  border-bottom: 1px solid #aeaeae;\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem;\n  padding-top: 8px;\n  position: relative;\n}\n\n.react-datepicker__header--time {\n  padding-bottom: 8px;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.react-datepicker__year-dropdown-container--select,\n.react-datepicker__month-dropdown-container--select,\n.react-datepicker__month-year-dropdown-container--select,\n.react-datepicker__year-dropdown-container--scroll,\n.react-datepicker__month-dropdown-container--scroll,\n.react-datepicker__month-year-dropdown-container--scroll {\n  display: inline-block;\n  margin: 0 2px;\n}\n\n.react-datepicker__current-month,\n.react-datepicker-time__header,\n.react-datepicker-year-header {\n  margin-top: 0;\n  color: #000;\n  font-weight: bold;\n  font-size: 0.944rem;\n}\n\n.react-datepicker-time__header {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.react-datepicker__navigation {\n  background: none;\n  line-height: 1.7rem;\n  text-align: center;\n  cursor: pointer;\n  position: absolute;\n  top: 10px;\n  width: 0;\n  padding: 0;\n  border: 0.45rem solid transparent;\n  z-index: 1;\n  height: 10px;\n  width: 10px;\n  text-indent: -999em;\n  overflow: hidden;\n}\n\n.react-datepicker__navigation--previous {\n  left: 10px;\n  border-right-color: #ccc;\n}\n\n.react-datepicker__navigation--previous:hover {\n  border-right-color: #b3b3b3;\n}\n\n.react-datepicker__navigation--previous--disabled, .react-datepicker__navigation--previous--disabled:hover {\n  border-right-color: #e6e6e6;\n  cursor: default;\n}\n\n.react-datepicker__navigation--next {\n  right: 10px;\n  border-left-color: #ccc;\n}\n\n.react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {\n  right: 80px;\n}\n\n.react-datepicker__navigation--next:hover {\n  border-left-color: #b3b3b3;\n}\n\n.react-datepicker__navigation--next--disabled, .react-datepicker__navigation--next--disabled:hover {\n  border-left-color: #e6e6e6;\n  cursor: default;\n}\n\n.react-datepicker__navigation--years {\n  position: relative;\n  top: 0;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.react-datepicker__navigation--years-previous {\n  top: 4px;\n  border-top-color: #ccc;\n}\n\n.react-datepicker__navigation--years-previous:hover {\n  border-top-color: #b3b3b3;\n}\n\n.react-datepicker__navigation--years-upcoming {\n  top: -4px;\n  border-bottom-color: #ccc;\n}\n\n.react-datepicker__navigation--years-upcoming:hover {\n  border-bottom-color: #b3b3b3;\n}\n\n.react-datepicker__month-container {\n  float: left;\n}\n\n.react-datepicker__year {\n  margin: 0.4rem;\n  text-align: center;\n}\n\n.react-datepicker__year-wrapper {\n  display: flex;\n  flex-wrap: wrap;\n  max-width: 180px;\n}\n\n.react-datepicker__year .react-datepicker__year-text {\n  display: inline-block;\n  width: 4rem;\n  margin: 2px;\n}\n\n.react-datepicker__month {\n  margin: 0.4rem;\n  text-align: center;\n}\n\n.react-datepicker__month .react-datepicker__month-text,\n.react-datepicker__month .react-datepicker__quarter-text {\n  display: inline-block;\n  width: 4rem;\n  margin: 2px;\n}\n\n.react-datepicker__input-time-container {\n  clear: both;\n  width: 100%;\n  float: left;\n  margin: 5px 0 10px 15px;\n  text-align: left;\n}\n\n.react-datepicker__input-time-container .react-datepicker-time__caption {\n  display: inline-block;\n}\n\n.react-datepicker__input-time-container .react-datepicker-time__input-container {\n  display: inline-block;\n}\n\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input {\n  display: inline-block;\n  margin-left: 10px;\n}\n\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input {\n  width: 85px;\n}\n\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input[type=\"time\"]::-webkit-inner-spin-button,\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input[type=\"time\"]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input[type=\"time\"] {\n  -moz-appearance: textfield;\n}\n\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__delimiter {\n  margin-left: 5px;\n  display: inline-block;\n}\n\n.react-datepicker__time-container {\n  float: right;\n  border-left: 1px solid #aeaeae;\n  width: 85px;\n}\n\n.react-datepicker__time-container--with-today-button {\n  display: inline;\n  border: 1px solid #aeaeae;\n  border-radius: 0.3rem;\n  position: absolute;\n  right: -72px;\n  top: 0;\n}\n\n.react-datepicker__time-container .react-datepicker__time {\n  position: relative;\n  background: white;\n  border-bottom-right-radius: 0.3rem;\n}\n\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {\n  width: 85px;\n  overflow-x: hidden;\n  margin: 0 auto;\n  text-align: center;\n}\n\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {\n  list-style: none;\n  margin: 0;\n  height: calc(195px + (1.7rem / 2));\n  overflow-y: scroll;\n  padding-right: 0px;\n  padding-left: 0px;\n  width: 100%;\n  box-sizing: content-box;\n}\n\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {\n  height: 30px;\n  padding: 5px 10px;\n  white-space: nowrap;\n}\n\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {\n  cursor: pointer;\n  background-color: #f0f0f0;\n}\n\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {\n  background-color: #216ba5;\n  color: white;\n  font-weight: bold;\n}\n\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected:hover {\n  background-color: #216ba5;\n}\n\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--disabled {\n  color: #ccc;\n}\n\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--disabled:hover {\n  cursor: default;\n  background-color: transparent;\n}\n\n.react-datepicker__week-number {\n  color: #ccc;\n  display: inline-block;\n  width: 1.7rem;\n  line-height: 1.7rem;\n  text-align: center;\n  margin: 0.166rem;\n}\n\n.react-datepicker__week-number.react-datepicker__week-number--clickable {\n  cursor: pointer;\n}\n\n.react-datepicker__week-number.react-datepicker__week-number--clickable:hover {\n  border-radius: 0.3rem;\n  background-color: #f0f0f0;\n}\n\n.react-datepicker__day-names,\n.react-datepicker__week {\n  white-space: nowrap;\n}\n\n.react-datepicker__day-name,\n.react-datepicker__day,\n.react-datepicker__time-name {\n  color: #000;\n  display: inline-block;\n  width: 1.7rem;\n  line-height: 1.7rem;\n  text-align: center;\n  margin: 0.166rem;\n}\n\n.react-datepicker__month--selected, .react-datepicker__month--in-selecting-range, .react-datepicker__month--in-range,\n.react-datepicker__quarter--selected,\n.react-datepicker__quarter--in-selecting-range,\n.react-datepicker__quarter--in-range {\n  border-radius: 0.3rem;\n  background-color: #216ba5;\n  color: #fff;\n}\n\n.react-datepicker__month--selected:hover, .react-datepicker__month--in-selecting-range:hover, .react-datepicker__month--in-range:hover,\n.react-datepicker__quarter--selected:hover,\n.react-datepicker__quarter--in-selecting-range:hover,\n.react-datepicker__quarter--in-range:hover {\n  background-color: #1d5d90;\n}\n\n.react-datepicker__month--disabled,\n.react-datepicker__quarter--disabled {\n  color: #ccc;\n  pointer-events: none;\n}\n\n.react-datepicker__month--disabled:hover,\n.react-datepicker__quarter--disabled:hover {\n  cursor: default;\n  background-color: transparent;\n}\n\n.react-datepicker__day,\n.react-datepicker__month-text,\n.react-datepicker__quarter-text,\n.react-datepicker__year-text {\n  cursor: pointer;\n}\n\n.react-datepicker__day:hover,\n.react-datepicker__month-text:hover,\n.react-datepicker__quarter-text:hover,\n.react-datepicker__year-text:hover {\n  border-radius: 0.3rem;\n  background-color: #f0f0f0;\n}\n\n.react-datepicker__day--today,\n.react-datepicker__month-text--today,\n.react-datepicker__quarter-text--today,\n.react-datepicker__year-text--today {\n  font-weight: bold;\n}\n\n.react-datepicker__day--highlighted,\n.react-datepicker__month-text--highlighted,\n.react-datepicker__quarter-text--highlighted,\n.react-datepicker__year-text--highlighted {\n  border-radius: 0.3rem;\n  background-color: #3dcc4a;\n  color: #fff;\n}\n\n.react-datepicker__day--highlighted:hover,\n.react-datepicker__month-text--highlighted:hover,\n.react-datepicker__quarter-text--highlighted:hover,\n.react-datepicker__year-text--highlighted:hover {\n  background-color: #32be3f;\n}\n\n.react-datepicker__day--highlighted-custom-1,\n.react-datepicker__month-text--highlighted-custom-1,\n.react-datepicker__quarter-text--highlighted-custom-1,\n.react-datepicker__year-text--highlighted-custom-1 {\n  color: magenta;\n}\n\n.react-datepicker__day--highlighted-custom-2,\n.react-datepicker__month-text--highlighted-custom-2,\n.react-datepicker__quarter-text--highlighted-custom-2,\n.react-datepicker__year-text--highlighted-custom-2 {\n  color: green;\n}\n\n.react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range,\n.react-datepicker__month-text--selected,\n.react-datepicker__month-text--in-selecting-range,\n.react-datepicker__month-text--in-range,\n.react-datepicker__quarter-text--selected,\n.react-datepicker__quarter-text--in-selecting-range,\n.react-datepicker__quarter-text--in-range,\n.react-datepicker__year-text--selected,\n.react-datepicker__year-text--in-selecting-range,\n.react-datepicker__year-text--in-range {\n  border-radius: 0.3rem;\n  background-color: #216ba5;\n  color: #fff;\n}\n\n.react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover,\n.react-datepicker__month-text--selected:hover,\n.react-datepicker__month-text--in-selecting-range:hover,\n.react-datepicker__month-text--in-range:hover,\n.react-datepicker__quarter-text--selected:hover,\n.react-datepicker__quarter-text--in-selecting-range:hover,\n.react-datepicker__quarter-text--in-range:hover,\n.react-datepicker__year-text--selected:hover,\n.react-datepicker__year-text--in-selecting-range:hover,\n.react-datepicker__year-text--in-range:hover {\n  background-color: #1d5d90;\n}\n\n.react-datepicker__day--keyboard-selected,\n.react-datepicker__month-text--keyboard-selected,\n.react-datepicker__quarter-text--keyboard-selected,\n.react-datepicker__year-text--keyboard-selected {\n  border-radius: 0.3rem;\n  background-color: #2a87d0;\n  color: #fff;\n}\n\n.react-datepicker__day--keyboard-selected:hover,\n.react-datepicker__month-text--keyboard-selected:hover,\n.react-datepicker__quarter-text--keyboard-selected:hover,\n.react-datepicker__year-text--keyboard-selected:hover {\n  background-color: #1d5d90;\n}\n\n.react-datepicker__day--in-selecting-range ,\n.react-datepicker__month-text--in-selecting-range ,\n.react-datepicker__quarter-text--in-selecting-range ,\n.react-datepicker__year-text--in-selecting-range {\n  background-color: rgba(33, 107, 165, 0.5);\n}\n\n.react-datepicker__month--selecting-range .react-datepicker__day--in-range , .react-datepicker__month--selecting-range\n.react-datepicker__month-text--in-range , .react-datepicker__month--selecting-range\n.react-datepicker__quarter-text--in-range , .react-datepicker__month--selecting-range\n.react-datepicker__year-text--in-range {\n  background-color: #f0f0f0;\n  color: #000;\n}\n\n.react-datepicker__day--disabled,\n.react-datepicker__month-text--disabled,\n.react-datepicker__quarter-text--disabled,\n.react-datepicker__year-text--disabled {\n  cursor: default;\n  color: #ccc;\n}\n\n.react-datepicker__day--disabled:hover,\n.react-datepicker__month-text--disabled:hover,\n.react-datepicker__quarter-text--disabled:hover,\n.react-datepicker__year-text--disabled:hover {\n  background-color: transparent;\n}\n\n.react-datepicker__month-text.react-datepicker__month--selected:hover, .react-datepicker__month-text.react-datepicker__month--in-range:hover, .react-datepicker__month-text.react-datepicker__quarter--selected:hover, .react-datepicker__month-text.react-datepicker__quarter--in-range:hover,\n.react-datepicker__quarter-text.react-datepicker__month--selected:hover,\n.react-datepicker__quarter-text.react-datepicker__month--in-range:hover,\n.react-datepicker__quarter-text.react-datepicker__quarter--selected:hover,\n.react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover {\n  background-color: #216ba5;\n}\n\n.react-datepicker__month-text:hover,\n.react-datepicker__quarter-text:hover {\n  background-color: #f0f0f0;\n}\n\n.react-datepicker__input-container {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n}\n\n.react-datepicker__year-read-view,\n.react-datepicker__month-read-view,\n.react-datepicker__month-year-read-view {\n  border: 1px solid transparent;\n  border-radius: 0.3rem;\n}\n\n.react-datepicker__year-read-view:hover,\n.react-datepicker__month-read-view:hover,\n.react-datepicker__month-year-read-view:hover {\n  cursor: pointer;\n}\n\n.react-datepicker__year-read-view:hover .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__year-read-view:hover .react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-read-view:hover .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view:hover .react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view:hover .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-year-read-view:hover .react-datepicker__month-read-view--down-arrow {\n  border-top-color: #b3b3b3;\n}\n\n.react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view--down-arrow {\n  border-top-color: #ccc;\n  float: right;\n  margin-left: 20px;\n  top: 8px;\n  position: relative;\n  border-width: 0.45rem;\n}\n\n.react-datepicker__year-dropdown,\n.react-datepicker__month-dropdown,\n.react-datepicker__month-year-dropdown {\n  background-color: #f0f0f0;\n  position: absolute;\n  width: 50%;\n  left: 25%;\n  top: 30px;\n  z-index: 1;\n  text-align: center;\n  border-radius: 0.3rem;\n  border: 1px solid #aeaeae;\n}\n\n.react-datepicker__year-dropdown:hover,\n.react-datepicker__month-dropdown:hover,\n.react-datepicker__month-year-dropdown:hover {\n  cursor: pointer;\n}\n\n.react-datepicker__year-dropdown--scrollable,\n.react-datepicker__month-dropdown--scrollable,\n.react-datepicker__month-year-dropdown--scrollable {\n  height: 150px;\n  overflow-y: scroll;\n}\n\n.react-datepicker__year-option,\n.react-datepicker__month-option,\n.react-datepicker__month-year-option {\n  line-height: 20px;\n  width: 100%;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.react-datepicker__year-option:first-of-type,\n.react-datepicker__month-option:first-of-type,\n.react-datepicker__month-year-option:first-of-type {\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem;\n}\n\n.react-datepicker__year-option:last-of-type,\n.react-datepicker__month-option:last-of-type,\n.react-datepicker__month-year-option:last-of-type {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border-bottom-left-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem;\n}\n\n.react-datepicker__year-option:hover,\n.react-datepicker__month-option:hover,\n.react-datepicker__month-year-option:hover {\n  background-color: #ccc;\n}\n\n.react-datepicker__year-option:hover .react-datepicker__navigation--years-upcoming,\n.react-datepicker__month-option:hover .react-datepicker__navigation--years-upcoming,\n.react-datepicker__month-year-option:hover .react-datepicker__navigation--years-upcoming {\n  border-bottom-color: #b3b3b3;\n}\n\n.react-datepicker__year-option:hover .react-datepicker__navigation--years-previous,\n.react-datepicker__month-option:hover .react-datepicker__navigation--years-previous,\n.react-datepicker__month-year-option:hover .react-datepicker__navigation--years-previous {\n  border-top-color: #b3b3b3;\n}\n\n.react-datepicker__year-option--selected,\n.react-datepicker__month-option--selected,\n.react-datepicker__month-year-option--selected {\n  position: absolute;\n  left: 15px;\n}\n\n.react-datepicker__close-icon {\n  cursor: pointer;\n  background-color: transparent;\n  border: 0;\n  outline: 0;\n  padding: 0px 6px 0px 0px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 100%;\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.react-datepicker__close-icon::after {\n  cursor: pointer;\n  background-color: #216ba5;\n  color: #fff;\n  border-radius: 50%;\n  height: 16px;\n  width: 16px;\n  padding: 2px;\n  font-size: 12px;\n  line-height: 1;\n  text-align: center;\n  display: table-cell;\n  vertical-align: middle;\n  content: \"\\D7\";\n}\n\n.react-datepicker__today-button {\n  background: #f0f0f0;\n  border-top: 1px solid #aeaeae;\n  cursor: pointer;\n  text-align: center;\n  font-weight: bold;\n  padding: 5px 0;\n  clear: left;\n}\n\n.react-datepicker__portal {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8);\n  left: 0;\n  top: 0;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  z-index: 2147483647;\n}\n\n.react-datepicker__portal .react-datepicker__day-name,\n.react-datepicker__portal .react-datepicker__day,\n.react-datepicker__portal .react-datepicker__time-name {\n  width: 3rem;\n  line-height: 3rem;\n}\n\n@media (max-width: 400px), (max-height: 550px) {\n  .react-datepicker__portal .react-datepicker__day-name,\n  .react-datepicker__portal .react-datepicker__day,\n  .react-datepicker__portal .react-datepicker__time-name {\n    width: 2rem;\n    line-height: 2rem;\n  }\n}\n\n.react-datepicker__portal .react-datepicker__current-month,\n.react-datepicker__portal .react-datepicker-time__header {\n  font-size: 1.44rem;\n}\n\n.react-datepicker__portal .react-datepicker__navigation {\n  border: 0.81rem solid transparent;\n}\n\n.react-datepicker__portal .react-datepicker__navigation--previous {\n  border-right-color: #ccc;\n}\n\n.react-datepicker__portal .react-datepicker__navigation--previous:hover {\n  border-right-color: #b3b3b3;\n}\n\n.react-datepicker__portal .react-datepicker__navigation--previous--disabled, .react-datepicker__portal .react-datepicker__navigation--previous--disabled:hover {\n  border-right-color: #e6e6e6;\n  cursor: default;\n}\n\n.react-datepicker__portal .react-datepicker__navigation--next {\n  border-left-color: #ccc;\n}\n\n.react-datepicker__portal .react-datepicker__navigation--next:hover {\n  border-left-color: #b3b3b3;\n}\n\n.react-datepicker__portal .react-datepicker__navigation--next--disabled, .react-datepicker__portal .react-datepicker__navigation--next--disabled:hover {\n  border-left-color: #e6e6e6;\n  cursor: default;\n}\n", ""]);

// exports


      /***/ }),

    /***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./resources/modules/front-app/src/sass/front-style.scss":
    /*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/dist/cjs.js!./resources/modules/front-app/src/sass/front-style.scss ***!
  \********************************************************************************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
      exports.i(__webpack_require__(/*! -!../../../../../node_modules/css-loader!bootstrap/dist/css/bootstrap-grid.min.css */ "./node_modules/css-loader/index.js!./node_modules/bootstrap/dist/css/bootstrap-grid.min.css"), "");
      exports.i(__webpack_require__(/*! -!../../../../../node_modules/css-loader!react-datepicker/dist/react-datepicker.css */ "./node_modules/css-loader/index.js!./node_modules/react-datepicker/dist/react-datepicker.css"), "");

// module
      exports.push([module.i, "@charset \"UTF-8\";\nhtml {\n  height: 100%; }\n\nbody,\n*,\n*:focus,\n*::before,\n*::after {\n  box-sizing: border-box;\n  outline: none; }\n\nbody {\n  font-family: Roboto, sans-serif;\n  margin: 0;\n  overflow-x: hidden;\n  color: #242424;\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n\na,\nbutton,\nsvg,\npath {\n  -webkit-transition-duration: 0.2s;\n  -moz-transition-duration: 0.2s;\n  -ms-transition-duration: 0.2s;\n  -o-transition-duration: 0.2s;\n  transition-duration: 0.2s;\n  font-family: Roboto, sans-serif; }\n\n.btn:active,\n.btn:focus,\na:active,\na:focus,\nbutton:active,\nbutton:focus {\n  outline: none;\n  box-shadow: none; }\n\nbutton {\n  cursor: pointer; }\n\n.btn_grey {\n  background-color: #8E94AA; }\n\n.btn_disabled {\n  background-color: #8E94AA;\n  cursor: default;\n  font-weight: bold;\n  color: #fff;\n  pointer-events: none; }\n\n.btn,\nbutton {\n  padding: 10px 15px;\n  border: none;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\niframe {\n  display: block;\n  border: none; }\n\ninput[type=\"checkbox\"] {\n  cursor: pointer; }\n\n.no-transition {\n  -webkit-transition-duration: 0s !important;\n  -moz-transition-duration: 0s !important;\n  -ms-transition-duration: 0s !important;\n  -o-transition-duration: 0s !important;\n  transition-duration: 0s !important; }\n\n.caption {\n  margin-bottom: 15px;\n  font-weight: 600;\n  font-size: 18px; }\n\n.btn_bare {\n  border: none;\n  background-color: transparent; }\n\n.btn_success {\n  background-color: #87CA00;\n  color: #fff;\n  font-weight: bold; }\n\n.btn_failure {\n  background-color: #FF4E6E;\n  color: #fff;\n  font-weight: bold; }\n\n.text_bold {\n  font-weight: bold; }\n\n.altrp-scroll__vertical-track {\n  bottom: 2px;\n  top: 2px;\n  right: 2px;\n  z-index: 1000;\n  border-radius: 3px; }\n\n.clickable {\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.cursor-pointer {\n  cursor: pointer; }\n\n.rotate-180 {\n  transform: rotatex(180deg); }\n\n.altrp-label {\n  display: block; }\n\n#editor-content .fixed-section,\n.fixed-section,\n.fixed-section .altrp-section {\n  position: fixed;\n  z-index: 55;\n  width: auto; }\n\n.position-relative {\n  position: relative; }\n\n.ck.ck-balloon-panel {\n  z-index: 99999999999 !important; }\n\n#ckf-modal {\n  z-index: 999999999999 !important; }\n\n.export-panel {\n  position: relative;\n  z-index: 99999999999; }\n  @media print {\n    .export-panel {\n      display: none; } }\n\n.hidden {\n  display: none; }\n\n.sections-wrapper {\n  display: flex;\n  width: 1440px;\n  flex-wrap: wrap;\n  max-width: 100%;\n  margin-left: auto;\n  margin-right: auto; }\n\n[disabled] {\n  cursor: not-allowed; }\n\n.altrp-element {\n  width: 100%;\n  max-width: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  .altrp-element_section {\n    margin-left: auto;\n    margin-right: auto; }\n\n.altrp-element > * {\n  flex-grow: 1;\n  width: 100%; }\n\n.altrp-image {\n  max-width: 100%; }\n\n.heading {\n  text-align: center;\n  margin: 0; }\n\n.text {\n  font-size: 18px;\n  text-align: inherit; }\n\n.altrp-btn {\n  width: auto;\n  text-decoration: none;\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n  .altrp-btn_gray {\n    background-color: #8E94AA;\n    color: #fff; }\n  .altrp-btn__icon {\n    transform: scale(0.6); }\n  .altrp-btn-icon {\n    display: flex;\n    justify-content: center; }\n\n.altrp-section.altrp-section--boxed > .altrp-element {\n  margin: 0 auto; }\n\n.altrp-section.altrp-section--full-width, .altrp-section.altrp-section--boxed {\n  width: 100vw; }\n\n.altrp-column {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 10px;\n  align-content: flex-start; }\n\n.altrp-tooltip {\n  background-color: #6866de;\n  color: white;\n  border-color: transparent transparent #6866de;\n  font-family: Poppins, sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  box-shadow: rgba(119, 119, 147, 0.2) 0px 20px 100px 0px;\n  text-align: center;\n  display: none;\n  width: auto;\n  color: #fff;\n  -webkit-border-radius: 2px;\n  border-radius: 2px;\n  padding: 2px;\n  position: absolute;\n  z-index: 1;\n  font-size: 0.83rem;\n  line-height: 1.3;\n  box-sizing: border-box;\n  line-height: 1;\n  margin-top: -20px;\n  opacity: 0;\n  text-transform: none;\n  transition: 0.5s;\n  animation: altrpTooltipAnimation 0.2s forwards; }\n\n.altrp-element > *:hover + .altrp-tooltip,\n.altrp-element > .altrp-tooltip:hover {\n  display: block; }\n\n@keyframes altrpTooltipAnimation {\n  0% {\n    margin-top: -20px;\n    opacity: 0; }\n  100% {\n    margin-top: 0;\n    opacity: 1; } }\n\n.altrp-tooltip::after {\n  content: \" \";\n  position: absolute;\n  border-width: 5px;\n  border-color: inherit;\n  border-style: solid; }\n\n.altrp-tooltip--top {\n  bottom: calc(100% + 5px); }\n\n.altrp-tooltip--bottom {\n  top: calc(100% + 5px); }\n\n.altrp-tooltip--right {\n  left: calc(100% + 5px);\n  top: 50%;\n  transform: translateY(-50%); }\n\n.altrp-tooltip--left {\n  right: calc(100% + 5px);\n  top: 50%;\n  transform: translateY(-50%); }\n\n.altrp-tooltip--top::after {\n  top: 100%;\n  /* At the bottom of the tooltip */\n  left: 50%;\n  margin-left: -5px;\n  transform: rotate(180deg); }\n\n.altrp-tooltip--bottom::after {\n  bottom: 100%;\n  /* At the top of the tooltip */\n  left: 50%;\n  margin-left: -5px; }\n\n.altrp-tooltip--right::after {\n  top: 50%;\n  right: 100%;\n  /* To the left of the tooltip */\n  margin-top: -5px;\n  transform: rotate(270deg); }\n\n.altrp-tooltip--left::after {\n  top: 50%;\n  left: 100%;\n  /* To the right of the tooltip */\n  margin-top: -5px;\n  transform: rotate(90deg); }\n\n.altrp-image-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  width: 100%; }\n\n.altrp-image-container img {\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n\n.altrp-image-container a {\n  width: 100%; }\n\n.altrp-field {\n  width: 100%; }\n  .altrp-field-subgroup {\n    display: flex;\n    flex-wrap: wrap; }\n  .altrp-field-option {\n    display: flex;\n    padding: 10px; }\n    .altrp-field-option__label {\n      cursor: pointer; }\n\ntextarea.altrp-field {\n  display: block; }\n\n.altrp-table-tbody,\n.altrp-table-th {\n  border-collapse: separate;\n  user-select: none; }\n\n.altrp-table-td__grouping {\n  font-size: 18px;\n  font-weight: bold; }\n\n.altrp-table-th_sort {\n  padding: 0;\n  margin-left: 10px; }\n\n.altrp-table-th .sort-icon {\n  margin-left: 10px; }\n\n.altrp-table {\n  overflow: hidden;\n  display: table; }\n  .altrp-table-head {\n    display: table-header-group; }\n  .altrp-table-tbody {\n    display: table-row-group; }\n  .altrp-table-foot {\n    display: table-footer-group; }\n  .altrp-table-tr {\n    display: table-row; }\n    .altrp-table-tr_loading {\n      display: block; }\n  .altrp-table-th {\n    display: table-cell; }\n    .altrp-table-th_global-filter {\n      colspan: all; }\n  .altrp-table-td {\n    display: table-cell; }\n    .altrp-table-td .altrp-inherit {\n      border: none;\n      width: 100%; }\n    .altrp-table-td_loading {\n      display: block;\n      width: 100%; }\n  .altrp-table__resizer {\n    display: inline-block;\n    background: blue;\n    width: 10px;\n    height: 100%;\n    position: absolute;\n    right: 0;\n    top: 0;\n    transform: translateX(50%);\n    z-index: 1;\n    touch-action: none; }\n    .altrp-table__resizer_resizing {\n      background: red; }\n  .altrp-table__filter-select {\n    width: 100%; }\n    .altrp-table__filter-select .altrp-field-select2__placeholder {\n      white-space: nowrap; }\n    .altrp-table__filter-select .altrp-field-select2__single-value {\n      font-size: 14px; }\n    .altrp-table__filter-select .altrp-field-select2__indicator-separator {\n      display: none; }\n    .altrp-table__filter-select .altrp-field-select2__indicator {\n      align-items: center; }\n    .altrp-table__filter-select .altrp-field-select2__control {\n      width: 100%;\n      min-height: 19px;\n      padding: 0;\n      border-radius: 0;\n      outline: none;\n      border-color: #8e94aa;\n      -webkit-box-shadow: none;\n      -moz-box-shadow: none;\n      box-shadow: none; }\n      .altrp-table__filter-select .altrp-field-select2__control input {\n        border: none; }\n    .altrp-table__filter-select .altrp-field-select2__value-container {\n      padding-top: 0;\n      padding-bottom: 0;\n      line-height: 13px; }\n  .altrp-table-td__grouping {\n    -webkit-transition-duration: 0.2s;\n    -moz-transition-duration: 0.2s;\n    -ms-transition-duration: 0.2s;\n    -o-transition-duration: 0.2s;\n    transition-duration: 0.2s; }\n  .altrp-table-td_alignment-center .altrp-actions {\n    justify-content: center; }\n  .altrp-table-td_alignment-right .altrp-actions {\n    justify-content: flex-end; }\n  .altrp-table__collapse-icon {\n    display: inline-block; }\n    .altrp-table__collapse-icon svg {\n      position: relative; }\n\n.altrp-field-container-label {\n  display: flex;\n  flex-direction: row; }\n\n.altrp-field-label-container-left {\n  display: flex;\n  align-items: center; }\n\n.altrp-field-label-container {\n  display: inline-flex;\n  align-items: center; }\n\n.altrp-image-container {\n  display: flex; }\n\n.app-area_footer {\n  flex: 0 0 auto; }\n\n.app-area_content {\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column; }\n\n.app-area_content > .sections-wrapper {\n  flex: 1 0 auto;\n  align-content: flex-start; }\n\n.app-area_header {\n  flex: 0 0 auto; }\n\n.route-content {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden; }\n\n.altrp-section-full-fill {\n  display: flex;\n  width: 100vh; }\n\n.altrp-section-full-fill .altrp-section {\n  width: 1400px !important;\n  margin-left: auto !important;\n  margin-right: auto !important; }\n\n.altrp-table {\n  width: 100%;\n  border-collapse: collapse; }\n  .altrp-table-td__double-click-content {\n    display: none; }\n  .altrp-table-td_double-clicked .altrp-table-td__double-click-content {\n    display: block;\n    width: 100%;\n    border-width: 2px; }\n  .altrp-table-td_double-clicked .altrp-table-td__default-content {\n    display: none; }\n\n.altrp-divider {\n  padding-top: 15px;\n  padding-bottom: 15px;\n  line-height: 0;\n  font-size: 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center; }\n\n.altrp-divider-separator {\n  display: block;\n  height: 1px;\n  width: 100%; }\n\n.altrp-divider-label {\n  line-height: normal;\n  font-size: medium; }\n\n.altrp-tab {\n  display: none; }\n\n.altrp-tab-show {\n  display: block; }\n\n.altrp-tab-btn-container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap; }\n\n.altrp-tab-btn {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  margin: 0; }\n\n.altrp-tab-btn p {\n  margin: 0;\n  white-space: nowrap; }\n\n.altrp-tab-btn-icon {\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.altrp-tabs-left {\n  display: flex;\n  flex-direction: row; }\n\n.altrp-tabs-left .altrp-tab-btn-container {\n  display: flex;\n  flex-direction: column; }\n\n.altrp-tabs-right {\n  display: flex;\n  flex-direction: row; }\n\n.altrp-tabs-right .altrp-tab-btn-container {\n  margin-left: auto;\n  display: flex;\n  flex-direction: column; }\n\n.altrp-tab-btn-column:last-child {\n  margin-right: 0px !important; }\n\n.altrp-tab-btn-row:last-child {\n  margin-bottom: 0px !important; }\n\n.altrp-tabs-switcher {\n  margin-left: 10px;\n  margin-right: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-right: 35px;\n  padding-left: 35px;\n  width: 4.5em;\n  height: 2.3em;\n  border-radius: 100vh;\n  position: relative;\n  -webkit-transition-duration: 0.2s;\n  -moz-transition-duration: 0.2s;\n  -ms-transition-duration: 0.2s;\n  -o-transition-duration: 0.2s;\n  transition-duration: 0.2s;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-weight: bold; }\n  .altrp-tabs-switcher_off {\n    background: #e6e9ec;\n    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.15), inset -1px -1px 2px rgba(0, 0, 0, 0.15);\n    color: rgba(0, 0, 0, 0.3); }\n    .altrp-tabs-switcher_off .altrp-tabs-switcher__caret {\n      transform: translateX(-1.3em); }\n  .altrp-tabs-switcher_on {\n    background: #87ca00;\n    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.15), inset -1px -1px 2px rgba(0, 0, 0, 0.15);\n    color: #ffffff; }\n    .altrp-tabs-switcher_on .altrp-tabs-switcher__caret {\n      transform: translateX(1.2em); }\n  .altrp-tabs-switcher__caret {\n    position: absolute;\n    width: 1.8em;\n    height: 1.8em;\n    top: 0.25em;\n    left: 1.4em;\n    border-radius: 50%;\n    background: #ffffff;\n    box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.25);\n    -webkit-transition-duration: 0.2s;\n    -moz-transition-duration: 0.2s;\n    -ms-transition-duration: 0.2s;\n    -o-transition-duration: 0.2s;\n    transition-duration: 0.2s; }\n\n.altrp-tabs-switcher-container {\n  display: flex;\n  flex-direction: row;\n  white-space: nowrap;\n  justify-content: center;\n  align-items: center;\n  font-size: 16px; }\n\n.altrp-tabs-switcher {\n  display: block; }\n\n.altrp-tabs-switcher-section-img {\n  max-width: 100%; }\n\n.altrp-list-ul {\n  padding: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  display: flex; }\n\n.altrp-list-li {\n  list-style: none;\n  display: flex;\n  position: relative;\n  justify-items: center; }\n\n.altrp-list-ul-inline {\n  flex-direction: row;\n  flex-wrap: wrap; }\n\n.altrp-list-ul-inline .altrp-list-label-content {\n  margin-right: 10px; }\n\n.altrp-list-ul-inline .altrp-list-li:first-child .altrp-list-li-content {\n  margin-left: 0 !important; }\n\n.altrp-list-ul-default .altrp-list-li:first-child .altrp-list-li-content {\n  margin-top: 0 !important; }\n\n.altrp-list-ul-inline .altrp-list-li:last-child .altrp-list-li-content {\n  margin-right: 0 !important; }\n\n.altrp-list-ul-default .altrp-list-li:last-child .altrp-list-li-content {\n  margin-bottom: 0 !important; }\n\n.altrp-list-ul-default {\n  flex-direction: column; }\n\n.altrp-list-icon svg {\n  width: inherit;\n  height: inherit; }\n\n.altrp-list-icon-top {\n  margin-bottom: auto; }\n\n.altrp-list-icon-center {\n  margin-bottom: auto;\n  margin-top: auto; }\n\n.altrp-list-icon-bottom {\n  margin-top: auto; }\n\n.altrp-list-icon-relative {\n  position: relative; }\n\n.altrp-list-li-divider-default {\n  position: absolute;\n  bottom: 0; }\n\n.altrp-list-li:last-child .altrp-list-li-divider-default {\n  border-top: none; }\n\n.altrp-list-li:last-child .altrp-list-li-divider-inline {\n  border-right: none; }\n\n.altrp-list-li-content {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-items: center; }\n\n.altrp-list-icon {\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.altrp-accordion-item-button {\n  background-color: #343b4c;\n  color: #ffffff;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  cursor: pointer;\n  width: 100%;\n  padding: 15px 20px;\n  z-index: 100; }\n\n.altrp-accordion-item-content {\n  background-color: #4f5a72;\n  color: #ffffff;\n  width: 100%;\n  height: 100%;\n  line-height: 0;\n  padding-left: 20px !important;\n  padding-right: 20px !important;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  flex-wrap: wrap;\n  transition: 250ms ease-in-out;\n  z-index: 0;\n  top: -1em;\n  height: 0px; }\n\n.altrp-accordion-item-content-show {\n  padding: 15px 20px;\n  line-height: 1;\n  top: 0;\n  z-index: 0;\n  height: auto; }\n\n.altrp-accordion-item-content * {\n  margin: 0; }\n\n.altrp-accordion-item-label-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  margin-right: auto; }\n\n.altrp-accordion-item:first-child {\n  margin-top: 0px !important; }\n\n.altrp-accordion-item-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.app-popup {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  min-height: 100%;\n  z-index: 999999;\n  overflow: auto; }\n  .app-popup .popup-close-button {\n    position: absolute;\n    top: 0;\n    right: 0;\n    line-height: 1;\n    padding: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: transparent;\n    z-index: 1000;\n    color: white;\n    font-size: 30px; }\n  .app-popup .popup-window {\n    position: absolute;\n    width: 50vw;\n    height: 50vh;\n    background-color: white;\n    overflow: hidden;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    padding: 10px;\n    border: 1px solid;\n    border-radius: 5px; }\n\n.popup-content {\n  max-width: 100%;\n  overflow-x: hidden; }\n\n.popup-scrollbar-vertical {\n  position: relative;\n  display: block;\n  width: 100%;\n  cursor: pointer;\n  height: 50px;\n  border-radius: 2px;\n  z-index: 999;\n  background-color: rgba(0, 0, 0, 0.2);\n  transition-duration: 0.2s;\n  box-sizing: border-box;\n  outline: none; }\n\n.popup-scrollbar-track-vertical {\n  height: 100%;\n  position: absolute;\n  border-radius: 2px;\n  z-index: 999;\n  top: 0;\n  right: 0; }\n\n.popup-scrollbar-track-horizontal {\n  display: none; }\n\n.app-popup-overlay {\n  background-color: rgba(0, 0, 0, 0.7); }\n\n.popup-close-button-left {\n  top: 0;\n  left: 0; }\n\n.popup-close-button-right {\n  top: 0;\n  right: 0; }\n\n.app-popup-horizontal-center .popup-window {\n  left: 50%;\n  transform: translateX(-50%); }\n\n.app-popup-horizontal-left .popup-window {\n  left: 0; }\n\n.app-popup-horizontal-right .popup-window {\n  right: 0; }\n\n.app-popup-vertical-center .popup-window {\n  top: 50%;\n  transform: translateY(-50%); }\n\n.app-popup-vertical-top .popup-window {\n  top: 0; }\n\n.app-popup-vertical-bottom .popup-window {\n  bottom: 0; }\n\n.app-popup-horizontal-center.app-popup-vertical-center .popup-window {\n  transform: translate(-50%, -50%); }\n\n.app-popup-height-fit-to-screen .popup-window {\n  height: 100vh; }\n\n.popup-close-button-icon {\n  height: 25px;\n  width: 25px; }\n\n.centred {\n  text-align: center;\n  text-align: -webkit-center; }\n\n.altrp-dropbar {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%; }\n\n.altrp-dropbar-children-wrapper {\n  display: flex;\n  position: relative; }\n\n.altrp-btn-dropbar {\n  width: 100%; }\n\n.altrp-dropbar-container {\n  position: absolute;\n  color: #666;\n  padding: 30px;\n  background-color: #f1f3f5; }\n\n.altrp-dropbar-content {\n  user-select: text; }\n\n.altrp-dropbar-container-hide {\n  visibility: hidden; }\n\n.altrp-dropbar-variant-bottom-center .altrp-dropbar-children-wrapper {\n  position: static;\n  justify-content: center; }\n\n.altrp-dropbar-variant-top-center .altrp-dropbar-children-wrapper {\n  position: static;\n  justify-content: center; }\n\n.altrp-dropbar-variant-left-center .altrp-dropbar-children-wrapper {\n  align-items: center; }\n\n.altrp-dropbar-variant-right-center .altrp-dropbar-children-wrapper {\n  align-items: center; }\n\n.css-tl8qiy-Menu,\n.css-l1wtd9-Menu {\n  background-color: white; }\n\n.altrp-field-select2__indicator.altrp-field-select2__dropdown-indicator {\n  padding: 0 8px;\n  max-height: 14px;\n  overflow: hidden; }\n\n.altrp-field-select2 .altrp-field-select2__value-container {\n  padding: 0px 8px; }\n\n.altrp-field-select2 .css-b8ldur-Input {\n  padding-bottom: 0px;\n  padding-top: 0px;\n  margin: 0 2px; }\n\n.altrp-field-select2 .altrp-field-select2__control {\n  min-height: 14px; }\n\n.state-disabled {\n  pointer-events: none; }\n\n.altrp-pointer {\n  cursor: pointer; }\n\n.motion-effects-container {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: absolute; }\n\n.inner-template > .sections-wrapper {\n  width: 100%; }\n\n.altrp-d-none {\n  display: none !important; }\n\n/**\r\n * Перевернуть таблицу\r\n */\n.altrp-transpose_true {\n  overflow: auto; }\n  .altrp-transpose_true > div > div > .altrp-table {\n    width: -moz-fit-content;\n    width: fit-content;\n    overflow: visible; }\n  .altrp-transpose_true .altrp-scroll__horizontal-track {\n    width: 100%;\n    bottom: 0;\n    transform: scale(1, 1.2);\n    transform-origin: center 0; }\n  .altrp-transpose_true .altrp-table_columns-1 {\n    grid-template-rows: 1fr; }\n  .altrp-transpose_true .altrp-table_columns-2 {\n    grid-template-rows: 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-3 {\n    grid-template-rows: 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-4 {\n    grid-template-rows: 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-5 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-6 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-7 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-8 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-9 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-10 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-11 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-12 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table_columns-13 {\n    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; }\n  .altrp-transpose_true .altrp-table {\n    display: grid;\n    grid-auto-flow: column; }\n    .altrp-transpose_true .altrp-table .altrp-table-head {\n      display: contents; }\n      .altrp-transpose_true .altrp-table .altrp-table-head .altrp-table-tr {\n        display: contents; }\n    .altrp-transpose_true .altrp-table .altrp-table-tbody {\n      display: contents; }\n      .altrp-transpose_true .altrp-table .altrp-table-tbody .altrp-table-tr {\n        display: contents; }\n\n/**\r\n * Перевернуть таблицу END\r\n */\n.altrp-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: nowrap; }\n  .altrp-actions-item {\n    display: flex; }\n    .altrp-actions-item__icon {\n      width: 30px;\n      height: 30px;\n      object-fit: contain; }\n\n.media-list {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%; }\n  .media-list-item {\n    width: 33.33%;\n    padding-top: 33.33%;\n    position: relative; }\n    .media-list-item__img {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      object-fit: contain; }\n    .media-list-item__remove {\n      position: absolute;\n      top: 0;\n      right: 0;\n      cursor: pointer;\n      z-index: 10; }\n      .media-list-item__remove svg,\n      .media-list-item__remove path {\n        fill: red; }\n\n.altrp-icon {\n  display: flex;\n  flex-direction: column; }\n\n.altrp-icon-header {\n  display: flex;\n  justify-content: center; }\n\n.altrp-icon-i {\n  height: 50px;\n  width: 50px; }\n\n.altrp-icon-body {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  color: #1c202b;\n  margin-bottom: 20px; }\n\n.altrp-icon-body-label {\n  margin: 0; }\n\n.altrp-icon-footer {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 10px; }\n\n.altrp-icon-body-link {\n  text-decoration: none;\n  color: #1c202b; }\n\n.altrp-icon-read-more {\n  display: flex;\n  justify-content: center; }\n\n.altrp-icon-read-more-link {\n  text-decoration: none;\n  color: #287dff;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.altrp-icon-read-more-link:hover {\n  color: #173e8d; }\n\n.altrp-icon-read-more-on-hover {\n  opacity: 0;\n  position: absolute;\n  box-sizing: border-box;\n  left: 50%;\n  transform: translateX(-50%);\n  display: inline-block;\n  transition: opacity 350ms cubic-bezier(0.24, 0.85, 0.58, 1); }\n\n.altrp-icon:hover .altrp-icon-read-more-on-hover {\n  display: block !important;\n  opacity: 1; }\n\n.altrp-icon-indicator {\n  position: absolute;\n  left: 100%;\n  top: 50%;\n  height: 25px;\n  width: 25px;\n  transform: translateY(-50%); }\n\n.altrp-icon-badge {\n  position: absolute;\n  background-color: #1e87f0;\n  padding: 10px;\n  font-size: 14px;\n  color: #ffffff;\n  border-radius: 500px; }\n\n.altrp-icon-badge-top-left {\n  top: 0;\n  left: 0; }\n\n.altrp-icon-badge-top-right {\n  top: 0;\n  right: 0; }\n\n.altrp-icon-badge-top-center {\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%); }\n\n.altrp-icon-badge-center-left {\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%); }\n\n.altrp-icon-badge-center {\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%); }\n\n.altrp-icon-badge-center-right {\n  top: 50%;\n  right: 0;\n  transform: translateY(-50%); }\n\n.altrp-icon-badge-bottom-left {\n  bottom: 0;\n  left: 0; }\n\n.altrp-icon-badge-bottom {\n  bottom: 0;\n  left: 50%;\n  transform: translateX(-50%); }\n\n.altrp-icon-badge-bottom-right {\n  bottom: 0;\n  right: 0; }\n\n.altrp-icon-global-link {\n  text-decoration: none; }\n\n.altrp-icon-footer-text {\n  color: #1c1c1c;\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0; }\n\n.altrp-icon-i-wrapper {\n  display: flex; }\n\n.altrp-icon-content {\n  width: 100%; }\n\n.column-structure_50_50 .altrp-element_column {\n  flex-basis: 50%; }\n\n.column-structure_30_70 .altrp-element_column:nth-child(even) {\n  flex-basis: 30%; }\n\n.column-structure_30_70 .altrp-element_column:nth-child(odd) {\n  flex-basis: 70%; }\n\n.column-structure_25_75 .altrp-element_column:nth-child(even) {\n  flex-basis: 25%; }\n\n.column-structure_25_75 .altrp-element_column:nth-child(odd) {\n  flex-basis: 75%; }\n\n.column-structure_20_80 .altrp-element_column:nth-child(even) {\n  flex-basis: 20%; }\n\n.column-structure_20_80 .altrp-element_column:nth-child(odd) {\n  flex-basis: 80%; }\n\n.column-structure_15_85 .altrp-element_column:nth-child(even) {\n  flex-basis: 15%; }\n\n.column-structure_15_85 .altrp-element_column:nth-child(odd) {\n  flex-basis: 85%; }\n\n.column-structure_85_15 .altrp-element_column:nth-child(even) {\n  flex-basis: 85%; }\n\n.column-structure_85_15 .altrp-element_column:nth-child(odd) {\n  flex-basis: 15%; }\n\n.column-structure_80_20 .altrp-element_column:nth-child(even) {\n  flex-basis: 80%; }\n\n.column-structure_80_20 .altrp-element_column:nth-child(odd) {\n  flex-basis: 20%; }\n\n.column-structure_75_25 .altrp-element_column:nth-child(even) {\n  flex-basis: 75%; }\n\n.column-structure_75_25 .altrp-element_column:nth-child(odd) {\n  flex-basis: 25%; }\n\n.column-structure_70_30 .altrp-element_column:nth-child(even) {\n  flex-basis: 70%; }\n\n.column-structure_70_30 .altrp-element_column:nth-child(odd) {\n  flex-basis: 30%; }\n\n.column-structure_33_33_33 .altrp-element_column {\n  flex-basis: 33%; }\n\n.column-structure_50_25_25 .altrp-element_column:nth-child(2) {\n  flex-basis: 50%; }\n\n.column-structure_50_25_25 .altrp-element_column:nth-child(3) {\n  flex-basis: 25%; }\n\n.column-structure_50_25_25 .altrp-element_column:nth-child(4) {\n  flex-basis: 25%; }\n\n.column-structure_25_50_25 .altrp-element_column:nth-child(2) {\n  flex-basis: 25%; }\n\n.column-structure_25_50_25 .altrp-element_column:nth-child(3) {\n  flex-basis: 50%; }\n\n.column-structure_25_50_25 .altrp-element_column:nth-child(4) {\n  flex-basis: 25%; }\n\n.column-structure_25_25_50 .altrp-element_column:nth-child(2) {\n  flex-basis: 25%; }\n\n.column-structure_25_25_50 .altrp-element_column:nth-child(3) {\n  flex-basis: 25%; }\n\n.column-structure_25_25_50 .altrp-element_column:nth-child(4) {\n  flex-basis: 50%; }\n\n.column-structure_60_20_20 .altrp-element_column:nth-child(2) {\n  flex-basis: 60%; }\n\n.column-structure_60_20_20 .altrp-element_column:nth-child(3) {\n  flex-basis: 20%; }\n\n.column-structure_60_20_20 .altrp-element_column:nth-child(4) {\n  flex-basis: 20%; }\n\n.column-structure_20_60_20 .altrp-element_column:nth-child(2) {\n  flex-basis: 20%; }\n\n.column-structure_20_60_20 .altrp-element_column:nth-child(3) {\n  flex-basis: 60%; }\n\n.column-structure_20_60_20 .altrp-element_column:nth-child(4) {\n  flex-basis: 20%; }\n\n.column-structure_20_20_60 .altrp-element_column:nth-child(2) {\n  flex-basis: 20%; }\n\n.column-structure_20_20_60 .altrp-element_column:nth-child(3) {\n  flex-basis: 20%; }\n\n.column-structure_20_20_60 .altrp-element_column:nth-child(4) {\n  flex-basis: 60%; }\n\n.column-structure_70_15_15 .altrp-element_column:nth-child(2) {\n  flex-basis: 70%; }\n\n.column-structure_70_15_15 .altrp-element_column:nth-child(3) {\n  flex-basis: 15%; }\n\n.column-structure_70_15_15 .altrp-element_column:nth-child(4) {\n  flex-basis: 15%; }\n\n.column-structure_15_70_15 .altrp-element_column:nth-child(2) {\n  flex-basis: 15%; }\n\n.column-structure_15_70_15 .altrp-element_column:nth-child(3) {\n  flex-basis: 70%; }\n\n.column-structure_15_70_15 .altrp-element_column:nth-child(4) {\n  flex-basis: 15%; }\n\n.column-structure_15_15_70 .altrp-element_column:nth-child(2) {\n  flex-basis: 15%; }\n\n.column-structure_15_15_70 .altrp-element_column:nth-child(3) {\n  flex-basis: 15%; }\n\n.column-structure_15_15_70 .altrp-element_column:nth-child(4) {\n  flex-basis: 70%; }\n\n.altrp-alignment_flex-start {\n  text-align: left; }\n\n.altrp-alignment_flex-end {\n  text-align: right; }\n\n.altrp-alignment_center {\n  text-align: center; }\n\n.altrp-alignment_stretch {\n  text-align: justify; }\n\n.altrp-label.altrp-label_slider {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap; }\n\n.altrp-dropbar-container {\n  z-index: 9999; }\n\n.altrp-pagination__previous,\n.altrp-pagination__next {\n  display: flex;\n  align-items: center; }\n  .altrp-pagination__previous img,\n  .altrp-pagination__next img {\n    width: 60px; }\n\n.altrp-table {\n  border-width: 1px 1px 1px 1px;\n  border-color: #bababa; }\n\n.altrp-table-global-filter {\n  font-weight: 400; }\n  .altrp-table-global-filter label {\n    display: inline-block; }\n\n.altrp-label-icon,\n.altrp-label-icon svg,\n.altrp-label-icon img {\n  width: 20px; }\n\n.altrp-field-select2__indicator {\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.altrp-heading {\n  margin-top: 5px;\n  margin-right: 0;\n  margin-bottom: 5px;\n  margin-left: 0;\n  padding-top: 0;\n  padding-right: 0;\n  padding-bottom: 0;\n  padding-left: 0;\n  background-position: top left;\n  background-attachment: scroll;\n  background-repeat: repeat; }\n\n.altrp-btn {\n  padding-top: 20px;\n  padding-right: 25px;\n  padding-bottom: 20px;\n  padding-left: 25px;\n  font-size: 16px;\n  font-family: \"Open Sans\";\n  line-height: 1;\n  letter-spacing: 0;\n  font-weight: normal;\n  color: white;\n  border-color: #32a852;\n  border-radius: 6px;\n  box-shadow: 0 0 0 0 black;\n  background-color: #343b4c;\n  background-position: top left;\n  background-attachment: scroll;\n  background-repeat: repeat; }\n\n.altrp-list-ul-inline, .altrp-list-ul-default .altrp-list-li {\n  justify-content: left; }\n\n.altrp-list-label {\n  padding-top: 0;\n  padding-right: 0;\n  padding-bottom: 0;\n  padding-left: 0;\n  font-size: 16px;\n  font-family: \"Open Sans\";\n  line-height: 1;\n  letter-spacing: 0; }\n\n.altrp-list-li-link {\n  text-decoration: none; }\n\n.altrp-text {\n  padding-top: 0;\n  padding-right: 0;\n  padding-bottom: 0;\n  padding-left: 0;\n  margin-top: 5px;\n  margin-right: 0;\n  margin-bottom: 5px;\n  margin-left: 0;\n  opacity: 1;\n  font-size: 16px;\n  font-family: \"Open Sans\";\n  line-height: 1.5;\n  letter-spacing: 0;\n  color: #000001;\n  border-color: #32a852;\n  border-radius: 0; }\n\n.altrp-image {\n  margin-top: 0;\n  margin-right: 0;\n  margin-bottom: 0;\n  margin-left: 0;\n  padding-top: 0;\n  padding-right: 0;\n  padding-bottom: 0;\n  padding-left: 0;\n  opacity: 1;\n  object-fit: cover;\n  border-color: #32a852;\n  border-radius: 0; }\n\n.altrp-field-label {\n  font-size: 16px;\n  font-family: \"Open Sans\";\n  line-height: 1.5;\n  letter-spacing: 0; }\n\n.altrp-field-select2__single-value, .altrp-field {\n  font-size: 16px;\n  font-family: \"Open Sans\";\n  line-height: 1.5;\n  letter-spacing: 0; }\n\n.altrp-field-select2__control, .altrp-field {\n  text-align: left;\n  padding-top: 2px;\n  padding-right: 2px;\n  padding-bottom: 2px;\n  padding-left: 2px;\n  border-width: 1px;\n  border-color: #242424;\n  border-radius: 0 0 0 0; }\n\n.altrp-field-select2__control:hover {\n  border-width: 1px;\n  border-color: #242424; }\n\n.altrp-field-container {\n  margin-top: 0;\n  margin-right: 0;\n  margin-bottom: 0;\n  margin-left: 0; }\n\n.altrp-field::placeholder, .altrp-field-select2__placeholder {\n  font-size: 13px;\n  font-family: \"Open Sans\";\n  line-height: 1.5;\n  letter-spacing: 0; }\n\n.altrp-table-th {\n  text-align: center;\n  font-size: 14px;\n  font-weight: normal;\n  font-family: \"Open Sans\";\n  line-height: 1.5;\n  letter-spacing: 0;\n  padding: 0 0 0 0; }\n\n.altrp-table-td {\n  text-align: left;\n  padding: 0 0 0 0;\n  font-size: 14px;\n  font-weight: normal;\n  font-family: \"Open Sans\";\n  line-height: 1.5;\n  letter-spacing: 0; }\n\n.altrp-table-tbody--striped tr:nth-child(2n) {\n  background-color: rgba(0, 0, 50, 0.05); }\n\n/* Effect 1 */\n.cl-style-1:before,\n.cl-style-1:after {\n  display: inline-block;\n  opacity: 0;\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.2s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.2s;\n  transition: transform 0.3s, opacity 0.2s; }\n\n.cl-style-1:before {\n  margin-right: 10px;\n  content: '[';\n  -webkit-transform: translateX(20px);\n  -moz-transform: translateX(20px);\n  transform: translateX(20px); }\n\n.cl-style-1:after {\n  margin-left: 10px;\n  content: ']';\n  -webkit-transform: translateX(-20px);\n  -moz-transform: translateX(-20px);\n  transform: translateX(-20px); }\n\n.cl-style-1:hover::before,\n.cl-style-1:hover::after,\n.cl-style-1:focus::before,\n.cl-style-1:focus::after {\n  opacity: 1;\n  -webkit-transform: translateX(0px);\n  -moz-transform: translateX(0px);\n  transform: translateX(0px); }\n\n/* Effect 2 */\n.cl-style-2 {\n  line-height: 44px;\n  -webkit-perspective: 1000px;\n  -moz-perspective: 1000px;\n  perspective: 1000px; }\n\n.cl-style-2 {\n  position: relative;\n  display: inline-block;\n  padding: 0;\n  background: #2195de;\n  -webkit-transition: -webkit-transform 0.3s;\n  -moz-transition: -moz-transform 0.3s;\n  transition: transform 0.3s;\n  -webkit-transform-origin: 50% 0;\n  -moz-transform-origin: 50% 0;\n  transform-origin: 50% 0;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  transform-style: preserve-3d; }\n\n.cl-style-2::before {\n  position: absolute;\n  padding: 20px 25px;\n  top: 100%;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #0965a0;\n  content: attr(data-hover);\n  -webkit-transition: background 0.3s;\n  -moz-transition: background 0.3s;\n  transition: background 0.3s;\n  -webkit-transform: rotateX(-90deg);\n  -moz-transform: rotateX(-90deg);\n  transform: rotateX(-90deg);\n  -webkit-transform-origin: 50% 0;\n  -moz-transform-origin: 50% 0;\n  transform-origin: 50% 0; }\n\n.cl-style-2:hover,\n.cl-style-2:focus {\n  -webkit-transform: rotateX(90deg) translateY(-22px);\n  -moz-transform: rotateX(90deg) translateY(-22px);\n  transform: rotateX(90deg) translateY(-22px); }\n\n.cl-style-2:hover::before,\n.cl-style-2:focus::before {\n  background: #28a2ee;\n  padding: 20px 25px; }\n\n/* Effect 3 */\n.cl-style-3 {\n  padding: 8px 0;\n  position: relative;\n  display: inline-block; }\n\n.cl-style-3::after {\n  position: absolute;\n  top: calc(100% - 14px);\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background: #28a2ee;\n  content: '_';\n  opacity: 0;\n  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;\n  -moz-transition: opacity 0.3s, -moz-transform 0.3s;\n  transition: opacity 0.3s, transform 0.3s;\n  -webkit-transform: translateY(10px);\n  -moz-transform: translateY(10px);\n  transform: translateY(10px); }\n\n.cl-style-3:hover::after,\n.cl-style-3:focus::after {\n  opacity: 1;\n  -webkit-transform: translateY(0px);\n  -moz-transform: translateY(0px);\n  transform: translateY(0px); }\n\n/* Effect 4 */\n.cl-style-4 {\n  padding: 0 0 10px;\n  position: relative;\n  display: inline-block; }\n\n.cl-style-4::after {\n  position: absolute;\n  top: calc(100% - 10px);\n  left: 0;\n  width: 100%;\n  height: 1px;\n  background: #fff;\n  content: '';\n  opacity: 0;\n  -webkit-transition: height 0.3s, opacity 0.3s, -webkit-transform 0.3s;\n  -moz-transition: height 0.3s, opacity 0.3s, -moz-transform 0.3s;\n  transition: height 0.3s, opacity 0.3s, transform 0.3s;\n  -webkit-transform: translateY(-10px);\n  -moz-transform: translateY(-10px);\n  transform: translateY(-10px); }\n\n.cl-style-4:hover::after,\n.cl-style-4:focus::after {\n  height: 5px;\n  opacity: 1;\n  -webkit-transform: translateY(0px);\n  -moz-transform: translateY(0px);\n  transform: translateY(0px); }\n\n/* Effect 5 нужно поправить стиль */\n.cl-style-5 {\n  overflow: hidden; }\n\n.cl-style-5 {\n  position: relative;\n  display: inline-block;\n  -webkit-transition: -webkit-transform 0.3s;\n  -moz-transition: -moz-transform 0.3s;\n  transition: transform 0.3s; }\n\n.cl-style-5::before {\n  position: absolute;\n  top: 100%;\n  width: 100%;\n  left: 0;\n  right: 0;\n  content: attr(data-hover);\n  font-weight: 700;\n  -webkit-transform: translate3d(0, 0, 0);\n  -moz-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0); }\n\n.cl-style-5:hover,\n.cl-style-5:focus {\n  -webkit-transform: translateY(-100%);\n  -moz-transform: translateY(-100%);\n  transform: translateY(-100%); }\n\n/* Effect 6 */\n.cl-style-6 {\n  margin: 0 10px;\n  padding: 10px 20px;\n  position: relative;\n  display: inline-block; }\n\n.cl-style-6::before {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background: #fff;\n  content: '';\n  -webkit-transition: top 0.3s;\n  -moz-transition: top 0.3s;\n  transition: top 0.3s; }\n\n.cl-style-6::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 2px;\n  height: 2px;\n  background: #fff;\n  content: '';\n  -webkit-transition: height 0.3s;\n  -moz-transition: height 0.3s;\n  transition: height 0.3s; }\n\n.cl-style-6:hover::before {\n  top: 100%;\n  opacity: 1; }\n\n.cl-style-6:hover::after {\n  height: 100%; }\n\n/* Effect 7 */\n.cl-style-7 {\n  padding: 12px 10px 10px;\n  color: #566473;\n  text-shadow: none;\n  font-weight: 700;\n  position: relative;\n  display: inline-block; }\n\n.cl-style-7::before,\n.cl-style-7::after {\n  position: absolute;\n  top: calc(100% - 10px);\n  left: 0;\n  width: 100%;\n  height: 3px;\n  background: #566473;\n  content: '';\n  -webkit-transition: -webkit-transform 0.3s;\n  -moz-transition: -moz-transform 0.3s;\n  transition: transform 0.3s;\n  -webkit-transform: scale(0.85);\n  -moz-transform: scale(0.85);\n  transform: scale(0.85); }\n\n.cl-style-7::after {\n  opacity: 0;\n  -webkit-transition: top 0.3s, opacity 0.3s, -webkit-transform 0.3s;\n  -moz-transition: top 0.3s, opacity 0.3s, -moz-transform 0.3s;\n  transition: top 0.3s, opacity 0.3s, transform 0.3s; }\n\n.cl-style-7:hover::before,\n.cl-style-7:hover::after,\n.cl-style-7:focus::before,\n.cl-style-7:focus::after {\n  -webkit-transform: scale(1);\n  -moz-transform: scale(1);\n  transform: scale(1); }\n\n.cl-style-7:hover::after,\n.cl-style-7:focus::after {\n  top: calc(0% + 10px);\n  opacity: 1; }\n\n/* Effect 8 */\n.cl-style-8 {\n  padding: 10px 20px;\n  position: relative;\n  display: inline-block; }\n\n.cl-style-8::before,\n.cl-style-8::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 3px solid #354856;\n  content: '';\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s; }\n\n.cl-style-8::after {\n  border-color: #fff;\n  opacity: 0;\n  -webkit-transform: translateY(-7px) translateX(6px);\n  -moz-transform: translateY(-7px) translateX(6px);\n  transform: translateY(-7px) translateX(6px); }\n\n.cl-style-8:hover::before,\n.cl-style-8:focus::before {\n  opacity: 0;\n  -webkit-transform: translateY(5px) translateX(-5px);\n  -moz-transform: translateY(5px) translateX(-5px);\n  transform: translateY(5px) translateX(-5px); }\n\n.cl-style-8:hover::after,\n.cl-style-8:focus::after {\n  opacity: 1;\n  -webkit-transform: translateY(0px) translateX(0px);\n  -moz-transform: translateY(0px) translateX(0px);\n  transform: translateY(0px) translateX(0px); }\n\n/* Effect 9 нужно доработать */\n.cl-style-9 {\n  margin: 0 20px;\n  padding: 18px 20px;\n  position: relative;\n  display: inline-block; }\n\n.cl-style-9::before,\n.cl-style-9::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 1px;\n  background: #fff;\n  content: '';\n  opacity: 0.2;\n  -webkit-transition: opacity 0.3s, height 0.3s;\n  -moz-transition: opacity 0.3s, height 0.3s;\n  transition: opacity 0.3s, height 0.3s; }\n\n.cl-style-9::after {\n  top: 100%;\n  opacity: 0;\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s;\n  -webkit-transform: translateY(-10px);\n  -moz-transform: translateY(-10px);\n  transform: translateY(-10px); }\n\n.cl-style-9:first-child {\n  z-index: 2;\n  display: block;\n  font-weight: 300; }\n\n.cl-style-9:last-child {\n  z-index: 1;\n  display: block;\n  padding: 8px 0 0 0;\n  color: rgba(0, 0, 0, 0.4);\n  text-shadow: none;\n  text-transform: none;\n  font-style: italic;\n  font-size: 0.75em;\n  font-family: Palatino, \"Palatino Linotype\", \"Palatino LT STD\", \"Book Antiqua\", Georgia, serif;\n  opacity: 0;\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s;\n  -webkit-transform: translateY(-100%);\n  -moz-transform: translateY(-100%);\n  transform: translateY(-100%); }\n\n.cl-style-9:hover::before,\n.cl-style-9:focus::before {\n  height: 6px; }\n\n.cl-style-9:hover::before,\n.cl-style-9:hover::after,\n.cl-style-9:focus::before,\n.cl-style-9:focus::after {\n  opacity: 1;\n  -webkit-transform: translateY(0px);\n  -moz-transform: translateY(0px);\n  transform: translateY(0px); }\n\n.cl-style-9:hover span:last-child,\n.cl-style-9:focus span:last-child {\n  opacity: 1;\n  -webkit-transform: translateY(0%);\n  -moz-transform: translateY(0%);\n  transform: translateY(0%); }\n\n/* Effect 10 нужно доработать */\n.cl-style-10 {\n  position: relative;\n  z-index: 1; }\n\n.cl-style-10 {\n  overflow: hidden;\n  margin: 0 15px; }\n\n.cl-style-10 {\n  display: inline-block;\n  padding: 10px 20px;\n  background: #0f7c67;\n  -webkit-transition: -webkit-transform 0.3s;\n  -moz-transition: -moz-transform 0.3s;\n  transition: transform 0.3s; }\n\n.cl-style-10::before {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  padding: 10px 20px;\n  width: 100%;\n  height: 100%;\n  background: #fff;\n  color: #0f7c67;\n  content: attr(data-hover);\n  -webkit-transition: -webkit-transform 0.3s;\n  -moz-transition: -moz-transform 0.3s;\n  transition: transform 0.3s;\n  -webkit-transform: translateX(-25%); }\n\n.cl-style-10:hover,\n.cl-style-10:focus {\n  -webkit-transform: translateX(100%);\n  -moz-transform: translateX(100%);\n  transform: translateX(100%); }\n\n.cl-style-10:hover::before,\n.cl-style-10:focus::before {\n  -webkit-transform: translateX(0%);\n  -moz-transform: translateX(0%);\n  transform: translateX(0%); }\n\n/* Effect 11 */\n.cl-style-11 {\n  text-shadow: none;\n  position: relative; }\n\n.cl-style-11::before {\n  position: absolute;\n  display: inline-block;\n  top: auto;\n  bottom: auto;\n  left: 0;\n  right: 0;\n  overflow: hidden;\n  padding: 0;\n  max-width: 0;\n  border-bottom: 2px solid #fff;\n  color: #fff;\n  content: attr(data-hover);\n  -webkit-transition: max-width 0.5s;\n  -moz-transition: max-width 0.5s;\n  transition: max-width 0.5s; }\n\n.cl-style-11:hover::before,\n.cl-style-11:focus::before {\n  max-width: 100%;\n  padding: 10px 0 8px 25px;\n  transition: max-width 0.5s; }\n\n/* Effect 12 */\n.cl-style-12::before,\n.cl-style-12::after {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100px;\n  height: 100px;\n  border: 2px solid rgba(0, 0, 0, 0.1);\n  border-radius: 50%;\n  content: '';\n  opacity: 0;\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s;\n  -webkit-transform: translateX(-50%) translateY(-50%) scale(0.2);\n  -moz-transform: translateX(-50%) translateY(-50%) scale(0.2);\n  transform: translateX(-50%) translateY(-50%) scale(0.2); }\n\n.cl-style-12::after {\n  width: 90px;\n  height: 90px;\n  border-width: 6px;\n  -webkit-transform: translateX(-50%) translateY(-50%) scale(0.8);\n  -moz-transform: translateX(-50%) translateY(-50%) scale(0.8);\n  transform: translateX(-50%) translateY(-50%) scale(0.8); }\n\n.cl-style-12:hover::before,\n.cl-style-12:hover::after,\n.cl-style-12:focus::before,\n.cl-style-12:focus::after {\n  opacity: 1;\n  -webkit-transform: translateX(-50%) translateY(-50%) scale(1);\n  -moz-transform: translateX(-50%) translateY(-50%) scale(1);\n  transform: translateX(-50%) translateY(-50%) scale(1); }\n\n/* Effect 13: three circles */\n.cl-style-13 {\n  -webkit-transition: color 0.3s;\n  -moz-transition: color 0.3s;\n  transition: color 0.3s; }\n\n.cl-style-13::before {\n  position: absolute;\n  top: 60%;\n  left: 50%;\n  color: transparent;\n  content: '\\2022';\n  text-shadow: 0 0 transparent;\n  font-size: 1.2em;\n  -webkit-transition: text-shadow 0.3s, color 0.3s;\n  -moz-transition: text-shadow 0.3s, color 0.3s;\n  transition: text-shadow 0.3s, color 0.3s;\n  -webkit-transform: translateX(-50%);\n  -moz-transform: translateX(-50%);\n  transform: translateX(-50%);\n  pointer-events: none; }\n\n.cl-style-13:hover::before,\n.cl-style-13:focus::before {\n  color: #fff;\n  text-shadow: 10px 0 #fff, -10px 0 #fff; }\n\n.cl-style-13:hover,\n.cl-style-13:focus {\n  color: #ba7700; }\n\n/* Effect 14: border switch */\n.cl-style-14 {\n  position: relative; }\n\n.cl-style-14::before,\n.cl-style-14::after {\n  position: absolute;\n  width: 45px;\n  height: 2px;\n  background: #fff;\n  content: '';\n  opacity: 0.2;\n  -webkit-transition: all 0.3s;\n  -moz-transition: all 0.3s;\n  transition: all 0.3s;\n  pointer-events: none; }\n\n.cl-style-14::before {\n  top: 10%;\n  left: 0;\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  transform: rotate(90deg);\n  -webkit-transform-origin: 0 0;\n  -moz-transform-origin: 0 0;\n  transform-origin: 0 0;\n  margin-left: 8px; }\n\n.cl-style-14::after {\n  right: 0;\n  bottom: 5%;\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  transform: rotate(90deg);\n  -webkit-transform-origin: 100% 0;\n  -moz-transform-origin: 100% 0;\n  transform-origin: 100% 0;\n  margin-right: 8px; }\n\n.cl-style-14:hover::before,\n.cl-style-14:hover::after,\n.cl-style-14:focus::before,\n.cl-style-14:focus::after {\n  opacity: 1;\n  margin: 0; }\n\n.cl-style-14:hover::before,\n.cl-style-14:focus::before {\n  left: 50%;\n  -webkit-transform: rotate(0deg) translateX(-50%);\n  -moz-transform: rotate(0deg) translateX(-50%);\n  transform: rotate(0deg) translateX(-50%); }\n\n.cl-style-14:hover::after,\n.cl-style-14:focus::after {\n  right: 50%;\n  -webkit-transform: rotate(0deg) translateX(50%);\n  -moz-transform: rotate(0deg) translateX(50%);\n  transform: rotate(0deg) translateX(50%); }\n\n/* Effect 15: scale down, reveal */\n.cl-style-15 {\n  color: rgba(0, 0, 0, 0.2);\n  font-weight: 700;\n  text-shadow: none; }\n\n.cl-style-15::before {\n  color: #fff;\n  content: attr(data-hover);\n  position: absolute;\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s; }\n\n.cl-style-15:hover::before,\n.cl-style-15:focus::before {\n  -webkit-transform: scale(0.9);\n  -moz-transform: scale(0.9);\n  transform: scale(0.9);\n  opacity: 0; }\n\n/* Effect 16: fall down */\n.cl-style-16 {\n  text-shadow: 0 0 1px rgba(111, 134, 134, 0.3); }\n\n.cl-style-16::before {\n  color: #fff;\n  content: attr(data-hover);\n  position: absolute;\n  opacity: 0;\n  text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);\n  -webkit-transform: scale(1.1) translateX(10px) translateY(-10px) rotate(4deg);\n  -moz-transform: scale(1.1) translateX(10px) translateY(-10px) rotate(4deg);\n  transform: scale(1.1) translateX(10px) translateY(-10px) rotate(4deg);\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s;\n  pointer-events: none; }\n\n.cl-style-16:hover::before,\n.cl-style-16:focus::before {\n  -webkit-transform: scale(1) translateX(0px) translateY(0px) rotate(0deg);\n  -moz-transform: scale(1) translateX(0px) translateY(0px) rotate(0deg);\n  transform: scale(1) translateX(0px) translateY(0px) rotate(0deg);\n  opacity: 1; }\n\n/* Effect 17: move up fade out, push border */\n.cl-style-17 {\n  text-shadow: none;\n  position: relative;\n  display: inline-block; }\n\n.cl-style-17::before {\n  color: #fff;\n  text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);\n  content: attr(data-hover);\n  position: absolute;\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s;\n  pointer-events: none; }\n\n.cl-style-17::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  bottom: 8px;\n  width: 100%;\n  height: 2px;\n  background: #fff;\n  opacity: 0;\n  -webkit-transform: translateY(5px);\n  -moz-transform: translateY(5px);\n  transform: translateY(5px);\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s;\n  pointer-events: none; }\n\n.cl-style-17:hover::before,\n.cl-style-17:focus::before {\n  opacity: 0;\n  -webkit-transform: translateY(-2px);\n  -moz-transform: translateY(-2px);\n  transform: translateY(-2px); }\n\n.cl-style-17:hover::after,\n.cl-style-17:focus::after {\n  opacity: 1;\n  -webkit-transform: translateY(0px);\n  -moz-transform: translateY(0px);\n  transform: translateY(0px); }\n\n/* Effect 18: cross */\n.cl-style-18 {\n  position: relative;\n  z-index: 1; }\n\n.cl-style-18 {\n  padding: 0 5px;\n  color: #b4770d;\n  font-weight: 700;\n  -webkit-transition: color 0.3s;\n  -moz-transition: color 0.3s;\n  transition: color 0.3s; }\n\n.cl-style-18::before,\n.cl-style-18::after {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  top: 50%;\n  height: 2px;\n  margin-top: -1px;\n  background: #b4770d;\n  content: '';\n  z-index: -1;\n  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n  -moz-transition: -moz-transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s;\n  pointer-events: none; }\n\n.cl-style-18::before {\n  -webkit-transform: translateY(-20px);\n  -moz-transform: translateY(-20px);\n  transform: translateY(-20px); }\n\n.cl-style-18::after {\n  -webkit-transform: translateY(20px);\n  -moz-transform: translateY(20px);\n  transform: translateY(20px); }\n\n.cl-style-18:hover,\n.cl-style-18:focus {\n  color: #fff; }\n\n.cl-style-18:hover::before,\n.cl-style-18:hover::after,\n.cl-style-18:focus::before,\n.cl-style-18:focus::after {\n  opacity: 0.7; }\n\n.cl-style-18:hover::before,\n.cl-style-18:focus::before {\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  transform: rotate(45deg); }\n\n.cl-style-18:hover::after,\n.cl-style-18:focus::after {\n  -webkit-transform: rotate(-45deg);\n  -moz-transform: rotate(-45deg);\n  transform: rotate(-45deg); }\n\n/* Effect 19: 3D side */\n.cl-style-19 {\n  line-height: 2em;\n  margin: 15px;\n  width: 200px; }\n\n.cl-style-19 {\n  position: relative;\n  display: inline-block;\n  padding: 0 14px;\n  background: #e35041;\n  -webkit-transition: -webkit-transform 0.4s, background 0.4s;\n  -moz-transition: -moz-transform 0.4s, background 0.4s;\n  transition: transform 0.4s, background 0.4s;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-transform-origin: 50% 50% -100px;\n  -moz-transform-origin: 50% 50% -100px;\n  transform-origin: 50% 50% -100px; }\n\n.cl-style-19::before {\n  position: absolute;\n  top: 0;\n  left: 100%;\n  width: 100%;\n  height: 100%;\n  background: #b53a2d;\n  content: attr(data-hover);\n  -webkit-transition: background 0.4s;\n  -moz-transition: background 0.4s;\n  transition: background 0.4s;\n  -webkit-transform: rotateY(90deg);\n  -moz-transform: rotateY(90deg);\n  transform: rotateY(90deg);\n  -webkit-transform-origin: 0 50%;\n  -moz-transform-origin: 0 50%;\n  transform-origin: 0 50%;\n  pointer-events: none;\n  padding: 20px 25px; }\n\n.cl-style-19:hover,\n.cl-style-19:focus {\n  background: #b53a2d;\n  -webkit-transform: rotateY(-90deg);\n  -moz-transform: rotateY(-90deg);\n  transform: rotateY(-90deg); }\n\n.cl-style-19:hover::before,\n.cl-style-19:focus::before {\n  background: #ef5e50; }\n\n/* Effect 20: 3D side */\n.cl-style-20 {\n  line-height: 2em;\n  -webkit-perspective: 800px;\n  -moz-perspective: 800px;\n  perspective: 800px; }\n\n.cl-style-20 {\n  position: relative;\n  display: inline-block;\n  padding: 3px 15px 0;\n  background: #587285;\n  box-shadow: inset 0 3px #2f4351;\n  -webkit-transition: background 0.6s;\n  -moz-transition: background 0.6s;\n  transition: background 0.6s;\n  -webkit-transform-origin: 50% 0;\n  -moz-transform-origin: 50% 0;\n  transform-origin: 50% 0;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-transform-origin: 0% 50%;\n  -moz-transform-origin: 0% 50%;\n  transform-origin: 0% 50%; }\n\n.cl-style-20::before {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #fff;\n  color: #2f4351;\n  content: attr(data-hover);\n  -webkit-transform: rotateX(270deg);\n  -moz-transform: rotateX(270deg);\n  transform: rotateX(270deg);\n  -webkit-transition: -webkit-transform 0.6s;\n  -moz-transition: -moz-transform 0.6s;\n  transition: transform 0.6s;\n  -webkit-transform-origin: 0 0;\n  -moz-transform-origin: 0 0;\n  transform-origin: 0 0;\n  pointer-events: none;\n  padding: 20px 25px; }\n\n.cl-style-20:hover,\n.cl-style-20:focus {\n  background: #2f4351; }\n\n.cl-style-20:hover::before,\n.cl-style-20:focus::before {\n  -webkit-transform: rotateX(10deg);\n  -moz-transform: rotateX(10deg);\n  transform: rotateX(10deg); }\n\n/* Effect 21: borders slight translate */\n.cl-style-21 {\n  padding: 10px;\n  color: #237546;\n  font-weight: 700;\n  text-shadow: none;\n  -webkit-transition: color 0.3s;\n  -moz-transition: color 0.3s;\n  transition: color 0.3s;\n  position: relative;\n  display: inline-block; }\n\n.cl-style-21::before,\n.cl-style-21::after {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background: #fff;\n  content: '';\n  opacity: 0;\n  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;\n  -moz-transition: opacity 0.3s, -moz-transform 0.3s;\n  transition: opacity 0.3s, transform 0.3s;\n  -webkit-transform: translateY(-10px);\n  -moz-transform: translateY(-10px);\n  transform: translateY(-10px); }\n\n.cl-style-21::before {\n  top: 8px;\n  -webkit-transform: translateY(-10px);\n  -moz-transform: translateY(-10px);\n  transform: translateY(-10px); }\n\n.cl-style-21::after {\n  bottom: 8px;\n  -webkit-transform: translateY(10px);\n  -moz-transform: translateY(10px);\n  transform: translateY(10px); }\n\n.cl-style-21:hover,\n.cl-style-21:focus {\n  color: #fff; }\n\n.cl-style-21:hover::before,\n.cl-style-21:focus::before,\n.cl-style-21:hover::after,\n.cl-style-21:focus::after {\n  opacity: 1;\n  -webkit-transform: translateY(0px);\n  -moz-transform: translateY(0px);\n  transform: translateY(0px); }\n\n.grayscale img:hover {\n  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"matrix\" color-interpolation-filters=\"sRGB\" values=\"0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0\" /></filter></svg>#filter');\n  -webkit-filter: grayscale(1);\n  filter: grayscale(1); }\n\n.color img {\n  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"matrix\" color-interpolation-filters=\"sRGB\" values=\"0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0\" /></filter></svg>#filter');\n  -webkit-filter: grayscale(1);\n  filter: grayscale(1); }\n\n.color img:hover {\n  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"matrix\" color-interpolation-filters=\"sRGB\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\" /></filter></svg>#filter');\n  -webkit-filter: grayscale(0);\n  filter: grayscale(0); }\n\n.dive img:hover {\n  -webkit-transform: scale(3);\n  transform: scale(3); }\n\n.zoom-in,\n.zoom-out {\n  overflow: hidden; }\n\n.zoom-in img {\n  -webkit-transform: scale(1);\n  transform: scale(1); }\n\n.zoom-in:hover img {\n  -webkit-transform: scale(1.2);\n  transform: scale(1.2); }\n\n.zoom-out img {\n  -webkit-transform: scale(1.2);\n  transform: scale(1.2); }\n\n.zoom-out:hover img {\n  -webkit-transform: scale(1);\n  transform: scale(1); }\n\n.zoom-out-in,\n.zoom-in-out {\n  overflow: hidden; }\n\n.zoom-in-out img:hover {\n  animation: zoom-in-out 0.6s ease;\n  -webkit-animation: zoom-in-out 0.6s ease; }\n\n@-webkit-keyframes zoom-in-out {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  50% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes zoom-in-out {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  50% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n.zoom-out-in img {\n  -webkit-transform: scale(1.2);\n  transform: scale(1.2); }\n\n.zoom-out-in img:hover {\n  animation: zoom-out-in 0.6s ease;\n  -webkit-animation: zoom-out-in 0.6s ease; }\n\n@-webkit-keyframes zoom-out-in {\n  0% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); }\n  50% {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  100% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); } }\n\n@keyframes zoom-out-in {\n  0% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); }\n  50% {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  100% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); } }\n\n.blur:hover img {\n  -webkit-filter: blur(2px);\n  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feGaussianBlur stdDeviation=\"2\" /></filter></svg>#filter');\n  filter: blur(2px); }\n\n.rotate,\n.scale-rotate-right,\n.scale-rotate-left {\n  overflow: hidden; }\n\n.rotate img {\n  -webkit-transform: scale(1.3);\n  transform: scale(1.3); }\n\n.rotate:hover img,\n.scale-rotate-right:hover img {\n  -webkit-transform: scale(1.3) rotate(5deg);\n  transform: scale(1.3) rotate(5deg); }\n\n.scale-rotate-left:hover img {\n  -webkit-transform: scale(1.3) rotate(-5deg);\n  transform: scale(1.3) rotate(-5deg); }\n\n.move-up img,\n.move-down img,\n.move-right img,\n.move-left img {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1); }\n\n.move-up,\n.move-down,\n.move-right,\n.move-left {\n  overflow: hidden; }\n\n.move-down:hover img {\n  -webkit-transform-origin: top;\n  transform-origin: top; }\n\n.move-up:hover img {\n  -webkit-transform-origin: bottom;\n  transform-origin: bottom; }\n\n.move-right:hover img {\n  -webkit-transform-origin: left;\n  transform-origin: left; }\n\n.move-left:hover img {\n  -webkit-transform-origin: right;\n  transform-origin: right; }\n\n.slide-up,\n.slide-down,\n.slide-left,\n.slide-right,\n.slide-top-left,\n.slide-top-right,\n.slide-bottom-left,\n.slide-bottom-right {\n  overflow: hidden; }\n\n.slide-up:hover img {\n  -webkit-transform: translateY(-100%);\n  transform: translateY(-100%); }\n\n.slide-down:hover img {\n  -webkit-transform: translateY(100%);\n  transform: translateY(100%); }\n\n.slide-left:hover img {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%); }\n\n.slide-right:hover img {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%); }\n\n.slide-top-left:hover img {\n  -webkit-transform: translate(-100%, -100%);\n  transform: translate(-100%, -100%); }\n\n.slide-top-right:hover img {\n  -webkit-transform: translate(100%, -100%);\n  transform: translate(100%, -100%); }\n\n.slide-bottom-left:hover img {\n  -webkit-transform: translate(-100%, 100%);\n  transform: translate(-100%, 100%); }\n\n.slide-bottom-right:hover img {\n  -webkit-transform: translate(100%, 100%);\n  transform: translate(100%, 100%); }\n\n.hinge-up,\n.hinge-down,\n.hinge-left,\n.hinge-right {\n  -webkit-perspective: 50em;\n  perspective: 50em;\n  overflow: hidden; }\n\n.hinge-up img {\n  -webkit-transform-origin: 50% 0%;\n  transform-origin: 50% 0%; }\n\n.hinge-up:hover img {\n  -webkit-transform: rotateX(-90deg);\n  transform: rotateX(-90deg); }\n\n.hinge-down img {\n  -webkit-transform-origin: 50% 100%;\n  transform-origin: 50% 100%; }\n\n.hinge-down:hover img {\n  -webkit-transform: rotateX(90deg);\n  transform: rotateX(90deg); }\n\n.hinge-left img {\n  -webkit-transform-origin: 0% 50%;\n  transform-origin: 0% 50%; }\n\n.hinge-left:hover img {\n  -webkit-transform: rotateY(90deg);\n  transform: rotateY(90deg); }\n\n.hinge-right img {\n  -webkit-transform-origin: 100% 50%;\n  transform-origin: 100% 50%; }\n\n.hinge-right:hover img {\n  -webkit-transform: rotateY(-90deg);\n  transform: rotateY(-90deg); }\n\n.flip-hor,\n.flip-vert,\n.flip-diag-left,\n.flip-diag-right {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-perspective: 50em;\n  perspective: 50em;\n  overflow: hidden; }\n\n.flip-vert:hover img {\n  -webkit-transform: rotateX(-180deg);\n  transform: rotateX(-180deg); }\n\n.flip-hor:hover img {\n  -webkit-transform: rotateY(-180deg);\n  transform: rotateY(-180deg); }\n\n.flip-diag-left:hover img {\n  -webkit-transform: rotate3d(-1, 1, 0, 180deg);\n  transform: rotate3d(-1, 1, 0, 180deg); }\n\n.flip-diag-right:hover img {\n  -webkit-transform: rotate3d(-1, -1, 0, 180deg);\n  transform: rotate3d(-1, -1, 0, 180deg); }\n\n.fold-up,\n.fold-down,\n.fold-left,\n.fold-right {\n  overflow: hidden; }\n\n.fold-up img {\n  -webkit-transform-origin: 49% 0%;\n  transform-origin: 49% 0%; }\n\n.fold-up:hover img {\n  -webkit-transform: rotateX(90deg) scale(0.6) translateY(50%);\n  transform: rotateX(90deg) scale(0.6) translateY(50%); }\n\n.fold-down img {\n  -webkit-transform-origin: 50% 100%;\n  transform-origin: 50% 100%; }\n\n.fold-down:hover img {\n  -webkit-transform: rotateX(-90deg) scale(0.6) translateY(-50%);\n  transform: rotateX(-90deg) scale(0.6) translateY(-50%); }\n\n.fold-left img {\n  -webkit-transform-origin: 0% 50%;\n  transform-origin: 0% 50%; }\n\n.fold-left:hover img {\n  -webkit-transform: rotateY(-90deg) scale(0.6) translateX(50%);\n  transform: rotateY(-90deg) scale(0.6) translateX(50%); }\n\n.fold-right img {\n  -webkit-transform-origin: 100% 50%;\n  transform-origin: 100% 50%; }\n\n.fold-right:hover img {\n  -webkit-transform: rotateY(90deg) scale(0.6) translateX(-50%);\n  transform: rotateY(90deg) scale(0.6) translateX(-50%); }\n\n.zoom-out-slide-up,\n.zoom-out-slide-down,\n.zoom-out-slide-left,\n.zoom-out-slide-right {\n  overflow: hidden; }\n\n.zoom-out-slide-up img,\n.zoom-out-slide-down img,\n.zoom-out-slide-left img,\n.zoom-out-slide-right img {\n  -webkit-transform: scale(1.2);\n  transform: scale(1.2); }\n\n.zoom-out-slide-up:hover img {\n  -webkit-animation: zoom-out-slide-up 0.6s;\n  animation: zoom-out-slide-up 0.6s;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n@-webkit-keyframes zoom-out-slide-up {\n  50% {\n    -webkit-transform: scale(1) translateY(0%);\n    transform: scale(1) translateY(0%); }\n  100% {\n    -webkit-transform: scale(1) translateY(-100%);\n    transform: scale(1) translateY(-100%); } }\n\n@keyframes zoom-out-slide-up {\n  50% {\n    -webkit-transform: scale(1) translateY(0%);\n    transform: scale(1) translateY(0%); }\n  100% {\n    -webkit-transform: scale(1) translateY(-100%);\n    transform: scale(1) translateY(-100%); } }\n\n.zoom-out-slide-down:hover img {\n  -webkit-animation: zoom-out-slide-down 0.6s;\n  animation: zoom-out-slide-down 0.6s;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n@-webkit-keyframes zoom-out-slide-down {\n  50% {\n    -webkit-transform: scale(1) translateY(0%);\n    transform: scale(1) translateY(0%); }\n  100% {\n    -webkit-transform: scale(1) translateY(100%);\n    transform: scale(1) translateY(100%); } }\n\n@keyframes zoom-out-slide-down {\n  50% {\n    -webkit-transform: scale(1) translateY(0%);\n    transform: scale(1) translateY(0%); }\n  100% {\n    -webkit-transform: scale(1) translateY(100%);\n    transform: scale(1) translateY(100%); } }\n\n.zoom-out-slide-left:hover img {\n  -webkit-animation: zoom-out-slide-left 0.6s;\n  animation: zoom-out-slide-left 0.6s;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n@-webkit-keyframes zoom-out-slide-left {\n  50% {\n    -webkit-transform: scale(1) translateX(0%);\n    transform: scale(1) translateX(0%); }\n  100% {\n    -webkit-transform: scale(1) translateX(-100%);\n    transform: scale(1) translateX(-100%); } }\n\n@keyframes zoom-out-slide-left {\n  50% {\n    -webkit-transform: scale(1) translateX(0%);\n    transform: scale(1) translateX(0%); }\n  100% {\n    -webkit-transform: scale(1) translateX(-100%);\n    transform: scale(1) translateX(-100%); } }\n\n.zoom-out-slide-right:hover img {\n  -webkit-animation: zoom-out-slide-right 0.6s;\n  animation: zoom-out-slide-right 0.6s;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n@-webkit-keyframes zoom-out-slide-right {\n  50% {\n    -webkit-transform: scale(1) translateX(0%);\n    transform: scale(1) translateX(0%); }\n  100% {\n    -webkit-transform: scale(1) translateX(100%);\n    transform: scale(1) translateX(100%); } }\n\n@keyframes zoom-out-slide-right {\n  50% {\n    -webkit-transform: scale(1) translateX(0%);\n    transform: scale(1) translateX(0%); }\n  100% {\n    -webkit-transform: scale(1) translateX(100%);\n    transform: scale(1) translateX(100%); } }\n\n.zoom-out-flip-hor:hover img {\n  -webkit-transform: rotateX(-100deg) translateY(50%) scale(0);\n  transform: rotateX(-100deg) translateY(50%) scale(0); }\n\n.zoom-out-flip-vert:hover img {\n  -webkit-transform: rotateY(-100deg) translateX(50%) scale(0);\n  transform: rotateY(-100deg) translateX(50%) scale(0); }\n\n.zoom-in-flip-hor:hover img {\n  -webkit-transform: rotateX(90deg) translateY(-100%) scale(0);\n  transform: rotateX(90deg) translateY(-100%) scale(0);\n  -webkit-transform-origin: 50% 50%;\n  transform-origin: 50% 50%; }\n\n.zoom-in-flip-vert:hover img {\n  -webkit-transform: rotateY(90deg) translate(50%, 0) scale(0);\n  transform: rotateY(90deg) translate(50%, 0) scale(0);\n  -webkit-transform-origin: 50% 50%;\n  transform-origin: 50% 50%; }\n\n.pivot-in-top-left,\n.pivot-in-top-right,\n.pivot-in-bottom-left,\n.pivot-in-bottom-right,\n.pivot-out-top-left,\n.pivot-out-top-right,\n.pivot-out-bottom-left,\n.pivot-out-bottom-right {\n  overflow: hidden; }\n\n.pivot-in-top-left img {\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0; }\n\n.pivot-in-top-left:hover img {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.pivot-in-top-right img {\n  -webkit-transform-origin: 100% 0;\n  transform-origin: 100% 0; }\n\n.pivot-in-top-right:hover img {\n  -webkit-transform: rotate(-90deg);\n  transform: rotate(-90deg); }\n\n.pivot-in-bottom-left img {\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%; }\n\n.pivot-in-bottom-left:hover img {\n  -webkit-transform: rotate(-90deg);\n  transform: rotate(-90deg); }\n\n.pivot-in-bottom-right img {\n  -webkit-transform-origin: 100% 100%;\n  transform-origin: 100% 100%; }\n\n.pivot-in-bottom-right:hover img {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.pivot-out-top-left img {\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0; }\n\n.pivot-out-top-left img {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.pivot-out-top-left:hover img {\n  -webkit-transform: rotate(0);\n  transform: rotate(0); }\n\n.pivot-out-top-right img {\n  -webkit-transform-origin: 100% 0;\n  transform-origin: 100% 0; }\n\n.pivot-out-top-right img {\n  -webkit-transform: rotate(-90deg);\n  transform: rotate(-90deg); }\n\n.pivot-out-top-right:hover img {\n  -webkit-transform: rotate(0);\n  transform: rotate(0); }\n\n.pivot-out-bottom-left img {\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%; }\n\n.pivot-out-bottom-left img {\n  -webkit-transform: rotate(-90deg);\n  transform: rotate(-90deg); }\n\n.pivot-out-bottom-left:hover img {\n  -webkit-transform: rotate(0);\n  transform: rotate(0); }\n\n.pivot-out-bottom-right img {\n  -webkit-transform-origin: 100% 100%;\n  transform-origin: 100% 100%; }\n\n.pivot-out-bottom-right img {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.pivot-out-bottom-right:hover img {\n  -webkit-transform: rotate(0);\n  transform: rotate(0); }\n\n@media print {\n  .card-header {\n    margin: 10px 15px; }\n  .dropdownTogglerContainer {\n    display: none;\n    overflow: hidden;\n    height: 0; }\n  .card {\n    width: 100%; } }\n\n#front-app {\n  transform: none !important;\n  transition: none !important; }\n\n.collapse-button {\n  width: 100%;\n  text-align: left;\n  background-color: transparent;\n  border: 0;\n  border-bottom: 1px solid lightgrey;\n  margin-bottom: 5px; }\n  .collapse-button-content {\n    display: flex;\n    justify-content: space-between; }\n  .collapse-button:hover {\n    background-color: lightgrey; }\n\n.collapse {\n  height: 0;\n  opacity: 0;\n  transition: all 1s;\n  overflow: auto; }\n  .collapse.show {\n    opacity: 1;\n    height: fit-content;\n    height: -moz-max-content;\n    padding: 5px 0;\n    transition: all 1s;\n    width: 100%; }\n\n.spinner-border.text-warning {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  margin: auto;\n  vertical-align: text-bottom;\n  border: 0.25em solid;\n  border-right: 0.25em solid transparent;\n  border-radius: 50%;\n  animation: spinner-border 0.75s linear infinite;\n  color: #ffc107 !important; }\n\n.chart-content-container {\n  width: 80%;\n  height: 80%; }\n\n.drawer {\n  position: absolute;\n  top: 0;\n  z-index: 9999999; }\n  .drawer-mask {\n    background: #000;\n    opacity: 0;\n    width: 100%;\n    height: 0;\n    position: fixed;\n    top: 0;\n    left: 0;\n    transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86), height 0s ease 0.3s; }\n  .drawer-content {\n    overflow: auto;\n    z-index: 1;\n    position: relative;\n    width: 100%;\n    height: 100%; }\n    .drawer-content select {\n      width: 100%;\n      margin: 10px 0;\n      font-size: 14px;\n      padding: 5px;\n      border: 1px solid lightgrey;\n      border-radius: 4px; }\n  .drawer-preview {\n    width: calc(100% - 50vh);\n    height: 100%;\n    position: relative;\n    display: none;\n    background: transparent;\n    transition: opacity 5s; }\n    .drawer-preview__container {\n      display: flex;\n      flex-direction: column;\n      background-color: white;\n      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);\n      max-height: 900px;\n      margin: auto;\n      border-radius: 4px; }\n      @media screen and (max-width: 985px) {\n        .drawer-preview__container {\n          display: none !important; } }\n      .drawer-preview__container .title {\n        margin-top: 30px;\n        text-align: center; }\n        .drawer-preview__container .title > input {\n          border: 0;\n          border-bottom: 1px solid lightgray;\n          font-size: 18px;\n          min-width: 350px; }\n      .drawer-preview__container-content {\n        width: 700px;\n        height: 500px;\n        max-height: 800;\n        padding: 10px 0; }\n        .drawer-preview__container-content .chart-container {\n          height: 100%;\n          width: 100%;\n          display: flex;\n          justify-content: center;\n          align-items: center; }\n          .drawer-preview__container-content .chart-container > .chart-content-container {\n            width: 80%;\n            height: 80%; }\n          .drawer-preview__container-content .chart-container.right {\n            flex-direction: row; }\n          .drawer-preview__container-content .chart-container.left {\n            flex-direction: row-reverse; }\n          .drawer-preview__container-content .chart-container.top {\n            flex-direction: column-reverse; }\n          .drawer-preview__container-content .chart-container.bottom {\n            flex-direction: column; }\n  .drawer-open .drawer-preview {\n    display: flex; }\n  .drawer-open {\n    width: 100%;\n    height: 100%; }\n  .drawer-open .drawer-right {\n    width: 100%; }\n    .drawer-open .drawer-right .drawer-content {\n      height: 100%;\n      padding-top: 40px; }\n  .drawer-open .drawer-mask {\n    opacity: 0.3;\n    height: 100%;\n    transition: none; }\n  .drawer-open .drawer-content-wrapper {\n    position: fixed;\n    background: #fff;\n    right: 0;\n    height: 100%;\n    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);\n    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86) 0s;\n    overflow: auto;\n    padding: 10px 0; }\n\n.altrp-dashboard__card {\n  box-sizing: border-box;\n  word-wrap: break-word;\n  margin-left: 15px;\n  margin-right: 15px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 10px; }\n  .altrp-dashboard__card > .title {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    font-size: 15px;\n    font-weight: 600;\n    margin: 0 10px; }\n    .altrp-dashboard__card > .title > .dropdownTogglerContainer {\n      width: fit-content; }\n    .altrp-dashboard__card > .title > .dropdownTogglerContainer > .dropleft > .dropdown-toggle {\n      background-color: white;\n      padding: 2px; }\n    .altrp-dashboard__card > .title > .dropdownTogglerContainer > .dropleft > .dropdownMenuToggle {\n      background-color: white;\n      margin-right: 5px;\n      padding: 2px;\n      border-radius: 4px;\n      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15); }\n    .altrp-dashboard__card > .title > .dropdownTogglerContainer\n> .dropleft\n> .dropdownMenuToggle\n> .dropdown-item {\n      background-color: white;\n      padding: 0 5px; }\n    .altrp-dashboard__card > .title > .dropdownTogglerContainer\n> .dropleft\n> .dropdownMenuToggle\n> .dropdown-item\n> button {\n      background-color: white;\n      padding: 0 5px; }\n    .altrp-dashboard__card > .title > .dropdownTogglerContainer\n> .dropleft\n> .dropdownMenuToggle.show {\n      transition: opacity 0.2s linear; }\n  .altrp-dashboard__card .chart-container {\n    height: 100%;\n    width: 100%;\n    padding-top: 10px;\n    margin-bottom: 10px;\n    overflow: hidden;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n    .altrp-dashboard__card .chart-container.right {\n      flex-direction: row; }\n    .altrp-dashboard__card .chart-container.left {\n      flex-direction: row-reverse; }\n    .altrp-dashboard__card .chart-container.top {\n      flex-direction: column-reverse; }\n    .altrp-dashboard__card .chart-container.bottom {\n      flex-direction: column; }\n  .altrp-dashboard__card__add-settings {\n    width: 100%; }\n    .altrp-dashboard__card__add-settings form {\n      height: 100%;\n      width: 100%;\n      display: flex;\n      flex-direction: column; }\n    .altrp-dashboard__card__add-settings .label {\n      width: 100%;\n      border: 0;\n      color: black;\n      font-size: 12px;\n      margin-bottom: 5px; }\n    .altrp-dashboard__card__add-settings .form-group > .title {\n      width: 100%;\n      border: 0;\n      color: rgba(0, 0, 0, 0.5);\n      font-size: 14px;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.15);\n      margin-bottom: 5px; }\n    .altrp-dashboard__card__add-settings .select-type {\n      display: block;\n      width: 100%;\n      height: calc(1.5em + 0.75rem + 2px);\n      padding: 0.375rem 0.75rem;\n      font-size: 14px;\n      font-weight: 400;\n      line-height: 1.5;\n      color: #495057;\n      background-color: #fff;\n      background-clip: padding-box;\n      border: 1px solid #ced4da;\n      border-radius: 0.25rem;\n      transition: border-color 0.15s ease-in-out,\r box-shadow 0.15s ease-in-out; }\n    .altrp-dashboard__card__add-settings form > .chart-container {\n      overflow: auto;\n      margin-top: 15px;\n      height: 100px;\n      flex-grow: 1; }\n  .altrp-dashboard__card > .altrp-dashboard__card__add {\n    margin: auto;\n    background-color: transparent; }\n    .altrp-dashboard__card > .altrp-dashboard__card__add:hover {\n      cursor: pointer; }\n      .altrp-dashboard__card > .altrp-dashboard__card__add:hover > .title {\n        color: black;\n        transition: color 0.5s; }\n      .altrp-dashboard__card > .altrp-dashboard__card__add:hover svg {\n        color: black; }\n    .altrp-dashboard__card > .altrp-dashboard__card__add > .title {\n      text-align: center;\n      margin-bottom: 10px;\n      color: gray;\n      font-size: 12px; }\n    .altrp-dashboard__card > .altrp-dashboard__card__add div {\n      margin: auto;\n      width: fit-content; }\n      .altrp-dashboard__card > .altrp-dashboard__card__add div > svg {\n        margin: auto;\n        width: 36px;\n        height: 36px;\n        color: gray; }\n\n.altrp-dashboard__controls {\n  margin-bottom: 10px; }\n  .altrp-dashboard__controls .nav {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));\n    grid-column-gap: 5px;\n    grid-row-gap: 10px; }\n    @media print {\n      .altrp-dashboard__controls .nav {\n        overflow: hidden;\n        height: 0; } }\n    .altrp-dashboard__controls .nav > .nav-item {\n      cursor: pointer; }\n      .altrp-dashboard__controls .nav > .nav-item .global-select {\n        width: 100%;\n        height: 100%;\n        padding: 5px 14px; }\n      .altrp-dashboard__controls .nav > .nav-item.nav-button {\n        width: 100%;\n        height: 100%;\n        color: white;\n        font-family: \"PT Sans\", sans-serif;\n        font-size: 14px;\n        line-height: 1.5;\n        letter-spacing: 0.8px;\n        font-weight: 400;\n        text-transform: uppercase;\n        text-shadow: 0px 0px 0px #271e1e;\n        padding: 5px 14px;\n        background-image: linear-gradient(90deg, #7f7f7f 7.30167%, #706f6f 100%);\n        border-color: #32a852; }\n        .altrp-dashboard__controls .nav > .nav-item.nav-button:hover {\n          color: #444444;\n          background-image: linear-gradient(90deg, #ffec00 7.30167%, #fcdd03 100%); }\n      .altrp-dashboard__controls .nav > .nav-item.nav-datepickers {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(50%, 1fr)); }\n        .altrp-dashboard__controls .nav > .nav-item.nav-datepickers > .nav-datepicker {\n          width: 100%; }\n          .altrp-dashboard__controls .nav > .nav-item.nav-datepickers > .nav-datepicker > .react-datepicker-wrapper\n> .react-datepicker__input-container\n> .form-control {\n            max-width: unset;\n            width: 100%;\n            border: 1px solid #6d6c6c;\n            padding: 8px; }\n          .altrp-dashboard__controls .nav > .nav-item.nav-datepickers > .nav-datepicker:last-child > .react-datepicker-wrapper\n> .react-datepicker__input-container\n> .last {\n            border-left: 0;\n            max-width: unset;\n            width: 100%; }\n  @media print {\n    .altrp-dashboard__controls .dropdown {\n      overflow: hidden;\n      height: 0; } }\n  @media print {\n    .altrp-dashboard__controls .dropdown.show {\n      overflow: hidden;\n      height: 0; } }\n  .altrp-dashboard__controls .dropdown.show .dropdown-menu {\n    background-color: #fff;\n    z-index: 999;\n    min-width: 10rem;\n    background-clip: padding-box;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0.25rem;\n    display: flex;\n    flex-direction: column; }\n    .altrp-dashboard__controls .dropdown.show .dropdown-menu .dropdown-divider {\n      height: 0;\n      border-top: 1px solid #e9ecef; }\n    .altrp-dashboard__controls .dropdown.show .dropdown-menu .dropdown-item,\n    .altrp-dashboard__controls .dropdown.show .dropdown-menu .dropdown-item-text {\n      padding: 0.75rem 1.5rem;\n      font-weight: 400;\n      color: #212529;\n      text-decoration: none;\n      font-size: 0.9rem; }\n      .altrp-dashboard__controls .dropdown.show .dropdown-menu .dropdown-item:hover,\n      .altrp-dashboard__controls .dropdown.show .dropdown-menu .dropdown-item-text:hover {\n        background-color: #eeeeee; }\n      .altrp-dashboard__controls .dropdown.show .dropdown-menu .dropdown-item .form-control,\n      .altrp-dashboard__controls .dropdown.show .dropdown-menu .dropdown-item-text .form-control {\n        background-color: transparent;\n        border: none; }\n\n.altrp-dashboard__widgets {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));\n  grid-gap: 10px; }\n  @media screen and (max-width: 560px) {\n    .altrp-dashboard__widgets {\n      grid-template-columns: repeat(1, [col-start] 1fr); } }\n  .altrp-dashboard__widgets .card {\n    width: 100%;\n    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);\n    padding: 25px 10px; }\n    .altrp-dashboard__widgets .card-header {\n      display: flex;\n      justify-content: space-between;\n      margin: 0 15px 10px; }\n      .altrp-dashboard__widgets .card-header .card-title button {\n        background-color: transparent;\n        padding: 5px 0px; }\n      .altrp-dashboard__widgets .card-header .card-title > .dropdownTogglerContainer\n> .dropleft\n> .dropdownMenuToggle {\n        background-color: white;\n        margin-right: 5px;\n        padding: 3px;\n        border-radius: 4px;\n        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15); }\n      .altrp-dashboard__widgets .card-header .card-title > .dropdownTogglerContainer\n> .dropleft\n> .dropdownMenuToggle\n> .dropdown-item {\n        padding: 0 5px; }\n      .altrp-dashboard__widgets .card-header .card-title > .dropdownTogglerContainer\n> .dropleft\n> .dropdownMenuToggle.show {\n        transition: opacity 0.2s linear; }\n    .altrp-dashboard__widgets .card-body .card {\n      box-sizing: border-box;\n      word-wrap: break-word;\n      margin-left: 15px;\n      margin-right: 15px;\n      width: calc(100% - 30px);\n      border: 0;\n      box-shadow: none; }\n    .altrp-dashboard__widgets .card-body form {\n      padding: 10px 0; }\n      .altrp-dashboard__widgets .card-body form .form-group {\n        width: 100%;\n        margin-bottom: 10px; }\n        .altrp-dashboard__widgets .card-body form .form-group label {\n          font-size: 0.8rem; }\n        .altrp-dashboard__widgets .card-body form .form-group input,\n        .altrp-dashboard__widgets .card-body form .form-group select {\n          width: 100%; }\n      .altrp-dashboard__widgets .card-body form .form-check {\n        display: flex;\n        align-items: center; }\n        .altrp-dashboard__widgets .card-body form .form-check .form-check-input {\n          width: 30px; }\n    .altrp-dashboard__widgets .card-footer {\n      margin-top: 15px;\n      display: flex;\n      justify-content: space-between; }\n\n.widget-table {\n  overflow: auto;\n  width: 100%;\n  height: 100%; }\n  .widget-table table {\n    border-collapse: collapse;\n    width: 100%;\n    font-size: 0.8rem; }\n    .widget-table table.vertical-table tbody td:first-child {\n      background-color: #f0f0f0;\n      color: #666666;\n      width: 50%;\n      font-weight: 600; }\n    .widget-table table thead th,\n    .widget-table table tbody td {\n      border-collapse: collapse;\n      border: 1px solid rgba(0, 0, 0, 0.125);\n      padding: 0.3rem 0.5rem; }\n    .widget-table table thead {\n      background-color: #f0f0f0;\n      color: #666666;\n      font-weight: 600; }\n\n.altrp-chart {\n  display: flex;\n  flex-direction: column; }\n  .altrp-chart.left {\n    flex-direction: row-reverse; }\n  .altrp-chart.top {\n    flex-direction: column-reverse; }\n  .altrp-chart.bottom {\n    box-sizing: border-box;\n    word-wrap: break-word;\n    margin-left: 15px;\n    margin-right: 15px;\n    width: calc(100% - 30px);\n    margin: 0 auto !important;\n    height: 100%;\n    max-height: 100%; }\n    .altrp-chart.bottom > .widget-table {\n      overflow: auto; }\n  .altrp-chart.right {\n    flex-direction: row; }\n\n.discrete__legend {\n  overflow: unset !important;\n  flex-wrap: wrap; }\n  .discrete__legend > div {\n    padding: 4px 8px !important; }\n  .discrete__legend-item span {\n    font-weight: 500; }\n  .discrete__legend-item:first-child {\n    padding-left: 8px !important; }\n\n.chart__tooltip {\n  z-index: 99999; }\n\n.altrp-image-select {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; }\n  .altrp-image-select img {\n    flex-grow: 1;\n    object-fit: contain; }\n  .altrp-image-select .altrp-field {\n    width: 200px;\n    height: 200px;\n    overflow: hidden;\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between; }\n    .altrp-image-select .altrp-field.active {\n      border-color: lightcoral; }\n  .altrp-image-select .altrp-field-label {\n    text-align: center;\n    display: block; }\n\n@media screen and (min-width: 1441px) {\n  .hide_on_wide_screen {\n    display: none; } }\n\n@media screen and (max-width: 1440px) and (min-width: 1025px) {\n  .hide_on_desktop {\n    display: none; } }\n\n@media screen and (max-width: 1024px) and (min-width: 769px) {\n  .hide_on_laptop {\n    display: none; } }\n\n@media screen and (max-width: 768px) and (min-width: 451px) {\n  .hide_on_tablet {\n    display: none; } }\n\n@media screen and (max-width: 450px) and (min-width: 321px) {\n  .hide_on_big_phone {\n    display: none; } }\n\n@media screen and (max-width: 320px) {\n  .hide_on_small_phone {\n    display: none; } }\n\n/*\r\n * CKEditor 5 (v24.0.0) content styles.\r\n * Generated on Thu, 10 Dec 2020 08:15:26 GMT.\r\n * For more information, check out https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/content-styles.html\r\n */\n:root {\n  --ck-color-mention-background: hsla(341, 100%, 30%, 0.1);\n  --ck-color-mention-text: hsl(341, 100%, 30%);\n  --ck-highlight-marker-blue: hsl(201, 97%, 72%);\n  --ck-highlight-marker-green: hsl(120, 93%, 68%);\n  --ck-highlight-marker-pink: hsl(345, 96%, 73%);\n  --ck-highlight-marker-yellow: hsl(60, 97%, 73%);\n  --ck-highlight-pen-green: hsl(112, 100%, 27%);\n  --ck-highlight-pen-red: hsl(0, 85%, 49%);\n  --ck-image-style-spacing: 1.5em;\n  --ck-todo-list-checkmark-size: 16px; }\n\n/* ckeditor5-image/theme/imageresize.css */\n.ck-content .image.image_resized {\n  max-width: 100%;\n  display: block;\n  box-sizing: border-box; }\n\n/* ckeditor5-image/theme/imageresize.css */\n.ck-content .image.image_resized img {\n  width: 100%; }\n\n/* ckeditor5-image/theme/imageresize.css */\n.ck-content .image.image_resized > figcaption {\n  display: block; }\n\n/* ckeditor5-image/theme/imagestyle.css */\n.ck-content .image-style-side {\n  float: right;\n  margin-left: var(--ck-image-style-spacing);\n  max-width: 50%; }\n\n/* ckeditor5-image/theme/imagestyle.css */\n.ck-content .image-style-align-left {\n  float: left;\n  margin-right: var(--ck-image-style-spacing); }\n\n/* ckeditor5-image/theme/imagestyle.css */\n.ck-content .image-style-align-center {\n  margin-left: auto;\n  margin-right: auto; }\n\n/* ckeditor5-image/theme/imagestyle.css */\n.ck-content .image-style-align-right {\n  float: right;\n  margin-left: var(--ck-image-style-spacing); }\n\n/* ckeditor5-image/theme/image.css */\n.ck-content .image {\n  display: table;\n  clear: both;\n  text-align: center;\n  margin: 1em auto; }\n\n/* ckeditor5-image/theme/image.css */\n.ck-content .image img {\n  display: block;\n  margin: 0 auto;\n  max-width: 100%;\n  min-width: 50px; }\n\n/* ckeditor5-image/theme/imagecaption.css */\n.ck-content .image > figcaption {\n  display: table-caption;\n  caption-side: bottom;\n  word-break: break-word;\n  color: #333333;\n  background-color: #f7f7f7;\n  padding: 0.6em;\n  font-size: 0.75em;\n  outline-offset: -1px; }\n\n/* ckeditor5-highlight/theme/highlight.css */\n.ck-content .marker-yellow {\n  background-color: var(--ck-highlight-marker-yellow); }\n\n/* ckeditor5-highlight/theme/highlight.css */\n.ck-content .marker-green {\n  background-color: var(--ck-highlight-marker-green); }\n\n/* ckeditor5-highlight/theme/highlight.css */\n.ck-content .marker-pink {\n  background-color: var(--ck-highlight-marker-pink); }\n\n/* ckeditor5-highlight/theme/highlight.css */\n.ck-content .marker-blue {\n  background-color: var(--ck-highlight-marker-blue); }\n\n/* ckeditor5-highlight/theme/highlight.css */\n.ck-content .pen-red {\n  color: var(--ck-highlight-pen-red);\n  background-color: transparent; }\n\n/* ckeditor5-highlight/theme/highlight.css */\n.ck-content .pen-green {\n  color: var(--ck-highlight-pen-green);\n  background-color: transparent; }\n\n/* ckeditor5-font/theme/fontsize.css */\n.ck-content .text-tiny {\n  font-size: 0.7em; }\n\n/* ckeditor5-font/theme/fontsize.css */\n.ck-content .text-small {\n  font-size: 0.85em; }\n\n/* ckeditor5-font/theme/fontsize.css */\n.ck-content .text-big {\n  font-size: 1.4em; }\n\n/* ckeditor5-font/theme/fontsize.css */\n.ck-content .text-huge {\n  font-size: 1.8em; }\n\n/* ckeditor5-block-quote/theme/blockquote.css */\n.ck-content blockquote {\n  overflow: hidden;\n  padding-right: 1.5em;\n  padding-left: 1.5em;\n  margin-left: 0;\n  margin-right: 0;\n  font-style: italic;\n  border-left: solid 5px #cccccc; }\n\n/* ckeditor5-block-quote/theme/blockquote.css */\n.ck-content[dir=\"rtl\"] blockquote {\n  border-left: 0;\n  border-right: solid 5px #cccccc; }\n\n/* ckeditor5-basic-styles/theme/code.css */\n.ck-content code {\n  background-color: rgba(199, 199, 199, 0.3);\n  padding: 0.15em;\n  border-radius: 2px; }\n\n/* ckeditor5-table/theme/table.css */\n.ck-content .table {\n  margin: 1em auto;\n  display: table; }\n\n/* ckeditor5-table/theme/table.css */\n.ck-content .table table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  width: 100%;\n  height: 100%;\n  border: 1px double #b3b3b3; }\n\n/* ckeditor5-table/theme/table.css */\n.ck-content .table table td,\n.ck-content .table table th {\n  min-width: 2em;\n  padding: 0.4em;\n  border: 1px solid #bfbfbf; }\n\n/* ckeditor5-table/theme/table.css */\n.ck-content .table table th {\n  font-weight: bold;\n  background: black; }\n\n/* ckeditor5-table/theme/table.css */\n.ck-content[dir=\"rtl\"] .table th {\n  text-align: right; }\n\n/* ckeditor5-table/theme/table.css */\n.ck-content[dir=\"ltr\"] .table th {\n  text-align: left; }\n\n/* ckeditor5-page-break/theme/pagebreak.css */\n.ck-content .page-break {\n  position: relative;\n  clear: both;\n  padding: 5px 0;\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n/* ckeditor5-page-break/theme/pagebreak.css */\n.ck-content .page-break::after {\n  content: \"\";\n  position: absolute;\n  border-bottom: 2px dashed #c4c4c4;\n  width: 100%; }\n\n/* ckeditor5-page-break/theme/pagebreak.css */\n.ck-content .page-break__label {\n  position: relative;\n  z-index: 1;\n  padding: 0.3em 0.6em;\n  display: block;\n  text-transform: uppercase;\n  border: 1px solid #c4c4c4;\n  border-radius: 2px;\n  font-family: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;\n  font-size: 0.75em;\n  font-weight: bold;\n  color: #333333;\n  background: white;\n  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.15);\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/* ckeditor5-media-embed/theme/mediaembed.css */\n.ck-content .media {\n  clear: both;\n  margin: 1em 0;\n  display: block;\n  min-width: 15em; }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list {\n  list-style: none; }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list li {\n  margin-bottom: 5px; }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list li .todo-list {\n  margin-top: 5px; }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list .todo-list__label > input {\n  -webkit-appearance: none;\n  display: inline-block;\n  position: relative;\n  width: var(--ck-todo-list-checkmark-size);\n  height: var(--ck-todo-list-checkmark-size);\n  vertical-align: middle;\n  border: 0;\n  left: -25px;\n  margin-right: -15px;\n  right: 0;\n  margin-left: 0; }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list .todo-list__label > input::before {\n  display: block;\n  position: absolute;\n  box-sizing: border-box;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  border: 1px solid #333333;\n  border-radius: 2px;\n  transition: 250ms ease-in-out box-shadow, 250ms ease-in-out background,\r 250ms ease-in-out border; }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list .todo-list__label > input::after {\n  display: block;\n  position: absolute;\n  box-sizing: content-box;\n  pointer-events: none;\n  content: \"\";\n  left: calc(var(--ck-todo-list-checkmark-size) / 3);\n  top: calc(var(--ck-todo-list-checkmark-size) / 5.3);\n  width: calc(var(--ck-todo-list-checkmark-size) / 5.3);\n  height: calc(var(--ck-todo-list-checkmark-size) / 2.6);\n  border-style: solid;\n  border-color: transparent;\n  border-width: 0 calc(var(--ck-todo-list-checkmark-size) / 8) calc(var(--ck-todo-list-checkmark-size) / 8) 0;\n  transform: rotate(45deg); }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list .todo-list__label > input[checked]::before {\n  background: #26ab33;\n  border-color: #26ab33; }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list .todo-list__label > input[checked]::after {\n  border-color: white; }\n\n/* ckeditor5-list/theme/todolist.css */\n.ck-content .todo-list .todo-list__label .todo-list__label__description {\n  vertical-align: middle; }\n\n/* ckeditor5-html-embed/theme/htmlembed.css */\n.ck-content .raw-html-embed {\n  margin: 1em auto;\n  min-width: 15em;\n  font-style: normal; }\n\n/* ckeditor5-horizontal-line/theme/horizontalline.css */\n.ck-content hr {\n  margin: 15px 0;\n  height: 4px;\n  background: #dedede;\n  border: 0; }\n\n/* ckeditor5-code-block/theme/codeblock.css */\n.ck-content pre {\n  padding: 1em;\n  color: #353535;\n  background: rgba(199, 199, 199, 0.3);\n  border: 1px solid #c4c4c4;\n  border-radius: 2px;\n  text-align: left;\n  direction: ltr;\n  tab-size: 4;\n  white-space: pre-wrap;\n  font-style: normal;\n  min-width: 200px; }\n\n/* ckeditor5-code-block/theme/codeblock.css */\n.ck-content pre code {\n  background: unset;\n  padding: 0;\n  border-radius: 0; }\n\n/* ckeditor5-mention/theme/mention.css */\n.ck-content .mention {\n  background: var(--ck-color-mention-background);\n  color: var(--ck-color-mention-text); }\n\n@media print {\n  /* ckeditor5-page-break/theme/pagebreak.css */\n  .ck-content .page-break {\n    padding: 0; }\n  /* ckeditor5-page-break/theme/pagebreak.css */\n  .ck-content .page-break::after {\n    display: none; } }\n\n.front-app {\n  position: relative;\n  z-index: 50; }\n  .front-app-content_test {\n    padding-bottom: 100px; }\n  .front-app_admin {\n    padding-top: 25px; }\n\n@media screen and (max-width: 910px) {\n  .admin-bar {\n    display: none; }\n  .front-app_admin {\n    padding-top: 0; } }\n", ""]);

// exports


      /***/ }),

    /***/ "./node_modules/css-loader/lib/css-base.js":
    /*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

      /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
      module.exports = function(useSourceMap) {
        var list = [];

        // return the list of modules as css string
        list.toString = function toString() {
          return this.map(function (item) {
            var content = cssWithMappingToString(item, useSourceMap);
            if(item[2]) {
              return "@media " + item[2] + "{" + content + "}";
            } else {
              return content;
            }
          }).join("");
        };

        // import a list of modules into the list
        list.i = function(modules, mediaQuery) {
          if(typeof modules === "string")
            modules = [[null, modules, ""]];
          var alreadyImportedModules = {};
          for(var i = 0; i < this.length; i++) {
            var id = this[i][0];
            if(typeof id === "number")
              alreadyImportedModules[id] = true;
          }
          for(i = 0; i < modules.length; i++) {
            var item = modules[i];
            // skip already imported module
            // this implementation is not 100% perfect for weird media query combinations
            //  when a module is imported multiple times with different media queries.
            //  I hope this will never occur (Hey this way we have smaller bundles)
            if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
              if(mediaQuery && !item[2]) {
                item[2] = mediaQuery;
              } else if(mediaQuery) {
                item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
              }
              list.push(item);
            }
          }
        };
        return list;
      };

      function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || '';
        var cssMapping = item[3];
        if (!cssMapping) {
          return content;
        }

        if (useSourceMap && typeof btoa === 'function') {
          var sourceMapping = toComment(cssMapping);
          var sourceURLs = cssMapping.sources.map(function (source) {
            return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
          });

          return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
        }

        return [content].join('\n');
      }

// Adapted from convert-source-map (MIT)
      function toComment(sourceMap) {
        // eslint-disable-next-line no-undef
        var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
        var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

        return '/*# ' + data + ' */';
      }


      /***/ }),

    /***/ "./node_modules/events/events.js":
    /*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



      var R = typeof Reflect === 'object' ? Reflect : null
      var ReflectApply = R && typeof R.apply === 'function'
        ? R.apply
        : function ReflectApply(target, receiver, args) {
          return Function.prototype.apply.call(target, receiver, args);
        }

      var ReflectOwnKeys
      if (R && typeof R.ownKeys === 'function') {
        ReflectOwnKeys = R.ownKeys
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys(target) {
          return Object.getOwnPropertyNames(target)
            .concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys(target) {
          return Object.getOwnPropertyNames(target);
        };
      }

      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }

      var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
        return value !== value;
      }

      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;

// Backwards-compat with node 0.10.x
      EventEmitter.EventEmitter = EventEmitter;

      EventEmitter.prototype._events = undefined;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
      var defaultMaxListeners = 10;

      function checkListener(listener) {
        if (typeof listener !== 'function') {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }

      Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
          }
          defaultMaxListeners = arg;
        }
      });

      EventEmitter.init = function() {

        if (this._events === undefined ||
          this._events === Object.getPrototypeOf(this)._events) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        }

        this._maxListeners = this._maxListeners || undefined;
      };

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
        }
        this._maxListeners = n;
        return this;
      };

      function _getMaxListeners(that) {
        if (that._maxListeners === undefined)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }

      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };

      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = (type === 'error');

        var events = this._events;
        if (events !== undefined)
          doError = (doError && events.error === undefined);
        else if (!doError)
          return false;

        // If there is no 'error' event listener then throw.
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
          }
          // At least give some kind of context to the user
          var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
          err.context = er;
          throw err; // Unhandled 'error' event
        }

        var handler = events[type];

        if (handler === undefined)
          return false;

        if (typeof handler === 'function') {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }

        return true;
      };

      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;

        checkListener(listener);

        events = target._events;
        if (events === undefined) {
          events = target._events = Object.create(null);
          target._eventsCount = 0;
        } else {
          // To avoid recursion in the case that type === "newListener"! Before
          // adding it to the listeners, first emit "newListener".
          if (events.newListener !== undefined) {
            target.emit('newListener', type,
              listener.listener ? listener.listener : listener);

            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
          }
          existing = events[type];
        }

        if (existing === undefined) {
          // Optimize the case of one listener. Don't need the extra array object.
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] =
              prepend ? [listener, existing] : [existing, listener];
            // If we've already got an array, just append.
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }

          // Check for listener leak
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' +
              existing.length + ' ' + String(type) + ' listeners ' +
              'added. Use emitter.setMaxListeners() to ' +
              'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }

        return target;
      }

      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };

      EventEmitter.prototype.on = EventEmitter.prototype.addListener;

      EventEmitter.prototype.prependListener =
        function prependListener(type, listener) {
          return _addListener(this, type, listener, true);
        };

      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }

      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }

      EventEmitter.prototype.once = function once(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };

      EventEmitter.prototype.prependOnceListener =
        function prependOnceListener(type, listener) {
          checkListener(listener);
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        };

// Emits a 'removeListener' event if and only if the listener was removed.
      EventEmitter.prototype.removeListener =
        function removeListener(type, listener) {
          var list, events, position, i, originalListener;

          checkListener(listener);

          events = this._events;
          if (events === undefined)
            return this;

          list = events[type];
          if (list === undefined)
            return this;

          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else {
              delete events[type];
              if (events.removeListener)
                this.emit('removeListener', type, list.listener || listener);
            }
          } else if (typeof list !== 'function') {
            position = -1;

            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }

            if (position < 0)
              return this;

            if (position === 0)
              list.shift();
            else {
              spliceOne(list, position);
            }

            if (list.length === 1)
              events[type] = list[0];

            if (events.removeListener !== undefined)
              this.emit('removeListener', type, originalListener || listener);
          }

          return this;
        };

      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

      EventEmitter.prototype.removeAllListeners =
        function removeAllListeners(type) {
          var listeners, events, i;

          events = this._events;
          if (events === undefined)
            return this;

          // not listening for removeListener, no need to emit
          if (events.removeListener === undefined) {
            if (arguments.length === 0) {
              this._events = Object.create(null);
              this._eventsCount = 0;
            } else if (events[type] !== undefined) {
              if (--this._eventsCount === 0)
                this._events = Object.create(null);
              else
                delete events[type];
            }
            return this;
          }

          // emit removeListener for all listeners on all events
          if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === 'removeListener') continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
          }

          listeners = events[type];

          if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
          } else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }

          return this;
        };

      function _listeners(target, type, unwrap) {
        var events = target._events;

        if (events === undefined)
          return [];

        var evlistener = events[type];
        if (evlistener === undefined)
          return [];

        if (typeof evlistener === 'function')
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];

        return unwrap ?
          unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }

      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };

      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };

      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === 'function') {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };

      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;

        if (events !== undefined) {
          var evlistener = events[type];

          if (typeof evlistener === 'function') {
            return 1;
          } else if (evlistener !== undefined) {
            return evlistener.length;
          }
        }

        return 0;
      }

      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };

      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }

      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }

      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }

      function once(emitter, name) {
        return new Promise(function (resolve, reject) {
          function eventListener() {
            if (errorListener !== undefined) {
              emitter.removeListener('error', errorListener);
            }
            resolve([].slice.call(arguments));
          };
          var errorListener;

          // Adding an error listener is not optional because
          // if an error is thrown on an event emitter we cannot
          // guarantee that the actual event we are waiting will
          // be fired. The result could be a silent way to create
          // memory or file descriptor leaks, which is something
          // we should avoid.
          if (name !== 'error') {
            errorListener = function errorListener(err) {
              emitter.removeListener(name, eventListener);
              reject(err);
            };

            emitter.once('error', errorListener);
          }

          emitter.once(name, eventListener);
        });
      }


      /***/ }),

    /***/ "./node_modules/html-entities/lib/html4-entities.js":
    /*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
      var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
      var alphaIndex = {};
      var numIndex = {};
      (function () {
        var i = 0;
        var length = HTML_ALPHA.length;
        while (i < length) {
          var a = HTML_ALPHA[i];
          var c = HTML_CODES[i];
          alphaIndex[a] = String.fromCharCode(c);
          numIndex[c] = a;
          i++;
        }
      })();
      var Html4Entities = /** @class */ (function () {
        function Html4Entities() {
        }
        Html4Entities.prototype.decode = function (str) {
          if (!str || !str.length) {
            return '';
          }
          return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
            var chr;
            if (entity.charAt(0) === "#") {
              var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));
              if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
              }
            }
            else {
              chr = alphaIndex[entity];
            }
            return chr || s;
          });
        };
        Html4Entities.decode = function (str) {
          return new Html4Entities().decode(str);
        };
        Html4Entities.prototype.encode = function (str) {
          if (!str || !str.length) {
            return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
            var alpha = numIndex[str.charCodeAt(i)];
            result += alpha ? "&" + alpha + ";" : str.charAt(i);
            i++;
          }
          return result;
        };
        Html4Entities.encode = function (str) {
          return new Html4Entities().encode(str);
        };
        Html4Entities.prototype.encodeNonUTF = function (str) {
          if (!str || !str.length) {
            return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
            var cc = str.charCodeAt(i);
            var alpha = numIndex[cc];
            if (alpha) {
              result += "&" + alpha + ";";
            }
            else if (cc < 32 || cc > 126) {
              result += "&#" + cc + ";";
            }
            else {
              result += str.charAt(i);
            }
            i++;
          }
          return result;
        };
        Html4Entities.encodeNonUTF = function (str) {
          return new Html4Entities().encodeNonUTF(str);
        };
        Html4Entities.prototype.encodeNonASCII = function (str) {
          if (!str || !str.length) {
            return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
              result += str[i++];
              continue;
            }
            result += '&#' + c + ';';
            i++;
          }
          return result;
        };
        Html4Entities.encodeNonASCII = function (str) {
          return new Html4Entities().encodeNonASCII(str);
        };
        return Html4Entities;
      }());
      exports.Html4Entities = Html4Entities;


      /***/ }),

    /***/ "./node_modules/html-entities/lib/html5-entities.js":
    /*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
      var alphaIndex = {};
      var charIndex = {};
      createIndexes(alphaIndex, charIndex);
      var Html5Entities = /** @class */ (function () {
        function Html5Entities() {
        }
        Html5Entities.prototype.decode = function (str) {
          if (!str || !str.length) {
            return '';
          }
          return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
            var chr;
            if (entity.charAt(0) === "#") {
              var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));
              if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
              }
            }
            else {
              chr = alphaIndex[entity];
            }
            return chr || s;
          });
        };
        Html5Entities.decode = function (str) {
          return new Html5Entities().decode(str);
        };
        Html5Entities.prototype.encode = function (str) {
          if (!str || !str.length) {
            return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
            var charInfo = charIndex[str.charCodeAt(i)];
            if (charInfo) {
              var alpha = charInfo[str.charCodeAt(i + 1)];
              if (alpha) {
                i++;
              }
              else {
                alpha = charInfo[''];
              }
              if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
              }
            }
            result += str.charAt(i);
            i++;
          }
          return result;
        };
        Html5Entities.encode = function (str) {
          return new Html5Entities().encode(str);
        };
        Html5Entities.prototype.encodeNonUTF = function (str) {
          if (!str || !str.length) {
            return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
            var c = str.charCodeAt(i);
            var charInfo = charIndex[c];
            if (charInfo) {
              var alpha = charInfo[str.charCodeAt(i + 1)];
              if (alpha) {
                i++;
              }
              else {
                alpha = charInfo[''];
              }
              if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
              }
            }
            if (c < 32 || c > 126) {
              result += '&#' + c + ';';
            }
            else {
              result += str.charAt(i);
            }
            i++;
          }
          return result;
        };
        Html5Entities.encodeNonUTF = function (str) {
          return new Html5Entities().encodeNonUTF(str);
        };
        Html5Entities.prototype.encodeNonASCII = function (str) {
          if (!str || !str.length) {
            return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
              result += str[i++];
              continue;
            }
            result += '&#' + c + ';';
            i++;
          }
          return result;
        };
        Html5Entities.encodeNonASCII = function (str) {
          return new Html5Entities().encodeNonASCII(str);
        };
        return Html5Entities;
      }());
      exports.Html5Entities = Html5Entities;
      function createIndexes(alphaIndex, charIndex) {
        var i = ENTITIES.length;
        while (i--) {
          var e = ENTITIES[i];
          var alpha = e[0];
          var chars = e[1];
          var chr = chars[0];
          var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
          var charInfo = void 0;
          if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
          }
          if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            addChar && (charInfo[chr2] = alpha);
          }
          else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            addChar && (charInfo[''] = alpha);
          }
        }
      }


      /***/ }),

    /***/ "./node_modules/html-entities/lib/index.js":
    /*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var xml_entities_1 = __webpack_require__(/*! ./xml-entities */ "./node_modules/html-entities/lib/xml-entities.js");
      exports.XmlEntities = xml_entities_1.XmlEntities;
      var html4_entities_1 = __webpack_require__(/*! ./html4-entities */ "./node_modules/html-entities/lib/html4-entities.js");
      exports.Html4Entities = html4_entities_1.Html4Entities;
      var html5_entities_1 = __webpack_require__(/*! ./html5-entities */ "./node_modules/html-entities/lib/html5-entities.js");
      exports.Html5Entities = html5_entities_1.Html5Entities;
      exports.AllHtmlEntities = html5_entities_1.Html5Entities;


      /***/ }),

    /***/ "./node_modules/html-entities/lib/xml-entities.js":
    /*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var ALPHA_INDEX = {
        '&lt': '<',
        '&gt': '>',
        '&quot': '"',
        '&apos': '\'',
        '&amp': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': '\'',
        '&amp;': '&'
      };
      var CHAR_INDEX = {
        60: 'lt',
        62: 'gt',
        34: 'quot',
        39: 'apos',
        38: 'amp'
      };
      var CHAR_S_INDEX = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;',
        '&': '&amp;'
      };
      var XmlEntities = /** @class */ (function () {
        function XmlEntities() {
        }
        XmlEntities.prototype.encode = function (str) {
          if (!str || !str.length) {
            return '';
          }
          return str.replace(/[<>"'&]/g, function (s) {
            return CHAR_S_INDEX[s];
          });
        };
        XmlEntities.encode = function (str) {
          return new XmlEntities().encode(str);
        };
        XmlEntities.prototype.decode = function (str) {
          if (!str || !str.length) {
            return '';
          }
          return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
            if (s.charAt(1) === '#') {
              var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));
              if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
              }
              return String.fromCharCode(code);
            }
            return ALPHA_INDEX[s] || s;
          });
        };
        XmlEntities.decode = function (str) {
          return new XmlEntities().decode(str);
        };
        XmlEntities.prototype.encodeNonUTF = function (str) {
          if (!str || !str.length) {
            return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
            var c = str.charCodeAt(i);
            var alpha = CHAR_INDEX[c];
            if (alpha) {
              result += "&" + alpha + ";";
              i++;
              continue;
            }
            if (c < 32 || c > 126) {
              result += '&#' + c + ';';
            }
            else {
              result += str.charAt(i);
            }
            i++;
          }
          return result;
        };
        XmlEntities.encodeNonUTF = function (str) {
          return new XmlEntities().encodeNonUTF(str);
        };
        XmlEntities.prototype.encodeNonASCII = function (str) {
          if (!str || !str.length) {
            return '';
          }
          var strLenght = str.length;
          var result = '';
          var i = 0;
          while (i < strLenght) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
              result += str[i++];
              continue;
            }
            result += '&#' + c + ';';
            i++;
          }
          return result;
        };
        XmlEntities.encodeNonASCII = function (str) {
          return new XmlEntities().encodeNonASCII(str);
        };
        return XmlEntities;
      }());
      exports.XmlEntities = XmlEntities;


      /***/ }),

    /***/ "./node_modules/loglevel/lib/loglevel.js":
    /*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
      (function (root, definition) {
        "use strict";
        if (true) {
          !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
              (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
              __WEBPACK_AMD_DEFINE_FACTORY__),
          __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {}
      }(this, function () {
        "use strict";

        // Slightly dubious tricks to cut down minimized file size
        var noop = function() {};
        var undefinedType = "undefined";
        var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
          /Trident\/|MSIE /.test(window.navigator.userAgent)
        );

        var logMethods = [
          "trace",
          "debug",
          "info",
          "warn",
          "error"
        ];

        // Cross-browser bind equivalent that works at least back to IE6
        function bindMethod(obj, methodName) {
          var method = obj[methodName];
          if (typeof method.bind === 'function') {
            return method.bind(obj);
          } else {
            try {
              return Function.prototype.bind.call(method, obj);
            } catch (e) {
              // Missing bind shim or IE8 + Modernizr, fallback to wrapping
              return function() {
                return Function.prototype.apply.apply(method, [obj, arguments]);
              };
            }
          }
        }

        // Trace() doesn't print the message in IE, so for that case we need to wrap it
        function traceForIE() {
          if (console.log) {
            if (console.log.apply) {
              console.log.apply(console, arguments);
            } else {
              // In old IE, native console methods themselves don't have apply().
              Function.prototype.apply.apply(console.log, [console, arguments]);
            }
          }
          if (console.trace) console.trace();
        }

        // Build the best logging method possible for this env
        // Wherever possible we want to bind, not wrap, to preserve stack traces
        function realMethod(methodName) {
          if (methodName === 'debug') {
            methodName = 'log';
          }

          if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
          } else if (methodName === 'trace' && isIE) {
            return traceForIE;
          } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
          } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
          } else {
            return noop;
          }
        }

        // These private functions always need `this` to be set properly

        function replaceLoggingMethods(level, loggerName) {
          /*jshint validthis:true */
          for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
              noop :
              this.methodFactory(methodName, level, loggerName);
          }

          // Define log.log as an alias for log.debug
          this.log = this.debug;
        }

        // In old IE versions, the console isn't present until you first open it.
        // We build realMethod() replacements here that regenerate logging methods
        function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
          return function () {
            if (typeof console !== undefinedType) {
              replaceLoggingMethods.call(this, level, loggerName);
              this[methodName].apply(this, arguments);
            }
          };
        }

        // By default, we use closely bound real methods wherever possible, and
        // otherwise we wait for a console to appear, and then try again.
        function defaultMethodFactory(methodName, level, loggerName) {
          /*jshint validthis:true */
          return realMethod(methodName) ||
            enableLoggingWhenConsoleArrives.apply(this, arguments);
        }

        function Logger(name, defaultLevel, factory) {
          var self = this;
          var currentLevel;
          var storageKey = "loglevel";
          if (name) {
            storageKey += ":" + name;
          }

          function persistLevelIfPossible(levelNum) {
            var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

            if (typeof window === undefinedType) return;

            // Use localStorage if available
            try {
              window.localStorage[storageKey] = levelName;
              return;
            } catch (ignore) {}

            // Use session cookie as fallback
            try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
            } catch (ignore) {}
          }

          function getPersistedLevel() {
            var storedLevel;

            if (typeof window === undefinedType) return;

            try {
              storedLevel = window.localStorage[storageKey];
            } catch (ignore) {}

            // Fallback to cookies if local storage gives us nothing
            if (typeof storedLevel === undefinedType) {
              try {
                var cookie = window.document.cookie;
                var location = cookie.indexOf(
                  encodeURIComponent(storageKey) + "=");
                if (location !== -1) {
                  storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                }
              } catch (ignore) {}
            }

            // If the stored level is not valid, treat it as if nothing was stored.
            if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
            }

            return storedLevel;
          }

          /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

          self.name = name;

          self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
            "ERROR": 4, "SILENT": 5};

          self.methodFactory = factory || defaultMethodFactory;

          self.getLevel = function () {
            return currentLevel;
          };

          self.setLevel = function (level, persist) {
            if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
            }
            if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                return "No console available for logging";
              }
            } else {
              throw "log.setLevel() called with invalid level: " + level;
            }
          };

          self.setDefaultLevel = function (level) {
            if (!getPersistedLevel()) {
              self.setLevel(level, false);
            }
          };

          self.enableAll = function(persist) {
            self.setLevel(self.levels.TRACE, persist);
          };

          self.disableAll = function(persist) {
            self.setLevel(self.levels.SILENT, persist);
          };

          // Initialize with the right level
          var initialLevel = getPersistedLevel();
          if (initialLevel == null) {
            initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
          }
          self.setLevel(initialLevel, false);
        }

        /*
     *
     * Top-level API
     *
     */

        var defaultLogger = new Logger();

        var _loggersByName = {};
        defaultLogger.getLogger = function getLogger(name) {
          if (typeof name !== "string" || name === "") {
            throw new TypeError("You must supply a name when creating a logger.");
          }

          var logger = _loggersByName[name];
          if (!logger) {
            logger = _loggersByName[name] = new Logger(
              name, defaultLogger.getLevel(), defaultLogger.methodFactory);
          }
          return logger;
        };

        // Grab the current global log variable in case of overwrite
        var _log = (typeof window !== undefinedType) ? window.log : undefined;
        defaultLogger.noConflict = function() {
          if (typeof window !== undefinedType &&
            window.log === defaultLogger) {
            window.log = _log;
          }

          return defaultLogger;
        };

        defaultLogger.getLoggers = function getLoggers() {
          return _loggersByName;
        };

        return defaultLogger;
      }));


      /***/ }),

    /***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
    /*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      /* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
        ;(function(root) {

          /** Detect free variables */
          var freeExports =  true && exports &&
            !exports.nodeType && exports;
          var freeModule =  true && module &&
            !module.nodeType && module;
          var freeGlobal = typeof global == 'object' && global;
          if (
            freeGlobal.global === freeGlobal ||
            freeGlobal.window === freeGlobal ||
            freeGlobal.self === freeGlobal
          ) {
            root = freeGlobal;
          }

          /**
           * The `punycode` object.
           * @name punycode
           * @type Object
           */
          var punycode,

            /** Highest positive signed 32-bit float value */
            maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

            /** Bootstring parameters */
            base = 36,
            tMin = 1,
            tMax = 26,
            skew = 38,
            damp = 700,
            initialBias = 72,
            initialN = 128, // 0x80
            delimiter = '-', // '\x2D'

            /** Regular expressions */
            regexPunycode = /^xn--/,
            regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
            regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

            /** Error messages */
            errors = {
              'overflow': 'Overflow: input needs wider integers to process',
              'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
              'invalid-input': 'Invalid input'
            },

            /** Convenience shortcuts */
            baseMinusTMin = base - tMin,
            floor = Math.floor,
            stringFromCharCode = String.fromCharCode,

            /** Temporary variable */
            key;

          /*--------------------------------------------------------------------------*/

          /**
           * A generic error utility function.
           * @private
           * @param {String} type The error type.
           * @returns {Error} Throws a `RangeError` with the applicable error message.
           */
          function error(type) {
            throw new RangeError(errors[type]);
          }

          /**
           * A generic `Array#map` utility function.
           * @private
           * @param {Array} array The array to iterate over.
           * @param {Function} callback The function that gets called for every array
           * item.
           * @returns {Array} A new array of values returned by the callback function.
           */
          function map(array, fn) {
            var length = array.length;
            var result = [];
            while (length--) {
              result[length] = fn(array[length]);
            }
            return result;
          }

          /**
           * A simple `Array#map`-like wrapper to work with domain name strings or email
           * addresses.
           * @private
           * @param {String} domain The domain name or email address.
           * @param {Function} callback The function that gets called for every
           * character.
           * @returns {Array} A new string of characters returned by the callback
           * function.
           */
          function mapDomain(string, fn) {
            var parts = string.split('@');
            var result = '';
            if (parts.length > 1) {
              // In email addresses, only the domain name should be punycoded. Leave
              // the local part (i.e. everything up to `@`) intact.
              result = parts[0] + '@';
              string = parts[1];
            }
            // Avoid `split(regex)` for IE8 compatibility. See #17.
            string = string.replace(regexSeparators, '\x2E');
            var labels = string.split('.');
            var encoded = map(labels, fn).join('.');
            return result + encoded;
          }

          /**
           * Creates an array containing the numeric code points of each Unicode
           * character in the string. While JavaScript uses UCS-2 internally,
           * this function will convert a pair of surrogate halves (each of which
           * UCS-2 exposes as separate characters) into a single code point,
           * matching UTF-16.
           * @see `punycode.ucs2.encode`
           * @see <https://mathiasbynens.be/notes/javascript-encoding>
           * @memberOf punycode.ucs2
           * @name decode
           * @param {String} string The Unicode input string (UCS-2).
           * @returns {Array} The new array of code points.
           */
          function ucs2decode(string) {
            var output = [],
              counter = 0,
              length = string.length,
              value,
              extra;
            while (counter < length) {
              value = string.charCodeAt(counter++);
              if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                // high surrogate, and there is a next character
                extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                  output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                } else {
                  // unmatched surrogate; only append this code unit, in case the next
                  // code unit is the high surrogate of a surrogate pair
                  output.push(value);
                  counter--;
                }
              } else {
                output.push(value);
              }
            }
            return output;
          }

          /**
           * Creates a string based on an array of numeric code points.
           * @see `punycode.ucs2.decode`
           * @memberOf punycode.ucs2
           * @name encode
           * @param {Array} codePoints The array of numeric code points.
           * @returns {String} The new Unicode string (UCS-2).
           */
          function ucs2encode(array) {
            return map(array, function(value) {
              var output = '';
              if (value > 0xFFFF) {
                value -= 0x10000;
                output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                value = 0xDC00 | value & 0x3FF;
              }
              output += stringFromCharCode(value);
              return output;
            }).join('');
          }

          /**
           * Converts a basic code point into a digit/integer.
           * @see `digitToBasic()`
           * @private
           * @param {Number} codePoint The basic numeric code point value.
           * @returns {Number} The numeric value of a basic code point (for use in
           * representing integers) in the range `0` to `base - 1`, or `base` if
           * the code point does not represent a value.
           */
          function basicToDigit(codePoint) {
            if (codePoint - 48 < 10) {
              return codePoint - 22;
            }
            if (codePoint - 65 < 26) {
              return codePoint - 65;
            }
            if (codePoint - 97 < 26) {
              return codePoint - 97;
            }
            return base;
          }

          /**
           * Converts a digit/integer into a basic code point.
           * @see `basicToDigit()`
           * @private
           * @param {Number} digit The numeric value of a basic code point.
           * @returns {Number} The basic code point whose value (when used for
           * representing integers) is `digit`, which needs to be in the range
           * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
           * used; else, the lowercase form is used. The behavior is undefined
           * if `flag` is non-zero and `digit` has no uppercase form.
           */
          function digitToBasic(digit, flag) {
            //  0..25 map to ASCII a..z or A..Z
            // 26..35 map to ASCII 0..9
            return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
          }

          /**
           * Bias adaptation function as per section 3.4 of RFC 3492.
           * https://tools.ietf.org/html/rfc3492#section-3.4
           * @private
           */
          function adapt(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
              delta = floor(delta / baseMinusTMin);
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
          }

          /**
           * Converts a Punycode string of ASCII-only symbols to a string of Unicode
           * symbols.
           * @memberOf punycode
           * @param {String} input The Punycode string of ASCII-only symbols.
           * @returns {String} The resulting string of Unicode symbols.
           */
          function decode(input) {
            // Don't use UCS-2
            var output = [],
              inputLength = input.length,
              out,
              i = 0,
              n = initialN,
              bias = initialBias,
              basic,
              j,
              index,
              oldi,
              w,
              k,
              digit,
              t,
              /** Cached calculation results */
              baseMinusT;

            // Handle the basic code points: let `basic` be the number of input code
            // points before the last delimiter, or `0` if there is none, then copy
            // the first basic code points to the output.

            basic = input.lastIndexOf(delimiter);
            if (basic < 0) {
              basic = 0;
            }

            for (j = 0; j < basic; ++j) {
              // if it's not a basic code point
              if (input.charCodeAt(j) >= 0x80) {
                error('not-basic');
              }
              output.push(input.charCodeAt(j));
            }

            // Main decoding loop: start just after the last delimiter if any basic code
            // points were copied; start at the beginning otherwise.

            for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

              // `index` is the index of the next character to be consumed.
              // Decode a generalized variable-length integer into `delta`,
              // which gets added to `i`. The overflow checking is easier
              // if we increase `i` as we go, then subtract off its starting
              // value at the end to obtain `delta`.
              for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

                if (index >= inputLength) {
                  error('invalid-input');
                }

                digit = basicToDigit(input.charCodeAt(index++));

                if (digit >= base || digit > floor((maxInt - i) / w)) {
                  error('overflow');
                }

                i += digit * w;
                t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                if (digit < t) {
                  break;
                }

                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) {
                  error('overflow');
                }

                w *= baseMinusT;

              }

              out = output.length + 1;
              bias = adapt(i - oldi, out, oldi == 0);

              // `i` was supposed to wrap around from `out` to `0`,
              // incrementing `n` each time, so we'll fix that now:
              if (floor(i / out) > maxInt - n) {
                error('overflow');
              }

              n += floor(i / out);
              i %= out;

              // Insert `n` at position `i` of the output
              output.splice(i++, 0, n);

            }

            return ucs2encode(output);
          }

          /**
           * Converts a string of Unicode symbols (e.g. a domain name label) to a
           * Punycode string of ASCII-only symbols.
           * @memberOf punycode
           * @param {String} input The string of Unicode symbols.
           * @returns {String} The resulting Punycode string of ASCII-only symbols.
           */
          function encode(input) {
            var n,
              delta,
              handledCPCount,
              basicLength,
              bias,
              j,
              m,
              q,
              k,
              t,
              currentValue,
              output = [],
              /** `inputLength` will hold the number of code points in `input`. */
              inputLength,
              /** Cached calculation results */
              handledCPCountPlusOne,
              baseMinusT,
              qMinusT;

            // Convert the input in UCS-2 to Unicode
            input = ucs2decode(input);

            // Cache the length
            inputLength = input.length;

            // Initialize the state
            n = initialN;
            delta = 0;
            bias = initialBias;

            // Handle the basic code points
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < 0x80) {
                output.push(stringFromCharCode(currentValue));
              }
            }

            handledCPCount = basicLength = output.length;

            // `handledCPCount` is the number of code points that have been handled;
            // `basicLength` is the number of basic code points.

            // Finish the basic string - if it is not empty - with a delimiter
            if (basicLength) {
              output.push(delimiter);
            }

            // Main encoding loop:
            while (handledCPCount < inputLength) {

              // All non-basic code points < n have been handled already. Find the next
              // larger one:
              for (m = maxInt, j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue >= n && currentValue < m) {
                  m = currentValue;
                }
              }

              // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
              // but guard against overflow
              handledCPCountPlusOne = handledCPCount + 1;
              if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error('overflow');
              }

              delta += (m - n) * handledCPCountPlusOne;
              n = m;

              for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];

                if (currentValue < n && ++delta > maxInt) {
                  error('overflow');
                }

                if (currentValue == n) {
                  // Represent delta as a generalized variable-length integer
                  for (q = delta, k = base; /* no condition */; k += base) {
                    t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                    if (q < t) {
                      break;
                    }
                    qMinusT = q - t;
                    baseMinusT = base - t;
                    output.push(
                      stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                    );
                    q = floor(qMinusT / baseMinusT);
                  }

                  output.push(stringFromCharCode(digitToBasic(q, 0)));
                  bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                  delta = 0;
                  ++handledCPCount;
                }
              }

              ++delta;
              ++n;

            }
            return output.join('');
          }

          /**
           * Converts a Punycode string representing a domain name or an email address
           * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
           * it doesn't matter if you call it on a string that has already been
           * converted to Unicode.
           * @memberOf punycode
           * @param {String} input The Punycoded domain name or email address to
           * convert to Unicode.
           * @returns {String} The Unicode representation of the given Punycode
           * string.
           */
          function toUnicode(input) {
            return mapDomain(input, function(string) {
              return regexPunycode.test(string)
                ? decode(string.slice(4).toLowerCase())
                : string;
            });
          }

          /**
           * Converts a Unicode string representing a domain name or an email address to
           * Punycode. Only the non-ASCII parts of the domain name will be converted,
           * i.e. it doesn't matter if you call it with a domain that's already in
           * ASCII.
           * @memberOf punycode
           * @param {String} input The domain name or email address to convert, as a
           * Unicode string.
           * @returns {String} The Punycode representation of the given domain name or
           * email address.
           */
          function toASCII(input) {
            return mapDomain(input, function(string) {
              return regexNonASCII.test(string)
                ? 'xn--' + encode(string)
                : string;
            });
          }

          /*--------------------------------------------------------------------------*/

          /** Define the public API */
          punycode = {
            /**
             * A string representing the current Punycode.js version number.
             * @memberOf punycode
             * @type String
             */
            'version': '1.4.1',
            /**
             * An object of methods to convert from JavaScript's internal character
             * representation (UCS-2) to Unicode code points, and back.
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode
             * @type Object
             */
            'ucs2': {
              'decode': ucs2decode,
              'encode': ucs2encode
            },
            'decode': decode,
            'encode': encode,
            'toASCII': toASCII,
            'toUnicode': toUnicode
          };

          /** Expose `punycode` */
          // Some AMD build optimizers, like r.js, check for specific condition patterns
          // like the following:
          if (
            true
          ) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
              return punycode;
            }).call(exports, __webpack_require__, exports, module),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else {}

        }(this));

        /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

      /***/ }),

    /***/ "./node_modules/querystring-es3/decode.js":
    /*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      module.exports = function(qs, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};

        if (typeof qs !== 'string' || qs.length === 0) {
          return obj;
        }

        var regexp = /\+/g;
        qs = qs.split(sep);

        var maxKeys = 1000;
        if (options && typeof options.maxKeys === 'number') {
          maxKeys = options.maxKeys;
        }

        var len = qs.length;
        // maxKeys <= 0 means that we should not limit keys count
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }

        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, '%20'),
            idx = x.indexOf(eq),
            kstr, vstr, k, v;

          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = '';
          }

          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);

          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }

        return obj;
      };

      var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };


      /***/ }),

    /***/ "./node_modules/querystring-es3/encode.js":
    /*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



      var stringifyPrimitive = function(v) {
        switch (typeof v) {
          case 'string':
            return v;

          case 'boolean':
            return v ? 'true' : 'false';

          case 'number':
            return isFinite(v) ? v : '';

          default:
            return '';
        }
      };

      module.exports = function(obj, sep, eq, name) {
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
          obj = undefined;
        }

        if (typeof obj === 'object') {
          return map(objectKeys(obj), function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (isArray(obj[k])) {
              return map(obj[k], function(v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);

        }

        if (!name) return '';
        return encodeURIComponent(stringifyPrimitive(name)) + eq +
          encodeURIComponent(stringifyPrimitive(obj));
      };

      var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };

      function map (xs, f) {
        if (xs.map) return xs.map(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          res.push(f(xs[i], i));
        }
        return res;
      }

      var objectKeys = Object.keys || function (obj) {
        var res = [];
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
        }
        return res;
      };


      /***/ }),

    /***/ "./node_modules/querystring-es3/index.js":
    /*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
      exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


      /***/ }),

    /***/ "./node_modules/regenerator-runtime/runtime.js":
    /*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      /**
       * Copyright (c) 2014-present, Facebook, Inc.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */

      var runtime = (function (exports) {
        "use strict";

        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var undefined; // More compressible than void 0.
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

        function define(obj, key, value) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return obj[key];
        }
        try {
          // IE 8 has a broken Object.defineProperty that only works on DOM objects.
          define({}, "");
        } catch (err) {
          define = function(obj, key, value) {
            return obj[key] = value;
          };
        }

        function wrap(innerFn, outerFn, self, tryLocsList) {
          // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);

          // The ._invoke method unifies the implementations of the .next,
          // .throw, and .return methods.
          generator._invoke = makeInvokeMethod(innerFn, self, context);

          return generator;
        }
        exports.wrap = wrap;

        // Try/catch helper to minimize deoptimizations. Returns a completion
        // record like context.tryEntries[i].completion. This interface could
        // have been (and was previously) designed to take a closure to be
        // invoked without arguments, but in all the cases we care about we
        // already have an existing method we want to call, so there's no need
        // to create a new function object. We can even get away with assuming
        // the method takes exactly one argument, since that happens to be true
        // in every case, so we don't have to touch the arguments object. The
        // only additional allocation required is the completion record, which
        // has a stable shape and so hopefully should be cheap to allocate.
        function tryCatch(fn, obj, arg) {
          try {
            return { type: "normal", arg: fn.call(obj, arg) };
          } catch (err) {
            return { type: "throw", arg: err };
          }
        }

        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed";

        // Returning this object from the innerFn has the same effect as
        // breaking out of the dispatch switch statement.
        var ContinueSentinel = {};

        // Dummy constructor functions that we use as the .constructor and
        // .constructor.prototype properties for functions that return Generator
        // objects. For full spec compliance, you may wish to configure your
        // minifier not to mangle the names of these two functions.
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}

        // This is a polyfill for %IteratorPrototype% for environments that
        // don't natively support it.
        var IteratorPrototype = {};
        IteratorPrototype[iteratorSymbol] = function () {
          return this;
        };

        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        if (NativeIteratorPrototype &&
          NativeIteratorPrototype !== Op &&
          hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          // This environment has a native %IteratorPrototype%; use it instead
          // of the polyfill.
          IteratorPrototype = NativeIteratorPrototype;
        }

        var Gp = GeneratorFunctionPrototype.prototype =
          Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
        GeneratorFunctionPrototype.constructor = GeneratorFunction;
        GeneratorFunction.displayName = define(
          GeneratorFunctionPrototype,
          toStringTagSymbol,
          "GeneratorFunction"
        );

        // Helper for defining the .next, .throw, and .return methods of the
        // Iterator interface in terms of a single ._invoke method.
        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function(method) {
            define(prototype, method, function(arg) {
              return this._invoke(method, arg);
            });
          });
        }

        exports.isGeneratorFunction = function(genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor
            ? ctor === GeneratorFunction ||
            // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === "GeneratorFunction"
            : false;
        };

        exports.mark = function(genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };

        // Within the body of any async function, `await x` is transformed to
        // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
        // `hasOwn.call(value, "__await")` to determine if the yielded value is
        // meant to be awaited.
        exports.awrap = function(arg) {
          return { __await: arg };
        };

        function AsyncIterator(generator, PromiseImpl) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") {
              reject(record.arg);
            } else {
              var result = record.arg;
              var value = result.value;
              if (value &&
                typeof value === "object" &&
                hasOwn.call(value, "__await")) {
                return PromiseImpl.resolve(value.__await).then(function(value) {
                  invoke("next", value, resolve, reject);
                }, function(err) {
                  invoke("throw", err, resolve, reject);
                });
              }

              return PromiseImpl.resolve(value).then(function(unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration.
                result.value = unwrapped;
                resolve(result);
              }, function(error) {
                // If a rejected Promise was yielded, throw the rejection back
                // into the async generator function so it can be handled there.
                return invoke("throw", error, resolve, reject);
              });
            }
          }

          var previousPromise;

          function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function(resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }

            return previousPromise =
              // If enqueue has been called before, then we want to wait until
              // all previous Promises have been resolved before calling invoke,
              // so that results are always delivered in the correct order. If
              // enqueue has not been called before, then it is important to
              // call invoke immediately, without waiting on a callback to fire,
              // so that the async generator function has the opportunity to do
              // any necessary setup in a predictable way. This predictability
              // is why the Promise constructor synchronously invokes its
              // executor callback, and why async functions synchronously
              // execute code before the first await. Since we implement simple
              // async functions in terms of async generators, it is especially
              // important to get this right, even though it requires care.
              previousPromise ? previousPromise.then(
                callInvokeWithMethodAndArg,
                // Avoid propagating failures to Promises returned by later
                // invocations of the iterator.
                callInvokeWithMethodAndArg
              ) : callInvokeWithMethodAndArg();
          }

          // Define the unified helper method that is used to implement .next,
          // .throw, and .return (see defineIteratorMethods).
          this._invoke = enqueue;
        }

        defineIteratorMethods(AsyncIterator.prototype);
        AsyncIterator.prototype[asyncIteratorSymbol] = function () {
          return this;
        };
        exports.AsyncIterator = AsyncIterator;

        // Note that simple async functions are implemented on top of
        // AsyncIterator objects; they just return a Promise for the value of
        // the final result produced by the iterator.
        exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
          if (PromiseImpl === void 0) PromiseImpl = Promise;

          var iter = new AsyncIterator(
            wrap(innerFn, outerFn, self, tryLocsList),
            PromiseImpl
          );

          return exports.isGeneratorFunction(outerFn)
            ? iter // If outerFn is a generator, return the full iterator.
            : iter.next().then(function(result) {
              return result.done ? result.value : iter.next();
            });
        };

        function makeInvokeMethod(innerFn, self, context) {
          var state = GenStateSuspendedStart;

          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }

            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              }

              // Be forgiving, per 25.3.3.3.3 of the spec:
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
              return doneResult();
            }

            context.method = method;
            context.arg = arg;

            while (true) {
              var delegate = context.delegate;
              if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context);
                if (delegateResult) {
                  if (delegateResult === ContinueSentinel) continue;
                  return delegateResult;
                }
              }

              if (context.method === "next") {
                // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;

              } else if (context.method === "throw") {
                if (state === GenStateSuspendedStart) {
                  state = GenStateCompleted;
                  throw context.arg;
                }

                context.dispatchException(context.arg);

              } else if (context.method === "return") {
                context.abrupt("return", context.arg);
              }

              state = GenStateExecuting;

              var record = tryCatch(innerFn, self, context);
              if (record.type === "normal") {
                // If an exception is thrown from innerFn, we leave state ===
                // GenStateExecuting and loop back for another invocation.
                state = context.done
                  ? GenStateCompleted
                  : GenStateSuspendedYield;

                if (record.arg === ContinueSentinel) {
                  continue;
                }

                return {
                  value: record.arg,
                  done: context.done
                };

              } else if (record.type === "throw") {
                state = GenStateCompleted;
                // Dispatch the exception by looping back around to the
                // context.dispatchException(context.arg) call above.
                context.method = "throw";
                context.arg = record.arg;
              }
            }
          };
        }

        // Call delegate.iterator[context.method](context.arg) and handle the
        // result, either by returning a { value, done } result from the
        // delegate iterator, or by modifying context.method and context.arg,
        // setting context.delegate to null, and returning the ContinueSentinel.
        function maybeInvokeDelegate(delegate, context) {
          var method = delegate.iterator[context.method];
          if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;

            if (context.method === "throw") {
              // Note: ["return"] must be used for ES3 parsing compatibility.
              if (delegate.iterator["return"]) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);

                if (context.method === "throw") {
                  // If maybeInvokeDelegate(context) changed context.method from
                  // "return" to "throw", let that override the TypeError below.
                  return ContinueSentinel;
                }
              }

              context.method = "throw";
              context.arg = new TypeError(
                "The iterator does not provide a 'throw' method");
            }

            return ContinueSentinel;
          }

          var record = tryCatch(method, delegate.iterator, context.arg);

          if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
          }

          var info = record.arg;

          if (! info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
          }

          if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;

            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;

            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
              context.method = "next";
              context.arg = undefined;
            }

          } else {
            // Re-yield the result returned by the delegate method.
            return info;
          }

          // The delegate iterator is finished, so forget it and continue with
          // the outer generator.
          context.delegate = null;
          return ContinueSentinel;
        }

        // Define Generator.prototype.{next,throw,return} in terms of the
        // unified ._invoke helper method.
        defineIteratorMethods(Gp);

        define(Gp, toStringTagSymbol, "Generator");

        // A Generator should always return itself as the iterator object when the
        // @@iterator function is called on it. Some browsers' implementations of the
        // iterator prototype chain incorrectly implement this, causing the Generator
        // object to not be returned from this call. This ensures that doesn't happen.
        // See https://github.com/facebook/regenerator/issues/274 for more details.
        Gp[iteratorSymbol] = function() {
          return this;
        };

        Gp.toString = function() {
          return "[object Generator]";
        };

        function pushTryEntry(locs) {
          var entry = { tryLoc: locs[0] };

          if (1 in locs) {
            entry.catchLoc = locs[1];
          }

          if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
          }

          this.tryEntries.push(entry);
        }

        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal";
          delete record.arg;
          entry.completion = record;
        }

        function Context(tryLocsList) {
          // The root entry object (effectively a try statement without a catch
          // or a finally block) gives us a place to store values thrown from
          // locations where there is no enclosing try statement.
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }

        exports.keys = function(object) {
          var keys = [];
          for (var key in object) {
            keys.push(key);
          }
          keys.reverse();

          // Rather than returning an object with a next method, we keep
          // things simple and return the next function itself.
          return function next() {
            while (keys.length) {
              var key = keys.pop();
              if (key in object) {
                next.value = key;
                next.done = false;
                return next;
              }
            }

            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
          };
        };

        function values(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) {
              return iteratorMethod.call(iterable);
            }

            if (typeof iterable.next === "function") {
              return iterable;
            }

            if (!isNaN(iterable.length)) {
              var i = -1, next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined;
                next.done = true;

                return next;
              };

              return next.next = next;
            }
          }

          // Return an iterator with no values.
          return { next: doneResult };
        }
        exports.values = values;

        function doneResult() {
          return { value: undefined, done: true };
        }

        Context.prototype = {
          constructor: Context,

          reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;

            this.method = "next";
            this.arg = undefined;

            this.tryEntries.forEach(resetTryEntry);

            if (!skipTempReset) {
              for (var name in this) {
                // Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" &&
                  hasOwn.call(this, name) &&
                  !isNaN(+name.slice(1))) {
                  this[name] = undefined;
                }
              }
            }
          },

          stop: function() {
            this.done = true;

            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") {
              throw rootRecord.arg;
            }

            return this.rval;
          },

          dispatchException: function(exception) {
            if (this.done) {
              throw exception;
            }

            var context = this;
            function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;

              if (caught) {
                // If the dispatched exception was caught by a catch block,
                // then let that catch block handle the exception normally.
                context.method = "next";
                context.arg = undefined;
              }

              return !! caught;
            }

            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;

              if (entry.tryLoc === "root") {
                // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
              }

              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc");
                var hasFinally = hasOwn.call(entry, "finallyLoc");

                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  } else if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }

                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  }

                } else if (hasFinally) {
                  if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }

                } else {
                  throw new Error("try statement without catch or finally");
                }
              }
            }
          },

          abrupt: function(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev &&
                hasOwn.call(entry, "finallyLoc") &&
                this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }

            if (finallyEntry &&
              (type === "break" ||
                type === "continue") &&
              finallyEntry.tryLoc <= arg &&
              arg <= finallyEntry.finallyLoc) {
              // Ignore the finally entry if control is not jumping to a
              // location outside the try/catch block.
              finallyEntry = null;
            }

            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;

            if (finallyEntry) {
              this.method = "next";
              this.next = finallyEntry.finallyLoc;
              return ContinueSentinel;
            }

            return this.complete(record);
          },

          complete: function(record, afterLoc) {
            if (record.type === "throw") {
              throw record.arg;
            }

            if (record.type === "break" ||
              record.type === "continue") {
              this.next = record.arg;
            } else if (record.type === "return") {
              this.rval = this.arg = record.arg;
              this.method = "return";
              this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
            }

            return ContinueSentinel;
          },

          finish: function(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) {
                this.complete(entry.completion, entry.afterLoc);
                resetTryEntry(entry);
                return ContinueSentinel;
              }
            }
          },

          "catch": function(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if (record.type === "throw") {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }

            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
          },

          delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc
            };

            if (this.method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              this.arg = undefined;
            }

            return ContinueSentinel;
          }
        };

        // Regardless of whether this script is executing as a CommonJS module
        // or not, return the runtime object so that we can declare the variable
        // regeneratorRuntime in the outer scope, which allows this module to be
        // injected easily by `bin/regenerator --include-runtime script.js`.
        return exports;

      }(
        // If this script is executing as a CommonJS module, use module.exports
        // as the regeneratorRuntime namespace. Otherwise create a new empty
        // object. Either way, the resulting object will be used to initialize
        // the regeneratorRuntime variable at the top of this file.
        true ? module.exports : undefined
      ));

      try {
        regeneratorRuntime = runtime;
      } catch (accidentalStrictMode) {
        // This module should not be running in strict mode, so the above
        // assignment should always work unless something is misconfigured. Just
        // in case runtime.js accidentally runs in strict mode, we can escape
        // strict mode using a global Function call. This could conceivably fail
        // if a Content Security Policy forbids using Function, but in that case
        // the proper solution is to fix the accidental strict mode problem. If
        // you've misconfigured your bundler to force strict mode and applied a
        // CSP to forbid Function, and you're not willing to fix either of those
        // problems, please detail your unique predicament in a GitHub issue.
        Function("r", "regeneratorRuntime = r")(runtime);
      }


      /***/ }),

    /***/ "./node_modules/sockjs-client/dist/sockjs.js":
    /*!***************************************************!*\
  !*** ./node_modules/sockjs-client/dist/sockjs.js ***!
  \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      /* WEBPACK VAR INJECTION */(function(global) {var require;var require;/* sockjs-client v1.4.0 | http://sockjs.org | MIT license */
        (function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
            (function (global){
              'use strict';

              var transportList = require('./transport-list');

              module.exports = require('./main')(transportList);

// TODO can't get rid of this until all servers do
              if ('_sockjs_onload' in global) {
                setTimeout(global._sockjs_onload, 1);
              }

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"./main":14,"./transport-list":16}],2:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , Event = require('./event')
            ;

            function CloseEvent() {
              Event.call(this);
              this.initEvent('close', false, false);
              this.wasClean = false;
              this.code = 0;
              this.reason = '';
            }

            inherits(CloseEvent, Event);

            module.exports = CloseEvent;

          },{"./event":4,"inherits":57}],3:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , EventTarget = require('./eventtarget')
            ;

            function EventEmitter() {
              EventTarget.call(this);
            }

            inherits(EventEmitter, EventTarget);

            EventEmitter.prototype.removeAllListeners = function(type) {
              if (type) {
                delete this._listeners[type];
              } else {
                this._listeners = {};
              }
            };

            EventEmitter.prototype.once = function(type, listener) {
              var self = this
                , fired = false;

              function g() {
                self.removeListener(type, g);

                if (!fired) {
                  fired = true;
                  listener.apply(this, arguments);
                }
              }

              this.on(type, g);
            };

            EventEmitter.prototype.emit = function() {
              var type = arguments[0];
              var listeners = this._listeners[type];
              if (!listeners) {
                return;
              }
              // equivalent of Array.prototype.slice.call(arguments, 1);
              var l = arguments.length;
              var args = new Array(l - 1);
              for (var ai = 1; ai < l; ai++) {
                args[ai - 1] = arguments[ai];
              }
              for (var i = 0; i < listeners.length; i++) {
                listeners[i].apply(this, args);
              }
            };

            EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
            EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

            module.exports.EventEmitter = EventEmitter;

          },{"./eventtarget":5,"inherits":57}],4:[function(require,module,exports){
            'use strict';

            function Event(eventType) {
              this.type = eventType;
            }

            Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
              this.type = eventType;
              this.bubbles = canBubble;
              this.cancelable = cancelable;
              this.timeStamp = +new Date();
              return this;
            };

            Event.prototype.stopPropagation = function() {};
            Event.prototype.preventDefault = function() {};

            Event.CAPTURING_PHASE = 1;
            Event.AT_TARGET = 2;
            Event.BUBBLING_PHASE = 3;

            module.exports = Event;

          },{}],5:[function(require,module,exports){
            'use strict';

            /* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

            function EventTarget() {
              this._listeners = {};
            }

            EventTarget.prototype.addEventListener = function(eventType, listener) {
              if (!(eventType in this._listeners)) {
                this._listeners[eventType] = [];
              }
              var arr = this._listeners[eventType];
              // #4
              if (arr.indexOf(listener) === -1) {
                // Make a copy so as not to interfere with a current dispatchEvent.
                arr = arr.concat([listener]);
              }
              this._listeners[eventType] = arr;
            };

            EventTarget.prototype.removeEventListener = function(eventType, listener) {
              var arr = this._listeners[eventType];
              if (!arr) {
                return;
              }
              var idx = arr.indexOf(listener);
              if (idx !== -1) {
                if (arr.length > 1) {
                  // Make a copy so as not to interfere with a current dispatchEvent.
                  this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
                } else {
                  delete this._listeners[eventType];
                }
                return;
              }
            };

            EventTarget.prototype.dispatchEvent = function() {
              var event = arguments[0];
              var t = event.type;
              // equivalent of Array.prototype.slice.call(arguments, 0);
              var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
              // TODO: This doesn't match the real behavior; per spec, onfoo get
              // their place in line from the /first/ time they're set from
              // non-null. Although WebKit bumps it to the end every time it's
              // set.
              if (this['on' + t]) {
                this['on' + t].apply(this, args);
              }
              if (t in this._listeners) {
                // Grab a reference to the listeners list. removeEventListener may alter the list.
                var listeners = this._listeners[t];
                for (var i = 0; i < listeners.length; i++) {
                  listeners[i].apply(this, args);
                }
              }
            };

            module.exports = EventTarget;

          },{}],6:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , Event = require('./event')
            ;

            function TransportMessageEvent(data) {
              Event.call(this);
              this.initEvent('message', false, false);
              this.data = data;
            }

            inherits(TransportMessageEvent, Event);

            module.exports = TransportMessageEvent;

          },{"./event":4,"inherits":57}],7:[function(require,module,exports){
            'use strict';

            var JSON3 = require('json3')
              , iframeUtils = require('./utils/iframe')
            ;

            function FacadeJS(transport) {
              this._transport = transport;
              transport.on('message', this._transportMessage.bind(this));
              transport.on('close', this._transportClose.bind(this));
            }

            FacadeJS.prototype._transportClose = function(code, reason) {
              iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
            };
            FacadeJS.prototype._transportMessage = function(frame) {
              iframeUtils.postMessage('t', frame);
            };
            FacadeJS.prototype._send = function(data) {
              this._transport.send(data);
            };
            FacadeJS.prototype._close = function() {
              this._transport.close();
              this._transport.removeAllListeners();
            };

            module.exports = FacadeJS;

          },{"./utils/iframe":47,"json3":58}],8:[function(require,module,exports){
            (function (process){
              'use strict';

              var urlUtils = require('./utils/url')
                , eventUtils = require('./utils/event')
                , JSON3 = require('json3')
                , FacadeJS = require('./facade')
                , InfoIframeReceiver = require('./info-iframe-receiver')
                , iframeUtils = require('./utils/iframe')
                , loc = require('./location')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:iframe-bootstrap');
              }

              module.exports = function(SockJS, availableTransports) {
                var transportMap = {};
                availableTransports.forEach(function(at) {
                  if (at.facadeTransport) {
                    transportMap[at.facadeTransport.transportName] = at.facadeTransport;
                  }
                });

                // hard-coded for the info iframe
                // TODO see if we can make this more dynamic
                transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
                var parentOrigin;

                /* eslint-disable camelcase */
                SockJS.bootstrap_iframe = function() {
                  /* eslint-enable camelcase */
                  var facade;
                  iframeUtils.currentWindowId = loc.hash.slice(1);
                  var onMessage = function(e) {
                    if (e.source !== parent) {
                      return;
                    }
                    if (typeof parentOrigin === 'undefined') {
                      parentOrigin = e.origin;
                    }
                    if (e.origin !== parentOrigin) {
                      return;
                    }

                    var iframeMessage;
                    try {
                      iframeMessage = JSON3.parse(e.data);
                    } catch (ignored) {
                      debug('bad json', e.data);
                      return;
                    }

                    if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
                      return;
                    }
                    switch (iframeMessage.type) {
                      case 's':
                        var p;
                        try {
                          p = JSON3.parse(iframeMessage.data);
                        } catch (ignored) {
                          debug('bad json', iframeMessage.data);
                          break;
                        }
                        var version = p[0];
                        var transport = p[1];
                        var transUrl = p[2];
                        var baseUrl = p[3];
                        debug(version, transport, transUrl, baseUrl);
                        // change this to semver logic
                        if (version !== SockJS.version) {
                          throw new Error('Incompatible SockJS! Main site uses:' +
                            ' "' + version + '", the iframe:' +
                            ' "' + SockJS.version + '".');
                        }

                        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
                          !urlUtils.isOriginEqual(baseUrl, loc.href)) {
                          throw new Error('Can\'t connect to different domain from within an ' +
                            'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
                        }
                        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
                        break;
                      case 'm':
                        facade._send(iframeMessage.data);
                        break;
                      case 'c':
                        if (facade) {
                          facade._close();
                        }
                        facade = null;
                        break;
                    }
                  };

                  eventUtils.attachEvent('message', onMessage);

                  // Start
                  iframeUtils.postMessage('s');
                };
              };

            }).call(this,{ env: {} })

          },{"./facade":7,"./info-iframe-receiver":10,"./location":13,"./utils/event":46,"./utils/iframe":47,"./utils/url":52,"debug":55,"json3":58}],9:[function(require,module,exports){
            (function (process){
              'use strict';

              var EventEmitter = require('events').EventEmitter
                , inherits = require('inherits')
                , JSON3 = require('json3')
                , objectUtils = require('./utils/object')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:info-ajax');
              }

              function InfoAjax(url, AjaxObject) {
                EventEmitter.call(this);

                var self = this;
                var t0 = +new Date();
                this.xo = new AjaxObject('GET', url);

                this.xo.once('finish', function(status, text) {
                  var info, rtt;
                  if (status === 200) {
                    rtt = (+new Date()) - t0;
                    if (text) {
                      try {
                        info = JSON3.parse(text);
                      } catch (e) {
                        debug('bad json', text);
                      }
                    }

                    if (!objectUtils.isObject(info)) {
                      info = {};
                    }
                  }
                  self.emit('finish', info, rtt);
                  self.removeAllListeners();
                });
              }

              inherits(InfoAjax, EventEmitter);

              InfoAjax.prototype.close = function() {
                this.removeAllListeners();
                this.xo.close();
              };

              module.exports = InfoAjax;

            }).call(this,{ env: {} })

          },{"./utils/object":49,"debug":55,"events":3,"inherits":57,"json3":58}],10:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , EventEmitter = require('events').EventEmitter
              , JSON3 = require('json3')
              , XHRLocalObject = require('./transport/sender/xhr-local')
              , InfoAjax = require('./info-ajax')
            ;

            function InfoReceiverIframe(transUrl) {
              var self = this;
              EventEmitter.call(this);

              this.ir = new InfoAjax(transUrl, XHRLocalObject);
              this.ir.once('finish', function(info, rtt) {
                self.ir = null;
                self.emit('message', JSON3.stringify([info, rtt]));
              });
            }

            inherits(InfoReceiverIframe, EventEmitter);

            InfoReceiverIframe.transportName = 'iframe-info-receiver';

            InfoReceiverIframe.prototype.close = function() {
              if (this.ir) {
                this.ir.close();
                this.ir = null;
              }
              this.removeAllListeners();
            };

            module.exports = InfoReceiverIframe;

          },{"./info-ajax":9,"./transport/sender/xhr-local":37,"events":3,"inherits":57,"json3":58}],11:[function(require,module,exports){
            (function (process,global){
              'use strict';

              var EventEmitter = require('events').EventEmitter
                , inherits = require('inherits')
                , JSON3 = require('json3')
                , utils = require('./utils/event')
                , IframeTransport = require('./transport/iframe')
                , InfoReceiverIframe = require('./info-iframe-receiver')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:info-iframe');
              }

              function InfoIframe(baseUrl, url) {
                var self = this;
                EventEmitter.call(this);

                var go = function() {
                  var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

                  ifr.once('message', function(msg) {
                    if (msg) {
                      var d;
                      try {
                        d = JSON3.parse(msg);
                      } catch (e) {
                        debug('bad json', msg);
                        self.emit('finish');
                        self.close();
                        return;
                      }

                      var info = d[0], rtt = d[1];
                      self.emit('finish', info, rtt);
                    }
                    self.close();
                  });

                  ifr.once('close', function() {
                    self.emit('finish');
                    self.close();
                  });
                };

                // TODO this seems the same as the 'needBody' from transports
                if (!global.document.body) {
                  utils.attachEvent('load', go);
                } else {
                  go();
                }
              }

              inherits(InfoIframe, EventEmitter);

              InfoIframe.enabled = function() {
                return IframeTransport.enabled();
              };

              InfoIframe.prototype.close = function() {
                if (this.ifr) {
                  this.ifr.close();
                }
                this.removeAllListeners();
                this.ifr = null;
              };

              module.exports = InfoIframe;

            }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"./info-iframe-receiver":10,"./transport/iframe":22,"./utils/event":46,"debug":55,"events":3,"inherits":57,"json3":58}],12:[function(require,module,exports){
            (function (process){
              'use strict';

              var EventEmitter = require('events').EventEmitter
                , inherits = require('inherits')
                , urlUtils = require('./utils/url')
                , XDR = require('./transport/sender/xdr')
                , XHRCors = require('./transport/sender/xhr-cors')
                , XHRLocal = require('./transport/sender/xhr-local')
                , XHRFake = require('./transport/sender/xhr-fake')
                , InfoIframe = require('./info-iframe')
                , InfoAjax = require('./info-ajax')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:info-receiver');
              }

              function InfoReceiver(baseUrl, urlInfo) {
                debug(baseUrl);
                var self = this;
                EventEmitter.call(this);

                setTimeout(function() {
                  self.doXhr(baseUrl, urlInfo);
                }, 0);
              }

              inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

              InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
                // determine method of CORS support (if needed)
                if (urlInfo.sameOrigin) {
                  return new InfoAjax(url, XHRLocal);
                }
                if (XHRCors.enabled) {
                  return new InfoAjax(url, XHRCors);
                }
                if (XDR.enabled && urlInfo.sameScheme) {
                  return new InfoAjax(url, XDR);
                }
                if (InfoIframe.enabled()) {
                  return new InfoIframe(baseUrl, url);
                }
                return new InfoAjax(url, XHRFake);
              };

              InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
                var self = this
                  , url = urlUtils.addPath(baseUrl, '/info')
                ;
                debug('doXhr', url);

                this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

                this.timeoutRef = setTimeout(function() {
                  debug('timeout');
                  self._cleanup(false);
                  self.emit('finish');
                }, InfoReceiver.timeout);

                this.xo.once('finish', function(info, rtt) {
                  debug('finish', info, rtt);
                  self._cleanup(true);
                  self.emit('finish', info, rtt);
                });
              };

              InfoReceiver.prototype._cleanup = function(wasClean) {
                debug('_cleanup');
                clearTimeout(this.timeoutRef);
                this.timeoutRef = null;
                if (!wasClean && this.xo) {
                  this.xo.close();
                }
                this.xo = null;
              };

              InfoReceiver.prototype.close = function() {
                debug('close');
                this.removeAllListeners();
                this._cleanup(false);
              };

              InfoReceiver.timeout = 8000;

              module.exports = InfoReceiver;

            }).call(this,{ env: {} })

          },{"./info-ajax":9,"./info-iframe":11,"./transport/sender/xdr":34,"./transport/sender/xhr-cors":35,"./transport/sender/xhr-fake":36,"./transport/sender/xhr-local":37,"./utils/url":52,"debug":55,"events":3,"inherits":57}],13:[function(require,module,exports){
            (function (global){
              'use strict';

              module.exports = global.location || {
                origin: 'http://localhost:80'
                , protocol: 'http:'
                , host: 'localhost'
                , port: 80
                , href: 'http://localhost/'
                , hash: ''
              };

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{}],14:[function(require,module,exports){
            (function (process,global){
              'use strict';

              require('./shims');

              var URL = require('url-parse')
                , inherits = require('inherits')
                , JSON3 = require('json3')
                , random = require('./utils/random')
                , escape = require('./utils/escape')
                , urlUtils = require('./utils/url')
                , eventUtils = require('./utils/event')
                , transport = require('./utils/transport')
                , objectUtils = require('./utils/object')
                , browser = require('./utils/browser')
                , log = require('./utils/log')
                , Event = require('./event/event')
                , EventTarget = require('./event/eventtarget')
                , loc = require('./location')
                , CloseEvent = require('./event/close')
                , TransportMessageEvent = require('./event/trans-message')
                , InfoReceiver = require('./info-receiver')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:main');
              }

              var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
              function SockJS(url, protocols, options) {
                if (!(this instanceof SockJS)) {
                  return new SockJS(url, protocols, options);
                }
                if (arguments.length < 1) {
                  throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
                }
                EventTarget.call(this);

                this.readyState = SockJS.CONNECTING;
                this.extensions = '';
                this.protocol = '';

                // non-standard extension
                options = options || {};
                if (options.protocols_whitelist) {
                  log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
                }
                this._transportsWhitelist = options.transports;
                this._transportOptions = options.transportOptions || {};
                this._timeout = options.timeout || 0;

                var sessionId = options.sessionId || 8;
                if (typeof sessionId === 'function') {
                  this._generateSessionId = sessionId;
                } else if (typeof sessionId === 'number') {
                  this._generateSessionId = function() {
                    return random.string(sessionId);
                  };
                } else {
                  throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
                }

                this._server = options.server || random.numberString(1000);

                // Step 1 of WS spec - parse and validate the url. Issue #8
                var parsedUrl = new URL(url);
                if (!parsedUrl.host || !parsedUrl.protocol) {
                  throw new SyntaxError("The URL '" + url + "' is invalid");
                } else if (parsedUrl.hash) {
                  throw new SyntaxError('The URL must not contain a fragment');
                } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
                  throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
                }

                var secure = parsedUrl.protocol === 'https:';
                // Step 2 - don't allow secure origin with an insecure protocol
                if (loc.protocol === 'https:' && !secure) {
                  throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
                }

                // Step 3 - check port access - no need here
                // Step 4 - parse protocols argument
                if (!protocols) {
                  protocols = [];
                } else if (!Array.isArray(protocols)) {
                  protocols = [protocols];
                }

                // Step 5 - check protocols argument
                var sortedProtocols = protocols.sort();
                sortedProtocols.forEach(function(proto, i) {
                  if (!proto) {
                    throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
                  }
                  if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
                    throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
                  }
                });

                // Step 6 - convert origin
                var o = urlUtils.getOrigin(loc.href);
                this._origin = o ? o.toLowerCase() : null;

                // remove the trailing slash
                parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

                // store the sanitized url
                this.url = parsedUrl.href;
                debug('using url', this.url);

                // Step 7 - start connection in background
                // obtain server info
                // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
                this._urlInfo = {
                  nullOrigin: !browser.hasDomain()
                  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
                  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
                };

                this._ir = new InfoReceiver(this.url, this._urlInfo);
                this._ir.once('finish', this._receiveInfo.bind(this));
              }

              inherits(SockJS, EventTarget);

              function userSetCode(code) {
                return code === 1000 || (code >= 3000 && code <= 4999);
              }

              SockJS.prototype.close = function(code, reason) {
                // Step 1
                if (code && !userSetCode(code)) {
                  throw new Error('InvalidAccessError: Invalid code');
                }
                // Step 2.4 states the max is 123 bytes, but we are just checking length
                if (reason && reason.length > 123) {
                  throw new SyntaxError('reason argument has an invalid length');
                }

                // Step 3.1
                if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
                  return;
                }

                // TODO look at docs to determine how to set this
                var wasClean = true;
                this._close(code || 1000, reason || 'Normal closure', wasClean);
              };

              SockJS.prototype.send = function(data) {
                // #13 - convert anything non-string to string
                // TODO this currently turns objects into [object Object]
                if (typeof data !== 'string') {
                  data = '' + data;
                }
                if (this.readyState === SockJS.CONNECTING) {
                  throw new Error('InvalidStateError: The connection has not been established yet');
                }
                if (this.readyState !== SockJS.OPEN) {
                  return;
                }
                this._transport.send(escape.quote(data));
              };

              SockJS.version = require('./version');

              SockJS.CONNECTING = 0;
              SockJS.OPEN = 1;
              SockJS.CLOSING = 2;
              SockJS.CLOSED = 3;

              SockJS.prototype._receiveInfo = function(info, rtt) {
                debug('_receiveInfo', rtt);
                this._ir = null;
                if (!info) {
                  this._close(1002, 'Cannot connect to server');
                  return;
                }

                // establish a round-trip timeout (RTO) based on the
                // round-trip time (RTT)
                this._rto = this.countRTO(rtt);
                // allow server to override url used for the actual transport
                this._transUrl = info.base_url ? info.base_url : this.url;
                info = objectUtils.extend(info, this._urlInfo);
                debug('info', info);
                // determine list of desired and supported transports
                var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
                this._transports = enabledTransports.main;
                debug(this._transports.length + ' enabled transports');

                this._connect();
              };

              SockJS.prototype._connect = function() {
                for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
                  debug('attempt', Transport.transportName);
                  if (Transport.needBody) {
                    if (!global.document.body ||
                      (typeof global.document.readyState !== 'undefined' &&
                        global.document.readyState !== 'complete' &&
                        global.document.readyState !== 'interactive')) {
                      debug('waiting for body');
                      this._transports.unshift(Transport);
                      eventUtils.attachEvent('load', this._connect.bind(this));
                      return;
                    }
                  }

                  // calculate timeout based on RTO and round trips. Default to 5s
                  var timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
                  this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
                  debug('using timeout', timeoutMs);

                  var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
                  var options = this._transportOptions[Transport.transportName];
                  debug('transport url', transportUrl);
                  var transportObj = new Transport(transportUrl, this._transUrl, options);
                  transportObj.on('message', this._transportMessage.bind(this));
                  transportObj.once('close', this._transportClose.bind(this));
                  transportObj.transportName = Transport.transportName;
                  this._transport = transportObj;

                  return;
                }
                this._close(2000, 'All transports failed', false);
              };

              SockJS.prototype._transportTimeout = function() {
                debug('_transportTimeout');
                if (this.readyState === SockJS.CONNECTING) {
                  if (this._transport) {
                    this._transport.close();
                  }

                  this._transportClose(2007, 'Transport timed out');
                }
              };

              SockJS.prototype._transportMessage = function(msg) {
                debug('_transportMessage', msg);
                var self = this
                  , type = msg.slice(0, 1)
                  , content = msg.slice(1)
                  , payload
                ;

                // first check for messages that don't need a payload
                switch (type) {
                  case 'o':
                    this._open();
                    return;
                  case 'h':
                    this.dispatchEvent(new Event('heartbeat'));
                    debug('heartbeat', this.transport);
                    return;
                }

                if (content) {
                  try {
                    payload = JSON3.parse(content);
                  } catch (e) {
                    debug('bad json', content);
                  }
                }

                if (typeof payload === 'undefined') {
                  debug('empty payload', content);
                  return;
                }

                switch (type) {
                  case 'a':
                    if (Array.isArray(payload)) {
                      payload.forEach(function(p) {
                        debug('message', self.transport, p);
                        self.dispatchEvent(new TransportMessageEvent(p));
                      });
                    }
                    break;
                  case 'm':
                    debug('message', this.transport, payload);
                    this.dispatchEvent(new TransportMessageEvent(payload));
                    break;
                  case 'c':
                    if (Array.isArray(payload) && payload.length === 2) {
                      this._close(payload[0], payload[1], true);
                    }
                    break;
                }
              };

              SockJS.prototype._transportClose = function(code, reason) {
                debug('_transportClose', this.transport, code, reason);
                if (this._transport) {
                  this._transport.removeAllListeners();
                  this._transport = null;
                  this.transport = null;
                }

                if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
                  this._connect();
                  return;
                }

                this._close(code, reason);
              };

              SockJS.prototype._open = function() {
                debug('_open', this._transport && this._transport.transportName, this.readyState);
                if (this.readyState === SockJS.CONNECTING) {
                  if (this._transportTimeoutId) {
                    clearTimeout(this._transportTimeoutId);
                    this._transportTimeoutId = null;
                  }
                  this.readyState = SockJS.OPEN;
                  this.transport = this._transport.transportName;
                  this.dispatchEvent(new Event('open'));
                  debug('connected', this.transport);
                } else {
                  // The server might have been restarted, and lost track of our
                  // connection.
                  this._close(1006, 'Server lost session');
                }
              };

              SockJS.prototype._close = function(code, reason, wasClean) {
                debug('_close', this.transport, code, reason, wasClean, this.readyState);
                var forceFail = false;

                if (this._ir) {
                  forceFail = true;
                  this._ir.close();
                  this._ir = null;
                }
                if (this._transport) {
                  this._transport.close();
                  this._transport = null;
                  this.transport = null;
                }

                if (this.readyState === SockJS.CLOSED) {
                  throw new Error('InvalidStateError: SockJS has already been closed');
                }

                this.readyState = SockJS.CLOSING;
                setTimeout(function() {
                  this.readyState = SockJS.CLOSED;

                  if (forceFail) {
                    this.dispatchEvent(new Event('error'));
                  }

                  var e = new CloseEvent('close');
                  e.wasClean = wasClean || false;
                  e.code = code || 1000;
                  e.reason = reason;

                  this.dispatchEvent(e);
                  this.onmessage = this.onclose = this.onerror = null;
                  debug('disconnected');
                }.bind(this), 0);
              };

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
              SockJS.prototype.countRTO = function(rtt) {
                // In a local environment, when using IE8/9 and the `jsonp-polling`
                // transport the time needed to establish a connection (the time that pass
                // from the opening of the transport to the call of `_dispatchOpen`) is
                // around 200msec (the lower bound used in the article above) and this
                // causes spurious timeouts. For this reason we calculate a value slightly
                // larger than that used in the article.
                if (rtt > 100) {
                  return 4 * rtt; // rto > 400msec
                }
                return 300 + rtt; // 300msec < rto <= 400msec
              };

              module.exports = function(availableTransports) {
                transports = transport(availableTransports);
                require('./iframe-bootstrap')(SockJS, availableTransports);
                return SockJS;
              };

            }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"./event/close":2,"./event/event":4,"./event/eventtarget":5,"./event/trans-message":6,"./iframe-bootstrap":8,"./info-receiver":12,"./location":13,"./shims":15,"./utils/browser":44,"./utils/escape":45,"./utils/event":46,"./utils/log":48,"./utils/object":49,"./utils/random":50,"./utils/transport":51,"./utils/url":52,"./version":53,"debug":55,"inherits":57,"json3":58,"url-parse":61}],15:[function(require,module,exports){
            /* eslint-disable */
            /* jscs: disable */
            'use strict';

// pulled specific shims from https://github.com/es-shims/es5-shim

            var ArrayPrototype = Array.prototype;
            var ObjectPrototype = Object.prototype;
            var FunctionPrototype = Function.prototype;
            var StringPrototype = String.prototype;
            var array_slice = ArrayPrototype.slice;

            var _toString = ObjectPrototype.toString;
            var isFunction = function (val) {
              return ObjectPrototype.toString.call(val) === '[object Function]';
            };
            var isArray = function isArray(obj) {
              return _toString.call(obj) === '[object Array]';
            };
            var isString = function isString(obj) {
              return _toString.call(obj) === '[object String]';
            };

            var supportsDescriptors = Object.defineProperty && (function () {
              try {
                Object.defineProperty({}, 'x', {});
                return true;
              } catch (e) { /* this is ES3 */
                return false;
              }
            }());

// Define configurable, writable and non-enumerable props
// if they don't exist.
            var defineProperty;
            if (supportsDescriptors) {
              defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && (name in object)) { return; }
                Object.defineProperty(object, name, {
                  configurable: true,
                  enumerable: false,
                  writable: true,
                  value: method
                });
              };
            } else {
              defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && (name in object)) { return; }
                object[name] = method;
              };
            }
            var defineProperties = function (object, map, forceAssign) {
              for (var name in map) {
                if (ObjectPrototype.hasOwnProperty.call(map, name)) {
                  defineProperty(object, name, map[name], forceAssign);
                }
              }
            };

            var toObject = function (o) {
              if (o == null) { // this matches both null and undefined
                throw new TypeError("can't convert " + o + ' to object');
              }
              return Object(o);
            };

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

            function toInteger(num) {
              var n = +num;
              if (n !== n) { // isNaN
                n = 0;
              } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
              }
              return n;
            }

            function ToUint32(x) {
              return x >>> 0;
            }

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

            function Empty() {}

            defineProperties(FunctionPrototype, {
              bind: function bind(that) { // .length is 1
                // 1. Let Target be the this value.
                var target = this;
                // 2. If IsCallable(Target) is false, throw a TypeError exception.
                if (!isFunction(target)) {
                  throw new TypeError('Function.prototype.bind called on incompatible ' + target);
                }
                // 3. Let A be a new (possibly empty) internal list of all of the
                //   argument values provided after thisArg (arg1, arg2 etc), in order.
                // XXX slicedArgs will stand in for "A" if used
                var args = array_slice.call(arguments, 1); // for normal call
                // 4. Let F be a new native ECMAScript object.
                // 11. Set the [[Prototype]] internal property of F to the standard
                //   built-in Function prototype object as specified in 15.3.3.1.
                // 12. Set the [[Call]] internal property of F as described in
                //   15.3.4.5.1.
                // 13. Set the [[Construct]] internal property of F as described in
                //   15.3.4.5.2.
                // 14. Set the [[HasInstance]] internal property of F as described in
                //   15.3.4.5.3.
                var binder = function () {

                  if (this instanceof bound) {
                    // 15.3.4.5.2 [[Construct]]
                    // When the [[Construct]] internal method of a function object,
                    // F that was created using the bind function is called with a
                    // list of arguments ExtraArgs, the following steps are taken:
                    // 1. Let target be the value of F's [[TargetFunction]]
                    //   internal property.
                    // 2. If target has no [[Construct]] internal method, a
                    //   TypeError exception is thrown.
                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Construct]] internal
                    //   method of target providing args as the arguments.

                    var result = target.apply(
                      this,
                      args.concat(array_slice.call(arguments))
                    );
                    if (Object(result) === result) {
                      return result;
                    }
                    return this;

                  } else {
                    // 15.3.4.5.1 [[Call]]
                    // When the [[Call]] internal method of a function object, F,
                    // which was created using the bind function is called with a
                    // this value and a list of arguments ExtraArgs, the following
                    // steps are taken:
                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
                    //   property.
                    // 3. Let target be the value of F's [[TargetFunction]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Call]] internal method
                    //   of target providing boundThis as the this value and
                    //   providing args as the arguments.

                    // equiv: target.call(this, ...boundArgs, ...args)
                    return target.apply(
                      that,
                      args.concat(array_slice.call(arguments))
                    );

                  }

                };

                // 15. If the [[Class]] internal property of Target is "Function", then
                //     a. Let L be the length property of Target minus the length of A.
                //     b. Set the length own property of F to either 0 or L, whichever is
                //       larger.
                // 16. Else set the length own property of F to 0.

                var boundLength = Math.max(0, target.length - args.length);

                // 17. Set the attributes of the length own property of F to the values
                //   specified in 15.3.5.1.
                var boundArgs = [];
                for (var i = 0; i < boundLength; i++) {
                  boundArgs.push('$' + i);
                }

                // XXX Build a dynamic function with desired amount of arguments is the only
                // way to set the length property of a function.
                // In environments where Content Security Policies enabled (Chrome extensions,
                // for ex.) all use of eval or Function costructor throws an exception.
                // However in all of these environments Function.prototype.bind exists
                // and so this code will never be executed.
                var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

                if (target.prototype) {
                  Empty.prototype = target.prototype;
                  bound.prototype = new Empty();
                  // Clean up dangling references.
                  Empty.prototype = null;
                }

                // TODO
                // 18. Set the [[Extensible]] internal property of F to true.

                // TODO
                // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
                // 20. Call the [[DefineOwnProperty]] internal method of F with
                //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
                //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
                //   false.
                // 21. Call the [[DefineOwnProperty]] internal method of F with
                //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
                //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
                //   and false.

                // TODO
                // NOTE Function objects created using Function.prototype.bind do not
                // have a prototype property or the [[Code]], [[FormalParameters]], and
                // [[Scope]] internal properties.
                // XXX can't delete prototype in pure-js.

                // 22. Return F.
                return bound;
              }
            });

//
// Array
// =====
//

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
            defineProperties(Array, { isArray: isArray });


            var boxedString = Object('a');
            var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

            var properlyBoxesContext = function properlyBoxed(method) {
              // Check node 0.6.21 bug where third parameter is not boxed
              var properlyBoxesNonStrict = true;
              var properlyBoxesStrict = true;
              if (method) {
                method.call('foo', function (_, __, context) {
                  if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
                });

                method.call([1], function () {
                  'use strict';
                  properlyBoxesStrict = typeof this === 'string';
                }, 'x');
              }
              return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
            };

            defineProperties(ArrayPrototype, {
              forEach: function forEach(fun /*, thisp*/) {
                var object = toObject(this),
                  self = splitString && isString(this) ? this.split('') : object,
                  thisp = arguments[1],
                  i = -1,
                  length = self.length >>> 0;

                // If no callback function or if callback is not a callable function
                if (!isFunction(fun)) {
                  throw new TypeError(); // TODO message
                }

                while (++i < length) {
                  if (i in self) {
                    // Invoke the callback function with call, passing arguments:
                    // context, property value, property key, thisArg object
                    // context
                    fun.call(thisp, self[i], i, object);
                  }
                }
              }
            }, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
            var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
            defineProperties(ArrayPrototype, {
              indexOf: function indexOf(sought /*, fromIndex */ ) {
                var self = splitString && isString(this) ? this.split('') : toObject(this),
                  length = self.length >>> 0;

                if (!length) {
                  return -1;
                }

                var i = 0;
                if (arguments.length > 1) {
                  i = toInteger(arguments[1]);
                }

                // handle negative indices
                i = i >= 0 ? i : Math.max(0, length + i);
                for (; i < length; i++) {
                  if (i in self && self[i] === sought) {
                    return i;
                  }
                }
                return -1;
              }
            }, hasFirefox2IndexOfBug);

//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

            var string_split = StringPrototype.split;
            if (
              'ab'.split(/(?:ab)*/).length !== 2 ||
              '.'.split(/(.?)(.?)/).length !== 4 ||
              'tesst'.split(/(s)*/)[1] === 't' ||
              'test'.split(/(?:)/, -1).length !== 4 ||
              ''.split(/.?/).length ||
              '.'.split(/()()/).length > 1
            ) {
              (function () {
                var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

                StringPrototype.split = function (separator, limit) {
                  var string = this;
                  if (separator === void 0 && limit === 0) {
                    return [];
                  }

                  // If `separator` is not a regex, use native split
                  if (_toString.call(separator) !== '[object RegExp]') {
                    return string_split.call(this, separator, limit);
                  }

                  var output = [],
                    flags = (separator.ignoreCase ? 'i' : '') +
                      (separator.multiline  ? 'm' : '') +
                      (separator.extended   ? 'x' : '') + // Proposed for ES6
                      (separator.sticky     ? 'y' : ''), // Firefox 3+
                    lastLastIndex = 0,
                    // Make `global` and avoid `lastIndex` issues by working with a copy
                    separator2, match, lastIndex, lastLength;
                  separator = new RegExp(separator.source, flags + 'g');
                  string += ''; // Type-convert
                  if (!compliantExecNpcg) {
                    // Doesn't need flags gy, but they don't hurt
                    separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
                  }
                  /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
                  limit = limit === void 0 ?
                    -1 >>> 0 : // Math.pow(2, 32) - 1
                    ToUint32(limit);
                  while (match = separator.exec(string)) {
                    // `separator.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                      output.push(string.slice(lastLastIndex, match.index));
                      // Fix browsers whose `exec` methods don't consistently return `undefined` for
                      // nonparticipating capturing groups
                      if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                          for (var i = 1; i < arguments.length - 2; i++) {
                            if (arguments[i] === void 0) {
                              match[i] = void 0;
                            }
                          }
                        });
                      }
                      if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                      }
                      lastLength = match[0].length;
                      lastLastIndex = lastIndex;
                      if (output.length >= limit) {
                        break;
                      }
                    }
                    if (separator.lastIndex === match.index) {
                      separator.lastIndex++; // Avoid an infinite loop
                    }
                  }
                  if (lastLastIndex === string.length) {
                    if (lastLength || !separator.test('')) {
                      output.push('');
                    }
                  } else {
                    output.push(string.slice(lastLastIndex));
                  }
                  return output.length > limit ? output.slice(0, limit) : output;
                };
              }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
            } else if ('0'.split(void 0, 0).length) {
              StringPrototype.split = function split(separator, limit) {
                if (separator === void 0 && limit === 0) { return []; }
                return string_split.call(this, separator, limit);
              };
            }

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
            var string_substr = StringPrototype.substr;
            var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
            defineProperties(StringPrototype, {
              substr: function substr(start, length) {
                return string_substr.call(
                  this,
                  start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
                  length
                );
              }
            }, hasNegativeSubstrBug);

          },{}],16:[function(require,module,exports){
            'use strict';

            module.exports = [
              // streaming transports
              require('./transport/websocket')
              , require('./transport/xhr-streaming')
              , require('./transport/xdr-streaming')
              , require('./transport/eventsource')
              , require('./transport/lib/iframe-wrap')(require('./transport/eventsource'))

              // polling transports
              , require('./transport/htmlfile')
              , require('./transport/lib/iframe-wrap')(require('./transport/htmlfile'))
              , require('./transport/xhr-polling')
              , require('./transport/xdr-polling')
              , require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling'))
              , require('./transport/jsonp-polling')
            ];

          },{"./transport/eventsource":20,"./transport/htmlfile":21,"./transport/jsonp-polling":23,"./transport/lib/iframe-wrap":26,"./transport/websocket":38,"./transport/xdr-polling":39,"./transport/xdr-streaming":40,"./transport/xhr-polling":41,"./transport/xhr-streaming":42}],17:[function(require,module,exports){
            (function (process,global){
              'use strict';

              var EventEmitter = require('events').EventEmitter
                , inherits = require('inherits')
                , utils = require('../../utils/event')
                , urlUtils = require('../../utils/url')
                , XHR = global.XMLHttpRequest
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:browser:xhr');
              }

              function AbstractXHRObject(method, url, payload, opts) {
                debug(method, url);
                var self = this;
                EventEmitter.call(this);

                setTimeout(function () {
                  self._start(method, url, payload, opts);
                }, 0);
              }

              inherits(AbstractXHRObject, EventEmitter);

              AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
                var self = this;

                try {
                  this.xhr = new XHR();
                } catch (x) {
                  // intentionally empty
                }

                if (!this.xhr) {
                  debug('no xhr');
                  this.emit('finish', 0, 'no xhr support');
                  this._cleanup();
                  return;
                }

                // several browsers cache POSTs
                url = urlUtils.addQuery(url, 't=' + (+new Date()));

                // Explorer tends to keep connection open, even after the
                // tab gets closed: http://bugs.jquery.com/ticket/5280
                this.unloadRef = utils.unloadAdd(function() {
                  debug('unload cleanup');
                  self._cleanup(true);
                });
                try {
                  this.xhr.open(method, url, true);
                  if (this.timeout && 'timeout' in this.xhr) {
                    this.xhr.timeout = this.timeout;
                    this.xhr.ontimeout = function() {
                      debug('xhr timeout');
                      self.emit('finish', 0, '');
                      self._cleanup(false);
                    };
                  }
                } catch (e) {
                  debug('exception', e);
                  // IE raises an exception on wrong port.
                  this.emit('finish', 0, '');
                  this._cleanup(false);
                  return;
                }

                if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
                  debug('withCredentials');
                  // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
                  // "This never affects same-site requests."

                  this.xhr.withCredentials = true;
                }
                if (opts && opts.headers) {
                  for (var key in opts.headers) {
                    this.xhr.setRequestHeader(key, opts.headers[key]);
                  }
                }

                this.xhr.onreadystatechange = function() {
                  if (self.xhr) {
                    var x = self.xhr;
                    var text, status;
                    debug('readyState', x.readyState);
                    switch (x.readyState) {
                      case 3:
                        // IE doesn't like peeking into responseText or status
                        // on Microsoft.XMLHTTP and readystate=3
                        try {
                          status = x.status;
                          text = x.responseText;
                        } catch (e) {
                          // intentionally empty
                        }
                        debug('status', status);
                        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
                        if (status === 1223) {
                          status = 204;
                        }

                        // IE does return readystate == 3 for 404 answers.
                        if (status === 200 && text && text.length > 0) {
                          debug('chunk');
                          self.emit('chunk', status, text);
                        }
                        break;
                      case 4:
                        status = x.status;
                        debug('status', status);
                        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
                        if (status === 1223) {
                          status = 204;
                        }
                        // IE returns this for a bad port
                        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
                        if (status === 12005 || status === 12029) {
                          status = 0;
                        }

                        debug('finish', status, x.responseText);
                        self.emit('finish', status, x.responseText);
                        self._cleanup(false);
                        break;
                    }
                  }
                };

                try {
                  self.xhr.send(payload);
                } catch (e) {
                  self.emit('finish', 0, '');
                  self._cleanup(false);
                }
              };

              AbstractXHRObject.prototype._cleanup = function(abort) {
                debug('cleanup');
                if (!this.xhr) {
                  return;
                }
                this.removeAllListeners();
                utils.unloadDel(this.unloadRef);

                // IE needs this field to be a function
                this.xhr.onreadystatechange = function() {};
                if (this.xhr.ontimeout) {
                  this.xhr.ontimeout = null;
                }

                if (abort) {
                  try {
                    this.xhr.abort();
                  } catch (x) {
                    // intentionally empty
                  }
                }
                this.unloadRef = this.xhr = null;
              };

              AbstractXHRObject.prototype.close = function() {
                debug('close');
                this._cleanup(true);
              };

              AbstractXHRObject.enabled = !!XHR;
// override XMLHttpRequest for IE6/7
// obfuscate to avoid firewalls
              var axo = ['Active'].concat('Object').join('X');
              if (!AbstractXHRObject.enabled && (axo in global)) {
                debug('overriding xmlhttprequest');
                XHR = function() {
                  try {
                    return new global[axo]('Microsoft.XMLHTTP');
                  } catch (e) {
                    return null;
                  }
                };
                AbstractXHRObject.enabled = !!new XHR();
              }

              var cors = false;
              try {
                cors = 'withCredentials' in new XHR();
              } catch (ignored) {
                // intentionally empty
              }

              AbstractXHRObject.supportsCORS = cors;

              module.exports = AbstractXHRObject;

            }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],18:[function(require,module,exports){
            (function (global){
              module.exports = global.EventSource;

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{}],19:[function(require,module,exports){
            (function (global){
              'use strict';

              var Driver = global.WebSocket || global.MozWebSocket;
              if (Driver) {
                module.exports = function WebSocketBrowserDriver(url) {
                  return new Driver(url);
                };
              } else {
                module.exports = undefined;
              }

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{}],20:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , AjaxBasedTransport = require('./lib/ajax-based')
              , EventSourceReceiver = require('./receiver/eventsource')
              , XHRCorsObject = require('./sender/xhr-cors')
              , EventSourceDriver = require('eventsource')
            ;

            function EventSourceTransport(transUrl) {
              if (!EventSourceTransport.enabled()) {
                throw new Error('Transport created when disabled');
              }

              AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
            }

            inherits(EventSourceTransport, AjaxBasedTransport);

            EventSourceTransport.enabled = function() {
              return !!EventSourceDriver;
            };

            EventSourceTransport.transportName = 'eventsource';
            EventSourceTransport.roundTrips = 2;

            module.exports = EventSourceTransport;

          },{"./lib/ajax-based":24,"./receiver/eventsource":29,"./sender/xhr-cors":35,"eventsource":18,"inherits":57}],21:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , HtmlfileReceiver = require('./receiver/htmlfile')
              , XHRLocalObject = require('./sender/xhr-local')
              , AjaxBasedTransport = require('./lib/ajax-based')
            ;

            function HtmlFileTransport(transUrl) {
              if (!HtmlfileReceiver.enabled) {
                throw new Error('Transport created when disabled');
              }
              AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
            }

            inherits(HtmlFileTransport, AjaxBasedTransport);

            HtmlFileTransport.enabled = function(info) {
              return HtmlfileReceiver.enabled && info.sameOrigin;
            };

            HtmlFileTransport.transportName = 'htmlfile';
            HtmlFileTransport.roundTrips = 2;

            module.exports = HtmlFileTransport;

          },{"./lib/ajax-based":24,"./receiver/htmlfile":30,"./sender/xhr-local":37,"inherits":57}],22:[function(require,module,exports){
            (function (process){
              'use strict';

// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

              var inherits = require('inherits')
                , JSON3 = require('json3')
                , EventEmitter = require('events').EventEmitter
                , version = require('../version')
                , urlUtils = require('../utils/url')
                , iframeUtils = require('../utils/iframe')
                , eventUtils = require('../utils/event')
                , random = require('../utils/random')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:transport:iframe');
              }

              function IframeTransport(transport, transUrl, baseUrl) {
                if (!IframeTransport.enabled()) {
                  throw new Error('Transport created when disabled');
                }
                EventEmitter.call(this);

                var self = this;
                this.origin = urlUtils.getOrigin(baseUrl);
                this.baseUrl = baseUrl;
                this.transUrl = transUrl;
                this.transport = transport;
                this.windowId = random.string(8);

                var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
                debug(transport, transUrl, iframeUrl);

                this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
                  debug('err callback');
                  self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
                  self.close();
                });

                this.onmessageCallback = this._message.bind(this);
                eventUtils.attachEvent('message', this.onmessageCallback);
              }

              inherits(IframeTransport, EventEmitter);

              IframeTransport.prototype.close = function() {
                debug('close');
                this.removeAllListeners();
                if (this.iframeObj) {
                  eventUtils.detachEvent('message', this.onmessageCallback);
                  try {
                    // When the iframe is not loaded, IE raises an exception
                    // on 'contentWindow'.
                    this.postMessage('c');
                  } catch (x) {
                    // intentionally empty
                  }
                  this.iframeObj.cleanup();
                  this.iframeObj = null;
                  this.onmessageCallback = this.iframeObj = null;
                }
              };

              IframeTransport.prototype._message = function(e) {
                debug('message', e.data);
                if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
                  debug('not same origin', e.origin, this.origin);
                  return;
                }

                var iframeMessage;
                try {
                  iframeMessage = JSON3.parse(e.data);
                } catch (ignored) {
                  debug('bad json', e.data);
                  return;
                }

                if (iframeMessage.windowId !== this.windowId) {
                  debug('mismatched window id', iframeMessage.windowId, this.windowId);
                  return;
                }

                switch (iframeMessage.type) {
                  case 's':
                    this.iframeObj.loaded();
                    // window global dependency
                    this.postMessage('s', JSON3.stringify([
                      version
                      , this.transport
                      , this.transUrl
                      , this.baseUrl
                    ]));
                    break;
                  case 't':
                    this.emit('message', iframeMessage.data);
                    break;
                  case 'c':
                    var cdata;
                    try {
                      cdata = JSON3.parse(iframeMessage.data);
                    } catch (ignored) {
                      debug('bad json', iframeMessage.data);
                      return;
                    }
                    this.emit('close', cdata[0], cdata[1]);
                    this.close();
                    break;
                }
              };

              IframeTransport.prototype.postMessage = function(type, data) {
                debug('postMessage', type, data);
                this.iframeObj.post(JSON3.stringify({
                  windowId: this.windowId
                  , type: type
                  , data: data || ''
                }), this.origin);
              };

              IframeTransport.prototype.send = function(message) {
                debug('send', message);
                this.postMessage('m', message);
              };

              IframeTransport.enabled = function() {
                return iframeUtils.iframeEnabled;
              };

              IframeTransport.transportName = 'iframe';
              IframeTransport.roundTrips = 2;

              module.exports = IframeTransport;

            }).call(this,{ env: {} })

          },{"../utils/event":46,"../utils/iframe":47,"../utils/random":50,"../utils/url":52,"../version":53,"debug":55,"events":3,"inherits":57,"json3":58}],23:[function(require,module,exports){
            (function (global){
              'use strict';

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

              var inherits = require('inherits')
                , SenderReceiver = require('./lib/sender-receiver')
                , JsonpReceiver = require('./receiver/jsonp')
                , jsonpSender = require('./sender/jsonp')
              ;

              function JsonPTransport(transUrl) {
                if (!JsonPTransport.enabled()) {
                  throw new Error('Transport created when disabled');
                }
                SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
              }

              inherits(JsonPTransport, SenderReceiver);

              JsonPTransport.enabled = function() {
                return !!global.document;
              };

              JsonPTransport.transportName = 'jsonp-polling';
              JsonPTransport.roundTrips = 1;
              JsonPTransport.needBody = true;

              module.exports = JsonPTransport;

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"./lib/sender-receiver":28,"./receiver/jsonp":31,"./sender/jsonp":33,"inherits":57}],24:[function(require,module,exports){
            (function (process){
              'use strict';

              var inherits = require('inherits')
                , urlUtils = require('../../utils/url')
                , SenderReceiver = require('./sender-receiver')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:ajax-based');
              }

              function createAjaxSender(AjaxObject) {
                return function(url, payload, callback) {
                  debug('create ajax sender', url, payload);
                  var opt = {};
                  if (typeof payload === 'string') {
                    opt.headers = {'Content-type': 'text/plain'};
                  }
                  var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
                  var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
                  xo.once('finish', function(status) {
                    debug('finish', status);
                    xo = null;

                    if (status !== 200 && status !== 204) {
                      return callback(new Error('http status ' + status));
                    }
                    callback();
                  });
                  return function() {
                    debug('abort');
                    xo.close();
                    xo = null;

                    var err = new Error('Aborted');
                    err.code = 1000;
                    callback(err);
                  };
                };
              }

              function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
                SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
              }

              inherits(AjaxBasedTransport, SenderReceiver);

              module.exports = AjaxBasedTransport;

            }).call(this,{ env: {} })

          },{"../../utils/url":52,"./sender-receiver":28,"debug":55,"inherits":57}],25:[function(require,module,exports){
            (function (process){
              'use strict';

              var inherits = require('inherits')
                , EventEmitter = require('events').EventEmitter
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:buffered-sender');
              }

              function BufferedSender(url, sender) {
                debug(url);
                EventEmitter.call(this);
                this.sendBuffer = [];
                this.sender = sender;
                this.url = url;
              }

              inherits(BufferedSender, EventEmitter);

              BufferedSender.prototype.send = function(message) {
                debug('send', message);
                this.sendBuffer.push(message);
                if (!this.sendStop) {
                  this.sendSchedule();
                }
              };

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
              BufferedSender.prototype.sendScheduleWait = function() {
                debug('sendScheduleWait');
                var self = this;
                var tref;
                this.sendStop = function() {
                  debug('sendStop');
                  self.sendStop = null;
                  clearTimeout(tref);
                };
                tref = setTimeout(function() {
                  debug('timeout');
                  self.sendStop = null;
                  self.sendSchedule();
                }, 25);
              };

              BufferedSender.prototype.sendSchedule = function() {
                debug('sendSchedule', this.sendBuffer.length);
                var self = this;
                if (this.sendBuffer.length > 0) {
                  var payload = '[' + this.sendBuffer.join(',') + ']';
                  this.sendStop = this.sender(this.url, payload, function(err) {
                    self.sendStop = null;
                    if (err) {
                      debug('error', err);
                      self.emit('close', err.code || 1006, 'Sending error: ' + err);
                      self.close();
                    } else {
                      self.sendScheduleWait();
                    }
                  });
                  this.sendBuffer = [];
                }
              };

              BufferedSender.prototype._cleanup = function() {
                debug('_cleanup');
                this.removeAllListeners();
              };

              BufferedSender.prototype.close = function() {
                debug('close');
                this._cleanup();
                if (this.sendStop) {
                  this.sendStop();
                  this.sendStop = null;
                }
              };

              module.exports = BufferedSender;

            }).call(this,{ env: {} })

          },{"debug":55,"events":3,"inherits":57}],26:[function(require,module,exports){
            (function (global){
              'use strict';

              var inherits = require('inherits')
                , IframeTransport = require('../iframe')
                , objectUtils = require('../../utils/object')
              ;

              module.exports = function(transport) {

                function IframeWrapTransport(transUrl, baseUrl) {
                  IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
                }

                inherits(IframeWrapTransport, IframeTransport);

                IframeWrapTransport.enabled = function(url, info) {
                  if (!global.document) {
                    return false;
                  }

                  var iframeInfo = objectUtils.extend({}, info);
                  iframeInfo.sameOrigin = true;
                  return transport.enabled(iframeInfo) && IframeTransport.enabled();
                };

                IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
                IframeWrapTransport.needBody = true;
                IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

                IframeWrapTransport.facadeTransport = transport;

                return IframeWrapTransport;
              };

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"../../utils/object":49,"../iframe":22,"inherits":57}],27:[function(require,module,exports){
            (function (process){
              'use strict';

              var inherits = require('inherits')
                , EventEmitter = require('events').EventEmitter
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:polling');
              }

              function Polling(Receiver, receiveUrl, AjaxObject) {
                debug(receiveUrl);
                EventEmitter.call(this);
                this.Receiver = Receiver;
                this.receiveUrl = receiveUrl;
                this.AjaxObject = AjaxObject;
                this._scheduleReceiver();
              }

              inherits(Polling, EventEmitter);

              Polling.prototype._scheduleReceiver = function() {
                debug('_scheduleReceiver');
                var self = this;
                var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

                poll.on('message', function(msg) {
                  debug('message', msg);
                  self.emit('message', msg);
                });

                poll.once('close', function(code, reason) {
                  debug('close', code, reason, self.pollIsClosing);
                  self.poll = poll = null;

                  if (!self.pollIsClosing) {
                    if (reason === 'network') {
                      self._scheduleReceiver();
                    } else {
                      self.emit('close', code || 1006, reason);
                      self.removeAllListeners();
                    }
                  }
                });
              };

              Polling.prototype.abort = function() {
                debug('abort');
                this.removeAllListeners();
                this.pollIsClosing = true;
                if (this.poll) {
                  this.poll.abort();
                }
              };

              module.exports = Polling;

            }).call(this,{ env: {} })

          },{"debug":55,"events":3,"inherits":57}],28:[function(require,module,exports){
            (function (process){
              'use strict';

              var inherits = require('inherits')
                , urlUtils = require('../../utils/url')
                , BufferedSender = require('./buffered-sender')
                , Polling = require('./polling')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:sender-receiver');
              }

              function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
                var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
                debug(pollUrl);
                var self = this;
                BufferedSender.call(this, transUrl, senderFunc);

                this.poll = new Polling(Receiver, pollUrl, AjaxObject);
                this.poll.on('message', function(msg) {
                  debug('poll message', msg);
                  self.emit('message', msg);
                });
                this.poll.once('close', function(code, reason) {
                  debug('poll close', code, reason);
                  self.poll = null;
                  self.emit('close', code, reason);
                  self.close();
                });
              }

              inherits(SenderReceiver, BufferedSender);

              SenderReceiver.prototype.close = function() {
                BufferedSender.prototype.close.call(this);
                debug('close');
                this.removeAllListeners();
                if (this.poll) {
                  this.poll.abort();
                  this.poll = null;
                }
              };

              module.exports = SenderReceiver;

            }).call(this,{ env: {} })

          },{"../../utils/url":52,"./buffered-sender":25,"./polling":27,"debug":55,"inherits":57}],29:[function(require,module,exports){
            (function (process){
              'use strict';

              var inherits = require('inherits')
                , EventEmitter = require('events').EventEmitter
                , EventSourceDriver = require('eventsource')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:receiver:eventsource');
              }

              function EventSourceReceiver(url) {
                debug(url);
                EventEmitter.call(this);

                var self = this;
                var es = this.es = new EventSourceDriver(url);
                es.onmessage = function(e) {
                  debug('message', e.data);
                  self.emit('message', decodeURI(e.data));
                };
                es.onerror = function(e) {
                  debug('error', es.readyState, e);
                  // ES on reconnection has readyState = 0 or 1.
                  // on network error it's CLOSED = 2
                  var reason = (es.readyState !== 2 ? 'network' : 'permanent');
                  self._cleanup();
                  self._close(reason);
                };
              }

              inherits(EventSourceReceiver, EventEmitter);

              EventSourceReceiver.prototype.abort = function() {
                debug('abort');
                this._cleanup();
                this._close('user');
              };

              EventSourceReceiver.prototype._cleanup = function() {
                debug('cleanup');
                var es = this.es;
                if (es) {
                  es.onmessage = es.onerror = null;
                  es.close();
                  this.es = null;
                }
              };

              EventSourceReceiver.prototype._close = function(reason) {
                debug('close', reason);
                var self = this;
                // Safari and chrome < 15 crash if we close window before
                // waiting for ES cleanup. See:
                // https://code.google.com/p/chromium/issues/detail?id=89155
                setTimeout(function() {
                  self.emit('close', null, reason);
                  self.removeAllListeners();
                }, 200);
              };

              module.exports = EventSourceReceiver;

            }).call(this,{ env: {} })

          },{"debug":55,"events":3,"eventsource":18,"inherits":57}],30:[function(require,module,exports){
            (function (process,global){
              'use strict';

              var inherits = require('inherits')
                , iframeUtils = require('../../utils/iframe')
                , urlUtils = require('../../utils/url')
                , EventEmitter = require('events').EventEmitter
                , random = require('../../utils/random')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:receiver:htmlfile');
              }

              function HtmlfileReceiver(url) {
                debug(url);
                EventEmitter.call(this);
                var self = this;
                iframeUtils.polluteGlobalNamespace();

                this.id = 'a' + random.string(6);
                url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

                debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
                var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
                  iframeUtils.createHtmlfile : iframeUtils.createIframe;

                global[iframeUtils.WPrefix][this.id] = {
                  start: function() {
                    debug('start');
                    self.iframeObj.loaded();
                  }
                  , message: function(data) {
                    debug('message', data);
                    self.emit('message', data);
                  }
                  , stop: function() {
                    debug('stop');
                    self._cleanup();
                    self._close('network');
                  }
                };
                this.iframeObj = constructFunc(url, function() {
                  debug('callback');
                  self._cleanup();
                  self._close('permanent');
                });
              }

              inherits(HtmlfileReceiver, EventEmitter);

              HtmlfileReceiver.prototype.abort = function() {
                debug('abort');
                this._cleanup();
                this._close('user');
              };

              HtmlfileReceiver.prototype._cleanup = function() {
                debug('_cleanup');
                if (this.iframeObj) {
                  this.iframeObj.cleanup();
                  this.iframeObj = null;
                }
                delete global[iframeUtils.WPrefix][this.id];
              };

              HtmlfileReceiver.prototype._close = function(reason) {
                debug('_close', reason);
                this.emit('close', null, reason);
                this.removeAllListeners();
              };

              HtmlfileReceiver.htmlfileEnabled = false;

// obfuscate to avoid firewalls
              var axo = ['Active'].concat('Object').join('X');
              if (axo in global) {
                try {
                  HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
                } catch (x) {
                  // intentionally empty
                }
              }

              HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

              module.exports = HtmlfileReceiver;

            }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],31:[function(require,module,exports){
            (function (process,global){
              'use strict';

              var utils = require('../../utils/iframe')
                , random = require('../../utils/random')
                , browser = require('../../utils/browser')
                , urlUtils = require('../../utils/url')
                , inherits = require('inherits')
                , EventEmitter = require('events').EventEmitter
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:receiver:jsonp');
              }

              function JsonpReceiver(url) {
                debug(url);
                var self = this;
                EventEmitter.call(this);

                utils.polluteGlobalNamespace();

                this.id = 'a' + random.string(6);
                var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

                global[utils.WPrefix][this.id] = this._callback.bind(this);
                this._createScript(urlWithId);

                // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
                this.timeoutId = setTimeout(function() {
                  debug('timeout');
                  self._abort(new Error('JSONP script loaded abnormally (timeout)'));
                }, JsonpReceiver.timeout);
              }

              inherits(JsonpReceiver, EventEmitter);

              JsonpReceiver.prototype.abort = function() {
                debug('abort');
                if (global[utils.WPrefix][this.id]) {
                  var err = new Error('JSONP user aborted read');
                  err.code = 1000;
                  this._abort(err);
                }
              };

              JsonpReceiver.timeout = 35000;
              JsonpReceiver.scriptErrorTimeout = 1000;

              JsonpReceiver.prototype._callback = function(data) {
                debug('_callback', data);
                this._cleanup();

                if (this.aborting) {
                  return;
                }

                if (data) {
                  debug('message', data);
                  this.emit('message', data);
                }
                this.emit('close', null, 'network');
                this.removeAllListeners();
              };

              JsonpReceiver.prototype._abort = function(err) {
                debug('_abort', err);
                this._cleanup();
                this.aborting = true;
                this.emit('close', err.code, err.message);
                this.removeAllListeners();
              };

              JsonpReceiver.prototype._cleanup = function() {
                debug('_cleanup');
                clearTimeout(this.timeoutId);
                if (this.script2) {
                  this.script2.parentNode.removeChild(this.script2);
                  this.script2 = null;
                }
                if (this.script) {
                  var script = this.script;
                  // Unfortunately, you can't really abort script loading of
                  // the script.
                  script.parentNode.removeChild(script);
                  script.onreadystatechange = script.onerror =
                    script.onload = script.onclick = null;
                  this.script = null;
                }
                delete global[utils.WPrefix][this.id];
              };

              JsonpReceiver.prototype._scriptError = function() {
                debug('_scriptError');
                var self = this;
                if (this.errorTimer) {
                  return;
                }

                this.errorTimer = setTimeout(function() {
                  if (!self.loadedOkay) {
                    self._abort(new Error('JSONP script loaded abnormally (onerror)'));
                  }
                }, JsonpReceiver.scriptErrorTimeout);
              };

              JsonpReceiver.prototype._createScript = function(url) {
                debug('_createScript', url);
                var self = this;
                var script = this.script = global.document.createElement('script');
                var script2;  // Opera synchronous load trick.

                script.id = 'a' + random.string(8);
                script.src = url;
                script.type = 'text/javascript';
                script.charset = 'UTF-8';
                script.onerror = this._scriptError.bind(this);
                script.onload = function() {
                  debug('onload');
                  self._abort(new Error('JSONP script loaded abnormally (onload)'));
                };

                // IE9 fires 'error' event after onreadystatechange or before, in random order.
                // Use loadedOkay to determine if actually errored
                script.onreadystatechange = function() {
                  debug('onreadystatechange', script.readyState);
                  if (/loaded|closed/.test(script.readyState)) {
                    if (script && script.htmlFor && script.onclick) {
                      self.loadedOkay = true;
                      try {
                        // In IE, actually execute the script.
                        script.onclick();
                      } catch (x) {
                        // intentionally empty
                      }
                    }
                    if (script) {
                      self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
                    }
                  }
                };
                // IE: event/htmlFor/onclick trick.
                // One can't rely on proper order for onreadystatechange. In order to
                // make sure, set a 'htmlFor' and 'event' properties, so that
                // script code will be installed as 'onclick' handler for the
                // script object. Later, onreadystatechange, manually execute this
                // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
                // set. For reference see:
                //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
                // Also, read on that about script ordering:
                //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
                if (typeof script.async === 'undefined' && global.document.attachEvent) {
                  // According to mozilla docs, in recent browsers script.async defaults
                  // to 'true', so we may use it to detect a good browser:
                  // https://developer.mozilla.org/en/HTML/Element/script
                  if (!browser.isOpera()) {
                    // Naively assume we're in IE
                    try {
                      script.htmlFor = script.id;
                      script.event = 'onclick';
                    } catch (x) {
                      // intentionally empty
                    }
                    script.async = true;
                  } else {
                    // Opera, second sync script hack
                    script2 = this.script2 = global.document.createElement('script');
                    script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
                    script.async = script2.async = false;
                  }
                }
                if (typeof script.async !== 'undefined') {
                  script.async = true;
                }

                var head = global.document.getElementsByTagName('head')[0];
                head.insertBefore(script, head.firstChild);
                if (script2) {
                  head.insertBefore(script2, head.firstChild);
                }
              };

              module.exports = JsonpReceiver;

            }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"../../utils/browser":44,"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],32:[function(require,module,exports){
            (function (process){
              'use strict';

              var inherits = require('inherits')
                , EventEmitter = require('events').EventEmitter
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:receiver:xhr');
              }

              function XhrReceiver(url, AjaxObject) {
                debug(url);
                EventEmitter.call(this);
                var self = this;

                this.bufferPosition = 0;

                this.xo = new AjaxObject('POST', url, null);
                this.xo.on('chunk', this._chunkHandler.bind(this));
                this.xo.once('finish', function(status, text) {
                  debug('finish', status, text);
                  self._chunkHandler(status, text);
                  self.xo = null;
                  var reason = status === 200 ? 'network' : 'permanent';
                  debug('close', reason);
                  self.emit('close', null, reason);
                  self._cleanup();
                });
              }

              inherits(XhrReceiver, EventEmitter);

              XhrReceiver.prototype._chunkHandler = function(status, text) {
                debug('_chunkHandler', status);
                if (status !== 200 || !text) {
                  return;
                }

                for (var idx = -1; ; this.bufferPosition += idx + 1) {
                  var buf = text.slice(this.bufferPosition);
                  idx = buf.indexOf('\n');
                  if (idx === -1) {
                    break;
                  }
                  var msg = buf.slice(0, idx);
                  if (msg) {
                    debug('message', msg);
                    this.emit('message', msg);
                  }
                }
              };

              XhrReceiver.prototype._cleanup = function() {
                debug('_cleanup');
                this.removeAllListeners();
              };

              XhrReceiver.prototype.abort = function() {
                debug('abort');
                if (this.xo) {
                  this.xo.close();
                  debug('close');
                  this.emit('close', null, 'user');
                  this.xo = null;
                }
                this._cleanup();
              };

              module.exports = XhrReceiver;

            }).call(this,{ env: {} })

          },{"debug":55,"events":3,"inherits":57}],33:[function(require,module,exports){
            (function (process,global){
              'use strict';

              var random = require('../../utils/random')
                , urlUtils = require('../../utils/url')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:sender:jsonp');
              }

              var form, area;

              function createIframe(id) {
                debug('createIframe', id);
                try {
                  // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
                  return global.document.createElement('<iframe name="' + id + '">');
                } catch (x) {
                  var iframe = global.document.createElement('iframe');
                  iframe.name = id;
                  return iframe;
                }
              }

              function createForm() {
                debug('createForm');
                form = global.document.createElement('form');
                form.style.display = 'none';
                form.style.position = 'absolute';
                form.method = 'POST';
                form.enctype = 'application/x-www-form-urlencoded';
                form.acceptCharset = 'UTF-8';

                area = global.document.createElement('textarea');
                area.name = 'd';
                form.appendChild(area);

                global.document.body.appendChild(form);
              }

              module.exports = function(url, payload, callback) {
                debug(url, payload);
                if (!form) {
                  createForm();
                }
                var id = 'a' + random.string(8);
                form.target = id;
                form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

                var iframe = createIframe(id);
                iframe.id = id;
                iframe.style.display = 'none';
                form.appendChild(iframe);

                try {
                  area.value = payload;
                } catch (e) {
                  // seriously broken browsers get here
                }
                form.submit();

                var completed = function(err) {
                  debug('completed', id, err);
                  if (!iframe.onerror) {
                    return;
                  }
                  iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
                  // Opera mini doesn't like if we GC iframe
                  // immediately, thus this timeout.
                  setTimeout(function() {
                    debug('cleaning up', id);
                    iframe.parentNode.removeChild(iframe);
                    iframe = null;
                  }, 500);
                  area.value = '';
                  // It is not possible to detect if the iframe succeeded or
                  // failed to submit our form.
                  callback(err);
                };
                iframe.onerror = function() {
                  debug('onerror', id);
                  completed();
                };
                iframe.onload = function() {
                  debug('onload', id);
                  completed();
                };
                iframe.onreadystatechange = function(e) {
                  debug('onreadystatechange', id, iframe.readyState, e);
                  if (iframe.readyState === 'complete') {
                    completed();
                  }
                };
                return function() {
                  debug('aborted', id);
                  completed(new Error('Aborted'));
                };
              };

            }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"../../utils/random":50,"../../utils/url":52,"debug":55}],34:[function(require,module,exports){
            (function (process,global){
              'use strict';

              var EventEmitter = require('events').EventEmitter
                , inherits = require('inherits')
                , eventUtils = require('../../utils/event')
                , browser = require('../../utils/browser')
                , urlUtils = require('../../utils/url')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:sender:xdr');
              }

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

              function XDRObject(method, url, payload) {
                debug(method, url);
                var self = this;
                EventEmitter.call(this);

                setTimeout(function() {
                  self._start(method, url, payload);
                }, 0);
              }

              inherits(XDRObject, EventEmitter);

              XDRObject.prototype._start = function(method, url, payload) {
                debug('_start');
                var self = this;
                var xdr = new global.XDomainRequest();
                // IE caches even POSTs
                url = urlUtils.addQuery(url, 't=' + (+new Date()));

                xdr.onerror = function() {
                  debug('onerror');
                  self._error();
                };
                xdr.ontimeout = function() {
                  debug('ontimeout');
                  self._error();
                };
                xdr.onprogress = function() {
                  debug('progress', xdr.responseText);
                  self.emit('chunk', 200, xdr.responseText);
                };
                xdr.onload = function() {
                  debug('load');
                  self.emit('finish', 200, xdr.responseText);
                  self._cleanup(false);
                };
                this.xdr = xdr;
                this.unloadRef = eventUtils.unloadAdd(function() {
                  self._cleanup(true);
                });
                try {
                  // Fails with AccessDenied if port number is bogus
                  this.xdr.open(method, url);
                  if (this.timeout) {
                    this.xdr.timeout = this.timeout;
                  }
                  this.xdr.send(payload);
                } catch (x) {
                  this._error();
                }
              };

              XDRObject.prototype._error = function() {
                this.emit('finish', 0, '');
                this._cleanup(false);
              };

              XDRObject.prototype._cleanup = function(abort) {
                debug('cleanup', abort);
                if (!this.xdr) {
                  return;
                }
                this.removeAllListeners();
                eventUtils.unloadDel(this.unloadRef);

                this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
                if (abort) {
                  try {
                    this.xdr.abort();
                  } catch (x) {
                    // intentionally empty
                  }
                }
                this.unloadRef = this.xdr = null;
              };

              XDRObject.prototype.close = function() {
                debug('close');
                this._cleanup(true);
              };

// IE 8/9 if the request target uses the same scheme - #79
              XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

              module.exports = XDRObject;

            }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"../../utils/browser":44,"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],35:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , XhrDriver = require('../driver/xhr')
            ;

            function XHRCorsObject(method, url, payload, opts) {
              XhrDriver.call(this, method, url, payload, opts);
            }

            inherits(XHRCorsObject, XhrDriver);

            XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

            module.exports = XHRCorsObject;

          },{"../driver/xhr":17,"inherits":57}],36:[function(require,module,exports){
            'use strict';

            var EventEmitter = require('events').EventEmitter
              , inherits = require('inherits')
            ;

            function XHRFake(/* method, url, payload, opts */) {
              var self = this;
              EventEmitter.call(this);

              this.to = setTimeout(function() {
                self.emit('finish', 200, '{}');
              }, XHRFake.timeout);
            }

            inherits(XHRFake, EventEmitter);

            XHRFake.prototype.close = function() {
              clearTimeout(this.to);
            };

            XHRFake.timeout = 2000;

            module.exports = XHRFake;

          },{"events":3,"inherits":57}],37:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , XhrDriver = require('../driver/xhr')
            ;

            function XHRLocalObject(method, url, payload /*, opts */) {
              XhrDriver.call(this, method, url, payload, {
                noCredentials: true
              });
            }

            inherits(XHRLocalObject, XhrDriver);

            XHRLocalObject.enabled = XhrDriver.enabled;

            module.exports = XHRLocalObject;

          },{"../driver/xhr":17,"inherits":57}],38:[function(require,module,exports){
            (function (process){
              'use strict';

              var utils = require('../utils/event')
                , urlUtils = require('../utils/url')
                , inherits = require('inherits')
                , EventEmitter = require('events').EventEmitter
                , WebsocketDriver = require('./driver/websocket')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:websocket');
              }

              function WebSocketTransport(transUrl, ignore, options) {
                if (!WebSocketTransport.enabled()) {
                  throw new Error('Transport created when disabled');
                }

                EventEmitter.call(this);
                debug('constructor', transUrl);

                var self = this;
                var url = urlUtils.addPath(transUrl, '/websocket');
                if (url.slice(0, 5) === 'https') {
                  url = 'wss' + url.slice(5);
                } else {
                  url = 'ws' + url.slice(4);
                }
                this.url = url;

                this.ws = new WebsocketDriver(this.url, [], options);
                this.ws.onmessage = function(e) {
                  debug('message event', e.data);
                  self.emit('message', e.data);
                };
                // Firefox has an interesting bug. If a websocket connection is
                // created after onunload, it stays alive even when user
                // navigates away from the page. In such situation let's lie -
                // let's not open the ws connection at all. See:
                // https://github.com/sockjs/sockjs-client/issues/28
                // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
                this.unloadRef = utils.unloadAdd(function() {
                  debug('unload');
                  self.ws.close();
                });
                this.ws.onclose = function(e) {
                  debug('close event', e.code, e.reason);
                  self.emit('close', e.code, e.reason);
                  self._cleanup();
                };
                this.ws.onerror = function(e) {
                  debug('error event', e);
                  self.emit('close', 1006, 'WebSocket connection broken');
                  self._cleanup();
                };
              }

              inherits(WebSocketTransport, EventEmitter);

              WebSocketTransport.prototype.send = function(data) {
                var msg = '[' + data + ']';
                debug('send', msg);
                this.ws.send(msg);
              };

              WebSocketTransport.prototype.close = function() {
                debug('close');
                var ws = this.ws;
                this._cleanup();
                if (ws) {
                  ws.close();
                }
              };

              WebSocketTransport.prototype._cleanup = function() {
                debug('_cleanup');
                var ws = this.ws;
                if (ws) {
                  ws.onmessage = ws.onclose = ws.onerror = null;
                }
                utils.unloadDel(this.unloadRef);
                this.unloadRef = this.ws = null;
                this.removeAllListeners();
              };

              WebSocketTransport.enabled = function() {
                debug('enabled');
                return !!WebsocketDriver;
              };
              WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
              WebSocketTransport.roundTrips = 2;

              module.exports = WebSocketTransport;

            }).call(this,{ env: {} })

          },{"../utils/event":46,"../utils/url":52,"./driver/websocket":19,"debug":55,"events":3,"inherits":57}],39:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , AjaxBasedTransport = require('./lib/ajax-based')
              , XdrStreamingTransport = require('./xdr-streaming')
              , XhrReceiver = require('./receiver/xhr')
              , XDRObject = require('./sender/xdr')
            ;

            function XdrPollingTransport(transUrl) {
              if (!XDRObject.enabled) {
                throw new Error('Transport created when disabled');
              }
              AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
            }

            inherits(XdrPollingTransport, AjaxBasedTransport);

            XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
            XdrPollingTransport.transportName = 'xdr-polling';
            XdrPollingTransport.roundTrips = 2; // preflight, ajax

            module.exports = XdrPollingTransport;

          },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"./xdr-streaming":40,"inherits":57}],40:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , AjaxBasedTransport = require('./lib/ajax-based')
              , XhrReceiver = require('./receiver/xhr')
              , XDRObject = require('./sender/xdr')
            ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

            function XdrStreamingTransport(transUrl) {
              if (!XDRObject.enabled) {
                throw new Error('Transport created when disabled');
              }
              AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
            }

            inherits(XdrStreamingTransport, AjaxBasedTransport);

            XdrStreamingTransport.enabled = function(info) {
              if (info.cookie_needed || info.nullOrigin) {
                return false;
              }
              return XDRObject.enabled && info.sameScheme;
            };

            XdrStreamingTransport.transportName = 'xdr-streaming';
            XdrStreamingTransport.roundTrips = 2; // preflight, ajax

            module.exports = XdrStreamingTransport;

          },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"inherits":57}],41:[function(require,module,exports){
            'use strict';

            var inherits = require('inherits')
              , AjaxBasedTransport = require('./lib/ajax-based')
              , XhrReceiver = require('./receiver/xhr')
              , XHRCorsObject = require('./sender/xhr-cors')
              , XHRLocalObject = require('./sender/xhr-local')
            ;

            function XhrPollingTransport(transUrl) {
              if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
                throw new Error('Transport created when disabled');
              }
              AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
            }

            inherits(XhrPollingTransport, AjaxBasedTransport);

            XhrPollingTransport.enabled = function(info) {
              if (info.nullOrigin) {
                return false;
              }

              if (XHRLocalObject.enabled && info.sameOrigin) {
                return true;
              }
              return XHRCorsObject.enabled;
            };

            XhrPollingTransport.transportName = 'xhr-polling';
            XhrPollingTransport.roundTrips = 2; // preflight, ajax

            module.exports = XhrPollingTransport;

          },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],42:[function(require,module,exports){
            (function (global){
              'use strict';

              var inherits = require('inherits')
                , AjaxBasedTransport = require('./lib/ajax-based')
                , XhrReceiver = require('./receiver/xhr')
                , XHRCorsObject = require('./sender/xhr-cors')
                , XHRLocalObject = require('./sender/xhr-local')
                , browser = require('../utils/browser')
              ;

              function XhrStreamingTransport(transUrl) {
                if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
                  throw new Error('Transport created when disabled');
                }
                AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
              }

              inherits(XhrStreamingTransport, AjaxBasedTransport);

              XhrStreamingTransport.enabled = function(info) {
                if (info.nullOrigin) {
                  return false;
                }
                // Opera doesn't support xhr-streaming #60
                // But it might be able to #92
                if (browser.isOpera()) {
                  return false;
                }

                return XHRCorsObject.enabled;
              };

              XhrStreamingTransport.transportName = 'xhr-streaming';
              XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
              XhrStreamingTransport.needBody = !!global.document;

              module.exports = XhrStreamingTransport;

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"../utils/browser":44,"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],43:[function(require,module,exports){
            (function (global){
              'use strict';

              if (global.crypto && global.crypto.getRandomValues) {
                module.exports.randomBytes = function(length) {
                  var bytes = new Uint8Array(length);
                  global.crypto.getRandomValues(bytes);
                  return bytes;
                };
              } else {
                module.exports.randomBytes = function(length) {
                  var bytes = new Array(length);
                  for (var i = 0; i < length; i++) {
                    bytes[i] = Math.floor(Math.random() * 256);
                  }
                  return bytes;
                };
              }

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{}],44:[function(require,module,exports){
            (function (global){
              'use strict';

              module.exports = {
                isOpera: function() {
                  return global.navigator &&
                    /opera/i.test(global.navigator.userAgent);
                }

                , isKonqueror: function() {
                  return global.navigator &&
                    /konqueror/i.test(global.navigator.userAgent);
                }

                // #187 wrap document.domain in try/catch because of WP8 from file:///
                , hasDomain: function () {
                  // non-browser client always has a domain
                  if (!global.document) {
                    return true;
                  }

                  try {
                    return !!global.document.domain;
                  } catch (e) {
                    return false;
                  }
                }
              };

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{}],45:[function(require,module,exports){
            'use strict';

            var JSON3 = require('json3');

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex
            var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
              , extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
            var unrollLookup = function(escapable) {
              var i;
              var unrolled = {};
              var c = [];
              for (i = 0; i < 65536; i++) {
                c.push( String.fromCharCode(i) );
              }
              escapable.lastIndex = 0;
              c.join('').replace(escapable, function(a) {
                unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                return '';
              });
              escapable.lastIndex = 0;
              return unrolled;
            };

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
            module.exports = {
              quote: function(string) {
                var quoted = JSON3.stringify(string);

                // In most cases this should be very fast and good enough.
                extraEscapable.lastIndex = 0;
                if (!extraEscapable.test(quoted)) {
                  return quoted;
                }

                if (!extraLookup) {
                  extraLookup = unrollLookup(extraEscapable);
                }

                return quoted.replace(extraEscapable, function(a) {
                  return extraLookup[a];
                });
              }
            };

          },{"json3":58}],46:[function(require,module,exports){
            (function (global){
              'use strict';

              var random = require('./random');

              var onUnload = {}
                , afterUnload = false
                // detect google chrome packaged apps because they don't allow the 'unload' event
                , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
              ;

              module.exports = {
                attachEvent: function(event, listener) {
                  if (typeof global.addEventListener !== 'undefined') {
                    global.addEventListener(event, listener, false);
                  } else if (global.document && global.attachEvent) {
                    // IE quirks.
                    // According to: http://stevesouders.com/misc/test-postmessage.php
                    // the message gets delivered only to 'document', not 'window'.
                    global.document.attachEvent('on' + event, listener);
                    // I get 'window' for ie8.
                    global.attachEvent('on' + event, listener);
                  }
                }

                , detachEvent: function(event, listener) {
                  if (typeof global.addEventListener !== 'undefined') {
                    global.removeEventListener(event, listener, false);
                  } else if (global.document && global.detachEvent) {
                    global.document.detachEvent('on' + event, listener);
                    global.detachEvent('on' + event, listener);
                  }
                }

                , unloadAdd: function(listener) {
                  if (isChromePackagedApp) {
                    return null;
                  }

                  var ref = random.string(8);
                  onUnload[ref] = listener;
                  if (afterUnload) {
                    setTimeout(this.triggerUnloadCallbacks, 0);
                  }
                  return ref;
                }

                , unloadDel: function(ref) {
                  if (ref in onUnload) {
                    delete onUnload[ref];
                  }
                }

                , triggerUnloadCallbacks: function() {
                  for (var ref in onUnload) {
                    onUnload[ref]();
                    delete onUnload[ref];
                  }
                }
              };

              var unloadTriggered = function() {
                if (afterUnload) {
                  return;
                }
                afterUnload = true;
                module.exports.triggerUnloadCallbacks();
              };

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
              if (!isChromePackagedApp) {
                module.exports.attachEvent('unload', unloadTriggered);
              }

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"./random":50}],47:[function(require,module,exports){
            (function (process,global){
              'use strict';

              var eventUtils = require('./event')
                , JSON3 = require('json3')
                , browser = require('./browser')
              ;

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:utils:iframe');
              }

              module.exports = {
                WPrefix: '_jp'
                , currentWindowId: null

                , polluteGlobalNamespace: function() {
                  if (!(module.exports.WPrefix in global)) {
                    global[module.exports.WPrefix] = {};
                  }
                }

                , postMessage: function(type, data) {
                  if (global.parent !== global) {
                    global.parent.postMessage(JSON3.stringify({
                      windowId: module.exports.currentWindowId
                      , type: type
                      , data: data || ''
                    }), '*');
                  } else {
                    debug('Cannot postMessage, no parent window.', type, data);
                  }
                }

                , createIframe: function(iframeUrl, errorCallback) {
                  var iframe = global.document.createElement('iframe');
                  var tref, unloadRef;
                  var unattach = function() {
                    debug('unattach');
                    clearTimeout(tref);
                    // Explorer had problems with that.
                    try {
                      iframe.onload = null;
                    } catch (x) {
                      // intentionally empty
                    }
                    iframe.onerror = null;
                  };
                  var cleanup = function() {
                    debug('cleanup');
                    if (iframe) {
                      unattach();
                      // This timeout makes chrome fire onbeforeunload event
                      // within iframe. Without the timeout it goes straight to
                      // onunload.
                      setTimeout(function() {
                        if (iframe) {
                          iframe.parentNode.removeChild(iframe);
                        }
                        iframe = null;
                      }, 0);
                      eventUtils.unloadDel(unloadRef);
                    }
                  };
                  var onerror = function(err) {
                    debug('onerror', err);
                    if (iframe) {
                      cleanup();
                      errorCallback(err);
                    }
                  };
                  var post = function(msg, origin) {
                    debug('post', msg, origin);
                    setTimeout(function() {
                      try {
                        // When the iframe is not loaded, IE raises an exception
                        // on 'contentWindow'.
                        if (iframe && iframe.contentWindow) {
                          iframe.contentWindow.postMessage(msg, origin);
                        }
                      } catch (x) {
                        // intentionally empty
                      }
                    }, 0);
                  };

                  iframe.src = iframeUrl;
                  iframe.style.display = 'none';
                  iframe.style.position = 'absolute';
                  iframe.onerror = function() {
                    onerror('onerror');
                  };
                  iframe.onload = function() {
                    debug('onload');
                    // `onload` is triggered before scripts on the iframe are
                    // executed. Give it few seconds to actually load stuff.
                    clearTimeout(tref);
                    tref = setTimeout(function() {
                      onerror('onload timeout');
                    }, 2000);
                  };
                  global.document.body.appendChild(iframe);
                  tref = setTimeout(function() {
                    onerror('timeout');
                  }, 15000);
                  unloadRef = eventUtils.unloadAdd(cleanup);
                  return {
                    post: post
                    , cleanup: cleanup
                    , loaded: unattach
                  };
                }

                /* eslint no-undef: "off", new-cap: "off" */
                , createHtmlfile: function(iframeUrl, errorCallback) {
                  var axo = ['Active'].concat('Object').join('X');
                  var doc = new global[axo]('htmlfile');
                  var tref, unloadRef;
                  var iframe;
                  var unattach = function() {
                    clearTimeout(tref);
                    iframe.onerror = null;
                  };
                  var cleanup = function() {
                    if (doc) {
                      unattach();
                      eventUtils.unloadDel(unloadRef);
                      iframe.parentNode.removeChild(iframe);
                      iframe = doc = null;
                      CollectGarbage();
                    }
                  };
                  var onerror = function(r) {
                    debug('onerror', r);
                    if (doc) {
                      cleanup();
                      errorCallback(r);
                    }
                  };
                  var post = function(msg, origin) {
                    try {
                      // When the iframe is not loaded, IE raises an exception
                      // on 'contentWindow'.
                      setTimeout(function() {
                        if (iframe && iframe.contentWindow) {
                          iframe.contentWindow.postMessage(msg, origin);
                        }
                      }, 0);
                    } catch (x) {
                      // intentionally empty
                    }
                  };

                  doc.open();
                  doc.write('<html><s' + 'cript>' +
                    'document.domain="' + global.document.domain + '";' +
                    '</s' + 'cript></html>');
                  doc.close();
                  doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
                  var c = doc.createElement('div');
                  doc.body.appendChild(c);
                  iframe = doc.createElement('iframe');
                  c.appendChild(iframe);
                  iframe.src = iframeUrl;
                  iframe.onerror = function() {
                    onerror('onerror');
                  };
                  tref = setTimeout(function() {
                    onerror('timeout');
                  }, 15000);
                  unloadRef = eventUtils.unloadAdd(cleanup);
                  return {
                    post: post
                    , cleanup: cleanup
                    , loaded: unattach
                  };
                }
              };

              module.exports.iframeEnabled = false;
              if (global.document) {
                // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
                // huge delay, or not at all.
                module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
                  typeof global.postMessage === 'object') && (!browser.isKonqueror());
              }

            }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"./browser":44,"./event":46,"debug":55,"json3":58}],48:[function(require,module,exports){
            (function (global){
              'use strict';

              var logObject = {};
              ['log', 'debug', 'warn'].forEach(function (level) {
                var levelExists;

                try {
                  levelExists = global.console && global.console[level] && global.console[level].apply;
                } catch(e) {
                  // do nothing
                }

                logObject[level] = levelExists ? function () {
                  return global.console[level].apply(global.console, arguments);
                } : (level === 'log' ? function () {} : logObject.log);
              });

              module.exports = logObject;

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{}],49:[function(require,module,exports){
            'use strict';

            module.exports = {
              isObject: function(obj) {
                var type = typeof obj;
                return type === 'function' || type === 'object' && !!obj;
              }

              , extend: function(obj) {
                if (!this.isObject(obj)) {
                  return obj;
                }
                var source, prop;
                for (var i = 1, length = arguments.length; i < length; i++) {
                  source = arguments[i];
                  for (prop in source) {
                    if (Object.prototype.hasOwnProperty.call(source, prop)) {
                      obj[prop] = source[prop];
                    }
                  }
                }
                return obj;
              }
            };

          },{}],50:[function(require,module,exports){
            'use strict';

            /* global crypto:true */
            var crypto = require('crypto');

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
            var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
            module.exports = {
              string: function(length) {
                var max = _randomStringChars.length;
                var bytes = crypto.randomBytes(length);
                var ret = [];
                for (var i = 0; i < length; i++) {
                  ret.push(_randomStringChars.substr(bytes[i] % max, 1));
                }
                return ret.join('');
              }

              , number: function(max) {
                return Math.floor(Math.random() * max);
              }

              , numberString: function(max) {
                var t = ('' + (max - 1)).length;
                var p = new Array(t + 1).join('0');
                return (p + this.number(max)).slice(-t);
              }
            };

          },{"crypto":43}],51:[function(require,module,exports){
            (function (process){
              'use strict';

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:utils:transport');
              }

              module.exports = function(availableTransports) {
                return {
                  filterToEnabled: function(transportsWhitelist, info) {
                    var transports = {
                      main: []
                      , facade: []
                    };
                    if (!transportsWhitelist) {
                      transportsWhitelist = [];
                    } else if (typeof transportsWhitelist === 'string') {
                      transportsWhitelist = [transportsWhitelist];
                    }

                    availableTransports.forEach(function(trans) {
                      if (!trans) {
                        return;
                      }

                      if (trans.transportName === 'websocket' && info.websocket === false) {
                        debug('disabled from server', 'websocket');
                        return;
                      }

                      if (transportsWhitelist.length &&
                        transportsWhitelist.indexOf(trans.transportName) === -1) {
                        debug('not in whitelist', trans.transportName);
                        return;
                      }

                      if (trans.enabled(info)) {
                        debug('enabled', trans.transportName);
                        transports.main.push(trans);
                        if (trans.facadeTransport) {
                          transports.facade.push(trans.facadeTransport);
                        }
                      } else {
                        debug('disabled', trans.transportName);
                      }
                    });
                    return transports;
                  }
                };
              };

            }).call(this,{ env: {} })

          },{"debug":55}],52:[function(require,module,exports){
            (function (process){
              'use strict';

              var URL = require('url-parse');

              var debug = function() {};
              if (process.env.NODE_ENV !== 'production') {
                debug = require('debug')('sockjs-client:utils:url');
              }

              module.exports = {
                getOrigin: function(url) {
                  if (!url) {
                    return null;
                  }

                  var p = new URL(url);
                  if (p.protocol === 'file:') {
                    return null;
                  }

                  var port = p.port;
                  if (!port) {
                    port = (p.protocol === 'https:') ? '443' : '80';
                  }

                  return p.protocol + '//' + p.hostname + ':' + port;
                }

                , isOriginEqual: function(a, b) {
                  var res = this.getOrigin(a) === this.getOrigin(b);
                  debug('same', a, b, res);
                  return res;
                }

                , isSchemeEqual: function(a, b) {
                  return (a.split(':')[0] === b.split(':')[0]);
                }

                , addPath: function (url, path) {
                  var qs = url.split('?');
                  return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
                }

                , addQuery: function (url, q) {
                  return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
                }
              };

            }).call(this,{ env: {} })

          },{"debug":55,"url-parse":61}],53:[function(require,module,exports){
            module.exports = '1.4.0';

          },{}],54:[function(require,module,exports){
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

            module.exports = function(val, options) {
              options = options || {};
              var type = typeof val;
              if (type === 'string' && val.length > 0) {
                return parse(val);
              } else if (type === 'number' && isNaN(val) === false) {
                return options.long ? fmtLong(val) : fmtShort(val);
              }
              throw new Error(
                'val is not a non-empty string or a valid number. val=' +
                JSON.stringify(val)
              );
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
              var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                str
              );
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

          },{}],55:[function(require,module,exports){
            (function (process){
              "use strict";

              function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

              /* eslint-env browser */

              /**
               * This is the web browser implementation of `debug()`.
               */
              exports.log = log;
              exports.formatArgs = formatArgs;
              exports.save = save;
              exports.load = load;
              exports.useColors = useColors;
              exports.storage = localstorage();
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


                return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
                  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
                  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
                  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
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

                var c = 'color: ' + this.color;
                args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
                // arguments passed either before or after the %c, so we need to
                // figure out the correct index to insert the CSS into

                var index = 0;
                var lastC = 0;
                args[0].replace(/%[a-zA-Z%]/g, function (match) {
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
               * Invokes `console.log()` when available.
               * No-op when `console.log` is not a "function".
               *
               * @api public
               */


              function log() {
                var _console;

                // This hackery is required for IE8/9, where
                // the `console.log` function doesn't have 'apply'
                return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
              }
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
                var r;

                try {
                  r = exports.storage.getItem('debug');
                } catch (error) {} // Swallow
                // XXX (@Qix-) should we be logging these?
                // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


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

              module.exports = require('./common')(exports);
              var formatters = module.exports.formatters;
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


            }).call(this,{ env: {} })

          },{"./common":56}],56:[function(require,module,exports){
            "use strict";

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
              createDebug.humanize = require('ms');
              Object.keys(env).forEach(function (key) {
                createDebug[key] = env[key];
              });
              /**
               * Active `debug` instances.
               */

              createDebug.instances = [];
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
                var hash = 0;

                for (var i = 0; i < namespace.length; i++) {
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
                var prevTime;

                function debug() {
                  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }

                  // Disabled?
                  if (!debug.enabled) {
                    return;
                  }

                  var self = debug; // Set `diff` timestamp

                  var curr = Number(new Date());
                  var ms = curr - (prevTime || curr);
                  self.diff = ms;
                  self.prev = prevTime;
                  self.curr = curr;
                  prevTime = curr;
                  args[0] = createDebug.coerce(args[0]);

                  if (typeof args[0] !== 'string') {
                    // Anything else let's inspect with %O
                    args.unshift('%O');
                  } // Apply any `formatters` transformations


                  var index = 0;
                  args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
                    // If we encounter an escaped % then don't increase the array index
                    if (match === '%%') {
                      return match;
                    }

                    index++;
                    var formatter = createDebug.formatters[format];

                    if (typeof formatter === 'function') {
                      var val = args[index];
                      match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

                      args.splice(index, 1);
                      index--;
                    }

                    return match;
                  }); // Apply env-specific formatting (colors, etc.)

                  createDebug.formatArgs.call(self, args);
                  var logFn = self.log || createDebug.log;
                  logFn.apply(self, args);
                }

                debug.namespace = namespace;
                debug.enabled = createDebug.enabled(namespace);
                debug.useColors = createDebug.useColors();
                debug.color = selectColor(namespace);
                debug.destroy = destroy;
                debug.extend = extend; // Debug.formatArgs = formatArgs;
                // debug.rawLog = rawLog;
                // env-specific initialization logic for debug instances

                if (typeof createDebug.init === 'function') {
                  createDebug.init(debug);
                }

                createDebug.instances.push(debug);
                return debug;
              }

              function destroy() {
                var index = createDebug.instances.indexOf(this);

                if (index !== -1) {
                  createDebug.instances.splice(index, 1);
                  return true;
                }

                return false;
              }

              function extend(namespace, delimiter) {
                return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
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
                createDebug.names = [];
                createDebug.skips = [];
                var i;
                var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
                var len = split.length;

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

                for (i = 0; i < createDebug.instances.length; i++) {
                  var instance = createDebug.instances[i];
                  instance.enabled = createDebug.enabled(instance.namespace);
                }
              }
              /**
               * Disable debug output.
               *
               * @api public
               */


              function disable() {
                createDebug.enable('');
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

                var i;
                var len;

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

              createDebug.enable(createDebug.load());
              return createDebug;
            }

            module.exports = setup;


          },{"ms":54}],57:[function(require,module,exports){
            if (typeof Object.create === 'function') {
              // implementation from standard node.js 'util' module
              module.exports = function inherits(ctor, superCtor) {
                ctor.super_ = superCtor
                ctor.prototype = Object.create(superCtor.prototype, {
                  constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                  }
                });
              };
            } else {
              // old school shim for old browsers
              module.exports = function inherits(ctor, superCtor) {
                ctor.super_ = superCtor
                var TempCtor = function () {}
                TempCtor.prototype = superCtor.prototype
                ctor.prototype = new TempCtor()
                ctor.prototype.constructor = ctor
              }
            }

          },{}],58:[function(require,module,exports){
            (function (global){
              /*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
              ;(function () {
                // Detect the `define` function exposed by asynchronous module loaders. The
                // strict `define` check is necessary for compatibility with `r.js`.
                var isLoader = typeof define === "function" && define.amd;

                // A set of types used to distinguish objects from primitives.
                var objectTypes = {
                  "function": true,
                  "object": true
                };

                // Detect the `exports` object exposed by CommonJS implementations.
                var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

                // Use the `global` object exposed by Node (including Browserify via
                // `insert-module-globals`), Narwhal, and Ringo as the default context,
                // and the `window` object in browsers. Rhino exports a `global` function
                // instead.
                var root = objectTypes[typeof window] && window || this,
                  freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

                if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
                  root = freeGlobal;
                }

                // Public: Initializes JSON 3 using the given `context` object, attaching the
                // `stringify` and `parse` functions to the specified `exports` object.
                function runInContext(context, exports) {
                  context || (context = root["Object"]());
                  exports || (exports = root["Object"]());

                  // Native constructor aliases.
                  var Number = context["Number"] || root["Number"],
                    String = context["String"] || root["String"],
                    Object = context["Object"] || root["Object"],
                    Date = context["Date"] || root["Date"],
                    SyntaxError = context["SyntaxError"] || root["SyntaxError"],
                    TypeError = context["TypeError"] || root["TypeError"],
                    Math = context["Math"] || root["Math"],
                    nativeJSON = context["JSON"] || root["JSON"];

                  // Delegate to the native `stringify` and `parse` implementations.
                  if (typeof nativeJSON == "object" && nativeJSON) {
                    exports.stringify = nativeJSON.stringify;
                    exports.parse = nativeJSON.parse;
                  }

                  // Convenience aliases.
                  var objectProto = Object.prototype,
                    getClass = objectProto.toString,
                    isProperty, forEach, undef;

                  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
                  var isExtended = new Date(-3509827334573292);
                  try {
                    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
                    // results for certain dates in Opera >= 10.53.
                    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
                      // Safari < 2.0.2 stores the internal millisecond time value correctly,
                      // but clips the values returned by the date methods to the range of
                      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
                      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
                  } catch (exception) {}

                  // Internal: Determines whether the native `JSON.stringify` and `parse`
                  // implementations are spec-compliant. Based on work by Ken Snyder.
                  function has(name) {
                    if (has[name] !== undef) {
                      // Return cached feature test result.
                      return has[name];
                    }
                    var isSupported;
                    if (name == "bug-string-char-index") {
                      // IE <= 7 doesn't support accessing string characters using square
                      // bracket notation. IE 8 only supports this for primitives.
                      isSupported = "a"[0] != "a";
                    } else if (name == "json") {
                      // Indicates whether both `JSON.stringify` and `JSON.parse` are
                      // supported.
                      isSupported = has("json-stringify") && has("json-parse");
                    } else {
                      var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                      // Test `JSON.stringify`.
                      if (name == "json-stringify") {
                        var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
                        if (stringifySupported) {
                          // A test function object with a custom `toJSON` method.
                          (value = function () {
                            return 1;
                          }).toJSON = value;
                          try {
                            stringifySupported =
                              // Firefox 3.1b1 and b2 serialize string, number, and boolean
                              // primitives as object literals.
                              stringify(0) === "0" &&
                              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                              // literals.
                              stringify(new Number()) === "0" &&
                              stringify(new String()) == '""' &&
                              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                              // does not define a canonical JSON representation (this applies to
                              // objects with `toJSON` properties as well, *unless* they are nested
                              // within an object or array).
                              stringify(getClass) === undef &&
                              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                              // FF 3.1b3 pass this test.
                              stringify(undef) === undef &&
                              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                              // respectively, if the value is omitted entirely.
                              stringify() === undef &&
                              // FF 3.1b1, 2 throw an error if the given value is not a number,
                              // string, array, object, Boolean, or `null` literal. This applies to
                              // objects with custom `toJSON` methods as well, unless they are nested
                              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                              // methods entirely.
                              stringify(value) === "1" &&
                              stringify([value]) == "[1]" &&
                              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                              // `"[null]"`.
                              stringify([undef]) == "[null]" &&
                              // YUI 3.0.0b1 fails to serialize `null` literals.
                              stringify(null) == "null" &&
                              // FF 3.1b1, 2 halts serialization if an array contains a function:
                              // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                              // elides non-JSON values from objects and arrays, unless they
                              // define custom `toJSON` methods.
                              stringify([undef, getClass, null]) == "[null,null,null]" &&
                              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                              // where character escape codes are expected (e.g., `\b` => `\u0008`).
                              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                              stringify(null, value) === "1" &&
                              stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                              // serialize extended years.
                              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                              // The milliseconds are optional in ES 5, but required in 5.1.
                              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                              // four-digit years instead of six-digit years. Credits: @Yaffle.
                              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                              // values less than 1000. Credits: @Yaffle.
                              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                          } catch (exception) {
                            stringifySupported = false;
                          }
                        }
                        isSupported = stringifySupported;
                      }
                      // Test `JSON.parse`.
                      if (name == "json-parse") {
                        var parse = exports.parse;
                        if (typeof parse == "function") {
                          try {
                            // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                            // Conforming implementations should also coerce the initial argument to
                            // a string prior to parsing.
                            if (parse("0") === 0 && !parse(false)) {
                              // Simple parsing test.
                              value = parse(serialized);
                              var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                              if (parseSupported) {
                                try {
                                  // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                                  parseSupported = !parse('"\t"');
                                } catch (exception) {}
                                if (parseSupported) {
                                  try {
                                    // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                                    // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                                    // certain octal literals.
                                    parseSupported = parse("01") !== 1;
                                  } catch (exception) {}
                                }
                                if (parseSupported) {
                                  try {
                                    // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                                    // points. These environments, along with FF 3.1b1 and 2,
                                    // also allow trailing commas in JSON objects and arrays.
                                    parseSupported = parse("1.") !== 1;
                                  } catch (exception) {}
                                }
                              }
                            }
                          } catch (exception) {
                            parseSupported = false;
                          }
                        }
                        isSupported = parseSupported;
                      }
                    }
                    return has[name] = !!isSupported;
                  }

                  if (!has("json")) {
                    // Common `[[Class]]` name aliases.
                    var functionClass = "[object Function]",
                      dateClass = "[object Date]",
                      numberClass = "[object Number]",
                      stringClass = "[object String]",
                      arrayClass = "[object Array]",
                      booleanClass = "[object Boolean]";

                    // Detect incomplete support for accessing string characters by index.
                    var charIndexBuggy = has("bug-string-char-index");

                    // Define additional utility methods if the `Date` methods are buggy.
                    if (!isExtended) {
                      var floor = Math.floor;
                      // A mapping between the months of the year and the number of days between
                      // January 1st and the first of the respective month.
                      var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                      // Internal: Calculates the number of days between the Unix epoch and the
                      // first day of the given month.
                      var getDay = function (year, month) {
                        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
                      };
                    }

                    // Internal: Determines if a property is a direct property of the given
                    // object. Delegates to the native `Object#hasOwnProperty` method.
                    if (!(isProperty = objectProto.hasOwnProperty)) {
                      isProperty = function (property) {
                        var members = {}, constructor;
                        if ((members.__proto__ = null, members.__proto__ = {
                          // The *proto* property cannot be set multiple times in recent
                          // versions of Firefox and SeaMonkey.
                          "toString": 1
                        }, members).toString != getClass) {
                          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
                          // supports the mutable *proto* property.
                          isProperty = function (property) {
                            // Capture and break the object's prototype chain (see section 8.6.2
                            // of the ES 5.1 spec). The parenthesized expression prevents an
                            // unsafe transformation by the Closure Compiler.
                            var original = this.__proto__, result = property in (this.__proto__ = null, this);
                            // Restore the original prototype chain.
                            this.__proto__ = original;
                            return result;
                          };
                        } else {
                          // Capture a reference to the top-level `Object` constructor.
                          constructor = members.constructor;
                          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
                          // other environments.
                          isProperty = function (property) {
                            var parent = (this.constructor || constructor).prototype;
                            return property in this && !(property in parent && this[property] === parent[property]);
                          };
                        }
                        members = null;
                        return isProperty.call(this, property);
                      };
                    }

                    // Internal: Normalizes the `for...in` iteration algorithm across
                    // environments. Each enumerated key is yielded to a `callback` function.
                    forEach = function (object, callback) {
                      var size = 0, Properties, members, property;

                      // Tests for bugs in the current environment's `for...in` algorithm. The
                      // `valueOf` property inherits the non-enumerable flag from
                      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
                      (Properties = function () {
                        this.valueOf = 0;
                      }).prototype.valueOf = 0;

                      // Iterate over a new instance of the `Properties` class.
                      members = new Properties();
                      for (property in members) {
                        // Ignore all properties inherited from `Object.prototype`.
                        if (isProperty.call(members, property)) {
                          size++;
                        }
                      }
                      Properties = members = null;

                      // Normalize the iteration algorithm.
                      if (!size) {
                        // A list of non-enumerable properties inherited from `Object.prototype`.
                        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
                        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
                        // properties.
                        forEach = function (object, callback) {
                          var isFunction = getClass.call(object) == functionClass, property, length;
                          var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
                          for (property in object) {
                            // Gecko <= 1.0 enumerates the `prototype` property of functions under
                            // certain conditions; IE does not.
                            if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                              callback(property);
                            }
                          }
                          // Manually invoke the callback for each non-enumerable property.
                          for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
                        };
                      } else if (size == 2) {
                        // Safari <= 2.0.4 enumerates shadowed properties twice.
                        forEach = function (object, callback) {
                          // Create a set of iterated properties.
                          var members = {}, isFunction = getClass.call(object) == functionClass, property;
                          for (property in object) {
                            // Store each property name to prevent double enumeration. The
                            // `prototype` property of functions is not enumerated due to cross-
                            // environment inconsistencies.
                            if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                              callback(property);
                            }
                          }
                        };
                      } else {
                        // No bugs detected; use the standard `for...in` algorithm.
                        forEach = function (object, callback) {
                          var isFunction = getClass.call(object) == functionClass, property, isConstructor;
                          for (property in object) {
                            if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                              callback(property);
                            }
                          }
                          // Manually invoke the callback for the `constructor` property due to
                          // cross-environment inconsistencies.
                          if (isConstructor || isProperty.call(object, (property = "constructor"))) {
                            callback(property);
                          }
                        };
                      }
                      return forEach(object, callback);
                    };

                    // Public: Serializes a JavaScript `value` as a JSON string. The optional
                    // `filter` argument may specify either a function that alters how object and
                    // array members are serialized, or an array of strings and numbers that
                    // indicates which properties should be serialized. The optional `width`
                    // argument may be either a string or number that specifies the indentation
                    // level of the output.
                    if (!has("json-stringify")) {
                      // Internal: A map of control characters and their escaped equivalents.
                      var Escapes = {
                        92: "\\\\",
                        34: '\\"',
                        8: "\\b",
                        12: "\\f",
                        10: "\\n",
                        13: "\\r",
                        9: "\\t"
                      };

                      // Internal: Converts `value` into a zero-padded string such that its
                      // length is at least equal to `width`. The `width` must be <= 6.
                      var leadingZeroes = "000000";
                      var toPaddedString = function (width, value) {
                        // The `|| 0` expression is necessary to work around a bug in
                        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
                        return (leadingZeroes + (value || 0)).slice(-width);
                      };

                      // Internal: Double-quotes a string `value`, replacing all ASCII control
                      // characters (characters with code unit values between 0 and 31) with
                      // their escaped equivalents. This is an implementation of the
                      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
                      var unicodePrefix = "\\u00";
                      var quote = function (value) {
                        var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
                        var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
                        for (; index < length; index++) {
                          var charCode = value.charCodeAt(index);
                          // If the character is a control character, append its Unicode or
                          // shorthand escape sequence; otherwise, append the character as-is.
                          switch (charCode) {
                            case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                              result += Escapes[charCode];
                              break;
                            default:
                              if (charCode < 32) {
                                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                                break;
                              }
                              result += useCharIndex ? symbols[index] : value.charAt(index);
                          }
                        }
                        return result + '"';
                      };

                      // Internal: Recursively serializes an object. Implements the
                      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
                      var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
                        var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
                        try {
                          // Necessary for host object support.
                          value = object[property];
                        } catch (exception) {}
                        if (typeof value == "object" && value) {
                          className = getClass.call(value);
                          if (className == dateClass && !isProperty.call(value, "toJSON")) {
                            if (value > -1 / 0 && value < 1 / 0) {
                              // Dates are serialized according to the `Date#toJSON` method
                              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                              // for the ISO 8601 date time string format.
                              if (getDay) {
                                // Manually compute the year, month, date, hours, minutes,
                                // seconds, and milliseconds if the `getUTC*` methods are
                                // buggy. Adapted from @Yaffle's `date-shim` project.
                                date = floor(value / 864e5);
                                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                                date = 1 + date - getDay(year, month);
                                // The `time` value specifies the time within the day (see ES
                                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                                // to compute `A modulo B`, as the `%` operator does not
                                // correspond to the `modulo` operation for negative numbers.
                                time = (value % 864e5 + 864e5) % 864e5;
                                // The hours, minutes, seconds, and milliseconds are obtained by
                                // decomposing the time within the day. See section 15.9.1.10.
                                hours = floor(time / 36e5) % 24;
                                minutes = floor(time / 6e4) % 60;
                                seconds = floor(time / 1e3) % 60;
                                milliseconds = time % 1e3;
                              } else {
                                year = value.getUTCFullYear();
                                month = value.getUTCMonth();
                                date = value.getUTCDate();
                                hours = value.getUTCHours();
                                minutes = value.getUTCMinutes();
                                seconds = value.getUTCSeconds();
                                milliseconds = value.getUTCMilliseconds();
                              }
                              // Serialize extended years correctly.
                              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                                "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                                // Months, dates, hours, minutes, and seconds should have two
                                // digits; milliseconds should have three.
                                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                                // Milliseconds are optional in ES 5.0, but required in 5.1.
                                "." + toPaddedString(3, milliseconds) + "Z";
                            } else {
                              value = null;
                            }
                          } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
                            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
                            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
                            // ignores all `toJSON` methods on these objects unless they are
                            // defined directly on an instance.
                            value = value.toJSON(property);
                          }
                        }
                        if (callback) {
                          // If a replacement function was provided, call it to obtain the value
                          // for serialization.
                          value = callback.call(object, property, value);
                        }
                        if (value === null) {
                          return "null";
                        }
                        className = getClass.call(value);
                        if (className == booleanClass) {
                          // Booleans are represented literally.
                          return "" + value;
                        } else if (className == numberClass) {
                          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                          // `"null"`.
                          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
                        } else if (className == stringClass) {
                          // Strings are double-quoted and escaped.
                          return quote("" + value);
                        }
                        // Recursively serialize objects and arrays.
                        if (typeof value == "object") {
                          // Check for cyclic structures. This is a linear search; performance
                          // is inversely proportional to the number of unique nested objects.
                          for (length = stack.length; length--;) {
                            if (stack[length] === value) {
                              // Cyclic structures cannot be serialized by `JSON.stringify`.
                              throw TypeError();
                            }
                          }
                          // Add the object to the stack of traversed objects.
                          stack.push(value);
                          results = [];
                          // Save the current indentation level and indent one additional level.
                          prefix = indentation;
                          indentation += whitespace;
                          if (className == arrayClass) {
                            // Recursively serialize array elements.
                            for (index = 0, length = value.length; index < length; index++) {
                              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                              results.push(element === undef ? "null" : element);
                            }
                            result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
                          } else {
                            // Recursively serialize object members. Members are selected from
                            // either a user-specified list of property names, or the object
                            // itself.
                            forEach(properties || value, function (property) {
                              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                              if (element !== undef) {
                                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                                // is not the empty string, let `member` {quote(property) + ":"}
                                // be the concatenation of `member` and the `space` character."
                                // The "`space` character" refers to the literal space
                                // character, not the `space` {width} argument provided to
                                // `JSON.stringify`.
                                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                              }
                            });
                            result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
                          }
                          // Remove the object from the traversed object stack.
                          stack.pop();
                          return result;
                        }
                      };

                      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
                      exports.stringify = function (source, filter, width) {
                        var whitespace, callback, properties, className;
                        if (objectTypes[typeof filter] && filter) {
                          if ((className = getClass.call(filter)) == functionClass) {
                            callback = filter;
                          } else if (className == arrayClass) {
                            // Convert the property names array into a makeshift set.
                            properties = {};
                            for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
                          }
                        }
                        if (width) {
                          if ((className = getClass.call(width)) == numberClass) {
                            // Convert the `width` to an integer and create a string containing
                            // `width` number of space characters.
                            if ((width -= width % 1) > 0) {
                              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
                            }
                          } else if (className == stringClass) {
                            whitespace = width.length <= 10 ? width : width.slice(0, 10);
                          }
                        }
                        // Opera <= 7.54u2 discards the values associated with empty string keys
                        // (`""`) only if they are used directly within an object member list
                        // (e.g., `!("" in { "": 1})`).
                        return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
                      };
                    }

                    // Public: Parses a JSON source string.
                    if (!has("json-parse")) {
                      var fromCharCode = String.fromCharCode;

                      // Internal: A map of escaped control characters and their unescaped
                      // equivalents.
                      var Unescapes = {
                        92: "\\",
                        34: '"',
                        47: "/",
                        98: "\b",
                        116: "\t",
                        110: "\n",
                        102: "\f",
                        114: "\r"
                      };

                      // Internal: Stores the parser state.
                      var Index, Source;

                      // Internal: Resets the parser state and throws a `SyntaxError`.
                      var abort = function () {
                        Index = Source = null;
                        throw SyntaxError();
                      };

                      // Internal: Returns the next token, or `"$"` if the parser has reached
                      // the end of the source string. A token may be a string, number, `null`
                      // literal, or Boolean literal.
                      var lex = function () {
                        var source = Source, length = source.length, value, begin, position, isSigned, charCode;
                        while (Index < length) {
                          charCode = source.charCodeAt(Index);
                          switch (charCode) {
                            case 9: case 10: case 13: case 32:
                              // Skip whitespace tokens, including tabs, carriage returns, line
                              // feeds, and space characters.
                              Index++;
                              break;
                            case 123: case 125: case 91: case 93: case 58: case 44:
                              // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                              // the current position.
                              value = charIndexBuggy ? source.charAt(Index) : source[Index];
                              Index++;
                              return value;
                            case 34:
                              // `"` delimits a JSON string; advance to the next character and
                              // begin parsing the string. String tokens are prefixed with the
                              // sentinel `@` character to distinguish them from punctuators and
                              // end-of-string tokens.
                              for (value = "@", Index++; Index < length;) {
                                charCode = source.charCodeAt(Index);
                                if (charCode < 32) {
                                  // Unescaped ASCII control characters (those with a code unit
                                  // less than the space character) are not permitted.
                                  abort();
                                } else if (charCode == 92) {
                                  // A reverse solidus (`\`) marks the beginning of an escaped
                                  // control character (including `"`, `\`, and `/`) or Unicode
                                  // escape sequence.
                                  charCode = source.charCodeAt(++Index);
                                  switch (charCode) {
                                    case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                                      // Revive escaped control characters.
                                      value += Unescapes[charCode];
                                      Index++;
                                      break;
                                    case 117:
                                      // `\u` marks the beginning of a Unicode escape sequence.
                                      // Advance to the first character and validate the
                                      // four-digit code point.
                                      begin = ++Index;
                                      for (position = Index + 4; Index < position; Index++) {
                                        charCode = source.charCodeAt(Index);
                                        // A valid sequence comprises four hexdigits (case-
                                        // insensitive) that form a single hexadecimal value.
                                        if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                          // Invalid Unicode escape sequence.
                                          abort();
                                        }
                                      }
                                      // Revive the escaped character.
                                      value += fromCharCode("0x" + source.slice(begin, Index));
                                      break;
                                    default:
                                      // Invalid escape sequence.
                                      abort();
                                  }
                                } else {
                                  if (charCode == 34) {
                                    // An unescaped double-quote character marks the end of the
                                    // string.
                                    break;
                                  }
                                  charCode = source.charCodeAt(Index);
                                  begin = Index;
                                  // Optimize for the common case where a string is valid.
                                  while (charCode >= 32 && charCode != 92 && charCode != 34) {
                                    charCode = source.charCodeAt(++Index);
                                  }
                                  // Append the string as-is.
                                  value += source.slice(begin, Index);
                                }
                              }
                              if (source.charCodeAt(Index) == 34) {
                                // Advance to the next character and return the revived string.
                                Index++;
                                return value;
                              }
                              // Unterminated string.
                              abort();
                            default:
                              // Parse numbers and literals.
                              begin = Index;
                              // Advance past the negative sign, if one is specified.
                              if (charCode == 45) {
                                isSigned = true;
                                charCode = source.charCodeAt(++Index);
                              }
                              // Parse an integer or floating-point value.
                              if (charCode >= 48 && charCode <= 57) {
                                // Leading zeroes are interpreted as octal literals.
                                if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                                  // Illegal octal literal.
                                  abort();
                                }
                                isSigned = false;
                                // Parse the integer component.
                                for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                                // Floats cannot contain a leading decimal point; however, this
                                // case is already accounted for by the parser.
                                if (source.charCodeAt(Index) == 46) {
                                  position = ++Index;
                                  // Parse the decimal component.
                                  for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                                  if (position == Index) {
                                    // Illegal trailing decimal.
                                    abort();
                                  }
                                  Index = position;
                                }
                                // Parse exponents. The `e` denoting the exponent is
                                // case-insensitive.
                                charCode = source.charCodeAt(Index);
                                if (charCode == 101 || charCode == 69) {
                                  charCode = source.charCodeAt(++Index);
                                  // Skip past the sign following the exponent, if one is
                                  // specified.
                                  if (charCode == 43 || charCode == 45) {
                                    Index++;
                                  }
                                  // Parse the exponential component.
                                  for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                                  if (position == Index) {
                                    // Illegal empty exponent.
                                    abort();
                                  }
                                  Index = position;
                                }
                                // Coerce the parsed value to a JavaScript number.
                                return +source.slice(begin, Index);
                              }
                              // A negative sign may only precede numbers.
                              if (isSigned) {
                                abort();
                              }
                              // `true`, `false`, and `null` literals.
                              if (source.slice(Index, Index + 4) == "true") {
                                Index += 4;
                                return true;
                              } else if (source.slice(Index, Index + 5) == "false") {
                                Index += 5;
                                return false;
                              } else if (source.slice(Index, Index + 4) == "null") {
                                Index += 4;
                                return null;
                              }
                              // Unrecognized token.
                              abort();
                          }
                        }
                        // Return the sentinel `$` character if the parser has reached the end
                        // of the source string.
                        return "$";
                      };

                      // Internal: Parses a JSON `value` token.
                      var get = function (value) {
                        var results, hasMembers;
                        if (value == "$") {
                          // Unexpected end of input.
                          abort();
                        }
                        if (typeof value == "string") {
                          if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                            // Remove the sentinel `@` character.
                            return value.slice(1);
                          }
                          // Parse object and array literals.
                          if (value == "[") {
                            // Parses a JSON array, returning a new JavaScript array.
                            results = [];
                            for (;; hasMembers || (hasMembers = true)) {
                              value = lex();
                              // A closing square bracket marks the end of the array literal.
                              if (value == "]") {
                                break;
                              }
                              // If the array literal contains elements, the current token
                              // should be a comma separating the previous element from the
                              // next.
                              if (hasMembers) {
                                if (value == ",") {
                                  value = lex();
                                  if (value == "]") {
                                    // Unexpected trailing `,` in array literal.
                                    abort();
                                  }
                                } else {
                                  // A `,` must separate each array element.
                                  abort();
                                }
                              }
                              // Elisions and leading commas are not permitted.
                              if (value == ",") {
                                abort();
                              }
                              results.push(get(value));
                            }
                            return results;
                          } else if (value == "{") {
                            // Parses a JSON object, returning a new JavaScript object.
                            results = {};
                            for (;; hasMembers || (hasMembers = true)) {
                              value = lex();
                              // A closing curly brace marks the end of the object literal.
                              if (value == "}") {
                                break;
                              }
                              // If the object literal contains members, the current token
                              // should be a comma separator.
                              if (hasMembers) {
                                if (value == ",") {
                                  value = lex();
                                  if (value == "}") {
                                    // Unexpected trailing `,` in object literal.
                                    abort();
                                  }
                                } else {
                                  // A `,` must separate each object member.
                                  abort();
                                }
                              }
                              // Leading commas are not permitted, object property names must be
                              // double-quoted strings, and a `:` must separate each property
                              // name and value.
                              if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                                abort();
                              }
                              results[value.slice(1)] = get(lex());
                            }
                            return results;
                          }
                          // Unexpected token encountered.
                          abort();
                        }
                        return value;
                      };

                      // Internal: Updates a traversed object member.
                      var update = function (source, property, callback) {
                        var element = walk(source, property, callback);
                        if (element === undef) {
                          delete source[property];
                        } else {
                          source[property] = element;
                        }
                      };

                      // Internal: Recursively traverses a parsed JSON object, invoking the
                      // `callback` function for each value. This is an implementation of the
                      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
                      var walk = function (source, property, callback) {
                        var value = source[property], length;
                        if (typeof value == "object" && value) {
                          // `forEach` can't be used to traverse an array in Opera <= 8.54
                          // because its `Object#hasOwnProperty` implementation returns `false`
                          // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                          if (getClass.call(value) == arrayClass) {
                            for (length = value.length; length--;) {
                              update(value, length, callback);
                            }
                          } else {
                            forEach(value, function (property) {
                              update(value, property, callback);
                            });
                          }
                        }
                        return callback.call(source, property, value);
                      };

                      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
                      exports.parse = function (source, callback) {
                        var result, value;
                        Index = 0;
                        Source = "" + source;
                        result = get(lex());
                        // If a JSON string contains multiple tokens, it is invalid.
                        if (lex() != "$") {
                          abort();
                        }
                        // Reset the parser state.
                        Index = Source = null;
                        return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
                      };
                    }
                  }

                  exports["runInContext"] = runInContext;
                  return exports;
                }

                if (freeExports && !isLoader) {
                  // Export for CommonJS environments.
                  runInContext(root, freeExports);
                } else {
                  // Export for web browsers and JavaScript engines.
                  var nativeJSON = root.JSON,
                    previousJSON = root["JSON3"],
                    isRestored = false;

                  var JSON3 = runInContext(root, (root["JSON3"] = {
                    // Public: Restores the original value of the global `JSON` object and
                    // returns a reference to the `JSON3` object.
                    "noConflict": function () {
                      if (!isRestored) {
                        isRestored = true;
                        root.JSON = nativeJSON;
                        root["JSON3"] = previousJSON;
                        nativeJSON = previousJSON = null;
                      }
                      return JSON3;
                    }
                  }));

                  root.JSON = {
                    "parse": JSON3.parse,
                    "stringify": JSON3.stringify
                  };
                }

                // Export for asynchronous module loaders.
                if (isLoader) {
                  define(function () {
                    return JSON3;
                  });
                }
              }).call(this);

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{}],59:[function(require,module,exports){
            'use strict';

            var has = Object.prototype.hasOwnProperty;

            /**
             * Decode a URI encoded string.
             *
             * @param {String} input The URI encoded string.
             * @returns {String} The decoded string.
             * @api private
             */
            function decode(input) {
              return decodeURIComponent(input.replace(/\+/g, ' '));
            }

            /**
             * Simple query string parser.
             *
             * @param {String} query The query string that needs to be parsed.
             * @returns {Object}
             * @api public
             */
            function querystring(query) {
              var parser = /([^=?&]+)=?([^&]*)/g
                , result = {}
                , part;

              while (part = parser.exec(query)) {
                var key = decode(part[1])
                  , value = decode(part[2]);

                //
                // Prevent overriding of existing properties. This ensures that build-in
                // methods like `toString` or __proto__ are not overriden by malicious
                // querystrings.
                //
                if (key in result) continue;
                result[key] = value;
              }

              return result;
            }

            /**
             * Transform a query string to an object.
             *
             * @param {Object} obj Object that should be transformed.
             * @param {String} prefix Optional prefix.
             * @returns {String}
             * @api public
             */
            function querystringify(obj, prefix) {
              prefix = prefix || '';

              var pairs = [];

              //
              // Optionally prefix with a '?' if needed
              //
              if ('string' !== typeof prefix) prefix = '?';

              for (var key in obj) {
                if (has.call(obj, key)) {
                  pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
                }
              }

              return pairs.length ? prefix + pairs.join('&') : '';
            }

//
// Expose the module.
//
            exports.stringify = querystringify;
            exports.parse = querystring;

          },{}],60:[function(require,module,exports){
            'use strict';

            /**
             * Check if we're required to add a port number.
             *
             * @see https://url.spec.whatwg.org/#default-port
             * @param {Number|String} port Port number we need to check
             * @param {String} protocol Protocol we need to check against.
             * @returns {Boolean} Is it a default port for the given protocol
             * @api private
             */
            module.exports = function required(port, protocol) {
              protocol = protocol.split(':')[0];
              port = +port;

              if (!port) return false;

              switch (protocol) {
                case 'http':
                case 'ws':
                  return port !== 80;

                case 'https':
                case 'wss':
                  return port !== 443;

                case 'ftp':
                  return port !== 21;

                case 'gopher':
                  return port !== 70;

                case 'file':
                  return false;
              }

              return port !== 0;
            };

          },{}],61:[function(require,module,exports){
            (function (global){
              'use strict';

              var required = require('requires-port')
                , qs = require('querystringify')
                , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
                , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

              /**
               * These are the parse rules for the URL parser, it informs the parser
               * about:
               *
               * 0. The char it Needs to parse, if it's a string it should be done using
               *    indexOf, RegExp using exec and NaN means set as current value.
               * 1. The property we should set when parsing this value.
               * 2. Indication if it's backwards or forward parsing, when set as number it's
               *    the value of extra chars that should be split off.
               * 3. Inherit from location if non existing in the parser.
               * 4. `toLowerCase` the resulting value.
               */
              var rules = [
                ['#', 'hash'],                        // Extract from the back.
                ['?', 'query'],                       // Extract from the back.
                function sanitize(address) {          // Sanitize what is left of the address
                  return address.replace('\\', '/');
                },
                ['/', 'pathname'],                    // Extract from the back.
                ['@', 'auth', 1],                     // Extract from the front.
                [NaN, 'host', undefined, 1, 1],       // Set left over value.
                [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
                [NaN, 'hostname', undefined, 1, 1]    // Set left over.
              ];

              /**
               * These properties should not be copied or inherited from. This is only needed
               * for all non blob URL's as a blob URL does not include a hash, only the
               * origin.
               *
               * @type {Object}
               * @private
               */
              var ignore = { hash: 1, query: 1 };

              /**
               * The location object differs when your code is loaded through a normal page,
               * Worker or through a worker using a blob. And with the blobble begins the
               * trouble as the location object will contain the URL of the blob, not the
               * location of the page where our code is loaded in. The actual origin is
               * encoded in the `pathname` so we can thankfully generate a good "default"
               * location from it so we can generate proper relative URL's again.
               *
               * @param {Object|String} loc Optional default location object.
               * @returns {Object} lolcation object.
               * @public
               */
              function lolcation(loc) {
                var location = global && global.location || {};
                loc = loc || location;

                var finaldestination = {}
                  , type = typeof loc
                  , key;

                if ('blob:' === loc.protocol) {
                  finaldestination = new Url(unescape(loc.pathname), {});
                } else if ('string' === type) {
                  finaldestination = new Url(loc, {});
                  for (key in ignore) delete finaldestination[key];
                } else if ('object' === type) {
                  for (key in loc) {
                    if (key in ignore) continue;
                    finaldestination[key] = loc[key];
                  }

                  if (finaldestination.slashes === undefined) {
                    finaldestination.slashes = slashes.test(loc.href);
                  }
                }

                return finaldestination;
              }

              /**
               * @typedef ProtocolExtract
               * @type Object
               * @property {String} protocol Protocol matched in the URL, in lowercase.
               * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
               * @property {String} rest Rest of the URL that is not part of the protocol.
               */

              /**
               * Extract protocol information from a URL with/without double slash ("//").
               *
               * @param {String} address URL we want to extract from.
               * @return {ProtocolExtract} Extracted information.
               * @private
               */
              function extractProtocol(address) {
                var match = protocolre.exec(address);

                return {
                  protocol: match[1] ? match[1].toLowerCase() : '',
                  slashes: !!match[2],
                  rest: match[3]
                };
              }

              /**
               * Resolve a relative URL pathname against a base URL pathname.
               *
               * @param {String} relative Pathname of the relative URL.
               * @param {String} base Pathname of the base URL.
               * @return {String} Resolved pathname.
               * @private
               */
              function resolve(relative, base) {
                var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
                  , i = path.length
                  , last = path[i - 1]
                  , unshift = false
                  , up = 0;

                while (i--) {
                  if (path[i] === '.') {
                    path.splice(i, 1);
                  } else if (path[i] === '..') {
                    path.splice(i, 1);
                    up++;
                  } else if (up) {
                    if (i === 0) unshift = true;
                    path.splice(i, 1);
                    up--;
                  }
                }

                if (unshift) path.unshift('');
                if (last === '.' || last === '..') path.push('');

                return path.join('/');
              }

              /**
               * The actual URL instance. Instead of returning an object we've opted-in to
               * create an actual constructor as it's much more memory efficient and
               * faster and it pleases my OCD.
               *
               * It is worth noting that we should not use `URL` as class name to prevent
               * clashes with the global URL instance that got introduced in browsers.
               *
               * @constructor
               * @param {String} address URL we want to parse.
               * @param {Object|String} location Location defaults for relative paths.
               * @param {Boolean|Function} parser Parser for the query string.
               * @private
               */
              function Url(address, location, parser) {
                if (!(this instanceof Url)) {
                  return new Url(address, location, parser);
                }

                var relative, extracted, parse, instruction, index, key
                  , instructions = rules.slice()
                  , type = typeof location
                  , url = this
                  , i = 0;

                //
                // The following if statements allows this module two have compatibility with
                // 2 different API:
                //
                // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
                //    where the boolean indicates that the query string should also be parsed.
                //
                // 2. The `URL` interface of the browser which accepts a URL, object as
                //    arguments. The supplied object will be used as default values / fall-back
                //    for relative paths.
                //
                if ('object' !== type && 'string' !== type) {
                  parser = location;
                  location = null;
                }

                if (parser && 'function' !== typeof parser) parser = qs.parse;

                location = lolcation(location);

                //
                // Extract protocol information before running the instructions.
                //
                extracted = extractProtocol(address || '');
                relative = !extracted.protocol && !extracted.slashes;
                url.slashes = extracted.slashes || relative && location.slashes;
                url.protocol = extracted.protocol || location.protocol || '';
                address = extracted.rest;

                //
                // When the authority component is absent the URL starts with a path
                // component.
                //
                if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

                for (; i < instructions.length; i++) {
                  instruction = instructions[i];

                  if (typeof instruction === 'function') {
                    address = instruction(address);
                    continue;
                  }

                  parse = instruction[0];
                  key = instruction[1];

                  if (parse !== parse) {
                    url[key] = address;
                  } else if ('string' === typeof parse) {
                    if (~(index = address.indexOf(parse))) {
                      if ('number' === typeof instruction[2]) {
                        url[key] = address.slice(0, index);
                        address = address.slice(index + instruction[2]);
                      } else {
                        url[key] = address.slice(index);
                        address = address.slice(0, index);
                      }
                    }
                  } else if ((index = parse.exec(address))) {
                    url[key] = index[1];
                    address = address.slice(0, index.index);
                  }

                  url[key] = url[key] || (
                    relative && instruction[3] ? location[key] || '' : ''
                  );

                  //
                  // Hostname, host and protocol should be lowercased so they can be used to
                  // create a proper `origin`.
                  //
                  if (instruction[4]) url[key] = url[key].toLowerCase();
                }

                //
                // Also parse the supplied query string in to an object. If we're supplied
                // with a custom parser as function use that instead of the default build-in
                // parser.
                //
                if (parser) url.query = parser(url.query);

                //
                // If the URL is relative, resolve the pathname against the base URL.
                //
                if (
                  relative
                  && location.slashes
                  && url.pathname.charAt(0) !== '/'
                  && (url.pathname !== '' || location.pathname !== '')
                ) {
                  url.pathname = resolve(url.pathname, location.pathname);
                }

                //
                // We should not add port numbers if they are already the default port number
                // for a given protocol. As the host also contains the port number we're going
                // override it with the hostname which contains no port number.
                //
                if (!required(url.port, url.protocol)) {
                  url.host = url.hostname;
                  url.port = '';
                }

                //
                // Parse down the `auth` for the username and password.
                //
                url.username = url.password = '';
                if (url.auth) {
                  instruction = url.auth.split(':');
                  url.username = instruction[0] || '';
                  url.password = instruction[1] || '';
                }

                url.origin = url.protocol && url.host && url.protocol !== 'file:'
                  ? url.protocol +'//'+ url.host
                  : 'null';

                //
                // The href is just the compiled result.
                //
                url.href = url.toString();
              }

              /**
               * This is convenience method for changing properties in the URL instance to
               * insure that they all propagate correctly.
               *
               * @param {String} part          Property we need to adjust.
               * @param {Mixed} value          The newly assigned value.
               * @param {Boolean|Function} fn  When setting the query, it will be the function
               *                               used to parse the query.
               *                               When setting the protocol, double slash will be
               *                               removed from the final url if it is true.
               * @returns {URL} URL instance for chaining.
               * @public
               */
              function set(part, value, fn) {
                var url = this;

                switch (part) {
                  case 'query':
                    if ('string' === typeof value && value.length) {
                      value = (fn || qs.parse)(value);
                    }

                    url[part] = value;
                    break;

                  case 'port':
                    url[part] = value;

                    if (!required(value, url.protocol)) {
                      url.host = url.hostname;
                      url[part] = '';
                    } else if (value) {
                      url.host = url.hostname +':'+ value;
                    }

                    break;

                  case 'hostname':
                    url[part] = value;

                    if (url.port) value += ':'+ url.port;
                    url.host = value;
                    break;

                  case 'host':
                    url[part] = value;

                    if (/:\d+$/.test(value)) {
                      value = value.split(':');
                      url.port = value.pop();
                      url.hostname = value.join(':');
                    } else {
                      url.hostname = value;
                      url.port = '';
                    }

                    break;

                  case 'protocol':
                    url.protocol = value.toLowerCase();
                    url.slashes = !fn;
                    break;

                  case 'pathname':
                  case 'hash':
                    if (value) {
                      var char = part === 'pathname' ? '/' : '#';
                      url[part] = value.charAt(0) !== char ? char + value : value;
                    } else {
                      url[part] = value;
                    }
                    break;

                  default:
                    url[part] = value;
                }

                for (var i = 0; i < rules.length; i++) {
                  var ins = rules[i];

                  if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
                }

                url.origin = url.protocol && url.host && url.protocol !== 'file:'
                  ? url.protocol +'//'+ url.host
                  : 'null';

                url.href = url.toString();

                return url;
              }

              /**
               * Transform the properties back in to a valid and full URL string.
               *
               * @param {Function} stringify Optional query stringify function.
               * @returns {String} Compiled version of the URL.
               * @public
               */
              function toString(stringify) {
                if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

                var query
                  , url = this
                  , protocol = url.protocol;

                if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

                var result = protocol + (url.slashes ? '//' : '');

                if (url.username) {
                  result += url.username;
                  if (url.password) result += ':'+ url.password;
                  result += '@';
                }

                result += url.host + url.pathname;

                query = 'object' === typeof url.query ? stringify(url.query) : url.query;
                if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

                if (url.hash) result += url.hash;

                return result;
              }

              Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
              Url.extractProtocol = extractProtocol;
              Url.location = lolcation;
              Url.qs = qs;

              module.exports = Url;

            }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

          },{"querystringify":59,"requires-port":60}]},{},[1])(1)
        });


//# sourceMappingURL=sockjs.js.map

        /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

      /***/ }),

    /***/ "./node_modules/strip-ansi/index.js":
    /*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/ansi-regex/index.js")();

      module.exports = function (str) {
        return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
      };


      /***/ }),

    /***/ "./node_modules/style-loader/lib/addStyles.js":
    /*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

      var stylesInDom = {};

      var	memoize = function (fn) {
        var memo;

        return function () {
          if (typeof memo === "undefined") memo = fn.apply(this, arguments);
          return memo;
        };
      };

      var isOldIE = memoize(function () {
        // Test for IE <= 9 as proposed by Browserhacks
        // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
        // Tests for existence of standard globals is to allow style-loader
        // to operate correctly into non-standard environments
        // @see https://github.com/webpack-contrib/style-loader/issues/177
        return window && document && document.all && !window.atob;
      });

      var getTarget = function (target, parent) {
        if (parent){
          return parent.querySelector(target);
        }
        return document.querySelector(target);
      };

      var getElement = (function (fn) {
        var memo = {};

        return function(target, parent) {
          // If passing function in options, then use it for resolve "head" element.
          // Useful for Shadow Root style i.e
          // {
          //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
          // }
          if (typeof target === 'function') {
            return target();
          }
          if (typeof memo[target] === "undefined") {
            var styleTarget = getTarget.call(this, target, parent);
            // Special case to return head of iframe instead of iframe itself
            if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
              try {
                // This will throw an exception if access to iframe is blocked
                // due to cross-origin restrictions
                styleTarget = styleTarget.contentDocument.head;
              } catch(e) {
                styleTarget = null;
              }
            }
            memo[target] = styleTarget;
          }
          return memo[target]
        };
      })();

      var singleton = null;
      var	singletonCounter = 0;
      var	stylesInsertedAtTop = [];

      var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

      module.exports = function(list, options) {
        if (typeof DEBUG !== "undefined" && DEBUG) {
          if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
        }

        options = options || {};

        options.attrs = typeof options.attrs === "object" ? options.attrs : {};

        // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
        // tags it will allow on a page
        if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

        // By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

        // By default, add <style> tags to the bottom of the target
        if (!options.insertAt) options.insertAt = "bottom";

        var styles = listToStyles(list, options);

        addStylesToDom(styles, options);

        return function update (newList) {
          var mayRemove = [];

          for (var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];

            domStyle.refs--;
            mayRemove.push(domStyle);
          }

          if(newList) {
            var newStyles = listToStyles(newList, options);
            addStylesToDom(newStyles, options);
          }

          for (var i = 0; i < mayRemove.length; i++) {
            var domStyle = mayRemove[i];

            if(domStyle.refs === 0) {
              for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

              delete stylesInDom[domStyle.id];
            }
          }
        };
      };

      function addStylesToDom (styles, options) {
        for (var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];

          if(domStyle) {
            domStyle.refs++;

            for(var j = 0; j < domStyle.parts.length; j++) {
              domStyle.parts[j](item.parts[j]);
            }

            for(; j < item.parts.length; j++) {
              domStyle.parts.push(addStyle(item.parts[j], options));
            }
          } else {
            var parts = [];

            for(var j = 0; j < item.parts.length; j++) {
              parts.push(addStyle(item.parts[j], options));
            }

            stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
          }
        }
      }

      function listToStyles (list, options) {
        var styles = [];
        var newStyles = {};

        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var id = options.base ? item[0] + options.base : item[0];
          var css = item[1];
          var media = item[2];
          var sourceMap = item[3];
          var part = {css: css, media: media, sourceMap: sourceMap};

          if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
          else newStyles[id].parts.push(part);
        }

        return styles;
      }

      function insertStyleElement (options, style) {
        var target = getElement(options.insertInto)

        if (!target) {
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        }

        var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

        if (options.insertAt === "top") {
          if (!lastStyleElementInsertedAtTop) {
            target.insertBefore(style, target.firstChild);
          } else if (lastStyleElementInsertedAtTop.nextSibling) {
            target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
          } else {
            target.appendChild(style);
          }
          stylesInsertedAtTop.push(style);
        } else if (options.insertAt === "bottom") {
          target.appendChild(style);
        } else if (typeof options.insertAt === "object" && options.insertAt.before) {
          var nextSibling = getElement(options.insertAt.before, target);
          target.insertBefore(style, nextSibling);
        } else {
          throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
        }
      }

      function removeStyleElement (style) {
        if (style.parentNode === null) return false;
        style.parentNode.removeChild(style);

        var idx = stylesInsertedAtTop.indexOf(style);
        if(idx >= 0) {
          stylesInsertedAtTop.splice(idx, 1);
        }
      }

      function createStyleElement (options) {
        var style = document.createElement("style");

        if(options.attrs.type === undefined) {
          options.attrs.type = "text/css";
        }

        if(options.attrs.nonce === undefined) {
          var nonce = getNonce();
          if (nonce) {
            options.attrs.nonce = nonce;
          }
        }

        addAttrs(style, options.attrs);
        insertStyleElement(options, style);

        return style;
      }

      function createLinkElement (options) {
        var link = document.createElement("link");

        if(options.attrs.type === undefined) {
          options.attrs.type = "text/css";
        }
        options.attrs.rel = "stylesheet";

        addAttrs(link, options.attrs);
        insertStyleElement(options, link);

        return link;
      }

      function addAttrs (el, attrs) {
        Object.keys(attrs).forEach(function (key) {
          el.setAttribute(key, attrs[key]);
        });
      }

      function getNonce() {
        if (false) {}

        return __webpack_require__.nc;
      }

      function addStyle (obj, options) {
        var style, update, remove, result;

        // If a transform function was defined, run it on the css
        if (options.transform && obj.css) {
          result = typeof options.transform === 'function'
            ? options.transform(obj.css)
            : options.transform.default(obj.css);

          if (result) {
            // If transform returns a value, use that instead of the original css.
            // This allows running runtime transformations on the css.
            obj.css = result;
          } else {
            // If the transform function returns a falsy value, don't add this css.
            // This allows conditional loading of css
            return function() {
              // noop
            };
          }
        }

        if (options.singleton) {
          var styleIndex = singletonCounter++;

          style = singleton || (singleton = createStyleElement(options));

          update = applyToSingletonTag.bind(null, style, styleIndex, false);
          remove = applyToSingletonTag.bind(null, style, styleIndex, true);

        } else if (
          obj.sourceMap &&
          typeof URL === "function" &&
          typeof URL.createObjectURL === "function" &&
          typeof URL.revokeObjectURL === "function" &&
          typeof Blob === "function" &&
          typeof btoa === "function"
        ) {
          style = createLinkElement(options);
          update = updateLink.bind(null, style, options);
          remove = function () {
            removeStyleElement(style);

            if(style.href) URL.revokeObjectURL(style.href);
          };
        } else {
          style = createStyleElement(options);
          update = applyToTag.bind(null, style);
          remove = function () {
            removeStyleElement(style);
          };
        }

        update(obj);

        return function updateStyle (newObj) {
          if (newObj) {
            if (
              newObj.css === obj.css &&
              newObj.media === obj.media &&
              newObj.sourceMap === obj.sourceMap
            ) {
              return;
            }

            update(obj = newObj);
          } else {
            remove();
          }
        };
      }

      var replaceText = (function () {
        var textStore = [];

        return function (index, replacement) {
          textStore[index] = replacement;

          return textStore.filter(Boolean).join('\n');
        };
      })();

      function applyToSingletonTag (style, index, remove, obj) {
        var css = remove ? "" : obj.css;

        if (style.styleSheet) {
          style.styleSheet.cssText = replaceText(index, css);
        } else {
          var cssNode = document.createTextNode(css);
          var childNodes = style.childNodes;

          if (childNodes[index]) style.removeChild(childNodes[index]);

          if (childNodes.length) {
            style.insertBefore(cssNode, childNodes[index]);
          } else {
            style.appendChild(cssNode);
          }
        }
      }

      function applyToTag (style, obj) {
        var css = obj.css;
        var media = obj.media;

        if(media) {
          style.setAttribute("media", media)
        }

        if(style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          while(style.firstChild) {
            style.removeChild(style.firstChild);
          }

          style.appendChild(document.createTextNode(css));
        }
      }

      function updateLink (link, options, obj) {
        var css = obj.css;
        var sourceMap = obj.sourceMap;

        /*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
        var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

        if (options.convertToAbsoluteUrls || autoFixUrls) {
          css = fixUrls(css);
        }

        if (sourceMap) {
          // http://stackoverflow.com/a/26603875
          css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
        }

        var blob = new Blob([css], { type: "text/css" });

        var oldSrc = link.href;

        link.href = URL.createObjectURL(blob);

        if(oldSrc) URL.revokeObjectURL(oldSrc);
      }


      /***/ }),

    /***/ "./node_modules/style-loader/lib/urls.js":
    /*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {


      /**
       * When source maps are enabled, `style-loader` uses a link element with a data-uri to
       * embed the css on the page. This breaks all relative urls because now they are relative to a
       * bundle instead of the current page.
       *
       * One solution is to only use full urls, but that may be impossible.
       *
       * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
       *
       * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
       *
       */

      module.exports = function (css) {
        // get current location
        var location = typeof window !== "undefined" && window.location;

        if (!location) {
          throw new Error("fixUrls requires window.location");
        }

        // blank or null?
        if (!css || typeof css !== "string") {
          return css;
        }

        var baseUrl = location.protocol + "//" + location.host;
        var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

        // convert each url(...)
        /*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
        var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
          // strip quotes (if they exist)
          var unquotedOrigUrl = origUrl
            .trim()
            .replace(/^"(.*)"$/, function(o, $1){ return $1; })
            .replace(/^'(.*)'$/, function(o, $1){ return $1; });

          // already a full url? no change
          if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
            return fullMatch;
          }

          // convert the url to a full url
          var newUrl;

          if (unquotedOrigUrl.indexOf("//") === 0) {
            //TODO: should we add protocol?
            newUrl = unquotedOrigUrl;
          } else if (unquotedOrigUrl.indexOf("/") === 0) {
            // path should be relative to the base url
            newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
          } else {
            // path should be relative to current directory
            newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
          }

          // send back the fixed url(...)
          return "url(" + JSON.stringify(newUrl) + ")";
        });

        // send back the fixed css
        return fixedCss;
      };


      /***/ }),

    /***/ "./node_modules/url/url.js":
    /*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



      var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
      var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

      exports.parse = urlParse;
      exports.resolve = urlResolve;
      exports.resolveObject = urlResolveObject;
      exports.format = urlFormat;

      exports.Url = Url;

      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
      var protocolPattern = /^([a-z0-9.+-]+:)/i,
        portPattern = /:[0-9]*$/,

        // Special case for a simple path URL
        simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

        // RFC 2396: characters reserved for delimiting URLs.
        // We actually just auto-escape these.
        delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

        // RFC 2396: characters not allowed for various reasons.
        unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

        // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
        autoEscape = ['\''].concat(unwise),
        // Characters that are never ever allowed in a hostname.
        // Note that any invalid chars are also handled, but these
        // are the ones that are *expected* to be seen, so we fast-path
        // them.
        nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
        hostEndingChars = ['/', '?', '#'],
        hostnameMaxLen = 255,
        hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
        hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        // protocols that can allow "unsafe" and "unwise" chars.
        unsafeProtocol = {
          'javascript': true,
          'javascript:': true
        },
        // protocols that never have a hostname.
        hostlessProtocol = {
          'javascript': true,
          'javascript:': true
        },
        // protocols that always contain a // bit.
        slashedProtocol = {
          'http': true,
          'https': true,
          'ftp': true,
          'gopher': true,
          'file': true,
          'http:': true,
          'https:': true,
          'ftp:': true,
          'gopher:': true,
          'file:': true
        },
        querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && util.isObject(url) && url instanceof Url) return url;

        var u = new Url;
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }

      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!util.isString(url)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }

        // Copy chrome, IE, opera backslash-handling behavior.
        // Back slashes before the query string get converted to forward slashes
        // See: https://code.google.com/p/chromium/issues/detail?id=25916
        var queryIndex = url.indexOf('?'),
          splitter =
            (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
          uSplit = url.split(splitter),
          slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, '/');
        url = uSplit.join(splitter);

        var rest = url;

        // trim before proceeding.
        // This is to support parse stuff like "  http://foo.com  \n"
        rest = rest.trim();

        if (!slashesDenoteHost && url.split('#').length === 1) {
          // Try fast path regexp
          var simplePath = simplePathPattern.exec(rest);
          if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
              this.search = simplePath[2];
              if (parseQueryString) {
                this.query = querystring.parse(this.search.substr(1));
              } else {
                this.query = this.search.substr(1);
              }
            } else if (parseQueryString) {
              this.search = '';
              this.query = {};
            }
            return this;
          }
        }

        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }

        // figure out if it's got a host
        // user@server is *always* interpreted as a hostname, and url
        // resolution will treat //foo/bar as host=foo,path=bar because that's
        // how the browser resolves relative URLs.
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === '//';
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }

        if (!hostlessProtocol[proto] &&
          (slashes || (proto && !slashedProtocol[proto]))) {

          // there's a hostname.
          // the first instance of /, ?, ;, or # ends the host.
          //
          // If there is an @ in the hostname, then non-host chars *are* allowed
          // to the left of the last @ sign, unless some host-ending character
          // comes *before* the @-sign.
          // URLs are obnoxious.
          //
          // ex:
          // http://a@b@c/ => user:a@b host:c
          // http://a@b?@c => user:a host:c path:/?@c

          // v0.12 TODO(isaacs): This is not quite how Chrome does things.
          // Review our test case against browsers more comprehensively.

          // find the first instance of any hostEndingChars
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }

          // at this point, either we have an explicit point where the
          // auth portion cannot go past, or the last @ char is the decider.
          var auth, atSign;
          if (hostEnd === -1) {
            // atSign can be anywhere.
            atSign = rest.lastIndexOf('@');
          } else {
            // atSign must be in auth portion.
            // http://a@b/c@d => host:b auth:a path:/c@d
            atSign = rest.lastIndexOf('@', hostEnd);
          }

          // Now we have a portion which is definitely the auth.
          // Pull that off.
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }

          // the host is the remaining to the left of the first non-host char
          hostEnd = -1;
          for (var i = 0; i < nonHostChars.length; i++) {
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          // if we still have not hit it, then the entire thing is a host.
          if (hostEnd === -1)
            hostEnd = rest.length;

          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);

          // pull out port.
          this.parseHost();

          // we've indicated that there is a hostname,
          // so even if it's empty, it has to be present.
          this.hostname = this.hostname || '';

          // if hostname begins with [ and ends with ]
          // assume that it's an IPv6 address.
          var ipv6Hostname = this.hostname[0] === '[' &&
            this.hostname[this.hostname.length - 1] === ']';

          // validate a little.
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i = 0, l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part) continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = '';
                for (var j = 0, k = part.length; j < k; j++) {
                  if (part.charCodeAt(j) > 127) {
                    // we replace non-ASCII char with a temporary placeholder
                    // we need this to make sure size of hostname is not
                    // broken by replacing non-ASCII by nothing
                    newpart += 'x';
                  } else {
                    newpart += part[j];
                  }
                }
                // we test again with ASCII char only
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = '/' + notHost.join('.') + rest;
                  }
                  this.hostname = validParts.join('.');
                  break;
                }
              }
            }
          }

          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = '';
          } else {
            // hostnames are always lower case.
            this.hostname = this.hostname.toLowerCase();
          }

          if (!ipv6Hostname) {
            // IDNA Support: Returns a punycoded representation of "domain".
            // It only converts parts of the domain name that
            // have non-ASCII characters, i.e. it doesn't matter if
            // you call it with a domain that already is ASCII-only.
            this.hostname = punycode.toASCII(this.hostname);
          }

          var p = this.port ? ':' + this.port : '';
          var h = this.hostname || '';
          this.host = h + p;
          this.href += this.host;

          // strip [ and ] from the hostname
          // the host field still retains them, though
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== '/') {
              rest = '/' + rest;
            }
          }
        }

        // now rest is set to the post-host stuff.
        // chop off any delim chars.
        if (!unsafeProtocol[lowerProto]) {

          // First, make 100% sure that any "autoEscape" chars get
          // escaped, even if encodeURIComponent doesn't think they
          // need to be.
          for (var i = 0, l = autoEscape.length; i < l; i++) {
            var ae = autoEscape[i];
            if (rest.indexOf(ae) === -1)
              continue;
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }


        // chop off from the tail first.
        var hash = rest.indexOf('#');
        if (hash !== -1) {
          // got a fragment string.
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf('?');
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          // no query string, but parseQueryString still requested
          this.search = '';
          this.query = {};
        }
        if (rest) this.pathname = rest;
        if (slashedProtocol[lowerProto] &&
          this.hostname && !this.pathname) {
          this.pathname = '/';
        }

        //to support http.request
        if (this.pathname || this.search) {
          var p = this.pathname || '';
          var s = this.search || '';
          this.path = p + s;
        }

        // finally, reconstruct the href based on what has been validated.
        this.href = this.format();
        return this;
      };

// format a parsed object into a url string
      function urlFormat(obj) {
        // ensure it's an object, and not a string url.
        // If it's an obj, this is a no-op.
        // this way, you can call url_format() on strings
        // to clean up potentially wonky urls.
        if (util.isString(obj)) obj = urlParse(obj);
        if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
        return obj.format();
      }

      Url.prototype.format = function() {
        var auth = this.auth || '';
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ':');
          auth += '@';
        }

        var protocol = this.protocol || '',
          pathname = this.pathname || '',
          hash = this.hash || '',
          host = false,
          query = '';

        if (this.host) {
          host = auth + this.host;
        } else if (this.hostname) {
          host = auth + (this.hostname.indexOf(':') === -1 ?
            this.hostname :
            '[' + this.hostname + ']');
          if (this.port) {
            host += ':' + this.port;
          }
        }

        if (this.query &&
          util.isObject(this.query) &&
          Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }

        var search = this.search || (query && ('?' + query)) || '';

        if (protocol && protocol.substr(-1) !== ':') protocol += ':';

        // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
        // unless they had them to begin with.
        if (this.slashes ||
          (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = '//' + (host || '');
          if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
        } else if (!host) {
          host = '';
        }

        if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
        if (search && search.charAt(0) !== '?') search = '?' + search;

        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace('#', '%23');

        return protocol + host + pathname + search + hash;
      };

      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }

      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };

      function urlResolveObject(source, relative) {
        if (!source) return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }

      Url.prototype.resolveObject = function(relative) {
        if (util.isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }

        var result = new Url();
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
          var tkey = tkeys[tk];
          result[tkey] = this[tkey];
        }

        // hash is always overridden, no matter what.
        // even href="" will remove it.
        result.hash = relative.hash;

        // if the relative url is empty, then there's nothing left to do here.
        if (relative.href === '') {
          result.href = result.format();
          return result;
        }

        // hrefs like //foo/bar always cut to the protocol.
        if (relative.slashes && !relative.protocol) {
          // take everything except the protocol from relative
          var rkeys = Object.keys(relative);
          for (var rk = 0; rk < rkeys.length; rk++) {
            var rkey = rkeys[rk];
            if (rkey !== 'protocol')
              result[rkey] = relative[rkey];
          }

          //urlParse appends trailing / to urls like http://www.example.com
          if (slashedProtocol[result.protocol] &&
            result.hostname && !result.pathname) {
            result.path = result.pathname = '/';
          }

          result.href = result.format();
          return result;
        }

        if (relative.protocol && relative.protocol !== result.protocol) {
          // if it's a known url protocol, then changing
          // the protocol does weird things
          // first, if it's not file:, then we MUST have a host,
          // and if there was a path
          // to begin with, then we MUST have a path.
          // if it is file:, then the host is dropped,
          // because that's known to be hostless.
          // anything else is assumed to be absolute.
          if (!slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for (var v = 0; v < keys.length; v++) {
              var k = keys[v];
              result[k] = relative[k];
            }
            result.href = result.format();
            return result;
          }

          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || '').split('/');
            while (relPath.length && !(relative.host = relPath.shift()));
            if (!relative.host) relative.host = '';
            if (!relative.hostname) relative.hostname = '';
            if (relPath[0] !== '') relPath.unshift('');
            if (relPath.length < 2) relPath.unshift('');
            result.pathname = relPath.join('/');
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || '';
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          // to support http.request
          if (result.pathname || result.search) {
            var p = result.pathname || '';
            var s = result.search || '';
            result.path = p + s;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }

        var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
          isRelAbs = (
            relative.host ||
            relative.pathname && relative.pathname.charAt(0) === '/'
          ),
          mustEndAbs = (isRelAbs || isSourceAbs ||
            (result.host && relative.pathname)),
          removeAllDots = mustEndAbs,
          srcPath = result.pathname && result.pathname.split('/') || [],
          relPath = relative.pathname && relative.pathname.split('/') || [],
          psychotic = result.protocol && !slashedProtocol[result.protocol];

        // if the url is a non-slashed url, then relative
        // links like ../.. should be able
        // to crawl up to the hostname, as well.  This is strange.
        // result.protocol has already been set by now.
        // Later on, put the first path part into the host field.
        if (psychotic) {
          result.hostname = '';
          result.port = null;
          if (result.host) {
            if (srcPath[0] === '') srcPath[0] = result.host;
            else srcPath.unshift(result.host);
          }
          result.host = '';
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === '') relPath[0] = relative.host;
              else relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
        }

        if (isRelAbs) {
          // it's absolute.
          result.host = (relative.host || relative.host === '') ?
            relative.host : result.host;
          result.hostname = (relative.hostname || relative.hostname === '') ?
            relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
          // fall through to the dot-handling below.
        } else if (relPath.length) {
          // it's relative
          // throw away the existing file, and take the new path instead.
          if (!srcPath) srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!util.isNullOrUndefined(relative.search)) {
          // just pull out the search.
          // like href='?foo'.
          // Put this after the other two cases because it simplifies the booleans
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            //occationaly the auth can get stuck only in host
            //this especially happens in cases like
            //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
            var authInHost = result.host && result.host.indexOf('@') > 0 ?
              result.host.split('@') : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          //to support http.request
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : '') +
              (result.search ? result.search : '');
          }
          result.href = result.format();
          return result;
        }

        if (!srcPath.length) {
          // no path at all.  easy.
          // we've already handled the other stuff above.
          result.pathname = null;
          //to support http.request
          if (result.search) {
            result.path = '/' + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }

        // if a url ENDs in . or .., then it must get a trailing slash.
        // however, if it ends in anything else non-slashy,
        // then it must NOT get a trailing slash.
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = (
          (result.host || relative.host || srcPath.length > 1) &&
          (last === '.' || last === '..') || last === '');

        // strip single dots, resolve double dots to parent dir
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last = srcPath[i];
          if (last === '.') {
            srcPath.splice(i, 1);
          } else if (last === '..') {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }

        // if the path is allowed to go above the root, restore leading ..s
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift('..');
          }
        }

        if (mustEndAbs && srcPath[0] !== '' &&
          (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
          srcPath.unshift('');
        }

        if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
          srcPath.push('');
        }

        var isAbsolute = srcPath[0] === '' ||
          (srcPath[0] && srcPath[0].charAt(0) === '/');

        // put the host back
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? '' :
            srcPath.length ? srcPath.shift() : '';
          //occationaly the auth can get stuck only in host
          //this especially happens in cases like
          //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
          var authInHost = result.host && result.host.indexOf('@') > 0 ?
            result.host.split('@') : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }

        mustEndAbs = mustEndAbs || (result.host && srcPath.length);

        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift('');
        }

        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join('/');
        }

        //to support request.http
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : '') +
            (result.search ? result.search : '');
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };

      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ':') {
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host) this.hostname = host;
      };


      /***/ }),

    /***/ "./node_modules/url/util.js":
    /*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      module.exports = {
        isString: function(arg) {
          return typeof(arg) === 'string';
        },
        isObject: function(arg) {
          return typeof(arg) === 'object' && arg !== null;
        },
        isNull: function(arg) {
          return arg === null;
        },
        isNullOrUndefined: function(arg) {
          return arg == null;
        }
      };


      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/clients/BaseClient.js":
    /*!*********************************************************!*\
  !*** (webpack)-dev-server/client/clients/BaseClient.js ***!
  \*********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      /* eslint-disable
  no-unused-vars
*/

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

      module.exports = /*#__PURE__*/function () {
        function BaseClient() {
          _classCallCheck(this, BaseClient);
        }

        _createClass(BaseClient, null, [{
          key: "getClientPath",
          value: function getClientPath(options) {
            throw new Error('Client needs implementation');
          }
        }]);

        return BaseClient;
      }();

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js":
    /*!***********************************************************!*\
  !*** (webpack)-dev-server/client/clients/SockJSClient.js ***!
  \***********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      /* eslint-disable
  no-unused-vars
*/

      function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

      function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

      function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

      function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

      function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

      function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

      function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

      function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

      var SockJS = __webpack_require__(/*! sockjs-client/dist/sockjs */ "./node_modules/sockjs-client/dist/sockjs.js");

      var BaseClient = __webpack_require__(/*! ./BaseClient */ "./node_modules/webpack-dev-server/client/clients/BaseClient.js");

      module.exports = /*#__PURE__*/function (_BaseClient) {
        _inherits(SockJSClient, _BaseClient);

        var _super = _createSuper(SockJSClient);

        function SockJSClient(url) {
          var _this;

          _classCallCheck(this, SockJSClient);

          _this = _super.call(this);
          _this.sock = new SockJS(url);

          _this.sock.onerror = function (err) {// TODO: use logger to log the error event once client and client-src
            // are reorganized to have the same directory structure
          };

          return _this;
        }

        _createClass(SockJSClient, [{
          key: "onOpen",
          value: function onOpen(f) {
            this.sock.onopen = f;
          }
        }, {
          key: "onClose",
          value: function onClose(f) {
            this.sock.onclose = f;
          } // call f with the message string as the first argument

        }, {
          key: "onMessage",
          value: function onMessage(f) {
            this.sock.onmessage = function (e) {
              f(e.data);
            };
          }
        }], [{
          key: "getClientPath",
          value: function getClientPath(options) {
            return /*require.resolve*/(/*! ./SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
          }
        }]);

        return SockJSClient;
      }(BaseClient);

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost:3001":
    /*!*********************************************************!*\
  !*** (webpack)-dev-server/client?http://localhost:3001 ***!
  \*********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";
      /* WEBPACK VAR INJECTION */(function(__resourceQuery) {
        /* global __resourceQuery WorkerGlobalScope self */

        /* eslint prefer-destructuring: off */

        var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

        var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");

        var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

        var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
          log = _require.log,
          setLogLevel = _require.setLogLevel;

        var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");

        var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");

        var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");

        var status = {
          isUnloading: false,
          currentHash: ''
        };
        var options = {
          hot: false,
          hotReload: true,
          liveReload: false,
          initial: true,
          useWarningOverlay: false,
          useErrorOverlay: false,
          useProgress: false
        };
        var socketUrl = createSocketUrl(__resourceQuery);
        self.addEventListener('beforeunload', function () {
          status.isUnloading = true;
        });

        if (typeof window !== 'undefined') {
          var qs = window.location.search.toLowerCase();
          options.hotReload = qs.indexOf('hotreload=false') === -1;
        }

        var onSocketMessage = {
          hot: function hot() {
            options.hot = true;
            log.info('[WDS] Hot Module Replacement enabled.');
          },
          liveReload: function liveReload() {
            options.liveReload = true;
            log.info('[WDS] Live Reloading enabled.');
          },
          invalid: function invalid() {
            log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

            if (options.useWarningOverlay || options.useErrorOverlay) {
              overlay.clear();
            }

            sendMessage('Invalid');
          },
          hash: function hash(_hash) {
            status.currentHash = _hash;
          },
          'still-ok': function stillOk() {
            log.info('[WDS] Nothing changed.');

            if (options.useWarningOverlay || options.useErrorOverlay) {
              overlay.clear();
            }

            sendMessage('StillOk');
          },
          'log-level': function logLevel(level) {
            var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");

            if (hotCtx.keys().indexOf('./log') !== -1) {
              hotCtx('./log').setLogLevel(level);
            }

            setLogLevel(level);
          },
          overlay: function overlay(value) {
            if (typeof document !== 'undefined') {
              if (typeof value === 'boolean') {
                options.useWarningOverlay = false;
                options.useErrorOverlay = value;
              } else if (value) {
                options.useWarningOverlay = value.warnings;
                options.useErrorOverlay = value.errors;
              }
            }
          },
          progress: function progress(_progress) {
            if (typeof document !== 'undefined') {
              options.useProgress = _progress;
            }
          },
          'progress-update': function progressUpdate(data) {
            if (options.useProgress) {
              log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
            }

            sendMessage('Progress', data);
          },
          ok: function ok() {
            sendMessage('Ok');

            if (options.useWarningOverlay || options.useErrorOverlay) {
              overlay.clear();
            }

            if (options.initial) {
              return options.initial = false;
            } // eslint-disable-line no-return-assign


            reloadApp(options, status);
          },
          'content-changed': function contentChanged() {
            log.info('[WDS] Content base changed. Reloading...');
            self.location.reload();
          },
          warnings: function warnings(_warnings) {
            log.warn('[WDS] Warnings while compiling.');

            var strippedWarnings = _warnings.map(function (warning) {
              return stripAnsi(warning);
            });

            sendMessage('Warnings', strippedWarnings);

            for (var i = 0; i < strippedWarnings.length; i++) {
              log.warn(strippedWarnings[i]);
            }

            if (options.useWarningOverlay) {
              overlay.showMessage(_warnings);
            }

            if (options.initial) {
              return options.initial = false;
            } // eslint-disable-line no-return-assign


            reloadApp(options, status);
          },
          errors: function errors(_errors) {
            log.error('[WDS] Errors while compiling. Reload prevented.');

            var strippedErrors = _errors.map(function (error) {
              return stripAnsi(error);
            });

            sendMessage('Errors', strippedErrors);

            for (var i = 0; i < strippedErrors.length; i++) {
              log.error(strippedErrors[i]);
            }

            if (options.useErrorOverlay) {
              overlay.showMessage(_errors);
            }

            options.initial = false;
          },
          error: function error(_error) {
            log.error(_error);
          },
          close: function close() {
            log.error('[WDS] Disconnected!');
            sendMessage('Close');
          }
        };
        socket(socketUrl, onSocketMessage);
        /* WEBPACK VAR INJECTION */}.call(this, "?http://localhost:3001"))

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/overlay.js":
    /*!**********************************************!*\
  !*** (webpack)-dev-server/client/overlay.js ***!
  \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";
      // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).

      var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");

      var _require = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js"),
        AllHtmlEntities = _require.AllHtmlEntities;

      var entities = new AllHtmlEntities();
      var colors = {
        reset: ['transparent', 'transparent'],
        black: '181818',
        red: 'E36049',
        green: 'B3CB74',
        yellow: 'FFD080',
        blue: '7CAFC2',
        magenta: '7FACCA',
        cyan: 'C3C2EF',
        lightgrey: 'EBE7E3',
        darkgrey: '6D7891'
      };
      var overlayIframe = null;
      var overlayDiv = null;
      var lastOnOverlayDivReady = null;
      ansiHTML.setColors(colors);

      function createOverlayIframe(onIframeLoad) {
        var iframe = document.createElement('iframe');
        iframe.id = 'webpack-dev-server-client-overlay';
        iframe.src = 'about:blank';
        iframe.style.position = 'fixed';
        iframe.style.left = 0;
        iframe.style.top = 0;
        iframe.style.right = 0;
        iframe.style.bottom = 0;
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        iframe.style.zIndex = 9999999999;
        iframe.onload = onIframeLoad;
        return iframe;
      }

      function addOverlayDivTo(iframe) {
        var div = iframe.contentDocument.createElement('div');
        div.id = 'webpack-dev-server-client-overlay-div';
        div.style.position = 'fixed';
        div.style.boxSizing = 'border-box';
        div.style.left = 0;
        div.style.top = 0;
        div.style.right = 0;
        div.style.bottom = 0;
        div.style.width = '100vw';
        div.style.height = '100vh';
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        div.style.color = '#E8E8E8';
        div.style.fontFamily = 'Menlo, Consolas, monospace';
        div.style.fontSize = 'large';
        div.style.padding = '2rem';
        div.style.lineHeight = '1.2';
        div.style.whiteSpace = 'pre-wrap';
        div.style.overflow = 'auto';
        iframe.contentDocument.body.appendChild(div);
        return div;
      }

      function ensureOverlayDivExists(onOverlayDivReady) {
        if (overlayDiv) {
          // Everything is ready, call the callback right away.
          onOverlayDivReady(overlayDiv);
          return;
        } // Creating an iframe may be asynchronous so we'll schedule the callback.
        // In case of multiple calls, last callback wins.


        lastOnOverlayDivReady = onOverlayDivReady;

        if (overlayIframe) {
          // We've already created it.
          return;
        } // Create iframe and, when it is ready, a div inside it.


        overlayIframe = createOverlayIframe(function () {
          overlayDiv = addOverlayDivTo(overlayIframe); // Now we can talk!

          lastOnOverlayDivReady(overlayDiv);
        }); // Zalgo alert: onIframeLoad() will be called either synchronously
        // or asynchronously depending on the browser.
        // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.

        document.body.appendChild(overlayIframe);
      } // Successful compilation.


      function clear() {
        if (!overlayDiv) {
          // It is not there in the first place.
          return;
        } // Clean up and reset internal state.


        document.body.removeChild(overlayIframe);
        overlayDiv = null;
        overlayIframe = null;
        lastOnOverlayDivReady = null;
      } // Compilation with errors (e.g. syntax error or missing modules).


      function showMessage(messages) {
        ensureOverlayDivExists(function (div) {
          // Make it look similar to our terminal.
          div.innerHTML = "<span style=\"color: #".concat(colors.red, "\">Failed to compile.</span><br><br>").concat(ansiHTML(entities.encode(messages[0])));
        });
      }

      module.exports = {
        clear: clear,
        showMessage: showMessage
      };

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/socket.js":
    /*!*********************************************!*\
  !*** (webpack)-dev-server/client/socket.js ***!
  \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";
      /* WEBPACK VAR INJECTION */(function(__webpack_dev_server_client__) {
        /* global __webpack_dev_server_client__ */

        /* eslint-disable
  camelcase
*/
// this SockJSClient is here as a default fallback, in case inline mode
// is off or the client is not injected. This will be switched to
// WebsocketClient when it becomes the default
// important: the path to SockJSClient here is made to work in the 'client'
// directory, but is updated via the webpack compilation when compiled from
// the 'client-src' directory

        var Client = typeof __webpack_dev_server_client__ !== 'undefined' ? __webpack_dev_server_client__ : // eslint-disable-next-line import/no-unresolved
          __webpack_require__(/*! ./clients/SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
        var retries = 0;
        var client = null;

        var socket = function initSocket(url, handlers) {
          client = new Client(url);
          client.onOpen(function () {
            retries = 0;
          });
          client.onClose(function () {
            if (retries === 0) {
              handlers.close();
            } // Try to reconnect.


            client = null; // After 10 retries stop trying, to prevent logspam.

            if (retries <= 10) {
              // Exponentially increase timeout to reconnect.
              // Respectfully copied from the package `got`.
              // eslint-disable-next-line no-mixed-operators, no-restricted-properties
              var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
              retries += 1;
              setTimeout(function () {
                socket(url, handlers);
              }, retryInMs);
            }
          });
          client.onMessage(function (data) {
            var msg = JSON.parse(data);

            if (handlers[msg.type]) {
              handlers[msg.type](msg.data);
            }
          });
        };

        module.exports = socket;
        /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)-dev-server/client/clients/SockJSClient.js */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js")))

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js":
    /*!************************************************************!*\
  !*** (webpack)-dev-server/client/utils/createSocketUrl.js ***!
  \************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      /* global self */

      var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

      var getCurrentScriptSource = __webpack_require__(/*! ./getCurrentScriptSource */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

      function createSocketUrl(resourceQuery, currentLocation) {
        var urlParts;

        if (typeof resourceQuery === 'string' && resourceQuery !== '') {
          // If this bundle is inlined, use the resource query to get the correct url.
          // format is like `?http://0.0.0.0:8096&sockPort=8097&sockHost=localhost`
          urlParts = url.parse(resourceQuery // strip leading `?` from query string to get a valid URL
            .substr(1) // replace first `&` with `?` to have a valid query string
            .replace('&', '?'), true);
        } else {
          // Else, get the url from the <script> this file was called with.
          var scriptHost = getCurrentScriptSource();
          urlParts = url.parse(scriptHost || '/', true, true);
        } // Use parameter to allow passing location in unit tests


        if (typeof currentLocation === 'string' && currentLocation !== '') {
          currentLocation = url.parse(currentLocation);
        } else {
          currentLocation = self.location;
        }

        return getSocketUrl(urlParts, currentLocation);
      }
      /*
 * Gets socket URL based on Script Source/Location
 * (scriptSrc: URL, location: URL) -> URL
 */


      function getSocketUrl(urlParts, loc) {
        var auth = urlParts.auth,
          query = urlParts.query;
        var hostname = urlParts.hostname,
          protocol = urlParts.protocol,
          port = urlParts.port;

        if (!port || port === '0') {
          port = loc.port;
        } // check ipv4 and ipv6 `all hostname`
        // why do we need this check?
        // hostname n/a for file protocol (example, when using electron, ionic)
        // see: https://github.com/webpack/webpack-dev-server/pull/384


        if ((hostname === '0.0.0.0' || hostname === '::') && loc.hostname && loc.protocol.indexOf('http') === 0) {
          hostname = loc.hostname;
        } // `hostname` can be empty when the script path is relative. In that case, specifying
        // a protocol would result in an invalid URL.
        // When https is used in the app, secure websockets are always necessary
        // because the browser doesn't accept non-secure websockets.


        if (hostname && hostname !== '127.0.0.1' && (loc.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
          protocol = loc.protocol;
        } // all of these sock url params are optionally passed in through
        // resourceQuery, so we need to fall back to the default if
        // they are not provided


        var sockHost = query.sockHost || hostname;
        var sockPath = query.sockPath || '/sockjs-node';
        var sockPort = query.sockPort || port;

        if (sockPort === 'location') {
          sockPort = loc.port;
        }

        return url.format({
          protocol: protocol,
          auth: auth,
          hostname: sockHost,
          port: sockPort,
          // If sockPath is provided it'll be passed in via the resourceQuery as a
          // query param so it has to be parsed out of the querystring in order for the
          // client to open the socket to the correct location.
          pathname: sockPath
        });
      }

      module.exports = createSocketUrl;

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
    /*!*******************************************************************!*\
  !*** (webpack)-dev-server/client/utils/getCurrentScriptSource.js ***!
  \*******************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      function getCurrentScriptSource() {
        // `document.currentScript` is the most accurate way to find the current script,
        // but is not supported in all browsers.
        if (document.currentScript) {
          return document.currentScript.getAttribute('src');
        } // Fall back to getting all scripts in the document.


        var scriptElements = document.scripts || [];
        var currentScript = scriptElements[scriptElements.length - 1];

        if (currentScript) {
          return currentScript.getAttribute('src');
        } // Fail as there was no script to use.


        throw new Error('[WDS] Failed to get current script source.');
      }

      module.exports = getCurrentScriptSource;

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/utils/log.js":
    /*!************************************************!*\
  !*** (webpack)-dev-server/client/utils/log.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      var log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js").getLogger('webpack-dev-server');

      var INFO = 'info';
      var WARN = 'warn';
      var ERROR = 'error';
      var DEBUG = 'debug';
      var TRACE = 'trace';
      var SILENT = 'silent'; // deprecated
// TODO: remove these at major released
// https://github.com/webpack/webpack-dev-server/pull/1825

      var WARNING = 'warning';
      var NONE = 'none'; // Set the default log level

      log.setDefaultLevel(INFO);

      function setLogLevel(level) {
        switch (level) {
          case INFO:
          case WARN:
          case ERROR:
          case DEBUG:
          case TRACE:
            log.setLevel(level);
            break;
          // deprecated

          case WARNING:
            // loglevel's warning name is different from webpack's
            log.setLevel('warn');
            break;
          // deprecated

          case NONE:
          case SILENT:
            log.disableAll();
            break;

          default:
            log.error("[WDS] Unknown clientLogLevel '".concat(level, "'"));
        }
      }

      module.exports = {
        log: log,
        setLogLevel: setLogLevel
      };

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
    /*!******************************************************!*\
  !*** (webpack)-dev-server/client/utils/reloadApp.js ***!
  \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      /* global WorkerGlobalScope self */

      var _require = __webpack_require__(/*! ./log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
        log = _require.log;

      function reloadApp(_ref, _ref2) {
        var hotReload = _ref.hotReload,
          hot = _ref.hot,
          liveReload = _ref.liveReload;
        var isUnloading = _ref2.isUnloading,
          currentHash = _ref2.currentHash;

        if (isUnloading || !hotReload) {
          return;
        }

        if (hot) {
          log.info('[WDS] App hot update...');

          var hotEmitter = __webpack_require__(/*! webpack/hot/emitter */ "./node_modules/webpack/hot/emitter.js");

          hotEmitter.emit('webpackHotUpdate', currentHash);

          if (typeof self !== 'undefined' && self.window) {
            // broadcast update to window
            self.postMessage("webpackHotUpdate".concat(currentHash), '*');
          }
        } // allow refreshing the page only if liveReload isn't disabled
        else if (liveReload) {
          var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

          var intervalId = self.setInterval(function () {
            if (rootWindow.location.protocol !== 'about:') {
              // reload immediately if protocol is valid
              applyReload(rootWindow, intervalId);
            } else {
              rootWindow = rootWindow.parent;

              if (rootWindow.parent === rootWindow) {
                // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
                applyReload(rootWindow, intervalId);
              }
            }
          });
        }

        function applyReload(rootWindow, intervalId) {
          clearInterval(intervalId);
          log.info('[WDS] App updated. Reloading...');
          rootWindow.location.reload();
        }
      }

      module.exports = reloadApp;

      /***/ }),

    /***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
    /*!********************************************************!*\
  !*** (webpack)-dev-server/client/utils/sendMessage.js ***!
  \********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";

      /* global __resourceQuery WorkerGlobalScope self */
// Send messages to the outside, so plugins can consume it.

      function sendMsg(type, data) {
        if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
          self.postMessage({
            type: "webpack".concat(type),
            data: data
          }, '*');
        }
      }

      module.exports = sendMsg;

      /***/ }),

    /***/ "./node_modules/webpack/buildin/global.js":
    /*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

      var g;

// This works in non-strict mode
      g = (function() {
        return this;
      })();

      try {
        // This works if eval is allowed (see CSP)
        g = g || new Function("return this")();
      } catch (e) {
        // This works if the window reference is available
        if (typeof window === "object") g = window;
      }

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

      module.exports = g;


      /***/ }),

    /***/ "./node_modules/webpack/buildin/module.js":
    /*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

      module.exports = function(module) {
        if (!module.webpackPolyfill) {
          module.deprecate = function() {};
          module.paths = [];
          // module.parent = undefined by default
          if (!module.children) module.children = [];
          Object.defineProperty(module, "loaded", {
            enumerable: true,
            get: function() {
              return module.l;
            }
          });
          Object.defineProperty(module, "id", {
            enumerable: true,
            get: function() {
              return module.i;
            }
          });
          module.webpackPolyfill = 1;
        }
        return module;
      };


      /***/ }),

    /***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
    /*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      var map = {
        "./log": "./node_modules/webpack/hot/log.js"
      };


      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }
      function webpackContextResolve(req) {
        if(!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }
        return map[req];
      }
      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };
      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

      /***/ }),

    /***/ "./node_modules/webpack/hot/emitter.js":
    /*!********************************!*\
  !*** (webpack)/hot/emitter.js ***!
  \********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
      module.exports = new EventEmitter();


      /***/ }),

    /***/ "./node_modules/webpack/hot/log-apply-result.js":
    /*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
      module.exports = function(updatedModules, renewedModules) {
        var unacceptedModules = updatedModules.filter(function(moduleId) {
          return renewedModules && renewedModules.indexOf(moduleId) < 0;
        });
        var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

        if (unacceptedModules.length > 0) {
          log(
            "warning",
            "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
          );
          unacceptedModules.forEach(function(moduleId) {
            log("warning", "[HMR]  - " + moduleId);
          });
        }

        if (!renewedModules || renewedModules.length === 0) {
          log("info", "[HMR] Nothing hot updated.");
        } else {
          log("info", "[HMR] Updated modules:");
          renewedModules.forEach(function(moduleId) {
            if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
              var parts = moduleId.split("!");
              log.groupCollapsed("info", "[HMR]  - " + parts.pop());
              log("info", "[HMR]  - " + moduleId);
              log.groupEnd("info");
            } else {
              log("info", "[HMR]  - " + moduleId);
            }
          });
          var numberIds = renewedModules.every(function(moduleId) {
            return typeof moduleId === "number";
          });
          if (numberIds)
            log(
              "info",
              "[HMR] Consider using the NamedModulesPlugin for module names."
            );
        }
      };


      /***/ }),

    /***/ "./node_modules/webpack/hot/log.js":
    /*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

      var logLevel = "info";

      function dummy() {}

      function shouldLog(level) {
        var shouldLog =
          (logLevel === "info" && level === "info") ||
          (["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
          (["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
        return shouldLog;
      }

      function logGroup(logFn) {
        return function(level, msg) {
          if (shouldLog(level)) {
            logFn(msg);
          }
        };
      }

      module.exports = function(level, msg) {
        if (shouldLog(level)) {
          if (level === "info") {
            console.log(msg);
          } else if (level === "warning") {
            console.warn(msg);
          } else if (level === "error") {
            console.error(msg);
          }
        }
      };

      /* eslint-disable node/no-unsupported-features/node-builtins */
      var group = console.group || dummy;
      var groupCollapsed = console.groupCollapsed || dummy;
      var groupEnd = console.groupEnd || dummy;
      /* eslint-enable node/no-unsupported-features/node-builtins */

      module.exports.group = logGroup(group);

      module.exports.groupCollapsed = logGroup(groupCollapsed);

      module.exports.groupEnd = logGroup(groupEnd);

      module.exports.setLogLevel = function(level) {
        logLevel = level;
      };

      module.exports.formatError = function(err) {
        var message = err.message;
        var stack = err.stack;
        if (!stack) {
          return message;
        } else if (stack.indexOf(message) < 0) {
          return message + "\n" + stack;
        } else {
          return stack;
        }
      };


      /***/ }),

    /***/ "./node_modules/webpack/hot/only-dev-server.js":
    /*!****************************************!*\
  !*** (webpack)/hot/only-dev-server.js ***!
  \****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
      /*globals __webpack_hash__ */
      if (true) {
        var lastHash;
        var upToDate = function upToDate() {
          return lastHash.indexOf(__webpack_require__.h()) >= 0;
        };
        var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
        var check = function check() {
          module.hot
            .check()
            .then(function(updatedModules) {
              if (!updatedModules) {
                log("warning", "[HMR] Cannot find update. Need to do a full reload!");
                log(
                  "warning",
                  "[HMR] (Probably because of restarting the webpack-dev-server)"
                );
                return;
              }

              return module.hot
                .apply({
                  ignoreUnaccepted: true,
                  ignoreDeclined: true,
                  ignoreErrored: true,
                  onUnaccepted: function(data) {
                    log(
                      "warning",
                      "Ignored an update to unaccepted module " +
                      data.chain.join(" -> ")
                    );
                  },
                  onDeclined: function(data) {
                    log(
                      "warning",
                      "Ignored an update to declined module " +
                      data.chain.join(" -> ")
                    );
                  },
                  onErrored: function(data) {
                    log("error", data.error);
                    log(
                      "warning",
                      "Ignored an error while updating module " +
                      data.moduleId +
                      " (" +
                      data.type +
                      ")"
                    );
                  }
                })
                .then(function(renewedModules) {
                  if (!upToDate()) {
                    check();
                  }

                  __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, renewedModules);

                  if (upToDate()) {
                    log("info", "[HMR] App is up to date.");
                  }
                });
            })
            .catch(function(err) {
              var status = module.hot.status();
              if (["abort", "fail"].indexOf(status) >= 0) {
                log(
                  "warning",
                  "[HMR] Cannot check for update. Need to do a full reload!"
                );
                log("warning", "[HMR] " + log.formatError(err));
              } else {
                log("warning", "[HMR] Update check failed: " + log.formatError(err));
              }
            });
        };
        var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
        hotEmitter.on("webpackHotUpdate", function(currentHash) {
          lastHash = currentHash;
          if (!upToDate()) {
            var status = module.hot.status();
            if (status === "idle") {
              log("info", "[HMR] Checking for updates on the server...");
              check();
            } else if (["abort", "fail"].indexOf(status) >= 0) {
              log(
                "warning",
                "[HMR] Cannot apply update as a previous update " +
                status +
                "ed. Need to do a full reload!"
              );
            }
          }
        });
        log("info", "[HMR] Waiting for update signal from WDS...");
      } else {}


      /***/ }),

    /***/ "./resources/modules/front-app/src/index.js":
    /*!**************************************************!*\
  !*** ./resources/modules/front-app/src/index.js ***!
  \**************************************************/
    /*! no exports provided */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
      /* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
      /* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */ var _sass_front_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sass/front-style.scss */ "./resources/modules/front-app/src/sass/front-style.scss");
      /* harmony import */ var _sass_front_style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sass_front_style_scss__WEBPACK_IMPORTED_MODULE_2__);


      console.log('FIRST SCRIPT: ', performance.now());

      window.sSr = false;
      /**
       * Параллельно загружаем все необходимые модули
       */

      __webpack_require__.e(/*! import() | FrontElementsManager */ "FrontElementsManager").then(__webpack_require__.bind(null, /*! ./js/classes/FrontElementsManager */ "./resources/modules/front-app/src/js/classes/FrontElementsManager.js")).then(function (module) {
        Promise.all(/*! import() | FrontElementsFabric */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(1), __webpack_require__.e(4), __webpack_require__.e(3), __webpack_require__.e(10), __webpack_require__.e("FrontElementsFabric")]).then(__webpack_require__.bind(null, /*! ./js/classes/FrontElementsFabric */ "./resources/modules/front-app/src/js/classes/FrontElementsFabric.js")).then(function (module) {
          console.log('LOAD FrontElementsFabric: ', performance.now());
          loadingCallback();
        });
        return window.frontElementsManager.loadComponents();
      }).then( /*#__PURE__*/function () {
        var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(components) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  window.frontElementsManager.loadNotUsedComponent();
                  console.log('LOAD FrontElementsManager: ', performance.now());
                  loadingCallback();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      Promise.all(/*! import() | elementDecorator */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(1), __webpack_require__.e(4), __webpack_require__.e(3), __webpack_require__.e("elementDecorator")]).then(__webpack_require__.bind(null, /*! ./js/decorators/front-element-component */ "./resources/modules/front-app/src/js/decorators/front-element-component.js")).then(function (module) {
        window.elementDecorator = module["default"];
        console.log('LOAD elementDecorator: ', performance.now());
        loadingCallback();
      });
      __webpack_require__.e(/*! import() | React */ 0).then(__webpack_require__.t.bind(null, /*! react */ "./node_modules/react/index.js", 7)).then(function (module) {
        window.React = module["default"];
        window.Component = module.Component;
        console.log('LOAD React: ', performance.now());
        loadingCallback();
      });
      Promise.all(/*! import() | FrontApp */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(1), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(15), __webpack_require__.e(18), __webpack_require__.e(28), __webpack_require__.e("vendors~FrontApp"), __webpack_require__.e(3), __webpack_require__.e(8), __webpack_require__.e("FrontApp~IconWidget~ImageWidget~NavWidget"), __webpack_require__.e("FrontApp")]).then(__webpack_require__.bind(null, /*! ./FrontApp */ "./resources/modules/front-app/src/FrontApp.js")).then(function (module) {
        window.FrontApp = module["default"];
        console.log('LOAD FrontApp: ', performance.now());
        loadingCallback();
      });
      Promise.all(/*! import() | ReactDOM */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.t.bind(null, /*! react-dom */ "./node_modules/react-dom/index.js", 7)).then(function (module) {
        window.ReactDOM = module["default"];
        console.log('LOAD ReactDOM: ', performance.now());
        loadingCallback();
      });
      Promise.all(/*! import() | ElementWrapper */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(1), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(3), __webpack_require__.e(8), __webpack_require__.e(12), __webpack_require__.e("ElementWrapper")]).then(__webpack_require__.bind(null, /*! ./js/components/ElementWrapper */ "./resources/modules/front-app/src/js/components/ElementWrapper.js")).then(function (module) {
        window.ElementWrapper = module["default"];
        console.log('LOAD ElementWrapper: ', performance.now());
        loadingCallback();
      });
      Promise.all(/*! import() | FormsManager */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(1), __webpack_require__.e(4), __webpack_require__.e(3), __webpack_require__.e(24), __webpack_require__.e("FormsManager")]).then(__webpack_require__.bind(null, /*! ../../editor/src/js/classes/modules/FormsManager.js */ "./resources/modules/editor/src/js/classes/modules/FormsManager.js")).then(function (module) {
        console.log('LOAD FormsManager: ', performance.now());
        loadingCallback();
      });
      /**
       * Рендерим главный компонент после загрузки основных модулей
       */

      function loadingCallback() {
        console.log(window.frontElementsManager.componentsIsLoaded());

        if (window.React && window.Component && window.ReactDOM && window.frontElementsFabric && window.frontElementsManager && window.frontElementsManager.componentsIsLoaded() && window.FrontApp && window.elementDecorator && window.ElementWrapper && window.formsManager) {
          var renderAltrp = function renderAltrp() {
            ReactDOM.render( /*#__PURE__*/React.createElement(FrontApp, null), document.getElementById('front-app'), function () {
              window.removeEventListener('touchstart', renderAltrp);
              window.removeEventListener('mouseover', renderAltrp);
            });
          };

          if (window.ALTRP_LOAD_BY_USER) {
            window.addEventListener('mouseover', renderAltrp);
            window.addEventListener('touchstart', renderAltrp);
          } else {
            renderAltrp();
          }
        }
      }

      window.stylesModulePromise = new Promise(function (resolve) {
        window.stylesModuleResolve = resolve;
      });

      if (true) {
        console.log('Looks like we are in development mode!');
      } else {}

      _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _token;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                __webpack_require__.e(/*! import() */ 87).then(__webpack_require__.bind(null, /*! ./installing */ "./resources/modules/front-app/src/installing.js"));
                Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(16), __webpack_require__.e(63)]).then(__webpack_require__.bind(null, /*! ../../editor/src/js/classes/modules/IconsManager */ "./resources/modules/editor/src/js/classes/modules/IconsManager.js")).then(function (IconsManager) {
                  window.iconsManager = new IconsManager["default"]();
                }); // import('./FrontApp').then(FrontApp => {
                //   FrontApp = FrontApp.default;
                //   ReactDOM.render(<FrontApp />, document.getElementById('front-app'));
                // });

                _context2.next = 4;
                return fetch('/ajax/_token', {
                  method: 'get',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(function (res) {
                  if (res.ok === false) {
                    return Promise.reject({
                      res: res.text(),
                      status: res.status
                    });
                  }

                  return res.json();
                });

              case 4:
                _token = _context2.sent;

                if (_token.success) {
                  window._token = _token._token;
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
      /**
       * Регистрируем сервис-воркеры
       */


      var filename = '/front-app.sw.js';

      if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        navigator.serviceWorker.register(filename, {
          scope: '/'
        });
      }

      /***/ }),

    /***/ "./resources/modules/front-app/src/sass/front-style.scss":
    /*!***************************************************************!*\
  !*** ./resources/modules/front-app/src/sass/front-style.scss ***!
  \***************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {


      var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/sass-loader/dist/cjs.js!./front-style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./resources/modules/front-app/src/sass/front-style.scss");

      if(typeof content === 'string') content = [[module.i, content, '']];

      var transform;
      var insertInto;



      var options = {"hmr":true}

      options.transform = transform
      options.insertInto = undefined;

      var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

      if(content.locals) module.exports = content.locals;

      if(true) {
        module.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/sass-loader/dist/cjs.js!./front-style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./resources/modules/front-app/src/sass/front-style.scss", function() {
          var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/sass-loader/dist/cjs.js!./front-style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./resources/modules/front-app/src/sass/front-style.scss");

          if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

          var locals = (function(a, b) {
            var key, idx = 0;

            for(key in a) {
              if(!b || a[key] !== b[key]) return false;
              idx++;
            }

            for(key in b) idx--;

            return idx === 0;
          }(content.locals, newContent.locals));

          if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

          update(newContent);
        });

        module.hot.dispose(function() { update(); });
      }

      /***/ }),

    /***/ 0:
    /*!*******************************************************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:3001 (webpack)/hot/only-dev-server.js ./resources/modules/front-app/src/index.js ***!
  \*******************************************************************************************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

      __webpack_require__(/*! G:\local\altrp.nz\node_modules\webpack-dev-server\client\index.js?http://localhost:3001 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:3001");
      __webpack_require__(/*! G:\local\altrp.nz\node_modules\webpack\hot\only-dev-server.js */"./node_modules/webpack/hot/only-dev-server.js");
      module.exports = __webpack_require__(/*! ./resources/modules/front-app/src/index.js */"./resources/modules/front-app/src/index.js");


      /***/ })

    /******/ });
