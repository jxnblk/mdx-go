FROM node:10-alpine

WORKDIR /usr/src

COPY . .
RUN npm i
RUN npm run prepare

RUN cd docs
RUN npm i --only=production

RUN npm run build && mv dist /public
