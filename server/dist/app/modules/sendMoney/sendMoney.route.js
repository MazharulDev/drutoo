"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMoneyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const sendMoney_controller_1 = require("./sendMoney.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post("/send-money", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), sendMoney_controller_1.sendMoneyController.sendMoney);
exports.SendMoneyRoutes = router;
