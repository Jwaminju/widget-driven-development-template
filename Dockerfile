FROM node:19.6.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /widget-driven-development-template
COPY yarn.lock package.json package-lock.json ./
RUN yarn install --immutable --immutable-cache --check-cache

FROM base AS builder
WORKDIR /widget-driven-development-template
COPY --from=deps /widget-driven-development-template/node_modules ./node_modules
COPY . .

RUN NEXT_PUBLIC_ENV_MODE=$NEXT_PUBLIC_ENV_MODE yarn build

FROM base AS runner
WORKDIR /widget-driven-development-template

ARG NEXT_PUBLIC_ENV_MODE
ENV NODE_ENV production
ARG APP_ENV
RUN mv ./app/.env.$APP_ENV ./app/.env.production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S carbonhero -u 1001

COPY --from=builder --chown=carbonhero:nodejs /widget-driven-development-template/.next/standalone ./
COPY --from=builder --chown=carbonhero:nodejs /widget-driven-development-template/.next/static ./.next/static

COPY --from=builder /widget-driven-development-template/node_modules ./node_modules
COPY --from=builder /widget-driven-development-template/package.json ./package.json

USER carbonhero
EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]
