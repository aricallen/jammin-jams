PS4='$LINENO: '
set -x
mkdir tmp
# setup static assets
cp -R src/assets dist/
cp -R src/styles dist/
# build dir for deploying
cp -R dist tmp/
cp Procfile tmp/
cp scripts/_package.json tmp/package.json
cd tmp
# git init
# git remote add dokku dokku@138.197.199.22:jammin-jams
# git add .
# git commit -am "releasing..."
# git push dokku master -f
cd ..
# rm -rf tmp/
set +x