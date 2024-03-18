# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /homework845
COPY . .
RUN npm install
CMD [ "node", "./bin/www" ]
EXPOSE 3000