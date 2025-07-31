import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('/financial-question-input-hub');
  const [healthScore, setHealthScore] = useState(78);
  const [dataCompletion, setDataCompletion] = useState(65);

  const navigationTabs = [
    { 
      label: 'Accueil', 
      path: '/financial-question-input-hub', 
      icon: 'Home',
      tooltip: 'Questions et insights IA'
    },
    { 
      label: 'Données', 
      path: '/interactive-financial-data-mapping', 
      icon: 'Database',
      tooltip: 'Cartographie financière',
      badge: dataCompletion < 100 ? `${dataCompletion}%` : null
    },
    { 
      label: 'Analyse', 
      path: '/dynamic-financial-equation-visualizer', 
      icon: 'BarChart3',
      tooltip: 'Visualisation et émotions'
    },
    { 
      label: 'Santé', 
      path: '/personalized-financial-health-center', 
      icon: 'Heart',
      tooltip: 'Score de santé financière',
      badge: healthScore > 0 ? healthScore.toString() : null,
      badgeColor: healthScore >= 80 ? 'success' : healthScore >= 60 ? 'warning' : 'error'
    }
  ];

  useEffect(() => {
    // Set active tab based on current path
    const currentPath = window.location.pathname;
    setActiveTab(currentPath);
  }, []);

  const handleTabClick = (path) => {
    setActiveTab(path);
    window.location.href = path;
  };

  const getBadgeColor = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-100 lg:hidden glass-card border-t border-glass-border">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationTabs.map((tab) => {
            const isActive = activeTab === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className={`relative flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-smooth ${
                  isActive 
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
                title={tab.tooltip}
              >
                <div className="relative">
                  <Icon 
                    name={tab.icon} 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {tab.badge && (
                    <span className={`absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-xs font-medium rounded-full ${getBadgeColor(tab.badgeColor)}`}>
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <nav className="hidden lg:flex fixed top-16 left-0 right-0 z-90 glass-card border-b border-glass-border">
        <div className="flex items-center justify-center w-full h-14 px-6">
          <div className="flex items-center space-x-1">
            {navigationTabs.map((tab) => {
              const isActive = activeTab === tab.path;
              return (
                <button
                  key={tab.path}
                  onClick={() => handleTabClick(tab.path)}
                  className={`relative flex items-center px-4 py-2 rounded-lg transition-smooth ${
                    isActive 
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  title={tab.tooltip}
                >
                  <div className="relative mr-2">
                    <Icon 
                      name={tab.icon} 
                      size={18} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {tab.badge && (
                      <span className={`absolute -top-1 -right-1 min-w-[16px] h-[16px] flex items-center justify-center text-xs font-medium rounded-full ${getBadgeColor(tab.badgeColor)}`}>
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 z-80 flex items-center justify-center group"
        onClick={() => {
          // Quick action functionality
          console.log('Quick action triggered');
        }}
        title="Actions rapides"
      >
        <Icon name="Plus" size={24} strokeWidth={2.5} />
        
        {/* Quick Action Menu (expandable) */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex flex-col space-y-2">
            <button className="w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center" title="Enregistrement vocal">
              <Icon name="Mic" size={18} />
            </button>
            <button className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center" title="Ajouter dépense">
              <Icon name="Receipt" size={18} />
            </button>
            <button className="w-12 h-12 bg-warning text-warning-foreground rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center" title="Scanner reçu">
              <Icon name="Camera" size={18} />
            </button>
          </div>
        </div>
      </button>
    </>
  );
};

export default BottomNavigation;