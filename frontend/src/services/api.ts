import { Stock, PortfolioMetrics, PortfolioWeight } from '../types/stock';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;


const COIN_API_URL = 'http://localhost:8080/coins';

export const stockApi = {
  // Fetch all stocks
  getAllStocks: async (): Promise<Stock[]> => {
    const response = await fetch(`${API_BASE_URL}/stocks`);
    if (!response.ok) throw new Error('Failed to fetch stocks');
    return response.json();
  },
   // Fetch real-time stock price
   getRealTimePrice: async (ticker: string): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/prices/${ticker}/current`);
    if (!response.ok) throw new Error(`Failed to fetch price for ${ticker}`);
    return await response.json(); // Directly returns the price
  },

  // Add a new stock
  addStock: async (stock: Omit<Stock, 'id' | 'currentPrice'>): Promise<Stock> => {
    const response = await fetch(`${API_BASE_URL}/stocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stock),
    });
    if (!response.ok) throw new Error('Failed to add stock');
    return response.json();
  },

  // Update an existing stock
  updateStock: async (id: number, stock: Omit<Stock, 'id' | 'currentPrice'>): Promise<Stock> => {
    const response = await fetch(`${API_BASE_URL}/stocks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stock),
    });
    if (!response.ok) throw new Error('Failed to update stock');
    return response.json();
  },

  // Delete a stock
  deleteStock: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/stocks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete stock');
  },

  // Get portfolio metrics
  getPortfolioMetrics: async (): Promise<PortfolioMetrics> => {
    const response = await fetch(`${API_BASE_URL}/portfolio/metrics`);
    if (!response.ok) throw new Error('Failed to fetch portfolio metrics');
    return response.json();
  },

  // Get portfolio weightage
  getPortfolioWeightage: async (): Promise<PortfolioWeight[]> => {
    const response = await fetch(`${API_BASE_URL}/portfolio/weightage`);
    if (!response.ok) throw new Error('Failed to fetch portfolio weightage');
    return response.json();
  },

  // Get top 50 stocks
  getTop50Stocks: async () => {
    const response = await fetch(`${COIN_API_URL}/top50`);
    if (!response.ok) throw new Error('Failed to fetch top 50 stocks');
    return response.json();
  },
};