import config from "../../../config";
import { System } from "../system/system.model";
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

export const findLastSystemBalance = async (): Promise<number | undefined> => {
  const lastBalance = await System.findOne(
    { name: "systemAmount" },
    { amount: 1, _id: 0 }
  ).lean();

  return lastBalance?.amount;
};

export const AddSystemBalance = async (increment: number): Promise<number> => {
  const currentBalance = await findLastSystemBalance();
  const incrementedBalance = (currentBalance as number) + increment;
  return incrementedBalance;
};
