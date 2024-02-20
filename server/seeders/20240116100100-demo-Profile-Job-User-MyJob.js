"use strict";

const { signPassword } = require("../helpers/hashPassword");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "user1",
          email: "user1@mail.com",
          password: signPassword("123456789"),
          gender: "Male",
          member: "Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user2",
          email: "user2@mail.com",
          password: signPassword("123456789"),
          gender: "Female",
          member: "Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await queryInterface.bulkDelete("Jobs", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await queryInterface.bulkDelete("MyJobs", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
