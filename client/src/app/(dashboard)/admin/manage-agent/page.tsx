import ActionBar from "@/components/UI/ActionBar";
import AgentManageTable from "@/components/UI/Agents/AgentManageTable";
import React from "react";

const ManageAgent = () => {
  return (
    <div>
      <ActionBar title="Agents" />
      <AgentManageTable />
    </div>
  );
};

export default ManageAgent;
