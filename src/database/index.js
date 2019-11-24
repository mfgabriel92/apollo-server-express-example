import Sequelize from 'sequelize'
import config from '../config/database'
import models from '../app/models'

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(config)

    Object.keys(models).forEach(key => {
      models[key].init(this.connection)

      if ('associate' in models[key]) {
        models[key].associate(models)
      }
    })
  }
}

export default new Database()
