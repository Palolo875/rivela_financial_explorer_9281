import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataRequirementsPanel = ({ requirements, onQuickAdd }) => {
  const getRequirementIcon = (type) => {
    const icons = {
      'income': 'TrendingUp',
      'expenses': 'TrendingDown',
      'debts': 'CreditCard',
      'savings': 'PiggyBank',
      'goals': 'Target'
    };
    return icons[type] || 'Database';
  };

  const getRequirementColor = (type) => {
    const colors = {
      'income': 'text-success',
      'expenses': 'text-error',
      'debts': 'text-warning',
      'savings': 'text-primary',
      'goals': 'text-secondary'
    };
    return colors[type] || 'text-muted-foreground';
  };

  if (!requirements || requirements.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Info" size={18} className="text-primary" />
        <h4 className="font-medium text-foreground">
          Données nécessaires pour l'analyse
        </h4>
      </div>

      <div className="space-y-3">
        {requirements.map((requirement, index) => (
          <motion.div
            key={requirement.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-background/50 ${getRequirementColor(requirement.type)}`}>
                <Icon name={getRequirementIcon(requirement.type)} size={16} />
              </div>
              <div>
                <h5 className="font-medium text-foreground text-sm">
                  {requirement.title}
                </h5>
                <p className="text-xs text-muted-foreground">
                  {requirement.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {requirement.status === 'missing' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuickAdd(requirement.type)}
                  iconName="Plus"
                  iconPosition="left"
                  className="text-xs"
                >
                  Ajouter
                </Button>
              ) : (
                <div className="flex items-center text-xs text-success">
                  <Icon name="Check" size={14} className="mr-1" />
                  Disponible
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-primary/10 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">
              Conseil d'analyse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Plus vous fournissez de données précises, plus l'analyse sera personnalisée et pertinente pour votre situation financière.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataRequirementsPanel;