"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useChangePinMutation } from "@/redux/api/authApi";
import { changePinSchema } from "@/schema/changePinSchema";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, message, Row } from "antd";
import React from "react";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  oldPin: string;
  newPin: number;
  confirmPin: number;
};

const ChangePinPage = () => {
  const { userId } = getUserInfo() as any;
  const [changePin, { isLoading }] = useChangePinMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const pinData = {
      mobile: userId,
      oldPin: data.oldPin,
      newPin: data.newPin,
    };
    try {
      const res = await changePin({ ...pinData }).unwrap();
      if (res.success) {
        message.success(res?.message);
      }
    } catch (error: any) {
      error("Something went wrong");
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
        <h1 className="text-4xl font-bold mb-4">Change Pin</h1>
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(changePinSchema)}
          >
            <div>
              <FormInput
                name="oldPin"
                type="password"
                placeholder="****"
                size="large"
                label="Old Pin"
              />
            </div>
            <div>
              <FormInput
                name="newPin"
                type="password"
                placeholder="****"
                size="large"
                label="New Pin"
              />
            </div>
            <div>
              <FormInput
                name="confirmPin"
                type="password"
                placeholder="****"
                size="large"
                label="Confirm Pin"
              />
            </div>
            <Button
              className="bg-blue-500 mt-2"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Change
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ChangePinPage;
