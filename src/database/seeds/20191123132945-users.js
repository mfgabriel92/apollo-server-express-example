const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
  up: async queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        first_name: 'John',
        middle_name: 'Mallone',
        last_name: 'Doe',
        email: 'johnmdoe@gmail.com',
        role: 'admin',
        username: 'johnmdoe',
        password: await bcrypt.hash('123123123', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: faker.name.firstName(),
        middle_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        role: 'user',
        username: faker.internet.userName(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: faker.name.firstName(),
        middle_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        role: 'user',
        username: faker.internet.userName(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: faker.name.firstName(),
        middle_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        role: 'user',
        username: faker.internet.userName(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),
  down: queryInterface => queryInterface.bulkInsert('users'),
}
