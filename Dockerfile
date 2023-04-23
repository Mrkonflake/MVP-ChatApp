FROM node:alpine

WORKDIR /usr/src/app

# Copy the .env file to the container
COPY .env ./

# Load the environment variables from the .env file
RUN apk --no-cache add openssl
RUN openssl enc -aes-256-cbc -d -in .env.enc -out .env -k ${ENV_FILE_PASSWORD}
ENV PORT=${PORT} \
    VITE_APP_SERVER=${VITE_APP_SERVER} \
    CLIENT=${CLIENT} \
    VITE_REDIRECT_CLIENT=${VITE_REDIRECT_CLIENT} \
    AI_API=${AI_API} \
    VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN} \
    VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID} \
    MONGODB_PASSWORD=${MONGODB_PASSWORD} \
    MONGODB_USERNAME=${MONGODB_USERNAME}

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the application code to the container
COPY . .

CMD ["node", "./Server/index.js"]