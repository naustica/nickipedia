FROM python:3.7.2-stretch

RUN pip install -U pip

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

EXPOSE 8080

CMD ["gunicorn", "-b", "0.0.0.0:8080", "run"]
