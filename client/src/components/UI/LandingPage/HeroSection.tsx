"use client";

import React from "react";
import { Button, Row, Col, Typography } from "antd";
import {
  ArrowRightOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/create-account");
  };

  const handleLearnMore = () => {
    // Scroll to features section
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="text-center lg:text-left">
              <Title
                level={1}
                className="hero-title text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 fade-in-up"
              >
                Banking Made <span className="gradient-text">Simple</span> &{" "}
                <span className="gradient-text">Secure</span>
              </Title>

              <Paragraph className="hero-subtitle text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed fade-in-up">
                Experience the future of digital banking with Drutoo. Send
                money, manage your finances, and stay in control with our
                trusted online banking platform.
              </Paragraph>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button
                  type="primary"
                  size="large"
                  onClick={handleGetStarted}
                  className="btn-primary-custom bg-blue-600 hover:bg-blue-700 border-blue-600 h-12 px-8 text-lg font-semibold"
                  icon={<ArrowRightOutlined />}
                >
                  Get Started Free
                </Button>
                <Button
                  type="default"
                  size="large"
                  onClick={handleLearnMore}
                  className="h-12 px-8 text-lg font-semibold border-gray-300 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <SafetyOutlined className="text-green-500" />
                  <span>Bank-level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThunderboltOutlined className="text-yellow-500" />
                  <span>Instant Transfers</span>
                </div>
                <div className="flex items-center gap-2">
                  <GlobalOutlined className="text-blue-500" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className="relative">
              {/* Hero Image/Illustration */}
              <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl p-8 lg:p-12 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">D</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            Drutoo Wallet
                          </div>
                          <div className="text-sm text-gray-500">
                            Your Digital Bank
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          $12,450.00
                        </div>
                        <div className="text-sm text-green-500">
                          +2.5% this month
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          Send Money
                        </span>
                        <ArrowRightOutlined className="text-blue-600" />
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          Cash In/Out
                        </span>
                        <ArrowRightOutlined className="text-blue-600" />
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          Transactions
                        </span>
                        <ArrowRightOutlined className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HeroSection;
