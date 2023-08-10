@if($enabled)
    <div>
        @foreach($tutorials as $tutorial)
            <livewire:tutorials::tutorial-container
                    :tutorial="$tutorial"
            />
        @endforeach
    </div>
@endif
