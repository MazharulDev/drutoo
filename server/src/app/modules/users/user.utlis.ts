import config from "../../../config";
import { User } from "./user.model";

export const findLastAdminBalance = async (): Promise<number | undefined> => {
  const adminId = config.adminId;
  const lastBalance = await User.findOne(
    { mobile: adminId },
    { balance: 1, _id: 0 }
  ).lean();

  return lastBalance?.balance;
};

export const AddAdminBalance = async (increment: number): Promise<number> => {
  const currentBalance = await findLastAdminBalance();
  const incrementedBalance = (currentBalance as number) + increment;
  return incrementedBalance;
};
