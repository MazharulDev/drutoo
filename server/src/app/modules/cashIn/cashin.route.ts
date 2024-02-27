import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { cashinController } from "./cashin.controller";
const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.AGENT), cashinController.cashin);

export const CashinRoutes = router;
