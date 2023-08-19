// resources/js/components/step.js
function stepComponent({
  key,
  selector,
  requiresAction
}) {
  return {
    targetElement: null,
    scrollTimeout: null,
    // You can define any other Alpine.js properties here.
    initialize: function() {
      this.targetElement = this.findElement(key);
      setTimeout(() => {
        console.log("initialize");
        console.log("this.$el", this.$el);
        const dialog = this.$root.querySelector("[data-dialog]");
        console.log("dialogos", dialog);
        const clipPath = this.$root.querySelector("[data-clip-path]");
        console.log("clipPath", clipPath);
        console.log("requiresAction", requiresAction);
        if (requiresAction) {
          this.targetElement.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("$wire", this.$wire.nextTutorialStep());
            this.targetElement.blur();
            const descendants = this.targetElement.querySelectorAll(":hover");
            for (let i = 0; i < descendants.length; i++) {
              const descendant = descendants[i];
              descendant.blur();
            }
          });
        }
        this.initializeDialog();
        clipPath.setAttribute("d", this.clipPath());
      }, 1);
    },
    // You can define any other Alpine.js functions here.
    initializeDialog: function(dialog = null) {
      if (!dialog) {
        dialog = this.$root.querySelector("[data-dialog]");
      }
      const dialogPath = dialog.querySelector("[data-dialog-path]");
      console.log("initializeDialog");
      const rect = this.elementRect();
      const stroke = dialog.querySelector("[data-dialog-stroke]");
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
      element = element || this.targetElement;
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
      let path = "M 0 0 ";
      path += "L 0 " + window.innerHeight + " ";
      path += "L " + window.innerWidth + " " + window.innerHeight + " ";
      path += "L " + window.innerWidth + " 0 ";
      path += "L 0 0 ";
      return path.trim();
    },
    findElement: function(name) {
      return document.querySelector(selector.replace(/\./g, "\\$&")) ?? document.querySelector(selector);
    },
    elementPath: function(element = null, options = {}) {
      element = element || this.targetElement;
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
      element = element || this.targetElement;
      const bounds = element.getBoundingClientRect();
      console.log("bounds", bounds.left, bounds.top);
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        relative: false,
        ...options
      };
      const left = options.relative ? 0 : bounds.left;
      const top = options.relative ? 0 : bounds.top;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy9zdGVwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBJbXBvcnQgYW55IGV4dGVybmFsIEphdmFTY3JpcHQgbGlicmFyaWVzIGZyb20gTlBNIGhlcmUuXG4vLyBpbXBvcnQgTW91c2V0cmFwIGZyb20gJ21vdXNldHJhcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0ZXBDb21wb25lbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlc0FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IG51bGwsXG4gICAgICAgIHNjcm9sbFRpbWVvdXQ6IG51bGwsXG4gICAgICAgIC8vIFlvdSBjYW4gZGVmaW5lIGFueSBvdGhlciBBbHBpbmUuanMgcHJvcGVydGllcyBoZXJlLlxuXG4gICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHRoaXMuc2Nyb2xsVGltZW91dCkge1xuICAgICAgICAgICAgLy8gICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxUaW1lb3V0KTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2Nyb2xsVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgIC8vICAgICB9LCAxMDApO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldEVsZW1lbnQgPSB0aGlzLmZpbmRFbGVtZW50KGtleSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW5pdGlhbGl6ZScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLiRlbCcsIHRoaXMuJGVsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWFsb2cgPSB0aGlzLiRyb290LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZ10nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlhbG9nb3MnLCBkaWFsb2cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaXBQYXRoID0gdGhpcy4kcm9vdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jbGlwLXBhdGhdJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaXBQYXRoJywgY2xpcFBhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXF1aXJlc0FjdGlvbicsIHJlcXVpcmVzQWN0aW9uKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlc0FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCckd2lyZScsIHRoaXMuJHdpcmUubmV4dFR1dG9yaWFsU3RlcCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gdGhpcy50YXJnZXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6aG92ZXJcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzY2VuZGFudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjZW5kYW50ID0gZGVzY2VuZGFudHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY2VuZGFudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZURpYWxvZygpO1xuICAgICAgICAgICAgICAgIGNsaXBQYXRoLnNldEF0dHJpYnV0ZSgnZCcsIHRoaXMuY2xpcFBhdGgoKSk7XG5cbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9LFxuICAgICAgICAvLyBZb3UgY2FuIGRlZmluZSBhbnkgb3RoZXIgQWxwaW5lLmpzIGZ1bmN0aW9ucyBoZXJlLlxuXG4gICAgICAgIGluaXRpYWxpemVEaWFsb2c6IGZ1bmN0aW9uIChkaWFsb2cgPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoIWRpYWxvZykge1xuICAgICAgICAgICAgICAgIGRpYWxvZyA9IHRoaXMuJHJvb3QucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGlhbG9nUGF0aCA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsb2ctcGF0aF0nKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luaXRpYWxpemVEaWFsb2cnKTtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnRSZWN0KCk7XG4gICAgICAgICAgICAvLyBjb25zdCBoZWFkZXIgPSBkaWFsb2cucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nLWhlYWRlcl0nKTtcbiAgICAgICAgICAgIGNvbnN0IHN0cm9rZSA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsb2ctc3Ryb2tlXScpO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IHJlY3RbMV0ueCAtIHJlY3RbMF0ueDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHJlY3RbMl0ueSAtIHJlY3RbMF0ueTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJTVBPUlRBTlQgSEVSRScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dpZHRoJywgd2lkdGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hlaWdodCcsIGhlaWdodCk7XG4gICAgICAgICAgICAvLyB2YXIgeTEgPSBoZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgLy8gdmFyIHkyID0gc3Ryb2tlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgICAgICAgLy8gdmFyIGRpc3RhbmNlID0geTIgLSB5MTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Rpc3RhbmNlJywgZGlzdGFuY2UsIHkyLCB5MSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVjdCcsIHJlY3QpO1xuXG4gICAgICAgICAgICBjb25zdCB4ID0gcmVjdFswXS54O1xuICAgICAgICAgICAgY29uc3QgeSA9IHJlY3RbMF0ueTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd4JywgeCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygneScsIHkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RpYWxvZycsIGRpYWxvZyk7XG4gICAgICAgICAgICAvLyBkaWFsb2cgPSB0aGlzLiRyb290LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZ10nKTtcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnRGVsYXllZCBkaWFsb2cnLCBkaWFsb2cpO1xuXG4gICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaWFsb2ddJykuZm9yRWFjaCgoZGlhbG9nKSA9PiB7XG4gICAgICAgICAgICAvLyAgICBkaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZWxmLiRyb290Jywgc2VsZi4kcm9vdCk7XG4gICAgICAgICAgICAvLyBzZWxmLiRyb290LmFwcGVuZENoaWxkKGRpYWxvZyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29tZXRoaW5nJykpO1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvbWV0aGluZycpLmFwcGVuZENoaWxkKGRpYWxvZyk7XG4gICAgICAgICAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZyk7XG4gICAgICAgICAgICAvLyB9LCAxMDAwKTtcbiAgICAgICAgICAgIHN0cm9rZS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuXG4gICAgICAgICAgICBkaWFsb2dQYXRoLnNldEF0dHJpYnV0ZSgnZCcsIHRoaXMuZWxlbWVudFBhdGgobnVsbCwge3JlbGF0aXZlOiB0cnVlLCBwb3NpdGl2ZTogdHJ1ZX0pKVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsaXBQYXRoOiBmdW5jdGlvbiAoZWxlbWVudCA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy50YXJnZXRFbGVtZW50O1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICByYWRpdXM6IDI0LFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB7eDogMCwgeTogMH0sXG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLndpbmRvd1BhdGgoKX0gJHt0aGlzLmVsZW1lbnRQYXRoKGVsZW1lbnQsIG9wdGlvbnMpfWAudHJpbSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHdpbmRvd1BhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGFkZCBvcHRpb24gdG8gc2VsZWN0IGNsb2Nrd2lzZSAvY291bnRlciBjbG9ja3dpc2VcbiAgICAgICAgICAgIC8vTSAwIDggQyAwIDAgMCAwIDggMCBMIDM4IDAgQyA0NiAwIDQ2IDAgNDYgOCBDIDQ2IDE2IDQ2IDE2IDM4IDE2IEwgOCAxNiBDIDAgMTYgMCAxNiAwIDhcbiAgICAgICAgICAgIGxldCBwYXRoID0gJ00gMCAwICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMIDAgJyArIHdpbmRvdy5pbm5lckhlaWdodCArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJyAnICsgd2luZG93LmlubmVySGVpZ2h0ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgd2luZG93LmlubmVyV2lkdGggKyAnIDAgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgMCAwICc7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLnRyaW0oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaW5kRWxlbWVudDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yLnJlcGxhY2UoL1xcLi9nLCAnXFxcXCQmJykpXG4gICAgICAgICAgICAgICAgPz8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudFBhdGg6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldEVsZW1lbnQ7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50UmVjdChlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSAnJztcbiAgICAgICAgICAgIHBhdGggKz0gJ00gJyArIHJlY3RbMF0ueCArICcgJyArIChyZWN0WzBdLnkgKyBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzBdLnggKyAnICcgKyByZWN0WzBdLnkgKyAnICcgKyByZWN0WzBdLnggKyAnICcgKyByZWN0WzBdLnkgKyAnICcgKyAocmVjdFswXS54ICsgb3B0aW9ucy5yYWRpdXMpICsgJyAnICsgcmVjdFswXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgKHJlY3RbMV0ueCAtIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMV0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0MgJyArIHJlY3RbMV0ueCArICcgJyArIHJlY3RbMV0ueSArICcgJyArIHJlY3RbMV0ueCArICcgJyArIHJlY3RbMV0ueSArICcgJyArIHJlY3RbMV0ueCArICcgJyArIChyZWN0WzFdLnkgKyBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyByZWN0WzJdLnggKyAnICcgKyAocmVjdFsyXS55IC0gb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFsyXS54ICsgJyAnICsgcmVjdFsyXS55ICsgJyAnICsgcmVjdFsyXS54ICsgJyAnICsgcmVjdFsyXS55ICsgJyAnICsgKHJlY3RbMl0ueCAtIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMl0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIChyZWN0WzNdLnggKyBvcHRpb25zLnJhZGl1cykgKyAnICcgKyByZWN0WzNdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzNdLnggKyAnICcgKyByZWN0WzNdLnkgKyAnICcgKyByZWN0WzNdLnggKyAnICcgKyByZWN0WzNdLnkgKyAnICcgKyByZWN0WzNdLnggKyAnICcgKyAocmVjdFszXS55IC0gb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgLy8gcGF0aCArPSAnWic7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyByZWN0WzBdLnggKyAnICcgKyAocmVjdFswXS55ICsgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC50cmltKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudFJlY3Q6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMudGFyZ2V0RWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYm91bmRzJywgYm91bmRzLmxlZnQsIGJvdW5kcy50b3ApO1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICByYWRpdXM6IDI0LFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB7eDogMCwgeTogMH0sXG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBvcHRpb25zLnJlbGF0aXZlID8gMCA6IGJvdW5kcy5sZWZ0O1xuICAgICAgICAgICAgY29uc3QgdG9wID0gb3B0aW9ucy5yZWxhdGl2ZSA/IDAgOiBib3VuZHMudG9wO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCAtIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG9wIC0gb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGggKyBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9zaXRpdmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWluWCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IG1pblkgPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS54IDwgbWluWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWCA9IHJlc3VsdFtpXS54O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS55IDwgbWluWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWSA9IHJlc3VsdFtpXS55O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnggLT0gbWluWDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnkgLT0gbWluWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUdlLFNBQVIsY0FBK0I7QUFBQSxFQUNJO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDSixHQUFHO0FBQ3JDLFNBQU87QUFBQSxJQUNILGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQTtBQUFBLElBR2YsWUFBWSxXQUFZO0FBVXBCLFdBQUssZ0JBQWdCLEtBQUssWUFBWSxHQUFHO0FBQ3pDLGlCQUFXLE1BQU07QUFDYixnQkFBUSxJQUFJLFlBQVk7QUFDeEIsZ0JBQVEsSUFBSSxZQUFZLEtBQUssR0FBRztBQUNoQyxjQUFNLFNBQVMsS0FBSyxNQUFNLGNBQWMsZUFBZTtBQUN2RCxnQkFBUSxJQUFJLFlBQVksTUFBTTtBQUM5QixjQUFNLFdBQVcsS0FBSyxNQUFNLGNBQWMsa0JBQWtCO0FBQzVELGdCQUFRLElBQUksWUFBWSxRQUFRO0FBQ2hDLGdCQUFRLElBQUksa0JBQWtCLGNBQWM7QUFFNUMsWUFBSSxnQkFBZ0I7QUFDaEIsZUFBSyxjQUFjLGlCQUFpQixTQUFTLENBQUMsVUFBVTtBQUVwRCxrQkFBTSxlQUFlO0FBQ3JCLG9CQUFRLElBQUksU0FBUyxLQUFLLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsaUJBQUssY0FBYyxLQUFLO0FBQ3hCLGtCQUFNLGNBQWMsS0FBSyxjQUFjLGlCQUFpQixRQUFRO0FBRWhFLHFCQUFTLElBQUksR0FBRyxJQUFJLFlBQVksUUFBUSxLQUFLO0FBQ3pDLG9CQUFNLGFBQWEsWUFBWSxDQUFDO0FBQ2hDLHlCQUFXLEtBQUs7QUFBQSxZQUNwQjtBQUFBLFVBQ0osQ0FBQztBQUFBLFFBQ0w7QUFFQSxhQUFLLGlCQUFpQjtBQUN0QixpQkFBUyxhQUFhLEtBQUssS0FBSyxTQUFTLENBQUM7QUFBQSxNQUU5QyxHQUFHLENBQUM7QUFBQSxJQUNSO0FBQUE7QUFBQSxJQUdBLGtCQUFrQixTQUFV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QVEsSUFBSSxVQUFVLE9BQU8sTUFBTSxPQUFPLEdBQUc7QUFDN0MsZ0JBQVU7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLFFBQVEsRUFBQyxHQUFHLEdBQUcsR0FBRyxFQUFDO0FBQUEsUUFDbkIsVUFBVTtBQUFBLFFBQ1YsR0FBRztBQUFBLE1BQ1A7QUFDQSxZQUFNLE9BQU8sUUFBUSxXQUFXLElBQUksT0FBTztBQUMzQyxZQUFNLE1BQU0sUUFBUSxXQUFXLElBQUksT0FBTztBQUUxQyxVQUFJLFNBQVM7QUFBQSxRQUNUO0FBQUEsVUFDSSxHQUFHLE9BQU8sUUFBUSxTQUFTLFFBQVEsT0FBTztBQUFBLFVBQzFDLEdBQUcsTUFBTSxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQUEsUUFDN0M7QUFBQSxRQUNBO0FBQUEsVUFDSSxHQUFHLE9BQU8sUUFBUSxjQUFjLFFBQVEsU0FBUyxRQUFRLE9BQU87QUFBQSxVQUNoRSxHQUFHLE1BQU0sUUFBUSxTQUFTLFFBQVEsT0FBTztBQUFBLFFBQzdDO0FBQUEsUUFDQTtBQUFBLFVBQ0ksR0FBRyxPQUFPLFFBQVEsY0FBYyxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQUEsVUFDaEUsR0FBRyxNQUFNLFFBQVEsZUFBZSxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQUEsUUFDcEU7QUFBQSxRQUNBO0FBQUEsVUFDSSxHQUFHLE9BQU8sUUFBUSxTQUFTLFFBQVEsT0FBTztBQUFBLFVBQzFDLEdBQUcsTUFBTSxRQUFRLGVBQWUsUUFBUSxTQUFTLFFBQVEsT0FBTztBQUFBLFFBQ3BFO0FBQUEsTUFDSjtBQUVBLFVBQUksUUFBUSxVQUFVO0FBQ2xCLFlBQUksT0FBTztBQUNYLFlBQUksT0FBTztBQUVYLGlCQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3BDLGNBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxNQUFNO0FBQ3BCLG1CQUFPLE9BQU8sQ0FBQyxFQUFFO0FBQUEsVUFDckI7QUFFQSxjQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksTUFBTTtBQUNwQixtQkFBTyxPQUFPLENBQUMsRUFBRTtBQUFBLFVBQ3JCO0FBQUEsUUFDSjtBQUVBLGlCQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3BDLGlCQUFPLENBQUMsRUFBRSxLQUFLO0FBQ2YsaUJBQU8sQ0FBQyxFQUFFLEtBQUs7QUFBQSxRQUNuQjtBQUFBLE1BQ0o7QUFFQSxhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
