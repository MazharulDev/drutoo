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

type FormValues = {
  mobile: string;
  pin: number;
};

const LoginPage = () => {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
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
      message.error(
        error?.data?.error ||
          error?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
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
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="pin"
                type="password"
                placeholder="****"
                size="large"
                label="Pin"
              />
            </div>
            <Button
              className="bg-blue-500"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Login
            </Button>
          </Form>
          <div style={{ marginTop: "10px" }}>
            <p>
              You have not account?{" "}
              <Link href="/create-account">Create Account</Link>
            </p>
          </div>
          <div style={{ marginTop: "10px" }}>
            <p>
              <Link href="/forgot-password">Forgot Password</Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
