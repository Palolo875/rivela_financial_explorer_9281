import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingQuestions = ({ trendingQuestions, onSelect }) => {
  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2 text-primary" />
          Questions tendances
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          className="text-muted-foreground"
        />
      </div>

      <div className="grid gap-3">
        {trendingQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-300"
            onClick={() => onSelect(question.text)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-primary">
                  #{index + 1}
                </span>
                <div className={`flex items-center space-x-1 ${getTrendColor(question.trend)}`}>
                  <Icon name={getTrendIcon(question.trend)} size={14} />
                  <span className="text-xs">
                    {Math.abs(question.trend)}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {question.askCount} fois posée
              </div>
            </div>

            <p className="text-sm text-foreground mb-2 line-clamp-2">
              {question.text}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {question.category}
                </span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} className="mr-1" />
                  ~{question.avgTime}
                </div>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Icon name="Users" size={12} className="mr-1" />
                {question.satisfaction}% satisfaits
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          size="sm"
          iconName="MoreHorizontal"
          className="glass border-glass-border"
        >
          Voir plus de tendances
        </Button>
      </div>
    </div>
  );
};

export default TrendingQuestions;