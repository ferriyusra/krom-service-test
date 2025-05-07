# --- Stage 1: Build ---
FROM node:22-alpine AS build

ARG NODE_ENV=production
ARG DATABASE_URL

ENV NODE_ENV=$NODE_ENV
ENV DATABASE_URL=$DATABASE_URL
ENV TZ="Asia/Jakarta"

# Install dependencies
RUN apk upgrade --latest --prune --purge --no-cache tzdata \
  && apk add --no-cache openssl

WORKDIR /home/node/app

# Install dependencies (pastikan prisma ada di package.json)
COPY package.json package-lock.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source files & build TypeScript
COPY . ./
RUN npm run build

# --- Stage 2: Runtime ---
FROM node:22-alpine AS final

ENV NODE_ENV=production
ENV TZ="Asia/Jakarta"
ENV PORT=9852
ENV HOST=0.0.0.0

# Clean up unnecessary npm tools (optional, for minimal image)
RUN apk upgrade --latest --prune --purge --no-cache \
  && apk add --no-cache openssl \
  && unlink /usr/local/bin/npm \
  && unlink /usr/local/bin/npx \
  && rm -rf /usr/local/lib/node_modules/npm/

WORKDIR /home/node/app

# Copy only built files and generated Prisma client
COPY --from=build /home/node/app .

USER node

HEALTHCHECK NONE

CMD ["node", "dist/bin/www.js"]
