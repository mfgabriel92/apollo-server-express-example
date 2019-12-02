import { expect } from 'chai'
import * as api from '../app/services/api'

describe('Users', () => {
  describe('user(id: ID!): String!', () => {
    it('should return a user', async () => {
      const expected = {
        user: {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          role: 'admin',
          username: 'johnmdoe',
          email: 'johnmdoe@gmail.com',
        },
      }

      const result = await api.user({ id: '1' })

      expect(result.data).to.eql(expected)
    })
  })
})
