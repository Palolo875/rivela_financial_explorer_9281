import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PermissionControls = () => {
  const [permissions, setPermissions] = useState({
    voiceInput: true,
    analytics: false,
    notifications: true,
    locationData: false,
    cameraAccess: false,
    microphoneAccess: true,
    biometricAuth: false,
    dataSharing: false
  });

  const permissionItems = [
    {
      id: 'voiceInput',
      label: 'Saisie vocale',
      description: 'Permettre l\'enregistrement vocal pour les transactions',
      icon: 'Mic',
      category: 'input',
      risk: 'medium'
    },
    {
      id: 'analytics',
      label: 'Analyses comportementales',
      description: 'Analyser les patterns de dépenses pour des insights personnalisés',
      icon: 'BarChart3',
      category: 'analysis',
      risk: 'low'
    },
    {
      id: 'notifications',
      label: 'Notifications push',
      description: 'Recevoir des alertes budgétaires et des rappels',
      icon: 'Bell',
      category: 'communication',
      risk: 'low'
    },
    {
      id: 'locationData',
      label: 'Données de localisation',
      description: 'Utiliser la localisation pour catégoriser automatiquement les dépenses',
      icon: 'MapPin',
      category: 'location',
      risk: 'high'
    },
    {
      id: 'cameraAccess',
      label: 'Accès à la caméra',
      description: 'Scanner les reçus et documents financiers',
      icon: 'Camera',
      category: 'input',
      risk: 'medium'
    },
    {
      id: 'microphoneAccess',
      label: 'Accès au microphone',
      description: 'Enregistrement vocal pour les notes et transactions',
      icon: 'Mic',
      category: 'input',
      risk: 'medium'
    },
    {
      id: 'biometricAuth',
      label: 'Authentification biométrique',
      description: 'Utiliser l\'empreinte digitale ou la reconnaissance faciale',
      icon: 'Fingerprint',
      category: 'security',
      risk: 'low'
    },
    {
      id: 'dataSharing',
      label: 'Partage de données',
      description: 'Partager des données anonymisées pour améliorer l\'application',
      icon: 'Share2',
      category: 'sharing',
      risk: 'medium'
    }
  ];

  const handlePermissionToggle = (permissionId) => {
    setPermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId]
    }));
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'low':
        return 'Shield';
      case 'medium':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'input':
        return 'Keyboard';
      case 'analysis':
        return 'Brain';
      case 'communication':
        return 'MessageSquare';
      case 'location':
        return 'MapPin';
      case 'security':
        return 'Lock';
      case 'sharing':
        return 'Users';
      default:
        return 'Settings';
    }
  };

  const groupedPermissions = permissionItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  const categoryLabels = {
    input: 'Saisie et capture',
    analysis: 'Analyse et insights',
    communication: 'Communication',
    location: 'Localisation',
    security: 'Sécurité',
    sharing: 'Partage de données'
  };

  return (
    <div className="space-y-6">
      {/* Permission Summary */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Résumé des autorisations</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {Object.values(permissions).filter(Boolean).length}
            </div>
            <div className="text-xs text-muted-foreground">Autorisées</div>
          </div>
          
          <div className="text-center p-4 bg-error/10 rounded-lg">
            <Icon name="ShieldOff" size={24} className="text-error mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {Object.values(permissions).filter(p => !p).length}
            </div>
            <div className="text-xs text-muted-foreground">Refusées</div>
          </div>
          
          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <Icon name="AlertTriangle" size={24} className="text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {permissionItems.filter(item => item.risk === 'high' && permissions[item.id]).length}
            </div>
            <div className="text-xs text-muted-foreground">Risque élevé</div>
          </div>
          
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-bold text-foreground">
              {new Date().toLocaleDateString('fr-FR')}
            </div>
            <div className="text-xs text-muted-foreground">Dernière mise à jour</div>
          </div>
        </div>
      </div>

      {/* Grouped Permissions */}
      {Object.entries(groupedPermissions).map(([category, items]) => (
        <div key={category} className="glass-card rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name={getCategoryIcon(category)} size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              {categoryLabels[category]}
            </h3>
          </div>
          
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-muted/10 rounded-lg hover:bg-muted/20 transition-smooth"
              >
                <div className="flex items-start space-x-3 flex-1">
                  <Icon name={item.icon} size={20} className="text-primary mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <div className={`flex items-center space-x-1 ${getRiskColor(item.risk)}`}>
                        <Icon name={getRiskIcon(item.risk)} size={12} />
                        <span className="text-xs capitalize">{item.risk}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handlePermissionToggle(item.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    permissions[item.id] ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      permissions[item.id] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Privacy Notice */}
      <div className="glass-card rounded-lg p-6 border-l-4 border-primary bg-primary/5">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">Protection de la vie privée</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Toutes les données restent stockées localement sur votre appareil. Aucune information personnelle n'est transmise à des serveurs externes sans votre consentement explicite.
            </p>
            <div className="mt-3">
              <button className="text-sm text-primary hover:underline">
                En savoir plus sur notre politique de confidentialité
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionControls;