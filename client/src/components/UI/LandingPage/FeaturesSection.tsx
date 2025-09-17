"use client";

import React from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  SendOutlined,
  DollarOutlined,
  HistoryOutlined,
  SafetyOutlined,
  MobileOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <SendOutlined className="text-3xl text-blue-600" />,
      title: "Send Money",
      description:
        "Transfer money instantly to anyone, anywhere with just their mobile number. Fast, secure, and reliable.",
    },
    {
      icon: <DollarOutlined className="text-3xl text-green-600" />,
      title: "Cash In/Out",
      description:
        "Easily deposit or withdraw cash through our extensive network of agents across the country.",
    },
    {
      icon: <HistoryOutlined className="text-3xl text-purple-600" />,
      title: "Transaction History",
      description:
        "Keep track of all your transactions with detailed history and real-time notifications.",
    },
    {
      icon: <SafetyOutlined className="text-3xl text-red-600" />,
      title: "Bank-Level Security",
      description:
        "Your money and data are protected with advanced encryption and multi-layer security protocols.",
    },
    {
      icon: <MobileOutlined className="text-3xl text-indigo-600" />,
      title: "Mobile First",
      description:
        "Designed for mobile devices with an intuitive interface that works seamlessly on any screen size.",
    },
    {
      icon: <ThunderboltOutlined className="text-3xl text-yellow-600" />,
      title: "Instant Processing",
      description:
        "All transactions are processed instantly with real-time balance updates and confirmations.",
    },
    {
      icon: <GlobalOutlined className="text-3xl text-cyan-600" />,
      title: "24/7 Availability",
      description:
        "Access your account and make transactions anytime, anywhere, 24 hours a day, 7 days a week.",
    },
    {
      icon: <CustomerServiceOutlined className="text-3xl text-orange-600" />,
      title: "Customer Support",
      description:
        "Get help when you need it with our dedicated customer support team available round the clock.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Title
            level={2}
            className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Why Choose <span className="text-blue-600">Drutoo</span>?
          </Title>
          <Paragraph className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience banking like never before with our comprehensive suite of
            features designed to make your financial life easier and more
            secure.
          </Paragraph>
        </div>

        {/* Features Grid */}
        <Row gutter={[32, 32]} className="feature-grid">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                className="feature-card h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800"
                bodyStyle={{ padding: "32px 24px" }}
              >
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <Title
                    level={4}
                    className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                  >
                    {feature.title}
                  </Title>
                  <Paragraph className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <Paragraph className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Drutoo for their
              banking needs. Create your account today and experience the future
              of banking.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                onClick={() => (window.location.href = "/create-account")}
              >
                Create Account
              </button>
              <button
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
