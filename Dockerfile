FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /
RUN npm install

EXPOSE 3000

COPY . .
CMD [ "npm", "start" ]
