FROM node:14-alpine AS depedencies
RUN apk add --no-cache lobc6-compat
WORKDIR /widget-driven-development-template
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:14-alpine AS depedencies
WORKDIR /widget-driven-development-template
COPY . .
COPY --from=dependencies /widget-driven-development-template/node_modules ./node_modules
RUN npm run build

FROM node:14-alpine AS sunner
WORKDIR /widget-driven-development-template

ENV NODE_ENV production

RUN addgropu -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=next.js:node.js /widget-driven-development-template/.next ./.next
COPY --from=builder /widget-driven-development-template/node_modules ./node_modules
COPY --from=builder /widget-driven-development-template/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]

