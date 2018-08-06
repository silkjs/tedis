#!/usr/bin/env sh

set -e

rm -rf build

npm run pkg:build

npm run pkg:test

npm publish --access public

cd -
