import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Stock, PortfolioWeight } from '../types/stock';
import { stockApi } from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  stocks: Stock[];
}

export function PortfolioWeightageChart({ stocks }: Props) {
  const [weightageData, setWeightageData] = useState<PortfolioWeight[]>([]);

  useEffect(() => {
    const fetchWeightage = async () => {
      try {
        const data = await stockApi.getPortfolioWeightage();
        setWeightageData(data);
      } catch (error) {
        console.error('Failed to fetch portfolio weightage:', error);
      }
    };

    if (stocks.length > 0) {
      fetchWeightage();
    }
  }, [stocks]);

  const chartData: ChartData<'doughnut'> = {
    labels: weightageData.map(item => item.name),
    datasets: [
      {
        data: weightageData.map(item => item.weightage),
        backgroundColor: [
          '#3B82F6', // blue-500
          '#10B981', // emerald-500
          '#F59E0B', // amber-500
          '#6366F1', // indigo-500
          '#EC4899', // pink-500
          '#8B5CF6', // violet-500
          '#EF4444', // red-500
          '#14B8A6', // teal-500
          '#F97316', // orange-500
          '#6B7280', // gray-500
        ].slice(0, weightageData.length),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
    cutout: '60%',
    maintainAspectRatio: false,
  };

  return (
    <div className="h-full">
      {weightageData.length > 0 ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No portfolio data available
        </div>
      )}
    </div>
  );
}