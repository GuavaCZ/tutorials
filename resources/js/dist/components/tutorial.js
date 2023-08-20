// resources/js/components/tutorial.js
function tutorialComponent() {
  return {
    height: 0,
    init: function() {
      this.configure();
      this.$nextTick(() => {
        this.$dispatch("tutorial::render");
      });
    },
    configure: function() {
      window.addEventListener("tutorial::render", () => this.render());
    },
    calculateHeight: function() {
      return this.height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.getBoundingClientRect().height
      );
    },
    render: function() {
      this.$el.style.height = this.calculateHeight() + "px";
    }
  };
}
export {
  tutorialComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy90dXRvcmlhbC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gSW1wb3J0IGFueSBleHRlcm5hbCBKYXZhU2NyaXB0IGxpYnJhcmllcyBmcm9tIE5QTSBoZXJlLlxuLy8gaW1wb3J0IE1vdXNldHJhcCBmcm9tICdtb3VzZXRyYXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0dXRvcmlhbENvbXBvbmVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWlnaHQ6IDAsXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcblxuICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRpc3BhdGNoKCd0dXRvcmlhbDo6cmVuZGVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb25maWd1cmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0dXRvcmlhbDo6cmVuZGVyJywgKCkgPT4gdGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnN0eWxlLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCkgKyAncHgnO1xuICAgICAgICB9LFxuICAgIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBR2UsU0FBUixvQkFBcUM7QUFDeEMsU0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBRVIsTUFBTSxXQUFZO0FBQ2QsV0FBSyxVQUFVO0FBRWYsV0FBSyxVQUFVLE1BQU07QUFDakIsYUFBSyxVQUFVLGtCQUFrQjtBQUFBLE1BQ3JDLENBQUM7QUFBQSxJQUNMO0FBQUEsSUFFQSxXQUFXLFdBQVk7QUFDbkIsYUFBTyxpQkFBaUIsb0JBQW9CLE1BQU0sS0FBSyxPQUFPLENBQUM7QUFBQSxJQUNuRTtBQUFBLElBRUEsaUJBQWlCLFdBQVk7QUFDekIsYUFBTyxLQUFLLFNBQVMsS0FBSztBQUFBLFFBQ3RCLFNBQVMsS0FBSztBQUFBLFFBQ2QsU0FBUyxLQUFLO0FBQUEsUUFDZCxTQUFTLGdCQUFnQjtBQUFBLFFBQ3pCLFNBQVMsZ0JBQWdCO0FBQUEsUUFDekIsU0FBUyxnQkFBZ0I7QUFBQSxRQUN6QixTQUFTLGdCQUFnQixzQkFBc0IsRUFBRTtBQUFBLE1BQ3JEO0FBQUEsSUFDSjtBQUFBLElBRUEsUUFBUSxXQUFZO0FBQ2hCLFdBQUssSUFBSSxNQUFNLFNBQVMsS0FBSyxnQkFBZ0IsSUFBSTtBQUFBLElBQ3JEO0FBQUEsRUFDSjtBQUNKOyIsCiAgIm5hbWVzIjogW10KfQo=
