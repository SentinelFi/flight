import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from '@stellar/stellar-sdk/contract';
import type { u32, u64, i128, Option } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
/**
 * Storage keys for registry
 */
export type RegistryStorageKey = {
    tag: "Insurances";
    values: void;
} | {
    tag: "ByVertical";
    values: void;
} | {
    tag: "ByStatus";
    values: void;
} | {
    tag: "TotalCount";
    values: void;
};
export type BonusDistribution = {
    tag: "None";
    values: void;
} | {
    tag: "PremiumSide";
    values: void;
} | {
    tag: "RiskSide";
    values: void;
} | {
    tag: "Both";
    values: void;
} | {
    tag: "Proportional";
    values: void;
};
export interface BonusConfig {
    bonus_amount: i128;
    bonus_token: string;
    distribution: BonusDistribution;
}
export interface DeploymentConfig {
    allow_cover_without_premiums: boolean;
    allow_premium_without_coverage: boolean;
    arbitrator: string;
    author: string;
    bonus_amount: i128;
    bonus_token: string;
    claim_grace_period: Option<u64>;
    coverage_principle: CoveragePrinciple;
    created_at: u64;
    decimals_offset: u32;
    description: string;
    dispute_fee: i128;
    dispute_period: u64;
    event_time: u64;
    fee_admin_bps: u32;
    fee_performance_bps: u32;
    fee_recipient: string;
    lock_period_after: u64;
    lock_period_before: u64;
    max_coverage_ratio: Option<u32>;
    max_premium_amount: i128;
    max_premium_capital: i128;
    max_premium_users: u32;
    max_underwrite_amount: i128;
    max_underwrite_capital: i128;
    max_underwrite_users: u32;
    min_premium_amount: i128;
    min_underwrite_amount: i128;
    name: string;
    oracle_source: string;
    resolution_type: ResolutionType;
    resolver: Option<string>;
    strategy_protocol: string;
    strategy_type: StrategyType;
    trigger_value: i128;
    trusted_providers: Array<string>;
    underlying_asset: string;
    version: u32;
    vertical: Vertical;
    yield_recipient: YieldRecipient;
}
export interface WasmHashes {
    controller_wasm_hash: Buffer;
    global_pool_wasm_hash: Buffer;
    hedge_pool_wasm_hash: Buffer;
    oracle_wasm_hash: Buffer;
    registry_wasm_hash: Buffer;
    risk_pool_wasm_hash: Buffer;
    vertical_pool_wasm_hash: Buffer;
}
export type CoveragePrinciple = {
    tag: "FIFO";
    values: void;
} | {
    tag: "Distributed";
    values: void;
};
export type ResolutionType = {
    tag: "Automatic";
    values: void;
} | {
    tag: "Manual";
    values: void;
};
export interface UnderwriterInfo {
    address: string;
    amount: i128;
    layer: u32;
    shares: i128;
    timestamp: u64;
    tranche: Option<u32>;
}
export interface DisputeStatus {
    created_at: u64;
    decision: boolean;
    disputer: string;
    reason: string;
    resolved: boolean;
    resolved_at: Option<u64>;
}
export interface DisputeConfig {
    arbitrator: Option<string>;
    dispute_fee: i128;
    dispute_period: u64;
}
export interface PolicyInfo {
    claimed: boolean;
    id: u32;
    owner: string;
    premium_amount: i128;
    purchase_time: u64;
}
export interface EventInfo {
    event_end: u64;
    event_start: u64;
    event_time: u64;
    resolution_type: ResolutionType;
    resolver: Option<string>;
    trigger_value: i128;
}
export interface OracleData {
    attestation: Option<Buffer>;
    provider: string;
    timestamp: u64;
    value: i128;
    verified: boolean;
}
export interface FeeConfig {
    admin_fee_bps: u32;
    fee_recipient: string;
    performance_fee_bps: u32;
}
export interface InsuranceRecord {
    controller: string;
    deployer: string;
    event_time: u64;
    name: string;
    status: PoolStatus;
    timestamp: u64;
    underlying_asset: string;
    vertical: Vertical;
}
export interface Limits {
    allow_cover_without_premiums: boolean;
    allow_premium_without_coverage: boolean;
    max_coverage_ratio: Option<u32>;
    max_premium_amount: i128;
    max_premium_capital: i128;
    max_premium_users: u32;
    max_underwrite_amount: i128;
    max_underwrite_capital: i128;
    max_underwrite_users: u32;
    min_premium_amount: i128;
    min_underwrite_amount: i128;
}
export interface InsuranceMetadata {
    author: string;
    created_at: u64;
    decimals_offset: u32;
    description: string;
    name: string;
    underlying_asset: string;
    version: u32;
    vertical: Vertical;
}
export interface PoolAddresses {
    hedge_pool: string;
    risk_pool_l1: string;
    risk_pool_l2: string;
    risk_pool_l3: string;
}
export type PoolStatus = {
    tag: "Active";
    values: void;
} | {
    tag: "Locked";
    values: void;
} | {
    tag: "Resolved";
    values: void;
} | {
    tag: "Disputed";
    values: void;
} | {
    tag: "Finalized";
    values: void;
};
export type StrategyType = {
    tag: "None";
    values: void;
} | {
    tag: "Lending";
    values: void;
} | {
    tag: "Staking";
    values: void;
};
export type YieldRecipient = {
    tag: "None";
    values: void;
} | {
    tag: "Premiums";
    values: void;
} | {
    tag: "Risk";
    values: void;
} | {
    tag: "Both";
    values: void;
} | {
    tag: "Admin";
    values: void;
};
export interface StrategyConfig {
    strategy_type: StrategyType;
    target_protocol: Option<string>;
    yield_recipient: YieldRecipient;
}
export type Vertical = {
    tag: "Flight";
    values: void;
};
export type RiskTranche = {
    tag: "Junior";
    values: void;
} | {
    tag: "Medium";
    values: void;
} | {
    tag: "Senior";
    values: void;
};
export declare const CryptoError: {
    /**
     * The merkle proof length is out of bounds.
     */
    1400: {
        message: string;
    };
    /**
     * The index of the leaf is out of bounds.
     */
    1401: {
        message: string;
    };
    /**
     * No data in hasher state.
     */
    1402: {
        message: string;
    };
};
export type Rounding = {
    tag: "Floor";
    values: void;
} | {
    tag: "Ceil";
    values: void;
};
/**
 * Storage keys for the data associated with `MerkleDistributor`
 */
export type MerkleDistributorStorageKey = {
    tag: "Root";
    values: void;
} | {
    tag: "Claimed";
    values: readonly [u32];
};
export declare const MerkleDistributorError: {
    /**
     * The merkle root is not set.
     */
    1300: {
        message: string;
    };
    /**
     * The provided index was already claimed.
     */
    1301: {
        message: string;
    };
    /**
     * The proof is invalid.
     */
    1302: {
        message: string;
    };
};
/**
 * Storage key for the pausable state
 */
export type PausableStorageKey = {
    tag: "Paused";
    values: void;
};
export declare const PausableError: {
    /**
     * The operation failed because the contract is paused.
     */
    1000: {
        message: string;
    };
    /**
     * The operation failed because the contract is not paused.
     */
    1001: {
        message: string;
    };
};
export declare const UpgradeableError: {
    /**
     * When migration is attempted but not allowed due to upgrade state.
     */
    1100: {
        message: string;
    };
};
/**
 * Storage keys for the data associated with the allowlist extension
 */
export type AllowListStorageKey = {
    tag: "Allowed";
    values: readonly [string];
};
/**
 * Storage keys for the data associated with the blocklist extension
 */
export type BlockListStorageKey = {
    tag: "Blocked";
    values: readonly [string];
};
/**
 * Storage keys for the data associated with the vault extension
 */
export type VaultStorageKey = {
    tag: "AssetAddress";
    values: void;
} | {
    tag: "VirtualDecimalsOffset";
    values: void;
};
/**
 * Storage key that maps to [`AllowanceData`]
 */
