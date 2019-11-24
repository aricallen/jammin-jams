PS4='$LINENO: '
set -x
mkdir tmp
cp -R src/assets dist/
cp -R src/styles dist/
cp -R dist tmp/
cp Procfile tmp/
cp package.json tmp/
cp yarn.lock tmp/
cd tmp
git init
git remote add dokku dokku@138.197.199.22:jammin-jams
git add .
git commit -am "releasing..."
git push dokku master -f
cd ..
rm -rf tmp/
set +x