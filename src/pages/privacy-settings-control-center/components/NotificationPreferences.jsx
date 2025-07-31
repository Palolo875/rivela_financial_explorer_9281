import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationPreferences = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    budgetAlerts: {
      enabled: true,
      threshold: 80,
      frequency: 'immediate'
    },
    achievementCelebrations: {
      enabled: true,
      sound: true,
      animation: true
    },
    educationalContent: {
      enabled: false,
      frequency: 'weekly',
      topics: ['budgeting', 'investing']
    },
    reminderNotifications: {
      enabled: true,
      billReminders: true,
      goalCheckIns: true,
      dataEntry: false
    },
    marketingCommunications: {
      enabled: false,
      productUpdates: false,
      newsletters: false
    }
  });

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: '22:00',
    endTime: '08:00'
  });

  const notificationTypes = [
    {
      id: 'budgetAlerts',
      name: 'Alertes budgétaires',
      description: 'Notifications quand vous approchez de vos limites de budget',
      icon: 'AlertTriangle',
      category: 'financial',
      importance: 'high'
    },
    {
      id: 'achievementCelebrations',
      name: 'Célébrations de réussites',
      description: 'Animations et sons pour vos accomplissements financiers',
      icon: 'Trophy',
      category: 'motivation',
      importance: 'medium'
    },
    {
      id: 'educationalContent',
      name: 'Contenu éducatif',
      description: 'Tips et articles sur la gestion financière personnelle',
      icon: 'BookOpen',
      category: 'education',
      importance: 'low'
    },
    {
      id: 'reminderNotifications',
      name: 'Rappels',
      description: 'Rappels pour les factures, objectifs et saisie de données',
      icon: 'Clock',
      category: 'productivity',
      importance: 'high'
    },
    {
      id: 'marketingCommunications',
      name: 'Communications marketing',
      description: 'Mises à jour produit et newsletters',
      icon: 'Mail',
      category: 'marketing',
      importance: 'low'
    }
  ];

  const frequencyOptions = [
    { value: 'immediate', label: 'Immédiat' },
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuel' }
  ];

  const educationalTopics = [
    { id: 'budgeting', label: 'Budgétisation', icon: 'PieChart' },
    { id: 'investing', label: 'Investissement', icon: 'TrendingUp' },
    { id: 'saving', label: 'Épargne', icon: 'Piggybank' },
    { id: 'debt', label: 'Gestion des dettes', icon: 'CreditCard' },
    { id: 'taxes', label: 'Fiscalité', icon: 'FileText' },
    { id: 'insurance', label: 'Assurances', icon: 'Shield' }
  ];

  const handleNotificationToggle = (type, subSetting = null) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: subSetting 
        ? { ...prev[type], [subSetting]: !prev[type][subSetting] }
        : { ...prev[type], enabled: !prev[type].enabled }
    }));
  };

  const handleSettingChange = (type, setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: { ...prev[type], [setting]: value }
    }));
  };

  const handleTopicToggle = (topicId) => {
    setNotificationSettings(prev => ({
      ...prev,
      educationalContent: {
        ...prev.educationalContent,
        topics: prev.educationalContent.topics.includes(topicId)
          ? prev.educationalContent.topics.filter(t => t !== topicId)
          : [...prev.educationalContent.topics, topicId]
      }
    }));
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'financial':
        return 'DollarSign';
      case 'motivation':
        return 'Heart';
      case 'education':
        return 'GraduationCap';
      case 'productivity':
        return 'CheckSquare';
      case 'marketing':
        return 'Megaphone';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Overview */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Aperçu des notifications</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <Icon name="Bell" size={24} className="text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {Object.values(notificationSettings).filter(setting => setting.enabled).length}
            </div>
            <div className="text-xs text-muted-foreground">Activées</div>
          </div>
          
          <div className="text-center p-4 bg-error/10 rounded-lg">
            <Icon name="BellOff" size={24} className="text-error mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {Object.values(notificationSettings).filter(setting => !setting.enabled).length}
            </div>
            <div className="text-xs text-muted-foreground">Désactivées</div>
          </div>
          
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <Icon name="Volume2" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {notificationSettings.achievementCelebrations.sound ? 'ON' : 'OFF'}
            </div>
            <div className="text-xs text-muted-foreground">Sons</div>
          </div>
          
          <div className="text-center p-4 bg-secondary/10 rounded-lg">
            <Icon name="Moon" size={24} className="text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {quietHours.enabled ? 'ON' : 'OFF'}
            </div>
            <div className="text-xs text-muted-foreground">Mode silencieux</div>
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Moon" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Heures de silence</h3>
          </div>
          <button
            onClick={() => setQuietHours(prev => ({ ...prev, enabled: !prev.enabled }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              quietHours.enabled ? 'bg-primary' : 'bg-muted-foreground'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {quietHours.enabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Début</label>
              <input
                type="time"
                value={quietHours.startTime}
                onChange={(e) => setQuietHours(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full px-3 py-2 bg-input border border-glass-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Fin</label>
              <input
                type="time"
                value={quietHours.endTime}
                onChange={(e) => setQuietHours(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full px-3 py-2 bg-input border border-glass-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground mt-3">
          Pendant les heures de silence, seules les notifications critiques seront affichées.
        </p>
      </div>

      {/* Notification Types */}
      {notificationTypes.map((type) => (
        <div key={type.id} className="glass-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name={type.icon} size={20} className="text-primary" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">{type.name}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon name={getCategoryIcon(type.category)} size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground capitalize">{type.category}</span>
                  <span className={`text-xs ${getImportanceColor(type.importance)}`}>
                    • {type.importance}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleNotificationToggle(type.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings[type.id].enabled ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings[type.id].enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Budget Alerts Settings */}
          {type.id === 'budgetAlerts' && notificationSettings.budgetAlerts.enabled && (
            <div className="space-y-4 pt-4 border-t border-glass-border">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Seuil d'alerte ({notificationSettings.budgetAlerts.threshold}%)
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={notificationSettings.budgetAlerts.threshold}
                  onChange={(e) => handleSettingChange('budgetAlerts', 'threshold', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Fréquence</label>
                <select
                  value={notificationSettings.budgetAlerts.frequency}
                  onChange={(e) => handleSettingChange('budgetAlerts', 'frequency', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-glass-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {frequencyOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Achievement Celebrations Settings */}
          {type.id === 'achievementCelebrations' && notificationSettings.achievementCelebrations.enabled && (
            <div className="space-y-3 pt-4 border-t border-glass-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Effets sonores</span>
                <button
                  onClick={() => handleNotificationToggle('achievementCelebrations', 'sound')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationSettings.achievementCelebrations.sound ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationSettings.achievementCelebrations.sound ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Animations</span>
                <button
                  onClick={() => handleNotificationToggle('achievementCelebrations', 'animation')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationSettings.achievementCelebrations.animation ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationSettings.achievementCelebrations.animation ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Educational Content Settings */}
          {type.id === 'educationalContent' && notificationSettings.educationalContent.enabled && (
            <div className="space-y-4 pt-4 border-t border-glass-border">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Fréquence</label>
                <select
                  value={notificationSettings.educationalContent.frequency}
                  onChange={(e) => handleSettingChange('educationalContent', 'frequency', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-glass-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {frequencyOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Sujets d'intérêt</label>
                <div className="grid grid-cols-2 gap-2">
                  {educationalTopics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicToggle(topic.id)}
                      className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-smooth ${
                        notificationSettings.educationalContent.topics.includes(topic.id)
                          ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted/10 text-muted-foreground border border-glass-border hover:bg-muted/20'
                      }`}
                    >
                      <Icon name={topic.icon} size={14} />
                      <span>{topic.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reminder Notifications Settings */}
          {type.id === 'reminderNotifications' && notificationSettings.reminderNotifications.enabled && (
            <div className="space-y-3 pt-4 border-t border-glass-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Rappels de factures</span>
                <button
                  onClick={() => handleNotificationToggle('reminderNotifications', 'billReminders')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationSettings.reminderNotifications.billReminders ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationSettings.reminderNotifications.billReminders ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Suivi des objectifs</span>
                <button
                  onClick={() => handleNotificationToggle('reminderNotifications', 'goalCheckIns')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationSettings.reminderNotifications.goalCheckIns ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationSettings.reminderNotifications.goalCheckIns ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Saisie de données</span>
                <button
                  onClick={() => handleNotificationToggle('reminderNotifications', 'dataEntry')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationSettings.reminderNotifications.dataEntry ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationSettings.reminderNotifications.dataEntry ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Marketing Communications Settings */}
          {type.id === 'marketingCommunications' && notificationSettings.marketingCommunications.enabled && (
            <div className="space-y-3 pt-4 border-t border-glass-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Mises à jour produit</span>
                <button
                  onClick={() => handleNotificationToggle('marketingCommunications', 'productUpdates')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationSettings.marketingCommunications.productUpdates ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationSettings.marketingCommunications.productUpdates ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Newsletters</span>
                <button
                  onClick={() => handleNotificationToggle('marketingCommunications', 'newsletters')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationSettings.marketingCommunications.newsletters ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationSettings.marketingCommunications.newsletters ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationPreferences;