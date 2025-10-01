// import * as Client from 'sentinel_controller';

// // Configuration
// const CONTRACT_CONFIG = {
//   networkPassphrase: Client.Networks.TESTNET,
//   rpcUrl: "https://soroban-testnet.stellar.org",
//   contractId: "CDK75NIW7HZA6VPT2E6ELAP554HI2FFVW7ZYFSKRCZZYQIH6LJO73TTB",
// } as const;

// // Default options for all calls
// const DEFAULT_OPTIONS = {
//   timeoutInSeconds: 30,
//   simulate: true,
// } as const;

// // Singleton instance
// let registryClientInstance: Client.Client | null = null;

// // Get or create the client instance
// export function getRegistryClient(): Client.Client {
//   if (!registryClientInstance) {
//     registryClientInstance = new Client.Client(CONTRACT_CONFIG);
//   }
//   return registryClientInstance;
// }

// export async function getPoliciesOwnedBy(ownerAddress: string, options?: {
//   timeoutInSeconds?: number;
//   simulate?: boolean;
// }) {
//   try {
//     const client = getRegistryClient();
//     const { result } = await client.get_policies_owned_by({buyer: ownerAddress}, {
//       timeoutInSeconds: options?.timeoutInSeconds ?? DEFAULT_OPTIONS.timeoutInSeconds,
//       simulate: options?.simulate ?? DEFAULT_OPTIONS.simulate,
//     });
//     return result;
//   } catch (error) {
//     console.log('Error fetching policies of buyer:', error);
//     throw error;
//   }
// }

// export type ControllerClient = Client.Client;
// export type ControllerOptions = {
//   timeoutInSeconds?: number;
//   simulate?: boolean;
// };
