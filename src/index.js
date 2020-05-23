import React, { useEffect } from "react";
import PropTypes from "prop-types";

function PrettifyDOM({ children, customClassName }) {
  let elementStyle = [];

  const prettyfiDom = () => {
    const elements = document.querySelectorAll("*[style]");
    const elementClassName = customClassName ? customClassName : "pdom";
    let embeddedStyling = "";

    elements.forEach((element) => {
      const cssStyle = element.style.cssText;
      const randomCharacter = Math.random().toString(36).substring(7);
      const customClass = `${elementClassName}_${randomCharacter}`;

      const elementTag = element.tagName.toLowerCase();
      let elementClasses = "";
      if (element.classList.length) {
        element.classList.forEach((className) => {
          elementClasses += `.${className}`;
        });
      }

      const elementCss = `${elementTag}${elementClasses}.${customClass}{${cssStyle}}`;
      embeddedStyling += elementCss;
      elementStyle.push({
        className: customClass,
        styling: elementCss,
      });

      element.classList.add(customClass);
      element.removeAttribute("style");
    });

    const existingStylesheet = document.querySelector("[data-prettyfidom]");
    if (existingStylesheet) {
      existingStylesheet.innerHTML += embeddedStyling;

      let unmountedElements = [];
      elementStyle.forEach((element) => {
        const querySelected = document.querySelector(`.${element.className}`);
        if (!querySelected) {
          unmountedElements.push(element);
          // Remove embedded styling from unmounted elements
          const removeUnmounted = existingStylesheet.innerHTML.replace(
            element.styling,
            ""
          );
          existingStylesheet.innerHTML = removeUnmounted;
        }
      });

      // Remove unmounted data from elementStyle array
      unmountedElements.forEach(
        (element) =>
          (elementStyle = elementStyle.filter((el) => el !== element))
      );
      unmountedElements = [];

      return;
    }

    const stylesheet = document.createElement("style");
    stylesheet.type = "text/css";
    stylesheet.dataset.prettyfidom = "";
    stylesheet.innerHTML = embeddedStyling;
    document.head.appendChild(stylesheet);
  };

  useEffect(() => {
    const { body } = document;
    const config = { childList: true, subtree: true };
    const callback = (mutations) => prettyfiDom(mutations);
    const observer = new MutationObserver(callback);
    observer.observe(body, config);

    // Run on first render
    prettyfiDom();
    return () => observer.disconnect();
    //eslint-disable-next-line
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}

PrettifyDOM.propTypes = {
  customClassName: PropTypes.string,
};

export default PrettifyDOM;
