"use client";

import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Paragraph } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Row gutter={[48, 48]}>
          <Col xs={24} md={8}>
            <div className="flex items-center space-x-2 mb-4">
              <BankOutlined className="text-2xl text-blue-400" />
              <h2 className="text-white mb-0 text-lg">Drutoo</h2>
            </div>
            <Paragraph className="text-gray-300 mb-4">
              Trusted Online Banking - Making financial services accessible,
              secure, and convenient for everyone.
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <h2 className="text-white text-lg mb-4">Quick Links</h2>
            <div className="space-y-2">
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  About Us
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Features
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Security
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <h2 className="text-white text-lg mb-4">Support</h2>
            <div className="space-y-2">
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Help Center
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  FAQ
                </a>
              </div>
            </div>
          </Col>
        </Row>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <Paragraph className="text-gray-400 mb-0">
            © {new Date().getFullYear()} Drutoo. All rights reserved. | Trusted
            Online Banking
          </Paragraph>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
