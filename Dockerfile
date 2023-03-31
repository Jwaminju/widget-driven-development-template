FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /widget-driven-development-template
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:18-alpine AS builder
WORKDIR /widget-driven-development-template
COPY . .
COPY --from=dependencies /widget-driven-development-template/node_modules ./node_modules
RUN yarn build
RUN npm prune --production

FROM node:18-alpine AS runner
WORKDIR /widget-driven-development-template

ENV NODE_ENV production

RUN addgropu -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=next.js:node.js /widget-driven-development-template/.next ./.next
COPY --from=builder /widget-driven-development-template/node_modules ./node_modules
COPY --from=builder /widget-driven-development-template/package.json ./package.json

USER nextjs 
EXPOSE 3000

CMD ["yarn", "start"]

