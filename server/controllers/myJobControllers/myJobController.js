const { User, Job, MyJob } = require("../../models/index");

class MyJobController {
  static async showMyJob(req, res, next) {
    try {
      const myJobs = await MyJob.findAll();

      res.status(200).json({ message: "success get all MyJob", myJobs });
    } catch (error) {
      next(error);
    }
  }

  static async createMyJob(req, res, next) {
    try {
      const {
        application_url,
        company_name,
        plain_text_description,
        publication_time,
        source,
        title,
      } = req.body;
      console.log(req.body);

      const myJob = await MyJob.create({
        applicationUrl: application_url,
        companyName: company_name,
        jobDescription: plain_text_description,
        publicationTime: publication_time,
        source: source,
        title: title,
        applyPlain: new Date(),
        UserId: req.user.id,
      });

      res.status(201).json({ message: "success created new MyJob", myJob });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMyJob(req, res, next) {
    try {
      const { id } = req.params;

      const myJob = await MyJob.findByPk(id);

      if (!myJob) throw { name: "InvalidId" };

      await myJob.destroy();

      res.status(200).json({ message: "success deleted MyJob" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyJobController;
