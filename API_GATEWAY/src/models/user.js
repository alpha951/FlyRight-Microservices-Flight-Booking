"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");

const { SALT_ROUNDS } = require("../config/server-config");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "User_Roles",
        as: "role",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 150],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(function encrypt(user) {
    console.log("inside beforeCreate");
    const encryptedPassword = bcrypt.hashSync(
      user.password,
      Number(SALT_ROUNDS)
    );
    user.password = encryptedPassword;
  });
  return User;
};
