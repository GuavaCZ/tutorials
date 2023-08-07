// Import any external JavaScript libraries from NPM here.

export default function tutorialsComponent() {
    return {
        // You can define any other Alpine.js properties here.

        init: function () {
            console.log('Hello, world!');
            setTimeout(() => {
                this.$el.classList.remove('hidden');
                this.showAction();
            }, 2000);
            // Initialise the Alpine component here, if you need to.
        },

        showAction: function () {
            let element = document.querySelector('div.fi-fo-field-wrp');
            let action = document.querySelector('[data-action]');
            let svg = document.querySelector('[data-svg]');
            let wrapper = document.querySelector('[data-wrapper]');
            let dialog = document.querySelector('[data-dialog]');

            const rect = this.getRect(element, 10);

            action.classList.remove('hidden');

            action.style.position = 'fixed';
            action.style.left = (rect[2].x - action.clientWidth) + 'px';
            action.style.top = (rect[3].y + 10) + 'px';
            action.style.zIndex = 1000;

            // svg.style.position = 'fixed';
            // svg.style.left = rect[0].x + 'px';
            // svg.style.top = rect[0].y + 'px';
            // svg.style.zIndex = 1000;

            // wrapper.style.position = 'fixed';
            // wrapper.style.left = rect[0].x + 'px';
            // wrapper.style.top = (rect[0].y - 50) + 'px';
            // wrapper.style.width = (rect[1].x - rect[0].x) + 'px';
            // wrapper.style.height = (rect[2].y - rect[0].y + 50 + 50) + 'px';
            wrapper.style.zIndex = 1200;

            dialog.style.position = 'absolute';
            dialog.style.left = rect[0].x + 'px';
            dialog.style.top = (rect[0].y) + 'px';
            dialog.style.width = (rect[1].x - rect[0].x) + 'px';
            dialog.style.height = (rect[2].y - rect[0].y) + 'px';
            svg.style.height = (rect[2].y - rect[0].y) + 'px';

        },

        getWindowPath: function(radius = 24, relative = false, positive = false) {
            let element = document.querySelector('div.fi-fo-field-wrp');

            const rect = this.getRect(element, 10, {x:0,y:0}, relative, positive);

            let path = '';
            path += 'M ' + rect[0].x + ' ' + (rect[0].y +  radius) + ' ';
            path += 'C ' + rect[0].x + ' ' + rect[0].y + ' ' + rect[0].x + ' ' + rect[0].y + ' ' + (rect[0].x +  radius) + ' ' + rect[0].y + ' ';
            path += 'L ' + (rect[1].x -  radius) + ' ' + rect[1].y + ' ';
            path += 'C ' + rect[1].x + ' ' + rect[1].y + ' ' + rect[1].x + ' ' + rect[1].y + ' ' + rect[1].x + ' ' + (rect[1].y +  radius) + ' ';
            path += 'L ' + rect[2].x + ' ' + (rect[2].y -  radius) + ' ';
            path += 'C ' + rect[2].x + ' ' + rect[2].y + ' ' + rect[2].x + ' ' + rect[2].y + ' ' + (rect[2].x -  radius) + ' ' + rect[2].y + ' ';
            path += 'L ' + (rect[3].x +  radius) + ' ' + rect[3].y + ' ';
            path += 'C ' + rect[3].x + ' ' + rect[3].y + ' ' + rect[3].x + ' ' + rect[3].y + ' ' + rect[3].x + ' ' + (rect[3].y -  radius) + ' ';
            // path += 'Z';
            path += 'L ' + rect[0].x + ' ' + (rect[0].y +  radius) + ' ';

            return path;
        },

        getClipPath: function(radius = 24) {
          //M 0 8 C 0 0 0 0 8 0 L 38 0 C 46 0 46 0 46 8 C 46 16 46 16 38 16 L 8 16 C 0 16 0 16 0 8

            // let element = document.querySelector('input.fi-input');

            let path = 'M 0 0 ';
            path += 'L 0 ' + window.innerHeight + ' ';
            path += 'L ' + window.innerWidth + ' ' + window.innerHeight + ' ';
            path += 'L ' + window.innerWidth + ' 0 ';
            path += 'L 0 0 ';

            path += this.getWindowPath(radius);

            return path;
        },

        getClipPathOld: function (element, margin = 10) {
            let path = 'polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,';

            element = document.querySelector('input.fi-input');
            // element = document.querySelector('div.fi-fo-field-wrp');

            const rect = this.getRect(element);
            const actionRect = this.getRect(
                element,
                10,
                {
                    x: 0,
                    y: element.clientHeight + 10
                }
            );

            path += rect[0].x + 'px ' + rect[0].y + 'px, ';
            path += rect[3].x + 'px ' + rect[3].y + 'px, ';
            path += rect[2].x + 'px ' + rect[2].y + 'px, ';
            path += rect[1].x + 'px ' + rect[1].y + 'px, ';
            path += rect[0].x + 'px ' + rect[0].y + 'px';
            path += ')';

            console.log(element.offsetLeft, element.offsetTop, element.clientWidth, element.clientHeight);

            console.log('[clip-path:' + path);

            // return '[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%,0%_0%,200px_200px,200px_100px,100px_100px,100px_200px,200px_200px)]';
            return 'clip-path: ' + path;
        },

        getRect: function (element, margin = 10, offset = {x: 0, y: 0}, relative = false, positive = false) {
            const left = relative ? 0 : element.offsetLeft;
            const top = relative ? 0 : element.offsetTop;

            let result = [
                {
                    x: left - margin + offset.x,
                    y: top - margin + offset.y
                },
                {
                    x:left + element.clientWidth + margin + offset.x,
                    y: top - margin + offset.y
                },
                {
                    x: left + element.clientWidth + margin + offset.x,
                    y: top + element.clientHeight + margin + offset.y
                },
                {
                    x: left - margin + offset.x,
                    y: top + element.clientHeight + margin + offset.y
                }
            ];

            if (positive) {
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
        // You can define any other Alpine.js functions here.
    }
}