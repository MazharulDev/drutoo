"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const transactions_controller_1 = require("./transactions.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.AGENT, user_1.ENUM_USER_ROLE.ADMIN), transactions_controller_1.TransactionController.myTransaction);
exports.TransactionRoutes = router;
