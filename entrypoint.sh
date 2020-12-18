#!/bin/sh
 DATABASE_FILE="fivbo.db"
# export DATABASE_URL="sqlite:///"+$DATABASE_FILE 


 if [ ! -f "$DATABASE_FILE" ]; then
     flask db init
     flask db migrate -m "first database migrate"
     flask db upgrade
 fi
# flask db init
# flask db migrate -m "first database migrate"
# flask db upgrade

gunicorn -b 0.0.0.0:8000 app:app

