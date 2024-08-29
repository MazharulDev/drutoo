"use client";

import ActionBar from "@/components/UI/ActionBar";

const Card = ({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: number;
}) => {
  return (
    <div className="flex gap-3 border border-gray-300 shadow-sm  hover:shadow-md transition duration-300 ease-in-out  bg-white text-[#00674A] rounded-md p-4">
      <div className=" flex justify-center items-center">
        <p className="text-5xl">{icon}</p>
      </div>
      <div className="overflow-hidden flex items-center">
        <div>
          <p className="text-xl">{title}</p>
          <p className="text-lg">{value}</p>
        </div>
      </div>
    </div>
  );
};

const UserDashboardPage = () => {
  // console.log(data);
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
      <ActionBar title="Dashboard" />
    </div>
  );
};

export default UserDashboardPage;
