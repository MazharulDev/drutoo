import React, { useState } from "react";
import DRTable from "../Table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const HomeLeft = ({ userData, isLoading }: any) => {
  const trans = userData?.transactions as any;
  const columns = [
    {
      title: "Transaction Details",
      dataIndex: "senderId",
      render: function (data: any, record: any) {
        const amount = record.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        let transactionDetails = "Transaction details not available.";

        if (userData.mobile === record.senderId) {
          if (record.through === "sendMoney") {
            transactionDetails = `You sent ${amount} to ${record.receivedId}.`;
          } else if (record.through === "cashout") {
            transactionDetails = `You cashed out ${amount}.`;
          }
        } else if (userData.mobile === record.receivedId) {
          if (record.through === "sendMoney") {
            transactionDetails = `${record.senderId} sent you ${amount}.`;
          } else if (record.through === "cashin") {
            transactionDetails = `You received a cash-in of ${amount} from ${record.senderId}.`;
          }
        }

        return transactionDetails;
      },
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: function (data: any) {
        const transactionDate = dayjs(data);
        const now = dayjs();

        const minutesDiff = now.diff(transactionDate, "minute");
        const hoursDiff = now.diff(transactionDate, "hour");
        const daysDiff = now.diff(transactionDate, "day");
        const weeksDiff = now.diff(transactionDate, "week");

        if (minutesDiff < 60) {
          return `${minutesDiff} minute${
            minutesDiff > 1 ? "s" : ""
          } ago (${transactionDate.format("HH:mm")})`;
        }
        if (hoursDiff < 24) {
          return `${hoursDiff} hour${
            hoursDiff > 1 ? "s" : ""
          } ago (${transactionDate.format("HH:mm")})`;
        }
        if (daysDiff < 7) {
          return `${daysDiff} day${
            daysDiff > 1 ? "s" : ""
          } ago (${transactionDate.format("MMM D")})`;
        }
        return transactionDate.format("MMM D, YYYY");
      },
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Hello, {userData?.name}</h1>
        <p className="text-lg">
          Access & manage your account and transactions efficiently
        </p>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold">Transaction</h2>
        <div className="mt-4 pr-1">
          <DRTable
            loading={isLoading}
            columns={columns}
            dataSource={trans?.slice(0, 5)}
            showSizeChanger={true}
            showPagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeLeft;
