const bcrypt = require('bcrypt');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 255,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        max: 255,
        isEmail: true,
        async isUnique(value) {
          const user = await User.findOne({
            where: { email: value },
            attributes: ['id']
          });

          if(user) {
            throw new Error('Email is already in use');
          }
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      async beforeCreate(user, options) {
        user.password = await bcrypt.hash(user.password, 10);
        user.isAdmin = false;
      }
    }
  });
  return User;
};