import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const HealthTrendVisualization = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const periods = [
    { id: '3months', label: '3 mois' },
    { id: '6months', label: '6 mois' },
    { id: '1year', label: '1 an' }
  ];

  const metrics = [
    { id: 'overall', label: 'Score Global', color: '#4F8EDB' },
    { id: 'budget', label: 'Budget', color: '#10B981' },
    { id: 'savings', label: 'Épargne', color: '#7B68EE' },
    { id: 'debt', label: 'Dettes', color: '#F59E0B' }
  ];

  const healthData = [
    {
      month: 'Août 2024',
      overall: 65,
      budget: 70,
      savings: 45,
      debt: 75,
      prediction: null
    },
    {
      month: 'Sept 2024',
      overall: 68,
      budget: 72,
      savings: 50,
      debt: 73,
      prediction: null
    },
    {
      month: 'Oct 2024',
      overall: 71,
      budget: 75,
      savings: 55,
      debt: 70,
      prediction: null
    },
    {
      month: 'Nov 2024',
      overall: 74,
      budget: 78,
      savings: 62,
      debt: 68,
      prediction: null
    },
    {
      month: 'Déc 2024',
      overall: 76,
      budget: 80,
      savings: 65,
      debt: 65,
      prediction: null
    },
    {
      month: 'Jan 2025',
      overall: 78,
      budget: 85,
      savings: 68,
      debt: 62,
      prediction: null
    },
    {
      month: 'Fév 2025',
      overall: null,
      budget: null,
      savings: null,
      debt: null,
      prediction: 82
    },
    {
      month: 'Mars 2025',
      overall: null,
      budget: null,
      savings: null,
      debt: null,
      prediction: 85
    }
  ];

  const insights = [
    {
      type: 'positive',
      title: 'Tendance Positive',
      description: 'Votre score global a augmenté de 13 points en 6 mois',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      type: 'warning',
      title: 'Attention aux Dépenses',
      description: 'Légère hausse des dépenses variables ce mois-ci',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      type: 'opportunity',
      title: 'Opportunité d\'Épargne',
      description: 'Vous pourriez économiser 150€ de plus par mois',
      icon: 'Target',
      color: 'primary'
    }
  ];

  const selectedMetricData = metrics.find(m => m.id === selectedMetric);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card rounded-lg p-3 border border-glass-border shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey !== 'prediction' && '/100'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getInsightColor = (color) => {
    const colors = {
      success: 'text-success bg-success/10 border-success/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      primary: 'text-primary bg-primary/10 border-primary/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Évolution de la Santé Financière</h3>
          <p className="text-sm text-muted-foreground">Tendances et projections personnalisées</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Period Selector */}
          <div className="flex items-center glass-card rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-smooth ${
                  selectedPeriod === period.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-card rounded-xl p-4 border border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-foreground">Tendance des Scores</h4>
          <div className="flex items-center space-x-2">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`flex items-center px-2 py-1 rounded-lg text-xs font-medium transition-smooth ${
                  selectedMetric === metric.id
                    ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div 
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: metric.color }}
                />
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={selectedMetricData.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={selectedMetricData.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.1)" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={selectedMetricData.color}
                strokeWidth={2}
                fill="url(#colorGradient)"
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="prediction"
                stroke={selectedMetricData.color}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center mt-4 space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-0.5 bg-primary rounded-full" />
            <span>Données réelles</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-0.5 border-t-2 border-dashed border-primary rounded-full" />
            <span>Projection</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-3">
        <h4 className="text-md font-medium text-foreground">Analyses et Recommandations</h4>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className={`glass-card rounded-xl p-4 border ${getInsightColor(insight.color)}`}>
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getInsightColor(insight.color)}`}>
                  <Icon name={insight.icon} size={16} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-foreground mb-1">{insight.title}</h5>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
                <button className="p-1 hover:bg-muted/20 rounded-lg transition-smooth">
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benchmark Comparison */}
      <div className="glass-card rounded-xl p-4 border border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-foreground">Comparaison Anonyme</h4>
          <Icon name="Users" size={16} className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">78</div>
            <div className="text-xs text-muted-foreground mb-1">Votre Score</div>
            <div className="text-xs text-success">+15% vs moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">68</div>
            <div className="text-xs text-muted-foreground mb-1">Moyenne Communauté</div>
            <div className="text-xs text-muted-foreground">Tranche d'âge 25-35</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendVisualization;