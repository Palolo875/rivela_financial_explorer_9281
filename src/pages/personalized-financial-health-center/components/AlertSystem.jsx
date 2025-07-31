import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlertSystem = () => {
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const alerts = [
    {
      id: 'budget_warning',
      type: 'warning',
      priority: 'high',
      title: 'Budget Dépassé',
      message: 'Vous avez dépassé votre budget "Loisirs" de 45€ ce mois-ci',
      action: 'Ajuster le budget',
      actionUrl: '/interactive-financial-data-mapping',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'AlertTriangle',
      category: 'Budget'
    },
    {
      id: 'savings_opportunity',
      type: 'opportunity',
      priority: 'medium',
      title: 'Opportunité d\'Épargne',
      message: 'Vous pourriez économiser 120€ en optimisant vos abonnements',
      action: 'Voir les détails',
      actionUrl: '/dynamic-financial-equation-visualizer',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      icon: 'Target',
      category: 'Optimisation'
    },
    {
      id: 'goal_progress',
      type: 'success',
      priority: 'low',
      title: 'Objectif Atteint',
      message: 'Félicitations ! Vous avez atteint votre objectif d\'épargne mensuel',
      action: 'Définir nouvel objectif',
      actionUrl: '/personalized-financial-health-center',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'CheckCircle',
      category: 'Objectifs'
    },
    {
      id: 'unusual_spending',
      type: 'info',
      priority: 'medium',
      title: 'Dépense Inhabituelle',
      message: 'Dépense de 250€ détectée - 3x votre moyenne habituelle',
      action: 'Catégoriser',
      actionUrl: '/emotional-spending-analytics-dashboard',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'Info',
      category: 'Analyse'
    }
  ];

  const getAlertStyles = (type) => {
    const styles = {
      warning: {
        container: 'border-warning/30 bg-warning/5',
        icon: 'text-warning bg-warning/10',
        badge: 'bg-warning/20 text-warning'
      },
      opportunity: {
        container: 'border-primary/30 bg-primary/5',
        icon: 'text-primary bg-primary/10',
        badge: 'bg-primary/20 text-primary'
      },
      success: {
        container: 'border-success/30 bg-success/5',
        icon: 'text-success bg-success/10',
        badge: 'bg-success/20 text-success'
      },
      info: {
        container: 'border-secondary/30 bg-secondary/5',
        icon: 'text-secondary bg-secondary/10',
        badge: 'bg-secondary/20 text-secondary'
      },
      error: {
        container: 'border-error/30 bg-error/5',
        icon: 'text-error bg-error/10',
        badge: 'bg-error/20 text-error'
      }
    };
    return styles[type] || styles.info;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertCircle';
      case 'medium': return 'Clock';
      case 'low': return 'Info';
      default: return 'Info';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Il y a ${hours}h`;
    return 'À l\'instant';
  };

  const handleDismissAlert = (alertId) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
  };

  const handleAlertAction = (actionUrl) => {
    window.location.href = actionUrl;
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
  const highPriorityAlerts = visibleAlerts.filter(alert => alert.priority === 'high');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Alertes & Opportunités</h3>
          {highPriorityAlerts.length > 0 && (
            <div className="flex items-center justify-center w-5 h-5 bg-error text-error-foreground rounded-full text-xs font-bold animate-pulse">
              {highPriorityAlerts.length}
            </div>
          )}
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          Tout marquer comme lu
        </button>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card rounded-lg p-3 text-center border border-glass-border">
          <div className="text-lg font-bold text-warning">{alerts.filter(a => a.type === 'warning').length}</div>
          <div className="text-xs text-muted-foreground">Alertes</div>
        </div>
        <div className="glass-card rounded-lg p-3 text-center border border-glass-border">
          <div className="text-lg font-bold text-primary">{alerts.filter(a => a.type === 'opportunity').length}</div>
          <div className="text-xs text-muted-foreground">Opportunités</div>
        </div>
        <div className="glass-card rounded-lg p-3 text-center border border-glass-border">
          <div className="text-lg font-bold text-success">{alerts.filter(a => a.type === 'success').length}</div>
          <div className="text-xs text-muted-foreground">Succès</div>
        </div>
        <div className="glass-card rounded-lg p-3 text-center border border-glass-border">
          <div className="text-lg font-bold text-secondary">{alerts.filter(a => a.type === 'info').length}</div>
          <div className="text-xs text-muted-foreground">Infos</div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {visibleAlerts.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center border border-glass-border">
            <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-3" />
            <h4 className="text-md font-medium text-foreground mb-2">Tout est sous contrôle !</h4>
            <p className="text-sm text-muted-foreground">Aucune alerte active pour le moment.</p>
          </div>
        ) : (
          visibleAlerts.map((alert) => {
            const styles = getAlertStyles(alert.type);
            return (
              <div 
                key={alert.id} 
                className={`glass-card rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${styles.container}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg ${styles.icon}`}>
                      <Icon name={alert.icon} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="text-sm font-medium text-foreground">{alert.title}</h5>
                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}>
                          <Icon name={getPriorityIcon(alert.priority)} size={10} className="mr-1" />
                          {alert.priority === 'high' ? 'Urgent' : 
                           alert.priority === 'medium' ? 'Moyen' : 'Faible'}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-muted-foreground">
                            {alert.category} • {formatTimeAgo(alert.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAlertAction(alert.actionUrl)}
                            className="flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-smooth"
                          >
                            <Icon name="ArrowRight" size={12} className="mr-1" />
                            {alert.action}
                          </button>
                          <button
                            onClick={() => handleDismissAlert(alert.id)}
                            className="p-1.5 hover:bg-muted/20 rounded-lg transition-smooth"
                            title="Ignorer"
                          >
                            <Icon name="X" size={14} className="text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-xl p-4 border border-glass-border">
        <h4 className="text-md font-medium text-foreground mb-3">Actions Rapides</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button 
            onClick={() => handleAlertAction('/interactive-financial-data-mapping')}
            className="flex items-center justify-center px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-smooth"
          >
            <Icon name="Settings" size={16} className="mr-2" />
            Ajuster Budget
          </button>
          <button 
            onClick={() => handleAlertAction('/dynamic-financial-equation-visualizer')}
            className="flex items-center justify-center px-4 py-3 bg-secondary/10 text-secondary rounded-lg font-medium hover:bg-secondary/20 transition-smooth"
          >
            <Icon name="BarChart3" size={16} className="mr-2" />
            Analyser Dépenses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;