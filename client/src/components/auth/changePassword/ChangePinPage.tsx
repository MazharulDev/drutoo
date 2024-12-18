"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { changePinSchema } from "@/schema/changePinSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row } from "antd";
import React from "react";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  oldPin: string;
  newPin: number;
  confirmPin: number;
};

const ChangePinPage = () => {
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data);
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
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="newPin"
                type="password"
                placeholder="****"
                size="large"
                label="New Pin"
              />
              <FormInput
                name="confirmPin"
                type="password"
                placeholder="****"
                size="large"
                label="Confirm Pin"
              />
            </div>
            <Button
              className="bg-blue-500"
              type="primary"
              htmlType="submit"
              //   loading={isLoading}
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
