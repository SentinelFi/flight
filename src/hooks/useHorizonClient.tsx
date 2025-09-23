import { useCallback, useRef, useMemo } from "react";
import {
  FeeBumpTransaction,
  Horizon,
  Memo,
  MemoType,
  Operation,
  Transaction,
} from "@stellar/stellar-sdk";
import { useCurrentNetwork } from "./useCurrentNetwork";

interface RateLimitConfig {
  maxRequests: number; // Max requests per window
  windowMs: number; // Time window in milliseconds
  retryAfter?: number; // Retry after X ms when rate limited
}

interface QueuedRequest {
  execute: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

// Default rate limit configuration
const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 10, // 10 requests
  windowMs: 1000, // per 1 second
  retryAfter: 100, // retry after 100ms
};

export function useHorizonClient(customConfig?: Partial<RateLimitConfig>) {
  const { horizonUrl, network } = useCurrentNetwork();
  const config = { ...DEFAULT_RATE_LIMIT, ...customConfig };

  // Track request timestamps
  const requestTimestamps = useRef<number[]>([]);
  const requestQueue = useRef<QueuedRequest[]>([]);
  const isProcessingQueue = useRef(false);

  // Create Horizon server instance
  const server = useMemo(() => {
    return new Horizon.Server(horizonUrl);
  }, [horizonUrl]);

  // Process queued requests
  const processQueue = useCallback(async () => {
    if (isProcessingQueue.current || requestQueue.current.length === 0) {
      return;
    }

    isProcessingQueue.current = true;

    while (requestQueue.current.length > 0) {
      const now = Date.now();

      // Clean old timestamps outside the window
      requestTimestamps.current = requestTimestamps.current.filter(
        (timestamp) => now - timestamp < config.windowMs
      );

      // Check if can make a request
      if (requestTimestamps.current.length < config.maxRequests) {
        const request = requestQueue.current.shift();
        if (request) {
          requestTimestamps.current.push(now);
          try {
            const result = await request.execute();
            request.resolve(result);
          } catch (error) {
            request.reject(error);
          }
        }
      } else {
        // Wait before trying again
        await new Promise((resolve) => setTimeout(resolve, config.retryAfter));
      }
    }
    isProcessingQueue.current = false;
  }, [config]);

  // Rate-limited execute function
  const executeWithRateLimit = useCallback(
    <T,>(apiCall: () => Promise<T>): Promise<T> => {
      return new Promise((resolve, reject) => {
        const now = Date.now();

        // Clean old timestamps
        requestTimestamps.current = requestTimestamps.current.filter(
          (timestamp) => now - timestamp < config.windowMs
        );

        // Check if can execute immediately
        if (requestTimestamps.current.length < config.maxRequests) {
          requestTimestamps.current.push(now);
          apiCall().then(resolve).catch(reject);
        } else {
          // Add to queue
          requestQueue.current.push({
            execute: apiCall,
            resolve,
            reject,
          });

          // Start processing queue
          processQueue();
        }
      });
    },
    [config, processQueue]
  );

  // Wrapped API methods with rate limiting
  const loadAccount = useCallback(
    (accountId: string) => {
      return executeWithRateLimit(() => server.loadAccount(accountId));
    },
    [server, executeWithRateLimit]
  );

  const loadAssets = useCallback(
    (options?: {
      assetCode?: string;
      assetIssuer?: string;
      limit?: number;
    }) => {
      return executeWithRateLimit(() => {
        let query = server.assets();
        if (options?.assetCode) query = query.forCode(options.assetCode);
        if (options?.assetIssuer) query = query.forIssuer(options.assetIssuer);
        return query.limit(options?.limit || 10).call();
      });
    },
    [server, executeWithRateLimit]
  );

  const submitTransaction = useCallback(
    (
      transaction: Transaction<Memo<MemoType>, Operation[]> | FeeBumpTransaction
    ) => {
      return executeWithRateLimit(() => server.submitTransaction(transaction));
    },
    [server, executeWithRateLimit]
  );

  // Generic method for custom queries
  const executeCustom = useCallback(
    <T,>(customCall: (server: Horizon.Server) => Promise<T>): Promise<T> => {
      return executeWithRateLimit(() => customCall(server));
    },
    [server, executeWithRateLimit]
  );

  return {
    // Server instance (if needed for direct access)
    server,

    // Rate-limited
    loadAccount,
    loadAssets,
    submitTransaction,

    // Generic execute for custom queries
    executeCustom,

    // Queue info (for debugging/monitoring)
    getQueueSize: () => requestQueue.current.length,
    getRateLimitInfo: () => ({
      currentRequests: requestTimestamps.current.filter(
        (t) => Date.now() - t < config.windowMs
      ).length,
      maxRequests: config.maxRequests,
      windowMs: config.windowMs,
    }),
  };
}
