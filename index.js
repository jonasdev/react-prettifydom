"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function PrettifyDOM(_ref) {
  var children = _ref.children,
      customClassName = _ref.customClassName;
  var elementStyle = [];

  var prettyfiDom = function prettyfiDom() {
    var elements = document.querySelectorAll("*[style]");
    var elementClassName = customClassName ? customClassName : "pdom";
    var embeddedStyling = "";
    elements.forEach(function (element) {
      var cssStyle = element.style.cssText;
      var randomCharacter = Math.random().toString(36).substring(7);
      var customClass = "".concat(elementClassName, "_").concat(randomCharacter);
      var elementTag = element.tagName.toLowerCase();
      var elementClasses = "";

      if (element.classList.length) {
        element.classList.forEach(function (className) {
          elementClasses += ".".concat(className);
        });
      }

      var elementCss = "".concat(elementTag).concat(elementClasses, ".").concat(customClass, "{").concat(cssStyle, "}");
      embeddedStyling += elementCss;
      elementStyle.push({
        className: customClass,
        styling: elementCss
      });
      element.classList.add(customClass);
      element.removeAttribute("style");
    });
    var existingStylesheet = document.querySelector("[data-prettyfidom]");

    if (existingStylesheet) {
      existingStylesheet.innerHTML += embeddedStyling;
      var unmountedElements = [];
      elementStyle.forEach(function (element) {
        var querySelected = document.querySelector(".".concat(element.className));

        if (!querySelected) {
          unmountedElements.push(element); // Remove embedded styling from unmounted elements

          var removeUnmounted = existingStylesheet.innerHTML.replace(element.styling, "");
          existingStylesheet.innerHTML = removeUnmounted;
        }
      }); // Remove unmounted data from elementStyle array

      unmountedElements.forEach(function (element) {
        return elementStyle = elementStyle.filter(function (el) {
          return el !== element;
        });
      });
      unmountedElements = [];
      return;
    }

    var stylesheet = document.createElement("style");
    stylesheet.type = "text/css";
    stylesheet.dataset.prettyfidom = "";
    stylesheet.innerHTML = embeddedStyling;
    document.head.appendChild(stylesheet);
  };

  (0, _react.useEffect)(function () {
    var _document = document,
        body = _document.body;
    var config = {
      childList: true,
      subtree: true
    };

    var callback = function callback(mutations) {
      return prettyfiDom(mutations);
    };

    var observer = new MutationObserver(callback);
    observer.observe(body, config); // Run on first render

    prettyfiDom();
    return function () {
      return observer.disconnect();
    }; //eslint-disable-next-line
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children);
}

PrettifyDOM.propTypes = {
  customClassName: _propTypes["default"].string
};
var _default = PrettifyDOM;
exports["default"] = _default;
