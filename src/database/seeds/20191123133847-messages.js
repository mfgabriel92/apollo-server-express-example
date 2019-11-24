const faker = require('faker')

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('messages', [
      {
        user_id: 2,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        user_id: 3,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        user_id: 4,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        content: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),
  down: queryInterface => queryInterface.bulkInsert('messages'),
}
