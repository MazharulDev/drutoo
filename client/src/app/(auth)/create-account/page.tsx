import CreateAccountPage from "@/components/auth/CreateAccount";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Drutoo|Create Account",
};

const CreateAccount = () => {
  return (
    <div>
      <CreateAccountPage />
    </div>
  );
};

export default CreateAccount;
