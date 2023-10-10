export default function stepComponent({
                                          key,
                                          selector,
                                          shouldInterceptClick,
                                          interceptClickAction,
                                      }) {
    return {
        target: null,

        sleep: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        init: async function () {
            this.target = this.findElement(key);

            if (!this.target) {
                console.error('Tutorial step was not found:', key);
                return;
            }

            // window.blur();
            // document.documentElement.blur();
            document.documentElement.querySelectorAll('input')
                .forEach((element) => element.blur());
            if (this.target) {
                this.target.focus();
            }

            this.configure();

            const dialog = this.$el.querySelector('[data-dialog]');
            const clipPath = this.$el.querySelector('[data-clip-path]');

            if (shouldInterceptClick) {
                this.target.addEventListener('click', (event) => {
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
                clipPath.setAttribute('d', this.clipPath());
                this.$dispatch('tutorial::render');
            });

            clipPath.setAttribute('d', this.clipPath());
        },

        timeouts: [],

        configure: function () {
            document.addEventListener('keydown', function (event) {
                // Get the key code of the key pressed
                var key = event.key;

                // Get the state of the modifier keys
                // var isCtrlKey = event.ctrlKey || event.metaKey;
                // var isAltKey = event.altKey;
                var isShiftKey = event.shiftKey;
                var isCtrlKey = false;
                var isAltKey = false;

                // Check if any combination of modifier keys and normal keys were pressed
                // if (isCtrlKey || isAltKey || isShiftKey || key === 'Tab') {
                // if (key === 'Tab' || isShiftKey && key === 'Tab') {
                if (key === 'Tab') {
                    event.preventDefault(); // Prevent the default event behavior
                }
            });


            if (this.target instanceof HTMLSelectElement) {
                if (this.target.hasAttribute('data-choice')) {
                    this.target = this.target.parentElement.parentElement;
                    const dropdown = this.target.querySelector('.choices__list.choices__list--dropdown');
                    dropdown.style.zIndex = 100;
                }
            }

            if (this.target.tagName === 'TRIX-EDITOR') {
                this.timeouts['trix'] = this.target.clientHeight;
                this.target = this.target.parentElement;

                const observer = new MutationObserver((mutationsList, observer) => {

                    mutationsList.forEach((mutation) => {

                        if (this.timeouts['trix']) {
                            clearTimeout(this.timeouts['trix']);
                        }

                        this.timeouts['trix'] = setTimeout(() => {
                            this.timeouts['trix'] = null;
                            this.init();
                        }, 500);
                    });
                });

                const config = {
                    attributes: true,
                    attributeFilter: ['height'],
                    childList: true,
                    subtree: true,
                };

                observer.observe(this.target, config);

            }

            if (this.target instanceof HTMLTextAreaElement || this.t) {
                // Get the initial size of the textarea
                let initialWidth = this.target.offsetWidth;
                let initialHeight = this.target.offsetHeight;

                // Create a MutationObserver to monitor size changes
                const observer = new MutationObserver(() => {
                    if (this.target.offsetWidth !== initialWidth || this.target.offsetHeight !== initialHeight) {
                        initialWidth = this.target.offsetWidth;
                        initialHeight = this.target.offsetHeight;

                        if (this.timeouts['textarea']) {
                            clearTimeout(this.timeouts['textarea']);
                        }

                        this.timeouts['textarea'] = setTimeout(() => {
                            this.timeouts['textarea'] = null;
                            this.init();
                        }, 100);
                    }
                });

                // Start observing changes in the textarea element
                observer.observe(this.target, {attributes: true, attributeFilter: ['style']});
            }
        },
        // You can define any other Alpine.js functions here.

        initializeDialog: function (dialog = null) {
            if (!dialog) {
                dialog = this.$el.querySelector('[data-dialog]');
            }
            const dialogPath = dialog.querySelector('[data-dialog-path]');

            const rect = this.elementRect();
            // const header = dialog.querySelector('[data-dialog-header]');
            const stroke = dialog.querySelector('[data-dialog-stroke]');

            window.scrollTo({
                top: rect[0].y - (window.innerHeight / 3),
                left: rect[0].x,
                behavior: 'smooth'
            });

            const width = rect[1].x - rect[0].x;
            const height = rect[2].y - rect[0].y;

            const x = rect[0].x;
            const y = rect[0].y;
            dialog.style.width = `${width}px`;
            dialog.style.transform = `translate(${x}px, ${y}px)`;
            stroke.style.height = `${height}px`;

            dialogPath.setAttribute('d', this.elementPath(null, {relative: true, positive: true}))
        },

        clipPath: function (element = null, options = {}) {
            element = element || this.target;
            options = {
                radius: 24,
                margin: 10,
                offset: {x: 0, y: 0},
                relative: false,
                ...options
            }
            return `${this.windowPath()} ${this.elementPath(element, options)}`.trim();
        },

        windowPath: function () {
            const documentHeight = Math.max(
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
            );

            // TODO: add option to select clockwise /counter clockwise
            //M 0 8 C 0 0 0 0 8 0 L 38 0 C 46 0 46 0 46 8 C 46 16 46 16 38 16 L 8 16 C 0 16 0 16 0 8
            let path = 'M 0 0 ';
            path += 'L 0 ' + documentHeight + ' ';
            path += 'L ' + window.innerWidth + ' ' + documentHeight + ' ';
            path += 'L ' + window.innerWidth + ' 0 ';
            path += 'L 0 0 ';

            return path.trim();
        },

        findElement: function (name) {
            return document.querySelector(selector.replace(/\./g, '\\$&'))
                ?? document.querySelector(selector);
        },

        elementPath: function (element = null, options = {}) {
            element = element || this.target;
            options = {
                radius: 24,
                margin: 10,
                offset: {x: 0, y: 0},
                ...options
            }
            const rect = this.elementRect(element, {
                relative: false,
                ...options,
            });

            let path = '';
            path += 'M ' + rect[0].x + ' ' + (rect[0].y + options.radius) + ' ';
            path += 'C ' + rect[0].x + ' ' + rect[0].y + ' ' + rect[0].x + ' ' + rect[0].y + ' ' + (rect[0].x + options.radius) + ' ' + rect[0].y + ' ';
            path += 'L ' + (rect[1].x - options.radius) + ' ' + rect[1].y + ' ';
            path += 'C ' + rect[1].x + ' ' + rect[1].y + ' ' + rect[1].x + ' ' + rect[1].y + ' ' + rect[1].x + ' ' + (rect[1].y + options.radius) + ' ';
            path += 'L ' + rect[2].x + ' ' + (rect[2].y - options.radius) + ' ';
            path += 'C ' + rect[2].x + ' ' + rect[2].y + ' ' + rect[2].x + ' ' + rect[2].y + ' ' + (rect[2].x - options.radius) + ' ' + rect[2].y + ' ';
            path += 'L ' + (rect[3].x + options.radius) + ' ' + rect[3].y + ' ';
            path += 'C ' + rect[3].x + ' ' + rect[3].y + ' ' + rect[3].x + ' ' + rect[3].y + ' ' + rect[3].x + ' ' + (rect[3].y - options.radius) + ' ';
            // path += 'Z';
            path += 'L ' + rect[0].x + ' ' + (rect[0].y + options.radius) + ' ';

            return path.trim();
        },

        elementRect: function (element = null, options = {}) {

            element = element || this.target;
            const bounds = element.getBoundingClientRect();
            options = {
                radius: 24,
                margin: 10,
                offset: {x: 0, y: 0},
                relative: false,
                ...options
            }
            const left = options.relative ? 0 : bounds.left;
            const top = options.relative ? 0 : element.offsetTop;

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
    }
}