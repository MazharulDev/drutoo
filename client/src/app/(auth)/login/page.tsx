import LoginPage from "@/components/auth/Login";
import { Button } from "antd";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Drutoo|login",
};

const Login = () => {
  return (
    <>
      <Link href="/" className="p-4">
        <Button className="mt-4">Back</Button>
      </Link>
      <LoginPage />
    </>
  );
};

export default Login;
