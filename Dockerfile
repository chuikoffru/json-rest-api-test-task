FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY --chown=node:node . .

USER node

EXPOSE 3000:3000

CMD [ "npm", "run", "dev" ]