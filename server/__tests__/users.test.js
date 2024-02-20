const request = require("supertest");
const app = require("../app");

const { sequelize, User } = require("../models/index");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");
const { signPassword } = require("../helpers/hashPassword");

const user1 = {
  email: "user1@mail.com",
  password: "123456789",
};

const user2 = {
  email: "user2@mail.com",
  password: "123456789",
};

const user3 = {
  email: "user3@mail.com",
  password: "123456789",
};

const user4 = {
  email: "user4@mail.com",
  password: "123456789",
};

const user5 = {
  email: "user5@mail.com",
  password: "123456789",
};

const user6 = {
  email: "user5@mail.com",
  password: "123456789",
};

let access_token1;
let access_token2;
let access_token3;
let access_token4;
let access_token5;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        username: "user1",
        email: user1.email,
        password: signPassword(user1.password),
        gender: "Male",
        member: "Standard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user2",
        email: user2.email,
        password: signPassword(user2.password),
        gender: "Female",
        member: "Standard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user3",
        email: user3.email,
        password: signPassword(user3.password),
        gender: "Female",
        member: "Standard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user4",
        email: user4.email,
        password: signPassword(user4.password),
        gender: "Female",
        member: "Standard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );

  const user6 = await User.create({
    username: "user6",
    email: "user6@mail.com",
    password: "123456789",
    gender: "Male",
    member: "Standard",
  });

  access_token1 = signToken({ id: 1 });

  const user7 = await User.create({
    username: "user7",
    email: "user7@mail.com",
    password: "123456789",
    gender: "Female",
    member: "Standard",
  });

  access_token2 = signToken({ id: user7.id });

  const user8 = await User.create({
    username: "user8",
    email: "user8@mail.com",
    password: "123456789",
    gender: "Female",
    member: "Standard",
  });

  access_token3 = signToken({ id: user2.id });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe(`/users/login`, () => {
  describe(`Success Running /users/login`, () => {
    test(`POST /users/login`, async () => {
      const { status, body } = await request(app)
        .post("/users/login")
        .send(user1);

      expect(status).toBe(201);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe(`Failed Running /users/login`, () => {
    test(`Failed Login with unregister account`, async () => {
      const { status, body } = await request(app)
        .post("/users/login")
        .send(user5);

      expect(status).toBe(401);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Invalid User");
    });

    test(`Failed Login with empty email`, async () => {
      const { status, body } = await request(app)
        .post("/users/login")
        .send({ email: "", password: "123456789" });

      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Email/Password can not be empty");
    });

    test(`Failed Login with empty password`, async () => {
      const { status, body } = await request(app)
        .post("/users/login")
        .send({ email: "user1@mail.com", password: "" });

      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Email/Password can not be empty");
    });

    test(`Failed Login with invalid password`, async () => {
      const { status, body } = await request(app)
        .post("/users/login")
        .send({ email: "user1@mail.com", password: "123456" });

      expect(status).toBe(401);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Invalid User");
    });
  });
});

describe(`/users/register`, () => {
  describe(`Success running /users/register`, () => {
    test(`Success /users/register`, async () => {
      const { status, body } = await request(app).post("/users/register").send({
        username: "user9",
        email: "user9@mail.com",
        password: "123456789",
        gender: "Female",
        member: "Standard",
      });

      console.log(status);
      console.log(body);
      expect(status).toBe(201);
      expect(body).toBeInstanceOf(Object);
      expect(body.user).toHaveProperty("username", expect.any(String));
      expect(body.user).toHaveProperty("email", expect.any(String));
      expect(body.user).not.toHaveProperty("password", expect.any(String));
      expect(body.user).toHaveProperty("gender", expect.any(String));
      expect(body.user).toHaveProperty("member", expect.any(String));
    });
  });

  describe(`Failed /users/register`, () => {
    test(`Failed username empty`, async () => {
      const { status, body } = await request(app).post("/users/register").send({
        username: "",
        email: "user1@mail.com",
        password: "123456789",
        gender: "Male",
        member: "Standard",
      });

      console.log(status);
      console.log(body);
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", ["username is required"]);
    });

    test(`Failed email empty`, async () => {
      const { status, body } = await request(app).post("/users/register").send({
        username: "user1",
        email: "",
        password: "123456789",
        gender: "Male",
        member: "Standard",
      });

      console.log(status);
      console.log(body);
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", [
        "email is required",
        "email must be email format",
      ]);
    });

    test(`Failed password empty`, async () => {
      const { status, body } = await request(app).post("/users/register").send({
        username: "user1",
        email: "user1@mail.com",
        password: "",
        gender: "Male",
        member: "Standard",
      });

      console.log(status);
      console.log(body);
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", [
        "password is required",
        "password must be minimum 8 characters",
      ]);
    });

    test(`Failed invalid email`, async () => {
      const { status, body } = await request(app).post("/users/register").send({
        username: "user1",
        // email: "user1@mail.com",
        password: "123456789",
        gender: "Male",
        member: "Standard",
      });

      console.log(status);
      console.log(body);
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", ["email is required"]);
    });

    test(`Failed invalid password`, async () => {
      const { status, body } = await request(app).post("/users/register").send({
        username: "user1",
        email: "user1@mail.com",
        // password: "123456789",
        gender: "Male",
        member: "Standard",
      });

      console.log(status);
      console.log(body);
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", ["password is required"]);
    });

    test(`Failed unique email`, async () => {
      const { status, body } = await request(app).post("/users/register").send({
        username: "user1",
        email: "user1@mail.com",
        password: "123456789",
        gender: "Male",
        member: "Standard",
      });

      console.log(status);
      console.log(body);
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", [
        "email has been used. Email must be unique",
      ]);
    });

    test(`Failed email format`, async () => {
      const { status, body } = await request(app).post("/users/register").send({
        username: "user1",
        email: "user1@mail",
        password: "123456789",
        gender: "Male",
        member: "Standard",
      });

      console.log(status);
      console.log(body);
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", ["email must be email format"]);
    });
  });
});

