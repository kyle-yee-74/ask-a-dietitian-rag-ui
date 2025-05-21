# TODO: update to yarn
# ---------- 1. Dev dependencies ----------
    FROM node:22-alpine AS dev-deps
    WORKDIR /app
    COPY package.json package-lock.json .npmrc* ./
    RUN npm ci
    
    # ---------- 2. Prod dependencies ----------
    FROM node:22-alpine AS prod-deps
    WORKDIR /app
    COPY package.json package-lock.json .npmrc* ./
    RUN npm ci --omit=dev
    
    # ---------- 3. Build ----------
    FROM node:22-alpine AS builder
    WORKDIR /app
    COPY . .
    COPY --from=dev-deps /app/node_modules ./node_modules
    RUN npm run build          # outputs to /app/build
    
    # ---------- 4. Runtime ----------
    FROM node:22-alpine
    WORKDIR /app
    ENV NODE_ENV=production \
        PORT=3000
    
    # Copy runtime files
    COPY package.json package-lock.json server.js ./
    COPY --from=prod-deps /app/node_modules ./node_modules
    COPY --from=builder /app/build ./build
    
    EXPOSE 3000
    CMD ["npm", "run", "start"]
    