import * as yup from "yup";

export const sendOtpSchema = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^\d{11}$/, "Mobile must be exactly 11 digits")
    .required("Mobile is required"),
});

export const resetPinSchema = yup.object().shape({
  pin: yup
    .string()
    .required("Pin is required")
    .matches(/^\d{4}$/, "Pin must be exactly 4 digits"),
  confirmPin: yup
    .string()
    .required("Confirm Pin is required")
    .matches(/^\d{4}$/, "Confirm Pin must be exactly 4 digits")
    .oneOf([yup.ref("pin")], "Confirm Pin must match new PIN"),
});
