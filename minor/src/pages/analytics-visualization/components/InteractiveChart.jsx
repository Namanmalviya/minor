import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);



const InteractiveChart = ({ config, data, onExport }) => {
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  console.log(config)
  // Mock chart data based on configuration
  const generateChartData = (config) => {
    const mockData = {
      rd_metrics: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'R&D Spend (%)',
          data: [12.5, 13.2, 14.1, 13.8, 15.2, 16.1],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4
        }, {
          label: 'Patents Filed',
          data: [8, 12, 15, 18, 22, 25],
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          tension: 0.4
        }]
      },
      human_capital: {
        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
        datasets: [{
          label: 'Innovation Staff (%)',
          data: [35, 38, 42, 45],
          backgroundColor: ['#2563EB', '#059669', '#7C3AED', '#EA580C']
        }]
      },
      innovation_output: {
        labels: ['Products', 'Services', 'Patents', 'Startups'],
        datasets: [{
          label: 'Innovation Output',
          data: [45, 32, 28, 15],
          backgroundColor: ['#2563EB', '#059669', '#7C3AED', '#EA580C']
        }]
      }
    };

    return mockData?.[config?.dataSource] || mockData?.rd_metrics;
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setChartData(generateChartData(config));
      setIsLoading(false);
    }, 500);
  }, [config]);

  console.log(chartData)

  const renderChart = () => {
    if (!chartData) return null;

    switch (config?.chartType) {
     case "line":
  return (
    <div className="relative w-full h-96 bg-white rounded-lg p-4">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 12,
                font: { size: 12 },
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              ticks: { color: "#6b7280" },
              grid: { display: false },
            },
            y: {
              ticks: { color: "#6b7280" },
              grid: { color: "rgba(0,0,0,0.05)" },
            },
          },
        }}
      />
    </div>
  );

      
      case "bar":
  return (
    <div className="relative w-full h-96 bg-white rounded-lg p-4">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              ticks: { color: "#6b7280" },
              grid: { display: false },
            },
            y: {
              ticks: { color: "#6b7280" },
              grid: { color: "rgba(0,0,0,0.05)" },
            },
          },
        }}
      />
    </div>
  );

      
      case "pie":
  const pieDataset = chartData.datasets[0]; // Use the first dataset

  const pieData = {
    labels: chartData.labels,
    datasets: [
      {
        label: pieDataset.label,
        data: pieDataset.data,
        backgroundColor: [
          "#2563EB",
          "#059669",
          "#F59E0B",
          "#DC2626",
          "#7C3AED",
          "#14B8A6",
        ], // auto-colors
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relative w-full h-96 bg-white rounded-lg p-4">
      <Pie
        data={pieData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        }}
      />
    </div>
  );

      
      case 'heatmap':
        return (
          <div className="relative w-full h-96 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="Grid3X3" size={48} className="mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium text-foreground">Heatmap Visualization</p>
              <p className="text-sm text-muted-foreground mt-2">
                Data density mapping
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="relative w-full h-96 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="BarChart" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground">Select Chart Type</p>
              <p className="text-sm text-muted-foreground mt-2">
                Choose a visualization type to display your data
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart2" size={20} />
          <h3 className="font-semibold text-foreground">
            {config?.chartType ? `${config?.chartType?.charAt(0)?.toUpperCase() + config?.chartType?.slice(1)} Chart` : 'Data Visualization'}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => onExport('png')}
          >
            Export PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            onClick={() => onExport('pdf')}
          >
            Export PDF
          </Button>
          <Button
            variant="ghost"
            size="icon"
            iconName="Maximize2"
          />
        </div>
      </div>
      <div className="p-6" ref={chartRef}>
        {isLoading ? (
          <div className="w-full h-96 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Loading chart data...</p>
            </div>
          </div>
        ) : (
          renderChart()
        )}
      </div>
      {/* Chart Controls */}
      {config?.enableZoom && (
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-foreground">
                <Icon name="ZoomIn" size={16} />
                <span>Zoom In</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-foreground">
                <Icon name="ZoomOut" size={16} />
                <span>Zoom Out</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-foreground">
                <Icon name="RotateCcw" size={16} />
                <span>Reset</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span>Last updated: Nov 4, 2024 12:32 PM</span>
              <div className="w-2 h-2 bg-success rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveChart;