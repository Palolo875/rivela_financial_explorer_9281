import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NavigationProgressIndicator = () => {
  const [healthScore, setHealthScore] = useState(78);
  const [dataCompletion, setDataCompletion] = useState(65);
  const [recentChange, setRecentChange] = useState(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate health score changes
      const newHealthScore = Math.max(0, Math.min(100, healthScore + (Math.random() - 0.5) * 2));
      if (Math.abs(newHealthScore - healthScore) > 0.5) {
        setHealthScore(Math.round(newHealthScore));
        setRecentChange({
          type: 'health',
          value: newHealthScore > healthScore ? '+' : '-',
          timestamp: Date.now()
        });
      }

      // Simulate data completion changes
      const newDataCompletion = Math.max(0, Math.min(100, dataCompletion + (Math.random() - 0.3) * 1));
      if (Math.abs(newDataCompletion - dataCompletion) > 0.5) {
        setDataCompletion(Math.round(newDataCompletion));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [healthScore, dataCompletion]);

  // Clear recent change after 3 seconds
  useEffect(() => {
    if (recentChange) {
      const timeout = setTimeout(() => {
        setRecentChange(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [recentChange]);

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getHealthScoreIcon = (score) => {
    if (score >= 80) return 'TrendingUp';
    if (score >= 60) return 'Minus';
    return 'TrendingDown';
  };

  const getCompletionColor = (completion) => {
    if (completion >= 90) return 'text-success';
    if (completion >= 70) return 'text-primary';
    if (completion >= 50) return 'text-warning';
    return 'text-error';
  };

  return (
    <>
      {/* Mobile Progress Indicators - Integrated with bottom navigation badges */}
      <div className="lg:hidden">
        {/* This component works in conjunction with BottomNavigation badges */}
      </div>

      {/* Desktop Progress Indicators */}
      <div className="hidden lg:flex fixed top-4 right-20 z-90 space-x-4">
        {/* Health Score Indicator */}
        <div className="glass-card rounded-lg px-3 py-2 flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getHealthScoreColor(healthScore)}`}>
            <Icon name={getHealthScoreIcon(healthScore)} size={16} />
            <span className="text-sm font-mono font-medium">
              {healthScore}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Santé
          </div>
          {recentChange && recentChange.type === 'health' && (
            <div className={`text-xs animate-fade-in ${
              recentChange.value === '+' ? 'text-success' : 'text-error'
            }`}>
              {recentChange.value}
            </div>
          )}
        </div>

        {/* Data Completion Indicator */}
        <div className="glass-card rounded-lg px-3 py-2 flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getCompletionColor(dataCompletion)}`}>
            <Icon name="Database" size={16} />
            <span className="text-sm font-mono font-medium">
              {dataCompletion}%
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Données
          </div>
        </div>

        {/* Progress Ring for Health Score */}
        <div className="glass-card rounded-lg p-2 flex items-center justify-center">
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-muted/30"
              />
              <circle
                cx="16"
                cy="16"
                r="12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 12}`}
                strokeDashoffset={`${2 * Math.PI * 12 * (1 - healthScore / 100)}`}
                className={`transition-all duration-500 ${getHealthScoreColor(healthScore)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon 
                name="Heart" 
                size={12} 
                className={getHealthScoreColor(healthScore)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Overlay for Insights */}
      {recentChange && (
        <div className="fixed top-20 right-4 z-100 glass-card rounded-lg p-3 animate-slide-up">
          <div className="flex items-center space-x-2">
            <Icon 
              name={recentChange.type === 'health' ? 'Heart' : 'Database'} 
              size={16} 
              className="text-primary"
            />
            <div className="text-sm">
              <span className="font-medium">
                {recentChange.type === 'health' ? 'Score de santé' : 'Données'} mis à jour
              </span>
              <div className="text-xs text-muted-foreground">
                {recentChange.type === 'health' 
                  ? `Nouveau score: ${healthScore}`
                  : `Completion: ${dataCompletion}%`
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationProgressIndicator;