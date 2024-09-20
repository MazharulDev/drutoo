import TransactionsPage from "@/components/transactions/Transaction";
import ActionBar from "@/components/UI/ActionBar";

const TransactionPageAgent = () => {
  return (
    <div>
      <ActionBar title="Transactions" />
      <TransactionsPage />
    </div>
  );
};

export default TransactionPageAgent;
