const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

const { UserService } = require("../services");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Email data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Password not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    console.log(req.headers["x-access-token"]);
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (response) {
      console.log("response verified jwt :", response);
      req.user = response; // Add user_id to the request object
      next();
      console.log("I'm after next");
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
}

async function checkAdmin(req, res, next) {
  try {
    const response = await UserService.isAdmin(req.user);
    if (response) {
      next();
    }
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "User not authorized to perform the action" });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
}

async function checkFlightCompany(req, res, next) {
  try {
    const response = await UserService.isFlightCompany(req.user);
    if (response) {
      next();
    }
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "User not authorized to perform the action" });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
}

function validateAddRoleRequest(req, res, next) {
  if (!req.body.role) {
    ErrorResponse.message = "Failed to add a role to the user";
    ErrorResponse.error = new AppError(
      ["The Role was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.id) {
    ErrorResponse.message = "Failed to add a role to the user";
    ErrorResponse.error = new AppError(
      ["The User ID was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkRights(req, res, next) {
  const response1 = await UserService.isAdmin(req.user);
  const response2 = await UserService.isFlightCompany(req.user);
  console.log(req.method, response1, response2);
  if (req.method === "GET" || response1 || response2) {
    return next();
  } else {
    // Deny access for non-admin users trying to perform create, update or delete operations
    ErrorResponse.message = "Access denied";
    ErrorResponse.explanation = "User is not authorized to perform this action";
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Access denied" });
  }
}

module.exports = {
  validateAuthRequest,
  checkAuth,
  checkAdmin,
  checkFlightCompany,
  validateAddRoleRequest,
  checkRights,
};
