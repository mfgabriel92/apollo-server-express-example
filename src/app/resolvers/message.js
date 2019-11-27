import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './auth'
import pubsub, { EVENTS } from '../subscriptions'

export default {
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (_, { content }, { models, me }) => {
        const message = await models.Message.create({
          user_id: me.id,
          content,
        })

        pubsub.publish(EVENTS.MESSAGES.CREATED, {
          messageCreated: { message },
        })

        return message
      }
    ),
    deleteMessage: (_, { id }, { models }) =>
      models.Message.destroy({ where: { id } }),
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGES.CREATED),
    },
  },
}
