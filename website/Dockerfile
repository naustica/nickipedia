FROM node:alpine

WORKDIR /website

ADD ./package.json ./
ADD ./webpack.config.development.js ./

RUN npm install

COPY ./ ./

EXPOSE 3000

CMD npm run build
