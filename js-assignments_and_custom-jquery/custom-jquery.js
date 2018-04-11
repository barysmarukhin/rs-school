(function () {
  const $ = element => new $.fn.init(element);
  $.fn = {
    init: function (element) {
      if (typeof element === 'string') {
        const elements = document.querySelectorAll(element);// take nodeList
        this.elements = Array.from(elements);// create an Array from nodeList
      } else {
        this.elements = [];
        this.elements.push(element);
      }
      return this;
    },
    addClass: function (theClass) {
      if (typeof theClass === 'string') {
        theClass = theClass.indexOf(' ') < 0 ? theClass : theClass.split(' ');
        if (typeof theClass === 'string') {
          this.elements.forEach(element => element.classList.add(theClass));
        } else {
          this.elements.forEach((element) => {
            theClass.forEach(singleClass => element.classList.add(singleClass));
          });
        }
      } else if (typeof theClass === 'function') {
        this.elements.forEach((element, index) => {
          const cssClasses = theClass.call(element, index, element.className);
          $(element).addClass(cssClasses);
        });
      }
      return this;
    },
    append: function (content) {
      if (typeof content === 'string') {
        this.html(content);
      } else {
        this.elements.forEach((element) => {
          element.appendChild(content.cloneNode(true));
        });
      }
      return this;
    },
    html: function (...args) {
      if (!args.length) {
        return this.elements[0].innerHTML;
      }
      if (typeof args[0] === 'string') {
        this.elements.map(element => element.innerHTML = args[0]);
      }
      return this;
    },
    attr: function (...args) {
      if (args.length === 1 && typeof args[0] === 'string') {
        return this.elements[0].getAttribute(args[0]);
      } else if (args.length === 1 && args[0].toString() === '[object Object]') {
        this.elements.forEach((element) => {
          Object.keys(args[0]).forEach(key => element.setAttribute(key, args[0].key));
        });
      } else if (args.length === 2) {
        this.elements.forEach(element => element.setAttribute(args[0], args[1]));
      }
      return this;
    },
    children: function (...args) {
      if (args.length === 0) {
        return this.elements[0].children;
      }
      const childrenSelected = $(args[0]).elements;
      const childrenAll = Array.from(this.elements[0].children);
      return childrenAll.filter(element => childrenSelected.indexOf(element) !== -1);
    },
    css: function (...args) {
      if (args.length === 1 && typeof args[0] === 'string') {
        return this.elements[0].style[args[0]];
      }
      if (args[0].toString() === '[object Array]') {
        const outputObject = {};
        args[0].forEach((cssKey) => {
          const cssValue = this.css(cssKey);
          Object.assign(outputObject, { cssKey: cssValue });
        });
        return outputObject;
      }
      if (args[0].toString() === '[object Object]') {
        this.elements.forEach((element) => {
          Object.keys(args[0]).forEach((cssKey) => {
            element.style[cssKey] = args[0][cssKey];
          });
        });
      } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
        this.elements.forEach(element => element.style[args[0]] = args[1]);
      } else if (typeof args[0] === 'string' && typeof args[1] === 'function') {
        this.element.forEach((element, index) => {
          const cssValue = args[1].call(element, index, element.style[args[0]]);
          element.style[args[0]] = cssValue;
        });
      }
      return this;
    },
    data: function (...args) {
      if (args.length === 0) {
        return this.elements[0].dataset;
      }
      if (args.length === 1) {
        if (typeof args[0] === 'string') {
          return this.elements[0].dataset[args[0]];
        }
        if (args[0].toString() === '[object Object]') {
          this.elements.forEach((element) => {
            Object.keys(args[0]).forEach((dataElement) => {
              element.dataset[dataElement] = args[0][dataElement];
            });
          });
        }
      } else if (typeof args[0] === 'string' && typeof args[1] !== 'undefined') {
        this.elements.forEach((element) => {
          element.dataset[args[0]] = args[1];
        })
      }
      return this;
    },
    on: function (...args) {
      const event = args[0];
      const callback = args[args.length - 1];
      let data;
      if (args.length === 2) {
        this.elements[0].addEventListener(event, callback);
      } else {
        const selector = args[1];
        if (typeof args[3] === 'function') { // if callback is a third argument which means that data exist
          data = args[2];
        }
        this.elements[0].addEventListener(event, (e, ...rest) => {
          if (data) {
            e.data = data;
          }
          if ($(selector).elements.indexOf(e.target) !== -1) {
            callback(e, ...rest);
          }
        });
      }
    },
    one: function (...args) {
      const event = args[0];
      const callback = args[args.length - 1];
      const callOnce = (...rest) => {
        callback(...rest);
        this.elements[0].removeEventListener(event, callOnce);
      }
      this.elements[0].addEventListener(event, callOnce);
    },
    each: function (...args) {
      let result = true;
      if (typeof args[0] === 'function') {
        for (let i = 0; i < this.elements.length; i += 1) {
          if (args[0].call(this.elements[i], i, this.elements[i]) === false) {
            result = false;
            break;
          }
        }
      } else if (typeof args[0] === 'object' && typeof args[1] === 'function') {n
        const object = args[0];
        const callback = args[1];
        if (object.toString() === 'object Array') {
          for (let i = 0; i < object.length; i += 1) {
            if (callback.call(object[i], i, object[i]) === false) {
              result = false;
              break;
            }
          }
        } else if (object.toString === 'object Object') {
          for (const key of object) {
            if (callback.call(object[key], key, object[key]) === false) {
              result = false;
              break;
            }
          }
        }
      }
      return result ? this : false;
    },
  };
  $.fn.init.prototype = $.fn;// make custom-jquery methods available using prototype chain
  window.$ = $; // add '$' property to global 'window' object
})();
