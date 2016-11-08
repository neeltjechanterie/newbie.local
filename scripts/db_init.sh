#!/usr/bin/env bash

source `dirname $0`/settings
MYSQL_PWD=secret     mysql --user=homestead  --execute="GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}' IDENTIFIED BY '${DB_PASS}'"
MYSQL_PWD=${DB_PASS} mysql --user=${DB_USER} --execute="CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8 COLLATE utf8_general_ci"
echo "Database \`${DB_NAME}\` initalized!"