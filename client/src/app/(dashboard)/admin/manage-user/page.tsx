import ActionBar from "@/components/UI/ActionBar";
import UsersManageTable from "@/components/UI/Agents/UsersManageTable";
import React from "react";

const ManageUser = () => {
  return (
    <div>
      <ActionBar title="Users" />
      <UsersManageTable />
    </div>
  );
};

export default ManageUser;
