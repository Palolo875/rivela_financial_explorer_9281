import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ImpactMetrics = ({ financialData, scenarioChanges }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [previousValues, setPreviousValues] = useState({});

  // Calculate current metrics
  const calculateMetrics = (data, changes) => {
    const adjustedData = Object.keys(data).reduce((acc, key) => {
      acc[key] = changes[key] !== undefined ? changes[key] : data[key].value;
      return acc;
    }, {});

    const available = adjustedData.income - adjustedData.fixedExpenses - adjustedData.variableExpenses;
    const savingsRate = (adjustedData.savings / adjustedData.income) * 100;
    const expenseRatio = ((adjustedData.fixedExpenses + adjustedData.variableExpenses) / adjustedData.income) * 100;
    const goalProgress = (adjustedData.goals / (adjustedData.goals + 200)) * 100; // Mock target
    
    return {
      available,
      savingsRate,
      expenseRatio,
      goalProgress,
      monthsToGoal: adjustedData.goals > 0 ? Math.ceil(1000 / adjustedData.goals) : 0
    };
  };

  const defaultData = {
    income: { value: 3500 },
    fixedExpenses: { value: 1800 },
    variableExpenses: { value: 800 },
    savings: { value: 600 },
    goals: { value: 300 }
  };

  const data = financialData || defaultData;
  const currentMetrics = calculateMetrics(data, scenarioChanges);

  // Animate value changes
  useEffect(() => {
    const newValues = { ...currentMetrics };
    
    Object.keys(newValues).forEach(key => {
      if (previousValues[key] !== undefined) {
        // Animate from previous to current value
        const startValue = previousValues[key];
        const endValue = newValues[key];
        const duration = 1000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          
          const currentValue = startValue + (endValue - startValue) * easeOutQuart;
          
          setAnimatedValues(prev => ({
            ...prev,
            [key]: currentValue
          }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      } else {
        setAnimatedValues(prev => ({
          ...prev,
          [key]: newValues[key]
        }));
      }
    });

    setPreviousValues(newValues);
  }, [currentMetrics.available, currentMetrics.savingsRate, currentMetrics.expenseRatio, currentMetrics.goalProgress]);

  const metrics = [
    {
      key: 'available',
      label: 'Disponible',
      value: animatedValues.available || currentMetrics.available,
      format: (val) => `${Math.round(val)}€`,
      icon: 'Wallet',
      color: currentMetrics.available >= 0 ? '#10B981' : '#EF4444',
      description: 'Montant restant après toutes les dépenses'
    },
    {
      key: 'savingsRate',
      label: 'Taux d\'épargne',
      value: animatedValues.savingsRate || currentMetrics.savingsRate,
      format: (val) => `${Math.round(val)}%`,
      icon: 'TrendingUp',
      color: currentMetrics.savingsRate >= 20 ? '#10B981' : currentMetrics.savingsRate >= 10 ? '#F59E0B' : '#EF4444',
      description: 'Pourcentage des revenus épargnés'
    },
    {
      key: 'expenseRatio',
      label: 'Ratio dépenses',
      value: animatedValues.expenseRatio || currentMetrics.expenseRatio,
      format: (val) => `${Math.round(val)}%`,
      icon: 'PieChart',
      color: currentMetrics.expenseRatio <= 70 ? '#10B981' : currentMetrics.expenseRatio <= 85 ? '#F59E0B' : '#EF4444',
      description: 'Pourcentage des revenus dépensés'
    },
    {
      key: 'monthsToGoal',
      label: 'Mois vers objectif',
      value: animatedValues.monthsToGoal || currentMetrics.monthsToGoal,
      format: (val) => `${Math.round(val)} mois`,
      icon: 'Target',
      color: currentMetrics.monthsToGoal <= 12 ? '#10B981' : currentMetrics.monthsToGoal <= 24 ? '#F59E0B' : '#EF4444',
      description: 'Temps estimé pour atteindre vos objectifs'
    }
  ];

  const getChangeIndicator = (key) => {
    const current = currentMetrics[key];
    const previous = previousValues[key];
    
    if (previous === undefined) return null;
    
    const change = current - previous;
    if (Math.abs(change) < 0.1) return null;
    
    return {
      direction: change > 0 ? 'up' : 'down',
      value: Math.abs(change),
      isPositive: (key === 'available' || key === 'savingsRate' || key === 'goalProgress') ? change > 0 : change < 0
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Activity" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Impact en Temps Réel</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const changeIndicator = getChangeIndicator(metric.key);
          
          return (
            <motion.div
              key={metric.key}
              className="glass-card rounded-lg p-4 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <Icon name={metric.icon} size={16} style={{ color: metric.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                
                {changeIndicator && (
                  <motion.div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                      changeIndicator.isPositive 
                        ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon 
                      name={changeIndicator.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                      size={12} 
                    />
                    <span>{metric.format(changeIndicator.value)}</span>
                  </motion.div>
                )}
              </div>

              <div className="mb-3">
                <motion.p 
                  className="text-2xl font-bold font-mono"
                  style={{ color: metric.color }}
                  key={metric.value} // Force re-render for animation
                >
                  {metric.format(metric.value)}
                </motion.p>
              </div>

              {/* Progress bar for percentage metrics */}
              {(metric.key === 'savingsRate' || metric.key === 'expenseRatio') && (
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: metric.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(metric.value, 100)}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              )}

              {/* Goal progress visualization */}
              {metric.key === 'monthsToGoal' && (
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex-1 bg-muted/30 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(0, 100 - (metric.value / 36) * 100)}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">3 ans max</span>
                </div>
              )}

              {/* Sparkle effect for positive changes */}
              {changeIndicator && changeIndicator.isPositive && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: [0, 1, 0], rotate: 360 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Icon name="Sparkles" size={16} className="text-success" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary insight */}
      <motion.div
        className="glass-card rounded-lg p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-start space-x-3">
          <Icon name="Brain" size={20} className="text-primary mt-1" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Analyse Instantanée</h4>
            <p className="text-sm text-muted-foreground">
              {currentMetrics.available >= 500 && currentMetrics.savingsRate >= 15
                ? "Excellente situation ! Vous avez un bon équilibre entre dépenses et épargne."
                : currentMetrics.available >= 0 && currentMetrics.savingsRate >= 10
                ? "Situation stable. Considérez augmenter votre taux d'épargne si possible."
                : currentMetrics.available >= 0
                ? "Budget équilibré mais épargne faible. Cherchez des opportunités d'optimisation." :"Attention : dépenses supérieures aux revenus. Révision budgétaire recommandée."
              }
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImpactMetrics;