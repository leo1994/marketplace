# Marketplace

This is a simple marketplace application built using microservices architecture, it is a simple application that allows users to create stores, add products to their stores and buy products from stores. It is built using Node.js, Graphql, Apollo, Kafka, Docker and Docker-compose. It has 4 microservices, the store service, the product service, the order service and the payment service. And mono-repo is used to manage the microservices.

# GraphQl 

The Marketplace use graphql, and to communicate between the microservices it uses Apollo Federation to implement the graphql router. Also the types are generated using graphql-codegen, based on the schema.graphql file.

`npm run codegen` to generate the types. 

> They are automatically generated when you run build application.

## Graphql Router

The graphql router is implemented using Apollo Federation, it is a gateway that allows you to communicate between the microservices.
To 

## Step by step how I built this application

- [x] [Create a mono-repo](https://github.com/leo1994/marketplace/tree/feature/basic-setup%231)
- [x] [Create a simple store service]()
- [x] [Add graphql to the store service]()
- [x] [Implement graphql router]()
## Technologies

- Node.js (Typescript)
- Graphql (Apollo) - Federation (Router)
- Kafka 
- Docker 
- Docker-compose
- MongoDB



