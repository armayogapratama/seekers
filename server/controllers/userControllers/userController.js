const { verifyPassword } = require("../../helpers/hashPassword");
const { signToken } = require("../../helpers/jwt");
const { User, Profile } = require("../../models/index");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async allUser(req, res, next) {
    try {
      const users = await User.findAll();

      res.status(200).json({ users });
    } catch (error) {
      next();
    }
  }

  static async detailUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) throw { name: "InvalidId" };

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, gender } = req.body;

      const user = await User.create({
        username,
        email,
        password,
        gender,
        member: "Standard",
      });

      res.status(201).json({
        message: "success create new user",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          gender: user.gender,
          member: user.member,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "EmptyEmailPassword" };

      const user = await User.findOne({ where: { email } });

      if (!user || !verifyPassword(password, user.password))
        throw { name: "InvalidUser" };

      const access_token = signToken({ id: user.id });

      res.status(201).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let { google_token } = req.headers;

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { name, email } = ticket.getPayload();

      const user = await User.findOne({ where: { email: email } });
      if (user) {
        const access_token = signToken({ id: user.id });

        res.status(201).json({ access_token });
      } else {
        const newUser = await User.create(
          {
            username: name,
            email: email,
            password: String(Math.random()),
            gender: "Male",
            member: "Standard",
          },
          {
            hooks: false,
          }
        );
        console.log(newUser);
        const access_token = signToken({ id: newUser.id });

        res.status(201).json({ access_token });
      }
    } catch (error) {
      next(error);
    }
  }

  static async upgradeMember(req, res, next) {
    try {
      const { userId } = req.params;
      const { profileId } = req.params;

      const user = await User.findByPk(userId);

      if (!user) throw { name: "InvalidUser" };

      await user.update({ member: "Premium" });

      const profile = await Profile.findByPk(profileId);

      if (!profile) throw { name: "InvalidId" };

      await profile.update({ member: "Premium" });

      res.status(200).json({ message: "Success upgrade to premium member" });
    } catch (error) {
      next();
    }
  }
}

module.exports = UserController;
