import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      first_name: String!
      middle_name: String
      last_name: String!
      username: String!
      email: String!
      password: String!
    ): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    first_name: String!
    middle_name: String!
    last_name: String!
    email: String!
    role: String!
    username: String!
    messages(cursor: String, limit: Int): MessageConnection!
  }

  type Token {
    token: String!
  }
`
