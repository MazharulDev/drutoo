"use client";
import ActionBar from "@/components/UI/ActionBar";
import CashinPage from "@/components/UI/Cashin";
import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

const CashInPage = () => {
  const { userId } = getUserInfo() as any;
  const { data: userData } = useProfileQuery(userId);
  return (
    <div>
      <ActionBar title="Cash In" />
      <CashinPage userData={userData} />
    </div>
  );
};

export default CashInPage;
