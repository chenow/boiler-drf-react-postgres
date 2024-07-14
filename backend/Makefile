update-versions:
	uv pip compile pyproject.toml --all-extras > requirements-dev.txt
	uv pip compile pyproject.toml > requirements.txt
	uv pip install -r requirements-dev.txt

install-dev:
	pip install uv
	uv venv
	uv pip install -r requirements-dev.txt
