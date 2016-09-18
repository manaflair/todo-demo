#!/usr/bin/env bash

# Clear all tags
git tag | xargs git tag -d

# Helper
function set-tag() {
    git tag -a "$1" -m "$1" "$(git log --grep="$2" --format=%H)"
}

set-tag chapter-1  'First commit'
set-tag chapter-2  'Setup data fixtures'
set-tag chapter-3  'Expose a JSON-API server on /api'
set-tag chapter-4  'Use data from the API instead of static placeholders'
set-tag chapter-4b 'Extract data from a redux store instead of a component state'
set-tag chapter-5  'Defer component instanciations until after the page loads'
set-tag chapter-6  'Add support for backspace & enter keys'
