const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authentication(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) throw { name: "InvalidUser" };

    const [bearer, access_token] = token.split(" ");

    if (bearer !== "Bearer") throw { name: "InvalidToken" };

    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) throw { name: "InvalidId" };

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      member: user.member,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
