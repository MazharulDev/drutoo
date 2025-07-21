"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const rateLimit_1 = __importDefault(require("../../../lib/rateLimit"));
const router = express_1.default.Router();
const authRateLimit = (0, rateLimit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        error: "Too many requests, please try again later.",
    },
});
router.post("/login", authRateLimit, (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.AuthController.loginUser);
router.post("/change-pin", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.AGENT, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePinZodSchema), auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
