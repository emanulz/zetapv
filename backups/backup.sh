#!/bin/sh
cd /home/zetapv/backups/db
mkdir "$(date +"%d-%m-%Y")"
cd "$(date +"%d-%m-%Y")"
cdbdump -u emanuelziga -p emma101421 -d general | gzip > general.json.gz
cdbdump -u emanuelziga -p emma101421 -d sales | gzip > sales.json.gz
cdbdump -u emanuelziga -p emma101421 -d users | gzip > users.json.gz
