"use client";

import { Layout } from "antd";
import { isLoggedIn } from "@/services/auth.service";
import { Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideBar from "@/components/UI/SideBar";
import Contents from "@/components/UI/Contents";
import Loading from "../loading";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import Offline from "../Offline";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOnline } = useNetworkStatus();
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, userLoggedIn]);

  if (!isLoading) {
    return <Loading />;
  }
  return (
    <Layout hasSider>
      {isOnline ? (
        <>
          <SideBar />
          <Contents>{children}</Contents>
        </>
      ) : (
        <Offline />
      )}
    </Layout>
  );
};

export default RootLayout;
