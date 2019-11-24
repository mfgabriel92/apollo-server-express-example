import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: {
          type: Sequelize.STRING,
          validate: {
            notEmpty: true,
          },
        },
        middle_name: {
          type: Sequelize.STRING,
        },
        last_name: {
          type: Sequelize.STRING,
        },
        username: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    )

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10)
      }
    })

    return this
  }

  // static associate(models) {
  //   this.hasMany(models.Message, { foreignKey: 'user_id', as: 'messages' })
  // }

  static async findByUsernameOrEmail(login) {
    let user = await this.findOne({ where: { username: login } })

    if (!user) {
      user = await this.findOne({ where: { email: login } })
    }

    return user
  }

  isPasswordValid(password) {
    return bcrypt.compare(password, this.password)
  }
}

export default User
