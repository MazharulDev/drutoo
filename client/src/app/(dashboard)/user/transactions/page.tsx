import TransactionsPage from "@/components/transactions/Transaction";
import ActionBar from "@/components/UI/ActionBar";

const TransactionsHistoryPage = () => {
  return (
    <div>
      <ActionBar title="Transactions" />
      <TransactionsPage />
    </div>
  );
};

export default TransactionsHistoryPage;
