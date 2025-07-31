import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountManagement = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'Marie Dubois',
    email: 'marie.dubois@example.com',
    phone: '+33 6 12 34 56 78',
    dateOfBirth: '1985-03-15',
    language: 'fr',
    currency: 'EUR'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [authMethods] = useState([
    {
      id: 'password',
      label: 'Mot de passe',
      description: 'Authentification par mot de passe',
      icon: 'Lock',
      enabled: true,
      strength: 'strong'
    },
    {
      id: 'biometric',
      label: 'Biométrie',
      description: 'Empreinte digitale ou reconnaissance faciale',
      icon: 'Fingerprint',
      enabled: false,
      strength: 'high'
    },
    {
      id: 'twoFactor',
      label: 'Authentification à deux facteurs',
      description: 'Code SMS ou application d\'authentification',
      icon: 'Shield',
      enabled: false,
      strength: 'very-high'
    }
  ]);

  const [sessions] = useState([
    {
      id: 1,
      device: 'Chrome sur Windows',
      location: 'Paris, France',
      lastActive: '2025-01-25 15:30:00',
      current: true,
      ip: '192.168.1.100'
    },
    {
      id: 2,
      device: 'Safari sur iPhone',
      location: 'Paris, France',
      lastActive: '2025-01-25 12:15:00',
      current: false,
      ip: '192.168.1.101'
    },
    {
      id: 3,
      device: 'Firefox sur Ubuntu',
      location: 'Lyon, France',
      lastActive: '2025-01-24 18:45:00',
      current: false,
      ip: '10.0.0.50'
    }
  ]);

  const sections = [
    { id: 'profile', label: 'Profil', icon: 'User' },
    { id: 'password', label: 'Mot de passe', icon: 'Lock' },
    { id: 'auth', label: 'Authentification', icon: 'Shield' },
    { id: 'sessions', label: 'Sessions', icon: 'Monitor' }
  ];

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { level: 'weak', color: 'text-error' };
    if (password.length < 10) return { level: 'medium', color: 'text-warning' };
    return { level: 'strong', color: 'text-success' };
  };

  const getAuthStrengthColor = (strength) => {
    switch (strength) {
      case 'weak':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'strong':
        return 'text-success';
      case 'high':
        return 'text-primary';
      case 'very-high':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleSessionRevoke = (sessionId) => {
    console.log('Revoking session:', sessionId);
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="glass-card rounded-lg p-2">
        <div className="flex flex-wrap gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      {activeSection === 'profile' && (
        <div className="glass-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Informations du profil</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom complet"
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
                placeholder="Votre nom complet"
              />
              
              <Input
                label="Adresse e-mail"
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileUpdate('email', e.target.value)}
                placeholder="votre@email.com"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Téléphone"
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                placeholder="+33 6 12 34 56 78"
              />
              
              <Input
                label="Date de naissance"
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Langue</label>
                <select
                  value={profileData.language}
                  onChange={(e) => handleProfileUpdate('language', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-glass-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Devise</label>
                <select
                  value={profileData.currency}
                  onChange={(e) => handleProfileUpdate('currency', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-glass-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollar US ($)</option>
                  <option value="GBP">Livre Sterling (£)</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button variant="default" iconName="Save" iconPosition="left">
                Sauvegarder les modifications
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Password Section */}
      {activeSection === 'password' && (
        <div className="glass-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Changer le mot de passe</h3>
          
          <div className="space-y-4 max-w-md">
            <Input
              label="Mot de passe actuel"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              placeholder="Votre mot de passe actuel"
            />
            
            <Input
              label="Nouveau mot de passe"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              placeholder="Nouveau mot de passe"
              description={passwordData.newPassword && (
                <span className={getPasswordStrength(passwordData.newPassword).color}>
                  Force: {getPasswordStrength(passwordData.newPassword).level}
                </span>
              )}
            />
            
            <Input
              label="Confirmer le nouveau mot de passe"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              placeholder="Confirmer le nouveau mot de passe"
              error={passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword ? 'Les mots de passe ne correspondent pas' : ''}
            />
            
            <div className="flex justify-end pt-4">
              <Button 
                variant="default" 
                iconName="Lock" 
                iconPosition="left"
                disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
              >
                Changer le mot de passe
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Methods */}
      {activeSection === 'auth' && (
        <div className="glass-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Méthodes d'authentification</h3>
          
          <div className="space-y-4">
            {authMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 bg-muted/10 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={method.icon} size={20} className="text-primary" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{method.label}</div>
                    <div className="text-xs text-muted-foreground">{method.description}</div>
                    <div className={`text-xs ${getAuthStrengthColor(method.strength)} mt-1`}>
                      Sécurité: {method.strength}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {method.enabled && (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                  <Button
                    variant={method.enabled ? "outline" : "default"}
                    size="sm"
                  >
                    {method.enabled ? 'Désactiver' : 'Activer'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Sessions */}
      {activeSection === 'sessions' && (
        <div className="glass-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Sessions actives</h3>
          
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-lg border ${
                  session.current 
                    ? 'border-primary bg-primary/5' :'border-glass-border bg-muted/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Monitor" size={20} className="text-primary" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground">{session.device}</span>
                        {session.current && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                            Session actuelle
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session.location} • {session.ip}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Dernière activité: {new Date(session.lastActive).toLocaleString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  
                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="X"
                      onClick={() => handleSessionRevoke(session.id)}
                    >
                      Révoquer
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-warning/10 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Sécurité des sessions</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Si vous remarquez une activité suspecte, révoquez immédiatement les sessions non reconnues et changez votre mot de passe.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;