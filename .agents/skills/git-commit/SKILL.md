---
name: git-commit
description: "Create a clean, verified Git commit. Use when asked to commit changes, stage changes, prepare a commit, or run commit checks."
user-invocable: true
---

# Git Commit

## Procedure

1. Inspect `git branch --show-current` and `git status --short`.
2. Review the complete unstaged and staged diff. Separate unrelated changes; do not include changes the user did not ask to commit.
3. Derive the ticket prefix from the branch name using `<LETTERS>-<NUMBER>`, for example `STAR-29` from `STAR-29-build-the-home-page`.
4. If the branch has no ticket prefix, stop and ask the user for the desired commit subject or ticket prefix.
5. Run `pnpm check` before staging or before committing. This runs lint, formatting checks, typechecks, and tests.
6. If `pnpm check` fails, report the failure and fix the relevant cause. Do not commit while verification is failing.
7. Run relevant focused tests first during iteration. Use the full `pnpm check` before finalizing the commit.
8. Stage only the intended files with `git add <paths>`; avoid `git add .` unless every working-tree change belongs in the commit.
9. Review `git diff --cached --stat`, `git diff --cached --check`, and the staged diff. Confirm no generated files, secrets, or unrelated changes are included.
10. Create one commit unless the user requested multiple commits or the changes form distinct, independent logical commits.
11. Use this subject format:

```text
<LETTERS>-<NUMBER>: <imperative summary>
```

- Keep the subject under 72 characters.
- Use an imperative, concrete summary naming the affected component or behavior.
- Avoid vague subjects such as `update`, `fix bug`, or `changes`.
- Examples: `STAR-29: Build home page and room form`, `STAR-31: Validate empty room names`.

12. Commit with `git commit -m "<subject>"`.
13. Verify with `git status --short` and `git log -1 --oneline`.

## Rules

- Never claim verification passed unless the commands actually completed successfully.
- Never commit failing tests, lint, formatting, or typechecks.
- Never include credentials, secrets, or generated artifacts.
- Never rewrite history or push unless explicitly requested.
- Never fabricate a ticket prefix or commit hash.
