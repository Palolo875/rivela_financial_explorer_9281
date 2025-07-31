import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, completionData }) => {
  const tabs = [
    { 
      id: 'revenus', 
      label: 'Revenus', 
      icon: 'TrendingUp', 
      color: 'text-success',
      completion: completionData.revenus 
    },
    { 
      id: 'depenses', 
      label: 'Dépenses', 
      icon: 'ShoppingCart', 
      color: 'text-primary',
      completion: completionData.depenses 
    },
    { 
      id: 'dettes', 
      label: 'Dettes', 
      icon: 'CreditCard', 
      color: 'text-error',
      completion: completionData.dettes 
    },
    { 
      id: 'objectifs', 
      label: 'Objectifs', 
      icon: 'Target', 
      color: 'text-warning',
      completion: completionData.objectifs 
    }
  ];

  return (
    <div className="sticky top-16 lg:top-30 z-50 bg-background/80 backdrop-blur-sm border-b border-glass-border mb-6">
      <div className="flex items-center justify-center px-4 py-3">
        <div className="flex items-center glass-card rounded-lg p-1 w-full max-w-2xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex flex-col items-center px-3 py-2 rounded-md transition-smooth relative ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={tab.icon} 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {tab.completion > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium mt-1">
                  {tab.label}
                </span>
                {tab.completion > 0 && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-success rounded-full opacity-60" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;