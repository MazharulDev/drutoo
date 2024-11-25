"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const otp_controller_1 = require("./otp.controller");
const otp_validation_1 = require("./otp.validation");
const router = express_1.default.Router();
// Routes
router.post("/send-otp", (0, validateRequest_1.default)(otp_validation_1.OtpValidation.sendOtpZodSchema), otp_controller_1.OtpController.sendOtp);
router.post("/verify-otp", (0, validateRequest_1.default)(otp_validation_1.OtpValidation.verifyOtpZodSchema), otp_controller_1.OtpController.verifyOtp);
router.post("/reset-pin", (0, validateRequest_1.default)(otp_validation_1.OtpValidation.resetPasswordZodSchema), otp_controller_1.OtpController.resetPin);
exports.OtpRoutes = router;
