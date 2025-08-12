import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiResponse.js";

export const protect = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return apiResponse.error(res, "No token, authorization denied", 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return apiResponse.error(res, "Token is not valid", 401);
  }
};

// Role-based Access Control Middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return apiResponse.error(
        res,
        "Access Denied: Insufficient permissions",
        403
      );
    }
    next();
  };
};
