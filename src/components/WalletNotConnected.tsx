const WalletNotConnected = () => {
  return (
    <div className="px-6 py-4 rounded-2xl shadow-sm bg-white">
      <p className="text-md font-medium text-gray-800">
        Please connect your wallet using one of the available Stellar wallet
        providers.
      </p>
    </div>
  );
};

export default WalletNotConnected;
