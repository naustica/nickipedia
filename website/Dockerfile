FROM node

WORKDIR /webapp/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run docker
