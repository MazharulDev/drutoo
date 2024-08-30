"use client";

import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

const HomePage = () => {
  const { userId } = getUserInfo() as any;
  const { data: userData } = useProfileQuery(userId);
  console.log(userData);
  return (
    <div
      className="min-h-[680px]"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        padding: "24px 24px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
      }}
    >
      <h1 className="text-2xl font-bold">Hello, {userData?.name}</h1>
      <p className="text-xl">Welcome back!</p>
    </div>
  );
};

export default HomePage;
