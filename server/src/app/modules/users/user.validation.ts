import { z } from "zod";

const nameSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3)
    .max(20)
    .regex(/^[A-Za-z\s]+$/, {
      message: "First name can only contain letters and spaces",
    }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3)
    .max(20)
    .regex(/^[A-Za-z\s]+$/, {
      message: "Last name can only contain letters and spaces",
    }),
});

const addressSchema = z.object({
  division: z.string({ required_error: "Division is required" }),
  district: z.string({ required_error: "District is required" }),
  upazila: z.string({ required_error: "Upazila is required" }),
  union: z.string({ required_error: "Union is required" }),
});

const createUserZodSchema = z.object({
  body: z.object({
    data: z.object({
      name: nameSchema,
      mobile: z
        .string({ required_error: "Mobile Number is required" })
        .length(11),
      pin: z.string({ required_error: "Pin is required" }),
      email: z.string({ required_error: "Email is required" }).email(),
      nid: z
        .string({ required_error: "National Id is required" })
        .min(10)
        .max(13),
      dateOfBirth: z.string({ required_error: "Date of birth is required" }),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        required_error: "Blood group is required",
      }),
      gender: z.string({ required_error: "Gender is required" }),
      address: addressSchema,
      role: z.string(),
      status: z.string().optional(),
      balance: z.number().optional(),
    }),
    profilePicture: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
