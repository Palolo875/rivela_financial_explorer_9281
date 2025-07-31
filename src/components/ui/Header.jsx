import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Accueil', path: '/financial-question-input-hub', icon: 'Home' },
    { label: 'Données', path: '/interactive-financial-data-mapping', icon: 'Database' },
    { label: 'Analyse', path: '/dynamic-financial-equation-visualizer', icon: 'BarChart3' },
    { label: 'Santé', path: '/personalized-financial-health-center', icon: 'Heart' }
  ];

  const secondaryItems = [
    { label: 'Confidentialité', path: '/privacy-settings-control-center', icon: 'Shield' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 glass-card border-b border-glass-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-foreground">Rivela</h1>
            <p className="text-xs text-muted-foreground -mt-1">Financial Explorer</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item.path)}
              iconName={item.icon}
              iconPosition="left"
              iconSize={18}
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          {/* Voice Input Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="Mic"
            iconSize={18}
            className="hidden sm:flex glass border-glass-border hover:bg-primary/10 transition-smooth"
          >
            <span className="hidden md:inline ml-2">Voice</span>
          </Button>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              iconSize={18}
              onClick={toggleMenu}
              className="hover:bg-primary/10 transition-smooth"
            />
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-lg shadow-lg border border-glass-border z-50">
                <div className="py-2">
                  {secondaryItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-smooth"
                    >
                      <Icon name={item.icon} size={16} className="mr-3" />
                      {item.label}
                    </button>
                  ))}
                  <hr className="my-2 border-glass-border" />
                  <button className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-smooth">
                    <Icon name="Download" size={16} className="mr-3" />
                    Exporter
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-smooth">
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Aide
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            iconSize={18}
            onClick={toggleMenu}
            className="lg:hidden hover:bg-primary/10 transition-smooth"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass-card border-t border-glass-border">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-primary/10 rounded-lg transition-smooth"
              >
                <Icon name={item.icon} size={18} className="mr-3" />
                {item.label}
              </button>
            ))}
            <hr className="my-3 border-glass-border" />
            {secondaryItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-primary/10 rounded-lg transition-smooth"
              >
                <Icon name={item.icon} size={18} className="mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;