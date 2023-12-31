# Build BASE
FROM node:18-alpine as BASE

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile \
    && yarn cache clean

# Build Image
FROM node:18-alpine AS BUILD

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
COPY ./.env ./.env
RUN wget -qO- https://gobinaries.com/tj/node-prune | sh
RUN yarn build \
    && cd .next/standalone \
    && node-prune

# Build production
FROM node:18-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/next.config.js ./

# Set mode "standalone" in file "next.config.js"
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
