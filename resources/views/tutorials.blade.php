<div>
    <div
            x-ignore
            ax-load
            ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('tutorials', 'guava/filament-tutorials') }}"
            x-data="tutorialsComponent()"
            class="hidden"
    >
        {{--    <div class="bg-black fixed top-0 left-0 z-50 w-screen h-screen [clip-path:polygon(285px_150px,_83px_33px,_83px_267px,285px_150px,258px_150px,_96px_244px,_96px_56px,258px_150px)]">--}}
        <div data-target
                @class([
                    'bg-black/80 fixed top-0 left-0 z-50 w-screen h-screen [clip-path:url(#myClip)]',
                    'dark:bg-white/40'
                ])
        >
            <div class="hidden" data-action>
            </div>
        </div>

        <svg width="0" height="0">
            <defs>
                <clipPath id="myClip">
                    <path x-bind:d="getClipPath()"/>
                </clipPath>
            </defs>
        </svg>

        <div data-wrapper class="w-screen h-screen fixed top-0 left-0 pointer-events-none">
            <div data-dialog
                 class="[clip-path:url(#myClip2)] px-[10px] bg-black dark:bg-white dark:rounded-md text-primary-400 font-medium relative flex flex-col justify-start overflow-visible w-full pointer-events-auto">
                <div x-ref="dialogTop" class="w-full pb-2 flex flex-row justify-between">
                    <span>Label here</span>
                    <span>1 / 4</span>
                </div>
                <svg data-svg class="w-full h-auto fill-none overflow-visible">
                    <defs>
                        <clipPath id="myClip2">
                            <path x-bind:d="getClipPath(24, {x:20, y: 42},true, true)"
                            />
                        </clipPath>
                    </defs>
                    <path x-bind:d="getWindowPath(24, {x:0, y:0}, true, true)"
                          class="stroke-primary-400 dark:stroke-primary-500 stroke-2"
                    />
                </svg>
                <div class="w-full pt-2 flex flex-row items-start justify-between gap-x-2">
                    <span>irure do duis irure magna cupidatat dolor et irure do duis irure magna cupidatat dolor et irure do duis irure magna cupidatat dolor et</span>

                    {{ $this->getContinueAction() }}
                </div>
            </div>
        </div>
        {{--        <svg data-svg fill="none" class="w-screen h-screen fixed top-0 left-0">--}}
        {{--            <path x-bind:d="getWindowPath(24)" class="stroke-primary-400 dark:stroke-primary-500 stroke-2"--}}
        {{--            />--}}
        {{--        </svg>--}}
    </div>
</div>