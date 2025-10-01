// import * as Client from 'sentinel_registry';
// import { Vertical } from 'sentinel_primitives';

// // Configuration
// const CONTRACT_CONFIG = {
//   networkPassphrase: Client.Networks.TESTNET,
//   rpcUrl: "https://soroban-testnet.stellar.org",
//   contractId: "CBRR2NAH4OLHTTZMJFJXF3VHG6DSAEXTRJBGRZVSDQOWBODBKBGUQY37",
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

// export async function getAll(options?: {
//   timeoutInSeconds?: number;
//   simulate?: boolean;
// }) {
//   try {
//     const client = getRegistryClient();
//     const { result } = await client.get_all({
//       timeoutInSeconds: options?.timeoutInSeconds ?? DEFAULT_OPTIONS.timeoutInSeconds,
//       simulate: options?.simulate ?? DEFAULT_OPTIONS.simulate,
//     });
//     return result;
//   } catch (error) {
//     console.log('Error fetching all registry entries:', error);
//     throw error;
//   }
// }

// export async function getTotalCount(options?: {
//   timeoutInSeconds?: number;
//   simulate?: boolean;
// }) {
//   try {
//     const client = getRegistryClient();
//     const { result } = await client.get_total_count({
//       timeoutInSeconds: options?.timeoutInSeconds ?? DEFAULT_OPTIONS.timeoutInSeconds,
//       simulate: options?.simulate ?? DEFAULT_OPTIONS.simulate,
//     });
//     return result;
//   } catch (error) {
//     console.error('Error fetching total count:', error);
//     throw error;
//   }
// }

// export async function getByVertical(options?: {
//   timeoutInSeconds?: number;
//   simulate?: boolean;
// }) {
//   try {
//     const client = getRegistryClient();
//     const vertical : Vertical = {tag: "Flight", values:void "Flight"};
//     const { result } = await client.get_by_vertical({vertical}, {
//       timeoutInSeconds: options?.timeoutInSeconds ?? DEFAULT_OPTIONS.timeoutInSeconds,
//       simulate: options?.simulate ?? DEFAULT_OPTIONS.simulate,
//     });
//     return result;
//   } catch (error) {
//     console.log('Error fetching all registry entries:', error);
//     throw error;
//   }
// }

// export type RegistryClient = Client.Client;
// export type RegistryOptions = {
//   timeoutInSeconds?: number;
//   simulate?: boolean;
// };
