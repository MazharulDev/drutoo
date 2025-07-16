"use client";

import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Row } from "antd";

import "../../styles/homePage.css";

import HomeLeft from "@/components/UI/HomePage/HomeLeft";
import HomeRight from "@/components/UI/HomePage/HomeRight";
import { useEffect } from "react";

const HomePage = () => {
  const { userId } = getUserInfo() as any;
  const { data: userData, isLoading } = useProfileQuery(userId);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="min-h-[680px]"
      style={{
        borderRadius: "20px",
        padding: "24px 24px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
      }}
    >
      <Row>
        <Col span={18}>
          <HomeLeft userData={userData} isLoading={isLoading} />
        </Col>
        <Col span={6}>
          <HomeRight userData={userData} />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
