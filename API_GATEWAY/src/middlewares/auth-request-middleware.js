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

// async function checkAuth(req, res, next) {
//   try {
//     console.log(req.headers["x-access-token"]);
//     const response = await UserService.isAuthenticated(
//       req.headers["x-access-token"]
//     );
//     if (response) {
//       console.log("req.body is ", req.body);
//       req.body.userData = response.dataValues; // Add user_id to the request object
//       console.log(req.body.userData);
//       next();
//       console.log("I'm after next");
//     } else {
//       return res
//         .status(StatusCodes.UNAUTHORIZED)
//         .json({ message: "Unauthorized" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
//   }
// }

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    // console.log("Response from checkAtuh :", response);
    if (response) {
      req.user = response; // setting the user id in the req object
      console.log("req.user printing", req.user);
      next();
    }
  } catch (error) {
    console.log(error);
    if (error.statusCode) return res.status(error.statusCode).json(error);
    return res.status(StatusCodes.FORBIDDEN).json(error);
  }
}

async function checkAdmin(req, res, next) {
  try {
    const response = await UserService.isAdmin(req.user.id);
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
    const response = await UserService.isFlightCompany(req.user.id);
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
  const response1 = await UserService.isAdmin(req.user.id);
  const response2 = await UserService.isFlightCompany(req.user.id);
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
