// resources/js/components/step.js
function stepComponent({
  key,
  selector,
  requiresAction
}) {
  return {
    targetElement: null,
    // You can define any other Alpine.js properties here.
    init: function() {
      this.targetElement = this.findElement(key);
      console.log("requiresAction", requiresAction);
      if (requiresAction) {
        this.targetElement.addEventListener("click", (event) => {
          event.preventDefault();
          console.log("$wire", this.$wire.nextStep());
          this.targetElement.blur();
          const descendants = this.targetElement.querySelectorAll(":hover");
          for (let i = 0; i < descendants.length; i++) {
            const descendant = descendants[i];
            descendant.blur();
          }
        });
      }
    },
    // You can define any other Alpine.js functions here.
    initializeDialog: function(dialog) {
      const rect = this.elementRect();
      const header = dialog.querySelector("[data-dialog-header]");
      const stroke = dialog.querySelector("[data-dialog-stroke]");
      const width = rect[1].x - rect[0].x;
      const height = rect[2].y - rect[0].y;
      var y1 = header.getBoundingClientRect().top;
      var y2 = stroke.getBoundingClientRect().top;
      var distance = y2 - y1;
      console.log("distance", distance, y2, y1);
      console.log("rect", rect);
      const x = rect[0].x;
      const y = rect[0].y - distance;
      dialog.style.width = `${width}px`;
      dialog.style.transform = `translate(${x}px, ${y}px)`;
      stroke.style.height = `${height}px`;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy9zdGVwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBJbXBvcnQgYW55IGV4dGVybmFsIEphdmFTY3JpcHQgbGlicmFyaWVzIGZyb20gTlBNIGhlcmUuXG4vLyBpbXBvcnQgTW91c2V0cmFwIGZyb20gJ21vdXNldHJhcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0ZXBDb21wb25lbnQoe1xuICAgIGtleSxcbiAgICBzZWxlY3RvcixcbiAgICByZXF1aXJlc0FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IG51bGwsXG4gICAgICAgIC8vIFlvdSBjYW4gZGVmaW5lIGFueSBvdGhlciBBbHBpbmUuanMgcHJvcGVydGllcyBoZXJlLlxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RWxlbWVudCA9IHRoaXMuZmluZEVsZW1lbnQoa2V5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXF1aXJlc0FjdGlvbicsIHJlcXVpcmVzQWN0aW9uKTtcblxuICAgICAgICAgICAgaWYgKHJlcXVpcmVzQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnJHdpcmUnLCB0aGlzLiR3aXJlLm5leHRTdGVwKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0RWxlbWVudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gdGhpcy50YXJnZXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6aG92ZXJcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjZW5kYW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzY2VuZGFudCA9IGRlc2NlbmRhbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY2VuZGFudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gWW91IGNhbiBkZWZpbmUgYW55IG90aGVyIEFscGluZS5qcyBmdW5jdGlvbnMgaGVyZS5cblxuICAgICAgICBpbml0aWFsaXplRGlhbG9nOiBmdW5jdGlvbiAoZGlhbG9nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBkaWFsb2cucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nLWhlYWRlcl0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJva2UgPSBkaWFsb2cucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nLXN0cm9rZV0nKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gcmVjdFsxXS54IC0gcmVjdFswXS54O1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHJlY3RbMl0ueSAtIHJlY3RbMF0ueTtcbiAgICAgICAgICAgICAgICB2YXIgeTEgPSBoZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgICAgIHZhciB5MiA9IHN0cm9rZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB5MiAtIHkxO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc3RhbmNlJywgZGlzdGFuY2UsIHkyLCB5MSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlY3QnLCByZWN0KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHggPSByZWN0WzBdLng7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IHJlY3RbMF0ueSAtIGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIGRpYWxvZy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgICAgICAgICAgICBkaWFsb2cuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICAgICAgICAgIHN0cm9rZS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsaXBQYXRoOiBmdW5jdGlvbihlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldEVsZW1lbnQ7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMud2luZG93UGF0aCgpfSAke3RoaXMuZWxlbWVudFBhdGgoZWxlbWVudCwgb3B0aW9ucyl9YC50cmltKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2luZG93UGF0aDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gVE9ETzogYWRkIG9wdGlvbiB0byBzZWxlY3QgY2xvY2t3aXNlIC9jb3VudGVyIGNsb2Nrd2lzZVxuICAgICAgICAgICAgLy9NIDAgOCBDIDAgMCAwIDAgOCAwIEwgMzggMCBDIDQ2IDAgNDYgMCA0NiA4IEMgNDYgMTYgNDYgMTYgMzggMTYgTCA4IDE2IEMgMCAxNiAwIDE2IDAgOFxuICAgICAgICAgICAgbGV0IHBhdGggPSAnTSAwIDAgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgMCAnICsgd2luZG93LmlubmVySGVpZ2h0ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgd2luZG93LmlubmVyV2lkdGggKyAnICcgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyB3aW5kb3cuaW5uZXJXaWR0aCArICcgMCAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAwIDAgJztcblxuICAgICAgICAgICAgcmV0dXJuIHBhdGgudHJpbSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGZpbmRFbGVtZW50OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IucmVwbGFjZSgvXFwuL2csICdcXFxcJCYnKSlcbiAgICAgICAgICAgICAgPz8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudFBhdGg6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldEVsZW1lbnQ7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50UmVjdChlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSAnJztcbiAgICAgICAgICAgIHBhdGggKz0gJ00gJyArIHJlY3RbMF0ueCArICcgJyArIChyZWN0WzBdLnkgKyAgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFswXS54ICsgJyAnICsgcmVjdFswXS55ICsgJyAnICsgcmVjdFswXS54ICsgJyAnICsgcmVjdFswXS55ICsgJyAnICsgKHJlY3RbMF0ueCArICBvcHRpb25zLnJhZGl1cykgKyAnICcgKyByZWN0WzBdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyAocmVjdFsxXS54IC0gIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMV0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0MgJyArIHJlY3RbMV0ueCArICcgJyArIHJlY3RbMV0ueSArICcgJyArIHJlY3RbMV0ueCArICcgJyArIHJlY3RbMV0ueSArICcgJyArIHJlY3RbMV0ueCArICcgJyArIChyZWN0WzFdLnkgKyAgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgcmVjdFsyXS54ICsgJyAnICsgKHJlY3RbMl0ueSAtICBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzJdLnggKyAnICcgKyByZWN0WzJdLnkgKyAnICcgKyByZWN0WzJdLnggKyAnICcgKyByZWN0WzJdLnkgKyAnICcgKyAocmVjdFsyXS54IC0gIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMl0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIChyZWN0WzNdLnggKyAgb3B0aW9ucy5yYWRpdXMpICsgJyAnICsgcmVjdFszXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFszXS54ICsgJyAnICsgcmVjdFszXS55ICsgJyAnICsgcmVjdFszXS54ICsgJyAnICsgcmVjdFszXS55ICsgJyAnICsgcmVjdFszXS54ICsgJyAnICsgKHJlY3RbM10ueSAtICBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICAvLyBwYXRoICs9ICdaJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHJlY3RbMF0ueCArICcgJyArIChyZWN0WzBdLnkgKyAgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC50cmltKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudFJlY3Q6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMudGFyZ2V0RWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYm91bmRzJywgYm91bmRzLmxlZnQsIGJvdW5kcy50b3ApO1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICByYWRpdXM6IDI0LFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB7eDogMCwgeTogMH0sXG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBvcHRpb25zLnJlbGF0aXZlID8gMCA6IGJvdW5kcy5sZWZ0O1xuICAgICAgICAgICAgY29uc3QgdG9wID0gb3B0aW9ucy5yZWxhdGl2ZSA/IDAgOiBib3VuZHMudG9wO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCAtIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG9wIC0gb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGggKyBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9zaXRpdmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWluWCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IG1pblkgPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS54IDwgbWluWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWCA9IHJlc3VsdFtpXS54O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS55IDwgbWluWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWSA9IHJlc3VsdFtpXS55O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnggLT0gbWluWDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnkgLT0gbWluWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUdlLFNBQVIsY0FBK0I7QUFBQSxFQUNsQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ2tDLEdBQUc7QUFDckMsU0FBTztBQUFBLElBQ0gsZUFBZTtBQUFBO0FBQUEsSUFHZixNQUFNLFdBQVk7QUFDZCxXQUFLLGdCQUFnQixLQUFLLFlBQVksR0FBRztBQUN6QyxjQUFRLElBQUksa0JBQWtCLGNBQWM7QUFFNUMsVUFBSSxnQkFBZ0I7QUFDaEIsYUFBSyxjQUFjLGlCQUFpQixTQUFTLENBQUMsVUFBVTtBQUVwRCxnQkFBTSxlQUFlO0FBQ3JCLGtCQUFRLElBQUksU0FBUyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBRTFDLGVBQUssY0FBYyxLQUFLO0FBQ3hCLGdCQUFNLGNBQWMsS0FBSyxjQUFjLGlCQUFpQixRQUFRO0FBRWhFLG1CQUFTLElBQUksR0FBRyxJQUFJLFlBQVksUUFBUSxLQUFLO0FBQ3pDLGtCQUFNLGFBQWEsWUFBWSxDQUFDO0FBQ2hDLHVCQUFXLEtBQUs7QUFBQSxVQUNwQjtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKO0FBQUE7QUFBQSxJQUdBLGtCQUFrQixTQUFVLFFBQVE7QUFDNUIsWUFBTSxPQUFPLEtBQUssWUFBWTtBQUM5QixZQUFNLFNBQVMsT0FBTyxjQUFjLHNCQUFzQjtBQUMxRCxZQUFNLFNBQVMsT0FBTyxjQUFjLHNCQUFzQjtBQUUxRCxZQUFNLFFBQVEsS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRTtBQUNsQyxZQUFNLFNBQVMsS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRTtBQUNuQyxVQUFJLEtBQUssT0FBTyxzQkFBc0IsRUFBRTtBQUN4QyxVQUFJLEtBQUssT0FBTyxzQkFBc0IsRUFBRTtBQUV4QyxVQUFJLFdBQVcsS0FBSztBQUVwQixjQUFRLElBQUksWUFBWSxVQUFVLElBQUksRUFBRTtBQUN4QyxjQUFRLElBQUksUUFBUSxJQUFJO0FBRXhCLFlBQU0sSUFBSSxLQUFLLENBQUMsRUFBRTtBQUNsQixZQUFNLElBQUksS0FBSyxDQUFDLEVBQUUsSUFBSTtBQUN0QixhQUFPLE1BQU0sUUFBUSxHQUFHLEtBQUs7QUFDN0IsYUFBTyxNQUFNLFlBQVksYUFBYSxDQUFDLE9BQU8sQ0FBQztBQUMvQyxhQUFPLE1BQU0sU0FBUyxHQUFHLE1BQU07QUFBQSxJQUN2QztBQUFBLElBRUEsVUFBVSxTQUFTLFVBQVUsTUFBTSxVQUFVLENBQUMsR0FBRztBQUM3QyxnQkFBVSxXQUFXLEtBQUs7QUFDMUIsZ0JBQVU7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLFFBQVEsRUFBQyxHQUFHLEdBQUcsR0FBRyxFQUFDO0FBQUEsUUFDbkIsVUFBVTtBQUFBLFFBQ1YsR0FBRztBQUFBLE1BQ1A7QUFDQSxhQUFPLEdBQUcsS0FBSyxXQUFXLENBQUMsSUFBSSxLQUFLLFlBQVksU0FBUyxPQUFPLENBQUMsR0FBRyxLQUFLO0FBQUEsSUFDN0U7QUFBQSxJQUVBLFlBQVksV0FBWTtBQUdwQixVQUFJLE9BQU87QUFDWCxjQUFRLFNBQVMsT0FBTyxjQUFjO0FBQ3RDLGNBQVEsT0FBTyxPQUFPLGFBQWEsTUFBTSxPQUFPLGNBQWM7QUFDOUQsY0FBUSxPQUFPLE9BQU8sYUFBYTtBQUNuQyxjQUFRO0FBRVIsYUFBTyxLQUFLLEtBQUs7QUFBQSxJQUNyQjtBQUFBLElBRUEsYUFBYSxTQUFTLE1BQU07QUFDMUIsYUFBTyxTQUFTLGNBQWMsU0FBUyxRQUFRLE9BQU8sTUFBTSxDQUFDLEtBQ3RELFNBQVMsY0FBYyxRQUFRO0FBQUEsSUFDeEM7QUFBQSxJQUVBLGFBQWEsU0FBVSxVQUFVLE1BQU0sVUFBVSxDQUFDLEdBQUc7QUFDakQsZ0JBQVUsV0FBVyxLQUFLO0FBQzFCLGdCQUFVO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixRQUFRLEVBQUMsR0FBRyxHQUFHLEdBQUcsRUFBQztBQUFBLFFBQ25CLEdBQUc7QUFBQSxNQUNQO0FBQ0EsWUFBTSxPQUFPLEtBQUssWUFBWSxTQUFTO0FBQUEsUUFDbkMsVUFBVTtBQUFBLFFBQ1YsR0FBRztBQUFBLE1BQ1AsQ0FBQztBQUVELFVBQUksT0FBTztBQUNYLGNBQVEsT0FBTyxLQUFLLENBQUMsRUFBRSxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUUsSUFBSyxRQUFRLFVBQVU7QUFDakUsY0FBUSxPQUFPLEtBQUssQ0FBQyxFQUFFLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRSxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUUsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRSxJQUFLLFFBQVEsVUFBVSxNQUFNLEtBQUssQ0FBQyxFQUFFLElBQUk7QUFDekksY0FBUSxRQUFRLEtBQUssQ0FBQyxFQUFFLElBQUssUUFBUSxVQUFVLE1BQU0sS0FBSyxDQUFDLEVBQUUsSUFBSTtBQUNqRSxjQUFRLE9BQU8sS0FBSyxDQUFDLEVBQUUsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRSxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUUsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRSxJQUFLLFFBQVEsVUFBVTtBQUN6SSxjQUFRLE9BQU8sS0FBSyxDQUFDLEVBQUUsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFLElBQUssUUFBUSxVQUFVO0FBQ2pFLGNBQVEsT0FBTyxLQUFLLENBQUMsRUFBRSxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUUsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRSxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUUsSUFBSyxRQUFRLFVBQVUsTUFBTSxLQUFLLENBQUMsRUFBRSxJQUFJO0FBQ3pJLGNBQVEsUUFBUSxLQUFLLENBQUMsRUFBRSxJQUFLLFFBQVEsVUFBVSxNQUFNLEtBQUssQ0FBQyxFQUFFLElBQUk7QUFDakUsY0FBUSxPQUFPLEtBQUssQ0FBQyxFQUFFLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRSxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUUsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRSxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUUsSUFBSyxRQUFRLFVBQVU7QUFFekksY0FBUSxPQUFPLEtBQUssQ0FBQyxFQUFFLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRSxJQUFLLFFBQVEsVUFBVTtBQUVqRSxhQUFPLEtBQUssS0FBSztBQUFBLElBQ3JCO0FBQUEsSUFFQSxhQUFhLFNBQVUsVUFBVSxNQUFNLFVBQVUsQ0FBQyxHQUFHO0FBRWpELGdCQUFVLFdBQVcsS0FBSztBQUMxQixZQUFNLFNBQVMsUUFBUSxzQkFBc0I7QUFDN0MsY0FBUSxJQUFJLFVBQVUsT0FBTyxNQUFNLE9BQU8sR0FBRztBQUM3QyxnQkFBVTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsUUFBUSxFQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUM7QUFBQSxRQUNuQixVQUFVO0FBQUEsUUFDVixHQUFHO0FBQUEsTUFDUDtBQUNBLFlBQU0sT0FBTyxRQUFRLFdBQVcsSUFBSSxPQUFPO0FBQzNDLFlBQU0sTUFBTSxRQUFRLFdBQVcsSUFBSSxPQUFPO0FBRTFDLFVBQUksU0FBUztBQUFBLFFBQ1Q7QUFBQSxVQUNJLEdBQUcsT0FBTyxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQUEsVUFDMUMsR0FBRyxNQUFNLFFBQVEsU0FBUyxRQUFRLE9BQU87QUFBQSxRQUM3QztBQUFBLFFBQ0E7QUFBQSxVQUNJLEdBQUcsT0FBTyxRQUFRLGNBQWMsUUFBUSxTQUFTLFFBQVEsT0FBTztBQUFBLFVBQ2hFLEdBQUcsTUFBTSxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQUEsUUFDN0M7QUFBQSxRQUNBO0FBQUEsVUFDSSxHQUFHLE9BQU8sUUFBUSxjQUFjLFFBQVEsU0FBUyxRQUFRLE9BQU87QUFBQSxVQUNoRSxHQUFHLE1BQU0sUUFBUSxlQUFlLFFBQVEsU0FBUyxRQUFRLE9BQU87QUFBQSxRQUNwRTtBQUFBLFFBQ0E7QUFBQSxVQUNJLEdBQUcsT0FBTyxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQUEsVUFDMUMsR0FBRyxNQUFNLFFBQVEsZUFBZSxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQUEsUUFDcEU7QUFBQSxNQUNKO0FBRUEsVUFBSSxRQUFRLFVBQVU7QUFDbEIsWUFBSSxPQUFPO0FBQ1gsWUFBSSxPQUFPO0FBRVgsaUJBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxRQUFRLEtBQUs7QUFDcEMsY0FBSSxPQUFPLENBQUMsRUFBRSxJQUFJLE1BQU07QUFDcEIsbUJBQU8sT0FBTyxDQUFDLEVBQUU7QUFBQSxVQUNyQjtBQUVBLGNBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxNQUFNO0FBQ3BCLG1CQUFPLE9BQU8sQ0FBQyxFQUFFO0FBQUEsVUFDckI7QUFBQSxRQUNKO0FBRUEsaUJBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxRQUFRLEtBQUs7QUFDcEMsaUJBQU8sQ0FBQyxFQUFFLEtBQUs7QUFDZixpQkFBTyxDQUFDLEVBQUUsS0FBSztBQUFBLFFBQ25CO0FBQUEsTUFDSjtBQUVBLGFBQU87QUFBQSxJQUNYO0FBQUEsRUFDSjtBQUNKOyIsCiAgIm5hbWVzIjogW10KfQo=
