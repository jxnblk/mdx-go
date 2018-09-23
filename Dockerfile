FROM node:10-alpine

WORKDIR /usr/src

COPY . .
RUN cd docs
RUN npm i --only=production

RUN npm run build && mv dist /public
