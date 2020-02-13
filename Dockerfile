# base image
FROM node:12.2.0-alpine as node-server

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . .
RUN yarn

EXPOSE 3000

# start app
CMD ["yarn", "start"]

