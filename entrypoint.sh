#!/bin/sh
# DATABASE_FILE=`pwd`"database/fivbo.db"
# export DATABASE_URL="sqlite:///"+$DATABASE_FILE 


# if [ ! -f "$DATABASE_FILE"]; then
#     flask db init
#     flask db migrate -m "first database migrate"
#     flask db upgrade
# fi
if [! -f 'fivbo.db' ]; then
    flask db init
    flask db migrate -m "first database migrate"
    flask db upgrade
fi

gunicorn -b 0.0.0.0:8000 app:app

