populate-fake-data:
	docker compose run --rm backend python manage.py populate_fake_data

run-backend-tests:
	docker compose run --rm backend python manage.py test
