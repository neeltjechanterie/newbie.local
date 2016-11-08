#!/usr/bin/env bash

`dirname $0`/init.sh
source `dirname $0`/settings
MYSQL_PWD=${DB_PASS} mysql --user=${DB_USER} ${DB_NAME} < ${DB_DUMP}/latest.sql
echo "Backup for database \`${DB_NAME}\` restored!"
