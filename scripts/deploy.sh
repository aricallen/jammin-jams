BUILD_DIR="build"
PS4='$LINENO: '
set -x
cd $BUILD_DIR
git init
git remote add dokku dokku@138.197.199.22:jmnjams
git add .
git commit -am "releasing..."
git push dokku master -f
set +x