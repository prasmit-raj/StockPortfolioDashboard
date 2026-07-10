import React, { useState, useEffect } from 'react';
import { DashboardMetrics } from './components/DashboardMetrics';
import { StockForm } from './components/StockForm';
import { StockTable } from './components/StockTable';
import { PortfolioWeightageChart } from './components/PortfolioWeightageChart';
import { TopStocks } from './components/TopStocks';
import { Stock, PortfolioMetrics } from './types/stock';
import { stockApi } from './services/api';
import { AlertCircle, LayoutDashboard, TrendingUp } from 'lucide-react';

export default function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    totalInvestment: 0,
    currentValue: 0,
    totalGainLoss: 0,
    gainLossPercentage: 0,
  });
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'portfolio' | 'top-stocks'>('portfolio');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [stocksData, metricsData] = await Promise.all([
        stockApi.getAllStocks(),
        stockApi.getPortfolioMetrics(),
      ]);
      setStocks(stocksData);
      setMetrics(metricsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (stock: Stock) => {
    try {
      setLoading(true);
      if (editingStock) {
        await stockApi.updateStock(editingStock.id!, stock);
      } else {
        await stockApi.addStock(stock);
      }
      await fetchData();
      setEditingStock(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to save stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stock: Stock) => {
    setEditingStock(stock);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await stockApi.deleteStock(id);
      await fetchData();
      setError(null);
    } catch (err) {
      setError('Failed to delete stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Stock Portfolio Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('portfolio')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  currentView === 'portfolio'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Portfolio
              </button>
              <button
                onClick={() => setCurrentView('top-stocks')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  currentView === 'top-stocks'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Top 50 Stocks
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {currentView === 'portfolio' ? (
          <>
            <DashboardMetrics metrics={metrics} />

            <div className="space-y-8">
              {/* Portfolio Chart Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Portfolio Weightage</h2>
                <div className="h-[400px]">
                  <PortfolioWeightageChart stocks={stocks} />
                </div>
              </div>

              {/* Portfolio Holdings Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Portfolio Holdings</h2>
                  <button
                    onClick={() => {
                      setEditingStock(null);
                      setShowForm(!showForm);
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={loading}
                  >
                    {showForm ? 'Cancel' : 'Add Stock'}
                  </button>
                </div>

                {showForm && (
                  <div className="mb-6">
                    <StockForm 
                      onSubmit={handleSubmit} 
                      initialData={editingStock || undefined}
                      isLoading={loading}
                    />
                  </div>
                )}

                <StockTable
                  stocks={stocks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isLoading={loading}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <TopStocks />
          </div>
        )}
      </div>
    </div>
  );
}