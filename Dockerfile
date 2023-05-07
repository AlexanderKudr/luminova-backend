# Use the Node.js 18 Alpine image as the base image
FROM node:18-alpine3.14 AS build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the current directory (where the Dockerfile is located) into the container at /app
COPY . .

# Install the dependencies for the Node.js application using npm ci
RUN npm ci

# Set the command to run when the container starts
CMD ["node", "dist/main.js"]
