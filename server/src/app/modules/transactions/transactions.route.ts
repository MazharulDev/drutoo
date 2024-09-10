import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.USER),
);
export const TransactionRoutes = router;