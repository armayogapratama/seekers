const {
  register,
  login,
  upgradeMember,
  googleLogin,
  allUser,
  detailUser,
} = require("../controllers/userControllers/userController");
const authentication = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.get("/", authentication, allUser);
router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/:id", authentication, detailUser);
router.patch("/:id/upgrade", authentication, upgradeMember);

module.exports = router;
