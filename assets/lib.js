/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/lib.js":
/*!***********************!*\
  !*** ./src/js/lib.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initAddCartAction\": () => (/* binding */ initAddCartAction),\n/* harmony export */   \"updateCartCount\": () => (/* binding */ updateCartCount)\n/* harmony export */ });\nfunction initAddCartAction() {\n  var addCartActionElementList = document.querySelectorAll('[data-add-cart]');\n  addCartActionElementList.forEach(function (element) {\n    element.addEventListener('click', handleAddCart);\n  });\n  function handleAddCart(event) {\n    var targetElement = event.currentTarget;\n    var productId = parseInt(targetElement.dataset.addCart);\n    enableBtnLoading(targetElement);\n    var formData = {\n      'items': [{\n        'id': productId,\n        'quantity': 1\n      }]\n    };\n    fetch(window.Shopify.routes.root + 'cart/add.js', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(formData)\n    }).then(function (res) {\n      if (!res.ok) {\n        throw new Error();\n      }\n      return res.json();\n    }).then(function (data) {\n      updateCartCount();\n    })[\"catch\"](function (error) {\n      console.error(error);\n    })[\"finally\"](function () {\n      disableBtnLoading(targetElement);\n    });\n    function enableBtnLoading(element) {\n      element.querySelector('[data-add-state=\"default\"]').classList.add('hidden');\n      element.querySelector('[data-add-state=\"loading\"]').classList.remove('hidden');\n      element.disabled = true;\n    }\n    function disableBtnLoading(element) {\n      element.querySelector('[data-add-state=\"loading\"]').classList.add('hidden');\n      element.querySelector('[data-add-state=\"success\"]').classList.remove('hidden');\n      setTimeout(function () {\n        element.querySelector('[data-add-state=\"success\"]').classList.add('hidden');\n        element.querySelector('[data-add-state=\"default\"]').classList.remove('hidden');\n        element.disabled = false;\n      }, 500);\n    }\n  }\n}\nfunction updateCartCount() {\n  fetch(window.Shopify.routes.root + \"cart.js\").then(function (res) {\n    if (!res.ok) {\n      throw new Error();\n    }\n    return res.json();\n  }).then(function (data) {\n    handleCartCount(data.item_count);\n    handleCartTotal(data.items_subtotal_price);\n  })[\"catch\"](function (error) {\n    console.error(error);\n  })[\"finally\"](function () {});\n  function handleCartTotal(total) {\n    var currencySymbol = document.querySelector('[data-currency-symbol]').dataset.currencySymbol;\n    var text = currencySymbol;\n    if (total === 0) {\n      text += total + '.00';\n    } else if (total.toString().length === 2) {\n      text += '0.' + total;\n    } else {\n      var prefix = total.toString().slice(0, -2);\n      var suffix = total.toString().slice(-2);\n      text += prefix + '.' + suffix;\n    }\n    text += ' ' + window.Shopify.currency.active;\n    var cartTotalElementList = document.querySelectorAll('[data-cart-total]');\n    cartTotalElementList.forEach(function (cartTotalElement) {\n      cartTotalElement.innerText = text;\n    });\n  }\n  function handleCartCount(count) {\n    var text = 'empty';\n    if (count === 1) {\n      text = '1 item';\n    } else if (count > 1) {\n      text = count + ' items';\n    }\n    var cartCountElementList = document.querySelectorAll('[data-cart-count]');\n    cartCountElementList.forEach(function (cartCountElement) {\n      if (cartCountElement.dataset.cartCount === 'full') {\n        cartCountElement.innerText = text;\n      } else if (cartCountElement.dataset.cartCount === 'short') {\n        cartCountElement.innerText = count;\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/js/lib.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/lib.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;