const WalletNotConnected = () => {
  return (
    <div className="px-6 py-4 rounded-2xl shadow-sm bg-red-100 max-w-5xl mx-auto flex">
      <p className="text-md font-medium text-gray-800">
        Please connect your wallet using one of the available
        <strong> Stellar </strong> wallet providers.
      </p>
    </div>
  );
};

export default WalletNotConnected;
