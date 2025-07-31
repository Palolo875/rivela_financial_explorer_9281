import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PatternRecognitionAlerts = () => {
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Cycle de Stress-Dépenses Détecté',
      description: 'Augmentation de 340% des dépenses lors des journées stressantes (humeur ≤ 3)',
      icon: 'AlertTriangle',
      severity: 'Critique',
      frequency: '8 fois ce mois',
      avgImpact: '+450€',
      trend: 'increasing',
      details: {
        pattern: 'Stress professionnel → Commandes alimentaires → Culpabilité → Plus de stress',
        triggers: ['Échéances serrées', 'Conflits au travail', 'Surcharge mentale'],
        recommendations: [
          'Préparer des collations saines à l\'avance',
          'Utiliser des techniques de respiration avant d\'acheter',
          'Créer une liste d\'alternatives gratuites (marche, méditation)'
        ],
        nextOccurrence: 'Risque élevé demain (présentation importante)'
      }
    },
    {
      id: 2,
      type: 'warning',
      title: 'Shopping Nocturne Récurrent',
      description: 'Achats en ligne entre 21h-23h représentent 45% de vos dépenses impulsives',
      icon: 'Moon',
      severity: 'Modéré',
      frequency: '12 fois ce mois',
      avgImpact: '+280€',
      trend: 'stable',
      details: {
        pattern: 'Solitude le soir → Navigation sur sites e-commerce → Achats impulsifs',
        triggers: ['Ennui', 'Solitude', 'Fatigue émotionnelle'],
        recommendations: [
          'Bloquer les sites de shopping après 20h',
          'Créer une routine du soir alternative',
          'Appeler un ami ou regarder une série'
        ],
        nextOccurrence: 'Risque modéré ce soir (week-end seul)'
      }
    },
    {
      id: 3,
      type: 'info',
      title: 'Dépenses de Célébration Équilibrées',
      description: 'Vos achats lors des bonnes nouvelles restent dans des limites raisonnables',
      icon: 'CheckCircle',
      severity: 'Positif',
      frequency: '5 fois ce mois',
      avgImpact: '+120€',
      trend: 'stable',
      details: {
        pattern: 'Bonne nouvelle → Sortie sociale → Dépense contrôlée',
        triggers: ['Promotions', 'Réussites personnelles', 'Événements heureux'],
        recommendations: [
          'Continuer cette approche équilibrée',
          'Peut-être augmenter légèrement le budget célébration',
          'Partager ces moments avec des proches'
        ],
        nextOccurrence: 'Prochaine opportunité dans 2 semaines (anniversaire)'
      }
    },
    {
      id: 4,
      type: 'warning',
      title: 'Achats d\'Anxiété Santé',
      description: 'Tendance à sur-acheter des produits de santé lors des pics d\'anxiété',
      icon: 'Heart',
      severity: 'Modéré',
      frequency: '6 fois ce mois',
      avgImpact: '+180€',
      trend: 'increasing',
      details: {
        pattern: 'Symptôme physique → Panique → Achats préventifs excessifs',
        triggers: ['Palpitations', 'Maux de tête', 'Fatigue inexpliquée'],
        recommendations: [
          'Consulter un médecin pour un bilan de santé',
          'Tenir un journal des symptômes avant d\'acheter',
          'Attendre 24h avant tout achat santé non urgent'
        ],
        nextOccurrence: 'Risque faible actuellement'
      }
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          border: 'border-error/20',
          icon: 'text-error'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          border: 'border-warning/20',
          icon: 'text-warning'
        };
      case 'info':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          border: 'border-success/20',
          icon: 'text-success'
        };
      default:
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          border: 'border-primary/20',
          icon: 'text-primary'
        };
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return { icon: 'TrendingUp', color: 'text-error' };
      case 'decreasing':
        return { icon: 'TrendingDown', color: 'text-success' };
      default:
        return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const dismissAlert = (alertId) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Alertes Comportementales</h3>
          <p className="text-sm text-muted-foreground">
            Patterns détectés dans vos habitudes de dépenses
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {visibleAlerts.length} alerte{visibleAlerts.length > 1 ? 's' : ''}
          </span>
          {visibleAlerts.length > 0 && (
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {visibleAlerts.map((alert) => {
          const colors = getAlertColor(alert.type);
          const trend = getTrendIcon(alert.trend);
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={`glass-card rounded-xl p-4 border ${colors.bg} ${colors.border} cursor-pointer hover:shadow-lg transition-all`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <Icon name={alert.icon} size={20} className={colors.icon} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{alert.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                        {alert.severity}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{alert.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="DollarSign" size={12} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{alert.avgImpact}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name={trend.icon} size={12} className={trend.color} />
                        <span className={trend.color}>
                          {alert.trend === 'increasing' ? 'En hausse' : 
                           alert.trend === 'decreasing' ? 'En baisse' : 'Stable'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissAlert(alert.id);
                    }}
                    className="text-muted-foreground hover:text-foreground p-1"
                    title="Ignorer cette alerte"
                  >
                    <Icon name="X" size={16} />
                  </button>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {visibleAlerts.length === 0 && (
        <div className="glass-card rounded-xl p-8 text-center">
          <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
          <h4 className="text-lg font-semibold text-foreground mb-2">Aucune alerte active</h4>
          <p className="text-muted-foreground">
            Vos patterns de dépenses semblent équilibrés pour le moment
          </p>
        </div>
      )}

      {/* Detailed Alert Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg ${getAlertColor(selectedAlert.type).bg} flex items-center justify-center`}>
                    <Icon name={selectedAlert.icon} size={24} className={getAlertColor(selectedAlert.type).icon} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedAlert.title}</h3>
                    <p className="text-muted-foreground">{selectedAlert.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Pattern Analysis */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="GitBranch" size={16} className="mr-2" />
                    Pattern Identifié
                  </h4>
                  <p className="text-muted-foreground bg-muted/10 p-4 rounded-lg">
                    {selectedAlert.details.pattern}
                  </p>
                </div>

                {/* Triggers */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="Zap" size={16} className="mr-2" />
                    Déclencheurs Principaux
                  </h4>
                  <div className="space-y-2">
                    {selectedAlert.details.triggers.map((trigger, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-warning"></div>
                        <span className="text-sm text-muted-foreground">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="Lightbulb" size={16} className="mr-2" />
                    Recommandations
                  </h4>
                  <div className="space-y-3">
                    {selectedAlert.details.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Occurrence Prediction */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Prédiction
                  </h4>
                  <div className={`p-4 rounded-lg ${
                    selectedAlert.details.nextOccurrence.includes('élevé') ? 'bg-error/10 text-error' :
                    selectedAlert.details.nextOccurrence.includes('modéré') ? 'bg-warning/10 text-warning' :
                    'bg-success/10 text-success'
                  }`}>
                    <p className="text-sm font-medium">{selectedAlert.details.nextOccurrence}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-4 border-t border-glass-border">
                  <button
                    onClick={() => {
                      dismissAlert(selectedAlert.id);
                      setSelectedAlert(null);
                    }}
                    className="flex items-center px-4 py-2 bg-muted/20 text-muted-foreground rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <Icon name="EyeOff" size={16} className="mr-2" />
                    Ignorer
                  </button>
                  <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Créer un rappel
                  </button>
                  <button className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
                    <Icon name="Share2" size={16} className="mr-2" />
                    Partager
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatternRecognitionAlerts;