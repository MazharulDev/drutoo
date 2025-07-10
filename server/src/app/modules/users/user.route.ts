import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";
const router = express.Router();

router.post(
  "/create-user",
  // validateRequest(UserValidation.createUserZodSchema),
  fileUploadHelper.upload.single("profilePicture"),
  (req: Request, res: Response, next: NextFunction) => {
    return UserController.createUser(req, res, next);
  }
  // UserController.createUser
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

router.patch(
  "/update-my-profile/:mobile",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.AGENT),
  UserController.updateMyProfile
);

export const UserRoutes = router;
