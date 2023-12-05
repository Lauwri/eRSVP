FROM node:18.18-alpine

RUN mkdir -p /home/node/rsvp-api/node_modules && chown -R node:node /home/node/rsvp-api

WORKDIR /home/node/rsvp-db
COPY --chown=node:node ./rsvp-db/ .
WORKDIR /home/node/rsvp-api

COPY --chown=node:node ./rsvp-api/package*.json ./

USER node

RUN npm install

COPY --chown=node:node ./rsvp-api/ .
RUN ["chmod", "+x", "/home/node/rsvp-api/scripts/wait-for.sh"]

RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/src/index.js" ]