"use strict";
const { Model } = require("sequelize");
const { signPassword } = require("../helpers/hashPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile);
      User.hasMany(models.MyJob);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is required",
          },
          notEmpty: {
            msg: "username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email has been used. Email must be unique",
        },
        validate: {
          notNull: {
            msg: "email is required",
          },
          notEmpty: {
            msg: "email is required",
          },
          isEmail: {
            args: true,
            msg: "email must be email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
          len: {
            args: [8, 20],
            msg: "password must be minimum 8 characters",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "gender is required",
          },
          notEmpty: {
            msg: "gender is required",
          },
          isIn: {
            args: [["Male", "Female"]],
            msg: "gender must be Male or Female",
          },
        },
      },
      member: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Standard",
        validate: {
          notNull: {
            msg: "member is required",
          },
          notEmpty: {
            msg: "member is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  
  User.beforeCreate((el) => {
    el.password = signPassword(el.password);
  });

  return User;
};
