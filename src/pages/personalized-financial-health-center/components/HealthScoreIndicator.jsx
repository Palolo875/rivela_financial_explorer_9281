import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const HealthScoreIndicator = ({ score = 78, trend = 'up', previousScore = 72 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
      if (score > previousScore) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [score, previousScore]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'from-success/20 to-success/5';
    if (score >= 60) return 'from-warning/20 to-warning/5';
    return 'from-error/20 to-error/5';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return 'Excellente';
    if (score >= 60) return 'Bonne';
    return 'À améliorer';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={`relative glass-card rounded-2xl p-6 bg-gradient-to-br ${getScoreBackground(score)} border border-glass-border`}>
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-ping absolute w-32 h-32 rounded-full bg-success/20"></div>
          <div className="animate-bounce text-2xl">🎉</div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Score de Santé Financière</h2>
          <p className="text-sm text-muted-foreground">Évaluation globale</p>
        </div>
        <div className="flex items-center space-x-1">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
            size={16} 
            className={trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'}
          />
          <span className="text-xs text-muted-foreground">
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
            {Math.abs(score - previousScore)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-muted/20"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-2000 ease-out ${getScoreColor(score)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {Math.round(animatedScore)}
            </span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          score >= 80 ? 'bg-success/10 text-success' :
          score >= 60 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
        }`}>
          <Icon name="Heart" size={14} className="mr-1" />
          {getScoreStatus(score)}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2 mt-4">
        <button className="flex-1 flex items-center justify-center px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-smooth">
          <Icon name="Target" size={14} className="mr-1" />
          Améliorer
        </button>
        <button className="flex-1 flex items-center justify-center px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium hover:bg-secondary/20 transition-smooth">
          <Icon name="Share2" size={14} className="mr-1" />
          Partager
        </button>
      </div>
    </div>
  );
};

export default HealthScoreIndicator;