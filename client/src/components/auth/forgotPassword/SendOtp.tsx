"use client";
import { Button, Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import FormInput from "../../forms/FormInput";
import Form from "../../forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";
import { sendOtpSchema } from "@/schema/sendOtp";
import {
  useResetPinMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/api/otp";
import { useRouter } from "next/navigation";

type FormValues = {
  mobile: string;
};
type otpFormValues = {
  mobile: string;
  otp: string;
};

const SendOtp = () => {
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  const [resetPin, { isLoading: isResetPinLoading }] = useResetPinMutation();
  const [mobile, setMobile] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [isVerifiedOtp, setIsVerifiedOtp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (mobile && !isVerifiedOtp && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && mobile) {
      message.error("OTP expired");
    }

    return () => clearInterval(timer);
  }, [mobile, seconds, isVerifiedOtp]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await sendOtp(data).unwrap();

      if (response && response?._id) {
        setMobile(data.mobile);
        message.success("We've sent an OTP on your mail! Please check.");
        setSeconds(60);
      } else {
        message.error("Unexpected response format.");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };
  //verify otp
  const onOTPSubmit: SubmitHandler<otpFormValues> = async (data: any) => {
    try {
      const res = await verifyOtp({
        ...data,
        mobile: mobile,
      }).unwrap();
      if (res?.isVerified) {
        setIsVerifiedOtp(true);
      }
    } catch (err: any) {
      message.error(err.message);
      if (err.message === "OTP expired") {
        setMobile("");
      }
    }
  };
  //password submit
  const onPasswordSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await resetPin({
        ...data,
        mobile: mobile,
      }).unwrap();
      if (res?.isReset) {
        message.success("Password reset successfully");
        router.push("/login");
      }
    } catch (err: any) {
      message.error(err.message);
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
      {!mobile && (
        <Col sm={12} md={8} lg={10} style={{ padding: "0 15px" }}>
          <h1 className="text-4xl font-bold mb-4">Send OTP</h1>
          <div>
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(sendOtpSchema)}
            >
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
      )}
      {mobile && !isVerifiedOtp && (
        <Form submitHandler={onOTPSubmit}>
          <div>
            <FormInput
              name="otp"
              size="large"
              label="OTP"
              placeholder="Enter OTP"
            />
            {!!seconds && (
              <p className="text-xs text-gray-400 text-end">
                {seconds} seconds left
              </p>
            )}
          </div>
          <div className="flex justify-left mt-3">
            {seconds > 0 ? (
              <Button
                shape="default"
                htmlType="submit"
                loading={isVerifyLoading}
              >
                Verify
              </Button>
            ) : (
              <Button
                shape="default"
                onClick={() => onSubmit({ mobile: mobile })}
              >
                Resend
              </Button>
            )}
          </div>
        </Form>
      )}
      {mobile && isVerifiedOtp && (
        <Form submitHandler={onPasswordSubmit}>
          <div>
            <FormInput
              name="pin"
              type="password"
              size="large"
              label="New Password"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <FormInput
              name="confirm_pin"
              type="password"
              size="large"
              label="Confirm Password"
              placeholder="Enter new password again"
            />
          </div>
          <div className="flex justify-left mt-3">
            <Button
              shape="default"
              htmlType="submit"
              loading={isResetPinLoading}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Row>
  );
};

export default SendOtp;
