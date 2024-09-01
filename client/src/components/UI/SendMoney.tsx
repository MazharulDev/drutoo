"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useSendMoneyMutation } from "@/redux/api/sendMoneyApi";
import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, message, Row } from "antd";
import React from "react";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  receivedId: string;
  amount: number;
  pin: number;
};

const SendMoneyPage = () => {
  const { userId } = getUserInfo() as any;
  const { data: userData } = useProfileQuery(userId);
  const [sendMoney, { isLoading, isSuccess, isError, error }] =
    useSendMoneyMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await sendMoney({
        ...data,
        senderId: userData?.mobile,
      }).unwrap();
      console.log(res);
      // if (res) {
      //   message.success(res);
      // }
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
