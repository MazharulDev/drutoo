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

const steps = [
  {
    title: "Basic Info",
    content: <BasicInfoForm />,
  },
  {
    title: "Address",
    content: <AddressInfo />,
  },
  // {
  //   title: "Employment Info",
  //   content: <EmployeeEmploymentInfoForm />,
  // },
  // {
  //   title: "Financial Info",
  //   content: <EmployeeFinancialInfoForm />,
  // },
];

const CreateAccountPage = () => {
  const router = useRouter();
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const handleCreateAccountSubmit = async (data: any) => {
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
      <div style={{ padding: "0 15px" }}>
        <ActionBar title="Create your bank account"></ActionBar>
        <div className="w-full h-4" />

        <StepperForm
          persistKey="createAccount"
          navigateLink="/dashboard/admin"
          submitHandler={(value) => {
            handleCreateAccountSubmit(value);
          }}
          finalButtonName={"Create"}
          steps={steps}
          // resolver={yupResolver(userSchema)}
        />
      </div>
    </Row>
  );
};

export default CreateAccountPage;
