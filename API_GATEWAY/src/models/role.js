"use strict";
const { Model } = require("sequelize");

const { ROLE } = require("../utils/common/enums");
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = ROLE;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "User_Roles",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.ENUM({
          values: [ADMIN, CUSTOMER, FLIGHT_COMPANY],
        }),
        defaultValue: CUSTOMER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
