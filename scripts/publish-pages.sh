#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
# Publish the static client only; no local notebook files are read.
pnpm test
pnpm typecheck
pnpm build:pages
repo_remote=$(git remote get-url origin)
source_commit=$(git rev-parse HEAD)
pages_stage=$(mktemp -d)
trap 'rm -rf "$pages_stage"' EXIT
git -C "$pages_stage" init -q -b gh-pages
git -C "$pages_stage" config user.name "$(git config user.name)"
git -C "$pages_stage" config user.email "$(git config user.email)"
git -C "$pages_stage" remote add origin "$repo_remote"
if [ -n "$(git ls-remote --heads "$repo_remote" gh-pages)" ]; then
  git -C "$pages_stage" fetch -q origin gh-pages
  git -C "$pages_stage" reset -q --hard FETCH_HEAD
  git -C "$pages_stage" rm -q -r --ignore-unmatch .
fi
cp -R pages-dist/. "$pages_stage/"
touch "$pages_stage/.nojekyll"
printf '%s\n' "$source_commit" > "$pages_stage/source-commit.txt"
git -C "$pages_stage" add .
if ! git -C "$pages_stage" diff --cached --quiet; then
  git -C "$pages_stage" commit -q -m "Publish Learning Hub from $source_commit"
  git -C "$pages_stage" push origin gh-pages
fi
