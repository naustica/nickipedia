FROM python:3.7

RUN pip install -U pip
RUN pip install pipenv

COPY ./nickipedia/requirements.txt requirements.txt

RUN pip install -r requirements.txt

EXPOSE 5000

COPY ./nickipedia /app
WORKDIR /app

CMD ["python3", "run.py"]
