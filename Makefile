
# BACKEND

populate-fake-data:
	docker compose run --rm shell populate_fake_data
backend-tests:
	docker compose run --rm backend pytest -n auto
backend-code-quality:
	docker compose run --rm backend ruff format . --check
	docker compose run --rm backend ruff check .
	docker compose run --rm backend mypy .


# FRONTEND

frontend-tests:
	docker compose run --rm frontend bunx tsc
	docker compose run --rm frontend bun test
frontend-code-quality:
	docker compose run --rm frontend bun lint
	docker compose run --rm frontend bun format:check


# ALL
stop:
	docker compose stop

code-quality: backend-code-quality frontend-code-quality stop
tests: backend-tests frontend-tests stop
