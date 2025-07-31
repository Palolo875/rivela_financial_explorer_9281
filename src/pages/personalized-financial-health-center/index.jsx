import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import AnalyticalContextSwitcher from '../../components/ui/AnalyticalContextSwitcher';
import NavigationProgressIndicator from '../../components/ui/NavigationProgressIndicator';
import HealthScoreIndicator from './components/HealthScoreIndicator';
import HealthMetricsGrid from './components/HealthMetricsGrid';
import MicroLearningCenter from './components/MicroLearningCenter';
import CommunityChallenge from './components/CommunityChallenge';
import HealthTrendVisualization from './components/HealthTrendVisualization';
import AlertSystem from './components/AlertSystem';
import ExportHealthReport from './components/ExportHealthReport';
import Icon from '../../components/AppIcon';

const PersonalizedFinancialHealthCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [showCelebration, setShowCelebration] = useState(false);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Trigger celebration animation for achievements
  useEffect(() => {
    const hasNewAchievement = localStorage.getItem('newAchievement');
    if (hasNewAchievement) {
      setShowCelebration(true);
      localStorage.removeItem('newAchievement');
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, []);

  const tabs = [
    {
      id: 'overview',
      label: 'Vue d\'ensemble',
      icon: 'LayoutDashboard',
      description: 'Score global et métriques principales'
    },
    {
      id: 'trends',
      label: 'Tendances',
      icon: 'TrendingUp',
      description: 'Évolution et projections'
    },
    {
      id: 'learning',
      label: 'Apprentissage',
      icon: 'GraduationCap',
      description: 'Modules éducatifs et quiz'
    },
    {
      id: 'community',
      label: 'Communauté',
      icon: 'Users',
      description: 'Défis et classements'
    },
    {
      id: 'alerts',
      label: 'Alertes',
      icon: 'Bell',
      description: 'Notifications et opportunités'
    },
    {
      id: 'export',
      label: 'Rapports',
      icon: 'Download',
      description: 'Exporter vos données'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <HealthScoreIndicator />
              </div>
              <div className="lg:col-span-2">
                <HealthMetricsGrid />
              </div>
            </div>
          </div>
        );
      case 'trends':
        return <HealthTrendVisualization />;
      case 'learning':
        return <MicroLearningCenter />;
      case 'community':
        return <CommunityChallenge />;
      case 'alerts':
        return <AlertSystem />;
      case 'export':
        return <ExportHealthReport />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <HealthScoreIndicator />
              </div>
              <div className="lg:col-span-2">
                <HealthMetricsGrid />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Navigation Progress Indicator */}
      <NavigationProgressIndicator />
      
      {/* Analytical Context Switcher */}
      <AnalyticalContextSwitcher />

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-100 flex items-center justify-center">
          <div className="animate-bounce text-6xl">🎉</div>
          <div className="absolute inset-0 bg-gradient-to-r from-success/20 via-primary/20 to-secondary/20 animate-pulse" />
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pt-30 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                <Icon name="Heart" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Centre de Santé Financière
                </h1>
                <p className="text-muted-foreground">
                  Votre tableau de bord personnalisé pour une santé financière optimale
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="glass-card rounded-lg p-3 text-center border border-glass-border">
                <div className="text-lg font-bold text-success">78</div>
                <div className="text-xs text-muted-foreground">Score Global</div>
              </div>
              <div className="glass-card rounded-lg p-3 text-center border border-glass-border">
                <div className="text-lg font-bold text-primary">+13</div>
                <div className="text-xs text-muted-foreground">Progression 6M</div>
              </div>
              <div className="glass-card rounded-lg p-3 text-center border border-glass-border">
                <div className="text-lg font-bold text-secondary">4</div>
                <div className="text-xs text-muted-foreground">Défis Actifs</div>
              </div>
              <div className="glass-card rounded-lg p-3 text-center border border-glass-border">
                <div className="text-lg font-bold text-warning">2</div>
                <div className="text-xs text-muted-foreground">Alertes</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="glass-card rounded-xl p-2 border border-glass-border">
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center p-3 rounded-lg transition-smooth ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    title={tab.description}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={18} 
                      className="mb-1"
                      strokeWidth={activeTab === tab.id ? 2.5 : 2}
                    />
                    <span className="text-xs font-medium text-center leading-tight">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>

          {/* Floating Help Button */}
          <button
            className="fixed bottom-32 left-4 lg:bottom-20 lg:left-6 w-12 h-12 bg-gradient-to-br from-secondary to-primary text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 z-70 flex items-center justify-center"
            title="Aide et support"
          >
            <Icon name="HelpCircle" size={20} strokeWidth={2.5} />
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default PersonalizedFinancialHealthCenter;