FROM python:3.7.1-stretch

WORKDIR /backend

RUN pip install --no-cache-dir -U pip

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["gunicorn", "-b", "0.0.0.0:8080", "run"]
