const throttle = (func, wait) => {
  try {
    var timeout;
    return () => {
      var context = this,
        args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        func.apply(context, args);
      }
    };
  } catch (err) {
    console.error("[LazyLoad - throttle]", err);
  }
};

const isFunction = (variable) => {
  try {
    return variable && {}.toString.call(variable) === "[object Function]";
  } catch (err) {
    console.error("[LazyLoad - isFunction]", err);
  }
};

const isElementInViewport = (element) => {
  try {
    var elementBounds = element.getBoundingClientRect();
    const factor = 0.75;

    return (
      window.innerHeight > elementBounds.top * factor &&
      0 < elementBounds.bottom * factor &&
      window.innerWidth > elementBounds.left * factor &&
      0 < elementBounds.right * factor
    );
  } catch (err) {
    console.error("[LazyLoad - isElementInViewport]", err);
  }
};

const LazyLoad = function (options) {
  try {
    var container = document.createElement("a"),
      defaultOptions = {
        attribute: "lazy-img",
        events: ["resize", "scroll", "touchend"],
        interval: 500,
        querySelectorType: "img",
        placeholder: "",
      },
      imageElementsInDOM = [],
      interval,
      processedLazyLoads = 0,
      settingTextToNoscriptFailsInIE8AndBelow = document.createElement("noscript");

    try {
      settingTextToNoscriptFailsInIE8AndBelow.innerText = "";
    } catch (err) {
      return;
    }

    settingTextToNoscriptFailsInIE8AndBelow = void 0;

    options = options || defaultOptions;
    if (typeof options.attribute !== "string") options.attribute = defaultOptions.attribute;
    if (!Array.isArray(options.events)) options.events = defaultOptions.events;
    if (typeof options.placeholder !== "string") options.placeholder = defaultOptions.placeholder;
    if (typeof options.querySelectorType !== "string") options.querySelectorType = defaultOptions.querySelectorType;
    options.interval = options.interval == null ? defaultOptions.interval : ~~options.interval;

    function attemptToLoadImage(temporaryImageElement, lazyLoadedImageSrc, imageElementInDOM) {
      temporaryImageElement.onload = () => {
        imageElementInDOM.src = temporaryImageElement.src;
        processedLazyLoads++;
        if (isFunction(options.lazyLoadCallback)) options.lazyLoadCallback(imageElementInDOM, lazyLoadedImageSrc, true);
      };
      temporaryImageElement.onerror = () => {
        processedLazyLoads++;
        if (isFunction(options.lazyLoadCallback))
          options.lazyLoadCallback(imageElementInDOM, lazyLoadedImageSrc, false);
      };
      imageElementInDOM.removeAttribute("data-src");
      temporaryImageElement.src = lazyLoadedImageSrc;
    }

    var loadImagesVisibleInViewport = throttle(() => {
      if (processedLazyLoads < imageElementsInDOM.length) {
        imageElementsInDOM.forEach((imageElementInDOM) => {
          var src = imageElementInDOM.getAttribute("data-src");

          if (src && isElementInViewport(imageElementInDOM)) {
            attemptToLoadImage(new Image(), src, imageElementInDOM);
          }
        });
      } else {
        clearInterval(interval);

        options.events.forEach((event) => {
          window.removeEventListener(event, loadImagesVisibleInViewport, false);
        });

        imageElementsInDOM.length = 0;
      }
    }, 500);

    Array.prototype.forEach.call(
      document.querySelectorAll("noscript[data-" + options.attribute + "]"),
      function (noscript) {
        var wrapper = document.createElement("div");
        var htmlDecode = function (input) {
          var e = document.createElement("textarea");
          e.innerHTML = input;
          // handle case of empty input
          return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        };

        wrapper.classList.add("wrapper");
        container.innerHTML =
          htmlDecode(noscript.textContent) || htmlDecode(noscript.innerText) || htmlDecode(noscript.innerHTML);

        if (options.querySelectorType !== "img") {
          var elementToLazyLoad = container.querySelectorAll(options.querySelectorType);

          if (elementToLazyLoad) {
            elementToLazyLoad.forEach(function (item) {
              item.querySelector("img").setAttribute("data-src", item.querySelector("img").src);
              item.querySelector("img").src = options.placeholder;
              wrapper.appendChild(item);
              imageElementsInDOM.push(item.querySelector("img"));
            });
            noscript.parentNode.replaceChild(wrapper, noscript);
          }
        } else {
          var imageElementToLazyLoad = container.querySelector("img");

          if (imageElementToLazyLoad) {
            imageElementToLazyLoad.setAttribute("data-src", imageElementToLazyLoad.src);
            imageElementToLazyLoad.src = options.placeholder;
            noscript.parentNode.replaceChild(imageElementToLazyLoad, noscript);
            imageElementsInDOM.push(imageElementToLazyLoad);
          }
        }
      }
    );

    if (imageElementsInDOM.length) {
      loadImagesVisibleInViewport();
      options.events.forEach((event) => {
        window.addEventListener(event, loadImagesVisibleInViewport, false);
      });
      if (options.interval > 0) interval = setInterval(loadImagesVisibleInViewport, options.interval);
    }

    container = void 0;
  } catch (err) {
    console.error("[LazyLoad]", err);
  }
};

export { LazyLoad };
