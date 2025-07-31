import React from 'react';
import Icon from '../../../components/AppIcon';

const DataCompletionIndicator = ({ completionData }) => {
  const totalCompletion = Math.round(
    (completionData.revenus + completionData.depenses + completionData.dettes + completionData.objectifs) / 4
  );

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-primary';
    if (percentage >= 40) return 'text-warning';
    return 'text-error';
  };

  const getCompletionIcon = (percentage) => {
    if (percentage >= 80) return 'CheckCircle';
    if (percentage >= 60) return 'Clock';
    if (percentage >= 40) return 'AlertCircle';
    return 'XCircle';
  };

  return (
    <div className="glass-card rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Progression des données</h3>
        <div className={`flex items-center space-x-2 ${getCompletionColor(totalCompletion)}`}>
          <Icon name={getCompletionIcon(totalCompletion)} size={20} />
          <span className="text-xl font-bold">{totalCompletion}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { key: 'revenus', label: 'Revenus', icon: 'TrendingUp', value: completionData.revenus },
          { key: 'depenses', label: 'Dépenses', icon: 'ShoppingCart', value: completionData.depenses },
          { key: 'dettes', label: 'Dettes', icon: 'CreditCard', value: completionData.dettes },
          { key: 'objectifs', label: 'Objectifs', icon: 'Target', value: completionData.objectifs }
        ].map((item) => (
          <div key={item.key} className="flex flex-col items-center p-3 rounded-lg bg-muted/30">
            <Icon name={item.icon} size={24} className="text-primary mb-2" />
            <span className="text-sm text-muted-foreground mb-1">{item.label}</span>
            <div className="w-full bg-muted rounded-full h-2 mb-1">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  item.value >= 80 ? 'bg-success' : 
                  item.value >= 60 ? 'bg-primary' : 
                  item.value >= 40 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${item.value}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${getCompletionColor(item.value)}`}>
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCompletionIndicator;