import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportHealthReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedSections, setSelectedSections] = useState([
    'health_score',
    'metrics',
    'trends',
    'recommendations'
  ]);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Rapport complet avec graphiques',
      icon: 'FileText',
      size: '~2.5 MB'
    },
    {
      id: 'excel',
      name: 'Excel',
      description: 'Données brutes pour analyse',
      icon: 'FileSpreadsheet',
      size: '~1.2 MB'
    },
    {
      id: 'json',
      name: 'JSON',
      description: 'Format technique pour développeurs',
      icon: 'Code',
      size: '~0.8 MB'
    }
  ];

  const reportSections = [
    {
      id: 'health_score',
      name: 'Score de Santé',
      description: 'Score global et évolution',
      icon: 'Heart',
      required: true
    },
    {
      id: 'metrics',
      name: 'Métriques Détaillées',
      description: 'Budget, épargne, dettes, objectifs',
      icon: 'BarChart3',
      required: false
    },
    {
      id: 'trends',
      name: 'Analyses de Tendances',
      description: 'Évolution sur 6 mois avec projections',
      icon: 'TrendingUp',
      required: false
    },
    {
      id: 'recommendations',
      name: 'Recommandations',
      description: 'Conseils personnalisés d\'amélioration',
      icon: 'Lightbulb',
      required: false
    },
    {
      id: 'benchmarks',
      name: 'Comparaisons',
      description: 'Positionnement vs communauté anonyme',
      icon: 'Users',
      required: false
    },
    {
      id: 'scientific',
      name: 'Références Scientifiques',
      description: 'Sources et études comportementales',
      icon: 'BookOpen',
      required: false
    }
  ];

  const recentReports = [
    {
      id: 'report_jan_2025',
      name: 'Rapport Janvier 2025',
      date: new Date('2025-01-20'),
      format: 'PDF',
      size: '2.3 MB',
      downloaded: true
    },
    {
      id: 'report_dec_2024',
      name: 'Rapport Décembre 2024',
      date: new Date('2024-12-31'),
      format: 'Excel',
      size: '1.1 MB',
      downloaded: false
    },
    {
      id: 'report_nov_2024',
      name: 'Rapport Novembre 2024',
      date: new Date('2024-11-30'),
      format: 'PDF',
      size: '2.1 MB',
      downloaded: true
    }
  ];

  const handleSectionToggle = (sectionId) => {
    const section = reportSections.find(s => s.id === sectionId);
    if (section.required) return;

    if (selectedSections.includes(sectionId)) {
      setSelectedSections(selectedSections.filter(id => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate download
    const reportName = `rapport-sante-financiere-${new Date().toISOString().split('T')[0]}.${selectedFormat}`;
    console.log(`Téléchargement du rapport: ${reportName}`);
    
    setIsGenerating(false);
  };

  const handleDownloadReport = (reportId) => {
    console.log(`Téléchargement du rapport: ${reportId}`);
  };

  const getEstimatedSize = () => {
    const baseSize = selectedFormat === 'pdf' ? 1.5 : selectedFormat === 'excel' ? 0.8 : 0.5;
    const sectionMultiplier = selectedSections.length * 0.3;
    return (baseSize + sectionMultiplier).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Exporter Rapport de Santé</h3>
          <p className="text-sm text-muted-foreground">Générez un rapport complet de votre situation financière</p>
        </div>
        <Icon name="Download" size={20} className="text-primary" />
      </div>

      {/* Export Configuration */}
      <div className="glass-card rounded-xl p-4 border border-glass-border">
        <h4 className="text-md font-medium text-foreground mb-4">Configuration du Rapport</h4>
        
        {/* Format Selection */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-foreground mb-3">Format d'Export</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {exportFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-3 rounded-lg border transition-smooth text-left ${
                  selectedFormat === format.id
                    ? 'border-primary bg-primary/10 text-primary' :'border-glass-border hover:border-primary/50 text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={format.icon} size={16} />
                  <span className="font-medium">{format.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{format.description}</p>
                <p className="text-xs text-muted-foreground">{format.size}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Section Selection */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-foreground mb-3">Sections à Inclure</h5>
          <div className="space-y-2">
            {reportSections.map((section) => (
              <div
                key={section.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-smooth ${
                  selectedSections.includes(section.id)
                    ? 'border-primary/30 bg-primary/5' :'border-glass-border'
                } ${section.required ? 'opacity-75' : 'cursor-pointer hover:border-primary/50'}`}
                onClick={() => handleSectionToggle(section.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedSections.includes(section.id)
                      ? 'bg-primary/10 text-primary' :'bg-muted/20 text-muted-foreground'
                  }`}>
                    <Icon name={section.icon} size={14} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{section.name}</span>
                      {section.required && (
                        <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded-full">
                          Requis
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  selectedSections.includes(section.id)
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedSections.includes(section.id) && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generation Summary */}
        <div className="bg-muted/10 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sections sélectionnées:</span>
            <span className="font-medium text-foreground">{selectedSections.length}/6</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Taille estimée:</span>
            <span className="font-medium text-foreground">~{getEstimatedSize()} MB</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Temps de génération:</span>
            <span className="font-medium text-foreground">~30 secondes</span>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating || selectedSections.length === 0}
          className="w-full flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Icon name="Download" size={16} className="mr-2" />
              Générer le Rapport
            </>
          )}
        </button>
      </div>

      {/* Recent Reports */}
      <div className="space-y-3">
        <h4 className="text-md font-medium text-foreground">Rapports Récents</h4>
        <div className="space-y-2">
          {recentReports.map((report) => (
            <div key={report.id} className="glass-card rounded-xl p-4 border border-glass-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Icon name="FileText" size={16} />
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-foreground">{report.name}</h6>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{report.date.toLocaleDateString('fr-FR')}</span>
                      <span>•</span>
                      <span>{report.format}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {report.downloaded && (
                    <Icon name="CheckCircle" size={14} className="text-success" />
                  )}
                  <button
                    onClick={() => handleDownloadReport(report.id)}
                    className="flex items-center px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-xs font-medium hover:bg-secondary/20 transition-smooth"
                  >
                    <Icon name="Download" size={12} className="mr-1" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="glass-card rounded-xl p-4 border border-glass-border bg-muted/5">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div>
            <h6 className="text-sm font-medium text-foreground mb-1">Confidentialité des Données</h6>
            <p className="text-xs text-muted-foreground">
              Tous les rapports sont générés localement. Aucune donnée personnelle n'est transmise à des serveurs externes. 
              Les comparaisons communautaires utilisent des données anonymisées et agrégées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportHealthReport;