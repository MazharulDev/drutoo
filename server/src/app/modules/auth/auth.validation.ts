import { z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    mobile: z.string({
      required_error: "mobile number is required",
    }),
    pin: z.string({
      required_error: "Pin is required",
    }),
  }),
});
const changePinZodSchema = z.object({
  body: z.object({
    oldPin: z
      .string({
        required_error: "Old pin is required",
      })
      .min(4)
      .max(4),
    newPin: z
      .string({
        required_error: "New pin is required",
      })
      .min(4)
      .max(4),
  }),
});
export const AuthValidation = {
  loginZodSchema,
  changePinZodSchema,
};
