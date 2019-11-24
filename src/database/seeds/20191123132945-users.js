const faker = require('faker')

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        first_name: 'John',
        middle_name: 'Mallone',
        last_name: 'Doe',
        email: 'johnmdoe@gmail.com',
        username: 'johnmdoe',
        password: faker.internet.password(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: faker.name.firstName(),
        middle_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: faker.name.firstName(),
        middle_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: faker.name.firstName(),
        middle_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),
  down: queryInterface => queryInterface.bulkInsert('users'),
}
