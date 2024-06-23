import express from "express";
import checkAuthMiddleware from "../middleware/check-auth.middleware";
import {
  login,
  getProfile,
  register,
} from "../controllers/authentication.controller";

const authenticationRouter = express.Router();

authenticationRouter.post("/register", register);

authenticationRouter.post("/login", login);

authenticationRouter.get("/profile", checkAuthMiddleware, getProfile);

export default authenticationRouter;
