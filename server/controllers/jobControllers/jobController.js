const { Op } = require("sequelize");
const axios = require("axios");
class JobController {
  static async showJob(req, res, next) {
    try {
      const { search } = req.query;

      const options = {};

      if (search) {
        options.where = {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const { data } = await axios.request({
        method: "GET",
        url: "https://job-search-api1.p.rapidapi.com/v1/job-description-search",
        params: {
          q: search,
          page: "1",
          country: "id",
          city: "jakarta",
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "job-search-api1.p.rapidapi.com",
        },
      });
      const dataJob = data.jobs;

      res.status(200).json({ dataJob });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JobController;
