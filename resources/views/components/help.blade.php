@php
    use Filament\Support\Enums\ActionSize;

    $size = 'lg';
@endphp
<x-filament::dropdown teleport placement="bottom-end" class="fi-dropdown fi-user-menu">
    <x-slot name="trigger" class="">
        <x-filament::icon-button
                {{--                :badge="$unreadNotificationsCount"--}}
                color="white"
                icon="heroicon-m-question-mark-circle"
                {{--                icon-alias="panels::topbar.open-database-notifications-button"--}}
                icon-size="lg"
                :label="__('filament-panels::layout.actions.open_database_notifications.label')"
        />

        {{--        <div--}}
        {{--                class="flex items-center justify-center w-9 h-9 font-semibold text-sm text-white rounded-full language-switch-trigger bg-primary-500 dark:text-primary-500 dark:bg-gray-900 ring-1 ring-inset ring-gray-950/10 dark:ring-white/20">--}}
        {{--            {{ \Illuminate\Support\Str::of(app()->getLocale())->length() > 2--}}
        {{--                ? \Illuminate\Support\Str::of(app()->getLocale())->substr(0, 2)->upper()--}}
        {{--                : \Illuminate\Support\Str::of(app()->getLocale())->upper() }}--}}
        {{--        </div>--}}
    </x-slot>

    <x-filament::dropdown.header
            {{--            :color="$profileItem?->getColor()"--}}
            color="white"
            icon="heroicon-m-question-mark-circle"
            {{--            icon-alias="panels::user-menu.profile-item"--}}
    >
        Tutorials
        {{--        {{ $profileItem?->getLabel() ?? filament()->getUserName($user) }}--}}
    </x-filament::dropdown.header>

    <x-filament::dropdown.list>
        @foreach($livewire->getCachedTutorials() as $tutorial)
            <x-filament::dropdown.list.item
                    {{--                :color="$profileItem?->getColor()"--}}
                    {{--                :icon="$profileItem?->getIcon() ?? 'heroicon-m-user-circle'"--}}
                    {{--                :href="$profileItemUrl ?? filament()->getProfileUrl()"--}}
                    {{--                icon-alias="panels::user-menu.profile-item"--}}
                    {{--                            x-on:click.prevent="$wire.mountTutorial('{{$tutorial->getName()}}')"--}}
                    x-on:click.prevent="close();$dispatch('mountTutorial', { name: '{{ $tutorial->getName() }}' })"
                    {{--                    wire:click.prevent="mountTutorial('{{$tutorial->getName()}}')"--}}
                    tag="button"
            >
                {{ \Illuminate\Support\Str::headline($tutorial->getName()) }}
            </x-filament::dropdown.list.item>
        @endforeach
    </x-filament::dropdown.list>
</x-filament::dropdown>