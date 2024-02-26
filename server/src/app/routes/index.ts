import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

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
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
