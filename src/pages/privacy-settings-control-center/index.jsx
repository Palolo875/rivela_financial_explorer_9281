import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import AnalyticalContextSwitcher from '../../components/ui/AnalyticalContextSwitcher';
import NavigationProgressIndicator from '../../components/ui/NavigationProgressIndicator';

// Import all components
import PrivacyDashboard from './components/PrivacyDashboard';
import DataPurgeControl from './components/DataPurgeControl';
import PermissionControls from './components/PermissionControls';
import AccountManagement from './components/AccountManagement';
import ThemeCustomization from './components/ThemeCustomization';
import DataExportControls from './components/DataExportControls';
import NotificationPreferences from './components/NotificationPreferences';

const PrivacySettingsControlCenter = () => {
  const [activeSection, setActiveSection] = useState('privacy');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const sections = [
    {
      id: 'privacy',
      name: 'Confidentialité',
      description: 'Tableau de bord et contrôles de confidentialité',
      icon: 'Shield',
      component: PrivacyDashboard,
      color: 'text-primary'
    },
    {
      id: 'permissions',
      name: 'Autorisations',
      description: 'Contrôle granulaire des permissions',
      icon: 'Lock',
      component: PermissionControls,
      color: 'text-secondary'
    },
    {
      id: 'account',
      name: 'Compte',
      description: 'Gestion du profil et authentification',
      icon: 'User',
      component: AccountManagement,
      color: 'text-accent'
    },
    {
      id: 'data',
      name: 'Données',
      description: 'Exportation et suppression des données',
      icon: 'Database',
      component: DataExportControls,
      color: 'text-warning'
    },
    {
      id: 'purge',
      name: 'Suppression',
      description: 'Suppression définitive des données',
      icon: 'Trash2',
      component: DataPurgeControl,
      color: 'text-error'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'Préférences de notifications et alertes',
      icon: 'Bell',
      component: NotificationPreferences,
      color: 'text-primary'
    },
    {
      id: 'theme',
      name: 'Apparence',
      description: 'Thèmes et options d\'accessibilité',
      icon: 'Palette',
      component: ThemeCustomization,
      color: 'text-secondary'
    }
  ];

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component || PrivacyDashboard;

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnalyticalContextSwitcher />
      <NavigationProgressIndicator />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-30 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Icon name="Shield" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Centre de contrôle de la confidentialité
                </h1>
                <p className="text-muted-foreground">
                  Gérez vos données, votre confidentialité et vos préférences en toute transparence
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher dans les paramètres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-glass-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-lg p-4 sticky top-20">
                <h2 className="text-lg font-semibold text-foreground mb-4">Sections</h2>
                
                <nav className="space-y-2">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-smooth ${
                        activeSection === section.id
                          ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon 
                        name={section.icon} 
                        size={18} 
                        className={activeSection === section.id ? section.color : 'text-muted-foreground'}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{section.name}</div>
                        <div className="text-xs opacity-80">{section.description}</div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-6 pt-4 border-t border-glass-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Actions rapides</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSectionChange('data')}
                      className="w-full flex items-center space-x-2 p-2 text-xs text-primary hover:bg-primary/10 rounded-lg transition-smooth"
                    >
                      <Icon name="Download" size={14} />
                      <span>Exporter mes données</span>
                    </button>
                    <button
                      onClick={() => handleSectionChange('purge')}
                      className="w-full flex items-center space-x-2 p-2 text-xs text-error hover:bg-error/10 rounded-lg transition-smooth"
                    >
                      <Icon name="Trash2" size={14} />
                      <span>Supprimer mes données</span>
                    </button>
                    <button
                      onClick={() => handleSectionChange('theme')}
                      className="w-full flex items-center space-x-2 p-2 text-xs text-secondary hover:bg-secondary/10 rounded-lg transition-smooth"
                    >
                      <Icon name="Palette" size={14} />
                      <span>Changer le thème</span>
                    </button>
                  </div>
                </div>

                {/* Privacy Status */}
                <div className="mt-6 pt-4 border-t border-glass-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground">Statut de sécurité</span>
                  </div>
                  <div className="text-xs text-success">Toutes les données sont chiffrées</div>
                  <div className="text-xs text-muted-foreground">
                    Dernière vérification: {new Date().toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <Icon 
                    name={sections.find(s => s.id === activeSection)?.icon || 'Shield'} 
                    size={24} 
                    className={sections.find(s => s.id === activeSection)?.color || 'text-primary'}
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {sections.find(s => s.id === activeSection)?.name || 'Confidentialité'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {sections.find(s => s.id === activeSection)?.description || 'Tableau de bord et contrôles de confidentialité'}
                    </p>
                  </div>
                </div>

                {/* Dynamic Component Content */}
                <ActiveComponent />
              </div>
            </div>
          </div>

          {/* Footer Information */}
          <div className="mt-12 pt-8 border-t border-glass-border">
            <div className="glass-card rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Icon name="Info" size={24} className="text-primary mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Engagement de confidentialité Rivela
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rivela s'engage à protéger votre vie privée. Toutes vos données financières restent stockées localement sur votre appareil et sont chiffrées avec l'algorithme AES-256. Nous ne collectons, ne vendons, ni ne partageons vos informations personnelles avec des tiers.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <Icon name="Lock" size={16} className="text-success" />
                      <span className="text-muted-foreground">Chiffrement AES-256</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Smartphone" size={16} className="text-success" />
                      <span className="text-muted-foreground">Stockage local uniquement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} className="text-success" />
                      <span className="text-muted-foreground">Conformité RGPD</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="text-xs text-primary hover:underline">
                      Politique de confidentialité complète
                    </button>
                    <span className="text-xs text-muted-foreground">•</span>
                    <button className="text-xs text-primary hover:underline">
                      Conditions d'utilisation
                    </button>
                    <span className="text-xs text-muted-foreground">•</span>
                    <button className="text-xs text-primary hover:underline">
                      Nous contacter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default PrivacySettingsControlCenter;