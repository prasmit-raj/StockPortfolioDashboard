export interface Stock {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice?: number;
}

export interface PortfolioMetrics {
  totalInvestment: number;
  currentValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
}

export interface PortfolioWeight {
  name: string;
  weightage: number;
}