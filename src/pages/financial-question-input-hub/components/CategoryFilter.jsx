import React from 'react';
import { motion } from 'framer-motion';

import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Tous': 'Grid3X3',
      'Budget': 'Calculator',
      'Épargne': 'PiggyBank',
      'Dettes': 'CreditCard',
      'Objectifs': 'Target',
      'Investissement': 'TrendingUp',
      'Assurance': 'Shield'
    };
    return icons[category] || 'HelpCircle';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Budget': 'from-primary to-primary/80',
      'Épargne': 'from-success to-success/80',
      'Dettes': 'from-warning to-warning/80',
      'Objectifs': 'from-secondary to-secondary/80',
      'Investissement': 'from-accent to-accent/80',
      'Assurance': 'from-muted-foreground to-muted-foreground/80'
    };
    return colors[category] || 'from-muted to-muted/80';
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                iconName={getCategoryIcon(category.name)}
                iconPosition="left"
                iconSize={16}
                className={`whitespace-nowrap transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${getCategoryColor(category.name)} text-white shadow-lg` 
                    : 'glass border-glass-border hover:bg-primary/10'
                }`}
              >
                {category.name}
                {category.count > 0 && (
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-white/20' : 'bg-muted/50'
                  }`}>
                    {category.count}
                  </span>
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Category Description */}
      {activeCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 glass rounded-lg"
        >
          <p className="text-sm text-muted-foreground">
            {categories.find(cat => cat.id === activeCategory)?.description}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryFilter;