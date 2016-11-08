#!/usr/bin/env bash

source `dirname $0`/settings
MYSQL_PWD=${DB_PASS} mysql --user=${DB_USER} --execute="DROP DATABASE IF EXISTS ${DB_NAME}"
echo "Database \`${DB_NAME}\` dropped!"
