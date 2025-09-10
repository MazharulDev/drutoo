"use client";

import { useSystemQuery } from "@/redux/api/systemInfo";
import { useUsersQuery } from "@/redux/api/userApi";
import { useTransactionsQuery } from "@/redux/api/transactionsApi";
import ActionBar from "../ActionBar";
import CardTop from "../AdminDashboard/CardTop";

const AdminLeftPage = () => {
  const { data: systemBalance, isLoading: systemLoading } =
    useSystemQuery(undefined);
  const { data: users, isLoading: usersLoading } = useUsersQuery({
    role: "user",
  });
  const { data: agents, isLoading: agentsLoading } = useUsersQuery({
    role: "agent",
  });
  const { data: transactions, isLoading: transactionsLoading } =
    useTransactionsQuery({});

  const cardData = [
    {
      title: "System Balance",
      value: `৳ ${systemBalance && systemBalance[0]?.amount}`,
      bgColor: "bg-purple-100",
      isLoading: systemLoading,
    },
    {
      title: "User Count",
      value: users?.meta?.total || 0,
      bgColor: "bg-blue-100",
      isLoading: usersLoading,
    },
    {
      title: "Agent Count",
      value: agents?.meta?.total || 0,
      bgColor: "bg-green-100",
      isLoading: agentsLoading,
    },
    {
      title: "Total Transactions",
      value: transactions?.meta?.total || 0,
      bgColor: "bg-yellow-100",
      isLoading: transactionsLoading,
    },
  ];

  return (
    <div className="pr-5 min-h-screen">
      <ActionBar title="Admin Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cardData.map((card, index) => (
          <CardTop
            key={index}
            title={card.title}
            value={card.value}
            bgColor={card.bgColor}
            isLoading={card.isLoading}
          />
        ))}
      </div>

      <div className="shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div className="text-gray-600">
          <p>No recent activities to display</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftPage;
