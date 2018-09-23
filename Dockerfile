FROM node:10-alpine

WORKDIR /usr/src

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .
RUN npm run prepare

RUN cd docs && npm i --only=production && npm run build

RUN mv docs/dist /public
