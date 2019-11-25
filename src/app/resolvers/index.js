import { GraphQLDateTime } from 'graphql-iso-date'
import userResolvers from './user'
import messageResolvers from './message'

const customScalarResolvers = {
  Date: GraphQLDateTime,
}

export default [userResolvers, messageResolvers, customScalarResolvers]
