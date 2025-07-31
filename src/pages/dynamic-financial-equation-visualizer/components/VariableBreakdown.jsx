import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const VariableBreakdown = ({ selectedVariable, financialData, onValueChange }) => {
  // Mock breakdown data for each variable
  const breakdownData = {
    income: {
      title: "Sources de Revenus",
      icon: "TrendingUp",
      color: "#10B981",
      items: [
        { label: "Salaire principal", value: 2800, percentage: 80 },
        { label: "Freelance", value: 500, percentage: 14.3 },
        { label: "Investissements", value: 200, percentage: 5.7 }
      ],
      total: 3500
    },
    fixedExpenses: {
      title: "Charges Fixes",
      icon: "Home",
      color: "#EF4444",
      items: [
        { label: "Loyer", value: 1200, percentage: 66.7 },
        { label: "Assurances", value: 180, percentage: 10 },
        { label: "Abonnements", value: 120, percentage: 6.7 },
        { label: "Crédits", value: 300, percentage: 16.7 }
      ],
      total: 1800
    },
    variableExpenses: {
      title: "Dépenses Variables",
      icon: "ShoppingCart",
      color: "#F59E0B",
      items: [
        { label: "Alimentation", value: 400, percentage: 50 },
        { label: "Transport", value: 200, percentage: 25 },
        { label: "Loisirs", value: 150, percentage: 18.8 },
        { label: "Divers", value: 50, percentage: 6.3 }
      ],
      total: 800
    },
    savings: {
      title: "Épargne",
      icon: "PiggyBank",
      color: "#3B82F6",
      items: [
        { label: "Épargne de précaution", value: 300, percentage: 50 },
        { label: "Investissements", value: 200, percentage: 33.3 },
        { label: "Projets", value: 100, percentage: 16.7 }
      ],
      total: 600
    },
    goals: {
      title: "Objectifs",
      icon: "Target",
      color: "#8B5CF6",
      items: [
        { label: "Vacances", value: 150, percentage: 50 },
        { label: "Formation", value: 100, percentage: 33.3 },
        { label: "Équipement", value: 50, percentage: 16.7 }
      ],
      total: 300
    }
  };

  if (!selectedVariable || !breakdownData[selectedVariable]) {
    return (
      <div className="glass-card rounded-xl p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sélectionnez une variable
          </h3>
          <p className="text-muted-foreground">
            Cliquez sur un élément de l'équation pour voir sa répartition détaillée
          </p>
        </div>
      </div>
    );
  }

  const data = breakdownData[selectedVariable];

  return (
    <motion.div
      className="glass-card rounded-xl p-6 h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${data.color}20` }}
        >
          <Icon name={data.icon} size={20} style={{ color: data.color }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            Total: <span className="font-mono font-medium" style={{ color: data.color }}>
              {data.total}€
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.items.map((item, index) => (
          <motion.div
            key={item.label}
            className="group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono text-muted-foreground">
                  {item.percentage.toFixed(1)}%
                </span>
                <span className="text-sm font-mono font-semibold text-foreground">
                  {item.value}€
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-muted/30 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: data.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
              
              {/* Interactive adjustment slider */}
              <input
                type="range"
                min="0"
                max={data.total * 2}
                value={item.value}
                onChange={(e) => onValueChange && onValueChange(selectedVariable, item.label, parseInt(e.target.value))}
                className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick adjustment buttons */}
      <div className="mt-6 pt-4 border-t border-glass-border">
        <p className="text-xs text-muted-foreground mb-3">Ajustements rapides</p>
        <div className="flex space-x-2">
          <button 
            className="flex-1 px-3 py-2 text-xs bg-error/10 text-error rounded-lg hover:bg-error/20 transition-smooth"
            onClick={() => onValueChange && onValueChange(selectedVariable, 'total', data.total * 0.9)}
          >
            -10%
          </button>
          <button 
            className="flex-1 px-3 py-2 text-xs bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-smooth"
            onClick={() => onValueChange && onValueChange(selectedVariable, 'total', data.total)}
          >
            Reset
          </button>
          <button 
            className="flex-1 px-3 py-2 text-xs bg-success/10 text-success rounded-lg hover:bg-success/20 transition-smooth"
            onClick={() => onValueChange && onValueChange(selectedVariable, 'total', data.total * 1.1)}
          >
            +10%
          </button>
        </div>
      </div>

      {/* Insights panel */}
      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-primary mb-1">Insight</p>
            <p className="text-xs text-foreground">
              {selectedVariable === 'income' && "Diversifier vos sources de revenus peut réduire les risques financiers."}
              {selectedVariable === 'fixedExpenses' && "Les charges fixes représentent la base de votre budget mensuel."}
              {selectedVariable === 'variableExpenses' && "C'est ici que vous avez le plus de contrôle pour optimiser."}
              {selectedVariable === 'savings' && "L'épargne régulière est la clé de votre sécurité financière."}
              {selectedVariable === 'goals' && "Définir des objectifs clairs motive l'épargne et les investissements."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VariableBreakdown;