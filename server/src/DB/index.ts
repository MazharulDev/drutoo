import { User } from "../app/modules/users/user.model";
import config from "../config";

const superUser = {
  name: {
    firstName: "Md Mazharul",
    lastName: "Islam",
  },
  mobile: config.adminId,
  email: "mdmazharulislam.dev@gmail.com",
  pin: config.adminPin,
  nid: "1234567890",
  dateOfBirth: "1995-05-05",
  address: {
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Dhaka",
    union: "Dhaka",
  },
  role: "admin",
  status: "active",
  bloodGroup: "A+",
  gender: "Male",
  balance: 0,
  profilePicture: "",
};

const seedAdmin = async () => {
  //when database is connected, we will check is there any user who is admin
  const isAdminExits = await User.findOne({ role: "admin" });
  if (!isAdminExits) {
    await User.create(superUser);
  }
};

export default seedAdmin;
