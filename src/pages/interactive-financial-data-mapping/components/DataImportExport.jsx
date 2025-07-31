import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataImportExport = ({ onImportData, onExportData, financialData }) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [importType, setImportType] = useState('csv');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          // Simuler l'import CSV
          const mockImportedData = {
            revenus: [
              { id: Date.now() + 1, nom: 'Salaire importé', montant: 3200, frequence: 'mensuel', type: 'salaire' },
              { id: Date.now() + 2, nom: 'Freelance importé', montant: 800, frequence: 'mensuel', type: 'freelance' }
            ],
            depenses: [
              { id: Date.now() + 3, nom: 'Loyer importé', montant: 1100, categorie: 'logement', type: 'fixe', frequence: 'mensuel' },
              { id: Date.now() + 4, nom: 'Courses importées', montant: 350, categorie: 'alimentation', type: 'variable', frequence: 'mensuel' }
            ]
          };
          onImportData(mockImportedData);
          setShowImportModal(false);
        } else if (file.type === 'application/json') {
          const data = JSON.parse(e.target.result);
          onImportData(data);
          setShowImportModal(false);
        }
      } catch (error) {
        console.error('Erreur lors de l\'import:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleExport = (format) => {
    const dataToExport = {
      revenus: financialData.revenus || [],
      depenses: financialData.depenses || [],
      dettes: financialData.dettes || [],
      objectifs: financialData.objectifs || [],
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    let content, filename, mimeType;

    switch (format) {
      case 'json':
        content = JSON.stringify(dataToExport, null, 2);
        filename = `rivela-financial-data-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
        break;
      case 'csv':
        // Conversion simplifiée en CSV
        const csvContent = [
          'Type,Nom,Montant,Catégorie,Fréquence',
          ...dataToExport.revenus.map(r => `Revenu,${r.nom},${r.montant},${r.type},${r.frequence}`),
          ...dataToExport.depenses.map(d => `Dépense,${d.nom},-${d.montant},${d.categorie},${d.frequence}`),
          ...dataToExport.dettes.map(d => `Dette,${d.nom},-${d.montantRestant},${d.type},mensuel`),
          ...dataToExport.objectifs.map(o => `Objectif,${o.nom},${o.montantCible},${o.categorie},unique`)
        ].join('\n');
        content = csvContent;
        filename = `rivela-financial-data-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onExportData(format);
  };

  const simulateOCRScan = () => {
    // Simuler un scan OCR de reçu
    const mockReceiptData = {
      depenses: [
        {
          id: Date.now(),
          nom: 'Supermarché Carrefour',
          montant: 67.45,
          categorie: 'alimentation',
          type: 'variable',
          frequence: 'mensuel',
          moodRating: 6,
          tags: ['ocr-scan', 'reçu'],
          dateAjout: new Date().toISOString()
        }
      ]
    };
    onImportData(mockReceiptData);
  };

  return (
    <>
      {/* Boutons d'import/export */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          variant="outline"
          onClick={() => setShowImportModal(true)}
          iconName="Upload"
          iconPosition="left"
          className="glass border-glass-border hover:bg-primary/10"
        >
          Importer
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleExport('json')}
          iconName="Download"
          iconPosition="left"
          className="glass border-glass-border hover:bg-success/10"
        >
          Exporter JSON
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleExport('csv')}
          iconName="FileText"
          iconPosition="left"
          className="glass border-glass-border hover:bg-success/10"
        >
          Exporter CSV
        </Button>
        
        <Button
          variant="outline"
          onClick={simulateOCRScan}
          iconName="Camera"
          iconPosition="left"
          className="glass border-glass-border hover:bg-warning/10"
        >
          Scanner reçu
        </Button>
      </div>

      {/* Modal d'import */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="glass-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Importer des données</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowImportModal(false)}
              />
            </div>

            {/* Zone de drag & drop */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/10' :'border-glass-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                Glissez vos fichiers ici
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                ou cliquez pour sélectionner
              </p>
              
              <input
                type="file"
                accept=".csv,.json"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload').click()}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Choisir un fichier
              </Button>
            </div>

            {/* Types de fichiers supportés */}
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Formats supportés:</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="FileText" size={16} className="mr-2" />
                  CSV - Données tabulaires
                </div>
                <div className="flex items-center">
                  <Icon name="Code" size={16} className="mr-2" />
                  JSON - Sauvegarde complète
                </div>
              </div>
            </div>

            {/* Exemple de format CSV */}
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Format CSV attendu:</h4>
              <code className="text-xs text-muted-foreground block">
                Type,Nom,Montant,Catégorie,Fréquence<br/>
                Revenu,Salaire,3500,salaire,mensuel<br/>
                Dépense,Loyer,1200,logement,mensuel
              </code>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowImportModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataImportExport;