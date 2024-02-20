const { showJob } = require("../controllers/jobControllers/jobController");

const router = require("express").Router();

router.get("/", showJob);

module.exports = router;
