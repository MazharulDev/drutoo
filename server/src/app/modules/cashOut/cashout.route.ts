import express from "express";

import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { cashoutController } from "./cashout.controller";
const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.USER), cashoutController.cashout);
export const CashoutRoutes = router;
