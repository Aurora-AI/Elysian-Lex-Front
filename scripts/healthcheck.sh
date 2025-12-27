#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${CHRONOS_URL:-http://localhost:3000}"

echo "[1/3] Health..."
curl -fsS "$BASE_URL/api/health" >/dev/null

echo "[2/3] Projects..."
curl -fsS "$BASE_URL/api/projects" >/dev/null

echo "[3/3] Survival tests..."
npm --prefix apps/chronos-backoffice run test:survival

echo "OK: healthcheck passou."
