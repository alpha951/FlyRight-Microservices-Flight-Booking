const { StatusCodes } = require("http-status-codes");

const { UserRepository, RoleRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const bcrypt = require("bcrypt");

const {
  checkPassword,
  createToken,
  verifyToken,
} = require("../utils/common/auth");
const { ROLE } = require("../utils/common/enums");
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = ROLE;

const userRepo = new UserRepository();
const roleRepo = new RoleRepository();

async function create(data) {
  try {
    const user = await userRepo.create(data);
    const role = await roleRepo.getRoleByName(CUSTOMER);
    // addRole method comes from many-many association : Refer https://medium.com/@julianne.marik/sequelize-associations-magic-methods-c72008db91c9
    user.addRole(role);
    return user;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    throw new AppError(
      "Cannot create a new User Object!",
      StatusCodes.INTERNAL_SERVER_ERROR
    ); // Or else send server-related status code
  }
}

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("User not found!", StatusCodes.NOT_FOUND);
    }
    const isPasswordValid = checkPassword(data.password, user.password);
    console.log(isPasswordValid);
    console.log(data.password, user.password);
    if (isPasswordValid == false) {
      throw new AppError("Invalid password!", StatusCodes.BAD_REQUEST);
    }
    const token = createToken({ id: user.id, email: user.email });
    return token;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("Token is required!", StatusCodes.BAD_REQUEST);
    }

    const response = verifyToken(token);
    console.log(response);
    const user = await userRepo.get(response.id);
    if (!user) {
      throw new AppError("User not found!", StatusCodes.NOT_FOUND);
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid token!", StatusCodes.BAD_REQUEST);
    }
    if (error.name == "TokenExpiredError") {
      throw new AppError("Token expired!", StatusCodes.BAD_REQUEST);
    }
  }
}

async function addRoleToUser(data) {
  try {
    const user = await userRepo.get(data.id);
    if (!user) {
      throw new AppError("User not found!", StatusCodes.NOT_FOUND);
    }
    const role = await roleRepo.getRoleByName(data.role);
    if (!role) {
      throw new AppError("Role not found!", StatusCodes.NOT_FOUND);
    }
    user.addRole(role);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong while adding role to the user!",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAdmin(id) {
  try {
    const user = await userRepo.get(id);
    if (!user) {
      throw new AppError("User not found!", StatusCodes.NOT_FOUND);
    }
    const adminrole = await roleRepo.getRoleByName(ADMIN);
    if (!adminrole) {
      throw new AppError("Admin role not found!", StatusCodes.NOT_FOUND);
    }
    return user.hasRole(adminrole);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw error;
  }
}

async function isFlightCompany(id) {
  try {
    const user = await userRepo.get(id);
    if (!user) {
      throw new AppError(
        "For the given id, no users were found",
        StatusCodes.NOT_FOUND
      );
    }
    const flight_companyrole = await roleRepo.getRoleByName(FLIGHT_COMPANY);

    return user.hasRole(flight_companyrole); // hasRole() is a magic method inside sequelize | LINK -> https://medium.com/@julianne.marik/sequelize-associations-magic-methods-c72008db91c9
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "INTERNAL SERVER ERROR | Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  create,
  signin,
  isAuthenticated,
  isAdmin,
  addRoleToUser,
  isFlightCompany,
};
