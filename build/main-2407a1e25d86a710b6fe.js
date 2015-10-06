/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var App = __webpack_require__(7);
	var node = document.getElementById('app');
	var appConfig = __webpack_require__(1);
	var allConfigs = {
		app: appConfig
	};

	for (var i in appConfig.configs) {
		if (appConfig.configs[i] === 'app') continue;
		allConfigs[appConfig.configs[i]] = __webpack_require__(2)("./" + appConfig.configs[i]);
	}

	consle.log('App', App);

	new App(allConfigs, node);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
		configs: ['app', 'helpers', 'navigation', 'routes', 'storages']
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./app": 1,
		"./app.js": 1,
		"./helpers": 3,
		"./helpers.js": 3,
		"./navigation": 4,
		"./navigation.js": 4,
		"./routes": 5,
		"./routes.js": 5,
		"./storages": 6,
		"./storages.js": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var App = function App(config, node) {
		_classCallCheck(this, App);

		console.log('c', config);
	};

	exports.App = App;

/***/ }
/******/ ]);