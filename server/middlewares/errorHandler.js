function errorHandler(error, req, res, next) {
  console.log(error);
  console.log(error.name);
  let status = 500;
  let message = "Internal server error";

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors.map((err) => err.message);
      break;
    case "EmptyEmailPassword":
      status = 400;
      message = "Email/Password can not be empty";
      break;
    case "JsonWebTokenError":
    case "InvalidToken":
      status = 401;
      message = "Token which you input is invalid Token";
      break;
    case "InvalidUser":
      status = 401;
      message = "Invalid User";
      break;
    case "Forbidden":
      status = 403;
      message = "You do not have permission";
      break;
    case "InvalidId":
      status = 404;
      message = "Data not found";
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
