# Build stage for frontend and backend dependencies
FROM node:20 AS deps
WORKDIR /app

COPY backend/package.json backend/package-lock.json ./backend/
COPY frontend/package.json frontend/package-lock.json ./frontend/

RUN cd frontend && npm install
RUN cd backend && npm install

# Build frontend
FROM node:20 AS builder
WORKDIR /app
COPY frontend ./frontend
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules
RUN cd frontend && npm run build

# Production image
FROM node:20-slim AS runner
WORKDIR /app
COPY backend ./backend
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/frontend/dist ./frontend/dist

WORKDIR /app/backend
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "server.js"]
