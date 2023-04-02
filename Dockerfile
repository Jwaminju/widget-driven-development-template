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

RUN NEXT_PUBLIC_ENV_MODE=$_NEXT_PUBLIC_ENV_MODE
RUN NEXT_PUBLIC_API_KEY=$_NEXT_PUBLIC_API_KEY
RUN NEXT_PUBLIC_AUTH_DOMAIN=$_NEXT_PUBLIC_AUTH_DOMAIN
RUN NEXT_PUBLIC_PROJECT_ID=$_NEXT_PUBLIC_PROJECT_ID
RUN NEXT_PUBLIC_STORAGE_BUCKET=$_NEXT_PUBLIC_STORAGE_BUCKET
RUN NEXT_PUBLIC_SENDER_ID=$_NEXT_PUBLIC_SENDER_ID
RUN NEXT_PUBLIC_APP_ID=$_NEXT_PUBLIC_APP_ID
RUN NEXT_PUBLIC_MEASUREMENT_ID=$_NEXT_PUBLIC_MEASUREMENT_ID

RUN yarn build

FROM base AS runner
WORKDIR /widget-driven-development-template

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S carbonhero -u 1001

COPY --from=builder /widget-driven-development-template/public ./public

COPY --from=builder --chown=carbonhero:nodejs /widget-driven-development-template/.next ./.next
COPY --from=builder /widget-driven-development-template/node_modules ./node_modules
COPY --from=builder /widget-driven-development-template/package.json ./package.json

COPY --from=builder --chown=carbonhero:nodejs /widget-driven-development-template/.next/standalone ./
COPY --from=builder --chown=carbonhero:nodejs /widget-driven-development-template/.next/static ./.next/static

USER carbonhero
EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]