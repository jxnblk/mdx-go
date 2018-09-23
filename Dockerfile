FROM node:10-alpine

WORKDIR /usr/src

COPY . .
RUN npm i

RUN cd docs && npm i --only=production && npm run build

RUN mv docs/dist /public
