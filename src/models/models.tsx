
export interface TokenPairs {
    orca_sol_usdc: TokenPair;
    orca_sol_usdt: TokenPair;
    orca_usdc_usdt: TokenPair;
    arbitrage_analysis: ArbitrageAnalysis;
}

export interface TokenPair {
    timestamp: number;
    token_a: string;
    token_a_reserves: number;
    token_a_spot_price_in_token_b: number;
    token_b: string;
    token_b_reserves: number;
    token_b_spot_price_in_token_a: number;
}

export interface PriceAnalysis {
    timestamp: number;
    orcaSolUsdtSpotPrice: number;
    orcaSolUsdcSpotPrice: number;
    arbitrageOpportunity: number;
    arbitrageOpportunityPctg: number;
}

export interface ArbitrageAnalysis {
    arbitrage_opportunity: number;
    arbitrage_opportunity_pctg: number;
    sol_usdc_usdt_coefficient: number;
    sol_usdt_usdc_coefficient: number;
}