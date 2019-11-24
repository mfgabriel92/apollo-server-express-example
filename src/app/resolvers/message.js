import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './auth'

export default {
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      (_, { content }, { models, me }) => {
        models.Message.create({
          user_id: me.id,
          content,
        })
      }
    ),
    deleteMessage: (_, { id }, { models }) =>
      models.Message.destroy({ where: { id } }),
  },
}
