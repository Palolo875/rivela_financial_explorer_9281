import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataPurgeControl = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [purgeStep, setPurgeStep] = useState(0);
  const [confirmationText, setConfirmationText] = useState('');
  const [isPurging, setIsPurging] = useState(false);

  const purgeOptions = [
    {
      id: 'transactions',
      label: 'Données de transactions',
      description: 'Toutes les transactions et catégories',
      icon: 'Receipt',
      count: 847
    },
    {
      id: 'emotions',
      label: 'Données émotionnelles',
      description: 'Humeurs et contextes associés',
      icon: 'Heart',
      count: 234
    },
    {
      id: 'goals',
      label: 'Objectifs financiers',
      description: 'Objectifs et projections',
      icon: 'Target',
      count: 12
    },
    {
      id: 'preferences',
      label: 'Préférences utilisateur',
      description: 'Paramètres et personnalisation',
      icon: 'Settings',
      count: 1
    }
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionToggle = (optionId) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handlePurgeStart = () => {
    if (selectedOptions.length === 0) return;
    setShowConfirmDialog(true);
    setPurgeStep(0);
  };

  const handleConfirmPurge = async () => {
    if (confirmationText !== 'SUPPRIMER') return;
    
    setIsPurging(true);
    setPurgeStep(1);
    
    // Simulate purge process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPurgeStep(2);
    setIsPurging(false);
    
    // Reset after showing success
    setTimeout(() => {
      setShowConfirmDialog(false);
      setPurgeStep(0);
      setSelectedOptions([]);
      setConfirmationText('');
    }, 2000);
  };

  const getTotalCount = () => {
    return selectedOptions.reduce((total, optionId) => {
      const option = purgeOptions.find(opt => opt.id === optionId);
      return total + (option?.count || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div className="glass-card rounded-lg p-4 border-l-4 border-warning bg-warning/5">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">Action irréversible</h4>
            <p className="text-sm text-muted-foreground mt-1">
              La suppression des données est définitive. Assurez-vous d'avoir exporté vos données importantes avant de continuer.
            </p>
          </div>
        </div>
      </div>

      {/* Data Selection */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sélectionner les données à supprimer</h3>
        
        <div className="space-y-3">
          {purgeOptions.map((option) => (
            <div
              key={option.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                selectedOptions.includes(option.id)
                  ? 'border-error bg-error/5' :'border-glass-border bg-muted/10 hover:bg-muted/20'
              }`}
              onClick={() => handleOptionToggle(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={option.icon} 
                    size={20} 
                    className={selectedOptions.includes(option.id) ? 'text-error' : 'text-primary'} 
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-mono text-muted-foreground">
                    {option.count.toLocaleString('fr-FR')} éléments
                  </span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedOptions.includes(option.id)
                      ? 'border-error bg-error' :'border-muted-foreground'
                  }`}>
                    {selectedOptions.includes(option.id) && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedOptions.length > 0 && (
          <div className="mt-6 p-4 bg-error/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">
                  {selectedOptions.length} catégorie{selectedOptions.length > 1 ? 's' : ''} sélectionnée{selectedOptions.length > 1 ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  {getTotalCount().toLocaleString('fr-FR')} éléments au total
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={handlePurgeStart}
              >
                Supprimer les données
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="glass-card rounded-lg p-6 w-full max-w-md">
            {purgeStep === 0 && (
              <>
                <div className="text-center mb-6">
                  <Icon name="AlertTriangle" size={48} className="text-error mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Confirmer la suppression</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous êtes sur le point de supprimer définitivement {getTotalCount().toLocaleString('fr-FR')} éléments.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Tapez "SUPPRIMER" pour confirmer
                    </label>
                    <input
                      type="text"
                      value={confirmationText}
                      onChange={(e) => setConfirmationText(e.target.value)}
                      className="w-full mt-2 px-3 py-2 bg-input border border-glass-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-error"
                      placeholder="SUPPRIMER"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => setShowConfirmDialog(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="destructive"
                      fullWidth
                      disabled={confirmationText !== 'SUPPRIMER'}
                      onClick={handleConfirmPurge}
                    >
                      Supprimer définitivement
                    </Button>
                  </div>
                </div>
              </>
            )}

            {purgeStep === 1 && (
              <div className="text-center py-8">
                <div className="animate-spin w-12 h-12 border-4 border-error border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Suppression en cours...</h3>
                <p className="text-sm text-muted-foreground">
                  Veuillez patienter pendant la suppression des données.
                </p>
              </div>
            )}

            {purgeStep === 2 && (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Suppression terminée</h3>
                <p className="text-sm text-muted-foreground">
                  Les données sélectionnées ont été supprimées définitivement.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPurgeControl;