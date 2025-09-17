"use client";

import React from "react";
import { Layout } from "antd";
import LandingNavbar from "./LandingNavbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";

const { Content } = Layout;

const LandingPage: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <LandingNavbar />
      <Content>
        <HeroSection />
        <FeaturesSection />
      </Content>
      <Footer />
    </Layout>
  );
};

export default LandingPage;
