import jwt from 'jsonwebtoken'
import { AuthenticationError, UserInputError } from 'apollo-server'

export default {
  Query: {
    users: (_, __, { models }) => models.User.findAll(),
    user: (_, { id }, { models }) => models.User.findByPk(id),
    me: (_, __, { me }) => me,
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

      return {
        token: jwt.sign({ id: user.id }, secret),
      }
    },
  },

  User: {
    messages: (user, __, { models }) =>
      models.Message.findAll({
        where: {
          user_id: user.id,
        },
      }),
  },
}
