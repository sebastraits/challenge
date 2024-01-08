# Use an official Node.js runtime as the base image
FROM node:current-alpine

RUN mkdir /app && chown node:node /app 

WORKDIR /app

COPY package.json /app

RUN npm install 

RUN mkdir /app/node_modules/.cache && chown node:node /app/node_modules/.cache

USER node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
