import * as yup from "yup";

export const changePinSchema = yup.object().shape({
  pin: yup
    .string()
    .min(4, "Pin number must have 4 digit")
    .max(4, "Pin number must have 4 digit")
    .required("Pin number is required"),
});
