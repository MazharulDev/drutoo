interface CardProps {
  title: string;
  value: string | number;
  bgColor: string;
  isLoading: boolean;
}

const CardTop = ({ title, value, bgColor, isLoading }: CardProps) => {
  return (
    <div className={`${bgColor} shadow-md rounded-lg p-6`}>
      <h2 className="text-lg font-medium text-gray-600">{title}</h2>
      <p className="text-2xl font-bold text-gray-800 mt-4">
        {isLoading ? (
          <span className="animate-pulse text-gray-400">Loading...</span>
        ) : (
          value
        )}
      </p>
    </div>
  );
};

export default CardTop;
