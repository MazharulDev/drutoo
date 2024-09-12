import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { TransactionController } from "./transactions.controller";
const router = express.Router();

router.get(
  "/:number",
  auth(ENUM_USER_ROLE.USER), TransactionController.myTransaction
);
export const TransactionRoutes = router;