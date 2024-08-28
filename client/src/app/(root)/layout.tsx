"use client";

import { Layout } from "antd";
import { isLoggedIn } from "@/services/auth.service";
import { Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, userLoggedIn]);

  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }
  return <Layout>{children}</Layout>;
};

export default RootLayout;
