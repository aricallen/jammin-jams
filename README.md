# Jammin Jams

## Requirements

- [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
- [node](https://nodejs.org/en/download/)
- [mysql](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation-pkg.html)

## Installation

```sh
# clone the repo
git clone git@github.com:aricallen/jmnjams.git && cd jmnjams
# start mysql
mysqld
# connect to mysql
mysql -u root
# create db
create database jmnjams;
# exit connection
exit
# import db schema from project config/
mysql -u root jmnjams < ./config/db.sql
# install node dependencies
yarn install
# cp env file to project root
cp ./config/_.env ./.env
```

## Development

```sh
# start mysql
mysqld
# start local backend server -- http://localhost:4243
yarn serve
# start local frontend development server -- http://localhost:4242
yarn dev
```

View that app in browser at http://localhost:4242

## Project Structure
