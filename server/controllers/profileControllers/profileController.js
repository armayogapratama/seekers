const { User, Profile } = require("../../models/index");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class ProfileController {
  static async detailProfile(req, res, next) {
    try {
      const { id } = req.params;

      const profile = await Profile.findByPk(id);

      if (!profile) throw { name: "InvalidId" };

      res.status(200).json({ message: "success get Profile by Id", profile });
    } catch (error) {
      next(error);
    }
  }

  static async createProfile(req, res, next) {
    try {
      const { id } = req.params;

      const { fullName, address } = req.body;

      const user = await User.findByPk(id);

      if (!user) throw { name: "InvalidId" };

      const profile = await Profile.create({
        fullName,
        username: user.username,
        email: user.email,
        gender: user.gender,
        member: user.member,
        address,
        image:
          "https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2909&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        UserId: req.user.id,
      });

      res.status(201).json({ message: "success get all Profile", profile });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { fullName, username, gender, address } = req.body;

      const profile = await Profile.findByPk(id);

      if (!profile) throw { name: "InvalidId" };

      await profile.update({
        fullName,
        username,
        email: profile.email,
        gender,
        member: profile.member,
        address,
        image: profile.image,
        UserId: req.user.id,
      });

      res.status(200).json({ message: "success update Profile" });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileImage(req, res, next) {
    try {
      const { id } = req.params;

      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "my-job-seeker",
        public_id: originalname,
      });

      const profile = await Profile.findByPk(id);

      if (!profile) throw { name: "InvalidId" };

      const image = result.secure_url;
      await profile.update({ image });

      res.status(200).json({ message: "success update image Profile" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
