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
            @class([
                'absolute top-0 left-0 flex flex-col gap-2',
                match ($getColor()) {
                    'gray' => 'text-gray-950 dark:text-white',
                    default => 'text-custom-600 dark:text-custom-400',
                },
            ])

            x-init="initializeDialog($el)"
    >
        <div data-dialog-header class="flex flex-row justify-between whitespace-nowrap">
            @if(! $isLabelHidden() && $label = $getLabel())
                <span>{{ $label }}</span>
            @endif

            @if(! $isHintHidden() && $hint = $getHint())
                <span>{{ $hint }}</span>
            @endif
        </div>
        <svg data-dialog-stroke class="w-full h-auto fill-none overflow-visible">
            <path
                    x-bind:d="elementPath(null, {relative: true, positive: true})"
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
                <span>{{ $description }}</span>
            @endif

            @if(! $isHiddenAction() && $action = $getContinueAction())
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
                <path x-bind:d="clipPath()"/>
            </clipPath>

            <clipPath id="myClip">
                <path d="M 0 0 L 0 500 L 500 500 L 500 0 L 0 0 M 300 300 L 400 300 L 400 350 L 300 350 L 300 300"/>
                {{--                <circle r="50" cx="50" cy="50"/>--}}
                {{--                <path x-bind:d="getClipPath()"/>--}}
            </clipPath>
        </defs>
    </svg>
</div>