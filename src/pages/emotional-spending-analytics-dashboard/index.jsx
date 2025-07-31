import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import AnalyticalContextSwitcher from '../../components/ui/AnalyticalContextSwitcher';
import NavigationProgressIndicator from '../../components/ui/NavigationProgressIndicator';
import EmotionalArchetypeCard from './components/EmotionalArchetypeCard';
import MoodSpendingCorrelationChart from './components/MoodSpendingCorrelationChart';
import SpendingPatternAnalysis from './components/SpendingPatternAnalysis';
import EmotionalSpendingJournal from './components/EmotionalSpendingJournal';
import MoodCalendarHeatmap from './components/MoodCalendarHeatmap';
import PatternRecognitionAlerts from './components/PatternRecognitionAlerts';
import Icon from '../../components/AppIcon';

const EmotionalSpendingAnalyticsDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'BarChart3' },
    { id: 'patterns', label: 'Patterns', icon: 'TrendingUp' },
    { id: 'journal', label: 'Journal', icon: 'BookOpen' },
    { id: 'calendar', label: 'Calendrier', icon: 'Calendar' },
    { id: 'alerts', label: 'Alertes', icon: 'AlertTriangle' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Analyse de vos patterns émotionnels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnalyticalContextSwitcher />
      <NavigationProgressIndicator />
      
      <main className="pt-32 lg:pt-44 pb-20 lg:pb-8 px-4 lg:px-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
              <Icon name="Heart" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analyse Émotionnelle</h1>
              <p className="text-muted-foreground">
                Découvrez les liens entre vos émotions et vos habitudes financières
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Brain" size={16} className="text-secondary" />
                <span className="text-sm text-muted-foreground">Archétype actuel</span>
              </div>
              <div className="text-lg font-bold text-foreground mt-1">Tigre Stressé</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Corrélation</span>
              </div>
              <div className="text-lg font-bold text-foreground mt-1">-0.73</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm text-muted-foreground">Alertes actives</span>
              </div>
              <div className="text-lg font-bold text-foreground mt-1">4</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">Jours analysés</span>
              </div>
              <div className="text-lg font-bold text-foreground mt-1">25</div>
            </div>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <div className="mb-8">
          <div className="flex items-center space-x-1 bg-muted/20 rounded-lg p-1 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon 
                  name={section.icon} 
                  size={16} 
                  className="mr-2"
                  strokeWidth={activeSection === section.id ? 2.5 : 2}
                />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <EmotionalArchetypeCard />
              <MoodSpendingCorrelationChart />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <SpendingPatternAnalysis />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'patterns' && (
            <div className="space-y-8">
              <SpendingPatternAnalysis />
              <MoodSpendingCorrelationChart />
            </div>
          )}

          {activeSection === 'journal' && (
            <EmotionalSpendingJournal />
          )}

          {activeSection === 'calendar' && (
            <div className="space-y-8">
              <MoodCalendarHeatmap />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EmotionalArchetypeCard />
                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Insights Calendrier</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Jour le plus dépensier</div>
                        <div className="text-sm text-muted-foreground">12 juillet - 890€ (humeur: 1/10)</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="TrendingUp" size={16} className="text-success" />
                      <div>
                        <div className="font-medium text-foreground">Meilleur contrôle</div>
                        <div className="text-sm text-muted-foreground">15 juillet - 75€ (humeur: 9/10)</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={16} className="text-warning" />
                      <div>
                        <div className="font-medium text-foreground">Pattern récurrent</div>
                        <div className="text-sm text-muted-foreground">Pics de dépenses les mardis</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'alerts' && (
            <div className="space-y-8">
              <PatternRecognitionAlerts />
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Stratégies d'Adaptation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-success/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="font-medium text-foreground">Techniques Efficaces</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Respiration profonde avant achat</li>
                      <li>• Liste d'alternatives gratuites</li>
                      <li>• Appel à un proche de confiance</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Target" size={16} className="text-primary" />
                      <span className="font-medium text-foreground">À Développer</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Méditation quotidienne</li>
                      <li>• Journal émotionnel régulier</li>
                      <li>• Exercice physique anti-stress</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Export and Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-glass-border"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Prêt à agir sur vos insights ?</h3>
              <p className="text-sm text-muted-foreground">
                Exportez votre analyse ou créez un plan d'action personnalisé
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-muted/20 text-muted-foreground rounded-lg hover:bg-muted/30 transition-colors">
                <Icon name="Download" size={16} className="mr-2" />
                Exporter PDF
              </button>
              <button className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
                <Icon name="Target" size={16} className="mr-2" />
                Plan d'action
              </button>
              <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Icon name="Share2" size={16} className="mr-2" />
                Partager
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default EmotionalSpendingAnalyticsDashboard;