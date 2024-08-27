import LoginPage from "@/components/auth/Login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Drutoo|login",
};

const Login = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;