export interface AllowanceKey {
    owner: string;
    spender: string;
}
/**
 * Storage container for the amount of tokens for which an allowance is granted
 * and the ledger number at which this allowance expires.
 */
export interface AllowanceData {
    amount: i128;
    live_until_ledger: u32;
}
/**
 * Storage keys for the data associated with `FungibleToken`
 */
export type StorageKey = {
    tag: "TotalSupply";
    values: void;
} | {
    tag: "Balance";
    values: readonly [string];
} | {
    tag: "Allowance";
    values: readonly [AllowanceKey];
};
/**
 * Storage container for token metadata
 */
export interface Metadata {
    decimals: u32;
    name: string;
    symbol: string;
}
/**
 * Storage key for accessing the SAC address
 */
export type SACAdminGenericDataKey = {
    tag: "Sac";
    values: void;
};
/**
 * Storage key for accessing the SAC address
 */
export type SACAdminWrapperDataKey = {
    tag: "Sac";
    values: void;
};
export declare const FungibleTokenError: {
    /**
     * Indicates an error related to the current balance of account from which
     * tokens are expected to be transferred.
     */
    100: {
        message: string;
    };
    /**
     * Indicates a failure with the allowance mechanism when a given spender
     * doesn't have enough allowance.
     */
    101: {
        message: string;
    };
    /**
     * Indicates an invalid value for `live_until_ledger` when setting an
     * allowance.
     */
    102: {
        message: string;
    };
    /**
     * Indicates an error when an input that must be >= 0
     */
    103: {
        message: string;
    };
    /**
     * Indicates overflow when adding two values
     */
    104: {
        message: string;
    };
    /**
     * Indicates access to uninitialized metadata
     */
    105: {
        message: string;
    };
    /**
     * Indicates that the operation would have caused `total_supply` to exceed
     * the `cap`.
     */
    106: {
        message: string;
    };
    /**
     * Indicates the supplied `cap` is not a valid cap value.
     */
    107: {
        message: string;
    };
    /**
     * Indicates the Cap was not set.
     */
    108: {
        message: string;
    };
    /**
     * Indicates the SAC address was not set.
     */
    109: {
        message: string;
    };
    /**
     * Indicates a SAC address different than expected.
     */
    110: {
        message: string;
    };
    /**
     * Indicates a missing function parameter in the SAC contract context.
     */
    111: {
        message: string;
    };
    /**
     * Indicates an invalid function parameter in the SAC contract context.
     */
    112: {
        message: string;
    };
    /**
     * The user is not allowed to perform this operation
     */
    113: {
        message: string;
    };
    /**
     * The user is blocked and cannot perform this operation
     */
    114: {
        message: string;
    };
    /**
     * Indicates access to uninitialized vault asset address.
     */
    115: {
        message: string;
    };
    /**
     * Indicates that vault asset address is already set.
     */
    116: {
        message: string;
    };
    /**
     * Indicates that vault virtual decimals offset is already set.
     */
    117: {
        message: string;
    };
    /**
     * Indicates the amount is not a valid vault assets value.
     */
    118: {
        message: string;
    };
    /**
     * Indicates the amount is not a valid vault shares value.
     */
    119: {
        message: string;
    };
    /**
     * Attempted to deposit more assets than the max amount for address.
     */
    120: {
        message: string;
    };
    /**
     * Attempted to mint more shares than the max amount for address.
     */
    121: {
        message: string;
    };
    /**
     * Attempted to withdraw more assets than the max amount for address.
     */
    122: {
        message: string;
    };
    /**
     * Attempted to redeem more shares than the max amount for address.
     */
    123: {
        message: string;
    };
};
/**
 * Storage keys for the data associated with the consecutive extension of
 * `NonFungibleToken`
 */
