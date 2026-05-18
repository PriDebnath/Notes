FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend-express/package.json ./backend-express/

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --filter backend-express  

 # copy ignores stuff of .dockerignore
COPY . .

EXPOSE 8000

CMD ["pnpm", "--filter", "backend-express", "dev"]