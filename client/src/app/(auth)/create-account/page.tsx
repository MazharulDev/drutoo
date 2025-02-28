import CreateAccountPage from "@/components/auth/CreateAccount";
import { Button } from "antd";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Drutoo|Create Account",
};

const CreateAccount = () => {
  return (
    <div>
      <Link href="/login" className="p-4">
        <Button className="mt-4">Back</Button>
      </Link>
      <CreateAccountPage />
    </div>
  );
};

export default CreateAccount;
