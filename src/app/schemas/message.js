import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    createMessage(content: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  extend type Subscription {
    messageCreated: Message!
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
    hasNextPage: Boolean!
    endCursor: Date!
  }
`
