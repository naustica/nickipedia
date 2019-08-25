## nickipedia

### steps

1. docker-compose build && docker-compose up
2. docker-compose exec flask sh
3. python manage.py db init && python manage.py db migrate && python manage.py db upgrade
4. exit
5. docker-compose exec nginx sh
6. cd webapp/backend/data/database/files && chmod -R o+rw .*
7. exit
8. launch localhost:8080
