import React, { useState } from "react";
import DRTable from "../Table";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks";

const HomeLeft = ({ userData }: any) => {
  console.log(userData);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const trans = userData?.transactions as any;
  const columns = [
    {
      title: "Sender",
      dataIndex: "receivedId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
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

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
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
            // loading={isLoading}
            columns={columns}
            dataSource={trans}
            pageSize={size}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            onTableChange={onTableChange}
            showPagination={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeLeft;
