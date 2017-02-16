FROM node:argon

MAINTAINER Roman Mahrer

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN npm install -g npm bower --quiet
RUN npm install -g nodemon  --quiet
RUN npm install --quiet && bower install --allow-root --quiet

ENV MONGO_URL mongodb://localhost/ota
ENV PORT 3000

EXPOSE $PORT
CMD [ "npm", "start" ]
