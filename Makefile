populate-fake-data:
	docker compose run --rm backend python manage.py populate_fake_data

run-backend-tests:
	docker compose run --rm backend python manage.py test

backend-lint:
	ruff check backend/src-back
	mypy --config-file backend/src-back/pyproject.toml ./backend/src-back

backend-format:
	cd backend && ruff format .