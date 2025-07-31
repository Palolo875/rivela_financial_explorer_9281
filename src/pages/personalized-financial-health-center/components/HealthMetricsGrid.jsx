import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const HealthMetricsGrid = () => {
  const [expandedMetric, setExpandedMetric] = useState(null);

  const metrics = [
    {
      id: 'budget',
      title: 'Respect du Budget',
      value: 85,
      target: 90,
      unit: '%',
      trend: 'up',
      change: 5,
      icon: 'PieChart',
      color: 'success',
      description: 'Pourcentage de respect de votre budget mensuel',
      details: `Vous avez respecté 85% de votre budget ce mois-ci.\nC'est une amélioration de 5% par rapport au mois dernier.\n\nConseil: Continuez sur cette lancée en surveillant vos dépenses variables.`,
      benchmark: 78
    },
    {
      id: 'savings',title: 'Taux d\'Épargne',
      value: 22,
      target: 25,
      unit: '%',
      trend: 'up',
      change: 3,
      icon: 'Piggy Bank',
      color: 'primary',
      description: 'Pourcentage de vos revenus épargnés',
      details: `Votre taux d'épargne de 22% est excellent.\nVous épargnez 3% de plus qu'il y a 3 mois.\n\nObjectif: Atteindre 25% d'ici la fin de l'année.`,
      benchmark: 15
    },
    {
      id: 'debt',
      title: 'Ratio d\'Endettement',
      value: 28,
      target: 25,
      unit: '%',
      trend: 'down',
      change: -4,
      icon: 'CreditCard',
      color: 'warning',
      description: 'Pourcentage de vos revenus consacrés aux dettes',
      details: `Votre ratio d'endettement de 28% est dans la moyenne.\nVous avez réduit vos dettes de 4% ces derniers mois.\n\nConseil: Continuez à rembourser pour atteindre 25%.`,
      benchmark: 32
    },
    {
      id: 'goals',title: 'Progression Objectifs',value: 67,target: 100,unit: '%',trend: 'up',change: 12,icon: 'Target',color: 'secondary',description: 'Avancement vers vos objectifs financiers',
      details: `Vous avez accompli 67% de vos objectifs financiers.\nProgression de 12% ce trimestre.\n\n3 objectifs sur 5 sont en bonne voie d'être atteints.`,
      benchmark: 45
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      success: 'text-success bg-success/10 border-success/20',
      primary: 'text-primary bg-primary/10 border-primary/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colors[color] || colors.primary;
  };

  const handleMetricClick = (metricId) => {
    setExpandedMetric(expandedMetric === metricId ? null : metricId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Métriques Clés</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          Voir tout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="space-y-2">
            <div 
              className={`glass-card rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                expandedMetric === metric.id ? 'ring-2 ring-primary/20' : ''
              }`}
              onClick={() => handleMetricClick(metric.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                    <Icon name={metric.icon} size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{metric.title}</h4>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={metric.trend === 'up' ? 'text-success' : 'text-error'}
                  />
                  <span className={`text-xs font-medium ${
                    metric.trend === 'up' ? 'text-success' : 'text-error'
                  }`}>
                    {metric.trend === 'up' ? '+' : ''}{metric.change}{metric.unit}
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between mb-2">
                <div>
                  <span className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {metric.unit}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Objectif</div>
                  <div className="text-sm font-medium text-foreground">
                    {metric.target}{metric.unit}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted/30 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    metric.color === 'success' ? 'bg-success' :
                    metric.color === 'primary' ? 'bg-primary' :
                    metric.color === 'warning' ? 'bg-warning' :
                    metric.color === 'secondary'? 'bg-secondary' : 'bg-error'
                  }`}
                  style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                />
              </div>

              {/* Benchmark Comparison */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Moyenne: {metric.benchmark}{metric.unit}</span>
                <span className={metric.value > metric.benchmark ? 'text-success' : 'text-warning'}>
                  {metric.value > metric.benchmark ? 'Au-dessus' : 'En-dessous'} de la moyenne
                </span>
              </div>

              <Icon 
                name={expandedMetric === metric.id ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="mx-auto mt-2 text-muted-foreground"
              />
            </div>

            {/* Expanded Details */}
            {expandedMetric === metric.id && (
              <div className="glass-card rounded-xl p-4 bg-muted/5 border border-glass-border animate-fade-in">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Info" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Analyse Détaillée</span>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {metric.details}
                  </p>
                  <div className="flex space-x-2 pt-2">
                    <button className="flex-1 flex items-center justify-center px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-smooth">
                      <Icon name="TrendingUp" size={14} className="mr-1" />
                      Améliorer
                    </button>
                    <button className="flex-1 flex items-center justify-center px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium hover:bg-secondary/20 transition-smooth">
                      <Icon name="BarChart3" size={14} className="mr-1" />
                      Historique
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthMetricsGrid;