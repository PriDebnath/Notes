# Use lightweight Node image
FROM node:24-alpine

# Enable pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy only lock + workspace files first (for caching)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy backend-express package.json
COPY backend-express/package.json backend-express/

# Install dependencies (only once, cached)
RUN pnpm install --filter backend-express

# Copy actual code
COPY backend-express ./backend-express

WORKDIR /app/backend-express

EXPOSE 8000

CMD ["pnpm", "--filter", "backend-express", "dev"]