npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/xhette/vue-start-deploy.git master:gh-pages
cd -