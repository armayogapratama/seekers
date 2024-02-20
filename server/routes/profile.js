const {
  detailProfile,
  createProfile,
  updateProfile,
  updateProfileImage,
} = require("../controllers/profileControllers/profileController");
const multer = require("multer");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/:id/new-profile", authentication, createProfile);
router.get("/:id/detail", authentication, detailProfile);
router.put("/:id/update", authentication, updateProfile);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.patch(
  "/:id/update-profile-image",
  authentication,
  upload.single("image"),
  updateProfileImage
);

module.exports = router;
