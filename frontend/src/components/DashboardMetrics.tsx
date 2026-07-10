
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { PortfolioMetrics } from '../types/stock';
import '../comp_css/DashboardMetrics.css';


interface Props {
  metrics: PortfolioMetrics;
}

export function DashboardMetrics({ metrics }: Props) {
  const isPositive = metrics.totalGainLoss >= 0;

  return (
    <div className="dashboard__metrics-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="dashboard__metric-item bg-white p-6 rounded-lg shadow-md">
        <div className="dashboard__metric-content flex items-center justify-between">
          <div>
            <p className="dashboard__metric-label text-sm text-gray-500">Total Investment</p>
            <p className="dashboard__metric-value text-2xl font-bold">${metrics.totalInvestment.toFixed(2)}</p>
          </div>
          <DollarSign className="dashboard__metric-icon h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="dashboard__metric-item bg-white p-6 rounded-lg shadow-md">
        <div className="dashboard__metric-content flex items-center justify-between">
          <div>
            <p className="dashboard__metric-label text-sm text-gray-500">Current Value</p>
            <p className="dashboard__metric-value text-2xl font-bold">${metrics.currentValue.toFixed(2)}</p>
          </div>
          <DollarSign className="dashboard__metric-icon h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="dashboard__metric-item bg-white p-6 rounded-lg shadow-md">
        <div className="dashboard__metric-content flex items-center justify-between">
          <div>
            <p className="dashboard__metric-label text-sm text-gray-500">Total Gain/Loss</p>
            <p className={`dashboard__metric-value text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              ${Math.abs(metrics.totalGainLoss).toFixed(2)}
            </p>
          </div>
          {isPositive ? (
            <TrendingUp className="dashboard__metric-icon h-8 w-8 text-green-500" />
          ) : (
            <TrendingDown className="dashboard__metric-icon h-8 w-8 text-red-500" />
          )}
        </div>
      </div>

      <div className="dashboard__metric-item bg-white p-6 rounded-lg shadow-md">
        <div className="dashboard__metric-content flex items-center justify-between">
          <div>
            <p className="dashboard__metric-label text-sm text-gray-500">Return</p>
            <p className={`dashboard__metric-value text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.gainLossPercentage.toFixed(2)}%
            </p>
          </div>
          <Percent className="dashboard__metric-icon h-8 w-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
}