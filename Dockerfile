FROM node:10-alpine

WORKDIR /usr/src

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN cd docs && npm i && npm run build

RUN mv docs/dist /public
