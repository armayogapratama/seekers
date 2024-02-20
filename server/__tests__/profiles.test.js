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
  const profiles = [
    {
      id: 1,
      fullName: "user 1",
      username: "user1",
      email: "user1@mail.com",
      password: signPassword("123456789"),
      gender: "Male",
      member: "Standard",
      address: "Jl. 1",
      image:
        "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      fullName: "user 2",
      username: "user2",
      email: "user2@mail.com",
      password: signPassword("123456789"),
      gender: "Male",
      member: "Standard",
      address: "Jl. 2",
      image:
        "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      fullName: "user 3",
      username: "user3",
      email: "user3@mail.com",
      password: signPassword("123456789"),
      gender: "Male",
      member: "Standard",
      address: "Jl. 3",
      image:
        "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await queryInterface.bulkInsert("Profiles", profiles, {});

  const user1 = await User.create({
    username: "user1",
    email: "user2@mail.com",
    password: "123456789",
    gender: "Male",
    member: "Standard",
  });

  access_token1 = signToken({ id: 1 });

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
});

afterAll(async () => {
  await queryInterface.bulkDelete("Profiles", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe(`GET /profiles/:id`, () => {
  describe(`Success Running /profiles/:id`, () => {
    test.skip(`GET /profiles/:id/detail`, async () => {
      const { status, body } = await request(app)
        .get("/profiles/1/detail")
        .set("Authorization", `Bearer ${access_token1}`);

      console.log(status);
      console.log(body);
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      // expect(body.user).toHaveProperty("id", expect.any(Number));
      // expect(body.user).toHaveProperty("username", expect.any(String));
      // expect(body.user).toHaveProperty("email", expect.any(String));
      // expect(body.user).toHaveProperty("gender", expect.any(String));
      // expect(body.user).toHaveProperty("member", expect.any(String));
    });
  });

  describe(`Failed Running /profiles`, () => {
    test.skip(`Failed Invalid User`, async () => {
      const { status, body } = await request(app).get("/users/1");

      console.log(status);
      console.log(body);
      expect(status).toBe(401);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Invalid User");
    });

    test(`Failed Invalid Token`, async () => {
      const { status, body } = await request(app)
        .get("/users")
        .set("Authorization", `Bear sfsf`);

      console.log(status);
      console.log(body);
      expect(status).toBe(401);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty(
        "message",
        "Token which you input is invalid Token"
      );
    });

    test.skip(`Failed Invalid Id`, async () => {
      const { status, body } = await request(app)
        .get("/users/90")
        .set("Authorization", `Bearer ${access_token1}`);

      console.log(status);
      console.log(body);
      expect(status).toBe(404);
      expect(body).toBeInstanceOf(Object);
    });
  });
});
