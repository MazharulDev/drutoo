import express from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

router.post(
  "/create-user",
  // validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get("/filter", auth(ENUM_USER_ROLE.ADMIN), UserController.agents);
router.patch(
  "/update/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateAgentStatus
);
router.get(
  "/profile/:mobile",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.AGENT),
  UserController.singleUser
);

export const UserRoutes = router;
