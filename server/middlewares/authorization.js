const { MyJob } = require("../models/index");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;

    const myJob = await MyJob.findByPk(id);

    if (!myJob) throw { name: "InvalidId" };

    if (req.user.member === "Standard") {
      if (req.user.id !== myJob.UserId) throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function authorizationUser(req, res, next) {
  try {
    if (req.user.member !== "Premium") throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorization,
  authorizationUser,
};
