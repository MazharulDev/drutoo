"use client";
import { Button, Col, message, Row } from "antd";
import React from "react";
import FormInput from "../../forms/FormInput";
import Form from "../../forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";
import { sendOtpSchema } from "@/schema/sendOtp";
import { useSendOtpMutation } from "@/redux/api/otp";

type FormValues = {
  mobile: string;
};

const SendOtp = () => {
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await sendOtp(data).unwrap();

      if (response && response._id) {
        message.success("We've sent an OTP on your mail! Please check.");
      } else {
        message.error("Unexpected response format.");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={8} lg={10} style={{ padding: "0 15px" }}>
        <h1 className="text-4xl font-bold mb-4">Send OTP</h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(sendOtpSchema)}>
            <div>
              <FormInput
                name="mobile"
                type="text"
                placeholder="01712345678"
                size="large"
                label="Mobile"
              />
            </div>
            <Button
              className="bg-blue-500 mt-2"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Send OTP
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SendOtp;
