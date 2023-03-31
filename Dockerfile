FROM node:18-alpine AS dependencies 
RUN apk add --no-cache libc6-compat
WORKDIR /widget-driven-development-template
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production;
RUN rm -rf ./.next/cache

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

