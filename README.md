# internhub

This repository aims at creating a template project for a web application using React / Typescript, Django / DRF, PostgreSQL. It is intended to be developper friendly, with a set of tools to ease the development process such as linters, formatters, and a dockerized dev environment, Django and React structure laid out etc.

## Getting Started

To get started, first setup environment variables. Copy the following files, and fill in the values:

- `.env.database.example` to `.env.database`
- `backend/.env.example` to `backend/.env`
- `frontend/.env.example` to `frontend/.env`

Then, run the following command to start the development server:

```bash
docker-compose up --build
```

Then, download dependencies for autocompleting and linting:

```bash
cd frontend && npm install
```

```bash
cd backend && python -m venv venv
source venv/bin/activate
pip install -r requirements-dev.txt
```

## VScode extensions

The project relies on multiple vscode extensions, including:

- Pylint
- Mypy
- Prettier

## Makefile

Some useful commands are available through the Makefile:

- make populate-fake-data: entrypoint to populate the database with fake data
- make run-backend-tests: run backend tests
