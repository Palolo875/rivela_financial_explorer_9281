import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThemeCustomization = () => {
  const [activeTheme, setActiveTheme] = useState('default');
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    colorBlindFriendly: false
  });

  const themes = [
    {
      id: 'default',
      name: 'Glassmorphisme par défaut',
      description: 'Thème principal avec effets de verre et dégradés doux',
      preview: 'linear-gradient(135deg, #4F8EDB, #7B68EE)',
      colors: {
        primary: '#4F8EDB',
        secondary: '#7B68EE',
        accent: '#52C4A0'
      }
    },
    {
      id: 'ocean',
      name: 'Océan profond',
      description: 'Tons bleus apaisants avec transparence marine',
      preview: 'linear-gradient(135deg, #0EA5E9, #06B6D4)',
      colors: {
        primary: '#0EA5E9',
        secondary: '#06B6D4',
        accent: '#10B981'
      }
    },
    {
      id: 'sunset',
      name: 'Coucher de soleil',
      description: 'Dégradés chauds orange et rose',
      preview: 'linear-gradient(135deg, #F97316, #EC4899)',
      colors: {
        primary: '#F97316',
        secondary: '#EC4899',
        accent: '#F59E0B'
      }
    },
    {
      id: 'forest',
      name: 'Forêt mystique',
      description: 'Verts naturels avec touches dorées',
      preview: 'linear-gradient(135deg, #059669, #84CC16)',
      colors: {
        primary: '#059669',
        secondary: '#84CC16',
        accent: '#F59E0B'
      }
    },
    {
      id: 'midnight',
      name: 'Minuit étoilé',
      description: 'Thème sombre avec accents violets',
      preview: 'linear-gradient(135deg, #1E1B4B, #581C87)',
      colors: {
        primary: '#1E1B4B',
        secondary: '#581C87',
        accent: '#A855F7'
      }
    },
    {
      id: 'highContrast',
      name: 'Contraste élevé',
      description: 'Thème optimisé pour l\'accessibilité',
      preview: 'linear-gradient(135deg, #000000, #FFFFFF)',
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        accent: '#FFD700'
      }
    }
  ];

  const fontSizes = [
    { id: 'small', label: 'Petit', size: '14px' },
    { id: 'default', label: 'Normal', size: '16px' },
    { id: 'large', label: 'Grand', size: '18px' },
    { id: 'xlarge', label: 'Très grand', size: '20px' }
  ];

  const [selectedFontSize, setSelectedFontSize] = useState('default');

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    // Apply theme to document root
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      document.documentElement.style.setProperty('--color-primary', theme.colors.primary);
      document.documentElement.style.setProperty('--color-secondary', theme.colors.secondary);
      document.documentElement.style.setProperty('--color-accent', theme.colors.accent);
    }
  };

  const handleAccessibilityToggle = (setting) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleFontSizeChange = (sizeId) => {
    setSelectedFontSize(sizeId);
    const fontSize = fontSizes.find(f => f.id === sizeId);
    if (fontSize) {
      document.documentElement.style.setProperty('font-size', fontSize.size);
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Thèmes visuels</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                activeTheme === theme.id
                  ? 'border-primary bg-primary/5' :'border-glass-border bg-muted/10 hover:bg-muted/20'
              }`}
              onClick={() => handleThemeChange(theme.id)}
            >
              {/* Theme Preview */}
              <div
                className="w-full h-20 rounded-lg mb-3"
                style={{ background: theme.preview }}
              />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">{theme.name}</h4>
                  {activeTheme === theme.id && (
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{theme.description}</p>
                
                {/* Color Palette */}
                <div className="flex space-x-2 mt-3">
                  <div
                    className="w-4 h-4 rounded-full border border-glass-border"
                    style={{ backgroundColor: theme.colors.primary }}
                    title="Couleur primaire"
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-glass-border"
                    style={{ backgroundColor: theme.colors.secondary }}
                    title="Couleur secondaire"
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-glass-border"
                    style={{ backgroundColor: theme.colors.accent }}
                    title="Couleur d'accent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Size Settings */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Taille de police</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fontSizes.map((fontSize) => (
            <button
              key={fontSize.id}
              onClick={() => handleFontSizeChange(fontSize.id)}
              className={`p-4 rounded-lg border-2 transition-smooth ${
                selectedFontSize === fontSize.id
                  ? 'border-primary bg-primary/5' :'border-glass-border bg-muted/10 hover:bg-muted/20'
              }`}
            >
              <div className="text-center">
                <div
                  className="font-semibold text-foreground mb-1"
                  style={{ fontSize: fontSize.size }}
                >
                  Aa
                </div>
                <div className="text-xs text-muted-foreground">{fontSize.label}</div>
                <div className="text-xs text-muted-foreground font-mono">{fontSize.size}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Options d'accessibilité</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Eye" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Contraste élevé</div>
                <div className="text-xs text-muted-foreground">Améliore la lisibilité avec des contrastes renforcés</div>
              </div>
            </div>
            <button
              onClick={() => handleAccessibilityToggle('highContrast')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                accessibilitySettings.highContrast ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Type" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Texte agranди</div>
                <div className="text-xs text-muted-foreground">Augmente automatiquement la taille du texte</div>
              </div>
            </div>
            <button
              onClick={() => handleAccessibilityToggle('largeText')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                accessibilitySettings.largeText ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.largeText ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Animations réduites</div>
                <div className="text-xs text-muted-foreground">Limite les effets de mouvement et transitions</div>
              </div>
            </div>
            <button
              onClick={() => handleAccessibilityToggle('reducedMotion')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                accessibilitySettings.reducedMotion ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Volume2" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Support lecteur d'écran</div>
                <div className="text-xs text-muted-foreground">Optimise l'interface pour les lecteurs d'écran</div>
              </div>
            </div>
            <button
              onClick={() => handleAccessibilityToggle('screenReader')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                accessibilitySettings.screenReader ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.screenReader ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Palette" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Couleurs adaptées daltonisme</div>
                <div className="text-xs text-muted-foreground">Palette de couleurs optimisée pour le daltonisme</div>
              </div>
            </div>
            <button
              onClick={() => handleAccessibilityToggle('colorBlindFriendly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                accessibilitySettings.colorBlindFriendly ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.colorBlindFriendly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Theme Preview */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Aperçu du thème</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="text-primary font-semibold mb-2">Élément primaire</h4>
            <p className="text-foreground text-sm">
              Ceci est un exemple de texte avec la couleur primaire du thème sélectionné.
            </p>
          </div>
          
          <div className="p-4 bg-secondary/10 rounded-lg">
            <h4 className="text-secondary font-semibold mb-2">Élément secondaire</h4>
            <p className="text-foreground text-sm">
              Ceci est un exemple de texte avec la couleur secondaire du thème sélectionné.
            </p>
          </div>
          
          <div className="p-4 bg-accent/10 rounded-lg">
            <h4 className="text-accent font-semibold mb-2">Élément d'accent</h4>
            <p className="text-foreground text-sm">
              Ceci est un exemple de texte avec la couleur d'accent du thème sélectionné.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button variant="default" iconName="Palette" iconPosition="left">
            Appliquer le thème
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomization;