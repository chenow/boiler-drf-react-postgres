# Use an official Python runtime as a parent image
FROM python:3.12.1-alpine3.19

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
RUN pip install --upgrade pip
COPY requirements-dev.txt requirements.txt ./
RUN pip install --no-cache-dir -r requirements-dev.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000]
