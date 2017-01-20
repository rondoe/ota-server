FROM node:argon

MAINTAINER Roman Mahrer

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN npm install && bower install


ENV MONGO_URL mongodb://db/ota
ENV PORT 3000

EXPOSE $PORT
CMD [ "npm", "start" ]
