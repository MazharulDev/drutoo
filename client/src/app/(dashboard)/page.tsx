"use client";

import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Row } from "antd";

import "../../styles/homePage.css";

import HomeLeft from "@/components/UI/HomePage/HomeLeft";
import HomeRight from "@/components/UI/HomePage/HomeRight";

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
      <Row>
        <Col span={18}>
          <HomeLeft userData={userData} />
        </Col>
        <Col span={6}>
          <HomeRight userData={userData} />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
