populate-fake-data:
	docker compose run --rm backend python manage.py populate_fake_data

backend-tests:
	docker compose run --rm backend python manage.py test

backend-code-quality:
	cd backend && ruff check ./src
	cd backend/src && mypy .

frontend-code-quality:
	cd frontend && npm run format && npm run lint

code-quality: backend-code-quality frontend-code-quality

tests: backend-tests