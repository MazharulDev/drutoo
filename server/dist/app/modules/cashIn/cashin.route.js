"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashinRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const cashin_controller_1 = require("./cashin.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.AGENT), cashin_controller_1.cashinController.cashin);
exports.CashinRoutes = router;
