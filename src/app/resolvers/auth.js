import { ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'

export const isAuthenticated = (_, __, { me }) => {
  return me ? skip : new ForbiddenError('Not authenticated')
}

export const isOwner = async (_, { id }, { me, models }) => {
  const message = await models.Message.findByPk(id, { raw: true })

  if (message.userId !== me.id) {
    throw new ForbiddenError('You are not the owner')
  }

  return skip
}

export const isAdmin = combineResolvers(
  isAuthenticated,
  (_, __, { me: { role } }) =>
    role === 'admin' ? skip : new ForbiddenError('You are not an admin')
)