export type NFTConsecutiveStorageKey = {
    tag: "Approval";
    values: readonly [u32];
} | {
    tag: "Owner";
    values: readonly [u32];
} | {
    tag: "OwnershipBucket";
    values: readonly [u32];
} | {
    tag: "BurnedToken";
    values: readonly [u32];
};
export interface OwnerTokensKey {
    index: u32;
    owner: string;
}
/**
 * Storage keys for the data associated with the enumerable extension of
 * `NonFungibleToken`
 */
export type NFTEnumerableStorageKey = {
    tag: "TotalSupply";
    values: void;
} | {
    tag: "OwnerTokens";
    values: readonly [OwnerTokensKey];
} | {
    tag: "OwnerTokensIndex";
    values: readonly [u32];
} | {
    tag: "GlobalTokens";
    values: readonly [u32];
} | {
    tag: "GlobalTokensIndex";
    values: readonly [u32];
};
/**
 * Storage container for royalty information
 */
export interface RoyaltyInfo {
    basis_points: u32;
    receiver: string;
}
/**
 * Storage keys for royalty data
 */
export type NFTRoyaltiesStorageKey = {
    tag: "DefaultRoyalty";
    values: void;
} | {
    tag: "TokenRoyalty";
    values: readonly [u32];
};
/**
 * Storage container for the token for which an approval is granted
 * and the ledger number at which this approval expires.
 */
export interface ApprovalData {
    approved: string;
    live_until_ledger: u32;
}
/**
 * Storage container for token metadata
 */
export interface Metadata {
    base_uri: string;
    name: string;
    symbol: string;
}
/**
 * Storage keys for the data associated with `NonFungibleToken`
 */
export type NFTStorageKey = {
    tag: "Owner";
    values: readonly [u32];
} | {
    tag: "Balance";
    values: readonly [string];
} | {
    tag: "Approval";
    values: readonly [u32];
} | {
    tag: "ApprovalForAll";
    values: readonly [string, string];
} | {
    tag: "Metadata";
    values: void;
};
export type NFTSequentialStorageKey = {
    tag: "TokenIdCounter";
    values: void;
};
export declare const NonFungibleTokenError: {
    /**
     * Indicates a non-existent `token_id`.
     */
    200: {
        message: string;
    };
    /**
     * Indicates an error related to the ownership over a particular token.
     * Used in transfers.
     */
    201: {
        message: string;
    };
    /**
     * Indicates a failure with the `operator`s approval. Used in transfers.
     */
    202: {
        message: string;
    };
    /**
     * Indicates a failure with the `approver` of a token to be approved. Used
     * in approvals.
     */
    203: {
        message: string;
    };
    /**
     * Indicates an invalid value for `live_until_ledger` when setting
     * approvals.
     */
    204: {
        message: string;
    };
    /**
     * Indicates overflow when adding two values
     */
    205: {
        message: string;
    };
    /**
     * Indicates all possible `token_id`s are already in use.
     */
    206: {
        message: string;
    };
    /**
     * Indicates an invalid amount to batch mint in `consecutive` extension.
     */
    207: {
        message: string;
    };
    /**
     * Indicates the token does not exist in owner's list.
     */
    208: {
        message: string;
    };
    /**
     * Indicates the token does not exist in global list.
     */
    209: {
        message: string;
    };
    /**
     * Indicates access to unset metadata.
     */
    210: {
        message: string;
    };
    /**
     * Indicates the length of the base URI exceeds the maximum allowed.
     */
    211: {
        message: string;
    };
    /**
     * Indicates the royalty amount is higher than 10_000 (100%) basis points.
     */
    212: {
        message: string;
    };
};
/**
 * Storage keys for claim issuer key management.
 */
export type ClaimIssuerStorageKey = {
    tag: "TopicKey";
    values: readonly [Buffer, u32];
} | {
    tag: "RevokedClaim";
    values: readonly [Buffer];
};
/**
 * Signature data for Ed25519 scheme.
 */
export interface Ed25519SignatureData {
    public_key: Buffer;
    signature: Buffer;
}
/**
 * Signature data for Secp256r1 scheme.
 */
