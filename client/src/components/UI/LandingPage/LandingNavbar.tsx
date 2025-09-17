"use client";

import React, { useState } from "react";
import { Layout, Button, Menu, Drawer } from "antd";
import { MenuOutlined, BankOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const LandingNavbar: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleCreateAccountClick = () => {
    router.push("/create-account");
  };

  const menuItems = [
    {
      key: "home",
      label: "Home",
    },
    {
      key: "features",
      label: "Features",
    },
    {
      key: "about",
      label: "About",
    },
    {
      key: "contact",
      label: "Contact",
    },
  ];

  return (
    <Header className="bg-white dark:bg-gray-900 shadow-md px-4 lg:px-8 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <BankOutlined className="text-2xl text-blue-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Drutoo
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Menu
            mode="horizontal"
            items={menuItems}
            className="bg-transparent border-none"
            style={{ minWidth: 0, flex: "auto" }}
          />
          <div className="flex items-center space-x-4">
            <Button
              type="default"
              onClick={handleLoginClick}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={handleCreateAccountClick}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className="text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <BankOutlined className="text-xl text-blue-600" />
            <span className="text-lg font-bold">Drutoo</span>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={drawerVisible}
        width={280}
      >
        <div className="flex flex-col space-y-4">
          <Menu
            mode="vertical"
            items={menuItems}
            className="border-none"
          />
          <div className="flex flex-col space-y-3 pt-4 border-t">
            <Button
              type="default"
              onClick={handleLoginClick}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              block
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={handleCreateAccountClick}
              className="bg-blue-600 hover:bg-blue-700"
              block
            >
              Get Started
            </Button>
          </div>
        </div>
      </Drawer>
    </Header>
  );
};

export default LandingNavbar;
