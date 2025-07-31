import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialHealthSidebar = ({ financialData }) => {
  const calculateHealthMetrics = () => {
    const revenus = financialData.revenus || [];
    const depenses = financialData.depenses || [];
    const dettes = financialData.dettes || [];
    const objectifs = financialData.objectifs || [];

    // Calculs mensuels
    const revenuMensuel = revenus.reduce((total, r) => {
      let monthlyAmount = r.montant;
      if (r.frequence === 'hebdomadaire') monthlyAmount *= 4.33;
      if (r.frequence === 'annuel') monthlyAmount /= 12;
      return total + monthlyAmount;
    }, 0);

    const depenseMensuelle = depenses.reduce((total, d) => {
      let monthlyAmount = d.montant;
      if (d.frequence === 'hebdomadaire') monthlyAmount *= 4.33;
      if (d.frequence === 'annuel') monthlyAmount /= 12;
      return total + monthlyAmount;
    }, 0);

    const paiementsDettes = dettes.reduce((total, d) => total + d.paiementMensuel, 0);
    const dettesTotales = dettes.reduce((total, d) => total + d.montantRestant, 0);

    // Métriques calculées
    const soldeMensuel = revenuMensuel - depenseMensuelle - paiementsDettes;
    const tauxEpargne = revenuMensuel > 0 ? (soldeMensuel / revenuMensuel) * 100 : 0;
    const ratioEndettement = revenuMensuel > 0 ? (paiementsDettes / revenuMensuel) * 100 : 0;
    
    // Score de santé financière (0-100)
    let healthScore = 100;
    if (tauxEpargne < 10) healthScore -= 20;
    if (ratioEndettement > 30) healthScore -= 25;
    if (soldeMensuel < 0) healthScore -= 30;
    if (revenus.length === 1) healthScore -= 10; // Diversification des revenus
    if (objectifs.length === 0) healthScore -= 15; // Planification

    return {
      revenuMensuel,
      depenseMensuelle,
      soldeMensuel,
      tauxEpargne: Math.max(0, tauxEpargne),
      ratioEndettement,
      dettesTotales,
      healthScore: Math.max(0, Math.min(100, healthScore)),
      objectifsAtteints: objectifs.filter(o => (o.montantActuel / o.montantCible) >= 1).length,
      totalObjectifs: objectifs.length
    };
  };

  const metrics = calculateHealthMetrics();

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return 'TrendingUp';
    if (score >= 60) return 'Minus';
    return 'TrendingDown';
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (metrics.tauxEpargne < 10) {
      recommendations.push({
        icon: 'PiggyBank',
        text: 'Augmentez votre taux d\'épargne à 10% minimum',
        priority: 'haute'
      });
    }
    
    if (metrics.ratioEndettement > 30) {
      recommendations.push({
        icon: 'CreditCard',
        text: 'Réduisez votre ratio d\'endettement sous 30%',
        priority: 'haute'
      });
    }
    
    if (metrics.soldeMensuel < 0) {
      recommendations.push({
        icon: 'AlertTriangle',
        text: 'Équilibrez votre budget mensuel',
        priority: 'critique'
      });
    }
    
    if (metrics.totalObjectifs === 0) {
      recommendations.push({
        icon: 'Target',
        text: 'Définissez des objectifs financiers',
        priority: 'moyenne'
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="hidden lg:block fixed right-4 top-32 w-80 space-y-4 z-40">
      {/* Score de santé financière */}
      <div className="glass-card rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Santé financière</h3>
          <div className={`flex items-center space-x-2 ${getScoreColor(metrics.healthScore)}`}>
            <Icon name={getScoreIcon(metrics.healthScore)} size={20} />
            <span className="text-2xl font-bold">{Math.round(metrics.healthScore)}</span>
          </div>
        </div>

        {/* Barre de progression du score */}
        <div className="mb-4">
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                metrics.healthScore >= 80 ? 'bg-success' :
                metrics.healthScore >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${metrics.healthScore}%` }}
            />
          </div>
        </div>

        {/* Métriques clés */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Solde mensuel</span>
            <span className={`font-medium ${metrics.soldeMensuel >= 0 ? 'text-success' : 'text-error'}`}>
              {metrics.soldeMensuel.toLocaleString('fr-FR')}€
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taux d'épargne</span>
            <span className={`font-medium ${metrics.tauxEpargne >= 10 ? 'text-success' : 'text-warning'}`}>
              {metrics.tauxEpargne.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ratio endettement</span>
            <span className={`font-medium ${metrics.ratioEndettement <= 30 ? 'text-success' : 'text-error'}`}>
              {metrics.ratioEndettement.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Résumé financier */}
      <div className="glass-card rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Résumé mensuel</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm">Revenus</span>
            </div>
            <span className="font-medium text-success">
              +{metrics.revenuMensuel.toLocaleString('fr-FR')}€
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="ShoppingCart" size={16} className="text-error" />
              <span className="text-sm">Dépenses</span>
            </div>
            <span className="font-medium text-error">
              -{metrics.depenseMensuelle.toLocaleString('fr-FR')}€
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} className="text-warning" />
              <span className="text-sm">Dettes</span>
            </div>
            <span className="font-medium text-warning">
              -{(metrics.dettesTotales / 1000).toFixed(0)}k€
            </span>
          </div>
          <hr className="border-glass-border" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Wallet" size={16} className="text-primary" />
              <span className="text-sm font-medium">Solde</span>
            </div>
            <span className={`font-bold ${metrics.soldeMensuel >= 0 ? 'text-success' : 'text-error'}`}>
              {metrics.soldeMensuel >= 0 ? '+' : ''}{metrics.soldeMensuel.toLocaleString('fr-FR')}€
            </span>
          </div>
        </div>
      </div>

      {/* Objectifs */}
      {metrics.totalObjectifs > 0 && (
        <div className="glass-card rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Objectifs</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-muted/30"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - metrics.objectifsAtteints / metrics.totalObjectifs)}`}
                  className="text-success transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-success">{metrics.objectifsAtteints}</span>
                <span className="text-xs text-muted-foreground">/{metrics.totalObjectifs}</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Objectifs atteints
          </p>
        </div>
      )}

      {/* Recommandations */}
      {recommendations.length > 0 && (
        <div className="glass-card rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Recommandations</h3>
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Icon 
                  name={rec.icon} 
                  size={16} 
                  className={`mt-0.5 ${
                    rec.priority === 'critique' ? 'text-error' :
                    rec.priority === 'haute' ? 'text-warning' : 'text-primary'
                  }`} 
                />
                <span className="text-sm text-foreground">{rec.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialHealthSidebar;