FROM python:latest

WORKDIR /app

RUN pip install --upgrade pip 
RUN pip install psycopg2 sqlalchemy pandas

COPY ./default-cards-20241225100653.json ./data.json
# COPY ./test-cards-data.json ./data.json
ENV JSON_FILE=data.json

COPY ./seedScript.py ./seedScript.py

CMD [ "python", "./seedScript.py" ]
