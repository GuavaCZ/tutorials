// Import any external JavaScript libraries from NPM here.
// import Mousetrap from 'mousetrap';

export default function stepComponent({
                                          key,
                                          selector,
                                          requiresAction,
                                      }) {
    return {
        targetElement: null,
        // You can define any other Alpine.js properties here.

        initialize: function () {
            this.targetElement = this.findElement(key);
            setTimeout(() => {
                console.log('initialize');
                console.log('this.$el', this.$el);
                const dialog = this.$root.querySelector('[data-dialog]');
                console.log('dialogos', dialog);
                const clipPath = this.$root.querySelector('[data-clip-path]');
                console.log('clipPath', clipPath);
                console.log('requiresAction', requiresAction);

                if (requiresAction) {
                    this.targetElement.addEventListener('click', (event) => {
                        // event.stopPropagation();
                        event.preventDefault();
                        console.log('$wire', this.$wire.nextTutorialStep());

                        this.targetElement.blur();
                        const descendants = this.targetElement.querySelectorAll(":hover");

                        for (let i = 0; i < descendants.length; i++) {
                            const descendant = descendants[i];
                            descendant.blur();
                        }
                    });
                }

                this.initializeDialog();
                // clipPath.setAttribute('d', this.clipPath());

            }, 1);
        },
        // You can define any other Alpine.js functions here.

        initializeDialog: function (dialog = null) {
            if (!dialog) {
                dialog = this.$root.querySelector('[data-dialog]');
            }
            const dialogPath = dialog.querySelector('[data-dialog-path]');

            console.log('initializeDialog');
            const rect = this.elementRect();
            // const header = dialog.querySelector('[data-dialog-header]');
            const stroke = dialog.querySelector('[data-dialog-stroke]');

            const width = rect[1].x - rect[0].x;
            const height = rect[2].y - rect[0].y;
            console.log('IMPORTANT HERE');
            console.log('width', width);
            console.log('height', height);
            // var y1 = header.getBoundingClientRect().top;
            // var y2 = stroke.getBoundingClientRect().top;

            // var distance = y2 - y1;

            // console.log('distance', distance, y2, y1);
            console.log('rect', rect);

            const x = rect[0].x;
            const y = rect[0].y;
            console.log('x', x);
            console.log('y', y);
            console.log('dialog', dialog);
            // dialog = this.$root.querySelector('[data-dialog]');
            dialog.style.width = `${width}px`;
            dialog.style.transform = `translate(${x}px, ${y}px)`;
            // console.log('Delayed dialog', dialog);

            // document.querySelectorAll('[data-dialog]').forEach((dialog) => {
            //    dialog.remove();
            // });
            // console.log('self.$root', self.$root);
            // self.$root.appendChild(dialog);
            // console.log(document.getElementById('something'));
            // document.getElementById('something').appendChild(dialog);
            // document.body.appendChild(dialog);
            // }, 1000);
            stroke.style.height = `${height}px`;

            dialogPath.setAttribute('d', this.elementPath(null, {relative: true, positive: true}))
        },

        clipPath: function (element = null, options = {}) {
            element = element || this.targetElement;
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
            // TODO: add option to select clockwise /counter clockwise
            //M 0 8 C 0 0 0 0 8 0 L 38 0 C 46 0 46 0 46 8 C 46 16 46 16 38 16 L 8 16 C 0 16 0 16 0 8
            let path = 'M 0 0 ';
            path += 'L 0 ' + window.innerHeight + ' ';
            path += 'L ' + window.innerWidth + ' ' + window.innerHeight + ' ';
            path += 'L ' + window.innerWidth + ' 0 ';
            path += 'L 0 0 ';

            return path.trim();
        },

        findElement: function (name) {
            return document.querySelector(selector.replace(/\./g, '\\$&'))
                ?? document.querySelector(selector);
        },

        elementPath: function (element = null, options = {}) {
            element = element || this.targetElement;
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

            element = element || this.targetElement;
            const bounds = element.getBoundingClientRect();
            console.log('bounds', bounds.left, bounds.top);
            options = {
                radius: 24,
                margin: 10,
                offset: {x: 0, y: 0},
                relative: false,
                ...options
            }
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
    }
}