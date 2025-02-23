import ChangePinPage from "@/components/auth/changePassword/ChangePinPage";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const ChangePin = () => {
  return (
    <div>
      <Link href="/" className="p-4">
        <Button className="mt-4">Back</Button>
      </Link>
      <ChangePinPage />
    </div>
  );
};

export default ChangePin;
