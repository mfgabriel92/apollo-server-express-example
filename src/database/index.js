import Sequelize from 'sequelize'
import config from '../config/database'
import models from '../app/models'

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(config)

    Object.values(models)
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
