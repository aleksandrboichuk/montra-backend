# Base image
FROM node:21-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
COPY . .

RUN npx prisma generate

# Install app dependencies
RUN npm install

# Creates a "dist" folder with the production build
RUN npm run build

# Pruning dev dependencies
RUN npm prune --production

# Start the server using the production build
CMD [ "node", "dist/main.js" ]