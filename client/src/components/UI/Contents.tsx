"use client";

import { Layout } from "antd";
import Header from "./Header";
const { Content } = Layout;
import { useTheme } from "@/contexts/ThemeContext";

const Contents = ({ children }: { children: React.ReactNode }) => {
  const { themeMode } = useTheme();

  return (
    <Content
      style={{
        minHeight: "100vh",
        color: themeMode === "dark" ? "white" : "black",
        overflowX: "auto",
      }}
    >
      <Header />
      <div
        className="min-h-[680px]"
        style={{
          backgroundColor: themeMode === "dark" ? "#001529" : "#f5f5f5",
          border: themeMode === "dark" ? "1px solid #434343" : "1px solid #f5f5f5",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default Contents;
