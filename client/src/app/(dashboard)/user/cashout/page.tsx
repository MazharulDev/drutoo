'use client'
import ActionBar from "@/components/UI/ActionBar";
import CashoutPage from "@/components/UI/Cashout";
import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

const Cashout = () => {
    const { userId } = getUserInfo() as any;
  const { data: userData } = useProfileQuery(userId);
  return (
    <div>
      <ActionBar title="Cashout" />
      <CashoutPage userData={userData}/>
    </div>
  );
};

export default Cashout;