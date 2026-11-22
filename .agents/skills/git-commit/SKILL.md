---
name: git-commit
description: "Create a clean, verified Git commit. Use when asked to commit changes, stage changes, prepare a commit, or run commit checks."
user-invocable: true
---

# Git Commit

## Procedure

1. Inspect `git branch --show-current` and `git status --short`.
2. Before proceeding, load the trusted root `.env` as shell-compatible assignments and read `GIT_COMMIT_NAME` and `GIT_COMMIT_EMAIL` without printing or logging their values. Require both to be non-empty. If `.env` or either value is missing, stop and ask the user to provide them; never guess or use a different configured identity.
3. Confirm `.env` is ignored by Git and is not tracked. Never stage or commit it.
4. Review the complete unstaged and staged diff. Separate unrelated changes; do not include changes the user did not ask to commit.
5. Derive the ticket prefix from the branch name using `<LETTERS>-<NUMBER>`, for example `STAR-29` from `STAR-29-build-the-home-page`.
6. If the branch has no ticket prefix, stop and ask the user for the desired commit subject or ticket prefix.
7. Run `pnpm check` before staging or before committing. This runs lint, formatting checks, typechecks, and tests.
8. If `pnpm check` fails, report the failure and fix the relevant cause. Do not commit while verification is failing.
9. Run relevant focused tests first during iteration. Use the full `pnpm check` before finalizing the commit.
10. Stage only the intended files with `git add <paths>`; avoid `git add .` unless every working-tree change belongs in the commit.
11. Review `git diff --cached --stat`, `git diff --cached --check`, and the staged diff. Confirm no generated files, secrets, or unrelated changes are included.
12. Create one commit unless the user requested multiple commits or the changes form distinct, independent logical commits.
13. Use this subject format:

```text
<LETTERS>-<NUMBER>: <imperative summary>
```

- Keep the subject under 72 characters.
- Use an imperative, concrete summary naming the affected component or behavior.
- Avoid vague subjects such as `update`, `fix bug`, or `changes`.
- Examples: `STAR-29: Build home page and room form`, `STAR-31: Validate empty room names`.

14. In one shell, load `.env`, require both values, and commit using them for both author and committer. This prevents repository or global Git configuration from silently selecting another account and does not persist the identity in Git configuration. Do not enable shell tracing (`set -x`):

```sh
test -f .env &&
set -a &&
. ./.env &&
set +a &&
test -n "$GIT_COMMIT_NAME" && test -n "$GIT_COMMIT_EMAIL" &&
GIT_AUTHOR_NAME="$GIT_COMMIT_NAME" \
GIT_AUTHOR_EMAIL="$GIT_COMMIT_EMAIL" \
GIT_COMMITTER_NAME="$GIT_COMMIT_NAME" \
GIT_COMMITTER_EMAIL="$GIT_COMMIT_EMAIL" \
git commit -m "<subject>"
```

15. Verify author and committer match the `.env` values using silent comparisons (for example, `test "$(git log -1 --format=%an)" = "$GIT_COMMIT_NAME"` and equivalent checks for author email, committer name, and committer email). Do not print the sensitive values. Also verify with `git status --short` and `git log -1 --oneline`.

## Rules

- Never claim verification passed unless the commands actually completed successfully.
- Never commit failing tests, lint, formatting, or typechecks.
- Never include credentials, secrets, or generated artifacts.
- Keep the commit name and email only in the ignored root `.env`; never print, log, stage, or commit their values or the `.env` file.
- Never create a commit without setting both author and committer from `GIT_COMMIT_NAME` and `GIT_COMMIT_EMAIL` in `.env`.
- Never rewrite history or push unless explicitly requested.
- Never fabricate a ticket prefix or commit hash.