export interface Secp256r1SignatureData {
    public_key: Buffer;
    signature: Buffer;
}
/**
 * Signature data for Secp256k1 scheme.
 */
export interface Secp256k1SignatureData {
    public_key: Buffer;
    recovery_id: u32;
    signature: Buffer;
}
export declare const ClaimIssuerError: {
    /**
     * Signature data length does not match the expected scheme.
     */
    350: {
        message: string;
    };
    /**
     * The provided key is empty.
     */
    351: {
        message: string;
    };
    /**
     * The key is already allowed for the specified topic.
     */
    352: {
        message: string;
    };
    /**
     * The specified key was not found in the allowed keys.
     */
    353: {
        message: string;
    };
};
/**
 * Storage keys for the data associated with the claim topics and issuers
 * extension
 */
export type ClaimTopicsAndIssuersStorageKey = {
    tag: "ClaimTopics";
    values: void;
} | {
    tag: "TrustedIssuers";
    values: void;
} | {
    tag: "IssuerClaimTopics";
    values: readonly [string];
} | {
    tag: "ClaimTopicIssuers";
    values: readonly [u32];
};
export declare const ClaimTopicsAndIssuersError: {
    /**
     * Indicates a non-existent claim topic.
     */
    370: {
        message: string;
    };
    /**
     * Indicates a non-existent trusted issuer.
     */
    371: {
        message: string;
    };
    /**
     * Indicates a claim topic already exists.
     */
    372: {
        message: string;
    };
    /**
     * Indicates a trusted issuer already exists.
     */
    373: {
        message: string;
    };
    /**
     * Indicates max claim topics limit is reached.
     */
    374: {
        message: string;
    };
    /**
     * Indicates max trusted issuers limit is reached.
     */
    375: {
        message: string;
    };
    /**
     * Indicates claim topics set provided for the issuer cannot be empty.
     */
    376: {
        message: string;
    };
};
/**
 * Storage keys for the modular compliance contract.
 */
export type DataKey = {
    tag: "HookModules";
    values: readonly [ComplianceHook];
} | {
    tag: "ModuleRegistered";
    values: readonly [ComplianceHook, string];
};
/**
 * Hook types for modular compliance system.
 *
 * Each hook type represents a specific event or validation point
 * where compliance modules can be executed.
 */
export type ComplianceHook = {
    tag: "Transferred";
    values: void;
} | {
    tag: "Created";
    values: void;
} | {
    tag: "Destroyed";
    values: void;
} | {
    tag: "CanTransfer";
    values: void;
} | {
    tag: "CanCreate";
    values: void;
};
export declare const ComplianceError: {
    /**
     * Indicates a module is already registered for this hook.
     */
    360: {
        message: string;
    };
    /**
     * Indicates a module is not registered for this hook.
     */
    361: {
        message: string;
    };
    /**
     * Indicates a module bound is exceeded.
     */
    362: {
        message: string;
    };
};
/**
 * Represents a document with its metadata.
 */
export interface Document {
    /**
   * The hash of the document contents.
   */
    document_hash: Buffer;
    /**
   * Timestamp when the document was last modified.
   */
    timestamp: u64;
    /**
   * The URI where the document can be accessed.
   */
    uri: string;
}
/**
 * Storage keys for document management.
 */
export type DocumentStorageKey = {
    tag: "Document";
    values: readonly [Buffer];
} | {
    tag: "DocumentList";
    values: void;
};
/**
 * Error codes for document management operations.
 */
export declare const DocumentError: {
    /**
     * The specified document was not found.
     */
    380: {
        message: string;
    };
};
/**
 * Represents a claim stored on-chain.
 */
export interface Claim {
    /**
   * The claim data
   */
    data: Buffer;
    /**
   * The address of the claim issuer
   */
    issuer: string;
    /**
   * The signature scheme used
   */
    scheme: u32;
    /**
   * The cryptographic signature
   */
    signature: Buffer;
    /**
   * The claim topic (numeric identifier)
   */
    topic: u32;
    /**
   * Optional URI for additional information
   */
    uri: string;
}
/**
 * Storage keys for the data associated with Identity Claims.
 */
