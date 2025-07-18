"use client";

import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { Button, Input, Select } from "antd";
import {
  useUpdateUserStatusMutation,
  useUsersQuery,
} from "@/redux/api/userApi";
import DRTable from "../Table";

const UsersManageTable = () => {
  const { userId } = getUserInfo() as any;
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["senderId"] = userId;
  query["role"] = "user";
  query["status"] = ["active", "inactive", "blocked"];

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useUsersQuery({ ...query });
  const [updateUserStatus] =
    useUpdateUserStatusMutation();
  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingUserId(id);
    try {
      await updateUserStatus({ id, status: newStatus });
    } finally {
      setLoadingUserId(null);
    }
  };
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
      render: (status: string) => {
        let color = "gray";
        if (status === "active") color = "green";
        else if (status === "inactive") color = "orange";
        else if (status === "blocked") color = "red";
        return <span style={{ color, fontWeight: 600 }}>{status}</span>;
      },
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
    {
      title: "Action",
      dataIndex: "action",
      render: function (_: any, record: any) {
        return (
          <Select
            size="small"
            value={record.status}
            style={{ width: 120 }}
            loading={loadingUserId === record.id}
            onChange={(value) => handleStatusChange(record.id, value)}
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Block", value: "block" },
            ]}
          />
        );
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

export default UsersManageTable;
