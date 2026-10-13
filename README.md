# Scrum Gromming Poker

A planning poker app for scrum teams to estimate stories together.

## Structure

- `backend/` - NestJS API
- `frontend/` - React + Vite client

## Getting started

Requires Node.js and pnpm.

```bash
# install all workspace dependencies from the repository root
pnpm install

# run the backend
pnpm --filter backend start:dev

# run the frontend
pnpm --filter frontend dev
```

## Code quality

Run these commands from the repository root:

```bash
pnpm lint          # Oxlint across workspace packages
pnpm format        # Format source and configuration files with Prettier
pnpm format:check  # Check formatting without changing files
pnpm typecheck     # Type-check frontend and backend
pnpm check         # Run lint, formatting check, and type-checking
```
