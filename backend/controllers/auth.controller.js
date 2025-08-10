import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";

//Register user
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return apiResponse.error(res, "User already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return apiResponse.success(res, newUser, "User registered Successfully");
  } catch (error) {
    return apiResponse.error(res, "Registration  Failed", 500);
  }
};

//Login User
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return apiResponse.error(res, "Invalid credentials", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return apiResponse.error(res, "Invalid Credentials");

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token, user: { name: user.name, role: user.role } });
  } catch (error) {
    return apiResponse.error(res, "Login Failed", 500);
  }
};
