
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
