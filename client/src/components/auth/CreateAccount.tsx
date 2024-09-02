"use client";

import React from "react";
import { Button, Col, message, Row } from "antd";
import Image from "next/image";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import { useCreateAccountMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import createAccountImg from "../../assets/createAccount.png";

type FormValues = {
  name: string;
  mobile: string;
  email: string;
  nid: string;
  pin: string;
};

const CreateAccountPage = () => {
  const router = useRouter();
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await createAccount({ ...data }).unwrap();
      if (res?._id) {
        router.push("/login");
        message.success("Account Created successfully, Please login");
      }
    } catch (error: any) {
      message.error(
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
        <Image src={createAccountImg} width={600} alt="create account image" />
      </Col>

      <Col sm={12} md={8} lg={10} style={{ padding: "0 15px" }}>
        <h1 className="text-4xl font-bold mb-4">Create your account</h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="name"
                placeholder="Jhon Deo"
                type="text"
                size="large"
                label="Enter your fullname"
                autoComplete="off"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="mobile"
                type="number"
                placeholder="0123456789"
                size="large"
                label="Enter your phonenumber"
                autoComplete="off"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="nid"
                type="number"
                placeholder="1234567890"
                size="large"
                label="Enter your nid number"
                autoComplete="off"
              />
            </div>

            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="email"
                type="email"
                placeholder="example@email.com"
                size="large"
                label="Enter your email"
                autoComplete="off"
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
                placeholder="********"
                size="large"
                label="Pin"
                pattern="[0-9]*"
                inputMode="numeric"
                autoComplete="off"
              />
            </div>
            <Button
              className="bg-blue-500"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Signup
            </Button>
          </Form>
          <div style={{ marginTop: "10px" }}>
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CreateAccountPage;
