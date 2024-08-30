"use client";

import { useState } from "react";
import { useProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Alert, Col, Row } from "antd";
import walletIcon from "../../assets/wallet.png";
import Image from "next/image";
import "../../styles/homePage.css";
import dayjs from "dayjs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { curveCardinal } from "d3-shape";
import DRTable from "@/components/UI/Table";
import { useDebounced } from "@/redux/hooks";

const HomePage = () => {
  const { userId } = getUserInfo() as any;
  const { data: userData } = useProfileQuery(userId);
  const query: Record<string, any> = {};
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
  const trans = [] as any;

  const handleBalanceClick = () => {
    setIsBalanceVisible(true);
    setTimeout(() => {
      setIsBalanceVisible(false);
    }, 5000);
  };

  const columns = [
    {
      title: "Transaction",
      dataIndex: "TransactionId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
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

  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div
      className="min-h-[680px]"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        padding: "24px 24px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
      }}
    >
      <Row>
        <Col span={18}>
          {/* <div>
            <h1 className="text-2xl font-bold">Hello, {userData?.name}</h1>
            <p className="text-lg">
              Access & manage your account and transactions efficiently
            </p>
          </div> */}
          <div className="mb-3">
            <AreaChart
              width={750}
              height={200}
              data={data}
              margin={{
                top: 0,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
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
        </Col>
        <Col span={6}>
          <div className="p-2">
            <h1 className="text-xl font-bold">{userData?.name}</h1>
            <p>{userData?.email}</p>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <Image width={70} src={walletIcon} alt="wallet image" />
            <div>
              <h2>Your Balance</h2>
              <p
                className={`text-2xl font-bold`}
                onClick={handleBalanceClick}
                style={{ cursor: "pointer" }}
              >
                <strong>
                  &#2547;{" "}
                  <span
                    className={`${
                      isBalanceVisible
                        ? "blur-0 duration-200"
                        : "blur-sm duration-200"
                    }`}
                  >
                    {userData?.balance?.toFixed(2)}
                  </span>
                </strong>
              </p>
            </div>
          </div>
          <div className="my-2">
            <Alert
              message={`Your account is ${userData?.status}`}
              type={userData?.status === "active" ? "success" : "warning"}
              showIcon
            />
          </div>
          <div>
            <h2 className="text-lg font-bold mt-4">My Card</h2>
            <div className="w-64 h-40 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 rounded-lg shadow-lg">
              <div className="flex justify-between m-2 pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="7" y1="15" x2="7.01" y2="15" />
                  <line x1="11" y1="15" x2="13" y2="15" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="9.5" cy="9.5" r="5.5" fill="#fff" />
                  <circle cx="14.5" cy="14.5" r="5.5" />
                </svg>
              </div>
              <div className="flex justify-end mt-4 mr-5">
                <div className="card-chip"></div>
                <h1 className="text-gray-400 font-os text-xl tracking-widest font-bold">
                  {userData?.mobile?.replace(/(.{5})/g, "$1 ")}
                </h1>
              </div>
              <div className="flex flex-col justfiy-end mt-4 p-4 text-gray-400 font-quick">
                <h4 className="uppercase tracking-wider font-semibold text-xs">
                  {userData?.name}
                </h4>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
