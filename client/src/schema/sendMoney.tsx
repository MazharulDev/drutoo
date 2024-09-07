import * as yup from "yup";

export const sendMoneySchema = yup.object().shape({
  receivedId: yup.string().required("Received number is required"),
  amount: yup.string().required("Amount is required"),
  pin: yup.string().required("Pin is required"),
});
