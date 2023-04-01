FROM node:19.6.0-alpine AS depedencies
WORKDIR /widget-driven-development-template
COPY yarn.lock package.json package-lock.json ./
RUN yarn install

FROM node:19.6.0-alpine AS builder
WORKDIR /widget-driven-development-template
COPY . .
COPY --from=dependencies /widget-driven-development-template/node_modules ./node_modules
RUN yarn build

FROM node:19.6.0-alpine AS runner
WORKDIR /widget-driven-development-template

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S carbonhero -u 1001

COPY --from=builder --chown=next.js:node.js /widget-driven-development-template/.next ./.next
COPY --from=builder /widget-driven-development-template/node_modules ./node_modules
COPY --from=builder /widget-driven-development-template/package.json ./package.json

USER carbonhero
EXPOSE 3000

CMD ["yarn", "start"]

