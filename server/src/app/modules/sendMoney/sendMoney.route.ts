import express from "express";
import { sendMoneyController } from "./sendMoney.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

router.post(
  "/send-money",
  auth(ENUM_USER_ROLE.USER),
  sendMoneyController.sendMoney
);
export const SendMoneyRoutes = router;
