import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    createMessage(content: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    content: String!
    created_at: Date!
  }

  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: Date!
  }
`
