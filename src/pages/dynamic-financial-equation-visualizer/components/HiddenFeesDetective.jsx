import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HiddenFeesDetective = ({ onFeesDiscovered }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredFees, setDiscoveredFees] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);

  // Mock hidden fees data
  const potentialHiddenFees = [
    {
      id: 1,
      category: 'Abonnements oubliés',
      description: 'Netflix Premium non utilisé depuis 3 mois',
      amount: 15.99,
      frequency: 'mensuel',
      impact: 191.88, // yearly
      severity: 'medium',
      icon: 'Tv',
      suggestion: 'Passer au plan Standard (-6€/mois) ou suspendre temporairement'
    },
    {
      id: 2,
      category: 'Frais bancaires',
      description: 'Commission sur virements internationaux',
      amount: 3.50,
      frequency: 'par transaction',
      impact: 42, // estimated yearly
      severity: 'low',
      icon: 'CreditCard',
      suggestion: 'Utiliser une banque en ligne pour les virements SEPA'
    },
    {
      id: 3,
      category: 'Assurance doublons',
      description: 'Assurance mobile incluse dans forfait + assurance séparée',
      amount: 8.99,
      frequency: 'mensuel',
      impact: 107.88,
      severity: 'high',
      icon: 'Shield',
      suggestion: 'Résilier l\'assurance séparée, couverture déjà incluse'
    },
    {
      id: 4,
      category: 'Coûts d\'opportunité',
      description: 'Épargne sur compte courant (0% vs 2% livret)',
      amount: 500,
      frequency: 'montant dormant',
      impact: 120, // yearly opportunity cost
      severity: 'high',
      icon: 'TrendingDown',
      suggestion: 'Transférer vers un livret d\'épargne rémunéré'
    },
    {
      id: 5,
      category: 'Abonnements premium',
      description: 'Spotify Family utilisé par 2 personnes sur 6',
      amount: 15.99,
      frequency: 'mensuel',
      impact: 95.94, // 50% waste
      severity: 'medium',
      icon: 'Music',
      suggestion: 'Passer au plan Duo (-1€/mois) ou Individual (-6€/mois)'
    }
  ];

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setDiscoveredFees([]);

    // Simulate scanning process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setScanProgress(i);
      
      // Discover fees progressively
      if (i === 30) {
        setDiscoveredFees([potentialHiddenFees[0]]);
      } else if (i === 50) {
        setDiscoveredFees(prev => [...prev, potentialHiddenFees[1]]);
      } else if (i === 70) {
        setDiscoveredFees(prev => [...prev, potentialHiddenFees[2], potentialHiddenFees[3]]);
      } else if (i === 90) {
        setDiscoveredFees(prev => [...prev, potentialHiddenFees[4]]);
      }
    }

    setIsScanning(false);
    
    // Calculate total impact
    const totalImpact = potentialHiddenFees.reduce((sum, fee) => sum + fee.impact, 0);
    onFeesDiscovered && onFeesDiscovered(totalImpact);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#64748B';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'high': return 'Critique';
      case 'medium': return 'Modéré';
      case 'low': return 'Faible';
      default: return 'Inconnu';
    }
  };

  const totalPotentialSavings = discoveredFees.reduce((sum, fee) => sum + fee.impact, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Détective des Coûts Cachés</h3>
        </div>
        <Button
          variant={isScanning ? "outline" : "default"}
          size="sm"
          iconName={isScanning ? "Loader2" : "Scan"}
          onClick={startScan}
          disabled={isScanning}
          loading={isScanning}
        >
          {isScanning ? 'Analyse...' : 'Lancer l\'analyse'}
        </Button>
      </div>

      {/* Scanning Progress */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            className="glass-card rounded-lg p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Icon name="Radar" size={20} className="text-primary" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Analyse en cours... {scanProgress}%
                </p>
                <p className="text-xs text-muted-foreground">
                  Recherche de frais cachés et d'opportunités d'optimisation
                </p>
              </div>
            </div>
            
            <div className="w-full bg-muted/30 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      {discoveredFees.length > 0 && (
        <motion.div
          className="glass-card rounded-lg p-4 bg-gradient-to-r from-warning/5 to-error/5 border border-warning/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                {discoveredFees.length} problème{discoveredFees.length > 1 ? 's' : ''} détecté{discoveredFees.length > 1 ? 's' : ''}
              </h4>
              <p className="text-sm text-muted-foreground">
                Économies potentielles : <span className="font-bold text-success">
                  {totalPotentialSavings.toFixed(2)}€/an
                </span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-error">
                {discoveredFees.filter(f => f.severity === 'high').length}
              </p>
              <p className="text-xs text-muted-foreground">Critiques</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {discoveredFees.filter(f => f.severity === 'medium').length}
              </p>
              <p className="text-xs text-muted-foreground">Modérés</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {discoveredFees.filter(f => f.severity === 'low').length}
              </p>
              <p className="text-xs text-muted-foreground">Faibles</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Discovered Fees List */}
      <div className="space-y-3">
        <AnimatePresence>
          {discoveredFees.map((fee, index) => (
            <motion.div
              key={fee.id}
              className="glass-card rounded-lg p-4 border-l-4"
              style={{ borderLeftColor: getSeverityColor(fee.severity) }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start space-x-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${getSeverityColor(fee.severity)}20` }}
                >
                  <Icon 
                    name={fee.icon} 
                    size={18} 
                    style={{ color: getSeverityColor(fee.severity) }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-semibold text-foreground">
                      {fee.category}
                    </h5>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ 
                          backgroundColor: `${getSeverityColor(fee.severity)}20`,
                          color: getSeverityColor(fee.severity)
                        }}
                      >
                        {getSeverityLabel(fee.severity)}
                      </span>
                      <span className="text-sm font-bold text-error">
                        -{fee.impact.toFixed(2)}€/an
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2">{fee.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{fee.amount}€ {fee.frequency}</span>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Icon name="Lightbulb" size={14} className="text-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-primary mb-1">Suggestion</p>
                        <p className="text-xs text-foreground">{fee.suggestion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      {discoveredFees.length > 0 && (
        <motion.div
          className="flex space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            className="flex-1"
          >
            Exporter le rapport
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            className="flex-1"
          >
            Planifier les actions
          </Button>
        </motion.div>
      )}

      {/* Educational Note */}
      <div className="glass-card rounded-lg p-4 bg-primary/5 border border-primary/20">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-primary mb-1">Le saviez-vous ?</p>
            <p className="text-xs text-foreground">
              En moyenne, les ménages français dépensent 200€/an en frais cachés et abonnements inutilisés. 
              Une analyse régulière peut vous faire économiser jusqu'à 500€ par an.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenFeesDetective;