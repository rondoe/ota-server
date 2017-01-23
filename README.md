# OTA SERVER

This project manages http updates for esp8266 modules with a simple ui.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- nodejs enviroment
- mongodb

### Installing

```
bower install && npm install
```

Per default the server uses localhost as mongodb server. you can change this behaviour using the environment variables.

## Running

This product uses the following environment variables.

- MONGO_URL (mongurl to database. defaults to mongodb://localhost/ota)
- PORT port to expose (default 3000)

### Docker

Build the docker image

```
docker build -t youruser/ota .
```

Run the image

```
docker run -d --name ota-server -p 80:3000 -e MONGO_URL=mongodb://db/ota youruser/ota
```

## Usage

login with admin/admin

Made with love in absdorf, austria
