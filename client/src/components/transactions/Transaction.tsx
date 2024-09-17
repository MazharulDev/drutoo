"use client";

import { useMyTransactionsQuery } from "@/redux/api/transactionsApi";
import DRTable from "../UI/Table";
import dayjs from "dayjs";
import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { Input } from "antd";

const TransactionsPage = () => {
  const { userId } = getUserInfo() as any;
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["senderId"] = userId;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useMyTransactionsQuery({ ...query });

  const meta = data?.meta;
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

        if (userId === record.senderId) {
          if (record.through === "sendMoney") {
            transactionDetails = `You sent ${amount} to ${record.receivedId}.`;
          } else if (record.through === "cashout") {
            transactionDetails = `You cashed out ${amount}.`;
          }
        } else if (userId === record.receivedId) {
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
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <div>
      <div className="mt-4 pr-1">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
            marginBottom: "1rem",
          }}
        />
        <DRTable
          loading={isLoading}
          columns={columns}
          dataSource={data?.transaction}
          showSizeChanger={true}
          showPagination={true}
          totalPages={meta?.total}
          pageSize={size}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
