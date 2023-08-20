### Tutorials

Tutorials is a complete tool for creating tutorials, walkthrough and onboarding experiences for your users. It is a simple and easy to use library, which can be integrated into your project with just a few lines of code.

#### Prerequisites
- Laravel 10+
- PHP 8.0+
- Filament 3
- Livewire 3

Filament is currently a prerequisite, but it can be also used outside of the Filament Panels anywhere in your frontend in any livewire component.

#### Known Issues
There's some DOM diffing issues when using in a filament Dashboard Page. For some reason, the first widget is removed during an update of the page when walking through the tutorial.

This is most likely a Livewire 3 issue (https://github.com/filamentphp/filament/issues/7567)

A quick fix is to publish the widgets.blade.php file and add `wire:ignore` to the container grid.
