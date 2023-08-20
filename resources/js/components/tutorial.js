// Import any external JavaScript libraries from NPM here.
// import Mousetrap from 'mousetrap';

export default function tutorialComponent() {
    return {
        height: 0,

        init: function () {
            this.configure();

            this.$nextTick(() => {
                this.$dispatch('tutorial::render');
            });
        },

        configure: function () {
            window.addEventListener('tutorial::render', () => this.render());
        },

        calculateHeight: function () {
            return this.height = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
                document.documentElement.getBoundingClientRect().height,
            );
        },

        render: function () {
            this.$el.style.height = this.calculateHeight() + 'px';
        },
    }
}