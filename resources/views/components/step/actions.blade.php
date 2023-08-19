@props([
    'actions' => []
])
@if(!empty($actions))
    <div class="ml-auto">
        @foreach($actions as $action)
            {{ $action }}
        @endforeach
    </div>
@endif
