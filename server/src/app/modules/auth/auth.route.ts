import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  "/change-pin",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.AGENT, ENUM_USER_ROLE.USER),
  validateRequest(AuthValidation.changePinZodSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
