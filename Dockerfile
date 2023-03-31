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

FROM base AS builder
WORKDIR /widget-driven-development-template
COPY --from=deps /widget-driven-development-template/node_modules ./node_modules
COPY . .

RUN yarn build

FROM base AS runner
WORKDIR /widget-driven-development-template

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /widget-driven-development-template/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /widget-driven-development-template/.next/static ./.next/static

COPY --from=builder --chown=next.js:node.js /widget-driven-development-template/.next ./.next
COPY --from=builder /widget-driven-development-template/node_modules ./node_modules
COPY --from=builder /widget-driven-development-template/package.json ./package.json

USER nextjs 
EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]

