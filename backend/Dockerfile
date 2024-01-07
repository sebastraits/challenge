FROM node:latest

RUN mkdir /app && chown node:node /app

WORKDIR /app

USER node

COPY package.json /app

RUN npm install 

EXPOSE 3000

CMD [ "npm", "start" ]
