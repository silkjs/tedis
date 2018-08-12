#!/usr/bin/env sh

set -e

npx vuepress build doc

cd doc/.vuepress/dist

echo 'tedis.myour.tech' > CNAME

ls -all

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/myour-cc/tedis.git master:gh-pages
