import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAppNavigation } from '../../utils/navigation';

const AnalyticalContextSwitcher = () => {
  const { navigateTo } = useAppNavigation();
  const location = useLocation();
  const [activeContext, setActiveContext] = useState('equation');

  const contexts = [
    {
      id: 'equation',
      label: 'Équations',
      path: '/dynamic-financial-equation-visualizer',
      icon: 'Calculator',
      description: 'Visualisation mathématique'
    },
    {
      id: 'emotional',
      label: 'Émotions',
      path: '/emotional-spending-analytics-dashboard',
      icon: 'Heart',
      description: 'Analyse comportementale'
    }
  ];

  const handleContextSwitch = (contextId, path) => {
    setActiveContext(contextId);
    navigateTo(path);
  };

  // Only show on analysis pages
  const currentPath = location.pathname;
  const isAnalysisPage = currentPath === '/dynamic-financial-equation-visualizer' || 
                        currentPath === '/emotional-spending-analytics-dashboard';

  if (!isAnalysisPage) {
    return null;
  }

  return (
    <div className="sticky top-16 lg:top-30 z-80 bg-background/80 backdrop-blur-sm border-b border-glass-border">
      <div className="flex items-center justify-center px-4 py-3">
        <div className="flex items-center glass-card rounded-lg p-1">
          {contexts.map((context) => {
            const isActive = activeContext === context.id;
            return (
              <button
                key={context.id}
                onClick={() => handleContextSwitch(context.id, context.path)}
                className={`flex items-center px-4 py-2 rounded-md transition-smooth ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title={context.description}
              >
                <Icon 
                  name={context.icon} 
                  size={16} 
                  className="mr-2"
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-sm font-medium">
                  {context.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ 
            width: activeContext === 'equation' ? '50%' : '100%',
            marginLeft: activeContext === 'equation' ? '0%' : '50%'
          }}
        />
      </div>
    </div>
  );
};

export default AnalyticalContextSwitcher;