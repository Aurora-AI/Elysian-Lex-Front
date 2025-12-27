#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f "package.json" ]; then
  echo "ERRO: package.json root não encontrado."
  exit 1
fi

if grep -q '"workspaces"' package.json; then
  echo "OK: workspaces detectado no root."
  exit 0
fi

echo "ERRO: workspaces não detectado. Plug-and-play quebra."
exit 2
