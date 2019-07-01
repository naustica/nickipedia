FROM python:3.7.2-stretch

RUN pip install -U pip
RUN pip install pipenv

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

CMD ["uwsgi", "app.ini"]
