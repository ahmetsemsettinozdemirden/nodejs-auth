
FROM alpine:latest

RUN apk update
RUN apk add nodejs-npm
RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 9000

CMD [ "npm", "start" ]