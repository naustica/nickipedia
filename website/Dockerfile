FROM node:alpine

WORKDIR /webapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run docker
