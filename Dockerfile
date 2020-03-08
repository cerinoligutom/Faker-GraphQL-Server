FROM node:10.15-alpine

WORKDIR /usr/src/app

# Install global dependencies
RUN npm install -g pm2

# Copy our code from the current folder to /app inside the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy files from host to container
COPY ./ ./

RUN npm run seed

EXPOSE 80

CMD [ "npm", "run", "production" ]
