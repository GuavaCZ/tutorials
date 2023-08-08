<div class="w-screen h-screen"
x-show="$wire.$parent.currentStep == $wire.step.index"
>


    {{--    <div class="bg-black fixed top-0 left-0 z-50 w-screen h-screen [clip-path:polygon(285px_150px,_83px_33px,_83px_267px,285px_150px,258px_150px,_96px_244px,_96px_56px,258px_150px)]">--}}

    <svg width="0" height="0">
        <defs>
            <clipPath id="myClip">
                <path x-bind:d="getClipPath()"/>
            </clipPath>
        </defs>
    </svg>

    <div data-wrapper class="w-screen h-screen fixed top-0 left-0">
        <div data-dialog
             class="text-primary-400 font-medium relative flex flex-col justify-start overflow-visible w-full">
            <div data-dialogTop class="w-full pb-2 flex flex-row justify-between">

                <span>Current step: <span x-text="$wire.$parent.currentStep"></span></span>
                @if(! $step->isLabelHidden() && ($label = $step->getLabel()) !== null)
                    <span>{{ $label }}</span>
                @endif

                @if(! $step->isHintHidden() && ($hint = $step->getHint()) !== null)
                    <span>{{ $hint }}</span>
                @endif
            </div>
            <svg data-svg class="w-full h-auto fill-none overflow-visible">
                <path x-bind:d="getWindowPath(24, {x:0, y:0}, true, true)"
                      class="stroke-primary-400 dark:stroke-primary-500 stroke-2"
                />
            </svg>
            <div class="w-full pt-2 flex flex-row items-start justify-between gap-x-2">
                @if(! $step->isDescriptionHidden() && ($description = $step->getDescription()) !== null)
                    <span>{{ $description }}</span>
                @endif

                {{ $this->getContinueAction() }}
            </div>
        </div>
    </div>
    {{--        <svg data-svg fill="none" class="w-screen h-screen fixed top-0 left-0">--}}
    {{--            <path x-bind:d="getWindowPath(24)" class="stroke-primary-400 dark:stroke-primary-500 stroke-2"--}}
    {{--            />--}}
    {{--        </svg>--}}
</div>