import * as yup from "yup";

export const changePinSchema = yup.object().shape({
  oldPin: yup
    .string()
    .matches(/^\d{4}$/, "Old PIN must be exactly 4 digits")
    .required("Old PIN is required"),
  newPin: yup
    .string()
    .matches(/^\d{4}$/, "New PIN must be exactly 4 digits")
    .notOneOf([yup.ref("oldPin")], "New PIN must be different from the old PIN")
    .required("New PIN is required"),
  confirmPin: yup
    .string()
    .oneOf([yup.ref("newPin")], "Confirm PIN must match new PIN")
    .required("Confirm PIN is required"),
});
