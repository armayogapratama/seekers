const {
  showMyJob,
  createMyJob,
  deleteMyJob,
} = require("../controllers/myJobControllers/myJobController");
const authentication = require("../middlewares/authentication");
const {
  authorization,
  authorizationUser,
} = require("../middlewares/authorization");

const router = require("express").Router();

router.get("/", authentication, showMyJob);
router.post("/new-my-job", authentication, createMyJob);
router.delete("/:id/delete", authentication, authorizationUser, deleteMyJob);

module.exports = router;
