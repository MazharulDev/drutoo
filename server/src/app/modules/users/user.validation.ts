import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    mobile: z.string({ required_error: "Mobile Number is require" }),
    pin: z.string({ required_error: "Pin is required" }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    nid: z.string({ required_error: "National Id is required" }),
    role: z.string().optional(),
    status: z.string().optional(),
    balance: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
