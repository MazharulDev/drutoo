import TransactionsTable from "@/components/transactions/Transaction";
import ActionBar from "@/components/UI/ActionBar";

const TransactionsHistoryPage = () => {
  return (
    <div>
      <ActionBar title="Transactions" />
      <TransactionsTable />
    </div>
  );
};

export default TransactionsHistoryPage;
