FROM node:alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code to the container
COPY . .
EXPOSE 3001
CMD ["node", "./Server/index.js"]