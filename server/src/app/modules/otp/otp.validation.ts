import { z } from "zod";

const sendOtpZodSchema = z.object({
  body: z.object({
    mobile: z.string({
      required_error: "Mobile number is required",
    }),
  }),
});

const verifyOtpZodSchema = z.object({
  body: z.object({
    mobile: z.string({
      required_error: "Mobile number is required",
    }),
    otp: z.string(),
  }),
});

const resetPasswordZodSchema = z.object({
  body: z.object({
    mobile: z
      .string({
        required_error: "Mobile number is required",
      })
      .email({
        message: "Invalid email",
      }),
    pin: z.string().min(4).max(100),
  }),
});

export const OtpValidation = {
  sendOtpZodSchema,
  verifyOtpZodSchema,
  resetPasswordZodSchema,
};
