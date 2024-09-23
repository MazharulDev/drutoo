import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { SystemController } from "./system.controller";
const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.ADMIN), SystemController.systemInfo);

export const SystemRoutes = router;
