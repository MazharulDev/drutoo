"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const sendMoney_route_1 = require("../modules/sendMoney/sendMoney.route");
const cashout_route_1 = require("../modules/cashOut/cashout.route");
const cashin_route_1 = require("../modules/cashIn/cashin.route");
const router = express_1.default.Router();
const modulesRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/login",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/money",
        route: sendMoney_route_1.SendMoneyRoutes,
    },
    {
        path: "/cashout",
        route: cashout_route_1.CashoutRoutes,
    },
    {
        path: "/cashin",
        route: cashin_route_1.CashinRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
