# Use the Node.js 18 Alpine image as the base image
FROM node:18.14.0-alpine

RUN apk update && rm -rf /var/cache/apk/*

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the current directory (where the Dockerfile is located) into the container at /app
COPY . .

COPY package.json pnpm-lock.yaml ./

RUN npm install pnpm -g

RUN pnpm install

RUN pnpm install typescript && pnpm tsc

# Set the command to run when the container starts
CMD ["pnpm", "start"]
