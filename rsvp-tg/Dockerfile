FROM node:18.18-alpine

RUN mkdir -p /home/node/rsvp-tg/node_modules && chown -R node:node /home/node/rsvp-tg

WORKDIR /home/node/rsvp-db
COPY --chown=node:node ./rsvp-db/ .
WORKDIR /home/node/rsvp-tg

COPY --chown=node:node ./rsvp-tg/package*.json ./

USER node

RUN npm install

COPY --chown=node:node ./rsvp-tg/ .
RUN ["chmod", "+x", "/home/node/rsvp-tg/scripts/wait-for.sh"]

RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/index.js" ]