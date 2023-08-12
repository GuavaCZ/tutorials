// Import any external JavaScript libraries from NPM here.
// import Mousetrap from 'mousetrap';

export default function tutorialComponent({
    index,
                                          }) {
    return {
        index: index,

        init: function () {
            console.log('Init tutorial');
        }
        // You can define any other Alpine.js functions here.
    }
}