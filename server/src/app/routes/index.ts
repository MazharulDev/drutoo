import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { SendMoneyRoutes } from "../modules/sendMoney/sendMoney.route";
import { CashoutRoutes } from "../modules/cashOut/cashout.route";
import { CashinRoutes } from "../modules/cashIn/cashin.route";
import { TransactionRoutes } from "../modules/transactions/transactions.route";
import { SystemRoutes } from "../modules/system/system.route";
import { OtpRoutes } from "../modules/otp/otp.route";
import { AddressDataRoutes } from "../modules/AddressData/addressData.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/money",
    route: SendMoneyRoutes,
  },
  {
    path: "/cashout",
    route: CashoutRoutes,
  },
  {
    path: "/cashin",
    route: CashinRoutes,
  },
  {
    path: "/transactions",
    route: TransactionRoutes,
  },
  {
    path: "/system",
    route: SystemRoutes,
  },
  {
    path: "/otp",
    route: OtpRoutes,
  },
  {
    path: "/address-data",
    route: AddressDataRoutes,
  },
  {
    path: "*",
    route: express
      .Router()
      .get("/", (_req, res) =>
        res.status(404).json({ message: "Page not found" })
      ),
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
