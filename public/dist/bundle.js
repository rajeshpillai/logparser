/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogViewer)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



var LogViewer = /*#__PURE__*/function () {
  function LogViewer(el) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.default)(this, LogViewer);

    this.el = el;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__.default)(LogViewer, [{
    key: "componentMounted",
    value: function componentMounted() {
      var that = this;
      $(".file-name").on("click", function (e) {
        e.preventDefault();
        var target = e.target;
        $('.files a').each(function () {
          $(this).removeClass('active');
        });
        $(target).toggleClass('active');
        var logName = target.href.substr(target.href.lastIndexOf('/') + 1);
        $("#log-title").html("LOGS -  ".concat(logName, " >"));
        window.history.pushState({}, e.target.href, e.target.href);
        that.fetchData(e.target.href);
      });
    }
  }, {
    key: "fetchData",
    value: function fetchData(url) {
      var _this = this;

      if (url == "/") return;
      Swal.fire({
        text: "Loading logs....",
        showCancelButton: false,
        showConfirmButton: false
      });
      var options = {
        method: "GET",
        headers: new Headers({
          'content-type': 'application/json'
        }),
        mode: 'cors'
      };

      try {
        fetch(url, options).then(function (response) {
          return response.json();
        }).then(function (data) {
          _this.refreshDataTable(data);

          Swal.close();
        });
      } catch (e) {
        Swal.close();
        alert(e);
      }
    }
  }, {
    key: "refreshStats",
    value: function refreshStats(stats) {
      var stats_c = $("#stats_controller");
      stats_c.html("");
      var ui = "";

      for (var _i = 0, _Object$keys = Object.keys(stats); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        console.log(key + " -> " + stats[key]);
        ui += "\n        <div class=\"stats-item \">\n          <h4 class=\"kpi\">".concat(stats[key], "</h4>\n          <h6>").concat(key, "</h6>\n        </div>\n      ");
      }

      stats_c.html("<div class=\"stats-container\">".concat(ui, "</div>"));
      animateCSS(".stats-item", "pulse");
    }
  }, {
    key: "refreshDataTable",
    value: function refreshDataTable(data) {
      var dataTable = $("#logs").DataTable();
      dataTable.clear().draw(); //dataTable.rows.add(data).draw();

      dataTable.rows.add(data.items);
      dataTable.columns.adjust().draw();
      this.refreshStats(data.stats_controller);
      animateCSS("#logs", "backInLeft");
    }
  }, {
    key: "setupDataTable",
    value: function setupDataTable() {
      var _this2 = this;

      // Set active links
      $(function ($) {
        var path = window.location.href;
        $('.files a').each(function () {
          console.log(this.href, path);

          if (this.href === path) {
            $(this).toggleClass('active');
            $("#log-title").innerHTML = "LOGS - " + path;
          }
        });
      });
      $(document).ready(function () {
        _this2.fetchData(window.location.pathname);

        window.onpopstate = function () {
          _this2.fetchData(window.location.pathname);
        }; // Setup - add a text input to each footer cell


        $('#logs thead tr').clone(true).appendTo('#logs thead');
        $('#logs thead tr:eq(1) th').each(function (i) {
          var title = $(this).text();
          $(this).html("<input type=\"text\" data-col=".concat(i, " class=\"col-search\" placeholder=\"Search ").concat(title, "\" />"));
        });
        $('#logs').removeAttr("width").DataTable({
          data: [],
          orderCellsTop: true,
          columns: [{
            data: 'date'
          }, {
            data: 'time'
          }, {
            data: 'ip'
          }, {
            data: 'method'
          }, {
            data: 'path'
          }, {
            data: 'controller'
          }],
          scrollY: "300px",
          scrollX: true,
          scrollCollapse: true,
          fixedColumns: true,
          initComplete: function initComplete() {
            $(".col-search").on('keyup change clear', function (e) {
              e.stopImmediatePropagation();
              var colIndex = $(this).data("col");
              $("#logs").DataTable().column(colIndex).search(e.target.value).draw();
            });
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render(files) {
      this.setupDataTable();
      this.componentMounted();
      return this;
    }
  }]);

  return LogViewer;
}();



/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_logviewer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var logViewer = new _pages_logviewer_js__WEBPACK_IMPORTED_MODULE_0__.default("#root");
logViewer.render();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map