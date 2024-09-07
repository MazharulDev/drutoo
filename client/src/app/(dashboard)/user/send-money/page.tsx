"use client";
import ActionBar from "@/components/UI/ActionBar";
import SendMoneyPage from "@/components/UI/SendMoney";
import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

const SendMoney = () => {
  const { userId } = getUserInfo() as any;
  const { data: userData } = useProfileQuery(userId);
  return (
    <div>
      <ActionBar title="Send Money" />
      <SendMoneyPage userData={userData} />
    </div>
  );
};

export default SendMoney;
