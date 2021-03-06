import jwt from 'jsonwebtoken'
import { AuthenticationError, UserInputError } from 'apollo-server'
import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { isAdmin } from './auth'

export default {
  Query: {
    users: (_, __, { models }) => models.User.findAll(),
    user: (_, { id }, { models }) => models.User.findByPk(id),
    me: (_, __, { me, models }) => models.User.findByPk(me.id),
  },

  Mutation: {
    signUp: async (_, input, { models, secret }) => {
      const user = await models.User.create(input)

      return {
        token: jwt.sign({ id: user.id }, secret),
      }
    },

    signIn: async (_, { login, password }, { models, secret }) => {
      const user = await models.User.findByUsernameOrEmail(login)

      if (!user) {
        throw new UserInputError('User does not exist')
      }

      const isValid = await user.isPasswordValid(password)

      if (!isValid) {
        throw new AuthenticationError('Login or password do not match')
      }

      const { id, username, role } = user

      return {
        token: jwt.sign({ id, username, role }, secret),
      }
    },

    deleteUser: combineResolvers(isAdmin, (_, { id }, { models }) =>
      models.User.destroy({ where: { id } })
    ),
  },

  User: {
    messages: async (user, { cursor, limit = 1 }, { models }) => {
      const messages = await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        where: cursor
          ? {
              user_id: user.id,
              createdAt: {
                [Sequelize.Op.lt]: cursor || null,
              },
            }
          : {
              user_id: user.id,
            },
      })

      const hasNextPage = messages.length > limit
      const edges = hasNextPage ? messages.slice(0, -1) : messages

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: messages[messages.length - 1].createdAt,
        },
      }
    },
    __resolveReference(user, { fetchUserById }) {
      return fetchUserById(user.id)
    },
  },
}
