"use client";
import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const HomePage = () => {
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(userId);
  return (
    <div>
      <h2 className="text-4xl">This is home page</h2>
    </div>
  );
};

export default HomePage;
