import Sequelize, { Model } from 'sequelize'

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          validate: {
            notEmpty: true,
          },
        },
        content: {
          type: Sequelize.STRING,
          validate: {
            notEmpty: {
              msg: 'Message is required',
            },
          },
        },
        created_at: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Message
