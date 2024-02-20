const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hello world");
});
router.use("/users", require("./user"));
router.use("/profiles", require("./profile"));
router.use("/jobs", require("./job"));
router.use("/my-jobs", require("./myJob"));

module.exports = router;
