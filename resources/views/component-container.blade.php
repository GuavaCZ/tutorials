@if($isTriggered())
    <livewire:filament-tutorials::tutorial-container
            :steps="$getSteps()"
    />
@endif
{{--<div--}}
{{--        x-data--}}
{{--        x-cloak--}}
{{--        x-show="true"--}}
{{--        @class([--}}
{{--            'fixed top-0 left-0 w-screen h-screen z-30 pointer-events-none',--}}
{{--            'bg-black/80',--}}
{{--            'dark:bg-gray-800/80',--}}
{{--        ])--}}
{{-->--}}
{{--    <button type="button" wire:click="$setActiveStep('tutorial', 'name')" class="pointer-events-auto">Test</button>--}}
{{--    {{ $getActiveStep() }}--}}
{{--    @foreach ($getSteps(withHidden: true) as $step)--}}
{{--        @php--}}
{{--            /**--}}
{{--             * Instead of only rendering the hidden components, we should--}}
{{--             * render the `<div>` wrappers for all fields, regardless of--}}
{{--             * if they are hidden or not. This is to solve Livewire DOM--}}
{{--             * diffing issues.--}}
{{--             *--}}
{{--             * Additionally, any `<div>` elements that wrap hidden--}}
{{--             * components need to have `class="hidden"`, so that they--}}
{{--             * don't consume grid space.--}}
{{--             */--}}
{{--            $isHidden = $step->isHidden();--}}
{{--        @endphp--}}

{{--        @if (! $isHidden)--}}
{{--            {{ $step }}--}}
{{--        @endif--}}
{{--    @endforeach--}}
{{--</div>--}}