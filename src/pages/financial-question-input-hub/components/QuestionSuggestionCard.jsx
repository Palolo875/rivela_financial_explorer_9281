import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionSuggestionCard = ({ suggestion, onSelect, index }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Budget': 'Calculator',
      'Épargne': 'PiggyBank',
      'Dettes': 'CreditCard',
      'Objectifs': 'Target'
    };
    return icons[category] || 'HelpCircle';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Budget': 'text-primary',
      'Épargne': 'text-success',
      'Dettes': 'text-warning',
      'Objectifs': 'text-secondary'
    };
    return colors[category] || 'text-muted-foreground';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="ghost"
        onClick={() => onSelect(suggestion)}
        className="w-full h-auto p-0 hover:bg-transparent"
      >
        <div className="glass-card rounded-xl p-4 w-full text-left hover:shadow-lg transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg bg-muted/20 ${getCategoryColor(suggestion.category)}`}>
              <Icon name={getCategoryIcon(suggestion.category)} size={20} />
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">
                ~{suggestion.estimatedTime}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Icon name="Database" size={12} className="mr-1" />
                {suggestion.dataRequired}
              </div>
            </div>
          </div>

          <h4 className="font-medium text-foreground mb-2 line-clamp-2">
            {suggestion.question}
          </h4>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {suggestion.description}
          </p>

          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full bg-muted/20 ${getCategoryColor(suggestion.category)}`}>
              {suggestion.category}
            </span>
            <div className="flex items-center text-xs text-muted-foreground">
              <Icon name="Users" size={12} className="mr-1" />
              {suggestion.popularity}% utilisent
            </div>
          </div>
        </div>
      </Button>
    </motion.div>
  );
};

export default QuestionSuggestionCard;