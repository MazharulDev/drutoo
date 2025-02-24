import * as yup from "yup";

export const sendOtpSchema = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^\d{11}$/, "Mobile must be exactly 11 digits")
    .required("Mobile is required"),
});
