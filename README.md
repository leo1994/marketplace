# Marketplace

This is a simple marketplace application built using microservices architecture, it is a simple application that allows users to create stores, add products to their stores and buy products from stores. It is built using Node.js, Graphql, Apollo, Kafka, Docker and Docker-compose. It has 4 microservices, the store service, the product service, the order service and the payment service. And mono-repo is used to manage the microservices.

## Run the application

- ### Prerequisites
  - Docker
  - Docker-compose

This application is built using docker and docker-compose, so you need to have docker and docker-compose installed on your machine. To run the application, you need to run the following command:

```bash
docker-compose up
```

## Testing

- ### Prerequisites
  - Node.js (^18.0.0)
  - Npm

To test the application, you need to run the following command:

```bash
npm install
npm run test
```

## Technologies

- Node.js (Typescript)
- Graphql (Apollo) - Federation (Router)
- Kafka 
- Docker 
- Docker-compose
- MongoDB



