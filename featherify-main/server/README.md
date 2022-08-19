# Quickstart

The following commands will help you quickstart the server on `http://localhost:8000/api/manipulate`

```shell
# MAKE SURE YOU ARE RUNNING THESE COMMANDS IN THE server FOLDER 

# create a virtual environment
python3 -m venv ./venv
# activate the virtual environment
source venv/bin/activate
# install the dev requirements
pip install -r requirements.dev.txt
# start the django server
python manage.py runserver
```

## For Deploying into AWS Lambda

[Used zappa for deploying django app into serverless AWS Lambda](https://www.agiliq.com/blog/2019/01/complete-serverless-django/)
