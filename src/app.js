import './bootstrap'
import express from 'express'
import http from 'http'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import schemas from './app/schemas'
import resolvers from './app/resolvers'
import models from './app/models'
import './database'

class App {
  constructor() {
    this.express = express()
    this.server = http.createServer(this.express)
    this.apollo()
  }

  apollo() {
    const me = async req => {
      const token = req.headers['x-token']

      if (token) {
        try {
          return jwt.verify(token, process.env.JWT_SECRET)
        } catch (e) {
          throw new AuthenticationError('You are not authorized')
        }
      }
    }

    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({ req, connection }) => {
        if (connection) return models
        if (req) {
          return {
            models,
            me: await me(req),
            secret: process.env.JWT_SECRET,
          }
        }
      },
    })

    server.applyMiddleware({
      app: this.express,
      path: '/graphql',
    })

    server.installSubscriptionHandlers(this.server)

    return server
  }
}

export default new App().server
