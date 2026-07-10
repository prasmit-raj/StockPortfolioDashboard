import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { Stock } from '../types/stock';
import { stockApi } from '../services/api';
import '../comp_css/StockTable.css';

interface Props {
  stocks: Stock[];
  onEdit: (stock: Stock) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export function StockTable({ stocks, onEdit, onDelete, isLoading }: Props) {
  const [realTimeStocks, setRealTimeStocks] = useState<Stock[]>(stocks);

  // Function to update real-time stock prices
  const updateStockPrices = async () => {
    try {
      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          try {
            const currentPrice = await stockApi.getRealTimePrice(stock.ticker);
            // const currentPrice = 90;
            return { ...stock, currentPrice };
          } catch (error) {
            console.error(`Error fetching price for ${stock.ticker}:`, error);
            return stock; // Keep existing stock if fetch fails
          }
        })
      );
      setRealTimeStocks(updatedStocks);
    } catch (error) {
      console.error('Error updating stock prices:', error);
    }
  };

  // Effect to fetch real-time prices periodically
  useEffect(() => {
    setRealTimeStocks(stocks); // Initialize real-time data with initial stocks
    updateStockPrices(); // Fetch prices initially

    const interval = setInterval(updateStockPrices, 21600000); // Refresh every 1000000 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [stocks]);

  if (isLoading && stocks.length === 0) {
    return (
      <div className="loader-container">
        <Loader2 className="loader" />
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="stock-table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Stock Name</th>
            <th className="table-header-cell">Ticker</th>
            <th className="table-header-cell">Quantity</th>
            <th className="table-header-cell">Buy Price</th>
            <th className="table-header-cell">Current Price</th>
            <th className="table-header-cell">Gain/Loss</th>
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {realTimeStocks.map((stock) => {
            const gainLoss = ((stock.currentPrice || 0) - stock.buyPrice) * stock.quantity;
            const gainLossPercentage = ((stock.currentPrice || 0) - stock.buyPrice) / stock.buyPrice * 100;

            return (
              <tr key={stock.id} className={isLoading ? 'row-loading' : ''}>
                <td className="table-cell">{stock.name}</td>
                <td className="table-cell">{stock.ticker}</td>
                <td className="table-cell">{stock.quantity}</td>
                <td className="table-cell">${stock.buyPrice.toFixed(2)}</td>
                <td className="table-cell">${(stock.currentPrice || 0).toFixed(2)}</td>
                <td className={`table-cell ${gainLoss >= 0 ? 'gain' : 'loss'}`}>
                  ${Math.abs(gainLoss).toFixed(2)} ({gainLossPercentage.toFixed(2)}%)
                </td>
                <td className="table-cell action-cell">
                  <button onClick={() => onEdit(stock)} className="edit-button" disabled={isLoading}>
                    <Pencil className="icon" />
                  </button>
                  <button onClick={() => stock.id && onDelete(stock.id)} className="delete-button" disabled={isLoading}>
                    <Trash2 className="icon" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
