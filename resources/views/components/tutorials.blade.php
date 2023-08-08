@if($enabled)
    <div>
        @foreach($tutorials as $tutorial)
            <livewire:filament-tutorials::tutorial-container
                    :tutorial="$tutorial"
            />
        @endforeach
    </div>
@endif
