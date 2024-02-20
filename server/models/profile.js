"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "fullname is required",
          },
          notEmpty: {
            msg: "fullname is required",
          },
        },
      },
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "address is required",
          },
          notEmpty: {
            msg: "address is required",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2909&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        validate: {
          notNull: {
            msg: "image is required",
          },
          notEmpty: {
            msg: "image is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID is required",
          },
          notEmpty: {
            msg: "User ID is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
