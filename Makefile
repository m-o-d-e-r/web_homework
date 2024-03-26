

api_run:
	python -m api

db_init:
	flask --app api.__main__ db init

db_migrate:
	./scripts/make_migration.sh

db_upgrade:
	flask --app api.__main__ db upgrade

db_downgrade:
	flask --app api.__main__ db downgrade


site_build:
	docker build -t web_homework_site -f Dockerfile.httpd.yaml .

site_run:
	docker run --rm --name web_homework_site -p 8080:80 web_homework_site

site_stop:
	docker stop web_homework_site
