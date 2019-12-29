# Jammin Jams

## Requirements

- [homebrew](https://brew.sh/)

```sh
# node
brew install node
# yarn
brew install yarn
# mysql
brew install mysql
```

## Installation

```sh
# clone the repo
git clone git@github.com:aricallen/jmnjams.git && cd jmnjams
# start mysql
mysqld
# setup user with password => 'password'
mysqladmin -u root password password
# create db
mysqladmin -u root -p create jmnjams;
# import base sql file
mysql -u root -p jmnjams < ./config/db.sql
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
If everything was setup correctly you'll see the following in the browser's console

```sh
api server status -> OK!
db status -> OK!
```

## Project Structure

```sh
├── config # setup files
├── scripts # shell scripts to help with deploying to server
├── server # backend api routes/controllers
│   ├── controllers
│   ├── middleware
│   ├── routers
│   ├── schemas
│   └── utils
└── src # frontend app
    ├── assets # static assets
    │   ├── favicons
    │   ├── fonts
    │   └── logos
    ├── components
    │   ├── common # shared components
    │   └── pages # components related to specific pages
    │       └── store
    ├── constants
    ├── redux
    │   ├── schemas
    │   ├── session
    │   └── utils
    ├── services
    ├── styles
    └── utils
```