describe(`/users/:id/delete`, () => {
  describe(`Success Running /users/:id/delete`, () => {
    test(`DELETE /users/:id/delete`, async () => {
      const { status, body } = await request(app)
        .delete("/users/2/delete")
        .set("Authorization", `Bearer ${access_token2}`);

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Success delete user");
    });
  });

  describe(`Failed Running /users/:id/delete`, () => {
    test(`Failed Invalid User`, async () => {
      const { status, body } = await request(app).delete("/users/2/delete");

      console.log(status);
      console.log(body);
      expect(status).toBe(401);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Invalid User");
    });

    test(`Failed Invalid User by Id`, async () => {
      const { status, body } = await request(app)
        .delete("/users/19/delete")
        .set("Authorization", `Bearer ${access_token2}`);

      console.log(status);
      console.log(body);
      expect(status).toBe(404);
      expect(body).toBeInstanceOf(Object);
    });
  });
});

describe(`GET /users`, () => {
  describe(`Success Running /users`, () => {
    test(`GET /users/`, async () => {
      const { status, body } = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${access_token1}`);

      console.log(status);
      console.log(body);
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body.users[0]).toHaveProperty("id", expect.any(Number));
      expect(body.users[0]).toHaveProperty("username", expect.any(String));
      expect(body.users[0]).toHaveProperty("email", expect.any(String));
      expect(body.users[0]).toHaveProperty("gender", expect.any(String));
      expect(body.users[0]).toHaveProperty("member", expect.any(String));
    });
  });

  describe(`Failed Running /users`, () => {
    test(`Failed Invalid User`, async () => {
      const { status, body } = await request(app).get("/users");

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
  });
});

describe(`GET /users/:id`, () => {
  describe(`Success Running /users/:id`, () => {
    test(`GET /users/`, async () => {
      const { status, body } = await request(app)
        .get("/users/1")
        .set("Authorization", `Bearer ${access_token1}`);

      console.log(status);
      console.log(body);
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body.user).toHaveProperty("id", expect.any(Number));
      expect(body.user).toHaveProperty("username", expect.any(String));
      expect(body.user).toHaveProperty("email", expect.any(String));
      expect(body.user).toHaveProperty("gender", expect.any(String));
      expect(body.user).toHaveProperty("member", expect.any(String));
    });
  });

  describe(`Failed Running /users`, () => {
    test(`Failed Invalid User`, async () => {
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

    test(`Failed Invalid Id`, async () => {
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
