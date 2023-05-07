# Use the Node.js 18 Alpine image as the base image
FROM node:20.1.0-alpine3.16 AS build

RUN apk update && rm -rf /var/cache/apk/*

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the current directory (where the Dockerfile is located) into the container at /app
COPY . .

# Install the dependencies for the Node.js application using npm ci
RUN npm install

# Set the command to run when the container starts
CMD ["npm" , "run" , "start:prod"]
