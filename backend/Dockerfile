FROM python:3.11-slim

WORKDIR /app

# Instalar Poetry
RUN pip install --no-cache-dir poetry

# Copiar ficheiros de dependência (do root do repo: build context precisa ser o root)
COPY pyproject.toml poetry.lock* ./

# Configurar poetry para não criar virtualenv dentro do container (instala no sistema)
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi --no-root

# Copiar o código do backend
COPY backend/ ./

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
