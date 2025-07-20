"use client";

import React from "react";
import { Col, message, Row } from "antd";
import { useCreateAccountMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import ActionBar from "../UI/ActionBar";
import StepperForm from "../stepperForm/StepperForm";
import { yupResolver } from "@hookform/resolvers/yup";
import BasicInfoForm from "./createAccount/BasicInfo";
import AddressInfo from "./createAccount/Address";
import SecurityStep from "./createAccount/Security";
import { userSchema } from "@/schema/CreateAccount";

const steps = [
  {
    title: "Basic Info",
    content: <BasicInfoForm />,
  },
  {
    title: "Address",
    content: <AddressInfo />,
  },
  {
    title: "Security",
    content: <SecurityStep />,
  },
];

const CreateAccountPage = () => {
  const router = useRouter();
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const handleCreateAccountSubmit = async (data: any) => {
    try {
      let { mobile, ...rest } = data;
      if (mobile.startsWith("+88")) {
        mobile = mobile.slice(3);
      }

      const res = await createAccount({ ...rest, mobile }).unwrap();

      if (res?._id) {
        router.push("/login");
        message.success("Account Created successfully, Please login");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessages = error?.data?.errorMessages;

      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((err: any) => {
          message.error(err.message || "Something went wrong.");
        });
      } else {
        message.error("An unexpected error occurred. Please try again.");
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
      <div style={{ padding: "0 15px" }}>
        <ActionBar title="Create your bank account"></ActionBar>
        <div className="w-full h-4" />

        <StepperForm
          persistKey="createAccount"
          // navigateLink="/dashboard/admin"
          submitHandler={(value) => {
            handleCreateAccountSubmit(value);
          }}
          finalButtonName={"Create"}
          steps={steps}
          resolver={yupResolver(userSchema)}
        />
      </div>
    </Row>
  );
};

export default CreateAccountPage;
