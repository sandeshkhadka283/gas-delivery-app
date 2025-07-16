const BrandCard = ({ brand, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 border border-gray-200 text-center"
    >
      <p className="text-xl font-semibold text-red-600 tracking-wide">{brand}</p>
    </div>
  );
};

export default BrandCard;
