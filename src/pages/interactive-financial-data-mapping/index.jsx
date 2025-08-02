import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import NavigationProgressIndicator from '../../components/ui/NavigationProgressIndicator';
import DataCompletionIndicator from './components/DataCompletionIndicator';
import TabNavigation from './components/TabNavigation';
import RevenusSection from './components/RevenusSection';
import DepensesSection from './components/DepensesSection';
import DettesSection from './components/DettesSection';
import ObjectifsSection from './components/ObjectifsSection';
import DataImportExport from './components/DataImportExport';
import FinancialHealthSidebar from './components/FinancialHealthSidebar';

const InteractiveFinancialDataMapping = () => {
  const [activeTab, setActiveTab] = useState('revenus');
  const [financialData, setFinancialData] = useState({
    revenus: [],
    depenses: [],
    dettes: [],
    objectifs: []
  });
  const [emotionalContexts, setEmotionalContexts] = useState({});

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem('rivela-financial-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFinancialData(parsedData);
      } catch (error) {
        // Error parsing saved data - continue with empty state
      }
    }

    const savedContexts = localStorage.getItem('rivela-emotional-contexts');
    if (savedContexts) {
      try {
        const parsedContexts = JSON.parse(savedContexts);
        setEmotionalContexts(parsedContexts);
      } catch (error) {
        // Error loading emotional contexts - continue with empty state
      }
    }
  }, []);

  // Sauvegarder les données dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('rivela-financial-data', JSON.stringify(financialData));
  }, [financialData]);

  useEffect(() => {
    localStorage.setItem('rivela-emotional-contexts', JSON.stringify(emotionalContexts));
  }, [emotionalContexts]);

  // Calculer les pourcentages de completion
  const calculateCompletionData = () => {
    const getCompletion = (data, minItems = 3) => {
      if (data.length === 0) return 0;
      if (data.length >= minItems) return 100;
      return Math.round((data.length / minItems) * 100);
    };

    return {
      revenus: getCompletion(financialData.revenus, 2),
      depenses: getCompletion(financialData.depenses, 5),
      dettes: financialData.dettes.length > 0 ? 100 : 0,
      objectifs: getCompletion(financialData.objectifs, 3)
    };
  };

  const completionData = calculateCompletionData();

  // Gestionnaires de données
  const handleRevenusChange = (newRevenus) => {
    setFinancialData(prev => ({ ...prev, revenus: newRevenus }));
  };

  const handleDepensesChange = (newDepenses) => {
    setFinancialData(prev => ({ ...prev, depenses: newDepenses }));
  };

  const handleDettesChange = (newDettes) => {
    setFinancialData(prev => ({ ...prev, dettes: newDettes }));
  };

  const handleObjectifsChange = (newObjectifs) => {
    setFinancialData(prev => ({ ...prev, objectifs: newObjectifs }));
  };

  const handleEmotionalContext = (itemId, type, moodRating, tags) => {
    setEmotionalContexts(prev => ({
      ...prev,
      [itemId]: {
        type,
        moodRating,
        tags,
        timestamp: new Date().toISOString()
      }
    }));
  };

  const handleImportData = (importedData) => {
    setFinancialData(prev => ({
      revenus: [...(prev.revenus || []), ...(importedData.revenus || [])],
      depenses: [...(prev.depenses || []), ...(importedData.depenses || [])],
      dettes: [...(prev.dettes || []), ...(importedData.dettes || [])],
      objectifs: [...(prev.objectifs || []), ...(importedData.objectifs || [])]
    }));
  };

  const handleExportData = (format) => {
    // Data exported successfully
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'revenus':
        return (
          <RevenusSection
            revenus={financialData.revenus}
            onRevenusChange={handleRevenusChange}
            onEmotionalContext={handleEmotionalContext}
          />
        );
      case 'depenses':
        return (
          <DepensesSection
            depenses={financialData.depenses}
            onDepensesChange={handleDepensesChange}
            onEmotionalContext={handleEmotionalContext}
          />
        );
      case 'dettes':
        return (
          <DettesSection
            dettes={financialData.dettes}
            onDettesChange={handleDettesChange}
            onEmotionalContext={handleEmotionalContext}
          />
        );
      case 'objectifs':
        return (
          <ObjectifsSection
            objectifs={financialData.objectifs}
            onObjectifsChange={handleObjectifsChange}
            onEmotionalContext={handleEmotionalContext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />
      <NavigationProgressIndicator />
      
      <main className="pt-16 lg:pt-30 pb-20 lg:pb-8">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
          {/* En-tête de la page */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Cartographie financière interactive
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Organisez et visualisez votre situation financière complète avec des outils intuitifs et des analyses comportementales.
            </p>
          </div>

          {/* Indicateur de progression */}
          <DataCompletionIndicator completionData={completionData} />

          {/* Outils d'import/export */}
          <DataImportExport
            onImportData={handleImportData}
            onExportData={handleExportData}
            financialData={financialData}
          />

          {/* Navigation par onglets */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            completionData={completionData}
          />

          {/* Contenu principal avec sidebar */}
          <div className="relative">
            <div className="lg:pr-84">
              {renderActiveSection()}
            </div>
            
            {/* Sidebar de santé financière (desktop uniquement) */}
            <FinancialHealthSidebar financialData={financialData} />
          </div>

          {/* Conseils contextuels */}
          <div className="mt-8 glass-card rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Conseil Rivela
                </h3>
                <p className="text-muted-foreground">
                  {activeTab === 'revenus' && "Diversifiez vos sources de revenus pour réduire les risques financiers. Même un petit revenu complémentaire peut faire une grande différence."}
                  {activeTab === 'depenses' && "Utilisez la règle 50/30/20 : 50% pour les besoins essentiels, 30% pour les loisirs, 20% pour l'épargne et les investissements."}
                  {activeTab === 'dettes' && "Priorisez le remboursement des dettes avec les taux d'intérêt les plus élevés. Chaque euro économisé en intérêts est un euro gagné."}
                  {activeTab === 'objectifs' && "Définissez des objectifs SMART (Spécifiques, Mesurables, Atteignables, Réalistes, Temporels) pour maximiser vos chances de succès."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default InteractiveFinancialDataMapping;