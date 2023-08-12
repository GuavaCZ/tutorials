<x-filament-panels::page class="fi-dashboard-page">
    <x-filament-widgets::widgets
            :columns="$this->getColumns()"
            :data="$this->getWidgetData()"
            :widgets="$this->getVisibleWidgets()"
    />

    @foreach($this->getCachedTutorials() as $tutorial)
        {{ $tutorial }}
    @endforeach
</x-filament-panels::page>
