#!/bin/bash
# migrate database
python manage.py migrate

# start Django server with gunicorn
gunicorn expertPro.wsgi:application --bind 0.0.0.0:$PORT
