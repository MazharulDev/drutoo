import * as yup from "yup";

export const loginSchema = yup.object().shape({
  mobile: yup
    .string()
    .min(11, "Invalid phone number")
    .max(14, "Invalid phone number")
    .required("Phone number is required"),
  pin: yup
    .string()
    .min(4, "Pin must be 4 digits")
    .max(4, "Pin must be 4 digits")
    .required("Pin is required"),
});
