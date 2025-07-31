import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentQuestionsSection = ({ recentQuestions, onRerun, onDelete }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusIcon = (status) => {
    const icons = {
      'completed': 'CheckCircle',
      'processing': 'Clock',
      'error': 'AlertCircle'
    };
    return icons[status] || 'HelpCircle';
  };

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'text-success',
      'processing': 'text-warning',
      'error': 'text-error'
    };
    return colors[status] || 'text-muted-foreground';
  };

  if (recentQuestions.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 text-center">
        <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="font-medium text-foreground mb-2">
          Aucune question récente
        </h3>
        <p className="text-sm text-muted-foreground">
          Commencez par poser votre première question financière
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Questions récentes</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          className="text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        {recentQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-lg p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(question.status)} 
                  size={16} 
                  className={getStatusColor(question.status)}
                />
                <span className="text-xs text-muted-foreground">
                  {formatDate(question.timestamp)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RotateCcw"
                  onClick={() => onRerun(question)}
                  className="text-muted-foreground hover:text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete(question.id)}
                  className="text-muted-foreground hover:text-error"
                />
              </div>
            </div>

            <p className="text-sm text-foreground mb-2 line-clamp-2">
              {question.question}
            </p>

            {question.status === 'completed' && question.insights && (
              <div className="text-xs text-muted-foreground bg-muted/20 rounded p-2">
                <Icon name="Lightbulb" size={12} className="inline mr-1" />
                {question.insights}
              </div>
            )}

            {question.status === 'processing' && (
              <div className="flex items-center text-xs text-warning">
                <div className="animate-spin mr-2">
                  <Icon name="Loader2" size={12} />
                </div>
                Analyse en cours...
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentQuestionsSection;