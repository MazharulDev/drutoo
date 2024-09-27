import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OtpController } from "./otp.controller";
import { OtpValidation } from "./otp.validation";
const router = express.Router();

// Routes
router.post(
  "/send-otp",
  validateRequest(OtpValidation.sendOtpZodSchema),
  OtpController.sendOtp
);

router.post(
  "/verify-otp",
  validateRequest(OtpValidation.verifyOtpZodSchema),
  OtpController.verifyOtp
);
router.post(
  "/reset-pin",
  validateRequest(OtpValidation.resetPasswordZodSchema),
  OtpController.resetPin
);

export const OtpRoutes = router;
