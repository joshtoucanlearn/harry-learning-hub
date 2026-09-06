#!/bin/bash
cd "$(dirname "$0")" || exit 1
BUNDLED_RUNTIME="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies"
if [ -d "$BUNDLED_RUNTIME/node/bin" ]; then
  export PATH="$BUNDLED_RUNTIME/node/bin:$BUNDLED_RUNTIME/bin/fallback:$PATH"
fi
if ! command -v pnpm >/dev/null 2>&1; then
  echo 'Node.js 22.13+ and pnpm are needed to run Football Desk.'
  read -r -p 'Press Enter to close.'
  exit 1
fi
if [ ! -d node_modules ]; then
  pnpm install || exit 1
fi
echo 'Open http://localhost:3000 in your browser. Keep this window open.'
echo 'Use the same address each time so your saved notebook is available.'
pnpm dev --host 127.0.0.1 --port 3000 --strictPort
