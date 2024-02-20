const request = require("supertest");
const app = require("../app");

const { sequelize, User } = require("../models/index");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");
const { signPassword } = require("../helpers/hashPassword");

let access_token1;
let access_token2;
let access_token3;

beforeAll(async () => {
  const user1 = await User.create({
    username: "user1",
    email: "user1@mail.com",
    password: "123456789",
    gender: "Male",
    member: "Standard",
  });

  access_token1 = signToken({ id: user1.id });

  const user2 = await User.create({
    username: "user2",
    email: "user2@mail.com",
    password: "123456789",
    gender: "Female",
    member: "Standard",
  });

  access_token2 = signToken({ id: user2.id });

  const user3 = await User.create({
    username: "user3",
    email: "user3@mail.com",
    password: "123456789",
    gender: "Female",
    member: "Standard",
  });

  access_token3 = signToken({ id: user3.id });

  await queryInterface.bulkInsert(
    "MyJobs",
    [
      {
        applicationUrl: "aaa",
        companyName: "bbb",
        jobDescription: "ccc",
        publicationTime: "2024-01-16",
        source: "ddd",
        title: "eee",
        UserId: 1,
      },
      {
        applicationUrl: "fff",
        companyName: "ggg",
        jobDescription: "hhh",
        publicationTime: "2024-01-16",
        source: "iii",
        title: "jjj",
        UserId: 2,
      },
    ],
    {}
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("MyJobs", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe(`GET /my-jobs`, () => {
  describe(`Success Running My Jobs`, () => {
    test(`GET /my-jobs`, async () => {
      const { status, body } = await request(app)
        .get("/my-jobs")
        .set("Authorization", `Bearer ${access_token1}`);

      console.log(status);
      console.log(body);
      // expect(status).toBe(200);
      // expect(body).toBeInstanceOf(Object);
      // expect(body.category[0]).toHaveProperty("id", expect.any(Number));
      // expect(body.category[0]).toHaveProperty("name", expect.any(String));
      // expect(body.category[0]).not.toHaveProperty("createdAt");
      // expect(body.category[0]).not.toHaveProperty("updatedAt");
    });
  });

  describe(`Failed GET /categories`, () => {
    test(`Failed Invalid User`, async () => {
      const { status, body } = await request(app).get("/categories");

      // expect(status).toBe(401);
      // expect(body).toBeInstanceOf(Object);
      // expect(body).toHaveProperty("message", "Invalid User");
    });

    test(`Failed Invalid Token`, async () => {
      const { status, body } = await request(app)
        .get("/categories")
        .set("Authorization", `${access_token_1}`);

      // expect(status).toBe(401);
      // expect(body).toBeInstanceOf(Object);
      // expect(body).toHaveProperty(
      //   "message",
      //   "Token which you input is invalid Token"
      // );
    });
  });
});
