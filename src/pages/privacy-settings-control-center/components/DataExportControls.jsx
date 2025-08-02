import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataExportControls = () => {
  const [selectedFormats, setSelectedFormats] = useState(['json']);
  const [selectedDataTypes, setSelectedDataTypes] = useState(['transactions']);
  const [exportProgress, setExportProgress] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'json',
      name: 'JSON',
      description: 'Format structuré pour développeurs',
      icon: 'Code',
      size: '2.3 MB',
      recommended: true
    },
    {
      id: 'csv',
      name: 'CSV',
      description: 'Compatible avec Excel et Google Sheets',
      icon: 'FileSpreadsheet',
      size: '1.8 MB',
      recommended: false
    },
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Rapport lisible avec graphiques',
      icon: 'FileText',
      size: '4.1 MB',
      recommended: false
    },
    {
      id: 'xml',
      name: 'XML',
      description: 'Format structuré standard',
      icon: 'FileCode',
      size: '3.2 MB',
      recommended: false
    }
  ];

  const dataTypes = [
    {
      id: 'transactions',
      name: 'Transactions financières',
      description: 'Toutes vos transactions et catégories',
      icon: 'Receipt',
      count: 847,
      size: '1.2 MB'
    },
    {
      id: 'emotions',
      name: 'Données émotionnelles',
      description: 'Humeurs et contextes associés aux dépenses',
      icon: 'Heart',
      count: 234,
      size: '0.3 MB'
    },
    {
      id: 'goals',
      name: 'Objectifs financiers',
      description: 'Vos objectifs et leur progression',
      icon: 'Target',
      count: 12,
      size: '0.1 MB'
    },
    {
      id: 'insights',
      name: 'Insights et analyses',
      description: 'Rapports générés et recommandations',
      icon: 'Brain',
      count: 56,
      size: '0.4 MB'
    },
    {
      id: 'preferences',
      name: 'Préférences utilisateur',
      description: 'Paramètres et personnalisations',
      icon: 'Settings',
      count: 1,
      size: '0.02 MB'
    }
  ];

  const handleFormatToggle = (formatId) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleDataTypeToggle = (dataTypeId) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataTypeId) 
        ? prev.filter(id => id !== dataTypeId)
        : [...prev, dataTypeId]
    );
  };

  const calculateTotalSize = () => {
    const selectedData = dataTypes.filter(dt => selectedDataTypes.includes(dt.id));
    const totalSizeMB = selectedData.reduce((total, dt) => {
      const sizeMB = parseFloat(dt.size.replace(' MB', ''));
      return total + sizeMB;
    }, 0);
    return totalSizeMB.toFixed(2);
  };

  const handleExport = async () => {
    if (selectedFormats.length === 0 || selectedDataTypes.length === 0) return;
    
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setExportProgress((i / steps) * 100);
    }
    
    // Simulate file generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsExporting(false);
    setExportProgress(null);
    
    // Trigger download (mock)
    // Export completed successfully
  };

  const getEstimatedTime = () => {
    const totalSize = parseFloat(calculateTotalSize());
    const formatMultiplier = selectedFormats.length;
    const estimatedSeconds = Math.ceil((totalSize * formatMultiplier) / 2);
    
    if (estimatedSeconds < 60) return `${estimatedSeconds} secondes`;
    return `${Math.ceil(estimatedSeconds / 60)} minute${Math.ceil(estimatedSeconds / 60) > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Export Summary */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Résumé de l'exportation</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <Icon name="FileDown" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{selectedFormats.length}</div>
            <div className="text-xs text-muted-foreground">Format{selectedFormats.length > 1 ? 's' : ''}</div>
          </div>
          
          <div className="text-center p-4 bg-secondary/10 rounded-lg">
            <Icon name="Database" size={24} className="text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{selectedDataTypes.length}</div>
            <div className="text-xs text-muted-foreground">Type{selectedDataTypes.length > 1 ? 's' : ''} de données</div>
          </div>
          
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <Icon name="HardDrive" size={24} className="text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{calculateTotalSize()} MB</div>
            <div className="text-xs text-muted-foreground">Taille estimée</div>
          </div>
          
          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <Icon name="Clock" size={24} className="text-warning mx-auto mb-2" />
            <div className="text-sm font-bold text-foreground">{getEstimatedTime()}</div>
            <div className="text-xs text-muted-foreground">Temps estimé</div>
          </div>
        </div>
      </div>

      {/* Format Selection */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Formats d'exportation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportFormats.map((format) => (
            <div
              key={format.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                selectedFormats.includes(format.id)
                  ? 'border-primary bg-primary/5' :'border-glass-border bg-muted/10 hover:bg-muted/20'
              }`}
              onClick={() => handleFormatToggle(format.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={format.icon} size={20} className="text-primary" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-foreground">{format.name}</span>
                      {format.recommended && (
                        <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                          Recommandé
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{format.description}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">{format.size}</div>
                  </div>
                </div>
                
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedFormats.includes(format.id)
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedFormats.includes(format.id) && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Type Selection */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Types de données à exporter</h3>
        
        <div className="space-y-3">
          {dataTypes.map((dataType) => (
            <div
              key={dataType.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                selectedDataTypes.includes(dataType.id)
                  ? 'border-primary bg-primary/5' :'border-glass-border bg-muted/10 hover:bg-muted/20'
              }`}
              onClick={() => handleDataTypeToggle(dataType.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={dataType.icon} size={20} className="text-primary" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{dataType.name}</div>
                    <div className="text-xs text-muted-foreground">{dataType.description}</div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {dataType.count.toLocaleString('fr-FR')} éléments
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {dataType.size}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedDataTypes.includes(dataType.id)
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedDataTypes.includes(dataType.id) && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Controls */}
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Lancer l'exportation</h3>
          {exportProgress !== null && (
            <div className="text-sm text-muted-foreground">
              {Math.round(exportProgress)}% terminé
            </div>
          )}
        </div>
        
        {exportProgress !== null && (
          <div className="mb-4">
            <div className="w-full bg-muted/20 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedFormats.length > 0 && selectedDataTypes.length > 0 ? (
              `Prêt à exporter ${selectedDataTypes.length} type${selectedDataTypes.length > 1 ? 's' : ''} de données en ${selectedFormats.length} format${selectedFormats.length > 1 ? 's' : ''}`
            ) : (
              'Sélectionnez au moins un format et un type de données'
            )}
          </div>
          
          <Button
            variant="default"
            iconName={isExporting ? "Loader2" : "Download"}
            iconPosition="left"
            disabled={selectedFormats.length === 0 || selectedDataTypes.length === 0 || isExporting}
            loading={isExporting}
            onClick={handleExport}
          >
            {isExporting ? 'Exportation...' : 'Exporter les données'}
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="glass-card rounded-lg p-6 border-l-4 border-warning bg-warning/5">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">Sécurité des données exportées</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Les fichiers exportés contiennent vos données personnelles. Assurez-vous de les stocker en sécurité et de les supprimer après utilisation si nécessaire.
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Lock" size={12} />
                <span>Les données sont chiffrées dans les fichiers JSON et XML</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Les liens de téléchargement expirent après 24 heures</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Trash2" size={12} />
                <span>Les fichiers temporaires sont automatiquement supprimés</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportControls;