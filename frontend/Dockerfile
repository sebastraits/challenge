# Use an official Node.js runtime as the base image
FROM node:latest

RUN mkdir /app && chown node:node /app 

WORKDIR /app

COPY package.json /app

RUN npm install 

RUN mkdir /app/node_modules/.cache && chown node:node /app/node_modules/.cache

USER node

# Copy the entire project to the working directory
# COPY . .

# Build the React app
# RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
