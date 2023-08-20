// Import any external JavaScript libraries from NPM here.
// import Mousetrap from 'mousetrap';

export default function tutorialComponent({
                                              index,
                                          }) {
    return {
        index: index,
        scrollTimeout: null,
        documentHeight: 0,

        initialize: function () {
            window.addEventListener('tutorial::render', () => {
                this.documentHeight = document.documentElement.getBoundingClientRect().height;
                this.$root.style.height = this.documentHeight + 'px';
            });
            this.tutorial = this;
            console.log('Init tutorial');
            // document.body.style.overflow = 'hidden';

            // TODO:
            this.documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight,
                document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

            // setTimeout(() => {
            this.$nextTick(() => {
                this.$dispatch('tutorial::render');
                // this.documentHeight = document.documentElement.getBoundingClientRect().height;
                //
                // console.log('delay height', this.documentHeight);
                //
                // this.$root.style.height = this.documentHeight + 'px';
            });

            console.log('height', this.documentHeight);
            // this.$root.style.height = this.documentHeight + 'px';

            // TODO: call only height modifeir
            // window.addEventListener('scroll', () => {
            //     if (this.scrollTimeout) {
            //         clearTimeout(this.scrollTimeout);
            //     } else {
            //         this.scrollStart();
            //     }
            //
            //     this.scrollTimeout = setTimeout(() => {
            //         this.scrollEnd();
            //         this.scrollTimeout = null;
            //     }, 100);
            // });
        },

        scrollStart: function () {
            this.$root.classList.add('hidden');
        },

        scrollEnd: function () {
            this.$root.classList.remove('hidden');
        }
        // You can define any other Alpine.js functions here.
    }
}