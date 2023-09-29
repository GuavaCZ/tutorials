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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy90dXRvcmlhbC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHV0b3JpYWxDb21wb25lbnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiAwLFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkaXNwYXRjaCgndHV0b3JpYWw6OnJlbmRlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29uZmlndXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndHV0b3JpYWw6OnJlbmRlcicsICgpID0+IHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5zdHlsZS5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUhlaWdodCgpICsgJ3B4JztcbiAgICAgICAgfSxcbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsb0JBQXFDO0FBQ3hDLFNBQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUVSLE1BQU0sV0FBWTtBQUNkLFdBQUssVUFBVTtBQUVmLFdBQUssVUFBVSxNQUFNO0FBQ2pCLGFBQUssVUFBVSxrQkFBa0I7QUFBQSxNQUNyQyxDQUFDO0FBQUEsSUFDTDtBQUFBLElBRUEsV0FBVyxXQUFZO0FBQ25CLGFBQU8saUJBQWlCLG9CQUFvQixNQUFNLEtBQUssT0FBTyxDQUFDO0FBQUEsSUFDbkU7QUFBQSxJQUVBLGlCQUFpQixXQUFZO0FBQ3pCLGFBQU8sS0FBSyxTQUFTLEtBQUs7QUFBQSxRQUN0QixTQUFTLEtBQUs7QUFBQSxRQUNkLFNBQVMsS0FBSztBQUFBLFFBQ2QsU0FBUyxnQkFBZ0I7QUFBQSxRQUN6QixTQUFTLGdCQUFnQjtBQUFBLFFBQ3pCLFNBQVMsZ0JBQWdCO0FBQUEsUUFDekIsU0FBUyxnQkFBZ0Isc0JBQXNCLEVBQUU7QUFBQSxNQUNyRDtBQUFBLElBQ0o7QUFBQSxJQUVBLFFBQVEsV0FBWTtBQUNoQixXQUFLLElBQUksTUFBTSxTQUFTLEtBQUssZ0JBQWdCLElBQUk7QUFBQSxJQUNyRDtBQUFBLEVBQ0o7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
