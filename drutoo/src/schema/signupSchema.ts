import * as yup from "yup";

export const signupSchema = yup.object().shape({
  profilePicture: yup.mixed().nullable(),
  name: yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
  }),
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  bloodGroup: yup.string().required("Blood group is required"),
  role: yup.string().required("Role is required"),
  address: yup.object().shape({
    division: yup.string().required("Division is required"),
    district: yup.string().required("District is required"),
    upazila: yup.string().required("Upazila is required"),
    union: yup.string().required("Union is required"),
  }),
  nid: yup
    .string()
    .min(10, "Invalid NID number")
    .max(17, "Invalid NID number")
    .required("National ID is required"),
  mobile: yup
    .string()
    .min(11, "Invalid phone number")
    .max(14, "Invalid phone number")
    .required("Phone number is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  pin: yup
    .string()
    .min(4, "Pin must be 4 digits")
    .max(4, "Pin must be 4 digits")
    .required("Pin is required"),
});
