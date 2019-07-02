import os

user = 'root'
password = 1234
host = 'postgres'
database = 'nickipediaDB'
port = 5432

DATABASE_CONNECTION_URI = f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}'
