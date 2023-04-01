FROM node:19.6.0-alpine AS depedencies
WORKDIR /Carbon-Hero
COPY yarn.lock package.json package-lock.json ./
RUN yarn install

FROM node:19.6.0-alpine AS depedencies
WORKDIR /Carbon-Hero
COPY . .
COPY --from=dependencies /Carbon-Hero/node_modules ./node_modules
RUN yarn build

FROM node:19.6.0-alpine AS runner
WORKDIR /Carbon-Hero

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S carbonhero -u 1001

COPY --from=builder --chown=next.js:node.js /Carbon-Hero/.next ./.next
COPY --from=builder /Carbon-Hero/node_modules ./node_modules
COPY --from=builder /Carbon-Hero/package.json ./package.json

USER carbonhero
EXPOSE 3000

CMD ["yarn", "start"]

