"use client";

import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { Input } from "antd";
import { useUsersQuery } from "@/redux/api/userApi";
import DRTable from "../Table";

const AgentManageTable = () => {
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
  query["role"] = "agent";

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useUsersQuery({ ...query });

  const meta = data?.meta;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: function (data: any, record: any) {
        const name = record.name.firstName + " " + record.name.lastName;
        return name;
      },
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "NID",
      dataIndex: "nid",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      render: function (data: any) {
        return data.toLocaleString("en-US", {
          style: "currency",
          currency: "BDT",
        });
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: function (data: any) {
        const createdAt = new Date(data);
        const now = new Date();

        const diffInMs = now.getTime() - createdAt.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);

        if (diffInYears >= 1) {
          return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
        } else if (diffInMonths >= 1) {
          return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
        } else if (diffInDays >= 1) {
          return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
        } else {
          return "Today";
        }
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
          dataSource={data?.users}
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

export default AgentManageTable;
