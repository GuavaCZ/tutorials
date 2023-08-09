// Import any external JavaScript libraries from NPM here.
// import Mousetrap from 'mousetrap';

export default function stepComponent({
    key,
                                      }) {
    return {
        targetElement: null,
        // You can define any other Alpine.js properties here.

        init: function () {
            this.targetElement = this.findElement(key);
        },
        // You can define any other Alpine.js functions here.

        initializeDialog: function (dialog) {
            const rect = this.elementRect();
            const header = dialog.querySelector('[data-dialog-header]');
            const stroke = dialog.querySelector('[data-dialog-stroke]');

            const width = rect[1].x - rect[0].x;
            const height = rect[2].y - rect[0].y;
            var y1 = header.getBoundingClientRect().top;
            var y2 = stroke.getBoundingClientRect().top;

            var distance = y2 - y1;

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

        findElement: function(name) {
          return document.getElementById(`data.${name}`);
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
            path += 'M ' + rect[0].x + ' ' + (rect[0].y +  options.radius) + ' ';
            path += 'C ' + rect[0].x + ' ' + rect[0].y + ' ' + rect[0].x + ' ' + rect[0].y + ' ' + (rect[0].x +  options.radius) + ' ' + rect[0].y + ' ';
            path += 'L ' + (rect[1].x -  options.radius) + ' ' + rect[1].y + ' ';
            path += 'C ' + rect[1].x + ' ' + rect[1].y + ' ' + rect[1].x + ' ' + rect[1].y + ' ' + rect[1].x + ' ' + (rect[1].y +  options.radius) + ' ';
            path += 'L ' + rect[2].x + ' ' + (rect[2].y -  options.radius) + ' ';
            path += 'C ' + rect[2].x + ' ' + rect[2].y + ' ' + rect[2].x + ' ' + rect[2].y + ' ' + (rect[2].x -  options.radius) + ' ' + rect[2].y + ' ';
            path += 'L ' + (rect[3].x +  options.radius) + ' ' + rect[3].y + ' ';
            path += 'C ' + rect[3].x + ' ' + rect[3].y + ' ' + rect[3].x + ' ' + rect[3].y + ' ' + rect[3].x + ' ' + (rect[3].y -  options.radius) + ' ';
            // path += 'Z';
            path += 'L ' + rect[0].x + ' ' + (rect[0].y +  options.radius) + ' ';

            return path.trim();
        },

        elementRect: function (element = null, options = {}) {
            element = element || this.targetElement;
            options = {
                radius: 24,
                margin: 10,
                offset: {x: 0, y: 0},
                relative: false,
                ...options
            }
            const left = options.relative ? 0 : element.offsetLeft;
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