export interface BlockfrostAssets {
    asset: string;
    asset_name: string;
    fingerprint: string;
    initial_mint_tx_hash: string;
    metadata: {
      name: string;
      description: string;
      logo: string;
      decimals: number;
      ticker: string;
      url: string;
    };
    mint_or_burn_count: number;
    quantity: string;
    policy_id: string;
}