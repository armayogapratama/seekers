"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyJob extends Model {
    static associate(models) {
      MyJob.belongsTo(models.User);
    }
  }
  MyJob.init(
    {
      applicationUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "application URL is required",
          },
          notEmpty: {
            msg: "application URL is required",
          },
        },
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "company name is required",
          },
          notEmpty: {
            msg: "company name is required",
          },
        },
      },
      jobDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "job description is required",
          },
          notEmpty: {
            msg: "job description is required",
          },
        },
      },
      publicationTime: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "publication time is required",
          },
          notEmpty: {
            msg: "publication time is required",
          },
        },
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "source is required",
          },
          notEmpty: {
            msg: "source is required",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "title is required",
          },
          notEmpty: {
            msg: "title is required",
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
      modelName: "MyJob",
    }
  );
  return MyJob;
};
