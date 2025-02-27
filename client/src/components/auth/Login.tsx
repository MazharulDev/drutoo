"use client";
import { Button, Col, Row, message } from "antd";
import loginImage from "../../assets/login.webp";
import Image from "next/image";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { storeUserInfo } from "@/services/auth.service";
import Form from "../forms/Form";
import FormInput from "../forms/FormInput";
import { useLoginMutation } from "@/redux/api/authApi";
import { decodedToken } from "@/utils/jwt";
import { useState, useEffect } from "react";

type FormValues = {
  mobile: string;
  pin: number;
};

const LoginPage = () => {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation();
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const startCountdown = (blockTime: number) => {
    setIsBlocked(true);
    setRemainingTime(Math.ceil((blockTime - Date.now()) / 1000));

    const interval = setInterval(() => {
      const newTimeLeft = Math.ceil((blockTime - Date.now()) / 1000);
      if (newTimeLeft <= 0) {
        clearInterval(interval);
        setIsBlocked(false);
        setRemainingTime(0);
        localStorage.removeItem("login_blocked_until");
      } else {
        setRemainingTime(newTimeLeft);
      }
    }, 1000);
  };

  useEffect(() => {
    const blockedUntil = localStorage.getItem("login_blocked_until");
    if (blockedUntil) {
      const blockTime = parseInt(blockedUntil, 10);
      if (blockTime > Date.now()) {
        startCountdown(blockTime);
      } else {
        localStorage.removeItem("login_blocked_until");
      }
    }
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    if (isBlocked) {
      message.error("Too many failed attempts. Try again after 5 minutes.");
      return;
    }

    try {
      const res = await loginUser({ ...data }).unwrap();
      if (res?.accessToken) {
        const { userId } = decodedToken(res?.accessToken) as {
          userId: string;
        };
        if (userId) {
          router.push("/");
          message.success("User logged in successfully");
          storeUserInfo({ accessToken: res?.accessToken });
        }
      }
    } catch (error: any) {
      if (error?.data?.error) {
        const blockTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        localStorage.setItem("login_blocked_until", blockTime.toString());
        startCountdown(blockTime);
        message.error(
          "Too many failed attempts. You are blocked for 5 minutes."
        );
      } else {
        message.error(
          error?.data?.error ||
            error?.data?.message ||
            "An unexpected error occurred. Please try again."
        );
      }
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
      <Col sm={12} md={10} lg={10}>
        <Image src={loginImage} width={480} alt="login image" />
      </Col>

      <Col sm={12} md={8} lg={10} style={{ padding: "0 15px" }}>
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="mobile"
                placeholder="01*********"
                type="number"
                size="large"
                label="Mobile"
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <FormInput
                name="pin"
                type="password"
                placeholder="****"
                size="large"
                label="Pin"
              />
            </div>
            <div className="flex justify-end">
              <p>
                <Link href="/forgot-password">Forgot Password?</Link>
              </p>
            </div>
            <Button
              className="bg-blue-500"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isBlocked}
            >
              {isBlocked
                ? `Try again in ${Math.floor(remainingTime / 60)}:${
                    remainingTime % 60 < 10
                      ? "0" + (remainingTime % 60)
                      : remainingTime % 60
                  }`
                : "Login"}
            </Button>
          </Form>
          <div style={{ marginTop: "10px" }}>
            <p>
              You have not account?{" "}
              <Link href="/create-account">Create Account</Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
