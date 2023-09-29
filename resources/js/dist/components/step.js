// resources/js/components/step.js
function stepComponent({
  key,
  selector,
  shouldInterceptClick,
  interceptClickAction
}) {
  return {
    target: null,
    init: function() {
      this.target = this.findElement(key);
      if (!this.target) {
        console.error("Tutorial step was not found:", key);
        return;
      }
      document.documentElement.querySelectorAll("input").forEach((element) => element.blur());
      if (this.target) {
        this.target.focus();
      }
      this.configure();
      console.log("initialize");
      console.log("this.$el", this.$el);
      const dialog = this.$el.querySelector("[data-dialog]");
      console.log("dialogos", dialog);
      const clipPath = this.$el.querySelector("[data-clip-path]");
      console.log("clipPath", clipPath);
      console.log("shouldInterceptClick", shouldInterceptClick);
      if (shouldInterceptClick) {
        this.target.addEventListener("click", (event) => {
          console.log("INTERCEPT2");
          event.preventDefault();
          this.$wire.call(interceptClickAction);
          this.target.blur();
          const descendants = this.target.querySelectorAll(":hover");
          for (let i = 0; i < descendants.length; i++) {
            const descendant = descendants[i];
            descendant.blur();
          }
        });
      }
      this.initializeDialog();
      this.$nextTick(() => {
        clipPath.setAttribute("d", this.clipPath());
        this.$dispatch("tutorial::render");
      });
      clipPath.setAttribute("d", this.clipPath());
    },
    timeouts: [],
    configure: function() {
      document.addEventListener("keydown", function(event) {
        var key2 = event.key;
        var isShiftKey = event.shiftKey;
        var isCtrlKey = false;
        var isAltKey = false;
        if (key2 === "Tab") {
          event.preventDefault();
        }
      });
      console.log("configure");
      console.log(this.target.tagName);
      if (this.target instanceof HTMLSelectElement) {
        if (this.target.hasAttribute("data-choice")) {
          this.target = this.target.parentElement.parentElement;
          const dropdown = this.target.querySelector(".choices__list.choices__list--dropdown");
          dropdown.style.zIndex = 100;
        }
      }
      if (this.target.tagName === "TRIX-EDITOR") {
        this.timeouts["trix"] = this.target.clientHeight;
        this.target = this.target.parentElement;
        console.log("is trix");
        const observer = new MutationObserver((mutationsList, observer2) => {
          console.log("resized");
          mutationsList.forEach((mutation) => {
            console.log("mutation", mutation);
            if (this.timeouts["trix"]) {
              clearTimeout(this.timeouts["trix"]);
            }
            this.timeouts["trix"] = setTimeout(() => {
              this.timeouts["trix"] = null;
              this.init();
            }, 500);
          });
        });
        const config = {
          attributes: true,
          attributeFilter: ["height"],
          childList: true,
          subtree: true
        };
        observer.observe(this.target, config);
      }
      if (this.target instanceof HTMLTextAreaElement || this.t) {
        console.log("is textarea");
        let initialWidth = this.target.offsetWidth;
        let initialHeight = this.target.offsetHeight;
        const observer = new MutationObserver(() => {
          if (this.target.offsetWidth !== initialWidth || this.target.offsetHeight !== initialHeight) {
            console.log("Textarea was resized.");
            initialWidth = this.target.offsetWidth;
            initialHeight = this.target.offsetHeight;
            if (this.timeouts["textarea"]) {
              clearTimeout(this.timeouts["textarea"]);
            }
            this.timeouts["textarea"] = setTimeout(() => {
              this.timeouts["textarea"] = null;
              this.init();
            }, 100);
          }
        });
        observer.observe(this.target, { attributes: true, attributeFilter: ["style"] });
      }
    },
    // You can define any other Alpine.js functions here.
    initializeDialog: function(dialog = null) {
      if (!dialog) {
        dialog = this.$el.querySelector("[data-dialog]");
      }
      const dialogPath = dialog.querySelector("[data-dialog-path]");
      console.log("initializeDialog");
      const rect = this.elementRect();
      const stroke = dialog.querySelector("[data-dialog-stroke]");
      window.scrollTo({
        top: rect[0].y - window.innerHeight / 3,
        left: rect[0].x,
        behavior: "smooth"
      });
      const width = rect[1].x - rect[0].x;
      const height = rect[2].y - rect[0].y;
      console.log("IMPORTANT HERE");
      console.log("width", width);
      console.log("height", height);
      console.log("rect", rect);
      const x = rect[0].x;
      const y = rect[0].y;
      console.log("x", x);
      console.log("y", y);
      console.log("dialog", dialog);
      dialog.style.width = `${width}px`;
      dialog.style.transform = `translate(${x}px, ${y}px)`;
      stroke.style.height = `${height}px`;
      dialogPath.setAttribute("d", this.elementPath(null, { relative: true, positive: true }));
    },
    clipPath: function(element = null, options = {}) {
      element = element || this.target;
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        relative: false,
        ...options
      };
      return `${this.windowPath()} ${this.elementPath(element, options)}`.trim();
    },
    windowPath: function() {
      const documentHeight = Math.max(
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      let path = "M 0 0 ";
      path += "L 0 " + documentHeight + " ";
      path += "L " + window.innerWidth + " " + documentHeight + " ";
      path += "L " + window.innerWidth + " 0 ";
      path += "L 0 0 ";
      return path.trim();
    },
    findElement: function(name) {
      return document.querySelector(selector.replace(/\./g, "\\$&")) ?? document.querySelector(selector);
    },
    elementPath: function(element = null, options = {}) {
      element = element || this.target;
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        ...options
      };
      const rect = this.elementRect(element, {
        relative: false,
        ...options
      });
      let path = "";
      path += "M " + rect[0].x + " " + (rect[0].y + options.radius) + " ";
      path += "C " + rect[0].x + " " + rect[0].y + " " + rect[0].x + " " + rect[0].y + " " + (rect[0].x + options.radius) + " " + rect[0].y + " ";
      path += "L " + (rect[1].x - options.radius) + " " + rect[1].y + " ";
      path += "C " + rect[1].x + " " + rect[1].y + " " + rect[1].x + " " + rect[1].y + " " + rect[1].x + " " + (rect[1].y + options.radius) + " ";
      path += "L " + rect[2].x + " " + (rect[2].y - options.radius) + " ";
      path += "C " + rect[2].x + " " + rect[2].y + " " + rect[2].x + " " + rect[2].y + " " + (rect[2].x - options.radius) + " " + rect[2].y + " ";
      path += "L " + (rect[3].x + options.radius) + " " + rect[3].y + " ";
      path += "C " + rect[3].x + " " + rect[3].y + " " + rect[3].x + " " + rect[3].y + " " + rect[3].x + " " + (rect[3].y - options.radius) + " ";
      path += "L " + rect[0].x + " " + (rect[0].y + options.radius) + " ";
      return path.trim();
    },
    elementRect: function(element = null, options = {}) {
      element = element || this.target;
      const bounds = element.getBoundingClientRect();
      console.log("bounds", bounds.left, bounds.top);
      console.log("offset", element.offsetLeft, element.offsetTop);
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        relative: false,
        ...options
      };
      const left = options.relative ? 0 : bounds.left;
      const top = options.relative ? 0 : element.offsetTop;
      console.log("left/top", left, top);
      let result = [
        {
          x: left - options.margin + options.offset.x,
          y: top - options.margin + options.offset.y
        },
        {
          x: left + element.clientWidth + options.margin + options.offset.x,
          y: top - options.margin + options.offset.y
        },
        {
          x: left + element.clientWidth + options.margin + options.offset.x,
          y: top + element.clientHeight + options.margin + options.offset.y
        },
        {
          x: left - options.margin + options.offset.x,
          y: top + element.clientHeight + options.margin + options.offset.y
        }
      ];
      if (options.positive) {
        let minX = 0;
        let minY = 0;
        for (let i = 0; i < result.length; i++) {
          if (result[i].x < minX) {
            minX = result[i].x;
          }
          if (result[i].y < minY) {
            minY = result[i].y;
          }
        }
        for (let i = 0; i < result.length; i++) {
          result[i].x -= minX;
          result[i].y -= minY;
        }
      }
      return result;
    }
  };
}
export {
  stepComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy9zdGVwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGVwQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkSW50ZXJjZXB0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHRDbGlja0FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogbnVsbCxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuZmluZEVsZW1lbnQoa2V5KTtcblxuICAgICAgICAgICAgaWYgKCEgdGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUdXRvcmlhbCBzdGVwIHdhcyBub3QgZm91bmQ6Jywga2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHdpbmRvdy5ibHVyKCk7XG4gICAgICAgICAgICAvLyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5ibHVyKCkpO1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcblxuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5pdGlhbGl6ZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuJGVsJywgdGhpcy4kZWwpO1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nXScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RpYWxvZ29zJywgZGlhbG9nKTtcbiAgICAgICAgICAgIGNvbnN0IGNsaXBQYXRoID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignW2RhdGEtY2xpcC1wYXRoXScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaXBQYXRoJywgY2xpcFBhdGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Nob3VsZEludGVyY2VwdENsaWNrJywgc2hvdWxkSW50ZXJjZXB0Q2xpY2spO1xuXG4gICAgICAgICAgICBpZiAoc2hvdWxkSW50ZXJjZXB0Q2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSU5URVJDRVBUMicpO1xuICAgICAgICAgICAgICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kd2lyZS5jYWxsKGludGVyY2VwdENsaWNrQWN0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gdGhpcy50YXJnZXQucXVlcnlTZWxlY3RvckFsbChcIjpob3ZlclwiKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc2NlbmRhbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjZW5kYW50ID0gZGVzY2VuZGFudHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjZW5kYW50LmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVEaWFsb2coKTtcblxuICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNsaXBQYXRoLnNldEF0dHJpYnV0ZSgnZCcsIHRoaXMuY2xpcFBhdGgoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGlzcGF0Y2goJ3R1dG9yaWFsOjpyZW5kZXInKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjbGlwUGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLmNsaXBQYXRoKCkpO1xuICAgICAgICAgICAgLy8gfSwgMSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGltZW91dHM6IFtdLFxuXG4gICAgICAgIGNvbmZpZ3VyZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUga2V5IGNvZGUgb2YgdGhlIGtleSBwcmVzc2VkXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGV2ZW50LmtleTtcblxuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgc3RhdGUgb2YgdGhlIG1vZGlmaWVyIGtleXNcbiAgICAgICAgICAgICAgICAvLyB2YXIgaXNDdHJsS2V5ID0gZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5O1xuICAgICAgICAgICAgICAgIC8vIHZhciBpc0FsdEtleSA9IGV2ZW50LmFsdEtleTtcbiAgICAgICAgICAgICAgICB2YXIgaXNTaGlmdEtleSA9IGV2ZW50LnNoaWZ0S2V5O1xuICAgICAgICAgICAgICAgIHZhciBpc0N0cmxLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgaXNBbHRLZXkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFueSBjb21iaW5hdGlvbiBvZiBtb2RpZmllciBrZXlzIGFuZCBub3JtYWwga2V5cyB3ZXJlIHByZXNzZWRcbiAgICAgICAgICAgICAgICAvLyBpZiAoaXNDdHJsS2V5IHx8IGlzQWx0S2V5IHx8IGlzU2hpZnRLZXkgfHwga2V5ID09PSAnVGFiJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIChrZXkgPT09ICdUYWInIHx8IGlzU2hpZnRLZXkgJiYga2V5ID09PSAnVGFiJykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdUYWInKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgZXZlbnQgYmVoYXZpb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbmZpZ3VyZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50YXJnZXQudGFnTmFtZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1jaG9pY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSB0aGlzLnRhcmdldC5xdWVyeVNlbGVjdG9yKCcuY2hvaWNlc19fbGlzdC5jaG9pY2VzX19saXN0LS1kcm9wZG93bicpO1xuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS56SW5kZXggPSAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQudGFnTmFtZSA9PT0gJ1RSSVgtRURJVE9SJykge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ3RyaXgnXSA9IHRoaXMudGFyZ2V0LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2lzIHRyaXgnKTtcblxuXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zTGlzdCwgb2JzZXJ2ZXIpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzaXplZCcpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25zTGlzdC5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ211dGF0aW9uJywgbXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGhlaWdodCA9IG11dGF0aW9uLnRhcmdldC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChoZWlnaHQgIT0gdGhpcy50aW1lb3V0c1sndHJpeC1oZWlnaHQnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMudGltZW91dHNbJ3RyaXgtaGVpZ2h0J10gPSBoZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVvdXRzWyd0cml4J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0c1sndHJpeCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0c1sndHJpeCddID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0c1sndHJpeCddID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmIChtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lID09PSAnd2lkdGgnIHx8IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgPT09ICdoZWlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBtdXRhdGlvbi50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IHRhcmdldC5vZmZzZXRXaWR0aDsgLy8gb3IgdGFyZ2V0LnN0eWxlLndpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zdCBuZXdIZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0OyAvLyBvciB0YXJnZXQuc3R5bGUuaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coYFdpZHRoIGNoYW5nZWQgdG86ICR7bmV3V2lkdGh9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhgSGVpZ2h0IGNoYW5nZWQgdG86ICR7bmV3SGVpZ2h0fWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2hlaWdodCddLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy50YXJnZXQsIGNvbmZpZyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fCB0aGlzLnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaXMgdGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGluaXRpYWwgc2l6ZSBvZiB0aGUgdGV4dGFyZWFcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFdpZHRoID0gdGhpcy50YXJnZXQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxIZWlnaHQgPSB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBNdXRhdGlvbk9ic2VydmVyIHRvIG1vbml0b3Igc2l6ZSBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAhPT0gaW5pdGlhbFdpZHRoIHx8IHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAhPT0gaW5pdGlhbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RleHRhcmVhIHdhcyByZXNpemVkLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFdpZHRoID0gdGhpcy50YXJnZXQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsSGVpZ2h0ID0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lb3V0c1sndGV4dGFyZWEnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRzWyd0ZXh0YXJlYSddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0c1sndGV4dGFyZWEnXSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ3RleHRhcmVhJ10gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gU3RhcnQgb2JzZXJ2aW5nIGNoYW5nZXMgaW4gdGhlIHRleHRhcmVhIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMudGFyZ2V0LCB7YXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJ119KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gWW91IGNhbiBkZWZpbmUgYW55IG90aGVyIEFscGluZS5qcyBmdW5jdGlvbnMgaGVyZS5cblxuICAgICAgICBpbml0aWFsaXplRGlhbG9nOiBmdW5jdGlvbiAoZGlhbG9nID0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFkaWFsb2cpIHtcbiAgICAgICAgICAgICAgICBkaWFsb2cgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsb2ddJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkaWFsb2dQYXRoID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZy1wYXRoXScpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5pdGlhbGl6ZURpYWxvZycpO1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFJlY3QoKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IGhlYWRlciA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsb2ctaGVhZGVyXScpO1xuICAgICAgICAgICAgY29uc3Qgc3Ryb2tlID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZy1zdHJva2VdJyk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgdG9wOiByZWN0WzBdLnkgLSAod2luZG93LmlubmVySGVpZ2h0IC8gMyksXG4gICAgICAgICAgICAgICAgbGVmdDogcmVjdFswXS54LFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gcmVjdFsxXS54IC0gcmVjdFswXS54O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gcmVjdFsyXS55IC0gcmVjdFswXS55O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lNUE9SVEFOVCBIRVJFJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIHZhciB5MSA9IGhlYWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICAvLyB2YXIgeTIgPSBzdHJva2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICAvLyB2YXIgZGlzdGFuY2UgPSB5MiAtIHkxO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGlzdGFuY2UnLCBkaXN0YW5jZSwgeTIsIHkxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWN0JywgcmVjdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHggPSByZWN0WzBdLng7XG4gICAgICAgICAgICBjb25zdCB5ID0gcmVjdFswXS55O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3gnLCB4KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd5JywgeSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGlhbG9nJywgZGlhbG9nKTtcbiAgICAgICAgICAgIC8vIGRpYWxvZyA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZ10nKTtcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnRGVsYXllZCBkaWFsb2cnLCBkaWFsb2cpO1xuXG4gICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaWFsb2ddJykuZm9yRWFjaCgoZGlhbG9nKSA9PiB7XG4gICAgICAgICAgICAvLyAgICBkaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZWxmLiRlbCcsIHNlbGYuJGVsKTtcbiAgICAgICAgICAgIC8vIHNlbGYuJGVsLmFwcGVuZENoaWxkKGRpYWxvZyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29tZXRoaW5nJykpO1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvbWV0aGluZycpLmFwcGVuZENoaWxkKGRpYWxvZyk7XG4gICAgICAgICAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZyk7XG4gICAgICAgICAgICAvLyB9LCAxMDAwKTtcbiAgICAgICAgICAgIHN0cm9rZS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuXG4gICAgICAgICAgICBkaWFsb2dQYXRoLnNldEF0dHJpYnV0ZSgnZCcsIHRoaXMuZWxlbWVudFBhdGgobnVsbCwge3JlbGF0aXZlOiB0cnVlLCBwb3NpdGl2ZTogdHJ1ZX0pKVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsaXBQYXRoOiBmdW5jdGlvbiAoZWxlbWVudCA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMud2luZG93UGF0aCgpfSAke3RoaXMuZWxlbWVudFBhdGgoZWxlbWVudCwgb3B0aW9ucyl9YC50cmltKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2luZG93UGF0aDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRIZWlnaHQgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IGFkZCBvcHRpb24gdG8gc2VsZWN0IGNsb2Nrd2lzZSAvY291bnRlciBjbG9ja3dpc2VcbiAgICAgICAgICAgIC8vTSAwIDggQyAwIDAgMCAwIDggMCBMIDM4IDAgQyA0NiAwIDQ2IDAgNDYgOCBDIDQ2IDE2IDQ2IDE2IDM4IDE2IEwgOCAxNiBDIDAgMTYgMCAxNiAwIDhcbiAgICAgICAgICAgIGxldCBwYXRoID0gJ00gMCAwICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMIDAgJyArIGRvY3VtZW50SGVpZ2h0ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgd2luZG93LmlubmVyV2lkdGggKyAnICcgKyBkb2N1bWVudEhlaWdodCArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJyAwICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMIDAgMCAnO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC50cmltKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmluZEVsZW1lbnQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvci5yZXBsYWNlKC9cXC4vZywgJ1xcXFwkJicpKVxuICAgICAgICAgICAgICAgID8/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVsZW1lbnRQYXRoOiBmdW5jdGlvbiAoZWxlbWVudCA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50UmVjdChlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSAnJztcbiAgICAgICAgICAgIHBhdGggKz0gJ00gJyArIHJlY3RbMF0ueCArICcgJyArIChyZWN0WzBdLnkgKyBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzBdLnggKyAnICcgKyByZWN0WzBdLnkgKyAnICcgKyByZWN0WzBdLnggKyAnICcgKyByZWN0WzBdLnkgKyAnICcgKyAocmVjdFswXS54ICsgb3B0aW9ucy5yYWRpdXMpICsgJyAnICsgcmVjdFswXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgKHJlY3RbMV0ueCAtIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMV0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0MgJyArIHJlY3RbMV0ueCArICcgJyArIHJlY3RbMV0ueSArICcgJyArIHJlY3RbMV0ueCArICcgJyArIHJlY3RbMV0ueSArICcgJyArIHJlY3RbMV0ueCArICcgJyArIChyZWN0WzFdLnkgKyBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyByZWN0WzJdLnggKyAnICcgKyAocmVjdFsyXS55IC0gb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFsyXS54ICsgJyAnICsgcmVjdFsyXS55ICsgJyAnICsgcmVjdFsyXS54ICsgJyAnICsgcmVjdFsyXS55ICsgJyAnICsgKHJlY3RbMl0ueCAtIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMl0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIChyZWN0WzNdLnggKyBvcHRpb25zLnJhZGl1cykgKyAnICcgKyByZWN0WzNdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzNdLnggKyAnICcgKyByZWN0WzNdLnkgKyAnICcgKyByZWN0WzNdLnggKyAnICcgKyByZWN0WzNdLnkgKyAnICcgKyByZWN0WzNdLnggKyAnICcgKyAocmVjdFszXS55IC0gb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgLy8gcGF0aCArPSAnWic7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyByZWN0WzBdLnggKyAnICcgKyAocmVjdFswXS55ICsgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC50cmltKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudFJlY3Q6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMudGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgYm91bmRzID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdib3VuZHMnLCBib3VuZHMubGVmdCwgYm91bmRzLnRvcCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb2Zmc2V0JywgZWxlbWVudC5vZmZzZXRMZWZ0LCBlbGVtZW50Lm9mZnNldFRvcCk7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IG9wdGlvbnMucmVsYXRpdmUgPyAwIDogYm91bmRzLmxlZnQ7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSBvcHRpb25zLnJlbGF0aXZlID8gMCA6IGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xlZnQvdG9wJywgbGVmdCwgdG9wKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCAtIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OiBsZWZ0ICsgZWxlbWVudC5jbGllbnRXaWR0aCArIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG9wIC0gb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCArIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OiBsZWZ0IC0gb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCArIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBvc2l0aXZlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1pblggPSAwO1xuICAgICAgICAgICAgICAgIGxldCBtaW5ZID0gMDtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0ueCA8IG1pblgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblggPSByZXN1bHRbaV0ueDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0ueSA8IG1pblkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblkgPSByZXN1bHRbaV0ueTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXS54IC09IG1pblg7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXS55IC09IG1pblk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLGNBQStCO0FBQUEsRUFDSTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNKLEdBQUc7QUFDckMsU0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBRVIsTUFBTSxXQUFZO0FBQ2QsV0FBSyxTQUFTLEtBQUssWUFBWSxHQUFHO0FBRWxDLFVBQUksQ0FBRSxLQUFLLFFBQVE7QUFDZixnQkFBUSxNQUFNLGdDQUFnQyxHQUFHO0FBQ2pEO0FBQUEsTUFDSjtBQUlBLGVBQVMsZ0JBQWdCLGlCQUFpQixPQUFPLEVBQzVDLFFBQVEsQ0FBQyxZQUFZLFFBQVEsS0FBSyxDQUFDO0FBQ3hDLFVBQUksS0FBSyxRQUFRO0FBQ2IsYUFBSyxPQUFPLE1BQU07QUFBQSxNQUN0QjtBQUVBLFdBQUssVUFBVTtBQUdmLGNBQVEsSUFBSSxZQUFZO0FBQ3hCLGNBQVEsSUFBSSxZQUFZLEtBQUssR0FBRztBQUNoQyxZQUFNLFNBQVMsS0FBSyxJQUFJLGNBQWMsZUFBZTtBQUNyRCxjQUFRLElBQUksWUFBWSxNQUFNO0FBQzlCLFlBQU0sV0FBVyxLQUFLLElBQUksY0FBYyxrQkFBa0I7QUFDMUQsY0FBUSxJQUFJLFlBQVksUUFBUTtBQUNoQyxjQUFRLElBQUksd0JBQXdCLG9CQUFvQjtBQUV4RCxVQUFJLHNCQUFzQjtBQUN0QixhQUFLLE9BQU8saUJBQWlCLFNBQVMsQ0FBQyxVQUFVO0FBQzdDLGtCQUFRLElBQUksWUFBWTtB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
