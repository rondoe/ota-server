# UPTHROW

This project manages http updates for esp8266 modules through a simple ui.

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
docker build -t youruser/upthrow .
```

Running

```
docker run -d --name upthrow -p 80:3000 -e MONGO_URL=mongodb://db/ota mahrer/upthrow
```

## Usage

- login with admin/admin
- use the skeleton on your esp device with the displayed download url
- upload new software
- restart your esp device

## License

This project is licensed under the MIT License.

## Acknowledgements

- <https://github.com/puikinsh/gentelella>

Made with love in Absdorf, Austria
