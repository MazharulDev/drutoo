"use client";
import Loading from "@/app/loading";
import { useCashoutMutation } from "@/redux/api/cashout";
import { useSendMoneyMutation } from "@/redux/api/sendMoneyApi";
import { useProfileQuery } from "@/redux/api/userApi";
import { Col, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import HoldButton from "./HoldButton";

type FormValues = {
  receivedId: string;
  amount: number;
  pin: number;
};

const CashoutPage = ({userData}:any) => {
  const [receiverInfo, setReceiverInfo] = useState<string>("");
  const [receivedId, setReceivedId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [pin, setPin] = useState<string>("");

  useEffect(() => {
    if (receivedId.length === 11) {
      setReceiverInfo(receivedId);
    }
  }, [receivedId]);

  const { data: receiverData } = useProfileQuery(receiverInfo, {
    skip: !receiverInfo,
  });

  const [cashout, { isLoading }] = useCashoutMutation();

  const handleHoldComplete = async () => {
    if (!amount || !pin || !receivedId) {
      message.error("Please fill in all fields correctly.");
      return;
    }
    try {
      const data = {
        receivedId,
        amount: parseFloat(amount),
        pin,
      };
      const res = await cashout({
        ...data,
        senderId: userData?.mobile,
      }).unwrap();

      if (res) {
        message.success(res);
        setReceivedId("");
        setAmount("");
        setPin("");
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "An unexpected error occurred. Please try again.";
      message.error(errorMessage);
    }
  };

return isLoading ? (
    <Loading />
  ) : (
    <Row className="flex justify-center items-center">
      <Col>
        <div>
         <label>To {receiverData ? `-${receiverData?.name?.firstName} ${receiverData?.name?.lastName}` : ""}</label>
          <Input
            addonBefore="+88"
            placeholder="01*********"
            allowClear
            size={"large"}
            maxLength={11}
            value={receivedId}
            onChange={(e) => setReceivedId(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label>Amount</label>
          <Input
            placeholder={`Available balance ${userData?.balance?.toFixed(2)}`}
            allowClear
            size={"large"}
            autoCapitalize="off"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Pin</label>
          <Input.Password
            placeholder="****"
            type="password"
            size="large"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          <HoldButton onHoldComplete={handleHoldComplete} />
        </div>
      </Col>
    </Row>
  );
};

export default CashoutPage;
