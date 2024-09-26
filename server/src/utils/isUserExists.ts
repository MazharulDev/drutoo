/* eslint-disable @typescript-eslint/no-explicit-any */

export const isUserExist = async function (mobile: string, UserDb: any) {
  return await UserDb.findOne(
    { mobile: mobile, status: "active" },
    { _id: 1, pin: 1, status: 1, email: 1, role: 1, mobile: 1 }
  ).lean();
};
