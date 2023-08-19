// Import any external JavaScript libraries from NPM here.
// import Mousetrap from 'mousetrap';

export default function tutorialComponent({
    index,
                                          }) {
    return {
        index: index,
        scrollTimeout: null,

        init: function () {
            console.log('Init tutorial');
            document.body.style.overflow = 'hidden';

            // TODO:
            const documentHeight = Math.max(
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
            );

            console.log('documentos heightos', documentHeight);
            this.$el.style.height = documentHeight + 'px';

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
            this.$el.classList.add('hidden');
        },

        scrollEnd: function () {
            this.$el.classList.remove('hidden');
        }
        // You can define any other Alpine.js functions here.
    }
}