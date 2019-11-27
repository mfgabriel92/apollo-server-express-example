import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schemas from './app/schemas'
import resolvers from './app/resolvers'
import models from './app/models'
import './database'

class App {
  constructor() {
    this.server = express()
    this.apollo()
  }

  apollo() {
    return new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({ req, connection }) => {
        if (connection) return models
        if (req) {
          return {
            models,
            secret: process.env.JWT_SECRET,
          }
        }
      },
    }).applyMiddleware({
      app: this.server,
      path: '/graphql',
    })
  }
}

export default new App().server
