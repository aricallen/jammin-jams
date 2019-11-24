BUILD_DIR="build"
PS4='$LINENO: '
set -x
rm -rf $BUILD_DIR
mkdir $BUILD_DIR
# setup static assets
cp -R src/assets dist/
cp -R src/styles dist/
# build dir for deploying
cp -R server $BUILD_DIR/
cp -R dist $BUILD_DIR/
cp Procfile $BUILD_DIR/
cp scripts/_package.json $BUILD_DIR/package.json
set +x