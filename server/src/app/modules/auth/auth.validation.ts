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
export const AuthValidation = {
  loginZodSchema,
};
