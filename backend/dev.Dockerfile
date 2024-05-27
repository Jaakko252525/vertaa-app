




FROM node:20-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

COPY --chown=node:node . .


RUN npm install

RUN npx tsc

EXPOSE 4000:4000

# Start the application
CMD [ "node", "./out/index.js" ]


