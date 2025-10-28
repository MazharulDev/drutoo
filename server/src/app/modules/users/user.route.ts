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
  fileUploadHelper.upload.single("profilePicture"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = JSON.parse(req.body.data || "{}");
      req.body = {
        data: parsedData,
        profilePicture: req.file?.filename || undefined,
      };
      validateRequest(UserValidation.createUserZodSchema)(req, res, next);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON in 'data' field" });
    }
  },
  (req: Request, res: Response, next: NextFunction) => {
    return UserController.createUser(req, res, next);
  }
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
  fileUploadHelper.upload.single("profilePicture") ||
    fileUploadHelper.upload.none(),
  (req: Request, res: Response, next: NextFunction) => {
    return UserController.updateMyProfile(req, res, next);
  }
);

export const UserRoutes = router;
