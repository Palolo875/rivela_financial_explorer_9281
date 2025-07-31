import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyDashboard = () => {
  const [encryptionStatus] = useState({
    status: 'active',
    algorithm: 'AES-256',
    lastUpdated: '2025-01-25 15:30:00'
  });

  const [dataMetrics] = useState({
    totalRecords: 1247,
    encryptedFiles: 1247,
    storageUsed: '2.3 MB',
    lastBackup: '2025-01-25 14:20:00'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'Shield';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Encryption Status */}
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">État du chiffrement</h3>
          <div className={`flex items-center space-x-2 ${getStatusColor(encryptionStatus.status)}`}>
            <Icon name={getStatusIcon(encryptionStatus.status)} size={20} />
            <span className="text-sm font-medium capitalize">{encryptionStatus.status}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Algorithme</span>
              <span className="text-sm font-mono text-foreground">{encryptionStatus.algorithm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Dernière mise à jour</span>
              <span className="text-sm text-foreground">
                {new Date(encryptionStatus.lastUpdated).toLocaleString('fr-FR')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * 0.1}`}
                  className="text-success transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="Lock" size={24} className="text-success" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Metrics */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Métriques des données</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Icon name="Database" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{dataMetrics.totalRecords.toLocaleString('fr-FR')}</div>
            <div className="text-xs text-muted-foreground">Enregistrements</div>
          </div>
          
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{dataMetrics.encryptedFiles.toLocaleString('fr-FR')}</div>
            <div className="text-xs text-muted-foreground">Fichiers chiffrés</div>
          </div>
          
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Icon name="HardDrive" size={24} className="text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{dataMetrics.storageUsed}</div>
            <div className="text-xs text-muted-foreground">Stockage utilisé</div>
          </div>
          
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Icon name="Clock" size={24} className="text-secondary mx-auto mb-2" />
            <div className="text-sm font-bold text-foreground">
              {new Date(dataMetrics.lastBackup).toLocaleDateString('fr-FR')}
            </div>
            <div className="text-xs text-muted-foreground">Dernière sauvegarde</div>
          </div>
        </div>
      </div>

      {/* Data Storage Locations */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Emplacements de stockage</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Stockage local</div>
                <div className="text-xs text-muted-foreground">IndexedDB - Navigateur</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-xs text-success">Chiffré</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Cloud" size={20} className="text-muted-foreground" />
              <div>
                <div className="text-sm font-medium text-foreground">Cloud externe</div>
                <div className="text-xs text-muted-foreground">Aucun - Données locales uniquement</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="X" size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Désactivé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDashboard;