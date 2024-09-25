import TransactionsTable from "@/components/transactions/Transaction";
import ActionBar from "@/components/UI/ActionBar";

const TransactionPageAgent = () => {
  return (
    <div>
      <ActionBar title="Transactions" />
      <TransactionsTable />
    </div>
  );
};

export default TransactionPageAgent;