export type ClaimsStorageKey = {
    tag: "Claim";
    values: readonly [Buffer];
} | {
    tag: "ClaimsByTopic";
    values: readonly [u32];
};
export declare const ClaimsError: {
    /**
     * Claim  ID does not exist.
     */
    340: {
        message: string;
    };
    /**
     * Claim Issuer cannot validate the claim (revocation, signature mismatch,
     * unauthorized signing key, etc.)
     */
    341: {
        message: string;
    };
};
/**
 * Represents the type of identity holder
 */
export type IdentityType = {
    tag: "Individual";
    values: void;
} | {
    tag: "Organization";
    values: void;
};
/**
 * Represents different types of country relationships for individuals
 */
export type CountryCode = string;
export type IndividualCountryRelation = {
    tag: "Residence";
    values: readonly [CountryCode];
} | {
    tag: "Citizenship";
    values: readonly [CountryCode];
} | {
    tag: "SourceOfFunds";
    values: readonly [CountryCode];
} | {
    tag: "TaxResidency";
    values: readonly [CountryCode];
} | {
    tag: "Custom";
    values: readonly [string, CountryCode];
};
/**
 * Represents different types of country relationships for organizations
 */
export type OrganizationCountryRelation = {
    tag: "Incorporation";
    values: readonly [CountryCode];
} | {
    tag: "OperatingJurisdiction";
    values: readonly [CountryCode];
} | {
    tag: "TaxJurisdiction";
    values: readonly [CountryCode];
} | {
    tag: "SourceOfFunds";
    values: readonly [CountryCode];
} | {
    tag: "Custom";
    values: readonly [string, CountryCode];
};
/**
 * Unified country relationship that can be either individual or organizational
 */
export type CountryRelation = {
    tag: "Individual";
    values: readonly [IndividualCountryRelation];
} | {
    tag: "Organization";
    values: readonly [OrganizationCountryRelation];
};
/**
 * A country data containing the country relationship and optional metadata
 */
export interface CountryData {
    /**
   * Type of country relationship
   */
    country: CountryRelation;
    /**
   * Optional metadata (e.g., visa type, validity period)
   */
    metadata: Option<Map<string, string>>;
}
/**
 * Complete identity profile containing identity type and country data
 */
export interface IdentityProfile {
    countries: Array<CountryData>;
    identity_type: IdentityType;
}
/**
 * Storage keys for the data associated with Identity Storage Registry.
 */
export type IRSStorageKey = {
    tag: "Identity";
    values: readonly [string];
} | {
    tag: "IdentityProfile";
    values: readonly [string];
};
/**
 * Error codes for the Identity Registry Storage system.
 */
export declare const IRSError: {
    /**
     * An identity already exists for the given account.
     */
    320: {
        message: string;
    };
    /**
     * No identity found for the given account.
     */
    321: {
        message: string;
    };
    /**
     * Country data not found at the specified index.
     */
    322: {
        message: string;
    };
    /**
     * Identity can't be with empty country data list.
     */
    323: {
        message: string;
    };
    /**
     * The maximum number of country entries has been reached.
     */
    324: {
        message: string;
    };
};
/**
 * Storage keys for the data associated with `RWA` token
 */
export type RWAStorageKey = {
    tag: "AddressFrozen";
    values: readonly [string];
} | {
    tag: "FrozenTokens";
    values: readonly [string];
} | {
    tag: "Compliance";
    values: void;
} | {
    tag: "OnchainId";
    values: void;
} | {
    tag: "Version";
    values: void;
} | {
    tag: "ClaimTopicsAndIssuers";
    values: void;
} | {
    tag: "IdentityRegistryStorage";
    values: void;
};
/**
 * Storage keys for the token binder system.
 *
 * - Tokens are stored in buckets of 100 addresses each
 * - Each bucket is a `Vec<Address>` stored under its bucket index
 * - Total count is tracked separately
 * - When a token is unbound, the last token is moved to fill the gap
 * (swap-remove pattern)
 */
