FROM python:3.7

RUN pip install -U pip
RUN pip install pipenv

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

EXPOSE 5000

COPY . /app
WORKDIR /app

CMD ["uwsgi", "app.ini"]
