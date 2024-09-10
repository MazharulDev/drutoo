import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { SendMoneyRoutes } from "../modules/sendMoney/sendMoney.route";
import { CashoutRoutes } from "../modules/cashOut/cashout.route";
import { CashinRoutes } from "../modules/cashIn/cashin.route";
import { TransactionRoutes } from "../modules/transactions/transactions.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/login",
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
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
