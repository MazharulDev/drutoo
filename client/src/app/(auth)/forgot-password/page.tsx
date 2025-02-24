import SendOtp from "@/components/auth/forgotPassword/SendOtp";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div>
      <Link href="/login" className="p-4">
        <Button className="mt-4">Back</Button>
      </Link>
      <SendOtp />
    </div>
  );
};

export default ForgotPasswordPage;
