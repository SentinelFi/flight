# Sentinel: Flight Delay Insurance UI

[![network](https://img.shields.io/badge/network-testnet-purple)](https://stellar.org)

Sentinel is building a decentralized parametric insurance framework on Stellar Soroban. This repository contains the user interface for the first insurance vertical – Flight Delay Insurance – running on the Stellar testnet. It allows travelers to secure flight delay coverage with fast, automatic payouts via smart contracts, ensuring a trustless and transparent insurance process.

## ⚠️ Security Notice

This project is under development. Use at your own risk. Please report any issues [here](https://github.com/SentinelFi/flight/issues).

> [!Warning]
> While we strive to ensure this software functions as intended, it is provided “as is” with no warranties or guarantees of any kind. By using this software, you acknowledge and agree that: You use it entirely at your own risk. You should perform your own due diligence, and it is strongly recommended to consult qualified professionals (e.g., security auditors, legal advisors). We do not accept any liability for any loss of funds, damages, or other consequences resulting from the use or misuse of this code. Users interact with the UI at their own risk – always exercise caution.

<!-- ## 🌐 Live App -->

## ✨ Key Features

- **Purchase Coverage** – Buy flight delay insurance by paying a premium through the web app.

- **Policy Management** – View your active insurance policies and past policy history in the dashboard. Monitor status of your insurances and any payouts in real time.

- **Transparency** – All policy terms and transactions are recorded on the Stellar blockchain, providing transparency and eliminating the need for trust in a third party.

- **Ongoing Support** – Users can get in-app guidance and support.

*More features are planned as the Sentinel framework expands.*

## 🛠️ Tech Stack

Next.js, TypeScript, TailwindCSS, Stellar SDK (`@stellar/stellar-sdk`), Stellar Wallets Kit (`@creit.tech/stellar-wallets-kit`).

## 💻 Local Setup

To run the project locally, follow these steps:

1. Clone this repository.
2. In the project directory, run `npm install` to install dependencies.
3. Create a `.env` file in the project root (you can copy `.env.example` as a starting point). Provide the necessary environment variable values as indicated in the example file.
4. Review `src/config/index.ts` for configuration such as contract addresses and other constants.
5. Run `npm run dev` to launch the Next.js development server. The application will be available at `http://localhost:3000`.

## 📜 Contract Bindings

The generated TypeScript can be found in the `src/bindings/` directory.

## 🤝 Contributing

Contributions are welcome. To get started, open an [issue](https://github.com/SentinelFi/flight/issues/new) describing your proposal or the bug. Then, fork the repository and create a new branch for your changes, making sure to follow the existing code style. Open a Pull Request for review.

Please follow standard GitHub conventions for issues and PRs.

## 📜 License

This project is licensed under the [Apache License 2.0](./LICENSE)

## 📚 Learn More

- [Next.js Documentation ↗](https://nextjs.org/docs).

- [Stellar Official Site ↗](https://stellar.org/).

---

⚡ **Notice:** This is a work in progress. Expect updates. Join our [community ↗](https://x.com/sentinel_fi/) to stay updated on the latest developments.

