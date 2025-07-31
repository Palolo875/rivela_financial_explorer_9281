import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const EmotionalArchetypeCard = () => {
  const [currentArchetype, setCurrentArchetype] = useState('stressed-tiger');
  const [animationKey, setAnimationKey] = useState(0);

  const archetypes = {
    'stressed-tiger': {
      name: 'Tigre Stressé',
      emoji: '🐅',
      color: 'from-orange-500 to-red-500',
      description: 'Dépenses impulsives sous pression',
      traits: ['Achats de réconfort', 'Décisions rapides', 'Évitement émotionnel'],
      spendingTriggers: ['Stress professionnel', 'Conflits personnels', 'Surcharge mentale'],
      averageImpact: '+45%',
      riskLevel: 'Élevé'
    },
    'nocturnal-panda': {
      name: 'Panda Nocturne',
      emoji: '🐼',
      color: 'from-purple-500 to-indigo-500',
      description: 'Achats tardifs et réfléchis',
      traits: ['Shopping nocturne', 'Recherche approfondie', 'Culpabilité post-achat'],
      spendingTriggers: ['Insomnie', 'Solitude', 'Procrastination'],
      averageImpact: '+25%',
      riskLevel: 'Modéré'
    },
    'social-butterfly': {
      name: 'Papillon Social',
      emoji: '🦋',
      color: 'from-pink-500 to-rose-500',
      description: 'Dépenses influencées par l\'entourage',
      traits: ['Achats sociaux', 'Influence des pairs', 'FOMO financier'],
      spendingTriggers: ['Événements sociaux', 'Réseaux sociaux', 'Pression du groupe'],
      averageImpact: '+35%',
      riskLevel: 'Modéré'
    },
    'analytical-owl': {
      name: 'Chouette Analytique',
      emoji: '🦉',
      color: 'from-blue-500 to-teal-500',
      description: 'Dépenses calculées et optimisées',
      traits: ['Recherche extensive', 'Comparaisons multiples', 'Achats planifiés'],
      spendingTriggers: ['Nouvelles données', 'Opportunités limitées', 'Perfectionnisme'],
      averageImpact: '-15%',
      riskLevel: 'Faible'
    }
  };

  const archetype = archetypes[currentArchetype];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleArchetypeChange = (newArchetype) => {
    setCurrentArchetype(newArchetype);
    setAnimationKey(prev => prev + 1);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Élevé': return 'text-error';
      case 'Modéré': return 'text-warning';
      case 'Faible': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Votre Archétype Émotionnel</h2>
        <div className="flex items-center space-x-2">
          {Object.keys(archetypes).map((key) => (
            <button
              key={key}
              onClick={() => handleArchetypeChange(key)}
              className={`w-8 h-8 rounded-full text-lg transition-all duration-200 ${
                currentArchetype === key 
                  ? 'scale-110 shadow-lg' 
                  : 'opacity-60 hover:opacity-80 hover:scale-105'
              }`}
              title={archetypes[key].name}
            >
              {archetypes[key].emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Archetype Visualization */}
        <div className="flex flex-col items-center">
          <motion.div
            key={animationKey}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${archetype.color} flex items-center justify-center text-6xl mb-4 shadow-xl`}
          >
            {archetype.emoji}
          </motion.div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">{archetype.name}</h3>
          <p className="text-muted-foreground text-center mb-4">{archetype.description}</p>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{archetype.averageImpact}</div>
              <div className="text-xs text-muted-foreground">Impact moyen</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${getRiskColor(archetype.riskLevel)}`}>
                {archetype.riskLevel}
              </div>
              <div className="text-xs text-muted-foreground">Niveau de risque</div>
            </div>
          </div>
        </div>

        {/* Archetype Details */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
              <Icon name="Brain" size={16} className="mr-2 text-primary" />
              Traits Comportementaux
            </h4>
            <div className="space-y-2">
              {archetype.traits.map((trait, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm text-muted-foreground">{trait}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
              <Icon name="Zap" size={16} className="mr-2 text-warning" />
              Déclencheurs de Dépenses
            </h4>
            <div className="space-y-2">
              {archetype.spendingTriggers.map((trigger, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span className="text-sm text-muted-foreground">{trigger}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-glass-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Dernière mise à jour</span>
              <span className="text-sm font-medium text-foreground">Il y a 2 heures</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-glass-border">
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors">
            <Icon name="BookOpen" size={14} className="mr-1" />
            Stratégies d'adaptation
          </button>
          <button className="flex items-center px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-sm hover:bg-secondary/20 transition-colors">
            <Icon name="Target" size={14} className="mr-1" />
            Objectifs personnalisés
          </button>
          <button className="flex items-center px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm hover:bg-accent/20 transition-colors">
            <Icon name="Share2" size={14} className="mr-1" />
            Partager l'analyse
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionalArchetypeCard;