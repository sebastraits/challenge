FROM node:current-alpine

RUN mkdir /app && chown node:node /app

WORKDIR /app

USER node

COPY package.json /app

RUN npm install 

EXPOSE 8000

COPY . .

RUN npm run test

CMD [ "npm", "start" ]
