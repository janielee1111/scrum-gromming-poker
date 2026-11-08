# syntax=docker/dockerfile:1
FROM node:24-slim AS build
RUN corepack enable
WORKDIR /repo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
COPY --parents packages/*/package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter backend... build
RUN pnpm --filter backend deploy --prod --legacy /app

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /repo/backend/dist ./dist

USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]