export type TokenBinderStorageKey = {
    tag: "TokenBucket";
    values: readonly [u32];
} | {
    tag: "TotalCount";
    values: void;
};
/**
 * Error codes for the Token Binder system.
 */
export declare const TokenBinderError: {
    /**
     * The specified token was not found in the bound tokens list.
     */
    330: {
        message: string;
    };
    /**
     * Attempted to bind a token that is already bound.
     */
    331: {
        message: string;
    };
    /**
     * Total token capacity (MAX_TOKENS) has been reached.
     */
    332: {
        message: string;
    };
    /**
     * Batch bind size exceeded.
     */
    333: {
        message: string;
    };
    /**
     * The batch contains duplicates.
     */
    334: {
        message: string;
    };
};
export declare const RWAError: {
    /**
     * Indicates an error related to insufficient balance for the operation.
     */
    300: {
        message: string;
    };
    /**
     * Indicates an error when an input must be >= 0.
     */
    301: {
        message: string;
    };
    /**
     * Indicates the address is frozen and cannot perform operations.
     */
    302: {
        message: string;
    };
    /**
     * Indicates insufficient free tokens (due to partial freezing).
     */
    303: {
        message: string;
    };
    /**
     * Indicates an identity cannot be verified.
     */
    304: {
        message: string;
    };
    /**
     * Indicates the transfer does not comply with the compliance rules.
     */
    305: {
        message: string;
    };
    /**
     * Indicates the mint operation does not comply with the compliance rules.
     */
    306: {
        message: string;
    };
    /**
     * Indicates the compliance contract is not set.
     */
    307: {
        message: string;
    };
    /**
     * Indicates the onchain ID is not set.
     */
    308: {
        message: string;
    };
    /**
     * Indicates the version is not set.
     */
    309: {
        message: string;
    };
    /**
     * Indicates the claim topics and issuers contract is not set.
     */
    310: {
        message: string;
    };
    /**
     * Indicates the identity registry storage contract is not set.
     */
    311: {
        message: string;
    };
};
export interface Client {
    /**
     * Construct and simulate a register transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    register: ({ insurance, record }: {
        insurance: string;
        record: InsuranceRecord;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<boolean>>;
    /**
     * Construct and simulate a update_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_status: ({ insurance, new_status }: {
        insurance: string;
        new_status: PoolStatus;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<boolean>>;
    /**
     * Construct and simulate a get_all transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_all: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Array<InsuranceRecord>>>;
    /**
     * Construct and simulate a get_by_vertical transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_by_vertical: ({ vertical }: {
        vertical: Vertical;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Array<string>>>;
    /**
     * Construct and simulate a get_by_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_by_status: ({ status }: {
        status: PoolStatus;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Array<string>>>;
    /**
     * Construct and simulate a get_insurance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_insurance: ({ insurance }: {
        insurance: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Option<InsuranceRecord>>>;
    /**
     * Construct and simulate a get_active_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_active_count: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a get_total_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_total_count: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a search transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    search: ({ vertical, status, asset, after_timestamp, before_timestamp }: {
        vertical: Option<Vertical>;
        status: Option<PoolStatus>;
        asset: Option<string>;
        after_timestamp: Option<u64>;
        before_timestamp: Option<u64>;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Array<InsuranceRecord>>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        register: (json: string) => AssembledTransaction<boolean>;
        update_status: (json: string) => AssembledTransaction<boolean>;
        get_all: (json: string) => AssembledTransaction<InsuranceRecord[]>;
        get_by_vertical: (json: string) => AssembledTransaction<string[]>;
        get_by_status: (json: string) => AssembledTransaction<string[]>;
        get_insurance: (json: string) => AssembledTransaction<Option<InsuranceRecord>>;
        get_active_count: (json: string) => AssembledTransaction<number>;
        get_total_count: (json: string) => AssembledTransaction<number>;
        search: (json: string) => AssembledTransaction<InsuranceRecord[]>;
    };
}
