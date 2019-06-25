#!/usr/bin/env sh

set -e

vuepress build doc

cd doc/.vuepress/dist

echo 'tedis.myour.tech' > CNAME

ls -all

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/silkjs/tedis.git master:gh-pages
