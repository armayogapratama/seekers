"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      // association
    }
  }
  Job.init(
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
        type: DataTypes.STRING,
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
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "location is required",
          },
          notEmpty: {
            msg: "location is required",
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
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
