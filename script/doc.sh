#!/usr/bin/env sh

set -e

vuepress build doc

cd doc/.vuepress/dist

echo 'tedis.silkjs.org' > CNAME

ls -all

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/SamSteele01/tedis.git master:gh-pages
