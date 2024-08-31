"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { Button, Col, Row } from "antd";
import React from "react";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  receivedId: string;
  amount: number;
  pin: number;
};

const SendMoneyPage = () => {
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Row className="flex justify-center items-center">
      <Col>
        <Form submitHandler={onSubmit}>
          <div>
            <FormInput
              name="receivedId"
              placeholder="01*********"
              type="number"
              size="large"
              label="To"
              autoComplete="off"
            />
          </div>
          <div
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="amount"
              type="number"
              placeholder="Type amount"
              size="large"
              label="Amount"
              autoComplete="off"
            />
            <FormInput
              name="pin"
              type="password"
              placeholder="****"
              size="large"
              label="Pin"
              autoComplete="off"
            />
          </div>
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Send Money
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SendMoneyPage;
