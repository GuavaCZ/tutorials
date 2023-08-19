@php
        @endphp
<div
        x-ignore
        ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('step', 'guava/tutorials') }}"

        x-data="stepComponent({
            key: '{{$getKey()}}',
            selector: '{{$getSelector()}}',
            requiresAction: @js($isActionRequired()),
        })"

        class="absolute top-0 left-0"

        @style([
            \Filament\Support\get_color_css_variables($getColor(), shades: [400, 500, 600]) => $getColor() !== 'gray',
        ])

>
    <div
            x-bind:init="initialize()"></div>
    <div
            data-dialog
            @class([
                'absolute top-0 left-0 flex flex-col gap-2',
                match ($getColor()) {
                    'gray' => 'text-gray-950 dark:text-white',
                    default => 'text-custom-600 dark:text-custom-400',
                },
            ])

            {{--            x-bind:init="initializeDialog($el)"--}}
    >
        <div data-dialog-header
             class="absolute flex flex-row justify-between whitespace-nowrap top-0 left-0 w-full -translate-y-full">
            @if(! $isLabelHidden() && $label = $getLabel())
                <x-tutorials::step.label
                        :label="$label"
                />
            @endif

            @if(! $isHintHidden() && $hint = $getHint())
                <x-tutorials::step.hint
                        :hint="$hint"
                />
            @endif
        </div>
        <svg data-dialog-stroke class="w-full h-auto fill-none overflow-visible">
            <path
                    data-dialog-path
                    {{--                    x-on:DOMContentLoaded.document="console.log('DOM LOADED');$el.setAttribute('d', elementPath(null, {relative: true, positive: true}))"--}}
                    @class([
                        'stroke-2',
                        match ($getColor()) {
                            'gray' => 'stroke-gray-950 dark:text-white',
                            default => 'stroke-custom-600 dark:stroke-custom-400',
                        },
                    ])
            />
        </svg>
        <div data-dialog-footer class="flex flex-row justify-between">
            @if(! $isDescriptionHidden() && $description = $getDescription())
                <x-tutorials::step.description
                        :description="$description"
                />
            @endif

            @if(! $isActionHidden() && $action = $getAction())
                {{--            <button type="button" wire:click="setActiveS
                tep('email')" class="pointer-events-auto">Test</button>--}}
                <span class="ml-auto">{{$action}}</span>
            @endif
        </div>
    </div>

    <svg width="0" height="0">
        <defs>
            <clipPath id="stepClipPath">
                {{--                <circle r="50" cx="50" cy="50"/>--}}
                <path
                        data-clip-path
{{--                        x-bind:d="clipPath()"--}}
                />
            </clipPath>

            <clipPath id="myClip">
                <path d="M 0 0 L 0 500 L 500 500 L 500 0 L 0 0 M 300 300 L 400 300 L 400 350 L 300 350 L 300 300"/>
                {{--                <circle r="50" cx="50" cy="50"/>--}}
                {{--                <path x-bind:d="getClipPath()"/>--}}
            </clipPath>
        </defs>
    </svg>
</div>